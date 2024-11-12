import { useEffect, useState } from "react"

export function RobotFilterType({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(()=>{
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])
    
    function handleChange({ target }) {
        console.log(target.value)
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

    return (
        <section className="robot-filter">
            <label htmlFor="type">Choose your type</label>
            <select onChange={handleChange} value={filterByToEdit.type} id="type" name="type" >
                <option value="all">All</option>
                <option value="Cooking">Cooking</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Pleasure">Pleasure</option>
                <option value="Office">Office</option>
            </select>
        </section>
    )
}   