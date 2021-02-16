import React from "react"
import Navbar from "../../components/Navbar"
import {DropdownMenuInformation} from "../../constants"
import ContactForm from "../../components/ContactForm"
import Maps from "../../components/Maps"

const Information: React.FC = () => (
    <div>
        <Navbar/>
        <div
            className="flex flex-col z-10 text-my-indigo pl-0 lg:pl-24 w-auto">
            <div id={DropdownMenuInformation.festival}
                className="text-left text-2xl sm:text-5xl uppercase font-bold px-2">
                Boire & Manger
            </div>
            <div className="px-2 mt-5 text-black text-xl">
                Une buvette sera proposée sur le lieu du festival, avec bière, vin et jus de fruits,
                ainsi que de la petite restauration (galettes saucisses).
                <br/>
                Vous pourrez également profiter du bar-restaurant de La Payotte, situé à deux pas du
                lieu du festival.
            </div>
            <div id={DropdownMenuInformation.festival}
                className="text-left text-2xl sm:text-5xl uppercase font-bold px-2 mt-10">
                Venir au festival
            </div>
            <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 px-2 my-5">
                    <Maps/>
                </div>
                <div className="text-black text-xl mx-10">
                    <p><span className="font-extrabold">Adresse : </span>
                        La Payotte, Gué de Mazé, 49630 Mazé-Milon
                    </p>
                    <p className="pt-5"><span className="font-extrabold">En voiture : </span>
                        tourner à droite sur la D356, un parking sera prévu à l’entrée du festival
                    </p>
                    <p><span className="font-extrabold">En vélo : </span>
                        5 min du centre-ville de Mazé
                    </p>
                    <p><span className="font-extrabold">En covoiturage : </span>
                        utilisez Blablacar, pour une planète verte en bonne santé
                    </p>
                </div>
            </div>
            <div id={DropdownMenuInformation.contact}
                className="text-left text-2xl sm:text-5xl uppercase font-bold px-2 mt-10">
                Nous contacter
            </div>
            <ContactForm/>
        </div>
    </div>
)

export default Information