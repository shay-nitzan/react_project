import { NavLink } from "react-router-dom"

export function AppHeader() {
    return <header className="app-header">
        <h1>Robots</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/robot">Robots</NavLink>

        </nav>
    </header>
}
