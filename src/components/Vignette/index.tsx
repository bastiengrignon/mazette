import React, { useState } from "react"
import Popup from "../Popup"

const vignetteCSS = "w-11/12 sm:w-7/8 md:w-3/4 h-auto mx-auto cursor-pointer transform transition duration-300 hover:scale-110"

interface VignetteProps {
    type: "music" | "movie"
    //eslint-disable-next-line
    properties: any
}

const Vignette: React.FC<VignetteProps> = (props) => {
    const [visibility, setVisibility] = useState<boolean>(false)

    return props.type === "music" ?
        <div>
            <div className={`relative ${vignetteCSS}`} onClick={() => setVisibility(true)}>
                <img src={props.properties.image} alt={props.properties.groupName}/>
                <div className="fixed top-0 h-full w-full opacity-0 hover:opacity-100">
                    <div className="flex justify-center items-center h-full">
                        <span className="w-full font-medium bg-test-green text-white text-center text-base sm:text-2xl md:text-3xl lg:text-5xl py-2">
                            {props.properties.groupName}
                        </span>
                    </div>
                </div>
            </div>
            {visibility &&
            <Popup filmName={props.properties.groupName} author={props.properties.type}
                description={props.properties.description} date={""} location={""}
                duration={""} visibility={setVisibility} img={props.properties.image}/>
            }

        </div>
        :
        <div>
            <div className={`relative ${vignetteCSS}`} onClick={() => setVisibility(true)}>
                <img src={props.properties.imgThumbnail}
                    alt={`${props.properties.filmName} ${props.properties.author}`} className="w-full h-full"/>
            </div>
            {visibility &&
            <Popup filmName={props.properties.filmName} author={props.properties.author}
                description={props.properties.description} date={props.properties.date}
                location={props.properties.location} duration={props.properties.duration}
                visibility={setVisibility}
                img={props.properties.imgExtended ? props.properties.imgExtended : props.properties.imgThumbnail}/>
            }
        </div>
}

export default Vignette