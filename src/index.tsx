import axios from "axios"
import { ConfigProvider } from "antd"
import frFR from "antd/lib/locale/fr_FR"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Cloudinary } from "@cloudinary/base"

import { adminSubdomain } from "./constants"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import "antd/dist/antd.css"
import "./index.css"
import Routes from "./components/Routes"
import CookieNotice from "./components/CookieNotice"

const App: React.FC = () => (
    <div className="min-h-full flex flex-col justify-between">
        <Router>
            <CookieNotice/>
            <Routes isAdmin={ isAdminRoutes() }/>
        </Router>
    </div>
)
export const cloudinary = new Cloudinary({ cloud: { cloudName: "mazette" } })

const isAdminRoutes = (): boolean => window.location.host.split(".")[0] === adminSubdomain;

(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL
})()

ReactDOM.hydrate(
    <React.StrictMode>
        <ConfigProvider locale={frFR}>
            <App/>
        </ConfigProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

serviceWorkerRegistration.register()
