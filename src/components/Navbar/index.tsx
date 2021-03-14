import React, {useState} from "react"
import { Link } from "react-router-dom"
import { RouterUrl } from "../../constants"
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai"
import NavbarTabs from "../NavbarTabs"
import Wave from "../Wave"

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    return (
        <aside className="relative lg:h-96 md:h-48 h-24">
            <Wave className="lg:-top-10 top-0" text="CINEMA ET CONCERTS EN PLEIN AIR"/>
            <nav className="absolute z-20 flex flex-row justify-start lg:justify-between text-my-indigo lg:items-center w-full lg:p-6 p-2">
                <Link id="logo" to={RouterUrl.home} className="flex lg:flex-col flex-row justify-center md:text-xl uppercase">
                    Festival
                    <div className="md:text-4xl italic text-yellow-400 font-medium tracking-widest uppercase">
                        Indigo
                    </div>
                </Link>

                <span id="mod-mobil" className="block lg:hidden">
                    <div className="text-2xl md:text-4xl absolute right-2" onClick={() => setMenuOpen(!menuOpen)}>
                        { !menuOpen ? <AiOutlineMenu/> : <AiOutlineClose/> }
                    </div>
                    <NavbarTabs className="uppercase px-2 absolute md:top-12 top-8 left-0 w-full md:text-2xl" style={{backgroundColor: "#fff02a"}} isMenuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                </span>

                <span id="mod-desktop" className="hidden lg:block">
                    <NavbarTabs className="lg:uppercase lg:flex lg:flex-row lg:justify-end lg:text-3xl" isMenuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                </span>

            </nav>
        </aside>
    )
}

export default Navbar
