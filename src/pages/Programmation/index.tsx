import React from "react"
import { programmationTitle } from "../../constants"
import { musics } from "../../constants/music"
import Vignette from "../../components/Vignette"

export const titleCSS = "text-2xl sm:text-3xl uppercase font-bold text-test-red mt-12 mb-4 font-sifonn"
export const subtitleCSS = "text-base sm:text-lg md:text-xl"

const dateCSS = "text-xl sm:text-2xl mt-4"
const progCSS = "text-2xl sm:text-4xl font-bold my-5 text-center bg-test-green bg-opacity-5 w-full"

const Programmation: React.FC = () => (
    <div className="flex flex-col z-10 page-content">
        <div className={titleCSS} id={programmationTitle.musique}>{programmationTitle.musique}</div>
        <p className={subtitleCSS}>
            Chaque soirée débutera à 19h par deux concerts, avec une sélection de talents émergents de la scène musicale
            locale. Electro pop, jazz ou encore musique de l’Est seront au rendez-vous, dans un décor champêtre et
            estival !
        </p>
        <p className={dateCSS}>
            Vendredi 30 juillet
        </p>
        <div className="grid grid-cols-2 gap-1 sm:gap-10">
            <Vignette type="music" properties={musics[0]} />
            <Vignette type="music" properties={musics[1]} />
        </div>
        <p className={dateCSS}>
            Samedi 31 juillet
        </p>
        <div className="grid grid-cols-2 gap-1 sm:gap-10">
            <Vignette type="music" properties={musics[2]} />
            <Vignette type="music" properties={musics[3]} />
        </div>

        <div className={titleCSS} id={programmationTitle.films}>{programmationTitle.films}</div>
        <p className={dateCSS}>
            Vendredi 30 juillet
        </p>
        <div className="grid grid-cols-1 gap-10">
            {/*<Vignette type="movie" properties={films[0]} />*/}
            {/*<Vignette type="movie" properties={films[1]} />*/}
            <p className={progCSS}>Programmation à venir...</p>
        </div>
        <p className={dateCSS}>
            Samedi 31 juillet
        </p>
        <div className="grid grid-cols-1 gap-10">
            <p className={progCSS}>Programmation à venir...</p>
            {/*<Vignette type="movie" properties={films[2]} />*/}
            {/*<Vignette type="movie" properties={films[2]} />*/}
        </div>

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