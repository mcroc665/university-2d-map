// Управление планом этажа
class PlanManager {
    constructor() {
        this.planWindow = document.querySelector('.plan-window');
        this.svg = document.querySelector('#plan-svg');
        this.planContent = document.querySelector('#plan-content');
        this.zoomInBtn = document.querySelector('#plan-zoom-in');
        this.zoomOutBtn = document.querySelector('#plan-zoom-out');
        this.resetBtn = document.querySelector('#plan-reset');
        
        this.currentScale = 1;
        this.minScale = 0.3;
        this.maxScale = 3;
        this.scaleStep = 0.2;
        
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;
        
        this.currentFloor = 1;
        this.selectedRoom = null;
        
        this.init();
    }
    
    init() {
        // Инициализация обработчиков событий
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.resetBtn.addEventListener('click', () => this.resetView());
        
        // Обработчики для перемещения плана
        this.svg.addEventListener('mousedown', (e) => this.startDrag(e));
        this.svg.addEventListener('mousemove', (e) => this.drag(e));
        this.svg.addEventListener('mouseup', () => this.endDrag());
        this.svg.addEventListener('mouseleave', () => this.endDrag());
        
        // Предотвращение контекстного меню
        this.svg.addEventListener('contextmenu', (e) => e.preventDefault());
        
        this.resetView();
    }
    
    startDrag(e) {
        if (e.button !== 0) return;
        e.preventDefault();
        this.isDragging = true;
        
        const rect = this.svg.getBoundingClientRect();
        this.startX = e.clientX - this.translateX;
        this.startY = e.clientY - this.translateY;
        
        this.svg.style.cursor = 'grabbing';
    }
    
    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        
        this.translateX = e.clientX - this.startX;
        this.translateY = e.clientY - this.startY;
        
        this.updateTransform();
    }
    
    endDrag() {
        this.isDragging = false;
        this.svg.style.cursor = 'grab';
    }
    
    zoomIn() {
        if (this.currentScale < this.maxScale) {
            this.currentScale = Math.min(this.maxScale, this.currentScale + this.scaleStep);
            this.updateTransform();
        }
    }
    
    zoomOut() {
        if (this.currentScale > this.minScale) {
            this.currentScale = Math.max(this.minScale, this.currentScale - this.scaleStep);
            this.updateTransform();
        }
    }
    
    resetView() {
        this.currentScale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }
    
    updateTransform() {
        this.planContent.setAttribute('transform', 
            `translate(${this.translateX}, ${this.translateY}) scale(${this.currentScale})`
        );
    }
    
    // Загрузка плана этажа из существующего SVG
    loadFloorPlan(floorNumber) {
        this.currentFloor = floorNumber;
        
        // Показываем соответствующий план этажа
        this.showFloorPlan(floorNumber);
        
        // Сбрасываем вид
        this.resetView();
        
        // Если есть выбранная аудитория, подсвечиваем её на плане
        setTimeout(() => {
            this.highlightSelectedClassroom();
        }, 100);
    }
    
    showFloorPlan(floorNumber) {
        // Скрываем все планы
        const allPlans = this.planContent.querySelectorAll('.floor-plan');
        allPlans.forEach(plan => {
            plan.style.display = 'none';
        });
        
        // Показываем нужный план этажа
        const targetPlan = this.planContent.querySelector(`#floor-${floorNumber}`);
        if (targetPlan) {
            targetPlan.style.display = 'block';
            
            // Добавляем обработчики для комнат этого этажа
            this.addRoomEventListeners(targetPlan);
        } else {
            console.warn(`План этажа ${floorNumber} не найден`);
        }
    }
    
    addRoomEventListeners(floorPlan) {
        // Находим все элементы комнат по селектору [id*="room"] - которые содержат "room" в id
        const roomElements = floorPlan.querySelectorAll('[id*="room"]');
        
        roomElements.forEach(roomElement => {
            // Убираем старые обработчики
            roomElement.removeEventListener('click', this.roomClickHandler);
            
            // Добавляем новый обработчик
            roomElement.addEventListener('click', (e) => {
                e.stopPropagation();
                this.onRoomSelect(roomElement);
            });
            
            roomElement.style.cursor = 'pointer';
        });
    }
    
    onRoomSelect(roomElement) {
        const roomId = roomElement.id;
        // Извлекаем номер комнаты из id (убираем "room" из "201room")
        const roomNumber = roomId.replace('room', '');
        
        // Сохраняем выбранную комнату
        this.selectedRoom = { id: roomId, number: roomNumber };
        
        // Подсвечиваем комнату на плане
        this.highlightRoomOnPlan(roomId);
        
        // Находим и выделяем соответствующую аудиторию в списке
        this.selectClassroomInList(roomNumber);
    }
    
    highlightRoomOnPlan(roomId) {
        // Убираем подсветку со всех комнат
        this.clearRoomHighlights();
        
        // Подсвечиваем выбранную комнату
        const selectedRoom = this.planContent.querySelector(`#${roomId}`);
        if (selectedRoom) {
            selectedRoom.classList.add('plan-room-highlighted');
        }
    }
    
    clearRoomHighlights() {
        const allRooms = this.planContent.querySelectorAll('[id*="room"]');
        allRooms.forEach(room => {
            room.classList.remove('plan-room-highlighted');
        });
    }
    
    selectClassroomInList(roomNumber) {
        // Находим элемент списка с соответствующим номером аудитории
        const classroomItems = document.querySelectorAll('.classroom-item');
        let found = false;
        
        classroomItems.forEach(item => {
            const numberElement = item.querySelector('.classroom-number');
            if (numberElement && numberElement.textContent.trim() === roomNumber.trim()) {
                // Снимаем выделение со всех элементов
                classroomItems.forEach(i => i.classList.remove('selected'));
                // Выделяем найденный элемент
                item.classList.add('selected');
                // Прокручиваем к выбранному элементу
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                found = true;
            }
        });
        
        if (!found) {
            console.log('Аудитория не найдена в списке:', roomNumber);
        }
    }
    
    // Подсветка комнаты на плане при выборе из списка
    highlightRoomOnPlanByNumber(roomNumber) {
        // Убираем подсветку со всех комнат
        this.clearRoomHighlights();
        
        // Ищем комнату по номеру (добавляем "room" к номеру)
        const roomId = roomNumber + 'room';
        const roomElement = this.planContent.querySelector(`#${roomId}`);
        
        if (roomElement) {
            roomElement.classList.add('plan-room-highlighted');
            this.selectedRoom = { 
                id: roomId, 
                number: roomNumber 
            };
        } else {
            console.log('Комната не найдена на плане:', roomId);
        }
    }
    
    // Подсветка выбранной аудитории при загрузке плана
    highlightSelectedClassroom() {
        const selectedClassroom = document.querySelector('.classroom-item.selected');
        if (selectedClassroom) {
            const numberElement = selectedClassroom.querySelector('.classroom-number');
            if (numberElement) {
                const roomNumber = numberElement.textContent.trim();
                this.highlightRoomOnPlanByNumber(roomNumber);
            }
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const planManager = new PlanManager();
    
    // Добавляем SVG фильтр для подсветки
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'glow');
    filter.setAttribute('x', '-100%');
    filter.setAttribute('y', '-100%');
    filter.setAttribute('width', '300%');
    filter.setAttribute('height', '300%');
    
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('in', 'SourceGraphic');
    feGaussianBlur.setAttribute('stdDeviation', '4');
    feGaussianBlur.setAttribute('result', 'blur');
    
    const feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    feColorMatrix.setAttribute('in', 'blur');
    feColorMatrix.setAttribute('type', 'matrix');
    feColorMatrix.setAttribute('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8');
    feColorMatrix.setAttribute('result', 'glow');
    
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode1.setAttribute('in', 'glow');
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feGaussianBlur);
    filter.appendChild(feColorMatrix);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    document.querySelector('#plan-svg').appendChild(defs);
    
    // Обработчики для открытия/закрытия плана
    const showPlanBtn = document.querySelector('.show-plan-btn');
    const planCloseBtn = document.querySelector('.plan-close');
    
    showPlanBtn.addEventListener('click', function() {
        // Получаем текущий выбранный этаж
        const activeFloorBtn = document.querySelector('.floor-btn.active');
        let currentFloor = 1;
        if (activeFloorBtn) {
            currentFloor = parseInt(activeFloorBtn.getAttribute('data-floor')) || 1;
        }
        
        planManager.planWindow.classList.add('open');
        // Загружаем план для текущего этажа
        planManager.loadFloorPlan(currentFloor);
    });
    
    planCloseBtn.addEventListener('click', function() {
        planManager.planWindow.classList.remove('open');
    });
    
    // Закрытие плана при клике вне его
    planManager.planWindow.addEventListener('click', function(e) {
        if (e.target === planManager.planWindow) {
            planManager.planWindow.classList.remove('open');
        }
    });
    
    // Обработка выбора этажа
    document.querySelectorAll('.floor-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const floor = parseInt(this.getAttribute('data-floor')) || 1;
            
            // Если план открыт, обновляем его
            if (planManager.planWindow.classList.contains('open')) {
                planManager.loadFloorPlan(floor);
            }
        });
    });
    
    // Обработка выбора аудитории в списке - подсветка на плане
    document.addEventListener('click', function(e) {
        const classroomItem = e.target.closest('.classroom-item');
        if (classroomItem) {
            // Снимаем выделение со всех элементов
            document.querySelectorAll('.classroom-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Выделяем текущий элемент
            classroomItem.classList.add('selected');
            
            const numberElement = classroomItem.querySelector('.classroom-number');
            if (numberElement) {
                const roomNumber = numberElement.textContent;
                
                // Подсвечиваем комнату на плане, если план открыт
                if (planManager.planWindow.classList.contains('open')) {
                    planManager.highlightRoomOnPlanByNumber(roomNumber);
                }
            }
        }
    });
    
    // Инициализация кнопок этажей
    document.querySelectorAll('.floor-btn').forEach((btn, index) => {
        if (!btn.getAttribute('data-floor')) {
            btn.setAttribute('data-floor', (index + 1).toString());
        }
    });
});