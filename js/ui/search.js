class SearchManager {
    constructor(mapCore, uiControls) {
        this.mapCore = mapCore;
        this.uiControls = uiControls;
        this.selectElement = document.getElementById('building-select');

        this.init();
    }

    init() {
        this.populateBuildingSelect();
        this.addEventListeners();
    }

    populateBuildingSelect() {
        // Очищаем все опции кроме первой
        while (this.selectElement.children.length > 1) {
            this.selectElement.removeChild(this.selectElement.lastChild);
        }

        // Получаем список зданий через DataManager
        const buildings = DataManager.getAllBuildings();

        buildings.forEach(buildingId => {
            const buildingInfo = DataManager.getBuildingInfo(buildingId);
            if (buildingInfo) {
                const option = document.createElement('option');
                option.value = buildingId;
                option.textContent = buildingInfo.title;
                this.selectElement.appendChild(option);
            }
        });
    }

    addEventListeners() {
        // Обработчик изменения выбора в выпадающем списке
        this.selectElement.addEventListener('change', (e) => {
            const buildingId = e.target.value;
            console.log('Выбрано здание:', buildingId); // Для отладки

            if (buildingId) {
                this.selectBuildingFromDropdown(buildingId);
            } else {
                // Если выбран пустой вариант
                this.clearSelection();
            }
        });

        // Синхронизация выпадающего списка при клике на здание на карте
        document.addEventListener('buildingSelected', (e) => {
            const buildingId = e.detail.buildingId;
            console.log('Событие buildingSelected:', buildingId); // Для отладки
            this.selectElement.value = buildingId;
        });

        // Дополнительная синхронизация при открытии боковой панели
        document.addEventListener('sidebarOpened', (e) => {
            const buildingId = e.detail.buildingId;
            if (buildingId && this.selectElement.value !== buildingId) {
                this.selectElement.value = buildingId;
            }
        });
    }

    selectBuildingFromDropdown(buildingId) {
        console.log('selectBuildingFromDropdown вызван с:', buildingId); // Для отладки

        // Находим элемент здания на карте
        const buildingElement = document.getElementById(buildingId);
        if (!buildingElement) {
            console.error(`Элемент здания с ID "${buildingId}" не найден на карте`);
            return;
        }

        // Снимаем подсветку с предыдущего здания
        if (this.mapCore.currentHighlighted && this.mapCore.currentHighlighted !== buildingElement) {
            this.mapCore.currentHighlighted.classList.remove('highlighted');
        }

        // Подсвечиваем выбранное здание
        buildingElement.classList.add('highlighted');
        this.mapCore.currentHighlighted = buildingElement;
        this.mapCore.currentBuilding = buildingId;

        // Показываем информацию о здании и открываем боковую панель
        this.mapCore.showBuildingInfo(buildingId);

        // Принудительно открываем боковую панель
        if (!this.mapCore.sidebar.classList.contains('open')) {
            this.mapCore.openSidebar();
        }

        // Создаем кастомное событие для синхронизации
        const event = new CustomEvent('buildingSelectedFromSearch', {
            detail: { buildingId }
        });
        document.dispatchEvent(event);

        console.log('Здание выбрано и подсвечено:', buildingId); // Для отладки
    }

    clearSelection() {
        // Снимаем подсветку
        if (this.mapCore.currentHighlighted) {
            this.mapCore.currentHighlighted.classList.remove('highlighted');
            this.mapCore.currentHighlighted = null;
        }

        this.mapCore.currentBuilding = null;

        // Закрываем боковую панель
        if (this.mapCore.sidebar.classList.contains('open')) {
            this.mapCore.closeSidebar();
        }
    }

    // Метод для поиска по названию (может пригодиться в будущем)
    searchByQuery(query) {
        query = query.toLowerCase().trim();

        const buildings = DataManager.getAllBuildings();
        const foundBuilding = buildings.find(buildingId => {
            const buildingInfo = DataManager.getBuildingInfo(buildingId);
            return buildingInfo.title.toLowerCase().includes(query);
        });

        if (foundBuilding) {
            this.selectBuildingFromDropdown(foundBuilding);
            return true;
        }

        return false;
    }

    searchClassrooms(query) {
        query = query.toLowerCase().trim();
        const results = [];

        const buildings = DataManager.getAllBuildings();
        buildings.forEach(buildingId => {
            const buildingInfo = DataManager.getBuildingInfo(buildingId);
            for (let floor in classroomsData[buildingId] || {}) {
                classroomsData[buildingId][floor].forEach(classroom => {
                    if (classroom.number.toLowerCase().includes(query) ||
                        classroom.name.toLowerCase().includes(query)) {
                        results.push({
                            building: buildingInfo.title,
                            buildingId,
                            floor,
                            ...classroom
                        });
                    }
                });
            }
        });

        return results;
    }

    // Метод для принудительного обновления выбора
    refreshSelection() {
        if (this.mapCore.currentBuilding) {
            this.selectElement.value = this.mapCore.currentBuilding;
        } else {
            this.selectElement.value = '';
        }
    }
}