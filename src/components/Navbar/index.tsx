import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { RouterUrl, staticImgFolder } from "../../constants"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import NavbarTabs from "../NavbarTabs"
import Wave from "../Wave"
import Image from "../Image"

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [isLegalMention, setLegalMention] = useState<boolean>(false)
    const location = useLocation()

    useEffect(() => setLegalMention(location.pathname === RouterUrl.mention), [location])

    return (
        isLegalMention ? null :
            <aside
                className="relative h-32 sm:h-40 md:h-48 lg:h-56 xl:h-72 2xl:h-96 mb-0 md:mb-4 lg:mb-12 2xl:mb-16">
                <Wave text="CINEMA ET CONCERTS EN PLEIN AIR"/>
                <nav className="absolute z-20 flex flex-row justify-start lg:justify-between lg:items-center w-full p-2 lg:p-0">
                    <Link id="logo" to={ RouterUrl.home } title="Accueil Mazette!"
                        className="md:text-xl uppercase z-20 w-1/4 ml-2 sm:ml-5 md:ml-8 lg:ml-10">
                        <Image src={ `${ staticImgFolder }/festival_mazette` } alt="Logo"
                            className="mt-2 sm:mt-1 md:mt-2" isPng={ true }/>
                    </Link>
                    <span className="block lg:hidden w-full">
                        <div className="absolute top-4 right-4 text-2xl md:text-4xl text-white cursor-pointer" onClick={ () => setMenuOpen(!menuOpen) }>
                            { !menuOpen ? <AiOutlineMenu/> : <AiOutlineClose/> }
                        </div>
                        <NavbarTabs isMenuOpen={ menuOpen } setMenuOpen={ setMenuOpen } isMobile={ true }
                            className={`${ menuOpen ? "py-5" : "py-0" } absolute w-full left-0 px-2 top-10 sm:top-16 md:top-20 text-2xl text-center bg-green`}/>
                    </span>

                    <span className="hidden lg:block whitespace-nowrap">
                        <NavbarTabs isMenuOpen={ menuOpen } setMenuOpen={ setMenuOpen } className="flex justify-end lg:text-2xl xl:text-3xl"/>
                    </span>
                </nav>
            </aside>
    )
}

export default Navbar
