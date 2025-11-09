class UIControls {
    constructor(mapCore) {
        this.mapCore = mapCore;
        this.mapElement = mapCore.mapElement;
        this.svgContainer = mapCore.svgContainer;

        // Флаг для плавного зума
        this.zoomTransition = false;

        // Переменные для масштабирования
        this.scale = 1;
        this.minScale = 0.3;
        this.maxScale = 3;
        this.scaleStep = 0.2;
        this.lastZoomTime = 0;
        this.zoomDelay = 50;

        // Переменные для перетаскивания
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.scrollLeft = 0;
        this.scrollTop = 0;

        // Инициализация UI контролов
        this.init();
    }

    init() {
        this.createZoomControls();
        this.addEventListeners();
    }

    createZoomControls() {
        const zoomControls = document.createElement('div');
        zoomControls.className = 'zoom-controls';
        zoomControls.innerHTML = `
            <button id="zoom-in" title="Увеличить">+</button>
            <button id="zoom-out" title="Уменьшить">-</button>
            <button id="zoom-reset" title="Сбросить масштаб">100%</button>
        `;

        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.appendChild(zoomControls);
        }

        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');
        const zoomResetBtn = document.getElementById('zoom-reset');

        // Обработчики для кнопок зума (масштабирование относительно центра)
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                if (this.mapElement) {
                    const rect = this.mapElement.getBoundingClientRect();
                    const x = rect.width / 2;
                    const y = rect.height / 2;
                    this.zoomIn(x, y);
                }
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                if (this.mapElement) {
                    const rect = this.mapElement.getBoundingClientRect();
                    const x = rect.width / 2;
                    const y = rect.height / 2;
                    this.zoomOut(x, y);
                }
            });
        }

        if (zoomResetBtn) {
            zoomResetBtn.addEventListener('click', () => this.zoomReset());
        }

        // Обработчик колесика мыши
        if (this.mapElement) {
            this.mapElement.addEventListener('wheel', (e) => {
                e.preventDefault();
                const rect = this.mapElement.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                requestAnimationFrame(() => {
                    if (e.deltaY < 0) {
                        this.zoomIn(x, y);
                    } else {
                        this.zoomOut(x, y);
                    }
                });
            });
        }
    }

    zoomIn(centerX, centerY) {
        const now = Date.now();
        if (now - this.lastZoomTime < this.zoomDelay) return;

        if (this.scale < this.maxScale) {
            const oldScale = this.scale;
            this.scale = Math.min(this.maxScale, this.scale + this.scaleStep);
            this.applySmoothScale(oldScale, centerX, centerY);
            this.lastZoomTime = now;
        }
    }

    zoomOut(centerX, centerY) {
        const now = Date.now();
        if (now - this.lastZoomTime < this.zoomDelay) return;

        if (this.scale > this.minScale) {
            const oldScale = this.scale;
            this.scale = Math.max(this.minScale, this.scale - this.scaleStep);
            this.applySmoothScale(oldScale, centerX, centerY);
            this.lastZoomTime = now;
        }
    }

    zoomReset() {
        const oldScale = this.scale;
        this.scale = 1;
        this.applySmoothScale(oldScale);

        if (this.mapElement) {
            const targetScrollLeft = this.mapElement.scrollWidth / 2 - this.mapElement.clientWidth / 2;
            const targetScrollTop = this.mapElement.scrollHeight / 2 - this.mapElement.clientHeight / 2;

            this.mapElement.scrollTo({
                left: targetScrollLeft,
                top: targetScrollTop,
                behavior: 'smooth'
            });
        }
    }

    applySmoothScale(oldScale, centerX, centerY) {
        if (!this.svgContainer || !this.mapElement) return;

        // Отключаем CSS transition для мгновенного применения
        this.svgContainer.style.transition = 'none';

        const oldScrollLeft = this.mapElement.scrollLeft;
        const oldScrollTop = this.mapElement.scrollTop;

        // Временно применяем масштаб для расчета
        this.svgContainer.style.transform = `scale(${this.scale})`;

        // Форсируем перерасчет layout
        this.svgContainer.offsetHeight;

        if (oldScale !== this.scale) {
            let referenceX, referenceY;
            let targetX, targetY;

            if (centerX !== undefined && centerY !== undefined) {
                // Используем позицию курсора
                referenceX = oldScrollLeft + centerX;
                referenceY = oldScrollTop + centerY;
                targetX = centerX;
                targetY = centerY;
            } else {
                // Используем центр видимой области
                const visibleCenterX = oldScrollLeft + this.mapElement.clientWidth / 2;
                const visibleCenterY = oldScrollTop + this.mapElement.clientHeight / 2;
                referenceX = visibleCenterX;
                referenceY = visibleCenterY;
                targetX = this.mapElement.clientWidth / 2;
                targetY = this.mapElement.clientHeight / 2;
            }

            const scaleRatio = this.scale / oldScale;
            const newScrollX = referenceX * scaleRatio - targetX;
            const newScrollY = referenceY * scaleRatio - targetY;

            // Устанавливаем новую позицию скролла
            this.mapElement.scrollLeft = newScrollX;
            this.mapElement.scrollTop = newScrollY;
        }

        // Включаем плавность обратно
        setTimeout(() => {
            this.svgContainer.style.transition = 'transform 0.1s ease';
        }, 10);

        // Обновляем кнопку сброса
        const resetBtn = document.getElementById('zoom-reset');
        if (resetBtn) {
            resetBtn.textContent = `${Math.round(this.scale * 100)}%`;
        }
    }

    startDragging(e) {
        if (e.target.closest('.building')) {
            return;
        }

        this.isDragging = true;
        this.mapElement.classList.add('grabbing');
        this.startX = e.pageX - this.mapElement.offsetLeft;
        this.startY = e.pageY - this.mapElement.offsetTop;
        this.scrollLeft = this.mapElement.scrollLeft;
        this.scrollTop = this.mapElement.scrollTop;
    }

    doDragging(e) {
        if (!this.isDragging) return;
        e.preventDefault();

        const x = e.pageX - this.mapElement.offsetLeft;
        const y = e.pageY - this.mapElement.offsetTop;
        const walkX = (x - this.startX) * 2;
        const walkY = (y - this.startY) * 2;

        this.mapElement.scrollLeft = this.scrollLeft - walkX;
        this.mapElement.scrollTop = this.scrollTop - walkY;
    }

    stopDragging() {
        this.isDragging = false;
        if (this.mapElement) {
            this.mapElement.classList.remove('grabbing');
        }
    }

    addEventListeners() {
        // События перетаскивания
        if (this.mapElement) {
            this.mapElement.addEventListener('mousedown', (e) => {
                this.startDragging(e);
            });

            this.mapElement.addEventListener('mousemove', (e) => {
                this.doDragging(e);
            });

            this.mapElement.addEventListener('mouseup', () => {
                this.stopDragging();
            });

            this.mapElement.addEventListener('mouseleave', () => {
                this.stopDragging();
            });

            // Touch события
            this.mapElement.addEventListener('touchstart', (e) => {
                this.startDragging(e.touches[0]);
            });

            this.mapElement.addEventListener('touchmove', (e) => {
                this.doDragging(e.touches[0]);
            });

            this.mapElement.addEventListener('touchend', () => {
                this.stopDragging();
            });
        }

        // Обработчики для зданий
        document.addEventListener('click', (e) => {
            const building = e.target.closest('.building');
            if (building) {
                this.mapCore.handleBuildingClick(building);
            }
        });

        // Закрытие модального окна
       // Закрытие боковой панели
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (this.mapCore.planWindow && this.mapCore.planWindow.classList.contains('open')) {
                this.mapCore.closePlan();
            } else if (this.mapCore.sidebar && this.mapCore.sidebar.classList.contains('open')) {
                this.mapCore.closeSidebar();
            }
        }
    });
}
}