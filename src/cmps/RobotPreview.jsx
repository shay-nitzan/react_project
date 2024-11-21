export function RobotPreview({ robot }) {
    return <section className="robot-preview">
        <img src={`https://robohash.org/${robot.id}`} alt="" />
        <h3>{robot.model}</h3>
        <p>{robot.type}</p>
        <p>{robot.batteryStatus}</p>
    </section>
}

function useClock(){
    const [ticks, setTicks] = useState(0)

    useEffect(function(){
        const timer = setInterval(setTicks(val => val + 1), 1000)
        return function cancel(){
            clearInterval(timer)
        }
    }, [])

    return ticks;
}


function NewSticker(props){
    const {items }= props;

    itemIndex = useClock() % items.length

    return(
        <p>{items[itemIndex]}</p>
    )
}

function Clock(props){
    const [ticks, setTicks] = useState(0)

    function tick(){
        setItemIndex(val => val + 1 )
    }

    useClock(tick)

    return(
        <div>Ticks... {ticks} </div>
    )
}