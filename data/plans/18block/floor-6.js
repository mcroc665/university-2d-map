// Конфиг для 18 корпуса, 6 этаж
const PLAN_18BLOCK_FLOOR_6 = {
    svgUrl: 'assets/plans/18block/plan-18corpus-6.svg',
    roomMapping: {
            '601room': '601',
            '602room': '602',
            '603room': '603',
            '604room': '604',
            '605room': '605',
            '606room': '606',
            '607room': '607',
            '608room': '608',
            '609room': '609',
            '610room': '610',
            '611room': '611',
            '612room': '612',
            '613room': '613',
            '614room': '614',
            '615room': '615',
            '616room': '616',
            '617room': '617'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};