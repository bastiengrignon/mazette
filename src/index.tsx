import React from "react"
import ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import Programmation from "./pages/Programmation"
import Association from "./pages/Association"
import Information from "./pages/Information"
import Home from "./pages/Home"

const App: React.FC = () => (
    <Router>
        <Switch>
            <Route path={"/programmation"} component={Programmation}/>
            <Route path={"/association"} component={Association}/>
            <Route path={"/information"} component={Information}/>
            <Route path={"/"} component={Home}/>
        </Switch>
    </Router>
)

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
)