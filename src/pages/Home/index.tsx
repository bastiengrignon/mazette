import React from "react"
import Countdown from "../../components/Countdown"

const Home: React.FC = () => (
    <div>
        <div className="flex flex-col sm:flex-row w-full mt-5 sm:mt-1 md:mt-5 lg:mt-10 text-black">
            <div className="w-full sm:w-2/3">
                <p className="text-base md:text-2xl lg:text-3xl px-1 sm:px-4 py-4">
                    Du cinéma, de la musique et du plein air, le festival Mazette! c’est ce combo chaleureux et festif que nous vous proposons de vivre les 30 et 31 juillet 2021, sur les bords de l’Authion à Mazé-Milon (49).
                    <br/>
                    Une programmation éclectique sur deux soirées pour découvrir le court-métrage sur grand écran et sous toutes ses formes, de la fiction à l’animation, de la comédie au documentaire.
                    <br/>
                    Le festival Mazette! c’est aussi des concerts, avec une sélection de talents émergents de la scène musicale locale. Electro pop, jazz ou encore musique de l’Est seront au rendez-vous, dans un décor champêtre et estival !
                </p>
            </div>
            <div className="w-full sm:w-1/3 flex justify-center items-center">
                <img src={`${process.env.PUBLIC_URL}/img/branche_bleu_test.png`} alt="Branche Bleu" className="w-44 md:w-60 lg:w-64 2xl:w-72"/>
            </div>
        </div>
        {/*<Countdown deadline={"2021-07-31T12:00:00"} text={"Avant la première édition du festival"} invertColor={true}/>*/}
    </div>
)

export default Home