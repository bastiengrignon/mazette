import React from "react"
import {
    DashboardOutlined,
    FireFilled,
    PlayCircleOutlined,
    TeamOutlined,
    VideoCameraOutlined
} from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"
import { programmationTitle, RouterUrl } from "../../../constants"

const activatedClassCSS = "flex items-center mt-4 py-2 px-6 bg-gray-700 bg-opacity-25 text-gray-100"
const deactivatedClassCSS = "flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"

const Navigation: React.FC = ({ children }) => {
    const location = useLocation()

    const adminTitleFromPathname = (url: string): string => {
        if (url === RouterUrl.adminMovie) return programmationTitle.films
        else if (url === RouterUrl.adminMusic) return programmationTitle.musique
        else if (url === RouterUrl.adminPartner) return "Partenaires"
        else return "Dashboard"
    }

    const adminTabIcon = (url: string): React.ReactNode => {
        if (url === RouterUrl.adminMovie) return <VideoCameraOutlined />
        if (url === RouterUrl.adminMusic) return <PlayCircleOutlined />
        if (url === RouterUrl.adminPartner) return <TeamOutlined />
        else return <DashboardOutlined />
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
                    {
                        Object.keys(RouterUrl).filter(key => key.match(/^admin.*$/g)).map((url, key) => {
                            const modifiedUrl = `/${ url.split("admin")[1].toString().toLowerCase() }`
                            return (
                                <Link key={ key } to={ modifiedUrl } className={ location.pathname === modifiedUrl ? activatedClassCSS : deactivatedClassCSS }>
                                    { adminTabIcon(modifiedUrl) }
                                    <span className="mx-3 capitalize"> { adminTitleFromPathname(modifiedUrl) }</span>
                                </Link>
                            )
                        })
                    }
                </nav>
            </div>
            <div className="col-span-4 md:col-span-5 bg-gray-200">
                <header className="flex justify-center text-xl py-1 bg-white border-b-4 border-green font-avenir capitalize">
                    { adminTitleFromPathname(location.pathname) }
                </header>
                <main className="overflow-x-hidden overflow-y-auto px-4 mt-4">
                    { children }
                </main>
            </div>
        </div>
    )
}
export default Navigation