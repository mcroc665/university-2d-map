// Переменные для управления масштабом
let currentScale = 1;
const minScale = 0.5;
const maxScale = 3;
const scaleStep = 0.2;

// Информация о зданиях (можно вынести в отдельный файл)
const buildingInfo = {
    "main_building": {
        name: "Главный корпус",
        description: "Основное здание университета. Здесь находятся ректорат, деканат и главные лекционные аудитории. Построен в 1975 году.",
        image: "images/main_building.jpg",
        link: "/buildings/main"
    },
    "library": {
        name: "Научная библиотека",
        description: "Крупнейшая университетская библиотека с фондом более 1 млн книг. Работает с 9:00 до 21:00. Имеет электронный каталог.",
        image: "images/library.jpg", 
        link: "/buildings/library"
    },
    "dormitory_1": {
        name: "Общежитие №1",
        description: "Студенческое общежитие на 500 мест. Для студентов 1-2 курсов. Имеется спортивная площадка и столовая.",
        image: "images/dormitory1.jpg",
        link: "/buildings/dormitory1"
    }
    // Добавьте информацию по остальным зданиям
};

// Функции масштабирования
function zoomIn() {
    if (currentScale < maxScale) {
        currentScale += scaleStep;
        updateScale();
    }
}

function zoomOut() {
    if (currentScale > minScale) {
        currentScale -= scaleStep;
        updateScale();
    }
}

function resetZoom() {
    currentScale = 1;
    updateScale();
}

function updateScale() {
    const map = document.getElementById('university-map');
    map.style.transform = `scale(${currentScale})`;
}

// Функции для работы с попапом
function showPopup(buildingId) {
    const building = buildingInfo[buildingId];
    if (!building) return;

    document.getElementById('popupTitle').textContent = building.name;
    document.getElementById('popupDescription').textContent = building.description;
    
    document.getElementById('buildingPopup').style.display = 'block';
    document.getElementById('popupOverlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('buildingPopup').style.display = 'none';
    document.getElementById('popupOverlay').style.display = 'none';
}

// Обработчики событий для зданий
document.addEventListener('DOMContentLoaded', function() {
    // Находим все здания и добавляем обработчики
    const buildings = document.querySelectorAll('.building');
    
    buildings.forEach(building => {
        building.addEventListener('click', function() {
            const buildingId = this.id;
            showPopup(buildingId);
        });
    });

    // Закрытие попапа по клику на оверлей
    document.getElementById('popupOverlay').addEventListener('click', closePopup);

    // Масштабирование колесиком мыши
    const mapContainer = document.querySelector('.map-container');
    mapContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    });
});

// Дополнительно: можно добавить панорамирование при зажатой левой кнопке мыши
let isPanning = false;
let startX, startY, initialX = 0, initialY = 0;

document.addEventListener('DOMContentLoaded', function() {
    const map = document.getElementById('university-map');
    
    map.addEventListener('mousedown', function(e) {
        if (e.button === 0) { // Левая кнопка мыши
            isPanning = true;
            startX = e.clientX - initialX;
            startY = e.clientY - initialY;
            map.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isPanning) {
            e.preventDefault();
            initialX = e.clientX - startX;
            initialY = e.clientY - startY;
            
            map.style.transform = `scale(${currentScale}) translate(${initialX}px, ${initialY}px)`;
        }
    });

    document.addEventListener('mouseup', function(e) {
        if (e.button === 0) {
            isPanning = false;
            map.style.cursor = 'grab';
        }
    });
});