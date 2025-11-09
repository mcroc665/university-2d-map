// Конфиг для 18 корпуса, 2 этаж
const PLAN_18BLOCK_FLOOR_2 = {
    svgUrl: 'assets/plans/18block/plan-18corpus-2.svg',
    roomMapping: {
            '203room': '203',
            '204room': '204',
            '204room': '204',
            '205room': '205',
            '206room': '206',
            '207room': '207',
            '208room': '208',
            '209room': '209',
            '210room': '210',
            '211room': '211',
            '212room': '212',
            '213room': '213',
            '214room': '214',
            '215room': '215',
            '216room': '216'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};