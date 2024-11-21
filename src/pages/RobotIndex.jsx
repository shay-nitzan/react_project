import { useEffect, useState, useSyncExternalStore } from "react"
import { robotService } from "../services/robot.service"
import { RobotList } from '../cmps/RobotList'
import { RobotFilter } from "../cmps/RobotFilter"
import { RobotFilterType } from "../cmps/RobotFilterType"
import { Link, Outlet } from "react-router-dom";
import "./RobotIndex.css"; // Import the CSS file



export function RobotIndex() {
    const [ robots, setRobots ] = useState(null)
    const defaultFilter = robotService.getDefaultFilter()
    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        loadRobots()
    }, [filterBy])
    
        async function loadRobots(){
            try{
                const robots = await robotService.query(filterBy)
                console.log(robots)
                setRobots(robots)
            }
            catch (err){

                console.log(err)
                alert('Couldnt load robots')
            }
        }

        if (!robots) return <div>Loading robots...</div>;

        async function removeRobot(robotId) {
            try{
                // Call the remove service but don't expect it to return the updated list
                await robotService.remove(robotId);
        
                // Manually filter out the removed robot from the current state
                const updatedRobots = robots.filter(robot => robot.id !== robotId);
                setRobots(updatedRobots);
            }
            catch(err){
                // console.log(err)
                alert('Couldnt remove robot')
            }
        }

        function onSetFilterBy(filterBy) {
            console.log(filterBy)
            setFilterBy(filterBy)
        }

        function onSaveRobot(robot) {
            // Example save logic
            try {
                robotService.save(robot);
                alert('Robot saved successfully!');
                loadRobots(); // Refresh the robot list after save
            } catch (err) {
                console.error('Error saving robot:', err);
                alert('Couldn\'t save robot');
            }
        }
        
        return <section className="robot-index">
            <h1 className="title">Welcome to Robots!</h1>
            <div className="filter-container">
            <div className="filter-section">
                <RobotFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </div>
            <div className="filter-section">
                <RobotFilterType filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </div>
            </div>
            <Link className="add-robot-link" to="/robot/edit">Add Robot</Link>
            <RobotList robots={robots} onRemove={removeRobot} />
            <Outlet context={{ onSaveRobot }} />
        </section>
}