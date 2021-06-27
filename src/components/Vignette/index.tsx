import React, {useState} from "react"
import Popup from "../Popup"

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
    
    return (
        <div>
            {
                props.type === "music" ?
                    <div className="py-2" onClick={() => setVisibility(!visibility)}>
                        <img src={props.properties.image} alt={props.properties.groupName}
                            className="w-11/12 sm:w-7/8 md:w-3/4 h-auto mx-auto cursor-pointer transform transition duration-500 hover:scale-110"/>
                        <Popup filmName={props.properties.groupName} author={props.properties.type}
                            description={props.properties.description} date={""} location={""}
                            duration={""} open={visibility} img={props.properties.image}/>

                    </div>
                    :
                    <div className="py-2" onClick={() => setVisibility(!visibility)}>
                        <div className="relative w-11/12 sm:w-7/8 md:w-3/4 h-auto mx-auto cursor-pointer transform transition duration-500 hover:scale-110">
                            <img src={props.properties.imgThumbnail} alt={`${props.properties.filmName} ${props.properties.author}`} className="w-full h-full"/>
                            <div
                                className={`fixed top-0 h-full w-full flex flex-wrap items-center justify-center text-center ${randomFilmColor()}`}>
                                <span className="font-medium uppercase text-base sm:text-2xl md:text-2xl lg:text-4xl w-full">{props.properties.filmName}</span>
                                <span className="font-semibold text-sm sm:text-xl lg:text-2xl w-full">de {props.properties.author}</span>
                            </div>
                        </div>
                        <Popup filmName={props.properties.filmName} author={props.properties.author}
                            description={props.properties.description} date={props.properties.date}
                            location={props.properties.location} duration={props.properties.duration} open={visibility}
                            img={props.properties.imgExtended ? props.properties.imgExtended : props.properties.imgThumbnail}/>
                    </div>
            }
        </div>
    )
}

export default Vignette