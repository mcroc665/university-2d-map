class PlanManager {
    constructor(mapCore) {
        this.mapCore = mapCore;
        this.currentScale = 1;
        this.minScale = 0.3;
        this.maxScale = 3;
        this.scaleStep = 0.2;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;
        this.svgElement = null;
        this.container = null;
        this.planCache = new Map();
    }

    initZoomControls() {
        // ищем контейнер внутри planContent (а не глобально по document)
        this.container = this.mapCore?.planContent?.querySelector('.plan-svg-container') || document.querySelector('.plan-svg-container');
        if (!this.container) {
            console.error('PlanManager: .plan-svg-container не найден в planContent');
            return;
        }

        this.svgElement = this.container.querySelector('svg');
        if (!this.svgElement) {
            console.error('PlanManager: svg не найден в контейнере плана');
            return;
        }

        // снимем старые
        this.removeZoomControls();

        // Поддержка и классов и id (гибкость)
        const zoomInBtn = this.container.querySelector('.zoom-in') || this.container.querySelector('#plan-zoom-in');
        const zoomOutBtn = this.container.querySelector('.zoom-out') || this.container.querySelector('#plan-zoom-out');
        const resetBtn = this.container.querySelector('.reset-view') || this.container.querySelector('#plan-reset');

        this.zoomInHandler = () => { console.log('zoom in clicked'); this.zoomIn(); };
        this.zoomOutHandler = () => { console.log('zoom out clicked'); this.zoomOut(); };
        this.resetHandler = () => { console.log('reset clicked'); this.resetView(); };

        if (zoomInBtn) zoomInBtn.addEventListener('click', this.zoomInHandler);
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', this.zoomOutHandler);
        if (resetBtn) resetBtn.addEventListener('click', this.resetHandler);

        // drag
        this.initDragControls();
    }


    setZoomLimits(min, max) {
        this.minScale = min;
        this.maxScale = max;
    }

    removeZoomControls() {
        const container = this.container || (this.mapCore?.planContent?.querySelector('.plan-svg-container'));
        if (!container) return;
        const zoomInBtn = container.querySelector('.zoom-in') || container.querySelector('#plan-zoom-in');
        const zoomOutBtn = container.querySelector('.zoom-out') || container.querySelector('#plan-zoom-out');
        const resetBtn = container.querySelector('.reset-view') || container.querySelector('#plan-reset');

        if (zoomInBtn && this.zoomInHandler) zoomInBtn.removeEventListener('click', this.zoomInHandler);
        if (zoomOutBtn && this.zoomOutHandler) zoomOutBtn.removeEventListener('click', this.zoomOutHandler);
        if (resetBtn && this.resetHandler) resetBtn.removeEventListener('click', this.resetHandler);

        // pointer handlers teardown handled in initDragControls/remove equivalent
    }


    zoomIn() {
        if (this.currentScale < this.maxScale) {
            this.currentScale = Math.min(this.maxScale, this.currentScale + this.scaleStep);
            this.applyZoom();
        }
    }

    zoomOut() {
        if (this.currentScale > this.minScale) {
            this.currentScale = Math.max(this.minScale, this.currentScale - this.scaleStep);
            this.applyZoom();
        }
    }

    resetView() {
        this.currentScale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.applyZoom();

        if (this.container) {
            this.container.scrollLeft = this.container.scrollWidth / 2 - this.container.clientWidth / 2;
            this.container.scrollTop = this.container.scrollHeight / 2 - this.container.clientHeight / 2;
        }
    }

    scrollToElement(element) {
        if (!this.container || !element) return;

        const rect = element.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();

        this.container.scrollTo({
            left: rect.left - containerRect.left + this.container.scrollLeft - 100,
            top: rect.top - containerRect.top + this.container.scrollTop - 100,
            behavior: 'smooth'
        });
    }

    applyZoom() {
        if (!this.svgElement) {
            console.warn('SVG элемент не доступен для применения зума');
            return;
        }
        this.svgElement.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.currentScale})`;
        this.svgElement.style.transformOrigin = 'center center';
    }

    // Методы для перетаскивания плана
    initDragControls() {
        if (!this.svgElement) return;

        this.svgElement.addEventListener('mousedown', (e) => this.startDrag(e));
        this.svgElement.addEventListener('mousemove', (e) => this.drag(e));
        this.svgElement.addEventListener('mouseup', () => this.endDrag());
        this.svgElement.addEventListener('mouseleave', () => this.endDrag());
    }

    startDrag(e) {
        if (e.button !== 0) return;
        e.preventDefault();
        this.isDragging = true;

        if (!this.svgElement) return;

        const rect = this.svgElement.getBoundingClientRect();
        this.startX = e.clientX - this.translateX;
        this.startY = e.clientY - this.translateY;

        this.svgElement.style.cursor = 'grabbing';
    }

    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();

        this.translateX = e.clientX - this.startX;
        this.translateY = e.clientY - this.startY;

        this.applyZoom();
    }
    async loadPlan(svgUrl) {
        if (this.planCache.has(svgUrl)) {
            return this.planCache.get(svgUrl);
        }

        const response = await fetch(svgUrl);
        const svgText = await response.text();
        this.planCache.set(svgUrl, svgText);
        return svgText;
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.mapCore.planWindow.classList.contains('open')) return;

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.zoomIn();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.zoomOut();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.resetView();
                    break;
            }
        });
    }


    endDrag() {
        this.isDragging = false;
        if (this.svgElement) {
            this.svgElement.style.cursor = 'grab';
        }
    }
}
