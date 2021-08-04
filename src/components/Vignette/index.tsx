import React, { useState } from "react"
import Popup from "../Popup"
import { AdvancedImage } from "@cloudinary/react"
import { cloudinary } from "../../index"
import { Skeleton } from "antd"
import { IMusic } from "../../services/admin/music/music.interface"
import { IMovie } from "../../services/admin/movie/movie.interface"

const vignetteCSS = "w-11/12 sm:w-7/8 md:w-3/4 h-auto mx-auto cursor-pointer transform transition duration-300 hover:scale-110"

interface VignetteProps<MediaType extends IMovie | IMusic> {
    type: "music" | "movie"
    //eslint-disable-next-line
    properties: MediaType
    loading: boolean
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Vignette: React.FC<VignetteProps<any>> = (props) => {
    const [visibility, setVisibility] = useState<boolean>(false)

    return props.type === "music" ?
        <Skeleton avatar={ true } active={ true } paragraph={{ rows: 6 }} loading={ props.loading }>
            <div className={ `relative ${ vignetteCSS }` } onClick={ () => setVisibility(true) }>
                <AdvancedImage cldImg={ cloudinary.image(`/${props.properties.image}`) } alt={ props.properties.name }/>
                <div className="fixed top-0 h-full w-full opacity-0 hover:opacity-100">
                    <div className="flex justify-center items-center h-full">
                        <span
                            className="w-full font-medium bg-green text-white text-center text-base sm:text-2xl md:text-3xl lg:text-5xl py-2">
                            { props.properties.name }
                        </span>
                    </div>
                </div>
            </div>
            { visibility &&
            <Popup name={ props.properties.name } author={ props.properties.type }
                description={ props.properties.description } date={ "" } location={ "" }
                duration={ "" } visibility={ setVisibility } img={ props.properties.image }/>
            }

        </Skeleton>
        :
        <Skeleton avatar={ true } active={ true } paragraph={{ rows: 6 }} loading={ props.loading }>
            <div className={ `relative ${ vignetteCSS }` } onClick={ () => setVisibility(true) }>
                <AdvancedImage cldImg={ cloudinary.image(`/${props.properties.imgThumbnail}`) }
                    alt={ `${ props.properties.title } ${ props.properties.author }` }
                    className="w-full h-full"/>
            </div>
            { visibility &&
            <Popup name={ props.properties.title } author={ props.properties.author }
                description={ props.properties.description } date={ props.properties.date }
                location={ props.properties.location } duration={ props.properties.duration }
                visibility={ setVisibility }
                img={ props.properties.imgThumbnail }/>
            }
        </Skeleton>
}

export default Vignette