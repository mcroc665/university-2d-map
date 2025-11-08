class MapCore {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.mainContent = document.getElementById('main-content');
        this.planWindow = document.getElementById('plan-window'); // Вернул обратно
        this.buildingTitle = document.getElementById('building-title');
        this.buildingDescription = document.getElementById('building-description');
        this.floorButtons = document.getElementById('floor-buttons');
        this.classroomsList = document.getElementById('classrooms-list');
        this.classroomsCount = document.getElementById('classrooms-count');
        this.planContent = document.getElementById('plan-content'); // Вернул обратно
        this.planTitle = document.getElementById('plan-title'); // Вернул обратно
        
        this.closeBtn = document.getElementById('sidebar-close');
        this.planCloseBtn = document.getElementById('plan-close'); // Вернул обратно
        this.showPlanBtn = document.getElementById('show-plan-btn'); // Вернул обратно
        
        this.currentHighlighted = null;
        this.currentBuilding = null;
        this.currentFloor = null;

        this.mapElement = null;
        this.svgContainer = null;
        
        this.planZoomScale = 1;
        this.minZoomScale = 0.3;
        this.maxZoomScale = 3;
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

        // Вернул обработчики для окна плана
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

    // Вернул методы для работы с отдельным окном плана
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
    }

    async loadPlanContent() {
        try {
            const response = await fetch(this.currentFloor.planUrl);
            const svgText = await response.text();
            
            this.planContent.innerHTML = `
                <div class="plan-svg-container">
                    ${svgText}
                    <div class="plan-zoom-controls">
                        <button class="zoom-in">+</button>
                        <button class="zoom-out">-</button>
                        <button class="reset-view">⟲</button>
                    </div>
                </div>
            `;

            this.planTitle.textContent = `План ${this.currentFloor.name}`;
            this.makePlanInteractive();
            this.addPlanZoomControls();

        } catch (error) {
            console.error('Ошибка загрузки плана:', error);
            this.planContent.innerHTML = `
                <div class="plan-placeholder">
                    <div class="plan-icon">❌</div>
                    <p>Не удалось загрузить план этажа</p>
                </div>
            `;
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

    makePlanInteractive() {
        console.log('Создание интерактивного плана...');
        
        const selectors = [
            '[id$="class"]',
            '[id^="Rectangle"]',
            '[id*="WC"] path',
            'path[id]',
            'rect[id]'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (this.shouldSkipElement(element)) return;
                this.makeElementInteractive(element);
            });
        });

        console.log('План стал интерактивным');
    }

    shouldSkipElement(element) {
        const skipIds = ['plan-18corpus', 'Vector 147', 'WC'];
        return skipIds.some(skipId => element.id.includes(skipId));
    }

    makeElementInteractive(element) {
        element.classList.add('building-path');
        element.style.cursor = 'pointer';
        
        if (!element.dataset.originalFill) {
            element.dataset.originalFill = element.getAttribute('fill') || '#9CC7E5';
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
            this.handleRoomClick(element);
        });
    }

    handleRoomClick(roomElement) {
        const roomId = roomElement.id;
        console.log('Кликнута комната:', roomId);
        
        this.clearRoomHighlights();
        roomElement.classList.add('room-highlighted');
        this.selectCorrespondingClassroom(roomId);
    }

    clearRoomHighlights() {
        document.querySelectorAll('.room-highlighted').forEach(room => {
            room.classList.remove('room-highlighted');
            room.style.filter = '';
        });
    }

    selectCorrespondingClassroom(roomId) {
        const normalizedRoomId = this.normalizeRoomId(roomId);
        console.log('Ищем аудиторию:', normalizedRoomId);
        
        const classroomItems = this.classroomsList.querySelectorAll('.classroom-item');
        let found = false;
        
        classroomItems.forEach(item => {
            const roomNumberElement = item.querySelector('.classroom-number');
            if (roomNumberElement) {
                const itemRoomNumber = roomNumberElement.textContent.trim();
                if (itemRoomNumber === normalizedRoomId) {
                    this.selectClassroomFromList(item);
                    found = true;
                    return;
                }
            }
        });

        if (!found) {
            console.log('Аудитория не найдена в списке:', normalizedRoomId);
            document.querySelectorAll('.classroom-item').forEach(item => {
                item.style.background = '';
            });
        }
    }

    normalizeRoomId(roomId) {
        if (roomId.endsWith('class')) {
            return roomId.replace('class', '');
        }
        
        if (roomId.includes('Rectangle')) {
            const match = roomId.match(/\d+/);
            return match ? match[0] : roomId;
        }
        
        if (roomId.includes('WC')) {
            return roomId.replace('WC', 'Туалет');
        }
        
        return roomId;
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
        console.log('Подсветка комнаты на плане:', roomNumber);
        
        this.clearRoomHighlights();
        
        let roomElement = null;
        
        const possibleIds = [
            `${roomNumber}class`,
            `Rectangle ${roomNumber}`,
            `Rectangle${roomNumber}`,
            roomNumber
        ];
        
        for (const possibleId of possibleIds) {
            roomElement = document.getElementById(possibleId);
            if (roomElement) break;
        }
        
        if (!roomElement) {
            const allElements = document.querySelectorAll('.building-path');
            allElements.forEach(el => {
                if (el.id.includes(roomNumber)) {
                    roomElement = el;
                }
            });
        }
        
        if (roomElement) {
            roomElement.classList.add('room-highlighted');
            
            const container = document.querySelector('.plan-svg-container');
            if (container) {
                const rect = roomElement.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                container.scrollTo({
                    left: rect.left - containerRect.left + container.scrollLeft - 100,
                    top: rect.top - containerRect.top + container.scrollTop - 100,
                    behavior: 'smooth'
                });
            }
        } else {
            console.warn('Не найдена комната на плане:', roomNumber);
        }
    }

    addPlanZoomControls() {
        const container = document.querySelector('.plan-svg-container');
        const svgElement = container?.querySelector('svg');
        
        if (!svgElement) return;
        
        const zoomInBtn = container.querySelector('.zoom-in');
        const zoomOutBtn = container.querySelector('.zoom-out');
        const resetBtn = container.querySelector('.reset-view');
        
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                if (this.planZoomScale < this.maxZoomScale) {
                    this.planZoomScale += 0.2;
                    this.applyZoom(svgElement);
                }
            });
        }
        
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                if (this.planZoomScale > this.minZoomScale) {
                    this.planZoomScale -= 0.2;
                    this.applyZoom(svgElement);
                }
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.planZoomScale = 1;
                this.applyZoom(svgElement);
                if (container) {
                    container.scrollLeft = container.scrollWidth / 2 - container.clientWidth / 2;
                    container.scrollTop = container.scrollHeight / 2 - container.clientHeight / 2;
                }
            });
        }
    }

    applyZoom(svgElement) {
        svgElement.style.transform = `scale(${this.planZoomScale})`;
        svgElement.style.transformOrigin = 'center center';
    }
}