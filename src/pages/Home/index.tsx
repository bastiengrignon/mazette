import React from "react"
import Navbar from "../../components/Navbar"

const Home: React.FC = () => (
    <div>
        <Navbar/>
        <div className="text-my-indigo">
            <div className="text-2xl md:text-4xl lg:text-5xl uppercase text-center my-4 lg:my-10">Le festival</div>
            <div className="text-base md:text-2xl lg:text-3xl text-center w-full lg:w-4/6 px-1 sm:px-4 mx-auto">
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
    </div>
)

export default Home