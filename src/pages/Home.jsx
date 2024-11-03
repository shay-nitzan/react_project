import imgUrl from '../assets/imgs/react.svg'

export function Home() {
    return (
        <section className="home">
            <h1>Welcome to our Robots App</h1>
            <img src={imgUrl} alt="" />
        </section>
    )
}
