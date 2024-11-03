import { Link } from "react-router-dom";
import { RobotPreview } from "./RobotPreview";

export function RobotList({robots, onRemove}){
    return <section className="robot-list">
        <ul>
            {robots.map(robot => 
            <li key={robot.id}>
                <RobotPreview robot = {robot}/>
                <section>
                    <button onClick={() => onRemove(robot.id)}>X</button>
                    <Link to={`/robot/edit/${robot.id}`} >Edit</Link> 
                </section>
            </li>)}
        </ul>
    </section>
}