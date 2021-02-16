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
import {RouterUrl} from "./constants"
import Footer from "./components/Footer"

const App: React.FC = () => (
    <body className="flex flex-col h-full">
        <Router>
            <div style={{flex: "1 0 auto"}}>
                <Switch>
                    <Route path={RouterUrl.programmation} component={Programmation}/>
                    <Route path={RouterUrl.association} component={Association}/>
                    <Route path={RouterUrl.information} component={Information}/>
                    <Route path={RouterUrl.home} component={Home}/>
                </Switch>
            </div>
            <Footer/>
        </Router>
    </body>
)

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
)