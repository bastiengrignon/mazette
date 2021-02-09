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
        <div className={`${className} relative inline-flex items-center justify-end text-right`}>
            <button type="button" onClick={() => setOpen(!open)}
                className="inline-flex justify-end items-center w-full rounded-md shadow-sm text-sm sm:text-base md:text-2xl xl:text-3xl font-light uppercase focus:outline-none">
                {name}
                {open ? <HiChevronUp className="mx-1"/> : <HiChevronDown className="mx-1"/>}
            </button>

            <div
                className={`${open ? "block" : "hidden"} absolute right-0 mt-2 w-full" +
                    " rounded-md shadow-lg text-my-indigo bg-gray-100 top-5 md:top-auto`}>
                {
                    items.map((item, index) => (
                        <a key={index} href={`${item.link}#${item.name}`}
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-base hover:bg-yellow-400 hover:text-my-indigo rounded-md"
                            role="menuitem">
                            {item.name}
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default DropDown