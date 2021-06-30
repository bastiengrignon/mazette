import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
const Programmation = lazy(() => import("./pages/Programmation"))
const Association = lazy(() => import("./pages/Association"))
const Information = lazy(() => import("./pages/Information"))
const Home = lazy(() => import("./pages/Home"))
import { RouterUrl } from "./constants"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import "./index.css"
import Loading from "./components/Loading"

const App: React.FC = () => (
    <div className="min-h-full flex flex-col justify-between">
        <Router>
            <Navbar/>
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route path={RouterUrl.programmation} component={Programmation}/>
                    <Route path={RouterUrl.association} component={Association}/>
                    <Route path={RouterUrl.information} component={Information}/>
                    <Route path={RouterUrl.home} component={Home}/>
                </Switch>
            </Suspense>
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