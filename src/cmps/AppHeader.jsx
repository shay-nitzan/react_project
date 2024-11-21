import { NavLink } from "react-router-dom"

export function AppHeader() {
    return <header className="app-header">
        <h1>Robots</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/robot">Robots</NavLink>

        </nav>
    </header>
}
