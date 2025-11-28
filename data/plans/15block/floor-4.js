// Конфиг для 15 корпуса, 3 этаж
const PLAN_15BLOCK_FLOOR_4 = {
    svgUrl: 'assets/plans/15block/plan-15corpus-4.svg',
    roomMapping: {
            '404room': '404',
            '406room': '406',
            '407room': '407',
            '408room': '408',
            '409room': '409',
            '410room': '410',
            '411room': '411',
            '412room': '412',
            '417room': '417'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};