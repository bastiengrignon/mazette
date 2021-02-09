import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {
    DropdownMenuInformation,
    DropdownMenuProgrammation,
    RouterUrl,
    TabName
} from "../../constants"
import {BiMenuAltRight} from "react-icons/bi"
import DropDown, {DropdownItem} from "../DropDown"

const activeClass = "text-yellow-400 hover:font-normal"
const inactiveClass = "text-white hover:text-yellow-400"

const programmationItems: DropdownItem[] = [
    {
        name: DropdownMenuProgrammation.films,
        link: RouterUrl.programmation
    },
    {
        name: DropdownMenuProgrammation.musique,
        link: RouterUrl.programmation
    },
    {
        name: DropdownMenuProgrammation.concours,
        link: RouterUrl.programmation
    }
]

const informationItems: DropdownItem[] = [
    {
        name: DropdownMenuInformation.festival,
        link: RouterUrl.information
    },
    {
        name: DropdownMenuInformation.contact,
        link: RouterUrl.information
    }
]

const Navbar: React.FC = () => {
    const history = useHistory()
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    return (
        <div className="flex text-white">
            <img className="absolute top-0 w-full" src={`${process.env.PUBLIC_URL}/img/wave.svg`}
                alt="Navbar Wave"/>
            <div
                className={"flex flex-col z-10 uppercase sm:mt-2 md:mt-5 lg:mt-6 xl:mt-12" +
                " md:ml-10 lg:ml-10 xl:ml-24 m-auto"}>
                <div className="flex text-xl sm:text-4xl md:text-5xl font-medium">
                    indigo
                </div>
                <div
                    className={`flex justify-end text-yellow-400 text-sm sm:text-2xl lg:text-3xl font-light sm:font-medium ${menuOpen ? "mb-16 sm:mb-0" : "mb-0"}`}>
                    festival
                </div>
            </div>
            <div
                className={`fixed lg:absolute flex flex-col lg:flex-row text-right items-end xl:items-center ${menuOpen ? "bg-my-indigo" : ""} w-full lg:w-3/4 right-0 top-0 text-sm sm:text-base md:text-2xl xl:text-3xl font-light uppercase z-0 mt-0 mr-0 md:mt-2 lg:mt-5 xl:mt-10 lg:mr-2 xl:mr-10`}>
                <BiMenuAltRight
                    className="transform lg:rotate-180 text-3xl rounded-md flex items-end md:text-5xl mx-2 block lg:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}/>
                <Link to={RouterUrl.home}
                    className={`px-4 py-1 ${menuOpen ? "block" : "hidden"} lg:block w-full ${history.location.pathname === RouterUrl.home
                        ? activeClass : inactiveClass}`}>
                    {TabName.festival}
                </Link>
                <DropDown name={TabName.programmation} items={programmationItems}
                    className={`pl-4 py-1 ${menuOpen ? "block" : "hidden"} lg:block w-full ${history.location.pathname === RouterUrl.programmation ? activeClass : inactiveClass}`}/>
                <Link to={RouterUrl.association}
                    className={`px-4 py-1 ${menuOpen ? "block" : "hidden"} lg:block w-full ${history.location.pathname === RouterUrl.association ? activeClass : inactiveClass}`}>
                    {TabName.association}
                </Link>

                <DropDown name={TabName.information} items={informationItems}
                    className={`px-4 py-1 ${menuOpen ? "block" : "hidden"} lg:block w-full whitespace-nowrap mb-0 md:mb-4 lg:mb-0 ${history.location.pathname === RouterUrl.information ? activeClass : inactiveClass}`}/>
            </div>
        </div>
    )
}

export default Navbar