import React from "react"

interface ImageProps {
    src: string
    alt: string
    className?: string
    isPng?: boolean
}

const Image: React.FC<ImageProps> = ({ src, alt, className = "", isPng = false}) => {

    return (
        <picture>
            <source type="image/webp" srcSet={ `${ src }.webp` } className={ className }/>
            <img src={ `${ src }.${isPng ? "png" : "jpg"}` } alt={ alt } className={ className }/>
        </picture>
    )
}

export default Image