import { Popover } from 'antd'
import clsx from 'clsx'

import { NavHashLink } from 'react-router-hash-link'
import { NavLink, useLocation } from 'react-router-dom'
import React, { CSSProperties, useEffect, useState } from 'react'
import { RouterUrl, TabName, associationItems, programmationItems } from '../../constants'

const activeClass = 'bg-red'
const tabClass = 'p-2 text-white hover:text-white hover:bg-red lg:inline-block'
const dropdownTriggerClass = 'p-2 cursor-pointer text-white hover:bg-red w-full lg:inline-block'
const popoverItemClass = 'p-2 flex justify-end rounded-none bg-red text-right uppercase text-white text-base lg:text-xl no-underline hover:bg-white hover:text-red'

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
    const [openProgrammationPopover, setOpenProgrammationPopover] = useState<boolean>(false)
    const [openAssociationPopover, setOpenAssociationPopover] = useState<boolean>(false)

    const handleCloseOnProgrammationItemClick = () => {
        setMenuOpen(false)
        setOpenProgrammationPopover(false)
    }

    const handleCloseOnAssociationItemClick = () => {
        setMenuOpen(false)
        setOpenAssociationPopover(false)
    }
    
    useEffect(() => {
        setProgramURL(location.pathname.includes(RouterUrl.programmation))
        setAssociationURL(location.pathname.includes(RouterUrl.association))
        setInformationURL(location.pathname.includes(RouterUrl.information))
    }, [location.pathname])

    const programmationLinks = programmationItems.map((item, key) => (
        <NavHashLink
            key={ key }
            onClick={ handleCloseOnProgrammationItemClick }
            to={ `${ item.link }#${ item.name }` }
            className={popoverItemClass}>
            { item.name }
        </NavHashLink>
    ))

    const associationLinks = associationItems.map((item, key) => (
        <NavHashLink
            key={ key }
            onClick={ handleCloseOnAssociationItemClick }
            to={ `${ item.link }#${ item.name }` }
            className={popoverItemClass}>
            { item.name }
        </NavHashLink>
    ))

    return (
        <div className={ `space-x-0 lg:space-x-5 space-y-5 lg:space-y-0 mr-5 uppercase ${ className }` } style={ style }>
            <Popover
                content={associationLinks}
                arrow={false}
                placement="bottomRight"
                trigger={[isMobile ? 'click' : 'hover']}
                overlayClassName={clsx(
                    isMobile ? 'w-full pr-4' : 'w-80'
                )}
                open={openAssociationPopover}
                onOpenChange={setOpenAssociationPopover}
            >
                <div className={clsx(
                    dropdownTriggerClass,
                    isAssociationURL ? activeClass : '',
                    isMenuOpen ? 'block' : 'hidden'
                )}>
                    {TabName.association}
                </div>
            </Popover>

            <Popover
                content={programmationLinks}
                arrow={false}
                placement="bottomRight"
                trigger={[isMobile ? 'click' : 'hover']}
                overlayClassName={clsx(
                    isMobile ? 'w-full pr-4' : 'w-72'
                )}
                open={openProgrammationPopover}
                onOpenChange={setOpenProgrammationPopover}
            >
                <div className={clsx(
                    dropdownTriggerClass,
                    isProgramURL ? activeClass : '',
                    isMenuOpen ? 'block' : 'hidden'
                )}>
                    {TabName.programmation}
                </div>
            </Popover>
            <NavLink to={ RouterUrl.information } onClick={ () => setMenuOpen(false) }
                className={ `${ tabClass } ${ isMenuOpen ? 'block' : 'hidden' }` }
                activeClassName={ isInformationURL ? activeClass : '' }>
                { TabName.information }
            </NavLink>
        </div>
    )
}

export default NavbarTabs
