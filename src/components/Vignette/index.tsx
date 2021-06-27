import React, { useState } from "react"
import Popup from "../Popup"

const vignetteCSS = "w-11/12 sm:w-7/8 md:w-3/4 h-auto mx-auto cursor-pointer transform transition duration-300 hover:scale-110"

const randomFilmColor = (): string => {
    const colors: string[] = ["text-yellow-400", "text-green-400", "text-pink-400", "text-blue-400"]
    return colors[Math.floor(Math.random() * colors.length)]
}

interface VignetteProps {
    type: "music" | "movie"
    //eslint-disable-next-line
    properties: any
}

const Vignette: React.FC<VignetteProps> = (props) => {
    const [visibility, setVisibility] = useState<boolean>(false)

    return props.type === "music" ?
        <div>
            <img src={props.properties.image} alt={props.properties.groupName} onClick={() => setVisibility(true)}
                className={vignetteCSS}/>
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
                <div className={`fixed top-0 h-full w-full flex items-center ${randomFilmColor()}`}>
                    <div className="w-full text-center leading-10">
                        <span className="font-medium uppercase text-base sm:text-2xl lg:text-4xl">
                            {props.properties.filmName} <br/>
                        </span>
                        <span className="font-semibold text-sm sm:text-xl lg:text-2xl">
                            de {props.properties.author}
                        </span>
                    </div>
                </div>
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