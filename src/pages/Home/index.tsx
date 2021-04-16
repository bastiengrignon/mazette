import React from "react"
import Countdown from "../../components/Countdown"

const Home: React.FC = () => (
    <div>
        <div className="text-black flex flex-row mt-16">
            <div className="text-right w-1/2">
                <div className="text-2xl md:text-4xl lg:text-6xl text-test-red uppercase text-center my-4 lg:my-10">Le festival</div>
                <div className="text-base md:text-2xl lg:text-3xl px-1 sm:px-4">
                    Nous souhaitons organiser un événement festif et culturel, axé sur la diffusion de
                    courts-métrages en plein air ainsi que la mise en valeur de musiciens locaux.
                    <br/>
                    Il se déroulera le 30 et 31 juillet 2021, les vendredi et samedi entre 18h et
                    minuit.
                    <br/><br/>
                    Chaque soirée sera scindée en 2 parties, la première partie (18h-21h) sera
                    consacrée...
                </div>
            </div>
            <img src={`${process.env.PUBLIC_URL}/img/branche_bleu_test.png`} alt="" className=""/>
        </div>
        {/*<Countdown deadline={"2021-07-31T12:00:00"} text={"Avant la première édition du festival"} invertColor={true}/>*/}
    </div>
)

export default Home