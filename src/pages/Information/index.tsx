import React from "react"
import Navbar from "../../components/Navbar"
import {DropdownMenuInformation} from "../../constants"
import ContactForm from "../../components/ContactForm"

const Information: React.FC = () => (
    <div>
        <Navbar/>
        <div
            className="flex flex-col z-10 text-my-indigo mt-10 sm:mt-28 md:mt-56 pl-0 lg:pl-24 w-auto">
            <div id={DropdownMenuInformation.festival}
                className="text-left text-2xl sm:text-5xl uppercase font-bold px-2">
                Venir au festival
            </div>
            <div id={DropdownMenuInformation.contact}
                className="text-left text-2xl sm:text-5xl uppercase font-bold px-2">
                Nous contacter
            </div>
            <ContactForm/>
        </div>
    </div>
)

export default Information