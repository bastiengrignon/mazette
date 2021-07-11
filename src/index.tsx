import React from "react"
import ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import { RouterUrl } from "./constants"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import "./index.css"
import Information from "./pages/Information"
import Programmation from "./pages/Programmation"
import Association from "./pages/Association"
import Home from "./pages/Home"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

const App: React.FC = () => (
    <div className="min-h-full flex flex-col justify-between">
        <Router>
            <Navbar/>
            <Switch>
                <Route path={ RouterUrl.programmation } component={ Programmation }/>
                <Route path={ RouterUrl.association } component={ Association }/>
                <Route path={ RouterUrl.information } component={ Information }/>
                <Route path={ RouterUrl.home } component={ Home }/>
            </Switch>
        </Router>
        <Footer/>
    </div>
)

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
)

serviceWorkerRegistration.register()
