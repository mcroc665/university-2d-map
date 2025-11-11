// Конфиг для 18 корпуса, 3 этаж
const PLAN_18BLOCK_FLOOR_3 = {
    svgUrl: 'assets/plans/18block/plan-18corpus-3.svg',
    roomMapping: {
            '302room': '302',
            '303room': '303',
            '304room': '304',
            '305room': '305',
            '306room': '306',
            '307room': '307',
            '308room': '308',
            '309room': '309',
            '310room': '310',
            '311room': '311',
            '312room': '312',
            '313room': '313',
            '314room': '314',
            '315room': '315'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};