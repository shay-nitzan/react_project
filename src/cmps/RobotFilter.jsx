import { useEffect, useState } from "react"
import { robotService } from "../services/robot.service"

export function RobotFilter({filterBy, onSetFilterBy}) {
    const defaultFilter = robotService.getDefaultFilter()
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        // switch (type) {
        //     case 'number':
        //     case 'range':
        //         value = +value
        //         break;
        //     case 'checkbox':
        //         value = target.checked
        //         break
        //     default:
        //         break;
        // }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { model, minBatteryStatus } = filterByToEdit
    return (
        <form className="robot-filter">
            <section>
                <label htmlFor="model">Model</label>
                <input onChange={handleChange} 
                name="model" 
                id="model" 
                type="text"
                value={model} />
            </section>
            <section>
                <label htmlFor="minBatteryStatus">MinBatteryStatus</label>
                <input onChange={handleChange} 
                name="minBatteryStatus" 
                id="minBatteryStatus" 
                type="number" 
                value={minBatteryStatus || ''} />
            </section>
        </form>
    )
}   