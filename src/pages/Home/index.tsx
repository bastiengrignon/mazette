import React from "react"
import Countdown from "../../components/Countdown"

const Home: React.FC = () => (
    <div>
        <div className="flex flex-col sm:flex-row w-full mt-5 sm:mt-1 md:mt-5 lg:mt-0 text-black">
            <div className="w-full sm:w-2/3">
                <div className="text-test-red uppercase text-center text-2xl md:text-4xl lg:text-6xl">Le festival</div>
                <p className="text-base md:text-2xl lg:text-3xl px-1 sm:px-4">
                    Nous souhaitons organiser un événement festif et culturel, axé sur la diffusion de
                    courts-métrages en plein air ainsi que la mise en valeur de musiciens locaux.
                    <br/>
                    Il se déroulera le 30 et 31 juillet 2021, les vendredi et samedi entre 18h et
                    minuit.
                    <br/><br/>
                    Chaque soirée sera scindée en 2 parties, la première partie (18h-21h) sera
                    consacrée...
                </p>
            </div>
            <div className="w-full sm:w-1/3 flex justify-center items-center">
                <img src={`${process.env.PUBLIC_URL}/img/branche_bleu_test.png`} alt="Branche Bleu" className="w-44 md:w-60 lg:w-64 2xl:w-72"/>
            </div>
        </div>
        <Countdown deadline={"2021-07-31T12:00:00"} text={"Avant la première édition du festival"} invertColor={true}/>
    </div>
)

export default Home