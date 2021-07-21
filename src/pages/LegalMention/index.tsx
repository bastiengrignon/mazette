import React from "react"
import { Link } from "react-router-dom"
import Image from "../../components/Image"
import { RouterUrl, staticImgFolder } from "../../constants"
import { BiChevronLeft } from "react-icons/bi"

const LegalMention: React.FC = () => (
    <div>
        <div className="h-52 w-full bg-green flex justify-center py-5 px-5 sm:px-0">
            <Link to={ RouterUrl.home } title="Retour à l'accueil">
                <Image src={`${ staticImgFolder }/festival_mazette`} alt="Logo Mazette!"
                    className="h-full object-contain" isPng={ true }/>
            </Link>
        </div>
        <div className="p-10">
            <Link to={ RouterUrl.home } className="inline-flex items-center animate-bounce"><BiChevronLeft/> Retour</Link>
            <div className="text-3xl sm:text-4xl py-5">Mention légales</div>
            <p>
                Le site festivalmazette.fr est édité par l’association Mazette!, dont le siège
                social est situé au 48 rue Principale, 49630 Mazé-Milon. <br/>
                Email : contact@festivalmazette.fr <br/>
                Numéro de SIRET : 880 530 050 00017 <br/>
                Directrice de la publication : Léa Germain <br/>
            </p>
            <p className="mt-5">
                <span className="font-avenirBL">Le site web est hébergé sur Vercel : </span> <br/>
                Vercel Inc. <br/>
                340 S Lemon Ave #4133 <br/>
                Walnut, CA 91789 <br/>
                privacy@vercel.com <br/>
            </p>
        </div>
    </div>
)

export default LegalMention