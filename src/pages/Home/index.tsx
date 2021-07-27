import React from "react"
import { Link } from "react-router-dom"
import loadable from "@loadable/component"

const Image = loadable(() => import("../../components/Image"))
import { RouterUrl, staticImgFolder } from "../../constants"

const Home: React.FC = () => (
    <div
        className="page-content mt-0 sm:mt-10 2xl:mt-0">
        <div className="font-avenirBL">
            <p className="text-3xl sm:text-5xl text-red my-1 font-avenirBLO text-center">&#9888; Infos pass sanitaire &#9888;</p>
            <p className="flex justify-center">
                Pour la sécurité de tous.tes et dans le respect des nouvelles mesures
                gouvernementales, il vous sera demandé à l’entrée du site un pass sanitaire valide,
                c’est-à-dire soit : <br/>
                &nbsp;&nbsp; - un certificat de vaccination <br/>
                &nbsp;&nbsp; - un test PCR ou antigène négatif datant de moins de 48h <br/>
                &nbsp;&nbsp; - une attestation de rétablissement du covid-19 de moins de 6 mois <br/>
            </p>
            <div className="flex justify-center">
                <Link to={ RouterUrl.passSanitaire } className="link">Cliquer ici pour en savoir plus</Link>
            </div>
        </div>
        <hr className="my-3 sm:my-10"/>
        <div className="flex md:inline-flex flex-col md:flex-row items-center justify-center">
            <Image src={ `${ staticImgFolder }/transat` } alt="Transat"
                className="flex-none h-24 md:h-32 w-auto"/>
            <p className="text-base md:text-xl lg:text-2xl text-justify w-full md:w-2/3">
                Du cinéma, de la musique et du plein air, le festival Mazette! c’est ce combo
                chaleureux et festif que nous vous proposons de vivre les 30 et 31 juillet 2021,
                sur les bords de l’Authion à Mazé-Milon (49).
                <br/><br/>
                Une programmation éclectique sur deux soirées pour découvrir le court-métrage sur
                grand écran et sous toutes ses formes, de la fiction à l’animation, de la comédie
                au documentaire.
                <br/>
                Le festival Mazette! c’est aussi des concerts, avec une sélection de talents
                émergents de la scène musicale locale. Electro pop, jazz ou encore musique de
                l’Est seront au rendez-vous, dans un décor champêtre et estival !
            </p>
            <Image src={ `${ staticImgFolder }/transat` } alt="Transat"
                className="flex-none h-24 md:h-32 w-auto"/>
        </div>
    </div>
)

export default Home