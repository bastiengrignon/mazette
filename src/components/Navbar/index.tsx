import React, {useState} from "react"
import {Link, NavLink} from "react-router-dom"
import {
    associationItems,
    programmationItems,
    RouterUrl,
    TabName
} from "../../constants"
import DropDown from "../DropDown"
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai"

export const activeClass = "text-yellow-400"
export const inactiveClass = "lg:hover:text-white"

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    return (
        <nav
            className="flex flex-col lg:flex-row justify-start lg:justify-between text-my-indigo lg:items-center w-full h-96 p-4"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/exported-wave.svg)`,
                backgroundRepeat: "no-repeat",
                width: "100%",
            }}>
            <Link to={RouterUrl.home} className="flex flex-col text-center text-xl uppercase">
                Festival
                <div
                    className="text-4xl italic text-yellow-400 font-medium tracking-widest uppercase">
                    Indigo
                </div>
            </Link>
            <div className="flex flex-col items-end">
                <div className="text-3xl md:text-5xl lg:hidden mb-2" onClick={() => setMenuOpen(!menuOpen)}>
                    {!menuOpen ? <AiOutlineMenu/> : <AiOutlineClose/>}
                </div>
                <div
                    className={`${menuOpen ? "flex items-center" : "hidden"} lg:flex flex-col items-end lg:flex-row lg:justify-end w-full uppercase text-2xl xl:text-3xl`}>
                    <NavLink to={RouterUrl.home} activeClassName={activeClass} exact={true}
                        onClick={() => setMenuOpen(false)}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-4 lg:my-0 ${inactiveClass}`}>
                        {TabName.festival}
                    </NavLink>
                    <DropDown name={TabName.programmation} items={programmationItems}
                        onItemClick={() => setMenuOpen(false)}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-4 lg:my-0 ${inactiveClass}`}/>
                    <DropDown name={TabName.association} items={associationItems}
                        onItemClick={() => setMenuOpen(false)}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-4 lg:my-0 ${inactiveClass}`}/>
                    <NavLink to={RouterUrl.information} activeClassName={activeClass}
                        onClick={() => setMenuOpen(false)}
                        className={`${menuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-4 lg:my-0 ${inactiveClass}`}>
                        {TabName.information}
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar