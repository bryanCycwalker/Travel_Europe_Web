// 註冊 GSAP 套件
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 畫廊互動輔助函式
// ==========================================
function isTouchDevice() { return window.matchMedia("(hover: none)").matches; }

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
    const safeTitle = pin.t || 'Unknown Location';
    const wikiUrl = pin.wiki || `https://en.wikipedia.org/wiki/${encodeURIComponent(safeTitle)}`;
    const titleText = cityName ? `${cityName} - ${safeTitle}` : safeTitle;
    
    let html = `<div class="custom-popup"><div class="popup-title">${titleText}</div>`;
    if (pin.p) html += `<img src="${pin.p}" class="popup-image" alt="${safeTitle}">`;
    html += `<div class="popup-desc"><span>${pin.d || ''}</span><a href="${wikiUrl}" target="_blank" class="popup-wiki">Wiki ↗</a></div>`;

    if (pin.ot) {
        html += `<div class="popup-detail" style="align-items: flex-start;">🕒 <div class="time-grid">`;
        String(pin.ot).replace(/<br><br>/g, '<br>').split('<br>').forEach(line => {
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
        let sLines = String(pin.ots).replace(/<br><br>/g, '<br>').split('<br>');
        let wLines = String(pin.otw).replace(/<br><br>/g, '<br>').split('<br>');
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
        let tpStr = String(pin.tp);
        html += `<div class="popup-detail" style="align-items: flex-start;">🎟️ <div class="price-grid">`;
        if (tpStr.includes(':')) {
            tpStr.split('<br>').forEach(line => {
                const colonIdx = line.indexOf(':');
                if (colonIdx !== -1) {
                    html += `<span class="grid-label">${line.substring(0, colonIdx + 1).trim()}</span><span class="grid-price">${line.substring(colonIdx + 1).trim()}</span>`;
                } else {
                    html += `<span style="grid-column: span 2;">${line}</span>`;
                }
            });
        } else {
            html += `<span style="grid-column: span 2;">${tpStr}</span>`;
        }
        html += `</div></div>`;
    } else if (pin.tps && pin.tpw) {
        let sLines = String(pin.tps).split('<br>'), wLines = String(pin.tpw).split('<br>');
        let hasCat = String(pin.tps).includes(':');
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
        let currentMode = 'overview'; 
        let activeCategory = null; 
        let currentMarkers = []; 

        // Your web app's Firebase configuration
        const firebaseConfig = {
        apiKey: "AIzaSyBmls47LxtwWab72E16iq50AU2LOFjxdaU",
        authDomain: "travel-europe-tracker.firebaseapp.com",
        projectId: "travel-europe-tracker",
        storageBucket: "travel-europe-tracker.firebasestorage.app",
        messagingSenderId: "515592186228",
        appId: "1:515592186228:web:920533764ba3d1a9392421"
        };

        // 初始化 Firebase (防止重複初始化)
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.firestore();

        // 防呆：過濾掉不能作為資料庫 ID 的特殊符號
        function sanitizeKey(str) {
            return str.replace(/[\/\\.#$\[\]]/g, '_');
        }

        // 寫入點擊數：呼叫雲端讓數字直接 +1
        async function recordClick(cityId, title) {
            if (!title) return;
            let key = sanitizeKey(`${config.countryName}_${cityId}_${title}`);
            try {
                // 使用 FieldValue.increment(1) 確保全球多人同時點擊時不會算錯
                await db.collection('poi_clicks').doc(key).set({
                    count: firebase.firestore.FieldValue.increment(1)
                }, { merge: true });
            } catch (e) {
                console.error("Firebase write error:", e);
            }
        }

        // ===============================================
        // 【雲端版】動態渲染熱門景點標籤列
        // ===============================================
        async function renderPopularAttractions(mode, targetCityId) {
            let popNav = document.querySelector('.pop-nav-container');
            if (!popNav) {
                popNav = document.createElement('div');
                popNav.className = 'pop-nav-container';
                const navBar = document.getElementById('nav-bar');
                if (navBar && navBar.parentNode) {
                    navBar.parentNode.insertBefore(popNav, navBar.nextSibling);
                }
            }
            
            // 讀取資料時顯示優雅的 Loading 提示
            popNav.innerHTML = '<span style="color:#999; font-size:13px; font-style:italic;">Loading global trends...</span>'; 

            // 1. 🌟 一次性向 Firebase 抓取所有點擊紀錄
            let clickData = {};
            try {
                const snapshot = await db.collection('poi_clicks').get();
                snapshot.forEach(doc => { clickData[doc.id] = doc.data().count; });
            } catch (e) {
                console.error("Firebase read error:", e);
            }

            // 讀取用輔助函式
            function getGlobalClicks(cId, t) {
                if (!t) return 0;
                let key = sanitizeKey(`${config.countryName}_${cId}_${t}`);
                return clickData[key] || 0; // 若雲端沒紀錄則回傳 0
            }

            popNav.innerHTML = ''; // 清空 loading 提示
            let pinsToDisplay = [];

            if (mode === 'overview') {
                Object.keys(cityData).forEach(cId => {
                    cityData[cId].pins.forEach(pin => {
                        if (pin.t) {
                            pinsToDisplay.push({ ...pin, cityId: cId, clicks: getGlobalClicks(cId, pin.t) });
                        }
                    });
                });
                
                pinsToDisplay.sort((a, b) => {
                    if (b.clicks !== a.clicks) return b.clicks - a.clicks;
                    return (b.v || 0) - (a.v || 0);
                });
                pinsToDisplay = pinsToDisplay.slice(0, 10);

            } else if (targetCityId && cityData[targetCityId]) {
                cityData[targetCityId].pins.forEach(pin => {
                    if (pin.t) {
                        pinsToDisplay.push({ ...pin, cityId: targetCityId, clicks: getGlobalClicks(targetCityId, pin.t) });
                    }
                });
                pinsToDisplay.sort((a, b) => {
                    if (b.clicks !== a.clicks) return b.clicks - a.clicks;
                    return (b.v || 0) - (a.v || 0);
                });
            }

            // 2. 產生標籤 DOM
            pinsToDisplay.forEach(pin => {
                const btn = document.createElement('button');
                btn.className = 'pop-attr-btn';
                btn.innerText = `# ${pin.t}`;
                
                let bgUrl = pin.p ? `url('${pin.p}')` : 'linear-gradient(45deg, #b16837, #e6a77e)';
                btn.style.setProperty('--bg-img', bgUrl);
                
                btn.addEventListener('click', (e) => {
                    // 發送點擊資料到 Firebase 雲端！
                    recordClick(pin.cityId, pin.t); 

                    if (isTouchDevice()) {
                        document.querySelectorAll('.pop-attr-btn').forEach(b => b.classList.remove('touched'));
                        btn.classList.add('touched');
                    }
                    
                    if (currentMode === 'overview' || currentMode !== pin.cityId) {
                        // 傳入 true, true 避免突兀跳轉
                        showCity(pin.cityId, true, true);
                        setTimeout(() => {
                            let targetObj = currentMarkers.find(m => m.title === pin.t && m.cityId === pin.cityId);
                            if(targetObj) {
                                map.flyTo(targetObj.marker.getLatLng(), 16, { duration: 1.5 });
                                setTimeout(() => { targetObj.marker.openPopup(); }, 1500);
                            }
                        }, 500); 
                    } else {
                        let targetObj = currentMarkers.find(m => m.title === pin.t && m.cityId === pin.cityId);
                        if(targetObj) {
                            map.flyTo(targetObj.marker.getLatLng(), 16, { duration: 1.5 });
                            setTimeout(() => { targetObj.marker.openPopup(); }, 1500);
                        }
                    }
                });
                popNav.appendChild(btn);
            });
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.pop-attr-btn')) {
                document.querySelectorAll('.pop-attr-btn').forEach(b => b.classList.remove('touched'));
            }
        });

        const categoryMap = {
            'church': { label: 'Religious Sites', color: '#ffffff', border: '#b3b3b3' },
            'museum': { label: 'Museums', color: '#8b5a2b', border: '#5c3a18' },
            'palace': { label: 'Palaces', color: '#9932CC', border: '#4b0082' },
            'castle': { label: 'Fortresses', color: '#808080', border: '#4d4d4d' },
            'square': { label: 'Public Places', color: '#8b0000', border: '#4d0000' },
            'nature': { label: 'Parks & Nature', color: '#32CD32', border: '#006400' },
            'commercial': { label: 'Shopping & Dining', color: '#FFD700', border: '#b8860b' },
            'memorial': { label: 'Memorial', color: '#2d2d2d', border: '#0f0f0f' },
            'other': { label: 'Special Sites', color: '#4682B4', border: '#1e486d' }
        };

        document.getElementById('header-title').innerText = config.countryName.toUpperCase();

        const flagGradients = {
            'belgium': 'linear-gradient(to right, #000000 33.3%, #FDDA24 33.3%, #FDDA24 66.6%, #EF3340 66.6%)',
            'germany': 'linear-gradient(to bottom, #000000 33.3%, #DD0000 33.3%, #DD0000 66.6%, #FFCE00 66.6%)',
            'france': 'linear-gradient(to right, #002395 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #ED2939 66.6%)',
            'italy': 'linear-gradient(to right, #008C45 33.3%, #F4F5F0 33.3%, #F4F5F0 66.6%, #CD212A 66.6%)',
            'spain': 'linear-gradient(to right, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%)',
            'netherlands': 'linear-gradient(to bottom, #AE1C28 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #21468B 66.6%)',
            'austria': 'linear-gradient(to bottom, #ED2939 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #ED2939 66.6%)',
            'default': 'linear-gradient(45deg, #b16837, #e6a77e)' 
        };
        let cNameStr = config.countryName.toLowerCase();
        let flagGrad = flagGradients[cNameStr] || flagGradients['default'];
        document.querySelector('header h1').style.setProperty('--hover-flag', flagGrad);

        let map = L.map('map', { preferCanvas: true }).setView(config.defaultCenter, config.defaultZoom);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { 
            attribution: '&copy; CARTO', updateWhenIdle: true, keepBuffer: 2 
        }).addTo(map);

        let markerClusterGroup = L.markerClusterGroup({ 
            maxClusterRadius: 40, 
            disableClusteringAtZoom: 13, 
            zoomToBoundsOnClick: false 
        });
        let nonClusterGroup = L.layerGroup(); 

        map.addLayer(markerClusterGroup);
        map.addLayer(nonClusterGroup);

        let countryPortalLayer = L.layerGroup();
        
        if (window.DATA.activeCountries) {
            window.DATA.activeCountries.forEach(c => {
                // 防呆：如果是目前正在看的國家，就不要顯示自己的按鈕
                if (c.name.toLowerCase() === config.countryName.toLowerCase()) return;
                
                let icon = L.divIcon({
                    className: 'custom-country-icon',
                    html: `<div class="country-portal-btn">${c.name} ↗</div>`,
                    iconSize: [0, 0] // 設為0讓文字自動撐開並完美置中於座標
                });
                
                // 提高 zIndex 確保按鈕永遠浮在最上層
                let m = L.marker(c.center, { icon: icon, zIndexOffset: 2000 });
                m.on('click', () => { 
                    window.location.href = c.link; // 點擊跳轉到該國網頁
                });
                countryPortalLayer.addLayer(m);
            });
        }

        // 監聽地圖縮放事件 (Zoom)
        map.on('zoomend', () => {
            let threshold = 6; // 🌟 觸發門檻：當縮小到 6 級 (或更小) 時顯示按鈕
            
            if (map.getZoom() <= threshold) {
                if (!map.hasLayer(countryPortalLayer)) map.addLayer(countryPortalLayer);
            } else {
                if (map.hasLayer(countryPortalLayer)) map.removeLayer(countryPortalLayer);
            }
        });
        
        // 初始化載入時檢查一次是否該顯示
        if (map.getZoom() <= 6) map.addLayer(countryPortalLayer);
        // 👆 ==========================================
        const searchUI = L.control({ position: 'bottomleft' });
        searchUI.onAdd = function() {
            let div = L.DomUtil.create('div', 'map-search-wrapper');
            div.innerHTML = `<input type="text" id="map-search-input" placeholder="Search attraction..." autocomplete="off"><ul id="map-search-results"></ul>`;
            L.DomEvent.disableClickPropagation(div);
            return div;
        };
        searchUI.addTo(map);

        const legendUI = L.control({ position: 'bottomright' });
        legendUI.onAdd = function() {
            let div = L.DomUtil.create('div', 'map-legend');
            let html = `
                <div class="legend-header">
                    <span>POI Categories</span>
                    <span class="legend-toggle-icon">▼</span>
                </div>
                <div class="legend-content">
            `;
            Object.keys(categoryMap).forEach(key => {
                html += `<div class="legend-item" data-cat="${key}"><div class="legend-color" style="background:${categoryMap[key].color}; border:2px solid ${categoryMap[key].border};"></div><span>${categoryMap[key].label}</span></div>`;
            });
            html += `</div>`;
            div.innerHTML = html;
            L.DomEvent.disableClickPropagation(div);

            let header = div.querySelector('.legend-header');
            header.addEventListener('click', function() {
                div.classList.toggle('collapsed');
                let icon = div.querySelector('.legend-toggle-icon');
                icon.innerText = div.classList.contains('collapsed') ? '▲' : '▼';
            });
            return div;
        };
        legendUI.addTo(map);

        document.querySelectorAll('.legend-item').forEach(item => {
            item.addEventListener('click', function() {
                const clickedCat = this.getAttribute('data-cat');
                map.closePopup();

                if (activeCategory === clickedCat) {
                    activeCategory = null;
                    document.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));
                } else {
                    activeCategory = clickedCat;
                    document.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));
                    this.classList.add('active');
                }

                let bounds = L.latLngBounds();
                let hasMatchingMarkers = false;

                markerClusterGroup.clearLayers();
                nonClusterGroup.clearLayers();
                let clusterGroupToAdd = []; 

                currentMarkers.forEach(mObj => {
                    let isMatch = (activeCategory && mObj.cat === activeCategory);
                    let isDimmed = (activeCategory && mObj.cat !== activeCategory);
                    
                    let extraClass = isMatch ? 'marker-highlighted' : (isDimmed ? 'marker-dimmed' : '');
                    mObj.marker.setIcon(getCategoryIcon(mObj.cat, mObj.title, extraClass));

                    if (isMatch) {
                        mObj.marker.setZIndexOffset(1000);
                        bounds.extend(mObj.marker.getLatLng());
                        hasMatchingMarkers = true;
                        nonClusterGroup.addLayer(mObj.marker); 
                    } else if (isDimmed) {
                        mObj.marker.setZIndexOffset(-10);
                        if (currentMode === 'overview') clusterGroupToAdd.push(mObj.marker); 
                        else nonClusterGroup.addLayer(mObj.marker); 
                    } else {
                        mObj.marker.setZIndexOffset(0);
                        if (currentMode === 'overview') clusterGroupToAdd.push(mObj.marker);
                        else nonClusterGroup.addLayer(mObj.marker);
                    }
                });

                if (clusterGroupToAdd.length > 0) {
                    markerClusterGroup.addLayers(clusterGroupToAdd);
                }

                if (activeCategory && hasMatchingMarkers) {
                    map.flyToBounds(bounds, { padding: [60, 60], maxZoom: 15, duration: 1.2 });
                } else if (!activeCategory) {
                    if (currentMode === 'overview') {
                        map.flyTo(config.defaultCenter, config.defaultZoom, { duration: 1.2 });
                    } else {
                        const data = cityData[currentMode];
                        if (data) map.flyTo(data.center, 12, { duration: 1.2 });
                    }
                }
            });
        });

        const searchInput = document.getElementById('map-search-input');
        const searchResults = document.getElementById('map-search-results');

        searchInput.addEventListener('input', function() {
            const val = this.value.toLowerCase().trim();
            searchResults.innerHTML = '';
            if (val.length < 1) { searchResults.classList.remove('active'); return; }

            let matches = currentMarkers.filter(m => m.title.toLowerCase().includes(val));
            
            if (matches.length > 0) {
                searchResults.classList.add('active');
                matches.forEach(mObj => {
                    let li = document.createElement('li');
                    li.className = 'search-result-item';
                    li.innerHTML = `<b>${mObj.title}</b> <span class="search-city-hint">${mObj.cityName}</span>`;
                    
                    li.onclick = () => {
                        searchInput.value = '';
                        searchResults.classList.remove('active');
                        
                        if (currentMode === 'overview') {
                            showCity(mObj.cityId);
                            setTimeout(() => {
                                let targetMarkerObj = currentMarkers.find(m => m.title === mObj.title && m.cityId === mObj.cityId);
                                if(targetMarkerObj) {
                                    map.flyTo(targetMarkerObj.marker.getLatLng(), 16, { duration: 1.5 });
                                    setTimeout(() => { targetMarkerObj.marker.openPopup(); }, 1500);
                                }
                            }, 500);
                        } else {
                            map.flyTo(mObj.marker.getLatLng(), 16, { duration: 1.5 });
                            setTimeout(() => { mObj.marker.openPopup(); }, 1500);
                        }
                    };
                    searchResults.appendChild(li);
                });
            } else {
                searchResults.classList.remove('active');
            }
        });

        map.on('click', () => { searchResults.classList.remove('active'); });

        // ===============================================
        // 【升級】地圖縮放與移動事件監聽 (智慧雙向跳轉)
        // ===============================================
        map.on('moveend', function() {
            // 🌟 防呆：如果地圖是因為我們的程式碼 (flyToBounds) 正在飛行，就禁止觸發智慧跳轉！
            if (window.isMapFlying) return; 

            // 1. 智慧跳轉總覽 (向外縮小 Zoom Out)
            let thresholdZoomOut = config.defaultZoom + 1; 
            if (currentMode !== 'overview' && map.getZoom() <= thresholdZoomOut) {
                showOverview(true, true); 
                return; 
            }

            // 2. 智慧跳轉城市 (向內放大 Zoom In 或 拖曳平移)
            let thresholdZoomIn = 11; 
            if (map.getZoom() >= thresholdZoomIn) {
                let currentCenter = map.getCenter();
                let closestCity = null;
                let minDistance = Infinity;

                // 掃描資料庫，計算距離畫面中心點最近的城市
                Object.keys(cityData).forEach(cityId => {
                    let cityCenter = cityData[cityId].center;
                    let dist = map.distance(currentCenter, cityCenter); // 計算實際距離(公尺)
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestCity = cityId;
                    }
                });

                // 如果畫面中心距離某城市小於 25 公里，且介面還沒切換過去，就自動切換！
                if (closestCity && minDistance < 25000 && currentMode !== closestCity) {
                    // 傳入 true, true：默默幫他切換左側清單與UI，但地圖維持在他手動滑到的地方
                    showCity(closestCity, true, true); 
                }
            }
        });
        // ===============================================

        function getCategoryIcon(catKey, title, extraClass = '') {
            let catInfo = categoryMap[catKey] || categoryMap['other'];
            let safeTitle = title || ''; 
            let html = `
                <div class="marker-pin" style="background-color: ${catInfo.color}; border: 2px solid ${catInfo.border};"></div>
                <div class="marker-label">${safeTitle}</div>
            `;
            return L.divIcon({ className: `custom-div-icon ${extraClass}`, html: html, iconSize: [18, 18], iconAnchor: [9, 9] });
        }

        markerClusterGroup.on('clusterclick', function (a) {
            if (currentMode === 'overview') {
                const markers = a.layer.getAllChildMarkers();
                const uniqueCities = new Set(markers.map(m => m.cityId));
                if (uniqueCities.size === 1) {
                    showCity(Array.from(uniqueCities)[0]);
                } else {
                    a.layer.zoomToBounds({padding: [20, 20]});
                }
            } else {
                a.layer.zoomToBounds({padding: [20, 20]});
            }
        });

        // 全域懸浮 UI (只保留百分比與底部指示器)
        if (!document.getElementById('global-floating-ui')) {
            const floatingUI = document.createElement('div');
            floatingUI.id = 'global-floating-ui';
            floatingUI.innerHTML = `
                <div id="scroll-percentage">0%</div>
                <div id="location-indicator"><div id="loc-country">${config.countryName}</div><div id="loc-city">Overview</div></div>
                <button id="scroll-to-top">↑</button>
            `;
            document.body.appendChild(floatingUI);
            
            const homeBtn = document.querySelector('.home-btn');
            if (homeBtn) floatingUI.appendChild(homeBtn);
            
            document.getElementById('scroll-to-top').addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
            
            window.addEventListener('scroll', () => {
                let scrollTop = window.scrollY || document.documentElement.scrollTop;
                let docHeight = document.body.scrollHeight - window.innerHeight;
                let pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
                pct = Math.max(0, Math.min(100, pct)); 
                
                const pctInd = document.getElementById('scroll-percentage');
                if(pctInd) pctInd.innerText = `${pct}%`;
                
                const topBtn = document.getElementById('scroll-to-top');
                const locInd = document.getElementById('location-indicator');
                const triggerPoint = window.innerHeight * 0.6;
                
                if (scrollTop > triggerPoint) {
                    if(topBtn) topBtn.classList.add('show');
                    if(pctInd) pctInd.classList.add('show');
                    if(locInd) locInd.classList.add('show');
                } else {
                    if(topBtn) topBtn.classList.remove('show');
                    if(pctInd) pctInd.classList.remove('show');
                    if(locInd) locInd.classList.remove('show');
                }
            });
        }

        function loadCityData() {
            config.countryKeys.forEach(key => {
                const citiesInKey = window.DATA.markers[key] || [];
                citiesInKey.forEach(item => {
                    if (!config.cityFilter || config.cityFilter(key, item)) {
                        const id = item.city.toLowerCase().replace(/\s+/g, '-');
                        cityData[id] = { name: item.city, center: item.center || config.defaultCenter, desc: item.desc, date: item.date, pins: item.pins || [] };
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

            let oldHeader = document.getElementById('gallery-header-bar');
            if (oldHeader) oldHeader.remove();

            if (!cityObj) {
                wrapper.style.display = 'none'; return;
            }

            let headerBar = document.createElement('div');
            headerBar.id = 'gallery-header-bar';
            headerBar.innerHTML = `
                <div id="gallery-main-title">Bryan's Memories of Places</div>
                <div id="attraction-list-container">
                    <button id="attraction-list-btn">Attraction List</button>
                    <div id="attraction-list-panel"></div>
                </div>
            `;
            wrapper.insertBefore(headerBar, wrapper.firstChild);
            
            document.getElementById('attraction-list-btn').addEventListener('click', () => {
                document.getElementById('attraction-list-panel').classList.toggle('open');
            });
            const listPanel = document.getElementById('attraction-list-panel');

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
                
                // 🌟 當標題列捲動到頂部時釘選
                ScrollTrigger.create({
                    trigger: "#gallery-header-bar",
                    start: "top 25px", 
                    end: `+=${totalScrollDistance}%`, 
                    pin: true,
                    pinSpacing: false
                });

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

        // ===============================================
        // 🌟 【新增】動態盤點並更新圖例狀態 (有景點才亮起)
        // ===============================================
        function updateLegendStatus(mode, targetCityId) {
            let availableCats = new Set();
            
            // 1. 盤點畫面上目前擁有的類別
            if (mode === 'overview') {
                Object.values(cityData).forEach(city => {
                    city.pins.forEach(pin => availableCats.add(pin.cat || 'other'));
                });
            } else if (targetCityId && cityData[targetCityId]) {
                cityData[targetCityId].pins.forEach(pin => availableCats.add(pin.cat || 'other'));
            }

            // 2. 比對圖例按鈕，若沒有該類別則加上 empty-category 淡化它
            document.querySelectorAll('.legend-item').forEach(item => {
                let cat = item.getAttribute('data-cat');
                if (availableCats.has(cat)) {
                    item.classList.remove('empty-category');
                } else {
                    item.classList.add('empty-category');
                    item.classList.remove('active'); // 防呆：如果原本是選取狀態，強制取消
                }
            });
        }

        function showOverview(preventScroll = false, preventSetView = false) {
            currentMode = 'overview'; 
            const newUrl = new URL(window.location);
            newUrl.searchParams.delete('city');
            window.history.pushState({ path: newUrl.href }, '', newUrl.href);
            
            const cityInfoEl = document.getElementById('city-info');
            if (cityInfoEl) {
                cityInfoEl.classList.add('hidden-mode');
                cityInfoEl.style.display = 'block'; 
            }

            document.getElementById('city-title').innerText = config.overviewTitle;
            document.getElementById('city-desc').innerText = config.overviewDesc;
            document.getElementById('loc-city').innerText = "Overview";
            
            updateEventList(null);
            buildFlythroughNotes(null); 
            
            markerClusterGroup.clearLayers();
            nonClusterGroup.clearLayers();
            currentMarkers = [];
            activeCategory = null;
            document.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));

            // 全國總覽：掃描「所有」城市的景點計算邊界
            let bounds = L.latLngBounds();
            let hasPins = false;
            let markersToAdd = []; 
            
            Object.keys(cityData).forEach(cityId => {
                const city = cityData[cityId];
                city.pins.forEach(pin => {
                    if (pin.loc) {
                        bounds.extend(pin.loc);
                        hasPins = true;
                    }
                    const icon = getCategoryIcon(pin.cat, pin.t);
                    const m = L.marker(pin.loc, { icon: icon });
                    m.cityId = cityId; 
                    m.bindTooltip(`<b>${city.name}</b><br>${pin.t || ''}`, { direction: 'top', offset: [0, -10], opacity: 0.95 });
                    m.on('click', () => { 
                        recordClick(cityId, pin.t);
                        if (currentMode === 'overview') showCity(cityId); 
                    });
                    markersToAdd.push(m);
                    currentMarkers.push({ marker: m, title: pin.t || '', cityName: city.name, cat: pin.cat || 'other', cityId: cityId });
                });
            });

            markerClusterGroup.addLayers(markersToAdd);
            document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
            
            if (!preventScroll) window.scrollTo({ top: 0, behavior: 'smooth' }); 
            setTimeout(() => map.invalidateSize(), 400); 
            renderPopularAttractions('overview', null);
            updateLegendStatus('overview', null);

            // 執行全國完美縮放 (加入飛行保護)
            if (!preventSetView) {
                window.isMapFlying = true; // 🌟 維持開啟飛行保護
                
                // 直接使用你在 HTML config 裡設定好的國家中心點與縮放大小
                map.flyTo(config.defaultCenter, config.defaultZoom, { duration: 1.2 });
                
                map.once('moveend', () => { setTimeout(() => window.isMapFlying = false, 100); });
            }
        }

        function showCity(cityId, preventScroll = false, preventSetView = false) {
            currentMode = cityId; 
            const data = cityData[cityId];
            if (!data) return;
            
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('city', cityId);
            window.history.pushState({ path: newUrl.href }, '', newUrl.href);

            const cityInfoEl = document.getElementById('city-info');
            if (cityInfoEl) {
                cityInfoEl.style.display = 'block';
                setTimeout(() => cityInfoEl.classList.remove('hidden-mode'), 10);
            }

            document.getElementById('city-title').innerText = data.name;
            document.getElementById('city-desc').innerText = data.desc;
            document.getElementById('loc-city').innerText = data.name;
            
            markerClusterGroup.clearLayers();
            nonClusterGroup.clearLayers();
            currentMarkers = [];
            activeCategory = null;
            document.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));
            
            // 單一城市：只計算「該城市」的景點邊界
            let bounds = L.latLngBounds();
            let hasPins = false;
            
            data.pins.forEach(pin => {
                const icon = getCategoryIcon(pin.cat, pin.t);
                if (pin.loc) {
                    bounds.extend(pin.loc);
                    hasPins = true;
                }
                const m = L.marker(pin.loc, { icon: icon }).bindPopup(createPopupHTML(pin, ""), { 
                    maxWidth: 360, minWidth: 320, maxHeight: 320, autoPan: false  
                });
                m.cityId = cityId;
                
                m.on('click', () => { 
                    recordClick(cityId, pin.t); 
                    let currentZoom = map.getZoom();
                    let targetPoint = map.project(pin.loc, currentZoom);
                    let yOffset = window.innerWidth <= 768 ? 160 : 180;
                    targetPoint.y -= yOffset; 
                    let targetLatLng = map.unproject(targetPoint, currentZoom);
                    
                    window.isMapFlying = true; // 🌟 開啟氣泡置中飛行保護
                    map.flyTo(targetLatLng, currentZoom, { animate: true, duration: 0.5 });
                    map.once('moveend', () => { setTimeout(() => window.isMapFlying = false, 100); });
                });
                
                nonClusterGroup.addLayer(m);
                currentMarkers.push({ marker: m, title: pin.t || '', cityName: data.name, cat: pin.cat || 'other', cityId: cityId });
            });
            
            updateEventList(data);
            buildFlythroughNotes(data); 
            document.querySelectorAll('.city-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-id') === cityId));
            
            if (!preventScroll) window.scrollTo({ top: 0, behavior: 'smooth' }); 
            setTimeout(() => map.invalidateSize(), 400); 
            renderPopularAttractions('city', cityId); 
            updateLegendStatus('city', cityId);

            // 執行單一城市完美縮放 (加入飛行保護)
            if (!preventSetView) {
                if (hasPins) {
                    window.isMapFlying = true; // 🌟 開啟飛行保護
                    map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 14, duration: 1.2 });
                    map.once('moveend', () => { setTimeout(() => window.isMapFlying = false, 100); });
                } else {
                    window.isMapFlying = true;
                    map.flyTo(data.center, 12, { duration: 1.2 });
                    map.once('moveend', () => { setTimeout(() => window.isMapFlying = false, 100); });
                }
            }
        }

        // --- 執行初始化流程 ---
        loadCityData(); 
        
        const cityTitleEl = document.getElementById('city-title');
        if (cityTitleEl) {
            cityTitleEl.addEventListener('click', () => {
                if (currentMode === 'overview') {
                    showOverview(true); 
                } else {
                    showCity(currentMode, true); 
                }
            });
        }
        const headerTitleEl = document.getElementById('header-title');
        if (headerTitleEl) {
            headerTitleEl.addEventListener('click', () => {
                // 這裡不傳入 true，讓它完整重置視角並捲動到最上方
                showOverview(); 
            });
        }
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
        window.addEventListener('popstate', () => {
            const params = new URLSearchParams(window.location.search);
            let currentCityParam = params.get('city');
            
            if (currentCityParam && cityData[currentCityParam]) {
                // 傳入 true, true 代表自動切換時，不要強迫滾動網頁或移動地圖
                showCity(currentCityParam, true, true); 
            } else {
                showOverview(true, true);
            }
        });

    } catch (error) {
        console.error(error);
        document.getElementById('city-title').innerText = "System Error";
        document.getElementById('city-desc').innerHTML = `Error loading data: ${error.message}`;
    }
};