// Конфиг для 18 корпуса, 1 этаж
const PLAN_18BLOCK_FLOOR_1 = {
    svgUrl: 'assets/plans/plan-18corpus.svg',
    roomMapping: {
        '114room': '114',
        '116room': '116'
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: ['plan-18corpus', 'Vector 147', 'WC'],
        defaultFill: '#9CC7E5'
    }
};