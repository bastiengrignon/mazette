import React from "react"
import {AiFillCloseCircle} from "react-icons/ai"

interface PopupProps {
    filmName: string
    author: string
    description: string
    date: string
    location: string
    duration: string
    img: string
    open: boolean
}

const Popup: React.FC<PopupProps> = ({
    filmName,
    author,
    description,
    date,
    location,
    duration,
    img,
    open
}) => (
    <div
        className={`fixed z-20 inset-0 overflow-auto ${open ? "block" : "hidden"} flex`}>
        <div
            className="absolute inset-0 z-10 bg-gray-500 opacity-75 transition-opacity flex items-start justify-center"/>
        <div
            className="flex flex-col m-auto bg-white shadow-2xl mx-auto z-20 max-w-5xl rounded-md border-4 border-my-indigo">
            <div
                className="flex justify-between items-center border-b p-2 ml-5 text-5xl bg-white rounded-lg">
                <div>
                    <span className="font-medium uppercase">{filmName}</span>
                    <span className="text-4xl">&nbsp;{` de ${author}`}</span>
                </div>
                <div className="flex text-xl cursor-pointer text-3xl hover:text-yellow-400">
                    <AiFillCloseCircle/>
                </div>
            </div>
            <div className="ml-5 mt-5 text-2xl">{date}, {location}, {duration}</div>
            <div className="flex m-5 items-start">
                <img src={img} alt={img} className="h-1/2"/>
                <div className="px-5 leading-relaxed text-lg">{description}</div>
            </div>
        </div>
    </div>
)

export default Popup