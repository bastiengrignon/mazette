import React from 'react'
import { Skeleton } from 'antd'

interface ImageProps {
    src: string
    alt: string
    loading?: boolean
    className?: string
    isPng?: boolean
}

const Image: React.FC<ImageProps> = ({ src, alt, loading = false, className = '', isPng = false }) => (
    loading ? <Skeleton.Avatar active={ true } size="large" /> :
        <picture>
            <source type="image/webp" srcSet={ `${ src }.webp` } className={ className }/>
            <img src={ `${ src }.${ isPng ? 'png' : 'jpg' }` } alt={ alt } className={ className }/>
        </picture>
)

export default Image