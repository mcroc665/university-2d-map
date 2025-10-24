class MapCore {
    constructor() {
        this.modal = document.getElementById('modal');
        this.buildingTitle = document.getElementById('building-title');
        this.buildingDescription = document.getElementById('building-description');
        this.floorButtons = document.getElementById('floor-buttons');
        this.closeBtn = document.querySelector('.close');
        this.currentHighlighted = null;
        this.currentBuilding = null;
        this.currentFloor = null;

        this.mapElement = null;
        this.svgContainer = null;
    }

    async init() {
        await this.loadSVG();
        this.mapElement = document.getElementById('map');
        this.makeBuildingsInteractive();
        this.addGlobalClickListener(); // Добавим обработчик для снятия подсветки
        return this;
    }

    // Добавляем метод для снятия подсветки при клике на пустое место
    addGlobalClickListener() {
        document.addEventListener('click', (e) => {
            // Если кликнули не на здание и не на выпадающий список
            if (!e.target.closest('.building') &&
                !e.target.closest('.building-select') &&
                !e.target.closest('.modal') &&
                this.currentHighlighted) {

                this.clearHighlight();

                // Также сбрасываем выпадающий список
                const selectElement = document.getElementById('building-select');
                if (selectElement) {
                    selectElement.value = '';
                }
            }
        });
    }

    // Метод для очистки подсветки
    clearHighlight() {
        if (this.currentHighlighted) {
            this.currentHighlighted.classList.remove('highlighted');
            this.currentHighlighted = null;
            this.currentBuilding = null;
        }
    }

    // Остальные методы без изменений...
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
        Object.keys(buildingData).forEach(buildingId => {
            const element = document.getElementById(buildingId);
            if (element) {
                element.classList.add('building');

                if (!element.getAttribute('fill') && !element.querySelector('[fill]')) {
                    element.setAttribute('fill', '#d4d4d4');
                }

                if (!element.querySelector('title')) {
                    const title = document.createElement('title');
                    title.textContent = buildingData[buildingId].title;
                    element.appendChild(title);
                }
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

        // Создаем событие для синхронизации с выпадающим списком
        const event = new CustomEvent('buildingSelected', {
            detail: { buildingId }
        });
        document.dispatchEvent(event);

        // Открываем модальное окно с информацией (только при клике на здание)
        this.showBuildingInfo(buildingId);
    }

    // Остальные методы без изменений...
    showBuildingInfo(buildingId) {
        const data = buildingData[buildingId];

        if (data) {
            this.buildingTitle.textContent = data.title;
            this.buildingDescription.textContent = data.description;
            this.generateFloorButtons(data.floors);
        } else {
            this.buildingTitle.textContent = 'Информация о здании';
            this.buildingDescription.textContent = 'Информация о данном здании будет добавлена в ближайшее время.';
            if (this.floorButtons) this.floorButtons.innerHTML = '';
        }
        if (this.modal) this.modal.style.display = 'block';
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
        this.updateFloorPlan();
    }

    selectFloor(floor) {
        this.currentFloor = floor;
        this.updateFloorPlan();
        this.updateClassroomsList(floor);
    }

    updateFloorPlan() {
        const floorPlan = document.querySelector('.floor-plan-content');
        if (!floorPlan) return;

        if (!this.currentFloor) {
            floorPlan.innerHTML = `
                <div class="floor-plan-placeholder">🏢</div>
                <p>План этажа будет отображен здесь</p>
                <small>Выберите этаж для просмотра плана</small>
            `;
        } else {
            if (this.currentFloor.hasPlan) {
                floorPlan.innerHTML = `
                    <div class="floor-plan-placeholder">📐</div>
                    <p>План ${this.currentFloor.number} этажа</p>
                    <small>План этажа загружается...</small>
                `;
            } else {
                floorPlan.innerHTML = `
                    <div class="floor-plan-placeholder">📋</div>
                    <p>План ${this.currentFloor.number} этажа</p>
                    <small>План этажа будет добавлен в ближайшее время</small>
                `;
            }
        }
    }

    closeModal() {
        if (this.modal) this.modal.style.display = 'none';

        if (this.currentHighlighted) {
            // Не снимаем подсветку при закрытии модального окна
            // this.currentHighlighted.classList.remove('highlighted');
            // this.currentHighlighted = null;
        }

        this.currentBuilding = null;
        this.currentFloor = null;

        document.querySelectorAll('.floor-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
    // В метод selectFloor добавляем:
    selectFloor(floor) {
        this.currentFloor = floor;
        this.updateFloorPlan();
        this.updateClassroomsList(floor); // ЭТО НУЖНО АКТИВИРОВАТЬ
    }

    // Добавляем метод updateClassroomsList (если его нет):
    updateClassroomsList(floor) {
        const classroomsList = document.getElementById('classrooms-list');
        if (!classroomsList || !this.currentBuilding) return;

        // Берем данные из classroomsData
        const classrooms = classroomsData[this.currentBuilding]?.[floor.number] || [];

        if (classrooms.length === 0) {
            classroomsList.innerHTML = '<div class="classroom-item">Нет данных об аудиториях</div>';
            return;
        }

        // Отрисовываем список
        classroomsList.innerHTML = '';
        classrooms.forEach(classroom => {
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

            item.addEventListener('click', () => this.selectClassroom(classroom));
            classroomsList.appendChild(item);
        });
    }

    // Вспомогательный метод для названий типов
    getClassroomTypeName(type) {
        const types = {
            'lecture': 'Лекционная',
            'seminar': 'Семинарская',
            'lab': 'Лаборатория',
            'computer': 'Компьютерный класс'
        };
        return types[type] || type;
    }
    selectClassroom(classroom) {
        // Подсветка в списке
        document.querySelectorAll('.classroom-item').forEach(item => {
            item.style.background = '';
        });
        event.currentTarget.style.background = '#e3f2fd';

        // Показываем информацию об аудитории
        this.showClassroomDetails(classroom);
    }

    showClassroomDetails(classroom) {
        // Создаем простой вывод в консоль для начала
        console.log('Выбрана аудитория:', classroom);

        // Можно добавить всплывающее окно или вывод в интерфейс
        alert(`Аудитория ${classroom.number}\n${classroom.name}`);
    }
}