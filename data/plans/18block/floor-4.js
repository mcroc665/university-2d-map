// Конфиг для 18 корпуса, 4 этаж
const PLAN_18BLOCK_FLOOR_4 = {
    svgUrl: 'assets/plans/18block/plan-18corpus-4.svg',
    roomMapping: {
            '401room': '401',
            '402room': '402',
            '403room': '403',
            '404room': '404',
            '405room': '405',
            '406room': '406',
            '407room': '407',
            '408room': '408',
            '409room': '409',
            '410room': '410'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};