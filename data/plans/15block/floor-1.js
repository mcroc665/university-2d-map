// Конфиг для 15 корпуса, 1 этаж
const PLAN_15BLOCK_FLOOR_1 = {
    svgUrl: 'assets/plans/15block/plan-15corpus-1.svg',
    roomMapping: {
            '100room': '100'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};