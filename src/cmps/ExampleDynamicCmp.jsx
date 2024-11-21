

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
