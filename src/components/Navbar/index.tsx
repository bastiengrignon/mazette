import React, { useState } from "react"
import { Link } from "react-router-dom"
import { RouterUrl } from "../../constants"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import NavbarTabs from "../NavbarTabs"
import Wave from "../Wave"

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    return (
        <aside className="relative h-32 sm:h-40 md:h-48 lg:h-56 xl:h-72 2xl:h-96">
            <Wave text="CINEMA ET CONCERTS EN PLEIN AIR"/>
            <nav
                className="absolute z-20 flex flex-row justify-start lg:justify-between text-logo-blue lg:items-center w-full p-2 lg:p-0">
                <Link id="logo" to={RouterUrl.home}
                    className="md:text-xl uppercase z-20 w-1/4 ml-2 sm:ml-5 md:ml-8 lg:ml-10">
                    <img src={`${process.env.PUBLIC_URL}/img/test_logo11.png`} alt="Logo"
                        className="mt-10"/>
                </Link>

                <span className="block lg:hidden w-full">
                    <div className="text-2xl md:text-4xl absolute right-2 text-white"
                        onClick={() => setMenuOpen(!menuOpen)}>
                        {!menuOpen ? <AiOutlineMenu/> : <AiOutlineClose/>}
                    </div>
                    <NavbarTabs setMenuOpen={setMenuOpen} isMenuOpen={menuOpen}
                        className="absolute w-full uppercase px-2 mt-5 top-8 left-0 md:top-12 text-3xl text-center bg-test-green"/>
                </span>

                <span className="hidden lg:block w-full flex-nowrap">
                    <NavbarTabs isMenuOpen={menuOpen} setMenuOpen={setMenuOpen}
                        className="lg:uppercase lg:flex lg:flex-row lg:justify-end lg:text-2xl xl:text-3xl"/>
                </span>
            </nav>
        </aside>
    )
}

export default Navbar
