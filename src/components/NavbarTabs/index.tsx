import React, {CSSProperties} from "react"
import {NavLink} from "react-router-dom"
import {associationItems, programmationItems, RouterUrl, TabName} from "../../constants"
import DropDown from "../DropDown"

export const activeClass = "text-yellow-400"
export const inactiveClass = "lg:hover:text-white"

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
}: NavbarTabsProps) => {
    return (
        <div className={className} style={style}>
            <NavLink to={RouterUrl.home} activeClassName={activeClass} exact={true}
                onClick={() => setMenuOpen(false)}
                className={`${isMenuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-4 lg:my-0 ${inactiveClass}`}>
                {TabName.festival}
            </NavLink>
            <DropDown name={TabName.programmation} items={programmationItems}
                onItemClick={() => setMenuOpen(false)}
                className={`${isMenuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-4 lg:my-0 ${inactiveClass}`}/>
            <DropDown name={TabName.association} items={associationItems}
                onItemClick={() => setMenuOpen(false)}
                className={`${isMenuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-4 lg:my-0 ${inactiveClass}`}/>
            <NavLink to={RouterUrl.information} activeClassName={activeClass}
                onClick={() => setMenuOpen(false)}
                className={`${isMenuOpen ? "block" : "hidden"} lg:block lg:mx-4 my-4 lg:my-0 ${inactiveClass}`}>
                {TabName.information}
            </NavLink>
        </div>
    )
}

export default NavbarTabs