import React from "react"
import loadable from "@loadable/component"

const Anchor = loadable(() => import("../../components/Anchor"))
const Vignette = loadable(() => import("../../components/Vignette"))
import { programmationTitle } from "../../constants"
import { musics } from "../../constants/music"
import { films } from "../../constants/film"
import Link from "../../components/Link"

export const titleCSS = "text-2xl sm:text-3xl uppercase font-bold text-red mt-2 sm:mt-12" +
    " mb-4 font-sifonn"
export const subtitleCSS = "text-base sm:text-lg md:text-xl"

const dateCSS = "text-xl sm:text-2xl mt-4 sm:mt-6 mb-2 sm:mb-8 font-sifonn"

const Programmation: React.FC = () => (
    <div className="flex flex-col z-10 page-content">
        <Anchor id={ programmationTitle.musique } className={ titleCSS }/>
        <p className={ subtitleCSS }>
            Chaque soirée débutera à 19h par deux concerts, avec une sélection de talents émergents
            de la scène musicale locale. Electro pop, jazz ou encore musique de l’Est seront au
            rendez-vous, dans un décor champêtre et estival !
        </p>
        <p className={ dateCSS }>Vendredi 30 juillet</p>
        <div className="grid grid-cols-2 gap-2 sm:gap-10">
            {
                musics.filter(music => music.publicationDate === "30").map((music, key) => (
                    <Vignette key={ key } type="music" properties={ music }/>
                ))
            }
        </div>
        <p className={ dateCSS }>Samedi 31 juillet</p>
        <div className="grid grid-cols-2 gap-2 sm:gap-10">
            {
                musics.filter(music => music.publicationDate === "31").map((music, key) => (
                    <Vignette key={ key } type="music" properties={ music }/>
                ))
            }
        </div>

        <Anchor id={ programmationTitle.films } className={ titleCSS }/>
        <p>A la tombée de la nuit à partir de 21h30, une programmation éclectique pour découvrir
            le court-métrage sur grand écran et sous toutes ses formes, de la fiction à
            l’animation, de la comédie au documentaire.
        </p>
        <p className={ dateCSS }>Vendredi 30 juillet</p>
        <div className="grid grid-cols-2 gap-2 sm:gap-10">
            {
                films.filter(film => film.publicationDate === "30").map((film, key) => (
                    <Vignette key={ key } type="movie" properties={ film }/>
                ))
            }
        </div>
        <p className={ dateCSS }>Samedi 31 juillet</p>
        <div className="grid grid-cols-2 gap-2 sm:gap-10">
            {
                films.filter(film => film.publicationDate === "31").map((film, key) => (
                    <Vignette key={ key } type="movie" properties={ film }/>
                ))
            }
        </div>

        <Anchor id={ programmationTitle.concours } className={ titleCSS }/>
        <p className={ subtitleCSS }>
            Le grand gagnant du concours est les centre de loisirs du Cap’ados. Un grand bravo à eux
            pour leur super court-métrage (<Link src="https://www.youtube.com/watch?v=SJ_JGDxUZZw">Court-métrage</Link>).
            Bravo également aux trois autres participants : Les bois d’anjou, Mazé-Milon et l’accueil de loisirs de Brion.
            <br/><br/>
            En amont du festival, l’association Mazette! organise un concours de courts-métrages
            entre les centres d’animation des quatre communes de l’Entente-Vallée. À travers la
            réalisation de courts-métrages sur le thème « C’est arrivé près de chez vous ! »,
            nous souhaitons encourager les jeunes du territoire à découvrir le tournage et le
            montage d’un film. <span className="font-avenirBL">Tous les films participants au
            concours seront projetés à 21h30 le vendredi 30 juillet en première partie des
            projections</span>, et l’équipe Mazette! remettra le prix du Meilleur film à son
            court-métrage favori !
        </p>
    </div>
)

export default Programmation