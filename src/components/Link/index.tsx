import React from "react"

interface LinkProps {
    src: string
    newTab?: boolean
}

const Link: React.FC<LinkProps> = ({src, newTab = true, children}) => {
    return (newTab ?
        <a href={src} target={"_blank"} className="link" rel="nofollow external noreferrer noopener">
            {children}
        </a>
        :
        <a href={src} className="link" rel="internal noreferrer noopener">
            {children}
        </a>
    )
}

export default Link