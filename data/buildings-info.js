// Данные для зданий
const buildingsInfo = {
    '2build': {
        title: 'Какое то здание 2',
        description: 'тут люди',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '3build': {
        title: 'здание 3',
        description: 'тут вряд ли люди',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false }
        ]
    },
    '4build': {
        title: 'какое то там общежитие',
        description: 'костян дом кафедра',
        floors: [
            { number: 1, name: 'Цокольный этаж', hasPlan: false },
            { number: 2, name: 'Первый этаж', hasPlan: false },
            { number: 3, name: 'Второй этаж', hasPlan: false }
        ]
    },
    '3Ablock': {
        title: 'Корпус 3A',
        description: 'Учебный корпус №3(адмэнэстрацывный). Многофункциональное здание с современными компьютерными классами, библиотекой и конференц-залами.',
        floors: [
            { number: 1, name: 'Цокольный этаж', hasPlan: false },
            { number: 2, name: 'Первый этаж', hasPlan: false },
            { number: 3, name: 'Второй этаж', hasPlan: false },
            { number: 4, name: 'Второй этаж', hasPlan: false },
            { number: 5, name: 'Второй этаж', hasPlan: false }
        ]
    },
    '3block': {
        title: 'Корпус 3',
        description: 'Учебный корпус №3. Многофункциональное здание с современными компьютерными классами, библиотекой и конференц-залами.',
        floors: [
            { number: 1, name: 'Цокольный этаж', hasPlan: false },
            { number: 2, name: 'Первый этаж', hasPlan: false },
            { number: 3, name: 'Второй этаж', hasPlan: false }
        ]
    },
    '4block': {
        title: 'Корпус 4',
        description: 'Учебный корпус №4. Многофункциональное здание с современными компьютерными классами, библиотекой и конференц-залами.',
        floors: [
            { number: 1, name: 'Цокольный этаж', hasPlan: false },
            { number: 2, name: 'Первый этаж', hasPlan: false },
            { number: 3, name: 'Второй этаж', hasPlan: false }
        ]
    },
    '5block': {
        title: 'Корпус 5',
        description: 'Учебный корпус №5. Здесь расположены факультеты язычников наук, лаборатории и исследовательские центры.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '6block': {
        title: 'Корпус 6',
        description: 'Учебный корпус №5. gym',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '7block': {
        title: 'Корпус 7',
        description: 'Учебный корпус №7. хз',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '6home': {
        title: 'общага 6',
        description: 'пашкин спавнер',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '7home': {
        title: 'общага 7',
        description: 'террариум с машкой',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '8block': {
        title: 'CLUB GO',
        description: 'террариум с никитой толсто-овым',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '9block': {
        title: 'Корпус 9',
        description: 'Учебный корпус №9. хз',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '10block': {
        title: 'Корпус 10',
        description: 'Учебный корпус №10. хз',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '11block': {
        title: 'Корпус 11',
        description: 'Учебный корпус №11. Про китайцев',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '14block': {
        title: 'Корпус 14',
        description: 'Учебный корпус №14. Про пыавпывапывапвап',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '15block': {
        title: 'Корпус 15',
        description: 'Учебный корпус №15. Про пыапаывпвыапвывпывапывапвап',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '17block': {
        title: 'Корпус 17',
        description: 'Учебный корпус №17. Про пыапаывпвыапвывпывапывапвап',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '18block': {
        title: 'Корпус 18',
        description: 'Учебный корпус №18. тут компьютеры и наша кафедрель.',
        floors: [
            { number: 1, name: 'Третий этаж', hasPlan: true, planUrl: 'assets/plans/18block/plan-18corpus-1.svg', planType: 'interactive'},
            { number: 2, name: 'Второй этаж', hasPlan: true, planUrl: 'assets/plans/18block/plan-18corpus-2.svg', planType: 'interactive'},
            { number: 3, name: 'Третий этаж', hasPlan: true, planUrl: 'assets/plans/18block/plan-18corpus-3.svg', planType: 'interactive'},
            { number: 4, name: 'Четвёртый этаж', hasPlan: true, planUrl: 'assets/plans/18block/plan-18corpus-4.svg', planType: 'interactive'},
            { number: 5, name: 'Пятый этаж', hasPlan: true, planUrl: 'assets/plans/18block/plan-18corpus-5.svg', planType: 'interactive'},
            { number: 6, name: 'Шестой этаж', hasPlan: true, planUrl: 'assets/plans/18block/plan-18corpus-6.svg', planType: 'interactive'},
            { number: 7, name: 'Седьмой этаж', hasPlan: true, planUrl: 'assets/plans/18block/plan-18corpus-7.svg', planType: 'interactive'}

        ]
    },
    'korolev': {
        title: 'статуя',
        description: 'серега космонавт',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false },
            { number: 5, name: 'Пятый этаж', hasPlan: false }
        ]
    },
    'rocket': {
        title: 'карандаш',
        description: 'как с луны свалился',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false },
            { number: 5, name: 'Пятый этаж', hasPlan: false }
        ]
    },
    'bottangarden': {
        title: 'Ботанический сад',
        description: 'чистилище никиы тосто-я-това',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false },
            { number: 5, name: 'Пятый этаж', hasPlan: false }
        ]
    },
    'parking1': {
        title: 'парковочная зона',
        description: 'так вот откуда ноги растут',
        floors: [
            { number: 1, name: 'нэту', hasPlan: false }
        ]
    },
    'parking2': {
        title: 'парковочная зона',
        description: 'сюда нельзя',
        floors: [
            { number: 1, name: 'нэту', hasPlan: false }
        ]
    },
    'bycicle': {
        title: 'парковочная вело зона',
        description: 'крути педали',
        floors: [
            { number: 1, name: 'нэту', hasPlan: false }
        ]
    },
    '20block': {
        title: 'Корпус 20',
        description: 'Учебный корпус №20. Здесь расположены факультеты естественных наук, лаборатории и исследовательские центры.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    }
};