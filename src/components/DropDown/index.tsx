import React, {useState} from "react"
import {NavHashLink} from "react-router-hash-link"
import {activeClass, inactiveClass} from "../Navbar"

export interface DropdownItem {
    name: string
    link: string
}

interface DropDownProps {
    name: string
    className: string
    items: DropdownItem[]
}

const DropDown: React.FC<DropDownProps> = ({name, className, items}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [isParentActive, setIsParentActive] = useState<boolean>(false)

    /*    const isActive = (match) => {
        if (!match) {
            setIsParentActive(false)
            return false
        }
        setIsParentActive(true)
        return true
    }*/

    const handleActiveState = (itemLink) => {
        setOpen(false)
        console.log("pathname", window.location.pathname)
        if (window.location.pathname === itemLink)
            setIsParentActive(true)
        else
            setIsParentActive(false)
    }

    return (
        <div className={`relative ${className} focus:outline-none cursor-pointer`} onClick={() => setOpen(!open)}
            onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div
                className={`inline-flex items-center uppercase focus:outline-none ${isParentActive ? activeClass : inactiveClass}`}>
                {name}
            </div>
            <div
                className={`${open ? "flex" : "hidden"} flex-col text-right bg-my-indigo text-white lg:absolute lg:right-0 lg:rounded`}>
                {
                    items.map((item, index) => (
                        <NavHashLink key={index} to={`${item.link}#${item.name}`} role="menuitem"
                            onClick={() => handleActiveState(item.link)}
                            className="w-full pr-1 py-0.5 hover:bg-yellow-400 hover:text-my-indigo font-light text-sm md:text-base lg:text-xl lg:last:rounded-b lg:pl-5 lg:py-1">
                            {item.name}
                        </NavHashLink>
                    ))
                }
            </div>
        </div>
    )
}

export default DropDown