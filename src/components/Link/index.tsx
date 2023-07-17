import React from 'react'

interface LinkProps {
    src: string
    newTab?: boolean
    className?: string
    title?: string
    onClick?: () => void
    children?: React.ReactNode
}

const Link: React.FC<LinkProps> = ({ src, newTab = true, className = '', title, onClick, children }) => {
    return (newTab ?
        <a href={ src } target="_blank" className={`link ${className}`}
            title={ title } onClick={ onClick }
            rel="nofollow external noreferrer noopener">
            { children || src }
        </a>
        :
        <a href={ src } className={`link ${className}`}
            title={ title } onClick={ onClick }
            rel="internal noreferrer noopener">
            { children || src }
        </a>
    )
}

export default Link
