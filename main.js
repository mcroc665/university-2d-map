// База данных зданий
const buildingsData = {
    "building_1": {
        name: "Главный корпус",
        description: "Центральное здание университета. Здесь находятся администрация, ректорат и главные аудитории.",
        floors: 5,
        floorDescriptions: {
            1: "Первый этаж: Входная группа, гардероб, столовая",
            2: "Второй этаж: Лекционные аудитории 201-215",
            3: "Третий этаж: Кафедры математики и физики", 
            4: "Четвертый этаж: Научные лаборатории",
            5: "Пятый этаж: Административные помещения"
        }
    },
    "building_2": {
        name: "Учебный корпус №2", 
        description: "Корпус для практических занятий и семинаров.",
        floors: 4,
        floorDescriptions: {
            1: "Первый этаж: Химические лаборатории",
            2: "Второй этаж: Компьютерные классы",
            3: "Третий этаж: Биологические лаборатории",
            4: "Четвертый этаж: Преподавательские комнаты"
        }
    },
    "building_3": {
        name: "Малая архитектурная форма",
        description: "Вспомогательное строение на территории кампуса.",
        floors: 1,
        floorDescriptions: {
            1: "Единственный этаж: Техническое помещение"
        }
    },
    "building_4": {
        name: "Корпус точных наук",
        description: "Здание для занятий по математике, физике и инженерии.",
        floors: 3,
        floorDescriptions: {
            1: "Первый этаж: Физические лаборатории",
            2: "Второй этаж: Математические аудитории", 
            3: "Третий этаж: Инженерные мастерские"
        }
    },
    "building_5": {
        name: "Библиотечный корпус",
        description: "Научная библиотека с читальными залами.",
        floors: 2,
        floorDescriptions: {
            1: "Первый этаж: Абонемент, научная литература",
            2: "Второй этаж: Читальные залы, периодика"
        }
    },
    "building_6": {
        name: "Библиотечный корпус",
        description: "Научная библиотека с читальными залами.",
        floors: 2,
        floorDescriptions: {
            1: "Первый этаж: Абонемент, научная литература",
            2: "Второй этаж: Читальные залы, периодика"
        }
    },
    "building_7": {
        name: "Библиотечный корпус",
        description: "Научная библиотека с читальными залами.",
        floors: 2,
        floorDescriptions: {
            1: "Первый этаж: Абонемент, научная литература",
            2: "Второй этаж: Читальные залы, периодика"
        }
    },
    "building_8": {
        name: "Библиотечный корпус",
        description: "Научная библиотека с читальными залами.",
        floors: 2,
        floorDescriptions: {
            1: "Первый этаж: Абонемент, научная литература",
            2: "Второй этаж: Читальные залы, периодика"
        }
    }
    // Добавь данные для остальных зданий по аналогии
};

// Переменные для управления состоянием
let currentScale = 1;
const minScale = 0.3;
const maxScale = 3;
const scaleStep = 0.2;
let currentBuildingId = null;
let currentFloor = null;

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

// Функции модальных окон
function showFloorModal(buildingId) {
    const building = buildingsData[buildingId];
    if (!building) {
        alert('Информация о здании не найдена');
        return;
    }
    
    currentBuildingId = buildingId;
    const modal = document.getElementById('floorModal');
    const title = document.getElementById('modalBuildingName');
    const floorsContainer = document.getElementById('floorsContainer');
    
    title.textContent = `Выберите этаж: ${building.name}`;
    floorsContainer.innerHTML = '';
    
    // Создаем кнопки этажей
    for (let floor = 1; floor <= building.floors; floor++) {
        const floorBtn = document.createElement('button');
        floorBtn.className = 'floor-btn';
        floorBtn.textContent = `${floor} этаж`;
        floorBtn.onclick = () => selectFloor(floor);
        floorsContainer.appendChild(floorBtn);
    }
    
    modal.style.display = 'block';
}

function closeFloorModal() {
    document.getElementById('floorModal').style.display = 'none';
    currentBuildingId = null;
}

function selectFloor(floor) {
    currentFloor = floor;
    closeFloorModal();
    showDescriptionModal();
}

function showDescriptionModal() {
    const building = buildingsData[currentBuildingId];
    if (!building) return;
    
    const modal = document.getElementById('descriptionModal');
    const title = document.getElementById('descriptionTitle');
    const description = document.getElementById('descriptionText');
    const floorPlan = document.getElementById('floorPlan');
    
    title.textContent = `${building.name} - ${currentFloor} этаж`;
    description.textContent = building.floorDescriptions[currentFloor] || 'Описание этажа готовится...';
    
    // Заглушка для плана этажа
    floorPlan.innerHTML = `
        <h4>План ${currentFloor} этажа</h4>
        <p>🛠 План этажа находится в разработке</p>
        <div style="background: #e0e0e0; padding: 20px; border-radius: 5px; margin: 10px 0;">
            Здесь будет схематичное изображение планировки этажа
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeDescriptionModal() {
    document.getElementById('descriptionModal').style.display = 'none';
    currentBuildingId = null;
    currentFloor = null;
}

function backToFloors() {
    closeDescriptionModal();
    showFloorModal(currentBuildingId);
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для зданий
    const buildings = document.querySelectorAll('.building');
    
    buildings.forEach(building => {
        building.addEventListener('click', function() {
            const buildingId = this.id;
            if (buildingsData[buildingId]) {
                showFloorModal(buildingId);
            } else {
                alert('Информация об этом здании пока не добавлена');
            }
        });
    });

    // Масштабирование колесиком мыши
    const mapContainer = document.querySelector('.map-container');
    mapContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        if (e.ctrlKey) {
            if (e.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        }
    });

    // Закрытие модальных окон по клику вне области
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                currentBuildingId = null;
                currentFloor = null;
            }
        });
    });
});

// Глобальные функции для HTML кнопок
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.resetZoom = resetZoom;
window.closeFloorModal = closeFloorModal;
window.closeDescriptionModal = closeDescriptionModal;
window.backToFloors = backToFloors;