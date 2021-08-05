import React from "react"
import {
    DashboardOutlined,
    FireFilled,
    PlayCircleOutlined,
    VideoCameraOutlined,
    TeamOutlined
} from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"
import { programmationTitle, RouterUrl } from "../../../constants"

const activatedClassCSS = "flex items-center mt-4 py-2 px-6 bg-gray-700 bg-opacity-25 text-gray-100"
const deactivatedClassCSS = "flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"

const Navigation: React.FC = ({ children }) => {
    const location = useLocation()

    const adminTitleFromPathname = (): string => {
        if (location.pathname === RouterUrl.home) return "Dashboard"
        else if (location.pathname === RouterUrl.adminMovie) return programmationTitle.films
        else if (location.pathname === RouterUrl.adminMusic) return programmationTitle.musique
        else if (location.pathname === RouterUrl.adminPartner) return "Partenaires"
        else return "Dashboard"
    }

    return (
        <div className="grid grid-cols-6 h-screen">
            <div className="col-span-2 md:col-span-1 bg-gray-900">
                <div className="flex items-center justify-center mt-8">
                    <Link to={ RouterUrl.home } className="inline-flex justify-center items-center text-2xl">
                        <FireFilled className="text-green"/>
                        <span className="text-white mx-2 font-semibold">Dashboard</span>
                    </Link>
                </div>
                <nav className="mt-10">
                    <Link to={ RouterUrl.home } className={ location.pathname === RouterUrl.home ? activatedClassCSS : deactivatedClassCSS }>
                        <DashboardOutlined />
                        <span className="mx-3 capitalize">Dashboard</span>
                    </Link>
                    <Link to={ RouterUrl.adminMovie } className={ location.pathname === RouterUrl.adminMovie ? activatedClassCSS : deactivatedClassCSS }>
                        <VideoCameraOutlined />
                        <span className="mx-3 capitalize">{ programmationTitle.films }</span>
                    </Link>
                    <Link to={ RouterUrl.adminMusic } className={ location.pathname === RouterUrl.adminMusic ? activatedClassCSS : deactivatedClassCSS }>
                        <PlayCircleOutlined />
                        <span className="mx-3 capitalize">{ programmationTitle.musique }</span>
                    </Link>
                    <Link to={ RouterUrl.adminPartner } className={ location.pathname === RouterUrl.adminPartner ? activatedClassCSS : deactivatedClassCSS }>
                        <TeamOutlined />
                        <span className="mx-3 capitalize">Partenaires</span>
                    </Link>
                </nav>
            </div>
            <div className="col-span-4 md:col-span-5 bg-gray-200">
                <header className="flex justify-center text-xl py-1 bg-white border-b-4 border-green font-avenir capitalize">
                    { adminTitleFromPathname() }
                </header>
                <main className="overflow-x-hidden overflow-y-auto px-4 mt-4">
                    { children }
                </main>
            </div>
        </div>
    )
}
export default Navigation