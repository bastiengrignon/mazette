import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {
    DropdownMenuAssociation,
    DropdownMenuProgrammation,
    RouterUrl,
    TabName
} from "../../constants"
import {BiMenu} from "react-icons/bi"
import DropDown, {DropdownItem} from "../DropDown"


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
const associationItems: DropdownItem[] = [
    {
        name: DropdownMenuAssociation.association,
        link: RouterUrl.association
    },
    {
        name: DropdownMenuAssociation.equipe,
        link: RouterUrl.association
    },
    {
        name: DropdownMenuAssociation.adherer,
        link: RouterUrl.association
    }
]

const Navbar: React.FC = () => {
    const history = useHistory()
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const activeTab = (item: string) => {
        const activeClass = "text-yellow-400 hover:font-normal"
        const inactiveClass = "text-white border-b-2 border-my-indigo lg:hover:border-b-2" +
            " lg:hover:border-yellow-400 lg:hover:text-yellow-400"
        return history.location.pathname === item ? activeClass : inactiveClass
    }

    return (
        <nav
            className="flex flex-col lg:flex-row justify-between lg:items-center text-white bg-my-indigo w-full p-4 mb-10">
            <Link to={RouterUrl.home} className="flex flex-col text-center text-xl uppercase">
                Festival
                <div className="text-4xl italic text-yellow-400 font-medium tracking-widest uppercase">
                    Indigo
                </div>
            </Link>
            <div className="flex flex-col items-end">
                <BiMenu className="text-3xl md:text-5xl lg:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}/>
                <div
                    className={`${menuOpen ? "flex" : "hidden"} lg:flex flex-col items-end lg:flex-row lg:justify-end w-full uppercase text-base md:text-2xl xl:text-3xl`}>
                    <Link to={RouterUrl.home}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 ${activeTab(RouterUrl.home)} pr-6 md:pr-8 lg:pr-0`}>
                        {TabName.festival}
                    </Link>
                    <DropDown name={TabName.programmation} items={programmationItems}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 ${activeTab(RouterUrl.programmation)}`}/>
                    <DropDown name={TabName.association} items={associationItems}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 ${activeTab(RouterUrl.association)}`}/>
                    <Link to={RouterUrl.information}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 ${activeTab(RouterUrl.information)} pr-6 md:pr-8 lg:pr-0`}>
                        {TabName.information}
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar