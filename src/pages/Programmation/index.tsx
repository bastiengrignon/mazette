import React from "react"
import {programmationTitle} from "../../constants"

export const titleCSS = "text-2xl sm:text-3xl md:text-4xl xl:text-5xl uppercase font-bold text-test-red mt-4"
export const subtitleCSS = "text-base sm:text-lg md:text-2xl"

const dateCSS = "text-xl sm:text-2xl"
const progCSS = "text-2xl sm:text-4xl font-bold my-5 text-center bg-test-green bg-opacity-5"

const Programmation: React.FC = () => (
    <div className="flex flex-col z-10 page-content">
        <div className={titleCSS} id={programmationTitle.films}>{programmationTitle.films}</div>
        <div>
            <p className={dateCSS}>
                Vendredi 30 juillet
            </p>
            <p className={progCSS}>
                On vous dévoile bientôt la programmation !
            </p>
            <p className={dateCSS}>
                Samedi 31 juillet
            </p>
            <p className={progCSS}>
                On vous dévoile bientôt la programmation !
            </p>
        </div>
        {/*            <div
                className="mt-10 flex flex-wrap justify-evenly mx-auto">
                {
                    films.map((film, i) => (
                        <Film key={i} filmName={film.filmName} author={film.author}
                            description={film.description} date={film.date}
                            location={film.location} duration={film.duration}
                            imgThumbnail={film.imgThumbnail} imgExtended={film.imgExtended}/>
                    ))
                }
            </div>*/}
        <div className={titleCSS} id={programmationTitle.musique}>{programmationTitle.musique}</div>
        <p className={subtitleCSS}>
            Nous vous proposons une sélection de talents émergents de la scène musicale locale.
            Jazz, électro, musique tzigane, un tourbillon de genres musicaux pour le plaisir de
            vos oreilles !
        </p>
        <p className={progCSS}>
            Programmation à venir...
        </p>

        <div className={titleCSS} id={programmationTitle.concours}>{programmationTitle.concours}</div>
        <p className={subtitleCSS}>
            En amont du festival, l’association Mazette! organise un concours de courts-métrages entre les
            centres d’animation des quatre communes de l’Entente-Vallée. À travers la réalisation de
            courts-métrages sur le thème « C’est arrivé près de chez vous ! », nous souhaitons encourager les
            jeunes du territoire à découvrir le tournage et le montage d’un film.
            Tous les films participants au concours seront projetés en première partie des deux soirées de
            projection, et l’équipe Mazette! remettra le prix du Meilleur film à son court-métrage favori !
        </p>
    </div>
)

export default Programmation