// Конфиг для 18 корпуса, 7 этаж
const PLAN_18BLOCK_FLOOR_7 = {
    svgUrl: 'assets/plans/18block/plan-18corpus-7.svg',
    roomMapping: {
            '701room': '701',
            '702room': '702',
            '703room': '703',
            '704room': '704',
            '705room': '705',
            '706room': '706'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};