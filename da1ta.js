// Данные для зданий
const buildingData = {
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
            { number: 1, name: 'Первый этаж', hasPlan: false },
            { number: 2, name: 'Второй этаж', hasPlan: false },
            { number: 3, name: 'Третий этаж', hasPlan: false },
            { number: 4, name: 'Четвертый этаж', hasPlan: false },
            { number: 5, name: 'Пятый этаж', hasPlan: false }
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

const classroomsData = {
    '3Ablock': {
        1: [
            { number: "100", name: "Учебная лаборатория", type: "lab" },
            { number: "101", name: "Учебная лаборатория / Учебная аудитория для курсового проектирования (выполнение курсовых работ)", type: "lab" },
            { number: "101а", name: "Учебная лаборатория / Учебная аудитория для проведения занятий лекционного типа, ...", type: "lecture" },
            { number: "101б", name: "НИЛ-54", type: "lab" },
            { number: "102", name: "Преподавательская", type: "staff" },
            { number: "102В", name: "Учебная лаборатория", type: "lab" },
            { number: "102а", name: "ОНИЛ-5", type: "lab" },
            { number: "102в", name: "Помещение для самостоятельной работы", type: "other" },
            { number: "102б", name: "НИЛ-54", type: "lab" },
            { number: "103", name: "Учебная лаборатория", type: "lab" },
            { number: "103а", name: "Заведующий учебной лабораторией", type: "office" },
            { number: "104", name: "Лаборатория общей электротехники и электроники", type: "lab" },
            { number: "104а", name: "Касса", type: "other" },
            { number: "105", name: "НИЛ АСУ ВУЗ", type: "lab" },
            { number: "106", name: "Бухгалтерия", type: "office" },
            { number: "107", name: "НИЛ АСУ ВУЗ", type: "lab" },
            { number: "109", name: "Отдел управления качеством", type: "office" },
            { number: "110", name: "Хозяйственный отдел", type: "office" },
            { number: "112", name: "Отдел по расчетам с работниками", type: "office" },
            { number: "114", name: "Касса", type: "other" },
            { number: "115а", name: "Отдел стандартизации, метрологии и технического контроля", type: "office" },
            { number: "115б", name: "Отдел стандартизации, метрологии и технического контроля", type: "office" },
            { number: "115в", name: "Начальник финансово-экономического отдела", type: "office" },
            { number: "115г", name: "Хозяйственный отдел", type: "office" },
            { number: "115д", name: "ИЦ «Уникон»", type: "other" }
        ],

        2: [
            { number: "201", name: "Организационно-правовое управление", type: "office" },
            { number: "202", name: "Управление международной деятельности", type: "office" },
            { number: "203", name: "Проректор по учебной работе. Проректор по образовательной и международной деятельности", type: "office" },
            { number: "204", name: "Отдел сопровождения научных исследований", type: "office" },
            { number: "205", name: "Ректор", type: "office" },
            { number: "206", name: "Первый проректор - проректор по науке и инновациям", type: "office" },
            { number: "207", name: "Музей", type: "other" },
            { number: "208", name: "Президент университета", type: "office" },
            { number: "209", name: "Зал заседаний учёного совета", type: "other" },
            { number: "210", name: "Совет НИРС", type: "other" },
            { number: "210а", name: "Управление обеспечения инновационной деятельности", type: "office" },
            { number: "211", name: "Студенческий отдел кадров", type: "office" },
            { number: "212", name: "Отдел аспирантуры и докторантуры", type: "office" },
            { number: "212а", name: "Управление инновационных программ", type: "office" },
            { number: "213", name: "Профком сотрудников университета", type: "office" },
            { number: "214", name: "Отдел сопровождения деятельности советов университета", type: "office" },
            { number: "215", name: "Отдел кадров и учета персонала", type: "office" },
            { number: "216", name: "Отдел обеспечения деятельности советов университета", type: "office" },
            { number: "218", name: "Отдел кадров и учета персонала", type: "office" },
            { number: "219", name: "Проректор по общим вопросам", type: "office" },
            { number: "220", name: "Отдел планирования оплаты труда", type: "office" },
            { number: "221", name: "Управление по работе с персоналом", type: "office" },
            { number: "222", name: "Отдел бюджетирования и финансового анализа", type: "office" }
        ],
        3: [
            { number: "301", name: "Отдел по защите государственной тайны и информации", type: "office" },
            { number: "302", name: "Отдел по защите государственной тайны и информации", type: "office" },
            { number: "303", name: "Мобилизационное управление", type: "office" },
            { number: "304", name: "Отдел по защите государственной тайны и информации", type: "office" },
            { number: "305", name: "Отдел по защите государственной тайны и информации", type: "office" },
            { number: "306", name: "Отдел по защите государственной тайны и информации", type: "office" },
            { number: "306а", name: "Отдел по защите государственной тайны и информации", type: "office" },
            { number: "307", name: "Группа технического обслуживания", type: "other" },
            { number: "308", name: "Управление мониторинга научной и образовательной деятельности университета", type: "office" },
            { number: "308а", name: "Начальник методического отдела", type: "office" },
            { number: "309", name: "Управление обеспечения учебного процесса", type: "office" },
            { number: "309а", name: "Управление обеспечения учебного процесса", type: "office" },
            { number: "310", name: "Методический отдел", type: "office" },
            { number: "311", name: "Учебная аудитория 311", type: "lecture" },
            { number: "311а", name: "Управление бухгалтерского учета", type: "office" },
            { number: "313", name: "Учебная аудитория 313", type: "lecture" },
            { number: "313а", name: "Управление бухгалтерского учета", type: "office" },
            { number: "315", name: "Начальник НИЧ", type: "office" },
            { number: "316", name: "Канцелярия", type: "office" },
            { number: "317", name: "Отдел по расчетам с работниками", type: "office" },
            { number: "318", name: "Планово-финансовое управление", type: "office" },
            { number: "319", name: "Отдел по учету товарно-материальных ценностей", type: "office" },
            { number: "320", name: "Ректорат", type: "office" },
            { number: "321", name: "Управление бухгалтерского учета", type: "office" },
            { number: "322", name: "Отдел по расчету с работниками", type: "office" },
            { number: "323", name: "Управление бухгалтерского учета", type: "office" },
            { number: "324", name: "Отдел финансового анализа и производственно-экономической деятельности", type: "office" },
            { number: "325", name: "Управление бухгалтерского учета", type: "office" },
            { number: "326", name: "Учебная аудитория 326", type: "lecture" },
            { number: "326а", name: "Финансово-экономический отдел НИЧ", type: "office" },
            { number: "328", name: "Организационное управление", type: "office" }
        ],

        4: [
            { number: "401", name: "Заведующий кафедрой", type: "office" },
            { number: "401а", name: "Учебная лаборатория", type: "lab" },
            { number: "402", name: "Учебная лаборатория", type: "lab" },
            { number: "403", name: "Учебная лаборатория", type: "lab" },
            { number: "404", name: "Ректорат", type: "office" },
            { number: "405", name: "Учебная лаборатория", type: "lab" },
            { number: "406", name: "Инженерная", type: "other" },
            { number: "407", name: "Отдел по расчетам с обучающимися", type: "office" },
            { number: "409", name: "Учебная аудитория 409", type: "lecture" },
            { number: "410", name: "Учебная лаборатория", type: "lab" },
            { number: "412", name: "Деканат", type: "office" },
            { number: "412а", name: "Деканат", type: "office" },
            { number: "414", name: "Центр по работе с одарённой молодёжью", type: "office" },
            { number: "415", name: "Помещение для самостоятельной работы", type: "other" },
            { number: "416", name: "Учебная лаборатория", type: "lab" },
            { number: "417", name: "Заведующий учебными лабораториями", type: "office" },
            { number: "418", name: "Учебная аудитория 418", type: "lecture" },
            { number: "419", name: "Учебная лаборатория", type: "lab" },
            { number: "420", name: "Издательство", type: "other" },
            { number: "420а", name: "Учебная лаборатория", type: "lab" },
            { number: "422", name: "Учебная лаборатория", type: "lab" },
            { number: "424", name: "Учебная лаборатория", type: "lab" },
            { number: "426", name: "Учебная лаборатория", type: "lab" }
        ],

        5: [
            { number: "500", name: "Управление занятости и карьеры", type: "office" },
            { number: "501", name: "Управление международной деятельности", type: "office" },
            { number: "502", name: "Управление занятости и карьеры", type: "office" },
            { number: "503", name: "Учебная лаборатория", type: "lab" },
            { number: "504", name: "Преподавательская", type: "staff" },
            { number: "504а", name: "Управление международной деятельности", type: "office" },
            { number: "504б", name: "Управление международной деятельности", type: "office" },
            { number: "505", name: "Учебная лаборатория", type: "lab" },
            { number: "506", name: "Учебная лаборатория", type: "lab" },
            { number: "507", name: "Учебная лаборатория", type: "lab" },
            { number: "508", name: "Учебная аудитория 508", type: "lecture" },
            { number: "509", name: "Учебная лаборатория", type: "lab" },
            { number: "509б", name: "Научная лаборатория", type: "lab" },
            { number: "509в", name: "Архив", type: "other" },
            { number: "510", name: "Учебная аудитория 510", type: "lecture" },
            { number: "510а", name: "Учебная аудитория 510а", type: "lecture" },
            { number: "511", name: "Учебная аудитория 511", type: "lecture" },
            { number: "512", name: "Лаборатория", type: "lab" },
            { number: "513", name: "Учебная аудитория 513", type: "lecture" },
            { number: "514", name: "Учебная аудитория 514", type: "lecture" },
            { number: "514а", name: "Центр карьеры и занятости", type: "office" },
            { number: "515", name: "Учебная аудитория 515", type: "lecture" },
            { number: "515а", name: "Подсобное помещение", type: "other" },
            { number: "516", name: "Учебная аудитория 516", type: "lecture" },
            { number: "516а", name: "Лаборатория", type: "lab" },
            { number: "517", name: "СКБ", type: "other" },
            { number: "518", name: "Учебная аудитория 518", type: "lecture" },
            { number: "519", name: "Отдел интеллектуальной собственности", type: "office" },
            { number: "519а", name: "Отдел интеллектуальной собственности", type: "office" },
            { number: "520", name: "Учебная лаборатория / Учебная аудитория", type: "lab" },
            { number: "520а", name: "Управление международной деятельности", type: "office" },
            { number: "522", name: "Учебная лаборатория / Учебная аудитория для курсового проектирования", type: "lab" },
            { number: "522а", name: "Отдел конгрессно-выставочной деятельности", type: "office" }
        ]

        // Примечание: все номера, не подходящие под правило "трёхзначный номер" (например '59', 'ц03', '4, 21-32', '3с', '1', '6', '45', 'ц8/2' и т.д.)
        // я не включил сюда. Если хочешь — могу добавить их в отдельный список misc или вручную распределить.
    }
};

const departmentsData = {
    'math': {
        name: 'Кафедра математики',
        building: '18block',
        classrooms: ['311', '313']
    }
};