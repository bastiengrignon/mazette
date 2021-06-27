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
}) => {
    const isMusic = () => (date === "" && location === "" && duration === "")
    return (
        <div
            className={`fixed z-30 inset-0 overflow-auto ${open ? "block" : "hidden"} flex`}>
            <div className="absolute inset-0 z-20 bg-gray-500 opacity-75 transition-opacity flex items-start justify-center"/>
            <div className="grid grid-cols-6 grid-rows-6 w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 h-3/4 sm:h-1/2 shadow-2xl m-auto z-50 bg-white border-4 border-test-green p-1">
                <div className="col-span-5 border-b border-gray-300 flex items-center">
                    <span className="font-semibold uppercase text-xl sm:text-2xl lg:text-3xl">
                        {filmName} { !isMusic() && <span className="text-base italic">de {author}</span> }
                    </span>
                </div>
                <div className="col-span-1 border-b border-gray-300 flex justify-end">
                    <AiFillCloseCircle className="cursor-pointer text-2xl sm:text-3xl hover:text-test-green"/>
                </div>
                <div className="col-span-6 text-xl">{ isMusic() ? `${author}` : `${date}, ${location}, ${duration}` }</div>
                <img className="row-span-6 col-span-6 sm:col-span-2 mx-auto h-full rounded" src={img} alt={img}/>
                <div className="row-span-4 col-span-6 sm:col-span-4 mx-2 text-base sm:text-lg leading-normal overflow-y-auto">{description}</div>
            </div>
        </div>
    )
}

export default Popup