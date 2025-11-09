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
    }

    initZoomControls() {
        this.container = document.querySelector('.plan-svg-container');
        this.svgElement = this.container?.querySelector('svg');
        
        if (!this.svgElement) {
            console.error('SVG элемент не найден в контейнере плана');
            return;
        }

        // Удаляем старые обработчики
        this.removeZoomControls();

        const zoomInBtn = this.container.querySelector('.zoom-in');
        const zoomOutBtn = this.container.querySelector('.zoom-out');
        const resetBtn = this.container.querySelector('.reset-view');

        this.zoomInHandler = () => this.zoomIn();
        this.zoomOutHandler = () => this.zoomOut();
        this.resetHandler = () => this.resetView();

        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', this.zoomInHandler);
        }
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', this.zoomOutHandler);
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', this.resetHandler);
        }

        this.initDragControls();
    }

    setZoomLimits(min, max) {
        this.minScale = min;
        this.maxScale = max;
    }

    removeZoomControls() {
        const container = document.querySelector('.plan-svg-container');
        if (!container) return;

        const zoomInBtn = container.querySelector('.zoom-in');
        const zoomOutBtn = container.querySelector('.zoom-out');
        const resetBtn = container.querySelector('.reset-view');

        zoomInBtn?.removeEventListener('click', this.zoomInHandler);
        zoomOutBtn?.removeEventListener('click', this.zoomOutHandler);
        resetBtn?.removeEventListener('click', this.resetHandler);
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

    endDrag() {
        this.isDragging = false;
        if (this.svgElement) {
            this.svgElement.style.cursor = 'grab';
        }
    }
}