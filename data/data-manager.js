const DataManager = {
    getBuildingInfo(buildingId) {
        return buildingsInfo[buildingId] || null;
    },

    getClassrooms(buildingId, floor) {
        switch (buildingId) {
            case '3Ablock': return classrooms3Ablock[floor] || [];  // ДОБАВЬТЕ ЭТУ СТРОЧКУ
            default: return [];
        }
    },

    getAllBuildings() {
        return Object.keys(buildingsInfo);
    },

    findClassroom(buildingId, roomNumber) {
        const building = this.getClassrooms(buildingId);
        for (let floor in building) {
            const classroom = building[floor].find(room => room.number === roomNumber);
            if (classroom) return classroom;
        }
        return null;
    }
};