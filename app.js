// Данные для зданий - замените на реальные данные для ваших ID
const buildingData = {
    '2build': {
        title: 'Корпус 2',
        description: 'Учебный корпус №2. Здесь расположены факультеты естественных наук, лаборатории и исследовательские центры. В корпусе находятся аудитории для лекций и практических занятий.'
    },
    '3build': {
        title: 'Корпус 3',
        description: 'Учебный корпус №3. Многофункциональное здание с современными компьютерными классами, библиотекой и конференц-залами. Здесь проходят международные конференции и семинары.'
    },
    '4build': {
        title: 'Корпус 4',
        description: 'Учебный корпус №4. Многофункциональное здание с современными компьютерными классами, библиотекой и конференц-залами. Здесь проходят международные конференции и семинары.'
    },
    '18block': {
        title: 'Корпус 18',
        description: 'Учебный корпус №18. Административный центр кампуса. Здесь расположены ректорат, деканаты, отдел кадров и другие административные службы университета.'
    },
    '5block': {
        title: 'Спортивный комплекс',
        description: 'Современный спортивный центр с бассейном, тренажерными залами, спортивными площадками и фитнес-студиями. Доступен для студентов и сотрудников университета.'
    },
    '6block': {
        title: 'Научная библиотека',
        description: 'Главная библиотека университета с обширным фондом научной литературы, электронными ресурсами, читальными залами и зонами для групповой работы.'
    },
    '7block': {
        title: 'Студенческое кафе',
        description: 'Уютное кафе с разнообразным меню, доступными ценами и комфортной атмосферой. Идеальное место для отдыха между занятиями.'
    },
    // Добавьте данные для остальных зданий по тому же принципу
    '8ball': {
        title: 'Корпус 8',
        description: 'Учебный корпус №8. Административный центр кампуса. Здесь расположены ректорат, деканаты, отдел кадров и другие административные службы университета.'
    },
    // Добавьте данные для остальных зданий по тому же принципу
    '9block': {
        title: 'Корпус 9',
        description: 'Учебный корпус №9. Административный центр кампуса. Здесь расположены ректорат, деканаты, отдел кадров и другие административные службы университета.'
    },
    '10block': {
        title: 'Корпус 10',
        description: 'Учебный корпус №10. Административный центр кампуса. Здесь расположены ректорат, деканаты, отдел кадров и другие административные службы университета.'
    },
    '11block': {
        title: 'Корпус 11',
        description: 'Учебный корпус №11. Административный центр кампуса. Здесь расположены ректорат, деканаты, отдел кадров и другие административные службы университета.'
    },
    '14block': {
        title: 'Корпус 14',
        description: 'Учебный корпус №14. Административный центр кампуса. Здесь расположены ректорат, деканаты, отдел кадров и другие административные службы университета.'
    },
    '15block': {
        title: 'Корпус 15',
        description: 'Учебный корпус №15. Административный центр кампуса. Здесь расположены ректорат, деканаты, отдел кадров и другие административные службы университета.'
    },
    '3Ablock': {
        title: 'Корпус 3A',
        description: 'Учебный корпус 3A. Административный центр кампуса. Здесь расположены ректорат, деканаты, отдел кадров и другие административные службы университета.'
    },
    '17block': {
        title: 'Корпус 17',
        description: 'Учебный корпус №17. Административный центр кампуса. Здесь расположены ректорат, деканаты, отдел кадров и другие административные службы университета.'
    },
    '20block': {
        title: 'Корпус 20',
        description: 'Учебный корпус №17. Административный центр кампуса. Здесь расположены ректорат, деканаты, отдел кадров и другие административные службы университета.'
    },
    'flycafe': {
        title: 'Кафе Полёт',
        description: 'тут кушал никита Д.'
    },
    'botangarden': {
        title: 'Ботанический сад',
        description: 'дом никиты толст.-ва'
    },
    'footballground': {
        title: 'Спортивная площадка',
        description: 'футбольное поле знаменитого футболиста-вратаря с термосом никиты толст.-ва'
    },
};

class InteractiveMap {
    constructor() {
        this.modal = document.getElementById('modal');
        this.buildingTitle = document.getElementById('building-title');
        this.buildingDescription = document.getElementById('building-description');
        this.closeBtn = document.querySelector('.close');
        this.currentHighlighted = null;

        // Переменные для масштабирования
        this.scale = 1;
        this.minScale = 0.5;
        this.maxScale = 3;
        this.scaleStep = 0.2;

        this.init();
    }

    async init() {
        await this.loadSVG();
        this.addEventListeners();
        this.createZoomControls();
        this.makeBuildingsInteractive();

        // Для отладки - покажет все ID зданий в консоли
        this.debugBuildings();
    }

    async loadSVG() {
        try {
            const response = await fetch('assets/kampussouth.svg');
            const svgText = await response.text();
            document.getElementById('map').innerHTML = svgText;
        } catch (error) {
            console.error('Ошибка загрузки SVG:', error);
        }
    }

    makeBuildingsInteractive() {
        // Находим все элементы, которые есть в buildingData
        Object.keys(buildingData).forEach(buildingId => {
            const element = document.getElementById(buildingId);
            if (element) {
                element.classList.add('building');

                // Убедимся, что у элемента есть заливка для hover эффектов
                if (!element.getAttribute('fill') && !element.querySelector('[fill]')) {
                    element.setAttribute('fill', '#d4d4d4');
                }

                // Добавляем title для тултипа при наведении
                if (!element.querySelector('title')) {
                    const title = document.createElement('title');
                    title.textContent = buildingData[buildingId].title;
                    element.appendChild(title);
                }
            } else {
                console.warn(`Элемент с ID "${buildingId}" не найден в SVG`);
            }
        });
    }

    createZoomControls() {
        const zoomControls = document.createElement('div');
        zoomControls.className = 'zoom-controls';
        zoomControls.innerHTML = `
            <button id="zoom-in" title="Увеличить">+</button>
            <button id="zoom-out" title="Уменьшить">-</button>
            <button id="zoom-reset" title="Сбросить масштаб">100%</button>
        `;

        document.querySelector('.map-container').appendChild(zoomControls);

        // Обработчики для кнопок масштабирования
        document.getElementById('zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => this.zoomOut());
        document.getElementById('zoom-reset').addEventListener('click', () => this.zoomReset());

        // Добавляем зум колесиком мыши
        document.getElementById('map').addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                this.zoomIn();
            } else {
                this.zoomOut();
            }
        });
    }

    zoomIn() {
        if (this.scale < this.maxScale) {
            this.scale += this.scaleStep;
            this.applyScale();
        }
    }

    zoomOut() {
        if (this.scale > this.minScale) {
            this.scale -= this.scaleStep;
            this.applyScale();
        }
    }

    zoomReset() {
        this.scale = 1;
        this.applyScale();
    }

    applyScale() {
        const svgElement = document.querySelector('#map svg');
        if (svgElement) {
            svgElement.style.transform = `scale(${this.scale})`;
            svgElement.style.transformOrigin = 'center center';
        }

        // Обновляем текст кнопки сброса
        const resetBtn = document.getElementById('zoom-reset');
        if (resetBtn) {
            resetBtn.textContent = `${Math.round(this.scale * 100)}%`;
        }
    }

    addEventListeners() {
        // Обработчики для зданий
        document.addEventListener('click', (e) => {
            const building = e.target.closest('.building');
            if (building) {
                this.handleBuildingClick(building);
            }
        });

        // Закрытие модального окна
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    handleBuildingClick(building) {
        const buildingId = building.id;
        console.log('Кликнуто на здание с ID:', buildingId);

        // Убираем подсветку с предыдущего здания
        if (this.currentHighlighted && this.currentHighlighted !== building) {
            this.currentHighlighted.classList.remove('highlighted');
        }

        // Подсвечиваем текущее здание
        building.classList.add('highlighted');
        this.currentHighlighted = building;

        // Показываем информацию о здании
        this.showBuildingInfo(buildingId);
    }

    showBuildingInfo(buildingId) {
        const data = buildingData[buildingId];

        if (data) {
            this.buildingTitle.textContent = data.title;
            this.buildingDescription.textContent = data.description;
        } else {
            this.buildingTitle.textContent = 'Информация о здании';
            this.buildingDescription.textContent = 'Информация о данном здании будет добавлена в ближайшее время.';
        }
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';

        if (this.currentHighlighted) {
            this.currentHighlighted.classList.remove('highlighted');
            this.currentHighlighted = null;
        }
    }

    // Функция для отладки - покажет все ID зданий в консоли
    debugBuildings() {
        const buildings = document.querySelectorAll('.building');
        console.log('Найдено интерактивных зданий:', buildings.length);
        buildings.forEach(building => {
            console.log('ID здания:', building.id);
        });
    }
}

// Инициализация карты когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveMap();
});