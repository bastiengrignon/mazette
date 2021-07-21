import React, { CSSProperties } from "react"
import { NavLink } from "react-router-dom"
import { associationItems, programmationItems, RouterUrl, TabName } from "../../constants"
import DropDown from "../DropDown"

export const activeClass = "text-white bg-red h-full"
export const inactiveClass = "text-white hover:text-white hover:bg-red h-full"

type NavbarTabsProps = {
    className: string,
    style?: CSSProperties,
    isMenuOpen: boolean,
    setMenuOpen: (isOpen: boolean) => void
}
const NavbarTabs: React.FC<NavbarTabsProps> = ({
    className,
    style,
    isMenuOpen,
    setMenuOpen
}: NavbarTabsProps) => (
    <div className={ className } style={ style }>
        <DropDown name={ TabName.programmation } items={ programmationItems }
            onItemClick={ () => setMenuOpen(false) }
            className={ `${ isMenuOpen ? "block" : "hidden" } lg:inline-block lg:mx-4 my-4 lg:my-0 ${ inactiveClass }` }/>
        <DropDown name={ TabName.association } items={ associationItems }
            onItemClick={ () => setMenuOpen(false) }
            className={ `${ isMenuOpen ? "block" : "hidden" } lg:inline-block lg:mx-4 my-4 lg:my-0 ${ inactiveClass }` }/>
        <NavLink to={ RouterUrl.information } activeClassName={ activeClass }
            onClick={ () => setMenuOpen(false) }
            className={ `${ isMenuOpen ? "block" : "hidden" } lg:inline-block lg:mx-4 my-4 lg:my-0 p-2 ${ inactiveClass }` }>
            { TabName.information }
        </NavLink>
    </div>
)

export default NavbarTabs
