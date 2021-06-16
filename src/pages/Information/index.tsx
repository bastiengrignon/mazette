import React from "react"
import {informationTitle} from "../../constants"
import ContactForm from "../../components/ContactForm"
import Maps from "../../components/Maps"

const Information: React.FC = () => (
    <div>
        <div
            className="flex flex-col z-10 text-black pl-0 lg:pl-24 w-auto">
            <div className="text-left text-2xl sm:text-5xl uppercase font-bold px-2 text-test-red">
                {informationTitle.food}
            </div>
            <div className="px-2 mt-5 text-black text-xl">
                Une buvette sera proposée sur le lieu du festival, dans le respect des règles sanitaires en vigueur.
                <br/>
                Bière, vin et jus de fruit locaux seront à la carte !
                <br/>
                Vous pourrez également profiter du bar-restaurant de La Payotte, situé à deux pas du
                lieu du festival.
            </div>
            <div className="text-left text-2xl sm:text-5xl uppercase font-bold px-2 mt-10 text-test-red">
                {informationTitle.festival}
            </div>
            <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 px-2 my-5">
                    <Maps/>
                </div>
                <div className="text-black text-lg sm:text-xl mx-10 space-y-3">
                    <p><span className="font-extrabold">Adresse : </span>
                        Gué de Mazé, 49630 Mazé-Milon (en face de La Payotte)
                    </p>
                    <p><span className="font-extrabold">En voiture : </span>
                        depuis Angers, en arrivant au premier rond-point de Mazé tourner à droite sur la D55 (direction
                        Saint-Mathurin), un parking sera prévu à l’entrée du festival
                    </p>
                    <p>
                        <span className="font-extrabold">En bus : </span>
                        depuis Angers ligne 403, arrêt Mazé-Milon - Carrefour route de Fayet
                    </p>
                    <p><span className="font-extrabold">En vélo : </span>
                        5 minutes depuis le centre-ville de Mazé
                    </p>
                    <p><span className="font-extrabold">En covoiturage : </span>
                        covoiturez avec Blablacar ou entre amis !
                    </p>
                </div>
            </div>
            <div className="text-left text-2xl sm:text-5xl uppercase font-bold px-2 mt-10 text-test-red">
                {informationTitle.contact}
            </div>
            <ContactForm/>
        </div>
    </div>
)

export default Information