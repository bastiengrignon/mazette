import React, {useState} from "react"
import Popup from "../Popup"

const randomFilmColor = (): string => {
    const colors: string[] = ["yellow", "green", "pink", "blue"]
    const opacities: number[] = [400]
    const randomColor: string = colors[Math.floor(Math.random() * colors.length)]
    const randomOpacity: number = opacities[Math.floor(Math.random() * opacities.length)]
    return `text-${randomColor}-${randomOpacity}`
}

interface FilmProps {
    filmName: string
    author: string
    description: string
    date: string
    location: string
    duration: string
    imgThumbnail: string
    imgExtended?: string
}

const Film: React.FC<FilmProps> = ({
    filmName,
    author,
    description,
    date,
    location,
    duration,
    imgThumbnail,
    imgExtended
}) => {
    const [visibility, setVisibility] = useState<boolean>(false)

    return (
        <div className="pb-5 sm:pb-5" onClick={() => setVisibility(!visibility)}>
            <div className="relative w-56 h-56 cursor-pointer transform transition duration-500 hover:scale-110">
                <img src={imgThumbnail} alt={`${filmName} ${author}`} className="w-full h-full rounded"/>
                <div
                    className={`fixed top-0 h-full w-full flex flex-wrap items-center justify-center text-center ${randomFilmColor()}`}>
                    <span className="font-medium uppercase text-2xl">{filmName}</span>
                    <span className="font-semibold text-xl">de {author}</span>
                </div>
            </div>
            <Popup filmName={filmName} author={author} description={description} date={date}
                location={location} duration={duration} open={visibility}
                img={imgExtended ? imgExtended : imgThumbnail}/>
        </div>
    )
}

export default Film