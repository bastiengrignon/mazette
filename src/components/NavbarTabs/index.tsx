import DropDown from '../DropDown'
import { NavLink, useLocation } from 'react-router-dom'
import React, { CSSProperties, useEffect, useState } from 'react'
import { RouterUrl, TabName, associationItems, programmationItems } from '../../constants'

const activeClass = 'bg-red'
const tabClass = 'p-2 text-white hover:text-white hover:bg-red lg:inline-block'

type NavbarTabsProps = {
    className: string,
    style?: CSSProperties,
    isMenuOpen: boolean,
    setMenuOpen: (isOpen: boolean) => void
    isMobile?: boolean
}
const NavbarTabs: React.FC<NavbarTabsProps> = ({
    className,
    style,
    isMenuOpen,
    setMenuOpen,
    isMobile = false
}) => {
    const location = useLocation()
    const [isProgramURL, setProgramURL] = useState<boolean>(false)
    const [isAssociationURL, setAssociationURL] = useState<boolean>(false)
    const [isInformationURL, setInformationURL] = useState<boolean>(false)

    useEffect(() => {
        setProgramURL(location.pathname.includes(RouterUrl.programmation))
        setAssociationURL(location.pathname.includes(RouterUrl.association))
        setInformationURL(location.pathname.includes(RouterUrl.information))
    }, [location.pathname])

    return (
        <div className={ `space-x-0 lg:space-x-5 space-y-5 lg:space-y-0 mr-5 uppercase ${ className }` } style={ style }>
            <DropDown items={ programmationItems } isMobile={ isMobile }
                onItemClick={ () => setMenuOpen(false) }
                className={ `${ tabClass } ${ isMenuOpen ? 'block' : 'hidden' }` } activeClassName={ isProgramURL ? activeClass : '' }>
                { TabName.programmation }
            </DropDown>
            <DropDown items={ associationItems } isMobile={ isMobile }
                onItemClick={ () => setMenuOpen(false) }
                className={ `${ tabClass } ${ isMenuOpen ? 'block' : 'hidden' }` }
                activeClassName={ isAssociationURL ? activeClass : '' }>
                { TabName.association }
            </DropDown>
            <NavLink to={ RouterUrl.information } onClick={ () => setMenuOpen(false) }
                className={ `${ tabClass } ${ isMenuOpen ? 'block' : 'hidden' }` }
                activeClassName={ isInformationURL ? activeClass : '' }>
                { TabName.information }
            </NavLink>
        </div>
    )
}

export default NavbarTabs
