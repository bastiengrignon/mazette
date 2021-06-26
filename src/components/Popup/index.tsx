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
        className={`fixed z-30 inset-0 overflow-auto ${open ? "block" : "hidden"} flex`}>
        <div
            className="absolute inset-0 z-20 bg-gray-500 opacity-75 transition-opacity flex items-start justify-center"/>
        <div
            className="flex flex-col m-auto bg-white shadow-2xl mx-auto z-30 max-w-5xl border-4 border-test-green">
            <div
                className="flex justify-between items-start lg:items-center border-b p-2 mt-5 sm:mt-0 ml-5 text-xl md:text-5xl bg-white">
                <div>
                    <span className="font-medium uppercase">{filmName}</span>
                    <span className="text-base md:text-4xl">&nbsp;{` de ${author}`}</span>
                </div>
                <div className="flex cursor-pointer text-2xl sm:text-3xl hover:text-test-green">
                    <AiFillCloseCircle/>
                </div>
            </div>
            <div className="mx-5 mt-5 text-2xl">{date}, {location}, {duration}</div>
            <div className="flex flex-col sm:flex-row m-5 items-start">
                <img src={img} alt={img} className="w-56 lg:w-1/3 h-auto mx-auto rounded"/>
                <div className="px-5 mt-4 sm:mt-0 text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed">{description}</div>
            </div>
        </div>
    </div>
)

export default Popup