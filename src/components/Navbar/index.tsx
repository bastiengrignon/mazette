import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {RouterUrl, TabName} from "../../constants"
import {BiMenuAltRight} from "react-icons/bi"

const activeClass = "text-yellow-300 hover:font-normal"
const inactiveClass = "text-white hover:text-yellow-300"

const Navbar: React.FC = () => {
    const history = useHistory()
    const [burgerOpen, setBurgerOpen] = useState<boolean>(false)

    return (
        <div className="flex text-white">
            <img className="absolute top-0 w-full" src={`${process.env.PUBLIC_URL}/img/wave.svg`}
                alt="Navbar Wave"/>
            <div
                className={"flex flex-col z-10 uppercase sm:mt-2 md:mt-5 lg:mt-6 xl:mt-12" +
                " md:ml-10 lg:ml-10 xl:ml-24 m-auto"}>
                <div className="flex text-xl sm:text-4xl md:text-5xl font-medium">
                    indigo
                </div>
                <div
                    className={`flex justify-end text-sm sm:text-2xl lg:text-3xl font-light sm:font-medium ${burgerOpen ? "mb-16 sm:mb-0" : "mb-0"}`}>
                    festival
                </div>
            </div>
            <div
                className={`fixed lg:absolute flex flex-col lg:flex-row text-right items-end xl:items-center ${burgerOpen ? "bg-my-indigo" : ""} w-full lg:w-3/4 right-0 top-0 text-sm sm:text-base md:text-2xl xl:text-3xl font-light uppercase z-0 mt-0 mr-0 md:mt-2 lg:mt-5 xl:mt-10 lg:mr-2 xl:mr-10`}>
                <BiMenuAltRight
                    className="transform lg:rotate-180 text-3xl rounded-md flex items-end md:text-5xl mx-2 block lg:hidden"
                    onClick={() => setBurgerOpen(!burgerOpen)}/>
                <Link to={RouterUrl.home}
                    className={`px-4 py-1 ${burgerOpen ? "block" : "hidden"} lg:block w-full ${history.location.pathname === RouterUrl.home
                        ? activeClass : inactiveClass}`}>
                    {TabName.festival}
                </Link>
                <Link to={RouterUrl.programmation}
                    className={`px-4 py-1 ${burgerOpen ? "block" : "hidden"} lg:block w-full ${history.location.pathname === RouterUrl.programmation ? activeClass : inactiveClass}`}>
                    {TabName.programmation}
                </Link>
                <Link to={RouterUrl.association}
                    className={`px-4 py-1 ${burgerOpen ? "block" : "hidden"} lg:block w-full ${history.location.pathname === RouterUrl.association ? activeClass : inactiveClass}`}>
                    {TabName.association}
                </Link>
                <Link to={RouterUrl.information}
                    className={`px-4 py-1 ${burgerOpen ? "block" : "hidden"} lg:block w-full whitespace-nowrap mb-0 md:mb-4 lg:mb-0  ${history.location.pathname === RouterUrl.information ? activeClass : inactiveClass}`}>
                    {TabName.information}
                </Link>
            </div>
        </div>
    )
}

export default Navbar