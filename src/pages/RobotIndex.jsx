import { useEffect, useRef, useState } from "react"
import { useSearchParams, Link, Outlet, useNavigate } from "react-router-dom";

import { robotService } from "../services/robot.service"
import { RobotList } from '../cmps/RobotList'
import { RobotFilter } from "../cmps/RobotFilter"
import { RobotFilterType } from "../cmps/RobotFilterType"
import { debounce } from "../services/util.service";

export function RobotIndex() {
    const [ robots, setRobots ] = useState(null)
    const [ searchParams, setSearchParams ] = useSearchParams()
    const defaultFilter = robotService.getFilterFromSearchParams(searchParams) || {}
    const navigate = useNavigate()
    const [filterBy, setFilterBy] = useState(defaultFilter)

    //The value is save over the renders
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 400)).current

    useEffect(() => {
        loadRobots()
        setSearchParams(filterBy)
        // console.log(filterBy)
    }, [filterBy])
    
        async function loadRobots(){
            try{
                const robots = await robotService.query(filterBy)
                setRobots(robots)
            }
            catch (err){
                console.log(err)
                alert('Couldnt load robots')
            }
        }

        if (!robots) return <div>Loading robots...</div>;
        const {model, minBatteryStatus, type} = filterBy

        async function removeRobot(robotId) {
            try{
                // Call the remove service but don't expect it to return the updated list
                await robotService.remove(robotId);
                // local remove
                const updatedRobots = robots.filter(robot => robot.id !== robotId);
                setRobots(updatedRobots);
            }
            catch(err){
                // console.log(err)
                alert('Couldnt remove robot')
            }
        }

        function onSetFilterBy(filterBy) {
            setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        }

        async function onSaveRobot(robot) {
            try {
                const robotToSave = await robotService.save(robot);
                if (!robot.id){
                    setRobots(robots => [...robots, robotToSave])
                }
                else{
                    setRobots(robots => robots.map(_robot => _robot.id === robotToSave.id ? robotToSave : _robot))
                }
                alert('Robot saved successfully!');
                navigate('/robot')
                // loadRobots(); // Refresh the robot list after save
            } catch (err) {
                console.error('Error saving robot:', err);
                alert('Couldn\'t save robot');
            }
        }
        
        return <section className="robot-index"> 
            <h1>Welcome to Robots!</h1>
            <RobotFilter filterBy={{ model, minBatteryStatus }} onSetFilterBy={onSetFilterByDebounce} />
            <RobotFilterType filterBy={{ type }} onSetFilterBy={onSetFilterByDebounce} />
            <Link to='/robot/edit'>Add Robot</Link>
            <RobotList robots={robots} onRemove = {removeRobot}/>
            <Outlet context={{ onSaveRobot }} /> /
        </section>
}


// function onSaveRobot(robot) {
//     try {
//         robotService.save(robot);
//         alert('Robot saved successfully!');
//         loadRobots(); // Refresh the robot list after save
//     } catch (err) {
//         console.error('Error saving robot:', err);
//         alert('Couldn\'t save robot');
//     }
// }