import React from "react"
import {programmationTitle, films} from "../../constants"
import Film from "../../components/Film"

const Programmation: React.FC = () => (
    <div>
        <div className="flex flex-col z-10 text-black pl-0 lg:pl-24">
            <div
                className="text-left text-2xl sm:text-5xl uppercase font-bold w-full xl:w-1/2"
                id={programmationTitle.films}>
                {programmationTitle.films}
            </div>
            <div
                className="mt-10 flex flex-wrap justify-evenly mx-auto">
                {
                    films.map((film, i) => (
                        <Film key={i} filmName={film.filmName} author={film.author}
                            description={film.description} date={film.date}
                            location={film.location} duration={film.duration}
                            imgThumbnail={film.imgThumbnail} imgExtended={film.imgExtended}/>
                    ))
                }
            </div>
            <div
                className="text-left text-2xl sm:text-5xl uppercase font-bold w-full xl:w-1/2 my-5"
                id={programmationTitle.musique}>
                {programmationTitle.musique}
            </div>
            <div className="ml-2 text-base sm:text-lg md:text-2xl">
                Nous vous proposons une sélection de talents émergents de la scène musicale locale.
                Jazz, électro, musique tzigane, un tourbillon de genres musicaux pour le plaisir de
                vos oreilles !
            </div>
            <div
                className="text-left text-2xl sm:text-5xl uppercase font-bold w-full xl:w-1/2 my-52"
                id={programmationTitle.concours}>
                {programmationTitle.concours}
            </div>
        </div>
    </div>
)

export default Programmation