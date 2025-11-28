// Конфиг для 15 корпуса, 3 этаж
const PLAN_15BLOCK_FLOOR_3 = {
    svgUrl: 'assets/plans/15block/plan-15corpus-3.svg',
    roomMapping: {
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
            '314room': '314'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};