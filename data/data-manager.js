const DataManager = {
    // Существующие методы
    getBuildingInfo(buildingId) {
        return buildingsInfo[buildingId] || null;
    },

    getClassrooms(buildingId, floor) {
        switch (buildingId) {
            case '3Ablock': return classrooms3Ablock[floor] || [];
            case '18block': return classrooms18block[floor] || [];
            default: return [];
        }
    },

    getAllBuildings() {
        return Object.keys(buildingsInfo);
    },

    findClassroom(buildingId, roomNumber) {
        const buildingFloors = this.getClassrooms(buildingId);
        for (let floor in buildingFloors) {
            const classroom = buildingFloors[floor].find(room => room.number === roomNumber);
            if (classroom) return { ...classroom, floor: parseInt(floor) };
        }
        return null;
    },

    // Новые методы для работы с планами
    getPlanConfig(buildingId, floorNumber) {
        const planKey = `${buildingId}_${floorNumber}`;
        return plansConfig[planKey] || null;
    },

    getAvailableFloorsWithPlans(buildingId) {
        const buildingInfo = this.getBuildingInfo(buildingId);
        if (!buildingInfo) return [];
        
        return buildingInfo.floors.filter(floor => {
            const planKey = `${buildingId}_${floor.number}`;
            return plansConfig[planKey];
        });
    },

    getRoomElementId(buildingId, floorNumber, roomNumber) {
        const config = this.getPlanConfig(buildingId, floorNumber);
        if (!config || !config.roomMapping) return null;
        
        // Ищем элемент по номеру аудитории
        for (const [elementId, roomNum] of Object.entries(config.roomMapping)) {
            if (roomNum === roomNumber) return elementId;
        }
        return null;
    },

    getRoomNumberByElementId(buildingId, floorNumber, elementId) {
        const config = this.getPlanConfig(buildingId, floorNumber);
        return config?.roomMapping?.[elementId] || null;
    }
};