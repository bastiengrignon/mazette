import React from "react"
import {programmationTitle, films} from "../../constants"
import Film from "../../components/Film"

const titleCSS = "text-2xl sm:text-5xl uppercase font-bold w-full text-test-red my-5"
const subtitleCSS = "text-black text-base sm:text-lg md:text-2xl normal-case font-normal mr-4"

const Programmation: React.FC = () => (
    <div>
        <div className="flex flex-col z-10 text-black pl-0 lg:pl-24">
            <div className={titleCSS} id={programmationTitle.films}>
                {programmationTitle.films}
                <p className="text-black text-3xl font-normal normal-case">
                    Vendredi 30 juillet
                </p>
                <p className="text-5xl font-bold text-black normal-case my-10">
                    On vous dévoile bientôt la programmation !
                </p>
                <p className="text-black text-3xl font-normal normal-case">
                    Samedi 31 juillet
                </p>
                <p className="text-5xl font-bold text-black normal-case my-10">
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
            <div className={titleCSS} id={programmationTitle.musique}>
                {programmationTitle.musique}
                <p className={subtitleCSS}>
                    Nous vous proposons une sélection de talents émergents de la scène musicale locale.
                    Jazz, électro, musique tzigane, un tourbillon de genres musicaux pour le plaisir de
                    vos oreilles !
                </p>
            </div>

            <div
                className={titleCSS} id={programmationTitle.concours}>
                {programmationTitle.concours}
                <p className={subtitleCSS}>
                    En amont du festival, l’association Mazette! organise un concours de courts-métrages entre les
                    centres d’animation des quatre communes de l’Entente-Vallée. À travers la réalisation de
                    courts-métrages sur le thème « C’est arrivé près de chez vous ! », nous souhaitons encourager les
                    jeunes du territoire à découvrir le tournage et le montage d’un film.
                    Tous les films participants au concours seront projetés en première partie des deux soirées de
                    projection, et l’équipe Mazette! remettra le prix du Meilleur film à son court-métrage favori !
                </p>
            </div>
        </div>
    </div>
)

export default Programmation