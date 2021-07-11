import React from "react"

interface AnchorProps {
    id: string
    className: string
}

const anchorCSS = "pt-5 sm:pt-20 -mt-5 sm:-mt-20"

const isChildrenMissing = (children): boolean => children === undefined

const Anchor: React.FC<AnchorProps> = ({ id, className , children}) => (
    <div id={ id } className={ anchorCSS }>
        <div className={ className }>{ isChildrenMissing(children) ? id : children }</div>
    </div>
)

export default Anchor