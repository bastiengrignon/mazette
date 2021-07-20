import React from "react"
import ContactForm from "../../components/ContactForm"
import Link from "../../components/Link"
import Maps from "../../components/Maps"
import { externalLinks, informationTitle } from "../../constants"
import { titleCSS } from "../Programmation"

const Information: React.FC = () => (
    <div className="flex flex-col z-10 page-content">
        <div className={ titleCSS }>{ informationTitle.food }</div>
        <div className="px-2 mt-5 text-black text-xl">
            Une buvette sera proposée sur le lieu du festival, dans le respect des règles sanitaires
            en vigueur.
            <br/>
            Bière, vin et jus de fruit locaux seront à la carte !
            <br/>
            Vous pourrez également profiter du bar-restaurant
            de <Link src={ externalLinks.others.payotte }>
                La Payotte
            </Link>, situé à deux pas du lieu du festival.
        </div>
        <div className={ titleCSS }>{ informationTitle.festival }</div>
        <div className="grid grid-rows-1 grid-cols-6">
            <div className="col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-2">
                <Maps/>
            </div>
            <div className="my-auto col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-4 text-black text-lg sm:text-xl mx-2 sm:mx-10 space-y-5">
                <p><span className="italic">Adresse : </span>
                    Gué de Mazé, 49630 Mazé-Milon (en face du Bar-Restaurant La Payotte)
                </p>
                <p><span className="italic">En voiture : </span>
                    depuis Angers, en arrivant au premier rond-point de Mazé tourner à droite sur la
                    D55 (direction
                    Saint-Mathurin), un parking sera prévu à l’entrée du festival
                </p>
                <p><span className="italic">En bus : </span>
                    depuis Angers <Link src={externalLinks.others.schedule}>ligne 403</Link>,
                    arrêt Mazé-Milon - Carrefour route de Fayet
                </p>
                <p><span className="italic">En vélo : </span>
                    5 minutes depuis le centre-ville de Mazé
                </p>
            </div>
        </div>
        <div className={ titleCSS }>{ informationTitle.contact }</div>
        <ContactForm/>
    </div>
)

export default Information