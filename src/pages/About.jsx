export function About() {
    const cmpType = 'welcome'

    function handleClick(msg) {
        console.log('Clicked ' + msg)
    }

    const classesObj = {
        className: 'about'
    }

    return (
        <div {...classesObj}>

            <h1>We are all about robots</h1>

            <section style={{cursor: 'pointer' }}>
                <DynamicCmp cmpType="goodBye" handleClick={handleClick} name="Shay" />
            </section>
        </div>
    )
}


function DynamicCmp({ ...props }) {

    const dynamicCmps = {
        hello: <Hello {...props} />, //trasfer everything from the object to component
        welcome: <WelcomeBack {...props} />,
        goodBye: <GoodBye {...props} />,
    }

    return dynamicCmps[props.cmpType]

}


function Hello({ name, handleClick }) {
    return (
        <section onClick={() => handleClick('Hello')}>
            <u>Hello {name}</u>
        </section>
    )
}

function GoodBye({ name, handleClick }) {
    return (
        <section onClick={() => handleClick('Good Bye')}>
            <u>Good Bye {name}</u>
        </section>
    )
}

function WelcomeBack({ name, handleClick }) {
    return (
        <section onClick={() => handleClick('Welcome')}>
            <u>Welcome {name}</u>
        </section>
    )
}
