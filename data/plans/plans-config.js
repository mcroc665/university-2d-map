const plansConfig = {
    // Корпус 18, этаж 2
    '18block_2': {
        svgUrl: 'assets/plans/18block/plan-18corpus-2.svg',
        display: {
            title: '18 корпус - 2 этаж'
        },
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
        },
        interactive: {
            selectors: ['[id*="room"]', 'rect[id]'],
            skipElements: [],
            defaultFill: '#9CC7E5'
        },
        zoom: {
            minScale: 0.3,
            maxScale: 3
        }
    }
};