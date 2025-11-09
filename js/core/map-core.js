class MapCore {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.mainContent = document.getElementById('main-content');
        this.planWindow = document.getElementById('plan-window');
        this.buildingTitle = document.getElementById('building-title');
        this.buildingDescription = document.getElementById('building-description');
        this.floorButtons = document.getElementById('floor-buttons');
        this.classroomsList = document.getElementById('classrooms-list');
        this.classroomsCount = document.getElementById('classrooms-count');
        this.planContent = document.getElementById('plan-content');
        this.planTitle = document.getElementById('plan-title');
        
        this.closeBtn = document.getElementById('sidebar-close');
        this.planCloseBtn = document.getElementById('plan-close');
        this.showPlanBtn = document.getElementById('show-plan-btn');
        
        this.currentHighlighted = null;
        this.currentBuilding = null;
        this.currentFloor = null;

        this.mapElement = null;
        this.svgContainer = null;
        
        this.planManager = new PlanManager(this);
        this.currentPlanConfig = null;
        this.roomElementMap = new Map();
    }

    async init() {
        await this.loadSVG();
        this.mapElement = document.getElementById('map');
        this.makeBuildingsInteractive();
        this.setupEventListeners();
        return this;
    }

    setupEventListeners() {
        this.closeBtn.onclick = () => {
            this.closeSidebar();
        };

        this.planCloseBtn.onclick = () => {
            this.closePlan();
        };

        this.showPlanBtn.onclick = () => {
            this.showPlan();
        };

        // Закрытие по клику вне областей
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.building') &&
                !e.target.closest('.sidebar') &&
                this.currentHighlighted) {

                this.clearHighlight();

                const selectElement = document.getElementById('building-select');
                if (selectElement) {
                    selectElement.value = '';
                }
            }
        });
    }

    createClassroomItem(classroom) {
        const item = document.createElement('div');
        item.className = 'classroom-item';
        item.innerHTML = `
            <div class="classroom-info">
                <span class="classroom-number">${classroom.number}</span>
                <span class="classroom-name">${classroom.name}</span>
                <span class="classroom-type ${classroom.type}">
                    ${this.getClassroomTypeName(classroom.type)}
                </span>
            </div>
        `;

        item.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectClassroom(classroom, item);
        });

        return item;
    }

    getClassroomTypeName(type) {
        const types = {
            'lecture': 'Лекционная',
            'seminar': 'Семинарская',
            'lab': 'Лаборатория',
            'computer': 'Компьютерный класс',
            'office': 'Офис',
            'staff': 'Преподавательская',
            'other': 'Другое'
        };
        return types[type] || type;
    }

    selectClassroom(classroom, element) {
        // Убираем выделение со всех элементов
        document.querySelectorAll('.classroom-item').forEach(item => {
            item.classList.remove('selected');
            item.style.background = '';
        });

        // Добавляем выделение выбранному элементу
        if (element) {
            element.classList.add('selected');
            element.style.background = '#e3f2fd';
        }

        // Показываем детали аудитории
        this.showClassroomDetails(classroom);

        // Подсвечиваем на плане, если он открыт
        if (this.currentFloor && this.currentFloor.hasPlan) {
            this.highlightRoomOnPlan(classroom.number);
        }
    }

    showClassroomDetails(classroom) {
        const numberElement = document.getElementById('classroom-number');
        const nameElement = document.getElementById('classroom-name');
        const typeElement = document.getElementById('classroom-type');
        const descriptionElement = document.getElementById('classroom-description');

        if (numberElement && nameElement && typeElement && descriptionElement) {
            numberElement.textContent = classroom.number;
            nameElement.textContent = classroom.name;
            typeElement.textContent = this.getClassroomTypeName(classroom.type);
            typeElement.className = `classroom-type-badge ${classroom.type}`;
            descriptionElement.textContent = classroom.description || 'Учебная аудитория для проведения занятий';

            // Показываем блок с деталями аудитории
            const classroomDetails = document.getElementById('classroom-details');
            if (classroomDetails) {
                classroomDetails.style.display = 'block';
                this.addClassroomDetailsCloseHandler();
            }
        }
    }

    showPlanError(message) {
        this.planContent.innerHTML = `
            <div class="plan-error">
                <div class="error-icon">❌</div>
                <p>${message}</p>
                <small>Попробуйте перезагрузить страницу или обратитесь к администратору</small>
            </div>
        `;
    }
    
    addClassroomDetailsCloseHandler() {
        const closeButton = document.querySelector('.close-details');
        const detailsElement = document.getElementById('classroom-details');

        if (closeButton && detailsElement) {
            closeButton.onclick = () => {
                detailsElement.style.display = 'none';
            };
        }
    }

    updateClassroomsList(floor) {
        if (!this.classroomsList || !this.currentBuilding) return;

        const classrooms = DataManager.getClassrooms(this.currentBuilding, floor.number);

        // Обновляем счетчик
        if (this.classroomsCount) {
            this.classroomsCount.textContent = `${classrooms.length} аудиторий`;
        }

        if (classrooms.length === 0) {
            this.classroomsList.innerHTML = '<div class="classroom-item">Нет данных об аудиториях</div>';
            return;
        }

        this.classroomsList.innerHTML = '';
        classrooms.forEach(classroom => {
            const item = this.createClassroomItem(classroom);
            this.classroomsList.appendChild(item);
        });
    }

    clearHighlight() {
        if (this.currentHighlighted) {
            this.currentHighlighted.classList.remove('highlighted');
            this.currentHighlighted = null;
            this.currentBuilding = null;
        }
    }

    async loadSVG() {
        try {
            const response = await fetch('assets/kampussouth.svg');
            const svgText = await response.text();

            const mapContainer = document.getElementById('map');
            mapContainer.innerHTML = `
                <div class="svg-container">
                    ${svgText}
                </div>
            `;

            this.svgContainer = mapContainer.querySelector('.svg-container');

        } catch (error) {
            console.error('Ошибка загрузки SVG:', error);
        }
    }

    makeBuildingsInteractive() {
        Object.keys(buildingsInfo).forEach(buildingId => {
            const element = document.getElementById(buildingId);
            if (element) {
                element.classList.add('building');

                if (!element.getAttribute('fill') && !element.querySelector('[fill]')) {
                    element.setAttribute('fill', '#d4d4d4');
                }

                if (!element.querySelector('title')) {
                    const title = document.createElement('title');
                    title.textContent = buildingsInfo[buildingId].title;
                    element.appendChild(title);
                }

                element.addEventListener('click', () => {
                    this.handleBuildingClick(element);
                });
            }
        });
    }

    handleBuildingClick(building) {
        const buildingId = building.id;

        if (this.currentHighlighted && this.currentHighlighted !== building) {
            this.currentHighlighted.classList.remove('highlighted');
        }

        building.classList.add('highlighted');
        this.currentHighlighted = building;
        this.currentBuilding = buildingId;

        const event = new CustomEvent('buildingSelected', {
            detail: { buildingId }
        });
        document.dispatchEvent(event);

        this.showBuildingInfo(buildingId);
    }

    showBuildingInfo(buildingId) {
        const data = buildingsInfo[buildingId];

        if (data) {
            this.buildingTitle.textContent = data.title;
            this.buildingDescription.textContent = data.description;
            this.generateFloorButtons(data.floors);
        } else {
            this.buildingTitle.textContent = 'Информация о здании';
            this.buildingDescription.textContent = 'Информация о данном здании будет добавлена в ближайшее время.';
            if (this.floorButtons) this.floorButtons.innerHTML = '';
        }
        
        this.openSidebar();
    }

    showPlan() {
        if (!this.currentFloor || !this.currentFloor.hasPlan) {
            alert('Для этого этажа нет плана');
            return;
        }

        this.planWindow.classList.add('open');
        this.mainContent.classList.add('plan-open');
        
        this.loadPlanContent();
    }

    closePlan() {
        this.planWindow.classList.remove('open');
        this.mainContent.classList.remove('plan-open');
        // Сбрасываем состояние PlanManager при закрытии
        if (this.planManager) {
            this.planManager.removeZoomControls();
        }
    }

    async loadPlanContent() {
        if (!this.currentFloor || !this.currentBuilding) {
            this.showPlanError('Не выбран этаж или здание');
            return;
        }
        
        const planConfig = DataManager.getPlanConfig(
            this.currentBuilding, 
            this.currentFloor.number
        );
        
        if (!planConfig) {
            this.showPlanError(`План для ${this.currentFloor.name} не настроен`);
            return;
        }

        this.currentPlanConfig = planConfig;
        
        try {
            // Показываем индикатор загрузки
            this.planContent.innerHTML = `
                <div class="plan-loading">
                    <div class="spinner"></div>
                    <p>Загрузка плана...</p>
                </div>
            `;
            
            const response = await fetch(planConfig.svgUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const svgText = await response.text();
            this.renderPlan(svgText, planConfig);
            
        } catch (error) {
            console.error('Ошибка загрузки плана:', error);
            this.showPlanError('Не удалось загрузить план этажа');
        }
    }

    renderPlan(svgText, planConfig) {
        // Даем время для отображения индикатора загрузки
        setTimeout(() => {
            this.planContent.innerHTML = `
                <div class="plan-svg-container">
                    ${svgText}
                    <div class="plan-controls">
                        <button class="zoom-in">+</button>
                        <button class="zoom-out">-</button>
                        <button class="reset-view">⟲</button>
                    </div>
                </div>
            `;

            this.planTitle.textContent = planConfig.display?.title || `План ${this.currentFloor.name}`;
            
            // Инициализируем план с конфигом
            this.initializePlan(planConfig);
            
        }, 100);
    }

    initializePlan(planConfig) {
        if (!this.planManager) {
            console.error('PlanManager не инициализирован');
            return;
        }
        
        // Даем время DOM обновиться
        setTimeout(() => {
            // Инициализируем контролы зума
            this.planManager.initZoomControls();
            
            // Затем настраиваем интерактивность
            this.makePlanInteractive(planConfig);
            
            // Устанавливаем лимиты зума
            this.planManager.setZoomLimits(
                planConfig.zoom?.minScale || 0.3,
                planConfig.zoom?.maxScale || 3
            );
            
            // Сбрасываем вид
            this.planManager.resetView();
            
            console.log('План инициализирован:', planConfig.display?.title);
        }, 200);
    }

    makePlanInteractive(planConfig) {
        const { selectors, skipElements, defaultFill } = planConfig.interactive;
        
        // Проверяем, что skipElements существует и является массивом
        const safeSkipElements = Array.isArray(skipElements) ? skipElements : [];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (this.shouldSkipElement(element, safeSkipElements)) return;
                this.makePlanElementInteractive(element, defaultFill);
            });
        });
    }

    shouldSkipElement(element, skipElements) {
        if (!Array.isArray(skipElements)) {
            console.warn('skipElements is not an array:', skipElements);
            return false;
        }
        return skipElements.some(skipId => element.id.includes(skipId));
    }

    makePlanElementInteractive(element, defaultFill) {
        element.classList.add('plan-room');
        element.style.cursor = 'pointer';
        
        if (!element.dataset.originalFill) {
            element.dataset.originalFill = element.getAttribute('fill') || defaultFill;
        }

        element.addEventListener('mouseenter', () => {
            if (!element.classList.contains('room-highlighted')) {
                element.style.filter = 'brightness(1.1)';
            }
        });

        element.addEventListener('mouseleave', () => {
            if (!element.classList.contains('room-highlighted')) {
                element.style.filter = '';
            }
        });

        element.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handlePlanRoomClick(element);
        });
    }

    handlePlanRoomClick(roomElement) {
        const roomId = roomElement.id;
        const roomNumber = DataManager.getRoomNumberByElementId(
            this.currentBuilding,
            this.currentFloor.number,
            roomId
        );

        if (roomNumber) {
            this.clearRoomHighlights();
            roomElement.classList.add('room-highlighted');
            this.selectCorrespondingClassroom(roomNumber);
        } else {
            console.log('Неизвестный элемент плана:', roomId);
        }
    }

    clearRoomHighlights() {
        document.querySelectorAll('.room-highlighted').forEach(room => {
            room.classList.remove('room-highlighted');
            room.style.filter = '';
        });
    }

    selectCorrespondingClassroom(roomNumber) {
        const classroomItems = this.classroomsList.querySelectorAll('.classroom-item');
        let found = false;
        
        classroomItems.forEach(item => {
            const roomNumberElement = item.querySelector('.classroom-number');
            if (roomNumberElement) {
                const itemRoomNumber = roomNumberElement.textContent.trim();
                if (itemRoomNumber === roomNumber) {
                    this.selectClassroomFromList(item);
                    found = true;
                    return;
                }
            }
        });

        if (!found) {
            console.log('Аудитория не найдена в списке:', roomNumber);
            document.querySelectorAll('.classroom-item').forEach(item => {
                item.style.background = '';
            });
        }
    }

    selectClassroomFromList(classroomElement) {
        document.querySelectorAll('.classroom-item').forEach(item => {
            item.style.background = '';
            item.classList.remove('selected');
        });
        
        classroomElement.style.background = '#e3f2fd';
        classroomElement.classList.add('selected');
        classroomElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        const roomNumber = classroomElement.querySelector('.classroom-number')?.textContent;
        
        if (roomNumber && this.currentBuilding) {
            const classroom = DataManager.findClassroom(this.currentBuilding, roomNumber.trim());
            if (classroom) {
                this.showClassroomDetails(classroom);
            }
        }
    }

    highlightRoomOnPlan(roomNumber) {
        if (!this.planWindow.classList.contains('open')) return;
        
        const elementId = DataManager.getRoomElementId(
            this.currentBuilding,
            this.currentFloor.number,
            roomNumber
        );

        if (elementId) {
            this.clearRoomHighlights();
            const roomElement = document.getElementById(elementId);
            if (roomElement) {
                roomElement.classList.add('room-highlighted');
                this.planManager.scrollToElement(roomElement);
            }
        }
    }

    openSidebar() {
        this.sidebar.classList.add('open');
        this.mainContent.classList.add('sidebar-open');
    }

    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.mainContent.classList.remove('sidebar-open');
        
        this.currentBuilding = null;
        this.currentFloor = null;
        this.clearRoomHighlights();

        document.querySelectorAll('.floor-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        document.querySelectorAll('.classroom-item').forEach(item => {
            item.classList.remove('selected');
            item.style.background = '';
        });

        // Скрываем детали аудитории
        const classroomDetails = document.getElementById('classroom-details');
        if (classroomDetails) {
            classroomDetails.style.display = 'none';
        }
    }

    generateFloorButtons(floors) {
        if (!this.floorButtons) return;

        this.floorButtons.innerHTML = '';

        floors.forEach(floor => {
            const button = document.createElement('button');
            button.className = 'floor-btn';
            button.textContent = `${floor.number} этаж`;
            button.setAttribute('data-floor', floor.number);

            button.addEventListener('click', () => {
                this.selectFloor(floor);
                document.querySelectorAll('.floor-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            });

            this.floorButtons.appendChild(button);
        });

        this.currentFloor = null;
    }

    selectFloor(floor) {
        this.currentFloor = floor;
        this.updateClassroomsList(floor);
    }
}