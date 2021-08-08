import React, { useEffect, useState } from "react"
import loadable from "@loadable/component"

const Anchor = loadable(() => import("../../components/Anchor"))
const Vignette = loadable(() => import("../../components/Vignette"))
import { programmationTitle } from "../../constants"
import { IMusic } from "../../services/admin/music/music.interface"
import { MusicService } from "../../services/admin/music/music.service"
import { MovieService } from "../../services/admin/movie/movie.service"
import { IMovie } from "../../services/admin/movie/movie.interface"
import { IText, TextType } from "../../services/admin/text/text.interface"
import { TextService } from "../../services/admin/text/text.service"
import { Skeleton } from "antd"

export const titleCSS = "text-2xl sm:text-3xl uppercase font-bold text-red mt-2 sm:mt-12" +
    " mb-4 font-sifonn"
export const subtitleCSS = "text-base sm:text-lg md:text-xl"

const dateCSS = "text-xl sm:text-2xl mt-4 sm:mt-6 mb-2 sm:mb-8 font-sifonn"

const Programmation: React.FC = () => {
    const [musics, setMusics] = useState<IMusic[]>([])
    const [movies, setMovies] = useState<IMovie[]>([])
    const [texts, setTexts] = useState<IText[]>([])

    const [isTextsLoading, setTextsLoading] = useState<boolean>(false)
    const [isMusicLoading, setIsMusicLoading] = useState<boolean>(false)
    const [isMovieLoading, setIsMovieLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsMusicLoading(true)
        setIsMovieLoading(true)
        setTextsLoading(true)
        MusicService.getAll().then(musics => setMusics(musics)).finally(() => setIsMusicLoading(false))
        MovieService.getAll().then(movies => setMovies(movies)).finally(() => setIsMovieLoading(false))
        TextService.getAll().then(texts => setTexts(texts)).finally(() => setTextsLoading(false))
    }, [])

    // Todo: use parseText for global link usage
    // eslint-disable-next-line
    const parseText = (text: IText[]) => {
        return text.filter(value => value.type === TextType.music).map((text, key) => (
            <Skeleton key={ key } loading={ isTextsLoading }>
                <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                    __html: text.text.replace(/link:/g, "$'")}}/>
            </Skeleton>
        ))
    }

    return (
        <div className="flex flex-col z-10 page-content">
            <Anchor id={ programmationTitle.musique } className={ titleCSS }/>
            <p className={ subtitleCSS }>
                {
                    texts.filter(value => value.type === TextType.music).map((text, key) =>
                        <Skeleton key={ key } loading={ isTextsLoading }>
                            <p className="whitespace-pre-wrap">{ text.text }</p>
                        </Skeleton>
                    )
                }
            </p>
            <p className={ dateCSS }>Vendredi 30 juillet</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-10">
                {
                    musics.filter(music => music.publicationDate === "30").map((music, key) => (
                        <Vignette key={ key } type="music" properties={ music } loading={ isMusicLoading }/>
                    ))
                }
            </div>
            <p className={ dateCSS }>Samedi 31 juillet</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-10">
                {
                    musics.filter(music => music.publicationDate === "31").map((music, key) => (
                        <Vignette key={ key } type="music" properties={ music } loading={ isMusicLoading }/>
                    ))
                }
            </div>

            <Anchor id={ programmationTitle.films } className={ titleCSS }/>
            <p className={ subtitleCSS }>
                {
                    texts.filter(value => value.type === TextType.movie).map((text, key) =>
                        <Skeleton key={ key } loading={ isTextsLoading }>
                            <p className="whitespace-pre-wrap">{ text.text }</p>
                        </Skeleton>
                    )
                }
            </p>
            <p className={ dateCSS }>Vendredi 30 juillet</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-10">
                {
                    movies.filter(film => film.publicationDate === "30").map((film, key) => (
                        <Vignette key={ key } type="movie" properties={ film } loading={ isMovieLoading }/>
                    ))
                }
            </div>
            <p className={ dateCSS }>Samedi 31 juillet</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-10">
                {
                    movies.filter(film => film.publicationDate === "31").map((film, key) => (
                        <Vignette key={ key } type="movie" properties={ film } loading={ isMovieLoading }/>
                    ))
                }
            </div>

            <Anchor id={ programmationTitle.concours } className={ titleCSS }/>
            <p className={ subtitleCSS }>
                {
                    texts.filter(value => value.type === TextType.contest).map((text, key) =>
                        <Skeleton key={ key } loading={ isTextsLoading }>
                            <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={ { __html: text.text } }/>
                        </Skeleton>
                    )
                }
            </p>
        </div>
    )
}

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