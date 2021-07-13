import React from "react"
import { Link } from "react-router-dom"
import Image from "../../components/Image"
import { RouterUrl } from "../../constants"
import { BiChevronLeft } from "react-icons/bi"

const LegalMention: React.FC = () => (
    <div>
        <div className="h-52 w-full bg-test-green flex justify-center py-5 px-5 sm:px-0">
            <Link to={ RouterUrl.home } title="Retour à l'accueil">
                <Image src={`${ process.env.PUBLIC_URL }/img/festival_mazette`} alt="Logo Mazette!"
                    className="h-full object-contain" isPng={ true }/>
            </Link>
        </div>
        <div className="p-10">
            <Link to={ RouterUrl.home } className="inline-flex items-center animate-bounce"><BiChevronLeft/> Retour</Link>
            <div className="text-3xl sm:text-4xl py-5">Mention légales</div>
            <p>
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