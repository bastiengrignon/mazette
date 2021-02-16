import React, {useState} from "react"
import {HiChevronDown, HiChevronUp} from "react-icons/hi"

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
    return (
        <div className={`relative ${className} focus:outline-none`} onClick={() => setOpen(!open)}
            onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className="inline-flex items-center uppercase focus:outline-none">
                {name}
            </div>
            <div
                className={`${open ? "flex" : "hidden"} flex-col text-right bg-my-indigo text-white lg:absolute lg:right-0 lg:rounded`}>
                {
                    items.map((item, index) => (
                        <a key={index} href={`${item.link}#${item.name}`} role="menuitem"
                            onClick={() => setOpen(false)}
                            className="w-full pr-1 py-0.5 hover:bg-yellow-400 hover:text-my-indigo font-light text-sm md:text-base lg:text-xl lg:last:rounded-b lg:pl-5 lg:py-1">
                            {item.name}
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default DropDown