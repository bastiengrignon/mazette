import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import loadable from "@loadable/component"
import { adminSubdomain, RouterUrl } from "./constants"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import "antd/dist/antd.css"
import "./index.css"

import Home from "./pages/Home"
const Footer = loadable(() => import("./components/Footer"))
const Navbar = loadable(() => import("./components/Navbar"))
const Information = loadable(() => import("./pages/Information"))
const Programmation = loadable(() => import("./pages/Programmation"))
const Association = loadable(() => import("./pages/Association"))
const LegalMention = loadable(() => import("./pages/LegalMention"))
const SanitaryPass = loadable(() => import("./pages/SanitaryPass"))
const Dashboard = loadable(() => import("./pages/admin/Dashboard"))
const DashboardMovie = loadable(() => import("./pages/admin/DashboardMovie"))
const DashboardMusic = loadable(() => import("./pages/admin/DashboardMusic"))

const subDomain = window.location.host.split(".")[0]


const App: React.FC = () => {

    return (
        <div className="min-h-full flex flex-col justify-between">
            <Router>
                { isAdminRoutes() ? null : <Navbar/> }
                {
                    isAdminRoutes()
                        ?
                        <Switch>
                            <Route path={ RouterUrl.adminMovie } component={ DashboardMovie }/>
                            <Route path={ RouterUrl.adminMusic } component={ DashboardMusic }/>

                            <Route path={ RouterUrl.home } component={ Dashboard }/>
                        </Switch>
                        :
                        <Switch>

                            <Route path={ RouterUrl.programmation } component={ Programmation }/>
                            <Route path={ RouterUrl.association } component={ Association }/>
                            <Route path={ RouterUrl.information } component={ Information }/>
                            <Route path={ RouterUrl.mention } component={ LegalMention }/>
                            <Route path={ RouterUrl.passSanitaire } component={ SanitaryPass }/>

                            <Route path={ RouterUrl.home } component={ Home }/>
                        </Switch>
                }
                { isAdminRoutes() ? null : <Footer/> }
            </Router>
        </div>
    )
}

const isAdminRoutes = (): boolean => subDomain === adminSubdomain;

(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL
})()

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
)

serviceWorkerRegistration.register()
