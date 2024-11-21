import { storageService } from './async-storage.service.js'
import { loadFromStorage, saveToStorage } from './util.service.js'

export const robotService = {
    query,
    getById,
    remove,
    save,
    createRobot,
    getDefaultFilter,
    getFilterFromSearchParams
}

const STORAGE_KEY = 'robots'

_createRobots()

async function query(filterBy) {
    let robots = await storageService.query(STORAGE_KEY)

    if (filterBy) {
        const { minBatteryStatus = 0, model = '' , type = 'all'} = filterBy
        robots = robots.filter(robot =>
            robot.model.toLowerCase().includes(model.toLowerCase()) &&
            robot.batteryStatus > minBatteryStatus &&
            (robot.type === type || type ==='all')
        )
    }
    return robots
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(robotToSave) {
    if (robotToSave.id) {
        return storageService.put(STORAGE_KEY, robotToSave)
    } else {
        robotToSave.isOn = false
        return storageService.post(STORAGE_KEY, robotToSave)
    }
}

function createRobot(model = '', type = '', batteryStatus = 100) {
    return {
        model,
        type,
        batteryStatus,
    }
}

function getDefaultFilter() {
    return {
        type: 'all',
        type: 'all',
        minBatteryStatus: 0,
        maxBattery: '',
        model: ''
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || (field === 'type' ? 'all' : defaultFilter[field])
    }

    return filterBy
}

function _createRobots() {
    let robots = loadFromStorage(STORAGE_KEY)
    if (robots && robots.length > 0) return

    robots = [
        { id: 'r1', model: 'Turbo Plonter', batteryStatus: 100, type: 'Security' },
        { id: 'r2', model: 'Salad-O-Matic', batteryStatus: 80, type: 'Cooking' },
        { id: 'r3', model: 'Dusty', batteryStatus: 100, type: 'Cleaning' },
        { id: 'r4', model: 'DevTron', batteryStatus: 40, type: 'Office' }
    ]
    saveToStorage(STORAGE_KEY, robots)
}

window.rs = robotService            // Easy access from console