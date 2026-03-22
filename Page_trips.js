gsap.registerPlugin(ScrollTrigger);
        const TRANSFORM_PARAMS = { scaleX: 1.5, scaleY: 1.5, offsetX: -8, offsetY: 93 };
        
        function transformCoords(homeX, homeY) { return { x: (homeX * TRANSFORM_PARAMS.scaleX) + TRANSFORM_PARAMS.offsetX, y: (homeY * TRANSFORM_PARAMS.scaleY) + TRANSFORM_PARAMS.offsetY }; }
        function getFixedPosition(targetX, targetY, zoomLevel) { 
            let isMobile = window.innerWidth <= 768;
            let centerY = isMobile ? 333 : 500; 
            return { x: 500 - (targetX * zoomLevel), y: centerY - (targetY * zoomLevel) }; 
        }

        let CITY_DATE_RANGES = {}; 
        const frameBaseTransforms = new Map();

        window.addEventListener('click', (e) => {
            document.querySelectorAll('.dropdown-content.show').forEach(el => el.classList.remove('show'));

            if (window.innerWidth <= 768) {
                let clickedWrapper = e.target.closest('.img-wrapper');
                
                document.querySelectorAll('.img-wrapper.interactive-ready').forEach(wrapper => {
                    if (wrapper.isHovered && wrapper !== clickedWrapper) {
                        wrapper.isHovered = false;
                        wrapper.activeFrame = -1;
                        
                        let parts = wrapper.id.split('-'); 
                        let idx = parts[1];
                        let nIdx = parts[2];
                        
                        let subTitleEl = document.getElementById(`subtitle-${idx}-${nIdx}`);
                        if (subTitleEl && subTitleEl.hasAttribute('data-orig')) {
                            subTitleEl.innerHTML = subTitleEl.getAttribute('data-orig');
                            subTitleEl.style.color = "";
                        }
                        
                        let frames = wrapper.querySelectorAll('.img-frame');
                        frames.forEach((frameEl, fIdx) => {
                            let base = frameBaseTransforms.get(frameEl.id);
                            if (base) {
                                gsap.to(frameEl, { x: base.x, y: base.y, rotation: base.rotation, scale: 1, zIndex: fIdx + 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)", overwrite: "auto" });
                            }
                        });
                    }
                });
            }
        });

        window.scrollToLabel = function(labelName) {
            const tl = window.mainTimeline;
            if (!tl || tl.labels[labelName] === undefined) return;
            const progress = tl.labels[labelName] / tl.duration();
            const scrollPos = tl.scrollTrigger.start + (tl.scrollTrigger.end - tl.scrollTrigger.start) * progress;
            window.scrollTo({ top: scrollPos, behavior: 'smooth' });
        };

        window.addEventListener('scroll', () => {
            const btt = document.getElementById('back-to-top');
            if (window.scrollY > window.innerHeight * 0.8) btt.classList.add('visible');
            else btt.classList.remove('visible');

            const hint = document.getElementById('scroll-hint');
            if (hint) {
                if (window.scrollY > 50) hint.style.opacity = '0';
                else hint.style.opacity = '0.8';
            }

            const progressText = document.getElementById('progress-text');
            if (progressText) {
                if (window.scrollY > 50) progressText.style.opacity = '1';
                else progressText.style.opacity = '0';
            }
        });

        function getMergedData() {
            const tripName = window.CURRENT_TRIP_NAME || 'Belgium Trip';
            const tripEvent = window.DATA.events.find(e => e.text === tripName);

            document.getElementById('page-title').textContent = tripEvent.text;
            const singleLineDate = tripEvent.date.replace(/<br\s*\/?>/ig, ' ~ ');
            document.getElementById('page-date').innerHTML = singleLineDate;
            document.getElementById('end-page-title').textContent = tripEvent.text;
            document.getElementById('end-page-date').innerHTML = singleLineDate;

            const mappedData = tripEvent.eventMarkers.map((evMarker, idx) => {
                let baseMarker = window.DATA.markers.home.find(m => m.id === evMarker.id);
                if (!baseMarker && tripEvent.countryCandidates) {
                    for (const country of tripEvent.countryCandidates) {
                        if (window.DATA.markers[country]) {
                            baseMarker = window.DATA.markers[country].find(m => m.id === evMarker.id);
                            if (baseMarker) break;
                        }
                    }
                }
                let finalCoords = { x: 0, y: 0 };
                if (baseMarker) finalCoords = transformCoords(baseMarker.x, baseMarker.y);

                let parsedNotes = [];
                if (evMarker.notes) {
                    evMarker.notes.forEach(note => {
                        let subNotes = [];
                        if (note.text1) {
                            let i = 1;
                            while (note[`text${i}`] || note[`photo${i}`] || note[`video${i}`]) {
                                let currentPhoto = note[`photo${i}`] || note[`video${i}`];
                                if (!currentPhoto && i === 1) currentPhoto = note.photo || note.video || "";
                                else if (!currentPhoto) currentPhoto = "";
                                subNotes.push({ photo: currentPhoto, text: note[`text${i}`] || "" });
                                i++;
                            }
                        } else if (note.photo || note.text || note.video) {
                            subNotes.push({ photo: note.photo || note.video || "", text: note.text || "" });
                        }
                        if(subNotes.length > 0) parsedNotes.push({ title: note.title || null, subNotes });
                    });
                } else if (evMarker.desc && !evMarker.stay) {
                    parsedNotes.push({ title: null, subNotes: [{ photo: "", text: evMarker.desc }] });
                }

                let itemType = evMarker.type;
                if (!itemType && !evMarker.stay) {
                    if (idx === 0) itemType = 'start'; else if (idx === tripEvent.eventMarkers.length - 1) itemType = 'end'; else itemType = 'waypoint';
                }

                return { ...evMarker, type: itemType, coords: finalCoords, parsedNotes: parsedNotes, labelOffset: evMarker.labelOffset || { x: 0, y: 0 } };
            }).filter(m => m.coords.x !== 0); 

            mappedData.forEach(item => {
                if (!item.stay && item.type === 'waypoint') {
                    if (!CITY_DATE_RANGES[item.city]) CITY_DATE_RANGES[item.city] = [];
                    CITY_DATE_RANGES[item.city].push(item.date);
                }
            });

            const finalData = [];
            for (let i = 0; i < mappedData.length; i++) {
                const current = mappedData[i];
                if (current.stay) {
                    let j = i + 1; let lastDate = current.date;
                    while (j < mappedData.length && mappedData[j].city === current.city && mappedData[j].stay) { lastDate = mappedData[j].date; j++; }
                    if (j > i + 1) { current.date = `${current.date} ~ ${lastDate}`; i = j - 1; }
                    finalData.push(current);
                } else {
                    finalData.push(current);
                }
            }
            return finalData;
        }

        const STORY_DATA = getMergedData();
        const SEEN_CITIES = new Set(); 

        function updateStage() {
            const scale = Math.max(window.innerWidth / 1000, window.innerHeight / 1000);
            document.getElementById("responsive-stage").style.transform = `scale(${scale})`;
        }
        window.addEventListener('resize', updateStage);

        function initStory() {
            updateStage();
            const markersLayer = document.getElementById('markers-layer');
            const contentLayer = document.getElementById('story-content-layer');
            const scrollContainer = document.getElementById('scroll-flow-container');
            const routeLayer = document.getElementById('route-layer');
            const routeDefs = document.getElementById('route-defs');
            
            scrollContainer.appendChild(Object.assign(document.createElement('div'), {className: 'ghost-step', style: 'height: 150vh'}));

            const heroLayer = document.getElementById('hero-text-layer');
            const coverCityList = document.createElement('div');
            coverCityList.id = 'cover-city-list';
            let coverSeen = new Set();

            STORY_DATA.forEach((item, index) => {
                if (index > 0) {
                    const prevItem = STORY_DATA[index - 1]; const pathData = `M ${prevItem.coords.x} ${prevItem.coords.y} L ${item.coords.x} ${item.coords.y}`;
                    const maskId = `path-mask-${index}`; const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
                    mask.setAttribute("id", maskId); mask.setAttribute("maskUnits", "userSpaceOnUse");
                    const maskPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    maskPath.setAttribute("id", `mask-path-${index}`); maskPath.setAttribute("d", pathData);
                    maskPath.setAttribute("fill", "none"); maskPath.setAttribute("stroke", "white"); maskPath.setAttribute("stroke-width", "5"); 
                    mask.appendChild(maskPath); routeDefs.appendChild(mask);
                    const visiblePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    visiblePath.setAttribute("d", pathData); visiblePath.setAttribute("fill", "none"); visiblePath.setAttribute("stroke", "#A62626"); 
                    visiblePath.setAttribute("stroke-width", "1.5"); visiblePath.setAttribute("stroke-dasharray", "6, 6"); 
                    visiblePath.setAttribute("mask", `url(#${maskId})`); routeLayer.appendChild(visiblePath);
                }

                if ((item.type === 'waypoint' || item.stay) && !coverSeen.has(item.city)) {
                    let bgImg = '';
                    let cityItems = STORY_DATA.filter(d => d.city === item.city);
                    for (let cItem of cityItems) {
                        if (cItem.parsedNotes) {
                            for (let n of cItem.parsedNotes) {
                                for (let s of n.subNotes) {
                                    if (s.photo && !s.photo.match(/\.(mov|mp4)$/i)) { bgImg = s.photo; break; }
                                }
                                if (bgImg) break;
                            }
                        }
                        if (bgImg) break;
                    }
                    
                    if (bgImg) {
                        coverSeen.add(item.city); 
                        let btn = document.createElement('div');
                        btn.className = 'cover-city-chip';
                        btn.innerText = item.city;
                        btn.style.setProperty('--bg-img', `url('${bgImg}')`);
                        
                        let targetIndex = index;
                        for (let i = index; i < STORY_DATA.length; i++) {
                            if (STORY_DATA[i].city === item.city && !STORY_DATA[i].stay && STORY_DATA[i].parsedNotes && STORY_DATA[i].parsedNotes.length > 0) {
                                targetIndex = i;
                                break;
                            }
                        }
                        btn.onclick = () => window.scrollToLabel(`cardCenter-${targetIndex}`);
                        coverCityList.appendChild(btn);
                    }
                }

                const marker = document.createElement('div');
                marker.className = (item.type === 'start' || item.type === 'end') ? 'marker home-icon' : 'marker waypoint-dot';
                marker.style.left = `${item.coords.x / 10}%`; marker.style.top = `${item.coords.y / 10}%`; marker.id = `marker-${index}`;
                markersLayer.appendChild(marker);

                const label = document.createElement('div'); label.id = `label-${index}`;
                let isDummyLabel = false; 
                
                let exploreLink = item.link;
                if (item.type === 'end' && item.city.includes("Munich")) {
                    exploreLink = "Germany.html"; 
                }
                const exploreBtn = exploreLink ? `<a href="${exploreLink}?city=${encodeURIComponent(item.city)}" class="explore-btn">Explore City &rarr;</a>` : '';
                const titleExploreBtn = exploreLink ? `<a href="${exploreLink}?city=${encodeURIComponent(item.city)}" class="title-explore-btn">Explore City &rarr;</a>` : '';

                if (item.stay) {
                    label.className = 'city-label stay-label'; label.innerHTML = `<h3 class="stay-city-name">${item.city}</h3><div class="stay-title">OVERNIGHT</div><p>${item.date}</p>`;
                } else if (item.type === 'waypoint') {
                    let firstVisitIndex = STORY_DATA.findIndex(d => d.type === 'waypoint' && d.city === item.city);
                    
                    if (firstVisitIndex === index) {
                        SEEN_CITIES.add(item.city); label.className = 'city-label';
                        const dateStr = item.date; 
                        label.innerHTML = `<h3>${item.city}</h3><p style="margin: 0.5px 0 1px 0;">${dateStr}<span id="revisit-comma-${item.city}" style="opacity: 0; width: 0; overflow: hidden; display: inline-block; vertical-align: middle;"></span><span id="revisit-date-${item.city}" style="opacity: 0; height: 0; overflow: hidden; display: block; margin-top: 0.5px;"></span></p>${exploreBtn}`;
                    } else if (firstVisitIndex !== -1 && firstVisitIndex < index) {
                        isDummyLabel = true; 
                        let revisitComma = document.getElementById(`revisit-comma-${item.city}`);
                        let revisitSpan = document.getElementById(`revisit-date-${item.city}`);
                        if (revisitComma && revisitSpan) {
                            revisitComma.textContent = `,`;
                            revisitSpan.textContent = item.date;
                        }
                    } else {
                        isDummyLabel = true;
                    }
                } else if (item.type === 'start') {
                    label.className = 'city-label'; const endItem = STORY_DATA.find(d => d.type === 'end' && d.city === item.city);
                    const endDateHTML = endItem ? `<span id="end-date-${index}" style="opacity: 0; height: 0; overflow: hidden; display: block;">End: ${endItem.date}</span>` : '';
                    label.innerHTML = `<h3>${item.city}</h3><p style="margin: 0.5px 0 1px 0;">Start: ${item.date}${endDateHTML}</p>${exploreBtn}`;
                } else if (item.type === 'end') {
                    if (STORY_DATA.find(d => d.type === 'start' && d.city === item.city)) isDummyLabel = true; 
                    else { label.className = 'city-label'; label.innerHTML = `<h3>${item.city}</h3><p>End: ${item.date}</p>${exploreBtn}`; }
                }

                if (isDummyLabel) label.style.display = 'none'; 
                else { label.style.left = `${(item.coords.x / 10) + (item.labelOffset?.x || 0)}%`; label.style.top = `${(item.coords.y / 10) + (item.labelOffset?.y || 0)}%`; }
                markersLayer.appendChild(label);

                const titleCard = document.createElement('div'); titleCard.className = 'story-element card-type-title'; titleCard.id = `city-${index}-title`;
                const titleSpacer = document.createElement('div'); titleSpacer.className = 'ghost-step';
                const articleContainer = document.createElement('div'); articleContainer.className = 'story-element article-container'; articleContainer.id = `city-${index}-article`;
                let totalSubNotes = 0; 
                
                let hasArticle = item.parsedNotes && item.parsedNotes.length > 0;

                if (!item.stay && !hasArticle) {
                    articleContainer.style.display = 'none';
                }

                if (item.stay) {
                    titleCard.style.display = 'none'; titleSpacer.style.height = '10vh'; articleContainer.classList.add('stay-mode');
                } else {
                    titleCard.innerHTML = `<h2>${item.city}</h2><p>${item.date}</p>`;
                    let bottomActions = document.createElement('div');
                    bottomActions.className = 'card-bottom-actions';

                    if (hasArticle) {
                        let attractions = [];
                        item.parsedNotes.forEach((note, noteIndex) => {
                            if (note.title) attractions.push({ title: note.title, idx: noteIndex });
                        });

                        if (attractions.length > 0) {
                            let dropdownContainer = document.createElement('div');
                            dropdownContainer.className = 'attraction-dropdown';
                            
                            let btn = document.createElement('button');
                            btn.className = 'dropdown-btn';
                            btn.innerHTML = '<span>Attraction List</span>';
                            
                            let content = document.createElement('div');
                            content.className = 'dropdown-content';
                            
                            attractions.forEach(attr => {
                                let itemEl = document.createElement('div');
                                itemEl.className = 'attraction-item';
                                itemEl.innerHTML = attr.title.replace(/<br\s*\/?>/ig, ' '); 
                                itemEl.onclick = (e) => {
                                    e.stopPropagation();
                                    window.scrollToLabel(`section-${index}-${attr.idx}`);
                                    content.classList.remove('show');
                                };
                                content.appendChild(itemEl);
                            });
                            
                            btn.onclick = (e) => {
                                e.stopPropagation();
                                document.querySelectorAll('.dropdown-content.show').forEach(el => {
                                    if (el !== content) el.classList.remove('show');
                                });
                                content.classList.toggle('show');
                            };
                            
                            dropdownContainer.appendChild(btn);
                            dropdownContainer.appendChild(content);
                            bottomActions.appendChild(dropdownContainer);
                        }
                    }

                    if (titleExploreBtn) {
                        let dummyDiv = document.createElement('div');
                        dummyDiv.innerHTML = titleExploreBtn;
                        if (dummyDiv.firstChild) {
                            bottomActions.appendChild(dummyDiv.firstChild);
                        }
                    }
                    titleCard.appendChild(bottomActions);

                    if (hasArticle) {
                        item.parsedNotes.forEach((note, noteIndex) => {
                            totalSubNotes += note.subNotes.length; 
                            const section = document.createElement('div'); section.className = `article-section ${noteIndex % 2 !== 0 ? 'reverse' : ''}`;
                            let hasPhoto = note.subNotes.some(sn => sn.photo);
                            
                            let imgHTML = '';
                            if (hasPhoto) {
                                imgHTML += `<div class="img-wrapper" id="wrapper-${index}-${noteIndex}">`;
                                note.subNotes.forEach((sn, i) => {
                                    if(sn.photo) {
                                        const isVideo = /\.(mp4|webm|mov)$/i.test(sn.photo);
                                        imgHTML += `<div id="frame-${index}-${noteIndex}-${i}" class="img-frame" style="z-index: ${i+1};">`;
                                        if (isVideo) {
                                            imgHTML += `<video id="img-${index}-${noteIndex}-${i}" class="collage-img" src="${sn.photo}" muted loop playsinline style="background:#000;"></video>`;
                                        } else {
                                            imgHTML += `<img id="img-${index}-${noteIndex}-${i}" class="collage-img" src="${sn.photo}">`;
                                        }
                                        imgHTML += `</div>`;
                                    }
                                });
                                imgHTML += `</div>`;
                            }

                            let textHTML = `<div class="text-content-wrapper ${!hasPhoto ? 'full-width' : ''}">`;
                            let origTitle = note.title ? note.title : '';
                            textHTML += `<h3 class="section-subtitle" id="subtitle-${index}-${noteIndex}" data-orig="${origTitle.replace(/"/g, '&quot;')}">${origTitle}</h3>`;
                            
                            textHTML += `<div class="text-wrapper">`;
                            note.subNotes.forEach((sn, i) => { 
                                let textContent = sn.text ? sn.text : '';
                                textHTML += `<div class="text-item" id="txt-${index}-${noteIndex}-${i}">${textContent}</div>`; 
                            });
                            textHTML += `</div></div>`;

                            section.innerHTML = imgHTML + textHTML; articleContainer.appendChild(section);
                        });
                    }
                }
                
                contentLayer.appendChild(titleCard); scrollContainer.appendChild(titleSpacer); contentLayer.appendChild(articleContainer);

                const articleSpacer = document.createElement('div'); articleSpacer.className = 'ghost-step';
                let spacerHeight = item.stay ? 60 : 100 + (item.parsedNotes?.length * 80 || 0) + (totalSubNotes * 60); 
                articleSpacer.style.height = `${spacerHeight}vh`; scrollContainer.appendChild(articleSpacer);
                scrollContainer.appendChild(Object.assign(document.createElement('div'), {className: 'ghost-step', style: 'height: 10vh'}));
            });

            heroLayer.appendChild(coverCityList); 

            scrollContainer.appendChild(Object.assign(document.createElement('div'), {className: 'ghost-step', style: 'height: 100vh'}));
            setTimeout(createTimeline, 100);
        }

        function applyDynamicFanEffect(wrapper, index, noteIndex, totalImages) {
            let visibleFrames = [];
            for (let i = 0; i < totalImages; i++) {
                let frameId = `frame-${index}-${noteIndex}-${i}`;
                let frameEl = document.getElementById(frameId);
                if (frameEl && gsap.getProperty(frameEl, "opacity") > 0.1) {
                    visibleFrames.push({ el: frameEl, id: frameId });
                }
            }

            let visibleCount = visibleFrames.length;
            if (visibleCount === 0) return;

            visibleFrames.forEach((item, visibleIdx) => {
                let base = frameBaseTransforms.get(item.id);
                if (!base) return;

                if (visibleCount === 1) {
                    gsap.to(item.el, { y: base.y - 30, scale: 1.05, duration: 0.4, ease: "power2.out", overwrite: "auto" });
                } else if (visibleCount === 2) {
                    let direction = visibleIdx === 0 ? -1 : 1; 
                    gsap.to(item.el, { x: base.x + (direction * 40), y: base.y - 15, rotation: base.rotation + (direction * 8), scale: 1.05, duration: 0.4, ease: "power2.out", overwrite: "auto" });
                } else {
                    let centerIndex = (visibleCount - 1) / 2;
                    let spreadFactor = visibleIdx - centerIndex; 
                    gsap.to(item.el, { x: base.x + (spreadFactor * 50), y: base.y - 10 - (Math.abs(spreadFactor) === 0 ? 20 : 0), rotation: base.rotation + (spreadFactor * 10), scale: 1.05, duration: 0.4, ease: "power2.out", overwrite: "auto" });
                }
            });
        }

        function initDynamicHover(wrapperId, index, noteIndex, totalImages) {
            const wrapper = document.getElementById(wrapperId);
            if (!wrapper) return;
            wrapper.activeFrame = -1;

            wrapper.addEventListener("mouseenter", () => {
                if (window.innerWidth <= 768) return;
                if (!wrapper.classList.contains("interactive-ready")) return;
                wrapper.isHovered = true; 
                applyDynamicFanEffect(wrapper, index, noteIndex, totalImages);
            });

            wrapper.addEventListener("mouseleave", () => {
                if (window.innerWidth <= 768) return;
                if (!wrapper.classList.contains("interactive-ready")) return;
                wrapper.isHovered = false; 
                for (let i = 0; i < totalImages; i++) {
                    let frameId = `frame-${index}-${noteIndex}-${i}`;
                    let frameEl = document.getElementById(frameId);
                    let base = frameBaseTransforms.get(frameId);
                    if (frameEl && base) {
                        gsap.to(frameEl, { x: base.x, y: base.y, rotation: base.rotation, scale: 1, duration: 0.5, ease: "back.out(1.5)", overwrite: "auto" });
                    }
                }
            });

            for (let i = 0; i < totalImages; i++) {
                let frameEl = document.getElementById(`frame-${index}-${noteIndex}-${i}`);
                let txtEl = document.getElementById(`txt-${index}-${noteIndex}-${i}`);
                
                if (frameEl) {
                    frameEl.addEventListener('mouseenter', () => {
                        if (window.innerWidth <= 768) return;
                        if (!wrapper.classList.contains("interactive-ready")) return;
                        
                        gsap.to(frameEl, { scale: 1.15, zIndex: 50, duration: 0.2, overwrite: "auto" });
                        if (txtEl) gsap.to(txtEl, { color: "#A62626", x: 10, duration: 0.2, overwrite: "auto" });
                        
                        for (let j = 0; j < totalImages; j++) {
                            if (j !== i) {
                                gsap.to(`#frame-${index}-${noteIndex}-${j}`, { opacity: 0.2, duration: 0.2, overwrite: "auto" });
                                let otherTxt = document.getElementById(`txt-${index}-${noteIndex}-${j}`);
                                if (otherTxt) gsap.to(otherTxt, { opacity: 0.2, duration: 0.2, overwrite: "auto" });
                            }
                        }
                    });

                    frameEl.addEventListener('mouseleave', () => {
                        if (window.innerWidth <= 768) return;
                        if (!wrapper.classList.contains("interactive-ready")) return;
                        
                        let returnScale = wrapper.isHovered ? 1.05 : 1; 
                        gsap.to(frameEl, { scale: returnScale, zIndex: i + 1, duration: 0.2, overwrite: "auto" });
                        if (txtEl) gsap.to(txtEl, { color: "#2C2A29", x: 0, duration: 0.2, overwrite: "auto" });
                        
                        for (let j = 0; j < totalImages; j++) {
                            if (j !== i) {
                                gsap.to(`#frame-${index}-${noteIndex}-${j}`, { opacity: 1, duration: 0.2, overwrite: "auto" });
                                let otherTxt = document.getElementById(`txt-${index}-${noteIndex}-${j}`);
                                if (otherTxt) gsap.to(otherTxt, { opacity: 1, duration: 0.2, overwrite: "auto" });
                            }
                        }
                    });

                    frameEl.addEventListener('click', (e) => {
                        if (window.innerWidth > 768) return;
                        e.stopPropagation(); 
                        if (!wrapper.classList.contains("interactive-ready")) return;
                        
                        let subTitleEl = document.getElementById(`subtitle-${index}-${noteIndex}`);

                        if (totalImages > 1 && !wrapper.isHovered) {
                            wrapper.isHovered = true;
                            applyDynamicFanEffect(wrapper, index, noteIndex, totalImages);
                            return;
                        }

                        wrapper.isHovered = true; 

                        if (wrapper.activeFrame === i) {
                            wrapper.activeFrame = -1;
                            if (subTitleEl && subTitleEl.hasAttribute('data-orig')) {
                                subTitleEl.innerHTML = subTitleEl.getAttribute('data-orig');
                                subTitleEl.style.color = "";
                            }
                            for (let j = 0; j < totalImages; j++) {
                                let fEl = document.getElementById(`frame-${index}-${noteIndex}-${j}`);
                                let returnScale = (totalImages > 1) ? 1.05 : 1;
                                if (fEl) gsap.to(fEl, { scale: returnScale, zIndex: j + 1, opacity: 1, duration: 0.2, overwrite: "auto" });
                            }
                        } else {
                            wrapper.activeFrame = i;
                            let activeScale = (totalImages > 1) ? 1.15 : 1.05;
                            gsap.to(frameEl, { scale: activeScale, zIndex: 100, opacity: 1, duration: 0.2, overwrite: "auto" });
                            
                            if (subTitleEl && txtEl && txtEl.innerHTML.trim() !== '') {
                                subTitleEl.innerHTML = txtEl.innerHTML;
                                subTitleEl.style.color = "#A62626";
                            }
                            for (let j = 0; j < totalImages; j++) {
                                if (j !== i) {
                                    let fEl = document.getElementById(`frame-${index}-${noteIndex}-${j}`);
                                    let returnScale = (totalImages > 1) ? 1.05 : 1;
                                    if (fEl) gsap.to(fEl, { opacity: 0.2, scale: returnScale, zIndex: j + 1, duration: 0.2, overwrite: "auto" });
                                }
                            }
                        }
                    });
                }
            }
        }

        function createTimeline() {
            const tl = gsap.timeline({ 
                scrollTrigger: { 
                    trigger: "body", 
                    start: "top top", 
                    end: "bottom bottom", 
                    scrub: 1, 
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        let progressText = document.getElementById("progress-text");
                        if (progressText) {
                            progressText.innerText = Math.round(self.progress * 100) + "%";
                        }
                    }
                } 
            });
            window.mainTimeline = tl; 

            gsap.set(".article-container", { xPercent: -50, yPercent: 0 }); 
            gsap.set("#map-content-wrapper", { x: 0, y: 0, scale: 1 });
            tl.to("#cover-layer", { opacity: 0, duration: 1.5 }).to("#hero-text-layer", { y: -200, opacity: 0, duration: 1.5 }, "<");

            STORY_DATA.forEach((item, index) => {
                const targetScale = 5; const pos = getFixedPosition(item.coords.x, item.coords.y, targetScale);
                tl.to("#map-content-wrapper", { scale: targetScale, x: pos.x, y: pos.y, duration: 2, ease: "power1.inOut" });

                if (index > 0) {
                    const maskPath = document.querySelector(`#mask-path-${index}`);
                    if (maskPath) { const len = maskPath.getTotalLength(); gsap.set(maskPath, { strokeDasharray: len, strokeDashoffset: len }); tl.to(maskPath, { strokeDashoffset: 0, duration: 2, ease: "power1.inOut" }, "<"); }
                }

                tl.to(`#marker-${index}`, { opacity: 1, scale: 1.5, duration: 0.5 }, "-=1");

                const titleId = `#city-${index}-title`; const articleId = `#city-${index}-article`; const flowStart = `flow-${index}`;
                let hasArticle = item.parsedNotes && item.parsedNotes.length > 0;
                let titleInStart = tl.duration();

                if (!item.stay) { 
                    tl.to(titleId, { y: 0, x: "0%", yPercent: -50, autoAlpha: 1, duration: 2, ease: "power2.out" }, titleInStart); 
                    tl.addLabel(`cardCenter-${index}`); 
                    tl.to({}, { duration: 1.5 }); 
                } else {
                    tl.addLabel(`cardCenter-${index}`);
                }
                
                tl.addLabel(flowStart);
                
                if (!item.stay) {
                    if (hasArticle) {
                        tl.to("#map-dim-layer", { opacity: 0.85, duration: 1.5 }, flowStart); 
                        tl.to(["#markers-layer", "#route-layer"], { opacity: 0.3, duration: 1.5 }, flowStart);
                    }
                    tl.to(titleId, { y: "-150vh", autoAlpha: 0, duration: 2, ease: "power1.in" }, flowStart); 
                }

                let timeOffset = 2; const SECTION_VH = 80; 
                let lastMoveStart = 0; 
                
                if (item.stay) {
                    tl.fromTo(articleId, { y: "100vh" }, { y: `-50vh`, duration: 4, ease: "none" }, flowStart); timeOffset += 4;
                } else if (hasArticle) { 
                    
                    let currentY = -40; 
                    tl.fromTo(articleId, { y: "50vh", autoAlpha: 0 }, { y: `${currentY}vh`, autoAlpha: 1, duration: 2, ease: "power2.out" }, flowStart);

                    item.parsedNotes.forEach((note, noteIndex) => {
                        let isMulti = note.subNotes.length > 1; 
                        let numImages = note.subNotes.length;
                        let centerTime; 

                        if (numImages > 0) {
                            initDynamicHover(`wrapper-${index}-${noteIndex}`, index, noteIndex, numImages);
                        }

                        if (isMulti) {
                            let moveDur = 2.5;
                            if (noteIndex > 0) {
                                let nextY = currentY - SECTION_VH; 
                                tl.to(articleId, { y: `${nextY}vh`, duration: moveDur, ease: "power2.inOut" }, `${flowStart}+=${timeOffset}`);
                                centerTime = timeOffset + moveDur; 
                                currentY = nextY;
                                timeOffset += moveDur; 
                            } else {
                                centerTime = 2; 
                            }
                            
                            let holdTime = 4; 
                            let staggerGap = 1.8; 
                            let appearTime = timeOffset; 

                            tl.addLabel(`section-${index}-${noteIndex}`, `${flowStart}+=${centerTime}`);

                            note.subNotes.forEach((sn, i) => {
                                let itemLabel = `${flowStart}+=${appearTime + (i * staggerGap)}`;
                                let parallaxDuration = (numImages - i) * holdTime + 0.5; 
                                let parallaxSpeed = 1; 
                                let moveDist = parallaxDuration * parallaxSpeed; 
                                
                                if (sn.photo) {
                                    let frameId = `frame-${index}-${noteIndex}-${i}`; let imgId = `#img-${index}-${noteIndex}-${i}`;
                                    let wrapperId = `wrapper-${index}-${noteIndex}`;
                                    let xOffset = (i - (numImages - 1) / 2) * 20; let yOffset = (i - (numImages - 1) / 2) * 20; 
                                    let endRot = (i % 2 === 0 ? -2 : 3) + (Math.random() * 2 - 1); 
                                    
                                    frameBaseTransforms.set(frameId, { x: xOffset, y: yOffset, rotation: endRot });

                                    tl.fromTo(`#${frameId}`, 
                                        { scale: 1.4, opacity: 0, rotation: endRot*2, x: 0, y: 0, xPercent: -50, yPercent: -50 }, 
                                        { scale: 1, opacity: 1, rotation: endRot, x: xOffset, y: yOffset, xPercent: -50, yPercent: -50, duration: 1.2, ease: "power2.out", 
                                          onStart: () => { const el = document.querySelector(imgId); if(el && el.tagName === 'VIDEO') el.play(); },
                                          onComplete: () => {
                                              let wrapper = document.getElementById(wrapperId);
                                              if (wrapper) {
                                                  wrapper.classList.add("interactive-ready");
                                                  if (wrapper.isHovered && window.innerWidth > 768) setTimeout(() => applyDynamicFanEffect(wrapper, index, noteIndex, numImages), 50);
                                              }
                                          } 
                                        }, itemLabel
                                    );
                                    
                                    tl.fromTo(imgId, { y: 0 }, { y: -moveDist, duration: parallaxDuration, ease: "none" }, `${itemLabel}+=0.5`);
                                }
                                
                                if (i === 0) {
                                    let subId = `#subtitle-${index}-${noteIndex}`;
                                    tl.fromTo(subId, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, itemLabel);
                                    tl.to(subId, { y: -moveDist, duration: parallaxDuration, ease: "none" }, `${itemLabel}+=0.5`);
                                }
                                if (sn.text) {
                                    let txtId = `#txt-${index}-${noteIndex}-${i}`;
                                    tl.fromTo(txtId, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, itemLabel);
                                    tl.to(txtId, { y: -moveDist, duration: parallaxDuration, ease: "none" }, `${itemLabel}+=0.5`);
                                }
                            });
                            
                            timeOffset += (numImages * staggerGap) + 3; 

                        } else {
                            let slideDur = 3; 
                            let holdDur = 3; 
                            
                            if (noteIndex > 0) {
                                let nextY = currentY - SECTION_VH; 
                                tl.to(articleId, { y: `${nextY}vh`, duration: slideDur, ease: "power2.inOut" }, `${flowStart}+=${timeOffset}`);
                                centerTime = timeOffset + slideDur; 
                                currentY = nextY;
                                lastMoveStart = timeOffset;
                            } else {
                                lastMoveStart = 0; 
                                centerTime = 2; 
                            }

                            tl.addLabel(`section-${index}-${noteIndex}`, `${flowStart}+=${centerTime + (holdDur / 2)}`);
                            
                            let appearTime = (noteIndex === 0) ? 0.5 : centerTime - 0.5;
                            let itemLabel = `${flowStart}+=${appearTime}`;
                            
                            note.subNotes.forEach((sn, i) => { 
                                if (sn.photo) {
                                    let frameId = `frame-${index}-${noteIndex}-${i}`; let imgId = `#img-${index}-${noteIndex}-${i}`;
                                    let wrapperId = `wrapper-${index}-${noteIndex}`;
                                    let endRot = (Math.random() > 0.5 ? -2 : 3) + (Math.random() * 2 - 1); 

                                    frameBaseTransforms.set(frameId, { x: 0, y: 0, rotation: endRot });

                                    tl.fromTo(`#${frameId}`, 
                                        { scale: 1.4, opacity: 0, rotation: endRot*2, x: 0, y: 0, xPercent: -50, yPercent: -50 }, 
                                        { scale: 1, opacity: 1, rotation: endRot, x: 0, y: 0, xPercent: -50, yPercent: -50, duration: 1.2, ease: "power2.out", 
                                          onStart: () => { const el = document.querySelector(imgId); if(el && el.tagName === 'VIDEO') el.play(); },
                                          onComplete: () => {
                                              let wrapper = document.getElementById(wrapperId);
                                              if (wrapper) {
                                                  wrapper.classList.add("interactive-ready");
                                                  if (wrapper.isHovered && window.innerWidth > 768) setTimeout(() => applyDynamicFanEffect(wrapper, index, noteIndex, 1), 50);
                                              }
                                          } 
                                        }, itemLabel
                                    );
                                    
                                    tl.fromTo(imgId, { y: 0 }, { y: -10, duration: slideDur + holdDur, ease: "none" }, `${itemLabel}+=0.5`);
                                }
                                
                                if (i === 0) {
                                    let subId = `#subtitle-${index}-${noteIndex}`;
                                    tl.fromTo(subId, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, itemLabel);
                                }
                                if (sn.text) {
                                    let txtId = `#txt-${index}-${noteIndex}-${i}`;
                                    tl.fromTo(txtId, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, itemLabel);
                                }
                            });
                            
                            tl.to({}, { duration: holdDur }, `${flowStart}+=${centerTime}`);
                            timeOffset = centerTime + holdDur; 
                        }
                    });

                    let isLastMulti = item.parsedNotes[item.parsedNotes.length - 1].subNotes.length > 1;
                    if (isLastMulti) {
                        tl.to(articleId, { y: `${currentY - SECTION_VH}vh`, autoAlpha: 0, duration: 2, ease: "power1.in" }, `${flowStart}+=${timeOffset}`);
                        timeOffset += 2;
                    } else {
                        tl.to(articleId, { y: `${currentY - SECTION_VH}vh`, duration: 4, ease: "none" }, `${flowStart}+=${timeOffset - 4}`);
                        tl.to(articleId, { autoAlpha: 0, duration: 1.5, ease: "power1.in" }, `${flowStart}+=${timeOffset - 1.5}`);
                    }
                }

                let scrollDur = timeOffset; const flowEnd = `flowEnd-${index}`; tl.addLabel(flowEnd, `${flowStart}+=${scrollDur}`);
                
                if (!item.stay && hasArticle) { 
                    tl.to("#map-dim-layer", { opacity: 0, duration: 0.8 }, flowEnd); 
                    tl.to(["#markers-layer", "#route-layer"], { opacity: 1, duration: 0.8 }, flowEnd); 
                }

                const labelEl = document.getElementById(`label-${index}`);
                if (labelEl && labelEl.style.display !== 'none') {
                    if (item.stay) { tl.to(`#label-${index}`, { autoAlpha: 1, y: "0%", duration: 0.5, ease: "back.out(1.7)" }, flowStart); tl.to(`#label-${index}`, { autoAlpha: 0, duration: 0.5 }, flowEnd); } 
                    else { tl.to(`#label-${index}`, { autoAlpha: 1, y: "0%", duration: 0.5, ease: "back.out(1.7)" }, `${flowEnd}-=0.5`); }
                }
                if (item.type === 'end') {
                    const startIndex = STORY_DATA.findIndex(d => d.type === 'start' && d.city === item.city);
                    if (startIndex !== -1) tl.to(`#end-date-${startIndex}`, { autoAlpha: 1, height: "auto", marginTop: "0.5px", duration: 0.5 }, `${flowEnd}-=0.5`);
                }
                
                if (!item.stay && item.type === 'waypoint') {
                    let firstVisitIndex = STORY_DATA.findIndex(d => d.type === 'waypoint' && d.city === item.city);
                    if (firstVisitIndex !== -1 && firstVisitIndex < index) {
                        let revisitCommaId = `#revisit-comma-${item.city}`;
                        let revisitSpanId = `#revisit-date-${item.city}`;
                        tl.to([revisitCommaId, revisitSpanId], { autoAlpha: 1, width: "auto", height: "auto", duration: 0.5 }, flowStart);
                    }
                }
            });

            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

            STORY_DATA.forEach(item => {
                if (item.coords.x < minX) minX = item.coords.x; if (item.coords.x > maxX) maxX = item.coords.x;
                if (item.coords.y < minY) minY = item.coords.y; if (item.coords.y > maxY) maxY = item.coords.y;
            });
            const padding = 100; 
            const bbWidth = (maxX - minX) + padding * 2; const bbHeight = (maxY - minY) + padding * 2;
            const centerX = (minX + maxX) / 2; const centerY = (minY + maxY) / 2;
            let finalScale = Math.max(1, Math.min(Math.min(1000 / bbWidth, 1000 / bbHeight), 4)); 
            const finalPos = getFixedPosition(centerX, centerY, finalScale);

            tl.to("#map-content-wrapper", { scale: finalScale, x: finalPos.x, y: finalPos.y, duration: 2.5, ease: "power2.inOut" }, "zoomOut"); 
            tl.to(".city-label", { scale: 4.5 / finalScale, duration: 2.5, ease: "power2.inOut" }, "zoomOut");
            tl.to("#end-title-layer", { y: "0%", autoAlpha: 1, duration: 1.5, ease: "power2.out" }, "zoomOut+=1"); 
        }

        window.onload = initStory;