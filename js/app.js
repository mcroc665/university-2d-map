class InteractiveMap {
    constructor() {
        this.mapCore = null;
        this.uiControls = null;
        this.searchManager = null;
        this.isInitialized = false;
        
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Начало инициализации интерактивной карты...');

            // 1. Сначала создаем и инициализируем MapCore
            console.log('📦 Инициализация MapCore...');
            this.mapCore = new MapCore();
            await this.mapCore.init();
            
            // Даем время для полной инициализации DOM
            await this.delay(100);
            
            // 2. Инициализируем UIControls
            console.log('🎮 Инициализация UIControls...');
            this.uiControls = new UIControls(this.mapCore);
            await this.delay(50);
            
            // 3. Инициализируем SearchManager
            console.log('🔍 Инициализация SearchManager...');
            this.searchManager = new SearchManager(this.mapCore);
            await this.delay(50);

            // 4. Проверяем, что все компоненты работают
            await this.testComponents();
            
            this.isInitialized = true;
            console.log('✅ Интерактивная карта успешно инициализирована!');
            
            // 5. Показываем статус инициализации
            this.showInitStatus();
            
        } catch (error) {
            console.error('❌ Ошибка инициализации карты:', error);
            this.showError(error);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async testComponents() {
        console.log('🧪 Тестирование компонентов...');
        
        // Проверяем MapCore
        if (!this.mapCore) {
            throw new Error('MapCore не инициализирован');
        }
        
        // Проверяем основные элементы DOM
        const requiredElements = [
            'map', 'sidebar', 'building-select', 
            'building-title', 'floor-buttons'
        ];
        
        const missingElements = [];
        requiredElements.forEach(id => {
            if (!document.getElementById(id)) {
                missingElements.push(id);
            }
        });
        
        if (missingElements.length > 0) {
            throw new Error(`Отсутствуют элементы DOM: ${missingElements.join(', ')}`);
        }
        
        // Проверяем данные зданий
        const buildings = DataManager.getAllBuildings();
        if (!buildings || buildings.length === 0) {
            throw new Error('Нет данных о зданиях');
        }
        
        console.log(`📊 Загружено зданий: ${buildings.length}`);
        console.log('✅ Все компоненты работают корректно');
    }

    showInitStatus() {
        // Создаем индикатор статуса (можно убрать в продакшене)
        const statusDiv = document.createElement('div');
        statusDiv.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #4CAF50;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        statusDiv.textContent = '✅ Карта готова к работе';
        document.body.appendChild(statusDiv);
        
        // Автоматически скрываем через 3 секунды
        setTimeout(() => {
            statusDiv.style.opacity = '0';
            statusDiv.style.transition = 'opacity 0.5s';
            setTimeout(() => statusDiv.remove(), 500);
        }, 3000);
    }

    showError(error) {
        console.error('💥 Критическая ошибка:', error);
        
        // Показываем сообщение об ошибке пользователю
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #f44336;
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            text-align: center;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        errorDiv.innerHTML = `
            <h3 style="margin: 0 0 10px 0;">Ошибка загрузки карты</h3>
            <p style="margin: 0 0 15px 0; font-size: 14px;">${error.message}</p>
            <button onclick="location.reload()" style="
                background: white;
                color: #f44336;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            ">Перезагрузить страницу</button>
        `;
        document.body.appendChild(errorDiv);
    }

    // Метод для проверки состояния из консоли
    getStatus() {
        return {
            mapCore: !!this.mapCore,
            uiControls: !!this.uiControls,
            searchManager: !!this.searchManager,
            isInitialized: this.isInitialized,
            buildingsCount: DataManager.getAllBuildings().length,
            currentBuilding: this.mapCore?.currentBuilding,
            currentHighlighted: this.mapCore?.currentHighlighted?.id
        };
    }
}

// Глобальная ссылка для отладки
let interactiveMap;

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', async () => {
    console.log('📄 DOM загружен, начинаем инициализацию карты...');
    
    // Проверяем, что все необходимые скрипты загружены
    if (typeof MapCore === 'undefined') {
        console.error('❌ MapCore не загружен');
        return;
    }
    if (typeof UIControls === 'undefined') {
        console.error('❌ UIControls не загружен');
        return;
    }
    if (typeof SearchManager === 'undefined') {
        console.error('❌ SearchManager не загружен');
        return;
    }
    if (typeof DataManager === 'undefined') {
        console.error('❌ DataManager не загружен');
        return;
    }

    try {
        interactiveMap = new InteractiveMap();
        
        // Делаем доступным глобально для отладки
        window.interactiveMap = interactiveMap;
        window.mapCore = interactiveMap.mapCore;
        
    } catch (error) {
        console.error('❌ Фатальная ошибка при создании карты:', error);
    }
});

// Добавляем глобальные функции для отладки
window.debugMap = function() {
    if (!interactiveMap) {
        console.log('❌ Карта не инициализирована');
        return;
    }
    
    console.log('🐛 Отладочная информация:');
    console.log('1. Статус компонентов:', interactiveMap.getStatus());
    console.log('2. Доступные здания:', DataManager.getAllBuildings());
    console.log('3. Текущее выделенное здание:', interactiveMap.mapCore?.currentHighlighted);
    console.log('4. Элемент выпадающего списка:', document.getElementById('building-select'));
    
    // Проверяем обработчики событий
    const select = document.getElementById('building-select');
    if (select) {
        console.log('5. Обработчики change события:', select._events || 'неизвестно');
    }
};

window.testBuildingSelection = function(buildingId = '18block') {
    if (!interactiveMap?.searchManager) {
        console.log('❌ SearchManager не доступен');
        return;
    }
    
    console.log(`🧪 Тестируем выбор здания: ${buildingId}`);
    interactiveMap.searchManager.selectBuilding(buildingId);
};