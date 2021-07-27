import React from "react"

interface LinkProps {
    src: string
    newTab?: boolean
    className?: string
}

const Link: React.FC<LinkProps> = ({ src, newTab = true, className = "", children }) => {
    return (newTab ?
        <a href={ src } target="_blank" className={`link ${className}`} rel="nofollow external noreferrer noopener">
            { children || src }
        </a>
        :
        <a href={ src } className={`link ${className}`} rel="internal noreferrer noopener">
            { children || src }
        </a>
    )
}

export default Link