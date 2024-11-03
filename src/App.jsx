import { Route, HashRouter as Router, Routes } from "react-router-dom"

import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { RobotIndex } from "./pages/RobotIndex"
import { RobotDetails } from "./pages/RobotDetails"

import { AppFooter } from "./cmps/AppFooter"
import { AppHeader } from "./cmps/AppHeader"
import { RobotEdit } from "./pages/RobotEdit"


export function App() {
  return <Router>
        <AppHeader />
      <main>
        <Routes>
            <Route path="/" element = {<Home/>}></Route> {/*the path in adress bar*/}
            <Route path="/about" element = {<About/>}></Route>

            <Route path="/robot" element = {<RobotIndex/>} > {/*main robot route*/}
              <Route path="/robot/edit/:robotId?" element = {<RobotEdit/>}/>  {/*nested route*/}
            </Route>

            <Route path="/robot/:id" element = {<RobotDetails/>}></Route>
        </Routes>
      </main>
    <AppFooter />
  </Router>

}
