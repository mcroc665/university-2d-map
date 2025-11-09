class InteractiveMap {
    constructor() {
        this.mapCore = null;
        this.uiControls = null;
        this.searchManager = null;
        this.init();
    }

    async init() {
        // Создаем и инициализируем MapCore
        this.mapCore = new MapCore();
        await this.mapCore.init();

        // Создаем UIControls после полной инициализации MapCore
        this.uiControls = new UIControls(this.mapCore);

        // Создаем SearchManager после инициализации всех компонентов
        this.searchManager = new SearchManager(this.mapCore, this.uiControls);

        console.log('Карта инициализирована:', {
            mapCore: !!this.mapCore,
            uiControls: !!this.uiControls,
            searchManager: !!this.searchManager
        });
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveMap();
});