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
// 地圖氣泡框 Pop-up 產生器 (加入字串防呆)
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

        // ===============================================
        // 【新增】本地端演算法：記錄與讀取景點點擊次數 (模擬過往一年的 Data)
        // ===============================================
        function recordClick(cityId, title) {
            if (!title) return;
            let key = `poi_click_count_${config.countryName}_${cityId}_${title}`;
            let clicks = parseInt(localStorage.getItem(key) || '0');
            localStorage.setItem(key, clicks + 1);
        }

        function getClicks(cityId, title) {
            if (!title) return 0;
            let key = `poi_click_count_${config.countryName}_${cityId}_${title}`;
            return parseInt(localStorage.getItem(key) || '0');
        }
        // ===============================================
        // ===============================================
        // 【新增】動態渲染熱門景點標籤列
        // ===============================================
        function renderPopularAttractions(mode, targetCityId) {
            let popNav = document.querySelector('.pop-nav-container');
            if (!popNav) {
                popNav = document.createElement('div');
                popNav.className = 'pop-nav-container';
                const navBar = document.getElementById('nav-bar');
                if (navBar && navBar.parentNode) {
                    navBar.parentNode.insertBefore(popNav, navBar.nextSibling);
                }
            }
            popNav.innerHTML = ''; // 清空舊的標籤

            let pinsToDisplay = [];

            if (mode === 'overview') {
                // 【國家視野】：蒐集全國所有點，依照點擊數與重要度排序，取前 10 名
                Object.keys(cityData).forEach(cId => {
                    cityData[cId].pins.forEach(pin => {
                        if (pin.t) {
                            pinsToDisplay.push({ ...pin, cityId: cId, clicks: getClicks(cId, pin.t) });
                        }
                    });
                });
                
                // 排序演算法：優先比對點擊次數，若次數相同則比對原始重要度 (v)
                pinsToDisplay.sort((a, b) => {
                    if (b.clicks !== a.clicks) return b.clicks - a.clicks;
                    return (b.v || 0) - (a.v || 0);
                });
                pinsToDisplay = pinsToDisplay.slice(0, 10);

            } else if (targetCityId && cityData[targetCityId]) {
                // 【城市視野】：把該城市所有的點都列出來，並依據熱門度微調順序
                cityData[targetCityId].pins.forEach(pin => {
                    if (pin.t) {
                        pinsToDisplay.push({ ...pin, cityId: targetCityId, clicks: getClicks(targetCityId, pin.t) });
                    }
                });
                pinsToDisplay.sort((a, b) => {
                    if (b.clicks !== a.clicks) return b.clicks - a.clicks;
                    return (b.v || 0) - (a.v || 0);
                });
            }

            // 產生標籤 DOM
            pinsToDisplay.forEach(pin => {
                const btn = document.createElement('button');
                btn.className = 'pop-attr-btn';
                btn.innerText = `# ${pin.t}`;
                
                // 防呆：如果沒有照片(p)，則給予優雅的琥珀色漸層背景
                let bgUrl = pin.p ? `url('${pin.p}')` : 'linear-gradient(45deg, #b16837, #e6a77e)';
                btn.style.setProperty('--bg-img', bgUrl);
                
                btn.addEventListener('click', (e) => {
                    // 記錄該景點被點擊了！(增加演算法權重)
                    recordClick(pin.cityId, pin.t); 

                    // 手機版邏輯：第一次顯示照片，第二次跳轉
                    if (isTouchDevice()) {
                        if (!btn.classList.contains('touched')) {
                            document.querySelectorAll('.pop-attr-btn').forEach(b => b.classList.remove('touched'));
                            btn.classList.add('touched');
                            return; 
                        }
                    }
                    
                    // 電腦版 或 手機第二次點擊：飛梭跳轉並打開 Popup
                    if (currentMode === 'overview' || currentMode !== pin.cityId) {
                        showCity(pin.cityId);
                        setTimeout(() => {
                            let targetObj = currentMarkers.find(m => m.title === pin.t && m.cityId === pin.cityId);
                            if(targetObj) {
                                map.flyTo(targetObj.marker.getLatLng(), 16, { duration: 1.5 });
                                setTimeout(() => { targetObj.marker.openPopup(); }, 1500);
                            }
                        }, 500); // 給地圖半秒鐘切換圖層
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

        // 點擊空白處取消手機版的 Hover 預覽狀態
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.pop-attr-btn')) {
                document.querySelectorAll('.pop-attr-btn').forEach(b => b.classList.remove('touched'));
            }
        });
        // ===============================================
        const categoryMap = {
            'church': { label: 'Religious Sites', color: '#ffffff', border: '#b3b3b3' },
            'museum': { label: 'Museums', color: '#8b5a2b', border: '#5c3a18' },
            'palace': { label: 'Palaces', color: '#9932CC', border: '#4b0082' },
            'castle': { label: 'Fortresses', color: '#808080', border: '#4d4d4d' },
            'square': { label: 'Public Places', color: '#8b0000', border: '#4d0000' },
            'nature': { label: 'Parks & Nature', color: '#32CD32', border: '#006400' },
            'commercial': { label: 'Shopping & Dining', color: '#FFD700', border: '#b8860b' },
            'other': { label: 'Special Sites', color: '#4682B4', border: '#1e486d' }
        };

document.getElementById('header-title').innerText = config.countryName.toUpperCase();

        // ===============================================
        // 【新增】國家國旗漸層資料庫 (支援擴充其他國家)
        // ===============================================
        const flagGradients = {
            'belgium': 'linear-gradient(to right, #000000 33.3%, #FDDA24 33.3%, #FDDA24 66.6%, #EF3340 66.6%)',
            'germany': 'linear-gradient(to bottom, #000000 33.3%, #DD0000 33.3%, #DD0000 66.6%, #FFCE00 66.6%)',
            'france': 'linear-gradient(to right, #002395 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #ED2939 66.6%)',
            'italy': 'linear-gradient(to right, #008C45 33.3%, #F4F5F0 33.3%, #F4F5F0 66.6%, #CD212A 66.6%)',
            'spain': 'linear-gradient(to right, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%)',
            'netherlands': 'linear-gradient(to bottom, #AE1C28 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #21468B 66.6%)',
            'austria': 'linear-gradient(to bottom, #ED2939 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #ED2939 66.6%)',
            'default': 'linear-gradient(45deg, #b16837, #e6a77e)' // 預設漸層
        };
        // 抓取設定中的國家名稱並轉換為小寫比對
        let cNameStr = config.countryName.toLowerCase();
        let flagGrad = flagGradients[cNameStr] || flagGradients['default'];
        // 將漸層寫入 CSS 變數中供 h1 使用
        document.querySelector('header h1').style.setProperty('--hover-flag', flagGrad);
        // ===============================================

        let map = L.map('map', { preferCanvas: true }).setView(config.defaultCenter, config.defaultZoom);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { 
            attribution: '&copy; CARTO', updateWhenIdle: true, keepBuffer: 2 
        }).addTo(map);

let markerClusterGroup = L.markerClusterGroup({ 
    maxClusterRadius: 40,        // 1. 降低聚合半徑（預設通常是 80，改小會讓點更容易獨立）
    disableClusteringAtZoom: 13, // 2. 🌟 關鍵：當地圖放大到 13 級或以上時，強制停止所有聚合
    zoomToBoundsOnClick: false 
});
        let nonClusterGroup = L.layerGroup(); 

        map.addLayer(markerClusterGroup);
        map.addLayer(nonClusterGroup);

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
            let html = `<div style="font-weight:bold; border-bottom:1px solid #ddd; padding-bottom:4px; margin-bottom:4px; text-align:center;">POI Categories</div>`;
            Object.keys(categoryMap).forEach(key => {
                html += `<div class="legend-item" data-cat="${key}"><div class="legend-color" style="background:${categoryMap[key].color}; border:2px solid ${categoryMap[key].border};"></div><span>${categoryMap[key].label}</span></div>`;
            });
            div.innerHTML = html;
            L.DomEvent.disableClickPropagation(div);
            return div;
        };
        legendUI.addTo(map);

        document.querySelectorAll('.legend-item').forEach(item => {
            item.addEventListener('click', function() {
                const clickedCat = this.getAttribute('data-cat');
                if (activeCategory === clickedCat) {
                    activeCategory = null;
                    document.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));
                    currentMarkers.forEach(mObj => {
                        let iconEl = mObj.marker.getElement();
                        if(iconEl) {
                            iconEl.classList.remove('marker-highlighted', 'marker-dimmed');
                            mObj.marker.setZIndexOffset(0);
                        }
                    });
                } else {
                    activeCategory = clickedCat;
                    document.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));
                    this.classList.add('active');
                    currentMarkers.forEach(mObj => {
                        let iconEl = mObj.marker.getElement();
                        if(iconEl) {
                            if (mObj.cat === activeCategory) {
                                iconEl.classList.remove('marker-dimmed');
                                iconEl.classList.add('marker-highlighted');
                                mObj.marker.setZIndexOffset(1000); 
                            } else {
                                iconEl.classList.remove('marker-highlighted');
                                iconEl.classList.add('marker-dimmed');
                                mObj.marker.setZIndexOffset(-10); 
                            }
                        }
                    });
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
                            // 給地圖一點時間切換模式與渲染圖層，然後再飛過去打開
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
        // 【修改】地圖縮放事件監聽
        // ===============================================
        map.on('zoomend', function() {
            // 1. 維持圖例高亮狀態 (避免縮放後顏色重置)
            if (activeCategory) {
                setTimeout(() => {
                    currentMarkers.forEach(mObj => {
                        let iconEl = mObj.marker.getElement();
                        if(iconEl) {
                            if (mObj.cat === activeCategory) {
                                iconEl.classList.remove('marker-dimmed');
                                iconEl.classList.add('marker-highlighted');
                                mObj.marker.setZIndexOffset(1000); 
                            } else {
                                iconEl.classList.remove('marker-highlighted');
                                iconEl.classList.add('marker-dimmed');
                                mObj.marker.setZIndexOffset(-10); 
                            }
                        }
                    });
                }, 150); 
            }

            // 2. 【全新加入】智慧跳轉總覽功能
            // 如果目前是在「城市模式」，且使用者縮小地圖到 config.defaultZoom + 1 (代表拉遠到能看見其他城市了)
            // 則自動觸發返回「全國總覽」模式！
            let thresholdZoom = config.defaultZoom + 1; // 自動計算合理的退回臨界值
            if (currentMode !== 'overview' && map.getZoom() <= thresholdZoom) {
                showOverview();
            }
        });
        // ===============================================

        // 產生對應顏色的地標 Icon，並將景點名稱 (title) 注入標籤中
        function getCategoryIcon(catKey, title) {
            let catInfo = categoryMap[catKey] || categoryMap['other'];
            // 確保有抓到名稱，如果真的沒有才給空字串
            let safeTitle = title || ''; 
            let html = `
                <div class="marker-pin" style="background-color: ${catInfo.color}; border: 2px solid ${catInfo.border};"></div>
                <div class="marker-label">${safeTitle}</div>
            `;
            return L.divIcon({ className: 'custom-div-icon', html: html, iconSize: [18, 18], iconAnchor: [9, 9] });
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

        document.getElementById('header-title').onclick = function() { showOverview(); };

        if (!document.getElementById('global-floating-ui')) {
            const floatingUI = document.createElement('div');
            floatingUI.id = 'global-floating-ui';
            floatingUI.innerHTML = `
                <div id="scroll-percentage">0%</div>
                <div id="location-indicator"><div id="loc-country">${config.countryName}</div><div id="loc-city">Overview</div></div>
                <button id="scroll-to-top">↑</button>
                <button id="attraction-list-btn">Attraction List</button>
                <div id="attraction-list-panel"></div>
            `;
            document.body.appendChild(floatingUI);
            const homeBtn = document.querySelector('.home-btn');
            if (homeBtn) floatingUI.appendChild(homeBtn);
            document.getElementById('scroll-to-top').addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
            document.getElementById('attraction-list-btn').addEventListener('click', () => { document.getElementById('attraction-list-panel').classList.toggle('open'); });
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
                    if(listBtn && document.getElementById('attraction-list-panel').innerHTML.trim() !== '') listBtn.classList.add('show');
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
            currentMode = 'overview'; 
            document.getElementById('city-title').innerText = config.overviewTitle;
            document.getElementById('city-desc').innerText = config.overviewDesc;
            document.getElementById('loc-city').innerText = "Overview";
            
            updateEventList(null);
            buildFlythroughNotes(null); 
            
            map.setView(config.defaultCenter, config.defaultZoom);
            
            // 清空雙軌圖層與追蹤陣列
            markerClusterGroup.clearLayers();
            nonClusterGroup.clearLayers();
            currentMarkers = [];
            
            // 重置篩選狀態
            activeCategory = null;
            document.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));

            let markersToAdd = []; 
            Object.keys(cityData).forEach(cityId => {
                const city = cityData[cityId];
                city.pins.forEach(pin => {
                    const icon = getCategoryIcon(pin.cat, pin.t);
                    const m = L.marker(pin.loc, { icon: icon });
                    m.cityId = cityId; 
                    
                    m.bindTooltip(`<b>${city.name}</b><br>${pin.t || ''}`, { direction: 'top', offset: [0, -10], opacity: 0.95 });
                    
                    // 【修改】點擊地圖標記時，也要記錄點擊次數！
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
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
            setTimeout(() => map.invalidateSize(), 400); 

            // 【新增】呼叫渲染器，畫出全國 Top 10
            renderPopularAttractions('overview', null);
        }

        function showCity(cityId) {
            currentMode = cityId; 
            const data = cityData[cityId];
            if (!data) return;
            document.getElementById('city-title').innerText = data.name;
            document.getElementById('city-desc').innerText = data.desc;
            document.getElementById('loc-city').innerText = data.name;
            map.setView(data.center, 12);
            
            markerClusterGroup.clearLayers();
            nonClusterGroup.clearLayers();
            currentMarkers = [];

            activeCategory = null;
            document.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));
            
            data.pins.forEach(pin => {
                const icon = getCategoryIcon(pin.cat, pin.t);
                const m = L.marker(pin.loc, { icon: icon }).bindPopup(createPopupHTML(pin, ""), { maxWidth: 360, minWidth: 320 });
                m.cityId = cityId;
                
                // 【修改】點擊單一城市的點時，記錄點擊次數
                m.on('click', () => { recordClick(cityId, pin.t); });
                
                nonClusterGroup.addLayer(m);
                currentMarkers.push({ marker: m, title: pin.t || '', cityName: data.name, cat: pin.cat || 'other', cityId: cityId });
            });
            
            updateEventList(data);
            buildFlythroughNotes(data); 
            
            document.querySelectorAll('.city-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-id') === cityId));
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
            setTimeout(() => map.invalidateSize(), 400); 

            // 【新增】呼叫渲染器，畫出該城市所有的點
            renderPopularAttractions('city', cityId);
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

        // ===============================================
        // 【新增】自動生成熱門景點清單 (Hashtag Hashtags)
        // ===============================================
        const popNav = document.createElement('div');
        popNav.className = 'pop-nav-container';
        navBar.parentNode.insertBefore(popNav, navBar.nextSibling); // 插入在導覽列下方

        let popularPins = [];
        // 蒐集所有帶有照片(p)，且重要度較高(v >= 1)的景點
        Object.keys(cityData).forEach(cityId => {
            cityData[cityId].pins.forEach(pin => {
                if (pin.p && pin.v >= 1) {
                    popularPins.push({ ...pin, cityId: cityId });
                }
            });
        });

        // 優先顯示 v=2 的景點，並限制最多顯示 8 個，避免畫面太擠
        popularPins.sort((a, b) => b.v - a.v);
        popularPins = popularPins.slice(0, 8);

        popularPins.forEach(pin => {
            const btn = document.createElement('button');
            btn.className = 'pop-attr-btn';
            btn.innerText = `# ${pin.t}`; // 加上 # 字號
            // 將照片路徑存入 CSS 變數中供 background-image 使用
            btn.style.setProperty('--bg-img', `url('${pin.p}')`);
            
            btn.addEventListener('click', (e) => {
                // 手機版：第一次點擊展開照片，第二次點擊才跳轉
                if (isTouchDevice()) {
                    if (!btn.classList.contains('touched')) {
                        // 清除其他按鈕的點擊狀態
                        document.querySelectorAll('.pop-attr-btn').forEach(b => b.classList.remove('touched'));
                        btn.classList.add('touched');
                        return; // 中斷，不執行跳轉
                    }
                }
                
                // 電腦版直接點擊 / 或手機版第二次點擊：飛梭跳轉並開啟 Popup
                if (currentMode === 'overview' || currentMode !== pin.cityId) {
                    showCity(pin.cityId);
                    // 給地圖 0.5 秒切換圖層的時間，然後飛過去
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

        // 點擊空白處時，取消手機版 Hashtag 的照片 Hover 狀態
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.pop-attr-btn')) {
                document.querySelectorAll('.pop-attr-btn').forEach(b => b.classList.remove('touched'));
            }
        });
        // ===============================================

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