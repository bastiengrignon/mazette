import React from "react"
import { Route, Switch } from "react-router-dom"
import loadable from "@loadable/component"

import { useGATracker } from "../../constants/hooks"
import { RouterUrl } from "../../constants"
import Home from "../../pages/Home"

const Information = loadable(() => import("../../pages/Information"))
const Programmation = loadable(() => import("../../pages/Programmation"))
const Association = loadable(() => import("../../pages/Association"))
const LegalMention = loadable(() => import("../../pages/LegalMention"))
const SanitaryPass = loadable(() => import("../../pages/SanitaryPass"))
const Dashboard = loadable(() => import("../Admin/Dashboard"))
const DashboardMovie = loadable(() => import("../Admin/DashboardMovie"))
const DashboardMusic = loadable(() => import("../Admin/DashboardMusic"))
const DashboardPartner = loadable(() => import("../Admin/DashboardPartner"))
const DashboardTrombinoscope = loadable(() => import("../Admin/DashboardTrombinoscope"))
const Footer = loadable(() => import("../../components/Footer"))
const Navbar = loadable(() => import("../../components/Navbar"))

interface RoutesProps {
    isAdmin: boolean
}

const Routes: React.FC<RoutesProps> = ({ isAdmin }) => {
    useGATracker()

    return (
        isAdmin
            ?
            <Switch>
                <Route path={ RouterUrl.adminMovie } component={ DashboardMovie }/>
                <Route path={ RouterUrl.adminMusic } component={ DashboardMusic }/>
                <Route path={ RouterUrl.adminPartner } component={ DashboardPartner }/>
                <Route path={ RouterUrl.adminTrombinoscope } component={ DashboardTrombinoscope }/>

                <Route path={ RouterUrl.home } component={ Dashboard }/>
            </Switch>
            :
            <>
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
            </>
    )
}
export default Routes