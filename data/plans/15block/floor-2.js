// Конфиг для 15 корпуса, 2 этаж
const PLAN_15BLOCK_FLOOR_2 = {
    svgUrl: 'assets/plans/15block/plan-15corpus-2.svg',
    roomMapping: {
            '204room': '204',
            '208room': '208',
            '211room': '211',
            '212room': '212',
            '213room': '213'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};