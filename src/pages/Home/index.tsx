import React from "react"
import Image from "../../components/Image"
import { staticImgFolder } from "../../constants"

const Home: React.FC = () => (
    <div className="page-content flex md:inline-flex flex-col md:flex-row items-center justify-center mt-0 sm:mt-10 2xl:mt-0">
        <Image src={`${staticImgFolder}/transat`} alt="Transat" className="flex-none h-24 md:h-32 w-auto"/>
        <p className="text-base md:text-xl lg:text-2xl text-justify w-full md:w-2/3">
            Du cinéma, de la musique et du plein air, le festival Mazette! c’est ce combo chaleureux et festif que
            nous vous proposons de vivre les 30 et 31 juillet 2021, sur les bords de l’Authion à Mazé-Milon (49).
            <br/><br/>
            Une programmation éclectique sur deux soirées pour découvrir le court-métrage sur grand écran et sous
            toutes ses formes, de la fiction à l’animation, de la comédie au documentaire.
            <br/>
            Le festival Mazette! c’est aussi des concerts, avec une sélection de talents émergents de la scène
            musicale locale. Electro pop, jazz ou encore musique de l’Est seront au rendez-vous, dans un décor
            champêtre et estival !
        </p>
        <Image src={`${staticImgFolder}/transat`} alt="Transat" className="flex-none h-24 md:h-32 w-auto"/>
    </div>
)

export default Home