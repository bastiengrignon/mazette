import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import loadable from "@loadable/component"
import { RouterUrl } from "./constants"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import "./index.css"

const Footer = loadable(() => import("./components/Footer"))
const Navbar = loadable(() => import("./components/Navbar"))
const Information = loadable(() => import("./pages/Information"))
const Programmation = loadable(() => import("./pages/Programmation"))
const Association = loadable(() => import("./pages/Association"))
const LegalMention = loadable(() => import("./pages/LegalMention"))
const SanitaryPass = loadable(() => import("./pages/SanitaryPass"))
import Home from "./pages/Home"

const App: React.FC = () => (
    <div className="min-h-full flex flex-col justify-between">
        <Router>
            <Navbar/>
            <Switch>
                <Route path={ RouterUrl.programmation } component={ Programmation }/>
                <Route path={ RouterUrl.association } component={ Association }/>
                <Route path={ RouterUrl.information } component={ Information }/>
                <Route path={ RouterUrl.mention } component={ LegalMention }/>
                <Route path={ RouterUrl.passSanitaire } component={ SanitaryPass }/>
                <Route path={ RouterUrl.home } component={ Home }/>
            </Switch>
            <Footer/>
        </Router>
    </div>
)

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
)

serviceWorkerRegistration.register()
