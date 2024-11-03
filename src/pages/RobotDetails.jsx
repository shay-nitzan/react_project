import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { robotService } from "../services/robot.service"
import { Link } from "react-router-dom"

export function RobotDetails() {

    const [ robot, setRobot ] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        loadRobot()
    }, [])

    async function loadRobot() {
        const robot = await robotService.getById(id)
        setRobot(robot) 
    }

    return <section className="robot-details">
        <h1>Details</h1>
        <pre>{JSON.stringify(robot, null, 2)}</pre>
        <Link to="/robot" >Back</Link>
    </section>
}