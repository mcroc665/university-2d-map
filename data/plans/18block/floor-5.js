// Конфиг для 18 корпуса, 5 этаж
const PLAN_18BLOCK_FLOOR_5 = {
    svgUrl: 'assets/plans/18block/plan-18corpus-5.svg',
    roomMapping: {
            '501room': '501',
            '502room': '502',
            '503room': '503',
            '504room': '504',
            '505room': '505',
            '506room': '506',
            '507room': '507',
            '508room': '508',
            '509room': '509',
            '510room': '510',
            '511room': '511',
            '512room': '512',
            '513room': '513',
            '514room': '514',
            '515room': '515',
            '516room': '516',
            '517room': '517',
            '518room': '518',
            '519room': '519',
            '520room': '520'
        // Добавьте соответствия для 2 этажа, когда будет план
    },
    interactive: {
        selectors: ['[id*="room"]', '[id*="class"]', '[id*="Rectangle"]'],
        skipElements: [],
        defaultFill: '#9CC7E5'
    }
};