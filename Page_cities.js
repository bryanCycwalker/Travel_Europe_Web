// 註冊 GSAP 套件
gsap.registerPlugin(ScrollTrigger);

// --- 畫廊互動輔助函式 (全域) ---

// 【新增】偵測是否為「純觸控設備 (如手機、平板)」
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
    
    // 【新增】記錄目前正在展示哪一張照片 (供手機版點擊判斷用)
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
    // 確保抓到正確的外框
    let fanContainer = el.classList.contains('photo-fan') ? el : el.querySelector('.photo-fan');
    if (!fanContainer) return;
    
    // 【新增】清除已選擇的標記
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

// ==========================================
// 【全新】事件分流控制器 (隔離手機與電腦的操作)
// ==========================================
window.onFanEnter = function(el) {
    if(isTouchDevice()) return; // 手機忽略滑鼠進入
    expandFan(el);
}

window.onFanLeave = function(el) {
    if(isTouchDevice()) return; // 手機忽略滑鼠移出
    collapseFan(el);
}

window.onItemEnter = function(el) {
    if(isTouchDevice()) return; // 手機忽略滑鼠懸停
    focusItem(el);
}

window.handleItemTap = function(event, el) {
    if (!isTouchDevice()) return; // 電腦版交給滑鼠處理，忽略點擊
    event.stopPropagation(); // 防止點擊穿透

    let container = el.closest('.photo-fan');
    let currentIndex = el.getAttribute('data-index');
    let activeIndex = container.getAttribute('data-active-index');

    if (activeIndex === currentIndex) {
        // 如果點擊的是「已經在正中央」的照片，就將整組牌收合
        collapseFan(container);
    } else {
        // 如果點擊的是兩側的其他照片，就將它展開並置中
        focusItem(el);
    }
}

function createFanHTML(mediaArray) {
    if(mediaArray.length === 0) return '';
    // 將原本的 onmouseenter 等事件替換為新的控制器
    let html = `<div class="photo-fan" onmouseenter="onFanEnter(this)" onmouseleave="onFanLeave(this)">`;
    let n = mediaArray.length;
    
    mediaArray.forEach((media, i) => {
        let isVideo = media.toLowerCase().endsWith('.mov') || media.toLowerCase().endsWith('.mp4');
        let angle = (i - (n - 1) / 2) * 10;
        
        let content = isVideo 
            ? `<video src="${media}" autoplay loop muted playsinline></video>` 
            : `<img src="${media}" decoding="async" loading="eager">`; 
            
        // 加上 onclick 觸發手機的點擊事件
        html += `<div class="fan-item" data-index="${i}" onmouseenter="onItemEnter(this)" onclick="handleItemTap(event, this)" style="transform: rotate(${angle}deg); z-index: ${i};">${content}</div>`;
    });
    
    html += `</div>`;
    return html;
}

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
        // 使用 💡 圖示，並加上一點斜體與強調色讓它跟一般資訊區隔開來
        html += `<div class="popup-detail" style="align-items: flex-start; color: #b16837; font-weight: bold;">
                    💡 <span>${pin.note}</span>
                 </div>`;
    }

    if (pin.w) html += `<div class="popup-detail">🔗 <a href="${pin.w}" target="_blank">Official Website</a></div>`;
    html += `</div>`;
    return html;
}

// ==========================================
// 核心初始化函式 (由各國的 HTML 呼叫並傳入設定)
// ==========================================
window.initMapApp = function(config) {
    try {
        if (typeof window.DATA === 'undefined') throw new Error("data.js could not be loaded.");

        let cityData = {}; 
        let masterTl = null; 
        let pinTrigger = null;

        // 設定標題
        document.getElementById('header-title').innerText = config.countryName.toUpperCase();
        
        let map = L.map('map', { preferCanvas: true }).setView(config.defaultCenter, config.defaultZoom);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { 
            attribution: '&copy; CARTO', updateWhenIdle: true, keepBuffer: 2 
        }).addTo(map);
        let markerClusterGroup = L.markerClusterGroup({ maxClusterRadius: 50 });
        map.addLayer(markerClusterGroup);

        document.getElementById('header-title').onclick = function() { showOverview(); };

        function getCustomIcon(vValue) {
            const v = typeof vValue !== 'undefined' ? parseInt(vValue) : 0; 
            let className = 'custom-marker ' + (v === 0 ? 'marker-v0' : v === 1 ? 'marker-v1' : 'marker-v2');
            return L.divIcon({ className: className, iconSize: [16, 16], iconAnchor: [8, 8] });
        }

        function loadCityData() {
            config.countryKeys.forEach(key => {
                const citiesInKey = window.DATA.markers[key] || [];
                citiesInKey.forEach(item => {
                    // 利用 config 傳進來的 filter 判斷這座城市是否屬於這個國家
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
            
            ScrollTrigger.getAll().forEach(t => t.kill());
            if (masterTl) { masterTl.kill(); masterTl = null; }
            if (pinTrigger) { pinTrigger.kill(); pinTrigger = null; }
            
            gsap.set(["#dark-mode-overlay", ".note-card-fly", ".blur-bg-item", "#trip-notes-pinned"], { clearProps: "all" });
            container.innerHTML = '';
            blurBgContainer.innerHTML = ''; 

            if (!cityObj) {
                wrapper.style.display = 'none'; return;
            }

            let notesData = [];

            function extractMedia(obj, fallbackDate) {
                let title = obj.title || obj.t; 
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
                        let data = extractMedia(note, m.date);
                        if(data) notesData.push(data);
                    });
                });
            });

            cityObj.pins.forEach(pin => {
                let data = extractMedia(pin, pin.date || cityObj.date);
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
                    gsap.set(card, { x: (i % 2 === 0) ? "-15vw" : "15vw", yPercent: -50, xPercent: -50, z: -4000, autoAlpha: 0 });
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

            // 【新增邏輯】決定要比對的城市名單
            // 如果有點擊特定城市，就只找該城市；如果是 Overview 模式，就抓取當前國家的「所有城市」
            let targetCities = [];
            if (cityObj) {
                targetCities.push(cityObj.name.toLowerCase());
            } else {
                targetCities = Object.values(cityData).map(c => c.name.toLowerCase());
            }

            if (targetCities.length === 0) {
                container.innerHTML = '<p style="color:#ccc; font-size:12px; text-align:center; margin-top:20px;">No records found.</p>';
                return;
            }

            // 1. 載入 Events (大型旅遊事件)
            window.DATA.events.forEach(event => {
                if (!event.eventMarkers) return;
                
                // 檢查這個 event 的 markers 裡，有沒有包含 targetCities 中的任何一個城市
                const hasMatchingCity = event.eventMarkers.some(m => 
                    targetCities.some(tc => m.city.toLowerCase().includes(tc))
                );

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

            // 2. 載入 Pins 中的單獨景點一日遊 (Day Trips)
            if (cityObj) {
                // 單一城市模式：只抓該城市的 pins
                cityObj.pins.forEach(pin => {
                    if (pin.trip && pin.date) {
                        allTimelineEntries.push({ title: pin.trip, dateDisplay: pin.date, sortDate: pin.date, link: null });
                    }
                });
            } else {
                // 全覽模式：遍歷所有城市的 pins
                Object.values(cityData).forEach(city => {
                    city.pins.forEach(pin => {
                        if (pin.trip && pin.date) {
                            allTimelineEntries.push({ title: pin.trip, dateDisplay: pin.date, sortDate: pin.date, link: null });
                        }
                    });
                });
            }

            // 依日期排序並去重
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
            document.getElementById('city-title').innerText = config.overviewTitle;
            document.getElementById('city-desc').innerText = config.overviewDesc;
            updateEventList(null);
            buildFlythroughNotes(null); 
            
            map.setView(config.defaultCenter, config.defaultZoom);
            markerClusterGroup.clearLayers();

            Object.values(cityData).forEach(city => {
                city.pins.forEach(pin => {
                    const m = L.marker(pin.loc, { icon: getCustomIcon(pin.v) }).bindPopup(createPopupHTML(pin, city.name), { maxWidth: 360, minWidth: 320 });
                    markerClusterGroup.addLayer(m);
                });
            });

            document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
            setTimeout(() => map.invalidateSize(), 400); 
        }

        function showCity(cityId) {
            const data = cityData[cityId];
            if (!data) return;
            document.getElementById('city-title').innerText = data.name;
            document.getElementById('city-desc').innerText = data.desc;
            map.setView(data.center, 12);
            
            markerClusterGroup.clearLayers();
            data.pins.forEach(pin => {
                const m = L.marker(pin.loc, { icon: getCustomIcon(pin.v) }).bindPopup(createPopupHTML(pin, ""), { maxWidth: 360, minWidth: 320 });
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