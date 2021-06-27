import React from "react"

interface LinkProps {
    src: string
    newTab?: boolean
}

const Link: React.FC<LinkProps> = ({src, newTab = true, children}) => (
    <a href={src} target={newTab ? "_blank" : "_self"} className="link"
       rel={`noopener noreferrer ${newTab ? "external nofollow" : ""}`}>
        {children}
    </a>
)

export default Link