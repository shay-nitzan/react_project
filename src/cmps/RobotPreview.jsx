export function RobotPreview({ robot }) {
    return <section className="robot-preview">
        <img src={`https://robohash.org/${robot.id}`} alt="" />
        <h3>{robot.model}</h3>
        <p>{robot.type}</p>
        <p>{robot.batteryStatus}</p>
    </section>
}