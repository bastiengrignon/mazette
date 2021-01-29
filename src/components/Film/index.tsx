import React, {useState} from "react"
import Popup from "../Popup"

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
            <div className="relative w-56 h-56 cursor-pointer">
                <img src={imgThumbnail} alt={`${filmName} ${author}`} className="w-full h-full"/>
                <div
                    className="absolute top-0 bottom-0 right-0 left-0 opacity-0 h-full w-full bg-yellow-400
                     hover:opacity-100 transition ease-in duration-200 flex flex-wrap items-center justify-center text-center">
                    <span className="font-medium uppercase text-2xl">{filmName}</span><span
                        className="font-semibold text-xl">de {author}</span>
                </div>
            </div>
            <Popup filmName={filmName} author={author} description={description} date={date}
                location={location} duration={duration} open={visibility}
                img={imgExtended ? imgExtended : imgThumbnail}/>
        </div>
    )
}

export default Film