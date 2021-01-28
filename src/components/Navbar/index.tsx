import React from "react"
import { Link } from "react-router-dom"
import {RouterUrl, TabName} from "../../constants"
import {BiMenuAltRight} from "react-icons/bi"

const Navbar: React.FC = () => {
    return (
        <div className="flex text-white">
            <img className="absolute top-0 w-full" src={`${process.env.PUBLIC_URL}/img/wave.svg`}
                alt="Navbar Wave"/>
            <div className="flex flex-col z-10 uppercase mt-12 ml-24">
                <div className="text-8xl font-medium">
                    indigo
                </div>
                <div className="flex justify-end text-4xl font-medium">
                    festival
                </div>
            </div>
            <div className="fixed inline-flex items-center right-0 top-0 text-3xl font-light uppercase z-10 mt-10 mr-10 border border-red-600">
                <BiMenuAltRight className="transform rotate-180 text-6xl mx-2"/>
                <Link to={RouterUrl.home} className="px-4 hover:text-yellow-300">{TabName.festival}</Link>
                <Link to={RouterUrl.programmation} className="px-4 hover:text-yellow-300">{TabName.programmation}</Link>
                <Link to={RouterUrl.association} className="px-4 hover:text-yellow-300">{TabName.association}</Link>
                <Link to={RouterUrl.information} className="px-4 hover:text-yellow-300">{TabName.information}</Link>
            </div>
        </div>
    )
}

export default Navbar