import React, {useState} from "react"
import {Link, NavLink} from "react-router-dom"
import {
    associationItems,
    programmationItems,
    RouterUrl,
    TabName
} from "../../constants"
import {BiMenu} from "react-icons/bi"
import DropDown from "../DropDown"

export const activeClass = "text-yellow-400 hover:font-normal"
export const inactiveClass = "text-white lg:hover:text-yellow-400"

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    return (
        <nav
            className="flex flex-col lg:flex-row justify-between lg:items-center text-white bg-my-indigo w-full p-4 mb-10 h-auto">
            <Link to={RouterUrl.home} className="flex flex-col text-center text-xl uppercase">
                Festival
                <div
                    className="text-4xl italic text-yellow-400 font-medium tracking-widest uppercase">
                    Indigo
                </div>
            </Link>
            <div className="flex flex-col items-end">
                <BiMenu className="text-3xl md:text-5xl lg:hidden mb-2"
                    onClick={() => setMenuOpen(!menuOpen)}/>
                <div
                    className={`${menuOpen ? "flex" : "hidden"} lg:flex flex-col items-end lg:flex-row lg:justify-end w-full uppercase text-base md:text-2xl xl:text-3xl`}>
                    <NavLink to={RouterUrl.home} activeClassName={activeClass}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-1 lg:my-0 ${inactiveClass}`}>
                        {TabName.festival}
                    </NavLink>
                    <DropDown name={TabName.programmation} items={programmationItems}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-1 lg:my-0 ${inactiveClass}`}/>
                    <DropDown name={TabName.association} items={associationItems}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-1 lg:my-0 ${inactiveClass}`}/>
                    <NavLink to={RouterUrl.information} activeClassName={activeClass}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-1 lg:my-0 ${inactiveClass}`}>
                        {TabName.information}
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar