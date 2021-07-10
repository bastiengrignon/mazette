import React from "react"

interface AnchorProps {
    id: string
    className: string
}

const anchorCSS = "pt-5 sm:pt-20 -mt-5 sm:-mt-20"

const Anchor: React.FC<AnchorProps> = ({ id, className }) => (
    <div id={ id } className={ anchorCSS }>
        <div className={ className }>{ id }</div>

    </div>
)

export default Anchor