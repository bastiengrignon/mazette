import React from 'react'
import { Dropdown, Menu } from 'antd'

import { NavHashLink } from 'react-router-hash-link'

export interface DropdownItem {
    name: string
    link: string
}

interface DropDownProps {
    className: string
    activeClassName: string
    items: DropdownItem[]
    onItemClick?: () => void,
    isMobile?: boolean
}

const DropDown: React.FC<DropDownProps> = ({
    children,
    className,
    activeClassName,
    items,
    onItemClick,
    isMobile = false
}) => {

    const handleClick = (): void => {
        onItemClick && onItemClick()
    }

    const dropdownMenu = () => (
        <Menu>
            {
                items.map((item, key) => (
                    <Menu.Item key={ key } onClick={ handleClick }
                        className="pr-2 py-2 bg-red hover:bg-white uppercase font-light text-right text-white hover:text-red text-base lg:text-xl border border-transparent hover:border-red">
                        <NavHashLink to={ `${ item.link }#${ item.name }` }>
                            { item.name }
                        </NavHashLink>
                    </Menu.Item>
                ))
            }
        </Menu>
    )

    return (
        <Dropdown overlay={ dropdownMenu } overlayClassName="bg-red" placement="bottomCenter" trigger={ [ isMobile ? 'click' : 'hover' ] }>
            <div className={ `inline-flex items-center w-full justify-center h-full cursor-pointer ${ className } ${ activeClassName }` }>
                { children }
            </div>
        </Dropdown>
    )
}

export default DropDown
