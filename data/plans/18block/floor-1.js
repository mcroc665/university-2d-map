// Конфиг для 18 корпуса, 1 этаж
const PLAN_18BLOCK_FLOOR_1 = {
    svgUrl: 'assets/plans/18block/plan-18corpus-1.svg',
    roomMapping: {
            '103room': '103',
            '102room': '102',
            '104room': '104',
            '106room': '106',
            '107room': '107',
            '108room': '108'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};