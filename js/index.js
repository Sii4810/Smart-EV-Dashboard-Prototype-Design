document.addEventListener("DOMContentLoaded", () => {
    // 1. Select the targets
    const wifiBtn = document.querySelector('.btn-wifi');
    const bluetoothBtn = document.querySelector('.btn-bluetooth');
    const lockBtn = document.querySelector('.btn-lock');

    // 2. Add click listeners that leverage 'toggle'
    if (wifiBtn) {
        wifiBtn.addEventListener('click', () => {
            wifiBtn.classList.toggle('active');
        });
    }

    if (bluetoothBtn) {
        bluetoothBtn.addEventListener('click', () => {
            bluetoothBtn.classList.toggle('active');
        });
    }

    if (lockBtn) {
        lockBtn.addEventListener('click', () => {
            lockBtn.classList.toggle('active');
        });
    }

    // 3. Gear Selector logic (P, R, N, D)
    const gearBtns = document.querySelectorAll('.gear-btn');
    gearBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gearBtns.forEach(g => g.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 4. Drive Mode Selector logic (Auto, Eco, Normal, Sport)
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(m => m.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 5. Temperature control logic (+ / - and display) with capping (16°C to 26°C)
    const tempPlus = document.querySelector('.temp-plus');
    const tempMinus = document.querySelector('.temp-minus');
    const tempDisplay = document.querySelector('.temp-val');

    if (tempPlus && tempDisplay) {
        tempPlus.addEventListener('click', () => {
            tempPlus.classList.toggle('active');
            let currentTemp = parseInt(tempDisplay.textContent) || 20;
            if (currentTemp < 26) {
                currentTemp++;
                tempDisplay.textContent = currentTemp + " °C";
            }
        });
    }

    if (tempMinus && tempDisplay) {
        tempMinus.addEventListener('click', () => {
            tempMinus.classList.toggle('active');
            let currentTemp = parseInt(tempDisplay.textContent) || 20;
            if (currentTemp > 16) {
                currentTemp--;
                tempDisplay.textContent = currentTemp + " °C";
            }
        });
    }

    // 6. Fan speed control logic
    const fanBtn = document.querySelector('.fan-btn');
    const fanLeaves = [
        document.querySelector('.fan-leaf-1'),
        document.querySelector('.fan-leaf-2'),
        document.querySelector('.fan-leaf-3'),
        document.querySelector('.fan-leaf-4')
    ];
    let fanClicks = 0;

    if (fanBtn) {
        fanBtn.addEventListener('click', () => {
            fanClicks = (fanClicks + 1) % 5;
            fanLeaves.forEach((leaf, idx) => {
                if (leaf) {
                    if (idx < fanClicks) {
                        leaf.classList.add('highlighted');
                    } else {
                        leaf.classList.remove('highlighted');
                    }
                }
            });
        });
    }

    // 7. Safety Toggles (Sensor & warning triangle)
    const btnSensor = document.querySelector('.btn-sensor');
    const btnTriangle = document.querySelector('.btn-triangle');

    if (btnSensor) {
        btnSensor.addEventListener('click', () => {
            btnSensor.classList.toggle('active');
        });
    }

    if (btnTriangle) {
        btnTriangle.addEventListener('click', () => {
            btnTriangle.classList.toggle('active');
        });
    }

    // 8. Top buttons (Group 261 / Group 298) active toggles & Rain Sensor text
    const btnAbove1 = document.querySelector('.btn-above-1');
    const btnAbove2 = document.querySelector('.btn-above-2');

    if (btnAbove1) {
        btnAbove1.addEventListener('click', () => {
            btnAbove1.classList.toggle('active');
        });
    }

    if (btnAbove2) {
        const rainLabel = btnAbove2.querySelector('.Off');
        btnAbove2.addEventListener('click', () => {
            const isActive = btnAbove2.classList.toggle('active');
            if (rainLabel) {
                rainLabel.textContent = isActive ? 'ON' : 'OFF';
                rainLabel.style.color = isActive ? 'white' : 'black';
            }
        });
    }

    // 9. Seat button image cycling
    const btnChair = document.querySelector('.btn-chair');
    if (btnChair) {
        const chairImg = btnChair.querySelector('img');
        const chairStates = [
            "./src/img/chair.png",
            "./src/img/chair2.png",
            "./src/img/chair3.png",
            "./src/img/chair2.png"
        ];
        let chairIndex = 0;
        btnChair.addEventListener('click', () => {
            chairIndex = (chairIndex + 1) % chairStates.length;
            if (chairImg) {
                chairImg.src = chairStates[chairIndex];
            }
        });
    }

    // 10. Music Player start & stop timer / progress bar logic
    const musicPlayPause = document.querySelector('.btn-music-playpause');
    const musicCurrentText = document.querySelector('.music-current-time');
    const musicRemainingText = document.querySelector('.music-remaining-time');
    const musicProgressBar = document.querySelector('.music-progress-bar svg');

    if (musicPlayPause) {
        let musicInterval = null;
        let currentSec = 30;
        const totalSec = 225; // 3m 45s total duration
        const progressMax = 548; // max svg bar width

        const updateMusicUI = () => {
            if (musicCurrentText) {
                const m = Math.floor(currentSec / 60);
                const s = currentSec % 60;
                musicCurrentText.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
            }
            if (musicRemainingText) {
                const rem = totalSec - currentSec;
                const m = Math.floor(rem / 60);
                const s = rem % 60;
                musicRemainingText.textContent = `-${m}:${s < 10 ? '0' : ''}${s}`;
            }
            if (musicProgressBar) {
                const pct = currentSec / totalSec;
                const targetW = Math.min(progressMax, Math.round(pct * progressMax));
                musicProgressBar.setAttribute('width', targetW);
            }
        };

        const playSVG = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 2L15 9L4 16V2Z" fill="white"/></svg>`;
        const pauseSVG = `
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_4312_744)">
            <path d="M10.0769 1.27631L10.3045 15.9278C10.315 16.602 10.7976 17.1448 11.3821 17.1401L12.4408 17.1314C13.0254 17.1266 13.4909 16.576 13.4805 15.9018L13.2528 1.25033C13.2424 0.576136 12.7598 0.0332558 12.1752 0.0380384L11.1166 0.0466995C10.532 0.051482 10.0664 0.602119 10.0769 1.27631ZM3.72496 1.32828L3.9526 15.9797C3.96308 16.6539 4.44565 17.1968 5.03022 17.192L6.08887 17.1834C6.67345 17.1786 7.13903 16.6279 7.12855 15.9537L6.90092 1.3023C6.89044 0.628102 6.40787 0.0852224 5.8233 0.090005L4.76465 0.0986661C4.18007 0.103449 3.71449 0.654086 3.72496 1.32828Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_4312_744">
            <rect width="17.0954" height="16.939" fill="white" transform="matrix(-0.0155349 -0.999879 0.999967 -0.00818099 0.265576 17.2319)"/>
            </clipPath>
            </defs>
            </svg>
        `;

        const iconContainer = musicPlayPause.querySelector('.FaSolidEquals');

        musicPlayPause.addEventListener('click', () => {
            const isPlaying = musicPlayPause.classList.toggle('music-playing');
            if (iconContainer) {
                iconContainer.innerHTML = isPlaying ? pauseSVG : playSVG;
            }

            if (isPlaying) {
                musicInterval = setInterval(() => {
                    if (currentSec < totalSec) {
                        currentSec++;
                        updateMusicUI();
                    } else {
                        clearInterval(musicInterval);
                        musicPlayPause.classList.remove('music-playing');
                        if (iconContainer) iconContainer.innerHTML = playSVG;
                    }
                }, 1000);
            } else {
                clearInterval(musicInterval);
            }
        });
        
        // Initial SVG state setup
        if (iconContainer) iconContainer.innerHTML = playSVG;
    }

    // 11. Dialer and Keypad logic (phone_call.html)
    const dialBtns = document.querySelectorAll('.dial-btn');
    const backspaceBtn = document.querySelector('.btn-dial-backspace');
    const callActionBtn = document.querySelector('.btn-call-action');
    const searchVal = document.querySelector('.search-val');
    const contactItems = document.querySelectorAll('.contact-item');

    if (searchVal) {
        const updateDialerUI = (digits) => {
            if (digits === "" || digits === "Search") {
                searchVal.textContent = "Search";
                searchVal.style.color = "rgba(255, 255, 255, 0.50)";
            } else {
                searchVal.textContent = digits;
                searchVal.style.color = "white";
            }

            // Filter contact cards
            contactItems.forEach(contact => {
                const phone = contact.getAttribute('data-phone') || "";
                const name = contact.getAttribute('data-name') || "";
                const matches = digits === "" || digits === "Search" || 
                                phone.includes(digits) || 
                                name.toLowerCase().includes(digits.toLowerCase());

                if (matches) {
                    contact.style.opacity = "1";
                    contact.style.pointerEvents = "auto";
                } else {
                    contact.style.opacity = "0.15";
                    contact.style.pointerEvents = "none";
                }
            });
        };

        dialBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.getAttribute('data-val');
                let current = searchVal.textContent;
                if (current === "Search") {
                    current = "";
                }
                current += val;
                updateDialerUI(current);
            });
        });

        if (backspaceBtn) {
            backspaceBtn.addEventListener('click', () => {
                let current = searchVal.textContent;
                if (current !== "Search" && current.length > 0) {
                    current = current.slice(0, -1);
                    updateDialerUI(current);
                }
            });
        }

        contactItems.forEach(contact => {
            contact.addEventListener('click', () => {
                const phone = contact.getAttribute('data-phone');
                updateDialerUI(phone);
            });
        });

        if (callActionBtn) {
            callActionBtn.addEventListener('click', () => {
                const current = searchVal.textContent;
                if (current !== "Search" && current.trim().length > 0) {
                    let matchedName = "";
                    contactItems.forEach(item => {
                        if (item.getAttribute('data-phone') === current) {
                            matchedName = item.getAttribute('data-name');
                        }
                    });

                    // Build premium ringing overlay dialog
                    const modal = document.createElement('div');
                    modal.id = 'call-modal';
                    modal.style.position = 'absolute';
                    modal.style.top = '0';
                    modal.style.left = '0';
                    modal.style.width = '1920px';
                    modal.style.height = '1080px';
                    modal.style.background = 'rgba(18, 18, 24, 0.95)';
                    modal.style.display = 'flex';
                    modal.style.flexDirection = 'column';
                    modal.style.justifyContent = 'center';
                    modal.style.alignItems = 'center';
                    modal.style.zIndex = '9999';
                    modal.style.fontFamily = 'Inter, sans-serif';
                    modal.innerHTML = `
                        <div style="color: #00C0E8; font-size: 32px; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 4px; font-weight: bold; animation: pulse 1.5s infinite;">Ringing...</div>
                        <div style="color: white; font-size: 80px; font-weight: 700; margin-bottom: 12px;">${matchedName || current}</div>
                        <div style="color: rgba(255,255,255,0.45); font-size: 36px; margin-bottom: 100px;">${matchedName ? current : ''}</div>
                        <div style="width: 130px; height: 130px; background: #FF3B30; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: 0 10px 30px rgba(255, 59, 48, 0.4); transition: transform 0.2s ease;" class="btn-end-call" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <img src="./src/img/call.svg" style="width: 60px; height: 60px; transform: rotate(135deg); filter: brightness(0) invert(1);" />
                        </div>
                        <style>
                            @keyframes pulse {
                                0% { opacity: 0.6; }
                                50% { opacity: 1; }
                                100% { opacity: 0.6; }
                            }
                        </style>
                    `;
                    document.querySelector('.Desktop3').appendChild(modal);
                    modal.querySelector('.btn-end-call').addEventListener('click', () => {
                        modal.remove();
                    });
                }
            });
        }
    }

    // 12. Battery page charge settings interactive panel (battery.html)
    const btnLimit = document.querySelector('.btn-charge-limit');
    const limitVal = document.querySelector('.limit-val');

    if (btnLimit && limitVal) {
        btnLimit.addEventListener('click', () => {
            let current = parseInt(limitVal.textContent) || 80;
            if (current === 80) current = 90;
            else if (current === 90) current = 100;
            else current = 80;
            limitVal.textContent = `${current}%`;
        });
    }

    const btnRegen = document.querySelector('.btn-regen-braking');
    const regenVal = document.querySelector('.regen-val');

    if (btnRegen && regenVal) {
        btnRegen.addEventListener('click', () => {
            const states = ["Low", "Medium", "High"];
            let idx = states.indexOf(regenVal.textContent.trim());
            idx = (idx + 1) % states.length;
            regenVal.textContent = states[idx];
        });
    }

    // Toggle switch builder
    const setupToggle = (selector, onActiveChange) => {
        const toggle = document.querySelector(selector);
        if (toggle) {
            const knob = toggle.querySelector('.toggle-knob');
            toggle.addEventListener('click', () => {
                const isActive = toggle.getAttribute('data-active') === 'true';
                const newState = !isActive;
                toggle.setAttribute('data-active', newState.toString());
                
                if (newState) {
                    toggle.style.background = 'linear-gradient(90deg, #00C0E8 0%, #00E8B4 100%)';
                    if (knob) knob.style.left = '38px';
                } else {
                    toggle.style.background = 'rgba(255, 255, 255, 0.15)';
                    if (knob) knob.style.left = '4px';
                }
                
                if (onActiveChange) onActiveChange(newState);
            });
            
            // Apply initial UI styles based on initial attributes
            const initial = toggle.getAttribute('data-active') === 'true';
            if (initial) {
                toggle.style.background = 'linear-gradient(90deg, #00C0E8 0%, #00E8B4 100%)';
                if (knob) knob.style.left = '38px';
            } else {
                toggle.style.background = 'rgba(255, 255, 255, 0.15)';
                if (knob) knob.style.left = '4px';
            }
        }
    };

    const scheduledSub = document.querySelector('.StartAt0200Am');
    setupToggle('.btn-toggle-scheduled', (active) => {
        if (scheduledSub) {
            scheduledSub.textContent = active ? "Start at 02:00 AM" : "Disabled";
        }
    });

    const precondSub = document.querySelector('.WarmBatteryBeforeTrip');
    setupToggle('.btn-toggle-precond', (active) => {
        if (precondSub) {
            precondSub.textContent = active ? "Warm battery before trip" : "Off";
        }
    });

    const saverSub = document.querySelector('.ReduceNonEssentialPower');
    setupToggle('.btn-toggle-saver', (active) => {
        if (saverSub) {
            saverSub.textContent = active ? "Reduce non-essential power" : "Standard Mode";
        }
    });

    const fastchargeSub = document.querySelector('.AllowUpTo150KwInput');
    setupToggle('.btn-toggle-fastcharge', (active) => {
        if (fastchargeSub) {
            fastchargeSub.textContent = active ? "Allow up to 150 kW input" : "Standard Charging";
        }
    });

    const portlockSub = document.querySelector('.LockWhenCharging');
    setupToggle('.btn-toggle-portlock', (active) => {
        if (portlockSub) {
            portlockSub.textContent = active ? "Lock when charging" : "Unlocked";
        }
    });

    // 13. Navigation routing click handlers
    const routes = [
        { selector: '.btn-map', target: 'map.html' },
        { selector: '.btn-envelope', target: 'message.html' },
        { selector: '.btn-phone-sidebar', target: 'phone_call.html' },
        { selector: '.btn-settings', target: 'setting.html' },
        { selector: '.btn-station', target: 'map.html' },
        { selector: '.btn-battery-icon', target: 'battery.html' },
        { selector: '.btn-tyre-icon', target: 'tyre.html' },
        { selector: '.btn-home', target: 'index.html' },
        { selector: '.btn-back', target: 'map.html' },
        { selector: '.btn-stop', target: 'map.html' },
        { selector: '.btn-send-sini', target: 'chargesini.html' },
        { selector: '.btn-send-jom', target: 'jomcharge.html' },
        { selector: '.btn-send-bmw', target: 'bmw.html' }
    ];

    routes.forEach(route => {
        const elements = document.querySelectorAll(route.selector);
        elements.forEach(el => {
            el.addEventListener('click', () => {
                window.location.href = route.target;
            });
        });
    });
});
