// 註冊 GSAP 套件
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 畫廊互動輔助函式 (分流手機點擊與電腦Hover)
// ==========================================
function isTouchDevice() {
    return window.matchMedia("(hover: none)").matches;
}

window.expandFan = function(el) {
    let items = el.querySelectorAll('.fan-item');
    if(items.length <= 1) return;
    items.forEach((item, i) => {
        let offset = (i - (items.length - 1) / 2) * 110; 
        let rotate = (i - (items.length - 1) / 2) * 6;  
        item.style.transform = `translateX(${offset}%) scale(1.2) rotate(${rotate}deg)`;
        item.style.zIndex = i; 
    });
}

window.focusItem = function(el) {
    let container = el.closest('.note-card-fly');
    if (!container) return;
    
    let index = parseInt(el.getAttribute('data-index')); 
    let fanContainer = container.querySelector('.photo-fan');
    if (fanContainer) fanContainer.setAttribute('data-active-index', index);

    let allPhotos = container.querySelectorAll('.fan-item');
    allPhotos.forEach((p, i) => {
        let offset = (i - index) * 110; 
        let rotate = (i - index) * 6;
        if (p === el) {
            p.style.filter = 'blur(0px) brightness(1)';
            p.style.transform = `translateX(${offset}%) scale(1.2) rotate(${rotate}deg)`;
            p.style.zIndex = 100; 
        } else {
            p.style.filter = 'blur(6px) brightness(0.4)';
            p.style.transform = `translateX(${offset}%) scale(1.1) rotate(${rotate}deg)`;
            p.style.zIndex = 50 - Math.abs(i - index); 
        }
    });

    let dateItem = container.querySelector('.date-item');
    if (dateItem) {
        dateItem.style.opacity = '0';
        dateItem.style.visibility = 'hidden';
        dateItem.style.position = 'absolute';
    }

    let allTexts = container.querySelectorAll('.text-item');
    allTexts.forEach(t => {
        let matchIdx = t.getAttribute('data-match');
        if (matchIdx == index || matchIdx === "-1") { 
            t.style.opacity = '1';
            t.style.visibility = 'visible';
            t.style.position = 'relative';
            t.style.transform = 'translateY(0)';
        } else {
            t.style.opacity = '0';
            t.style.visibility = 'hidden';
            t.style.position = 'absolute';
            t.style.transform = 'translateY(10px)';
        }
    });
}

window.collapseFan = function(el) {
    let fanContainer = el.classList.contains('photo-fan') ? el : el.querySelector('.photo-fan');
    if (!fanContainer) return;
    fanContainer.removeAttribute('data-active-index');

    let items = fanContainer.querySelectorAll('.fan-item');
    items.forEach((item, i) => {
        let angle = (i - (items.length - 1) / 2) * 10; 
        item.style.transform = `rotate(${angle}deg)`;
        item.style.zIndex = i; 
        item.style.filter = 'blur(0px) brightness(1)'; 
    });

    let container = fanContainer.closest('.note-card-fly');
    if (container) {
        let dateItem = container.querySelector('.date-item');
        if (dateItem) {
            dateItem.style.opacity = '1';
            dateItem.style.visibility = 'visible';
            dateItem.style.position = 'relative';
        }
        let allTexts = container.querySelectorAll('.text-item');
        allTexts.forEach(t => {
            t.style.opacity = '0';
            t.style.visibility = 'hidden';
            t.style.position = 'absolute';
            t.style.transform = 'translateY(10px)';
        });
    }
}

window.onFanEnter = function(el) { if(!isTouchDevice()) expandFan(el); }
window.onFanLeave = function(el) { if(!isTouchDevice()) collapseFan(el); }
window.onItemEnter = function(el) { if(!isTouchDevice()) focusItem(el); }
window.handleItemTap = function(event, el) {
    if (!isTouchDevice()) return; 
    event.stopPropagation(); 
    let container = el.closest('.photo-fan');
    let currentIndex = el.getAttribute('data-index');
    let activeIndex = container.getAttribute('data-active-index');
    if (activeIndex === currentIndex) collapseFan(container);
    else focusItem(el);
}

function createFanHTML(mediaArray) {
    if(mediaArray.length === 0) return '';
    let html = `<div class="photo-fan" onmouseenter="onFanEnter(this)" onmouseleave="onFanLeave(this)">`;
    let n = mediaArray.length;
    mediaArray.forEach((media, i) => {
        let isVideo = media.toLowerCase().endsWith('.mov') || media.toLowerCase().endsWith('.mp4');
        let angle = (i - (n - 1) / 2) * 10;
        let content = isVideo 
            ? `<video src="${media}" autoplay loop muted playsinline></video>` 
            : `<img src="${media}" decoding="async" loading="eager">`; 
        html += `<div class="fan-item" data-index="${i}" onmouseenter="onItemEnter(this)" onclick="handleItemTap(event, this)" style="transform: rotate(${angle}deg); z-index: ${i};">${content}</div>`;
    });
    html += `</div>`;
    return html;
}

// ==========================================
// 地圖氣泡框 Pop-up 產生器
// ==========================================
function createPopupHTML(pin, cityName) {
    const wikiUrl = pin.wiki || `https://en.wikipedia.org/wiki/${encodeURIComponent(pin.t)}`;
    const titleText = cityName ? `${cityName} - ${pin.t}` : pin.t;
    
    let html = `<div class="custom-popup"><div class="popup-title">${titleText}</div>`;
    if (pin.p) html += `<img src="${pin.p}" class="popup-image" alt="${pin.t}">`;
    html += `<div class="popup-desc"><span>${pin.d || ''}</span><a href="${wikiUrl}" target="_blank" class="popup-wiki">Wiki ↗</a></div>`;

    if (pin.ot) {
        html += `<div class="popup-detail" style="align-items: flex-start;">🕒 <div class="time-grid">`;
        pin.ot.replace(/<br><br>/g, '<br>').split('<br>').forEach(line => {
            const spaceIndex = line.trim().indexOf(' ');
            if (spaceIndex !== -1 && !line.trim().startsWith('<')) {
                html += `<span class="grid-day">${line.trim().substring(0, spaceIndex)}</span><span class="grid-time">${line.trim().substring(spaceIndex + 1)}</span>`;
            } else {
                html += `<span style="grid-column: span 2;">${line}</span>`;
            }
        });
        html += `</div></div>`;
    } else if (pin.ots && pin.otw) {
        html += `<div class="popup-detail" style="align-items: flex-start;">🕒 <div class="matrix-time-grid"><span class="matrix-empty-header"></span><span class="matrix-header">${pin.summer || 'Summer'}</span><span class="matrix-header">${pin.winter || 'Winter'}</span>`;
        let sLines = pin.ots.replace(/<br><br>/g, '<br>').split('<br>');
        let wLines = pin.otw.replace(/<br><br>/g, '<br>').split('<br>');
        for(let i=0; i < Math.max(sLines.length, wLines.length); i++) {
            let sLine = (sLines[i] || "").trim(), wLine = (wLines[i] || "").trim();
            let spaceIdx = sLine.indexOf(' ');
            if (spaceIdx !== -1 && !sLine.startsWith('<')) {
                let wSpaceIdx = wLine.indexOf(' ');
                html += `<span class="grid-day">${sLine.substring(0, spaceIdx)}</span><span class="grid-time">${sLine.substring(spaceIdx + 1)}</span><span class="grid-time">${wSpaceIdx !== -1 ? wLine.substring(wSpaceIdx + 1) : wLine}</span>`;
            } else {
                html += `<span style="grid-column: span 3;">${sLine}</span>`;
            }
        }
        html += `</div></div>`;
    }
    
    if (pin.tp) {
        html += `<div class="popup-detail" style="align-items: flex-start;">🎟️ <div class="price-grid">`;
        if (pin.tp.includes(':')) {
            pin.tp.split('<br>').forEach(line => {
                const colonIdx = line.indexOf(':');
                if (colonIdx !== -1) {
                    html += `<span class="grid-label">${line.substring(0, colonIdx + 1).trim()}</span><span class="grid-price">${line.substring(colonIdx + 1).trim()}</span>`;
                } else {
                    html += `<span style="grid-column: span 2;">${line}</span>`;
                }
            });
        } else {
            html += `<span style="grid-column: span 2;">${pin.tp}</span>`;
        }
        html += `</div></div>`;
    } else if (pin.tps && pin.tpw) {
        let sLines = pin.tps.split('<br>'), wLines = pin.tpw.split('<br>');
        let hasCat = pin.tps.includes(':');
        html += `<div class="popup-detail" style="align-items: flex-start;">🎟️ <div class="${hasCat ? 'matrix-price-grid-cat' : 'matrix-price-grid-nocat'}">`;
        if (hasCat) html += `<span class="matrix-empty-header"></span>`;
        html += `<span class="matrix-header">${pin.summer || 'Summer'}</span><span class="matrix-header">${pin.winter || 'Winter'}</span>`;
        for(let i=0; i < Math.max(sLines.length, wLines.length); i++) {
            let sLine = (sLines[i] || "").trim(), wLine = (wLines[i] || "").trim();
            if (hasCat) {
                let colonIdx = sLine.indexOf(':');
                let wColonIdx = wLine.indexOf(':');
                html += `<span class="grid-label">${sLine.substring(0, colonIdx + 1)}</span><span class="grid-price">${sLine.substring(colonIdx + 1).trim()}</span><span class="grid-price">${wColonIdx !== -1 ? wLine.substring(wColonIdx + 1).trim() : wLine}</span>`;
            } else {
                html += `<span class="grid-price">${sLine}</span><span class="grid-price">${wLine}</span>`;
            }
        }
        html += `</div></div>`;
    }
    
    if (pin.note) {
        html += `<div class="popup-detail" style="align-items: flex-start; color: #b16837; font-weight: bold;">
                    💡 <span>${pin.note}</span>
                 </div>`;
    }

    if (pin.w) html += `<div class="popup-detail">🔗 <a href="${pin.w}" target="_blank">Official Website</a></div>`;
    html += `</div>`;
    return html;
}

// ==========================================
// 核心初始化函式
// ==========================================
window.initMapApp = function(config) {
    try {
        if (typeof window.DATA === 'undefined') throw new Error("data.js could not be loaded.");

        let cityData = {}; 
        let masterTl = null; 
        let pinTrigger = null;
        let currentMode = 'overview'; // 【新增】追蹤目前是總覽還是單一城市

        document.getElementById('header-title').innerText = config.countryName.toUpperCase();
        
        let map = L.map('map', { preferCanvas: true }).setView(config.defaultCenter, config.defaultZoom);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { 
            attribution: '&copy; CARTO', updateWhenIdle: true, keepBuffer: 2 
        }).addTo(map);

        // 【修改】關閉原生的叢集點擊自動放大，改由我們手動控制
        let markerClusterGroup = L.markerClusterGroup({ 
            maxClusterRadius: 50,
            zoomToBoundsOnClick: false 
        });

        // 【新增】叢集智慧點擊跳轉機制
        markerClusterGroup.on('clusterclick', function (a) {
            if (currentMode === 'overview') {
                const markers = a.layer.getAllChildMarkers();
                const uniqueCities = new Set(markers.map(m => m.cityId));
                
                if (uniqueCities.size === 1) {
                    // 若叢集裡所有的點都屬於同一個城市，直接跳進該城市
                    const targetCityId = Array.from(uniqueCities)[0];
                    showCity(targetCityId);
                } else {
                    // 若包含多個不同城市的點，則乖乖放大地圖，停留在總覽頁面
                    a.layer.zoomToBounds({padding: [20, 20]});
                }
            } else {
                // 如果已經在單一城市模式，一律執行普通的放大
                a.layer.zoomToBounds({padding: [20, 20]});
            }
        });

        map.addLayer(markerClusterGroup);

        document.getElementById('header-title').onclick = function() { showOverview(); };

        // ===============================================
        // 動態建立全域懸浮 UI
        // ===============================================
        if (!document.getElementById('global-floating-ui')) {
            const floatingUI = document.createElement('div');
            floatingUI.id = 'global-floating-ui';
            
            floatingUI.innerHTML = `
                <div id="scroll-percentage">0%</div>
                <div id="location-indicator">
                    <div id="loc-country">${config.countryName}</div>
                    <div id="loc-city">Overview</div>
                </div>
                <button id="scroll-to-top">↑</button>
                <button id="attraction-list-btn">Attraction List</button>
                <div id="attraction-list-panel"></div>
            `;
            document.body.appendChild(floatingUI);

            const homeBtn = document.querySelector('.home-btn');
            if (homeBtn) floatingUI.appendChild(homeBtn);

            document.getElementById('scroll-to-top').addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            document.getElementById('attraction-list-btn').addEventListener('click', () => {
                document.getElementById('attraction-list-panel').classList.toggle('open');
            });

            window.addEventListener('scroll', () => {
                let scrollTop = window.scrollY || document.documentElement.scrollTop;
                let docHeight = document.body.scrollHeight - window.innerHeight;
                let pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
                pct = Math.max(0, Math.min(100, pct)); 
                
                const pctInd = document.getElementById('scroll-percentage');
                if(pctInd) pctInd.innerText = `${pct}%`;

                const topBtn = document.getElementById('scroll-to-top');
                const locInd = document.getElementById('location-indicator');
                const listBtn = document.getElementById('attraction-list-btn');
                
                const triggerPoint = window.innerHeight * 0.6;

                if (scrollTop > triggerPoint) {
                    if(topBtn) topBtn.classList.add('show');
                    if(pctInd) pctInd.classList.add('show');
                    if(locInd) locInd.classList.add('show');
                    if(listBtn && document.getElementById('attraction-list-panel').innerHTML.trim() !== '') {
                        listBtn.classList.add('show');
                    }
                } else {
                    if(topBtn) topBtn.classList.remove('show');
                    if(pctInd) pctInd.classList.remove('show');
                    if(locInd) locInd.classList.remove('show');
                    if(listBtn) listBtn.classList.remove('show');
                    const panel = document.getElementById('attraction-list-panel');
                    if(panel) panel.classList.remove('open');
                }
            });
        }

        function getCustomIcon(vValue) {
            const v = typeof vValue !== 'undefined' ? parseInt(vValue) : 0; 
            let className = 'custom-marker ' + (v === 0 ? 'marker-v0' : v === 1 ? 'marker-v1' : 'marker-v2');
            return L.divIcon({ className: className, iconSize: [16, 16], iconAnchor: [8, 8] });
        }

        function loadCityData() {
            config.countryKeys.forEach(key => {
                const citiesInKey = window.DATA.markers[key] || [];
                citiesInKey.forEach(item => {
                    if (!config.cityFilter || config.cityFilter(key, item)) {
                        const id = item.city.toLowerCase().replace(/\s+/g, '-');
                        cityData[id] = {
                            name: item.city,
                            center: item.center || config.defaultCenter,
                            desc: item.desc,
                            date: item.date,
                            pins: item.pins || []
                        };
                    }
                });
            });
        }

        function buildFlythroughNotes(cityObj) {
            const wrapper = document.getElementById('trip-notes-wrapper');
            const container = document.getElementById('trip-notes-container');
            const blurBgContainer = document.getElementById('dynamic-blur-bg');
            const listPanel = document.getElementById('attraction-list-panel');
            
            ScrollTrigger.getAll().forEach(t => t.kill());
            if (masterTl) { masterTl.kill(); masterTl = null; }
            if (pinTrigger) { pinTrigger.kill(); pinTrigger = null; }
            
            gsap.set(["#dark-mode-overlay", ".note-card-fly", ".blur-bg-item", "#trip-notes-pinned"], { clearProps: "all" });
            container.innerHTML = '';
            blurBgContainer.innerHTML = ''; 
            if(listPanel) listPanel.innerHTML = ''; 

            if (!cityObj) {
                wrapper.style.display = 'none'; return;
            }

            let notesData = [];

            function extractMedia(obj, fallbackDate, fallbackTitle) {
                let title = obj.title || obj.t || fallbackTitle; 
                if (!title) return null;
                
                let rawDate = obj.date || fallbackDate || "";
                let displayDate = rawDate.replace(/<br>/g, ' - ');
                let photos = [], textsObj = []; 
                let maxIndex = 0;
                
                Object.keys(obj).forEach(k => {
                    let match = k.match(/^photo(\d+)$/);
                    if (match && parseInt(match[1]) > maxIndex) maxIndex = parseInt(match[1]);
                });

                if (maxIndex > 0) {
                    let photoCounter = 0; 
                    for (let i = 1; i <= maxIndex; i++) {
                        if (obj['photo' + i]) {
                            photos.push(obj['photo' + i]);
                            if (obj['text' + i]) textsObj.push({ idx: photoCounter, text: obj['text' + i] });
                            photoCounter++;
                        }
                    }
                } else if (obj.photo) { 
                    photos.push(obj.photo);
                    let fallbackText = obj.text || obj.d;
                    if (fallbackText) textsObj.push({ idx: 0, text: fallbackText }); 
                } else if (obj.photos && obj.photos.length > 0) {
                    photos = obj.photos;
                    let fallbackText = obj.text || obj.d;
                    if (fallbackText) textsObj.push({ idx: -1, text: fallbackText }); 
                }

                if (photos && photos.length > 0) return { title, date: displayDate, photos, textsObj };
                return null;
            }

            window.DATA.events.forEach(event => {
                if(!event.eventMarkers) return;
                let markers = event.eventMarkers.filter(m => m.city.toLowerCase().includes(cityObj.name.toLowerCase()));
                markers.forEach(m => {
                    if(m.notes) m.notes.forEach(note => {
                        let fallbackTitle = m.city + (m.desc ? ` - ${m.desc}` : '');
                        let data = extractMedia(note, m.date, fallbackTitle);
                        if(data) notesData.push(data);
                    });
                });
            });

            cityObj.pins.forEach(pin => {
                let data = extractMedia(pin, pin.date || cityObj.date, pin.t);
                if(data) notesData.push(data);
            });

            let uniqueNotes = [], seenTitles = new Set();
            notesData.forEach(n => {
                let rawTitle = n.title.replace(/<[^>]+>/g, '').trim();
                if(!seenTitles.has(rawTitle)) {
                    seenTitles.add(rawTitle);
                    uniqueNotes.push(n);
                }
            });

            if(uniqueNotes.length === 0) {
                wrapper.style.display = 'none'; return;
            }

            wrapper.style.display = 'block';

            uniqueNotes.forEach((note, index) => {
                let card = document.createElement('div');
                card.className = 'note-card-fly';
                let fanHTML = createFanHTML(note.photos);
                let dateHtml = note.date ? `<div class="date-item">${note.date}</div>` : '';
                let combinedText = note.textsObj.map(tObj => `<div class="text-item" data-match="${tObj.idx}">${tObj.text}</div>`).join(''); 

                card.innerHTML = `<div class="title">${note.title}</div>${fanHTML}<div class="texts-wrapper">${dateHtml}${combinedText}</div>`;
                container.appendChild(card);

                let lastMedia = note.photos[note.photos.length - 1];
                if (lastMedia) {
                    let isVideo = lastMedia.toLowerCase().endsWith('.mov') || lastMedia.toLowerCase().endsWith('.mp4');
                    blurBgContainer.innerHTML += isVideo 
                        ? `<video class="blur-bg-item" id="blur-bg-${index}" src="${lastMedia}" autoplay loop muted playsinline></video>`
                        : `<img class="blur-bg-item" id="blur-bg-${index}" src="${lastMedia}" decoding="async">`;
                } else {
                    blurBgContainer.innerHTML += `<div class="blur-bg-item" id="blur-bg-${index}"></div>`;
                }

                if (listPanel) {
                    let listItem = document.createElement('div');
                    listItem.className = 'attraction-item';
                    listItem.innerText = note.title;
                    listItem.onclick = () => {
                        listPanel.classList.remove('open');
                        if (masterTl && masterTl.scrollTrigger) {
                            let st = masterTl.scrollTrigger;
                            let targetTime = (index === uniqueNotes.length - 1) ? (index * 6 + 8) : (index * 6 + 7.4);
                            targetTime = Math.min(targetTime, masterTl.duration()); 
                            let progress = targetTime / masterTl.duration();
                            let targetScroll = st.start + (st.end - st.start) * progress;
                            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                        }
                    };
                    listPanel.appendChild(listItem);
                }
            });

            setTimeout(() => {
                let totalScrollDistance = uniqueNotes.length * 350; 
                pinTrigger = ScrollTrigger.create({ trigger: "#trip-notes-wrapper", pin: "#trip-notes-pinned", start: "top top", end: `+=${totalScrollDistance}%` });
                masterTl = gsap.timeline({ scrollTrigger: { trigger: "#trip-notes-wrapper", start: "top 80%", end: () => pinTrigger.end, scrub: 1 } });
                masterTl.to("#dark-mode-overlay", { opacity: 0.98, duration: 2, ease: "power1.inOut" }, 0);

                let cards = gsap.utils.toArray('.note-card-fly');
                let bgItems = gsap.utils.toArray('.blur-bg-item');

                cards.forEach((card, i) => {
                    let bgItem = bgItems[i]; 
                    gsap.set(card, { x: (i % 2 === 0) ? "-15vw" : "15vw", yPercent: -50, xPercent: -50, z: -6000, autoAlpha: 0 });
                    if(bgItem) gsap.set(bgItem, { autoAlpha: 0 });

                    let cardTl = gsap.timeline();
                    if (i !== cards.length - 1) {
                        cardTl.to(card, { z: 2000, duration: 10, ease: "none" }, 0).to(card, { autoAlpha: 1, duration: 2.5, ease: "power1.inOut" }, 0).to(card, { autoAlpha: 0, duration: 2.5, ease: "power1.inOut" }, 7.5); 
                        if(bgItem) cardTl.to(bgItem, { autoAlpha: 1, duration: 2.5, ease: "power1.inOut" }, (i === 0) ? 0 : 2.5).to(bgItem, { autoAlpha: 0, duration: 2.5, ease: "power1.inOut" }, 7.5);
                    } else {
                        cardTl.to(card, { z: 0, duration: 8, ease: "power2.out" }, 0).to(card, { autoAlpha: 1, duration: 2.5, ease: "power1.inOut" }, 0);
                        if(bgItem) cardTl.to(bgItem, { autoAlpha: 1, duration: 2.5, ease: "power1.inOut" }, (i === 0) ? 0 : 2.5);
                    }
                    masterTl.add(cardTl, i * 6); 
                });
                ScrollTrigger.refresh();
            }, 200);
        }

        function updateEventList(cityObj) {
            const container = document.getElementById('event-container');
            container.innerHTML = ''; 
            const allTimelineEntries = [];

            let targetCities = cityObj 
                ? [cityObj.name.toLowerCase()] 
                : Object.values(cityData).map(c => c.name.toLowerCase());

            if (targetCities.length === 0) {
                container.innerHTML = '<p style="color:#ccc; font-size:12px; text-align:center; margin-top:20px;">No records found.</p>';
                return;
            }

            window.DATA.events.forEach(event => {
                if (!event.eventMarkers) return;
                const hasMatchingCity = event.eventMarkers.some(m => targetCities.some(tc => m.city.toLowerCase().includes(tc)));
                if (hasMatchingCity) {
                    const timestamps = event.eventMarkers.map(m => new Date(m.date.replace(/<[^>]+>/g, '')).getTime()).filter(t => !isNaN(t));
                    if(timestamps.length > 0) {
                        const minDate = new Date(Math.min(...timestamps)).toISOString().split('T')[0];
                        const maxDate = new Date(Math.max(...timestamps)).toISOString().split('T')[0];
                        allTimelineEntries.push({
                            title: event.text.replace('<br>', ' '),
                            dateDisplay: minDate === maxDate ? minDate : `${minDate} ~ ${maxDate}`,
                            sortDate: minDate,
                            link: event.text.replace(/<br>/g, ' ').replace(/\s+/g, '_') + '.html'
                        });
                    }
                }
            });

            if (cityObj) {
                cityObj.pins.forEach(pin => {
                    if (pin.trip && pin.date) allTimelineEntries.push({ title: pin.trip, dateDisplay: pin.date, sortDate: pin.date, link: null });
                });
            } else {
                Object.values(cityData).forEach(city => {
                    city.pins.forEach(pin => {
                        if (pin.trip && pin.date) allTimelineEntries.push({ title: pin.trip, dateDisplay: pin.date, sortDate: pin.date, link: null });
                    });
                });
            }

            allTimelineEntries.sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));
            const uniqueEntries = allTimelineEntries.filter((v, i, a) => a.findIndex(t => t.title === v.title && t.dateDisplay === v.dateDisplay) === i);

            if (uniqueEntries.length === 0) {
                 container.innerHTML = '<p style="color:#ccc; font-size:12px; text-align:center; margin-top:20px;">No records found.</p>';
            } else {
                uniqueEntries.forEach(ev => {
                    const card = document.createElement('div');
                    card.className = 'event-card' + (ev.link ? '' : ' no-link');
                    card.innerHTML = `<div class="event-name">${ev.title}</div><div class="event-date">${ev.dateDisplay}</div>`;
                    if (ev.link) card.onclick = () => { window.location.href = ev.link; };
                    container.appendChild(card);
                });
            }
        }

        function showOverview() {
            currentMode = 'overview'; // 更新狀態為總覽
            document.getElementById('city-title').innerText = config.overviewTitle;
            document.getElementById('city-desc').innerText = config.overviewDesc;
            document.getElementById('loc-city').innerText = "Overview";
            
            updateEventList(null);
            buildFlythroughNotes(null); 
            
            map.setView(config.defaultCenter, config.defaultZoom);
            markerClusterGroup.clearLayers();

            Object.keys(cityData).forEach(cityId => {
                const city = cityData[cityId];
                city.pins.forEach(pin => {
                    const m = L.marker(pin.loc, { icon: getCustomIcon(pin.v) });
                    m.cityId = cityId; // 綁定該地標所屬的城市 ID
                    
                    // 【新增】總覽頁面不顯示 Popup，改顯示 Hover 提示框，點擊直接進入城市
                    m.bindTooltip(`<b>${city.name}</b><br>${pin.t}`, { direction: 'top', offset: [0, -10], opacity: 0.95 });
                    
                    m.on('click', () => {
                        if (currentMode === 'overview') {
                            showCity(cityId); // 點擊單一點直接跳進該城市
                        }
                    });
                    
                    markerClusterGroup.addLayer(m);
                });
            });

            document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
            setTimeout(() => map.invalidateSize(), 400); 
        }

        function showCity(cityId) {
            currentMode = cityId; // 更新狀態為單一城市
            const data = cityData[cityId];
            if (!data) return;
            document.getElementById('city-title').innerText = data.name;
            document.getElementById('city-desc').innerText = data.desc;
            document.getElementById('loc-city').innerText = data.name;
            map.setView(data.center, 12);
            
            markerClusterGroup.clearLayers();
            data.pins.forEach(pin => {
                // 單一城市模式下，點擊地標才會開啟詳細資訊的 Popup
                const m = L.marker(pin.loc, { icon: getCustomIcon(pin.v) }).bindPopup(createPopupHTML(pin, ""), { maxWidth: 360, minWidth: 320 });
                m.cityId = cityId;
                markerClusterGroup.addLayer(m);
            });
            
            updateEventList(data);
            buildFlythroughNotes(data); 
            
            document.querySelectorAll('.city-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-id') === cityId));
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
            setTimeout(() => map.invalidateSize(), 400); 
        }

        // --- 執行初始化流程 ---
        loadCityData(); 
        const navBar = document.getElementById('nav-bar');
        const sortedCityIds = Object.keys(cityData).sort((a, b) => cityData[a].name.localeCompare(cityData[b].name));
        
        sortedCityIds.forEach(id => {
            const btn = document.createElement('button');
            btn.className = 'city-btn';
            btn.setAttribute('data-id', id);
            btn.innerText = cityData[id].name;
            btn.onclick = () => showCity(id);
            navBar.appendChild(btn);
        });

        window.addEventListener('scroll', () => { if (window.scrollY < 100) map.invalidateSize(); });

        const urlParams = new URLSearchParams(window.location.search);
        let cityParam = urlParams.get('city');

        if (cityParam) {
            let targetId = cityParam.toLowerCase().trim().replace(/\s+/g, '-'); 
            if (!cityData[targetId]) targetId = Object.keys(cityData).find(key => targetId.includes(key) || key.includes(targetId));
            if (targetId && cityData[targetId]) showCity(targetId); 
            else showOverview();
        } else {
            showOverview();
        }

    } catch (error) {
        console.error(error);
        document.getElementById('city-title').innerText = "System Error";
        document.getElementById('city-desc').innerHTML = `Error loading data: ${error.message}`;
    }
};