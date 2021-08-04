import React, { Dispatch, SetStateAction } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import { AdvancedImage } from "@cloudinary/react"
import { cloudinary } from "../../index"

interface PopupProps {
    name: string
    author: string
    description: string
    date: string
    location: string
    duration: string
    img: string
    visibility: Dispatch<SetStateAction<boolean>>
}

const Popup: React.FC<PopupProps> = ({
    name,
    author,
    description,
    date,
    location,
    duration,
    img,
    visibility
}) => {
    const isMusic = (): boolean => (date === "" && location === "" && duration === "")

    return (
        <div className="fixed z-30 inset-0 overflow-auto flex">
            <div
                className="absolute inset-0 z-20 bg-gray-500 opacity-75 transition-opacity flex items-start justify-center"/>
            <div
                className="grid grid-cols-6 grid-rows-6 w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 h-5/6 sm:h-1/2 shadow-2xl m-auto z-50 bg-white border-4 border-green p-3">
                <div className="col-span-6 row-span-1 inline-flex justify-between items-center">
                    <span className="font-semibold uppercase text-xl sm:text-2xl lg:text-3xl">
                        { name } { !isMusic() && <span className="text-base italic">de { author }</span> }
                    </span>
                    <AiFillCloseCircle
                        className="cursor-pointer w-6 h-auto text-2xl sm:text-3xl hover:text-green place-items-start"
                        onClick={ () => visibility(false) }/>
                </div>
                <div className="col-span-6 row-span-1 text-xl border-t border-gray-300">
                    { isMusic() ? `${ author }` : `${ date }, ${ location }, ${ duration }` }
                </div>
                <div className="col-span-6 sm:col-span-3 md:col-span-2 row-span-2 sm:row-span-4 mx-auto">
                    <AdvancedImage cldImg={ cloudinary.image(`${img}`) } alt={ img } className="rounded h-full"/>
                </div>
                <div className="col-span-6 sm:col-span-3 md:col-span-4 row-span-2 sm:row-span-4 mx-2 text-base sm:text-lg leading-normal overflow-y-auto">
                    { description }
                </div>
            </div>
        </div>
    )
}

export default Popup