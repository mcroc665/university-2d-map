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
        while (this.selectElement.children.length > 1) {
            this.selectElement.removeChild(this.selectElement.lastChild);
        }

        Object.keys(buildingData).forEach(buildingId => {
            const building = buildingData[buildingId];
            const option = document.createElement('option');
            option.value = buildingId;
            option.textContent = building.title;
            this.selectElement.appendChild(option);
        });
    }

    addEventListeners() {
        this.selectElement.addEventListener('change', (e) => {
            const buildingId = e.target.value;
            if (buildingId) {
                this.selectBuilding(buildingId);
            } else {
                // Если выбран пустой вариант, снимаем подсветку
                if (this.mapCore.currentHighlighted) {
                    this.mapCore.currentHighlighted.classList.remove('highlighted');
                    this.mapCore.currentHighlighted = null;
                }
            }
        });

        // Синхронизируем выпадающий список при клике на здание
        document.addEventListener('buildingSelected', (e) => {
            this.selectElement.value = e.detail.buildingId;
        });
    }

    selectBuilding(buildingId) {
        const buildingElement = document.getElementById(buildingId);
        if (!buildingElement) {
            console.warn(`Здание с ID "${buildingId}" не найдено на карте`);
            return;
        }

        // Снимаем подсветку с предыдущего здания
        if (this.mapCore.currentHighlighted) {
            this.mapCore.currentHighlighted.classList.remove('highlighted');
        }

        // Подсвечиваем выбранное здание
        buildingElement.classList.add('highlighted');
        this.mapCore.currentHighlighted = buildingElement;

        // Убрали центрирование и открытие модального окна

        // Создаем кастомное событие для синхронизации
        const event = new CustomEvent('buildingSelected', {
            detail: { buildingId }
        });
        document.dispatchEvent(event);
    }

    // Метод для будущего поиска (оставляем на будущее)
    search(query) {
        query = query.toLowerCase().trim();

        const foundBuilding = Object.keys(buildingData).find(buildingId => {
            const building = buildingData[buildingId];
            return building.title.toLowerCase().includes(query);
        });

        if (foundBuilding) {
            this.selectBuilding(foundBuilding);
            return true;
        }

        const foundById = Object.keys(buildingData).find(buildingId => {
            return buildingId.toLowerCase().includes(query);
        });

        if (foundById) {
            this.selectBuilding(foundById);
            return true;
        }

        return false;
    }
}