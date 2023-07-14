import React from 'react'
import { Dropdown, MenuProps } from 'antd'

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

const menuStyle = {
    boxShadow      : 'none',
    backgroundColor: 'transparent',
    padding        : 0,
    borderRadius   : 0,
}

const dropdownRenderMenu = (menu) => (
    <div>
        {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
)

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

    const menuItems: MenuProps['items'] = items.map((item, key) => ({
        key,
        label: (
            <div
                key={ key }
                onClick={ handleClick }
                className="uppercase font-light text-right text-white hover:text-red text-base lg:text-xl border border-transparent hover:bg-white">
                <NavHashLink to={ `${ item.link }#${ item.name }` } className="hover:text-red">
                    { item.name }
                </NavHashLink>
            </div>

        )
    }))

    return (
        <Dropdown
            menu={ { items: menuItems } }
            overlayClassName="bg-red"
            placement="bottomRight"
            trigger={ [isMobile ? 'click' : 'hover'] }
            dropdownRender={ dropdownRenderMenu }
        >
            <div
                className={ `inline-flex items-center w-full justify-center h-full cursor-pointer ${ className } ${ activeClassName }` }>
                { children }
            </div>
        </Dropdown>
    )
}

export default DropDown
