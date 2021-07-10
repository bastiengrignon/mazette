import React from "react"

interface ImageProps {
    src: string
    alt: string
    className?: string
}

const Image: React.FC<ImageProps> = ({ src, alt, className = "" }) => {

    return (
        <picture>
            <source srcSet={ `${ src }.webp` } type="image/webp"/>
            <img src={ `${ src }.jpg` } alt={ alt } className={ className }/>
        </picture>
    )
}

export default Image