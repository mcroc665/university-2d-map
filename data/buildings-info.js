const buildingsInfo = {
    '2build': {
        title: 'Здание 2',
        description: 'Главный административный корпус. Здесь находятся ректорат, деканаты основных факультетов и приемная комиссия.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '3build': {
        title: 'Здание 3',
        description: 'Корпус гуманитарных наук. Расположены факультеты истории, философии, филологии и лингвистики.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false }
        ]
    },
    '4build': {
        title: 'Здание 4',
        description: 'Студенческое общежитие "Академическое". Комфортабельное проживание для иногородних студентов.',
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
            { number: 1, name: 'Первый этаж', hasPlan: true },
            { number: 2, name: 'Второй этаж', hasPlan: true },
            { number: 3, name: 'Третий этаж', hasPlan: true, planUrl: 'assets/plans/18block/plan-3Acorpus-3.svg', planType: 'interactive' },
            { number: 4, name: 'Четвёртый этаж', hasPlan: true, planUrl: 'assets/plans/18block/plan-3Acorpus-4.svg', planType: 'interactive' },
            { number: 5, name: 'Пятый этаж', hasPlan: true, planUrl: 'assets/plans/18block/plan-3Acorpus-5.svg', planType: 'interactive' }
        ]
    },
    '3block': {
        title: 'Корпус 3',
        description: 'Инженерно-технический корпус. Факультеты компьютерных наук, робототехники и инженерии.',
        floors: [
            { number: 1, name: 'Цокольный этаж', hasPlan: false },
            { number: 2, name: 'Первый этаж', hasPlan: false },
            { number: 3, name: 'Второй этаж', hasPlan: false }
        ]
    },
    '4block': {
        title: 'Корпус 4',
        description: 'Корпус естественных наук. Физические, химические и биологические лаборатории, исследовательские центры.',
        floors: [
            { number: 1, name: 'Цокольный этаж', hasPlan: false },
            { number: 2, name: 'Первый этаж', hasPlan: false },
            { number: 3, name: 'Второй этаж', hasPlan: false }
        ]
    },
    '5block': {
        title: 'Корпус 5',
        description: 'Корпус иностранных языков и международных отношений. Центр переводоведения и дипломатии.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '6block': {
        title: 'Корпус 6',
        description: 'Экономический факультет. Кафедры финансов, менеджмента и бизнес-аналитики.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '7block': {
        title: 'Корпус 7',
        description: 'Медицинский факультет. Анатомические театры, фантомные классы, центр симуляционного обучения.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '6home': {
        title: 'Здание 6',
        description: 'Студенческое общежитие "Студенческий". Современные комнаты с кухнями-блоками и прачечными.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '7home': {
        title: 'Здание 7',
        description: 'Студенческое общежитие "Университетский". Комнаты повышенной комфортности для аспирантов и иностранных студентов.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '8block': {
        title: 'Студенческий клуб GO',
        description: 'Центр студенческой жизни. Концертный зал, танцевальные студии, театральная площадка и кафе.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '9block': {
        title: 'Корпус 9',
        description: 'Юридический факультет. Библиотека правоведения, залы судебных заседаний, криминалистические лаборатории.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '10block': {
        title: 'Корпус 10',
        description: 'Спортивный комплекс. Бассейн, тренажерные залы, игровые площадки и фитнес-центр.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '11block': {
        title: 'Корпус 11',
        description: 'Центр востоковедения и азиатских исследований. Институт Конфуция, японский и корейский культурные центры.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '14block': {
        title: 'Корпус 14',
        description: 'Архитектурно-строительный факультет. Проектные мастерские, макетные лаборатории, выставочные залы.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '15block': {
        title: 'Корпус 15',
        description: 'Медиацентр и факультет журналистики. Телестудия, радиостанция, редакции студенческих изданий.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: true, planUrl: 'assets/plans/15block/plan-15corpus-1.svg', planType: 'interactive'},
            { number: 2, name: 'Второй этаж', hasPlan: true, planUrl: 'assets/plans/15block/plan-15corpus-2.svg', planType: 'interactive'},
            { number: 3, name: 'Третий этаж', hasPlan: true, planUrl: 'assets/plans/15block/plan-15corpus-3.svg', planType: 'interactive'},
            { number: 4, name: 'Четвертый этаж', hasPlan: true, planUrl: 'assets/plans/15block/plan-15corpus-4.svg', planType: 'interactive'}
        ]
    },
    '17block': {
        title: 'Корпус 17',
        description: 'Научно-исследовательский центр. Инновационные лаборатории, центры коллективного пользования, патентный отдел.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    },
    '18block': {
        title: 'Корпус 18',
        description: 'Факультет информационных технологий. Компьютерные классы, серверные, центры обработки данных и кафедра программирования.',
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
    'parking1': {
        title: 'Парковка А',
        description: 'Основная парковочная зона для сотрудников и гостей университета. Крытые и открытые места.',
        floors: [
            { number: 1, name: 'нэту', hasPlan: false }
        ]
    },
    'parking2': {
        title: 'Парковка Б',
        description: 'Закрытая парковка для спецтранспорта и обслуживающих служб университета.',
        floors: [
            { number: 1, name: 'нэту', hasPlan: false }
        ]
    },
    'bycicle': {
        title: 'Велостоянка',
        description: 'Крытая велопарковка с зарядными станциями для электровелосипедов и ремонтной мастерской.',
        floors: [
            { number: 1, name: 'нэту', hasPlan: false }
        ]
    },
    '20block': {
        title: 'Корпус 20',
        description: 'Факультет психологии и педагогики. Консультационные центры, тренинговые залы, исследовательские лаборатории.',
        floors: [
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false }
        ]
    }
};