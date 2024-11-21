import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { robotService } from "../services/robot.service";
import { useParams } from "react-router-dom";


export function RobotEdit() {

    const [robot, setRobot] = useState(robotService.createRobot())
    const { onSaveRobot } = useOutletContext() // special callback hook

    const { robotId } = useParams();
    useEffect(() => {
        if (robotId) {
            robotService.getById(robotId).then(setRobot).catch(err => {
                console.error('Failed to load robot:', err);
            });
        }
    }, [robotId]);

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break;
        }
        setRobot((prevRobot) => ({ ...prevRobot, [field]: value }))
    }

    function onSubmitRobot(ev) {
        ev.preventDefault() // prevent refresh of the page
        onSaveRobot(robot)
    }

    const { model, type, batteryStatus } = robot
    return (
        <section className="robot-edit">
            <Link to="/robot"><button className="close-btn">X</button></Link>
            <h1>{robot.id ? 'Edit' : 'Add'} Robot</h1>
            <form onSubmit={onSubmitRobot}>
                <label htmlFor="model">Model</label>
                <input onChange={handleChange} value={model} type="text" id="model" name="model" />

                <label htmlFor="type">Type</label>
                <select onChange={handleChange} value={type} id="type" name="type"  >
                    <option disabled value="">Choose a type</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Pleasure">Pleasure</option>
                    <option value="Office">Office</option>
                </select>

                <label> Battery status {batteryStatus}
                    <input onChange={handleChange} value={batteryStatus} type="range" id="batteryStatus" name="batteryStatus" />
                </label>
                <section className="btns">
                    <button className="btn">Save</button>
                </section>
            </form>
        </section>
    )
}
