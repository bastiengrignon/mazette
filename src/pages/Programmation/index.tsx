import React, { useEffect, useState } from "react"
import loadable from "@loadable/component"
import { programmationTitle } from "../../constants"
import { IMusic } from "../../services/admin/music/music.interface"
import { MusicService } from "../../services/admin/music/music.service"
import { MovieService } from "../../services/admin/movie/movie.service"
import { IMovie } from "../../services/admin/movie/movie.interface"
import { IText, TextType } from "../../services/admin/text/text.interface"
import { TextService } from "../../services/admin/text/text.service"
import { formattedFetchedText } from "../../services/common/common.service"

const Anchor = loadable(() => import("../../components/Anchor"))
const Vignette = loadable(() => import("../../components/Vignette"))

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

    return (
        <div className="flex flex-col z-10 page-content">
            <Anchor id={ programmationTitle.musique } className={ titleCSS }/>
            <p className={ subtitleCSS }>
                { formattedFetchedText(texts, TextType.music, isTextsLoading) }
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
                { formattedFetchedText(texts, TextType.movie, isTextsLoading) }
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
                { formattedFetchedText(texts, TextType.contest, isTextsLoading) }
            </p>
        </div>
    )
}

export default Programmation