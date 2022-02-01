import loadable from '@loadable/component'
import React, { useEffect, useState } from 'react'

import { FESTIVAL_ID, programmationTitle } from '../../constants'
import { FestivalService, IFestival } from '../../services/admin/festival'
import { IMovie, IMusic, MovieService, MusicService, TextType } from '../../services'
import { formatDates, getDatesBetween, numericDateRegexp } from '../../lib/date'

const Anchor = loadable(() => import('../../components/Anchor'))
const Vignette = loadable(() => import('../../components/Vignette'))
const FormattedText = loadable(() => import('../../components/Admin/FormattedText'))

export const titleCSS = 'text-2xl sm:text-3xl uppercase font-bold text-red mt-2 sm:mt-12' +
    ' mb-4 font-sifonn'
export const subtitleCSS = 'text-base sm:text-lg md:text-xl'

const dateCSS = 'text-xl sm:text-2xl mt-4 sm:mt-6 mb-2 sm:mb-8 font-sifonn capitalize'

const Programmation: React.FC = () => {
    const [festival, setFestival] = useState<IFestival>({} as IFestival)
    const [musics, setMusics] = useState<IMusic[]>([])
    const [movies, setMovies] = useState<IMovie[]>([])

    const [isMusicLoading, setIsMusicLoading] = useState<boolean>(false)
    const [isMovieLoading, setIsMovieLoading] = useState<boolean>(false)

    useEffect(() => {
        FestivalService.getById(FESTIVAL_ID).then(setFestival)
        setIsMusicLoading(true)
        setIsMovieLoading(true)
        MusicService.getAll().then(setMusics).finally(() => setIsMusicLoading(false))
        MovieService.getAll().then(setMovies).finally(() => setIsMovieLoading(false))
    }, [])

    const getFestivalDate = (festival: IFestival) => {
        const { startDate, endDate } = festival
        const festivalDates = getDatesBetween(new Date(startDate), new Date(endDate), true)
        return formatDates(festivalDates)
    }

    return (
        <div className="flex flex-col z-10 page-content">
            <Anchor id={ programmationTitle.musique } className={ titleCSS }/>
            <div className={ subtitleCSS }>
                <FormattedText textType={ TextType.music }/>
            </div>
            {
                festival.id && getFestivalDate(festival).map((date, index) => {
                    const day = date.match(numericDateRegexp)?.[0]
                    return (
                        <div key={index}>
                            <p className={ dateCSS }>{ date }</p>
                            <div className="grid grid-cols-2 gap-2 sm:gap-10">
                                {
                                    musics.filter(music => music.publicationDate === day).map((music, key) => (
                                        <Vignette key={ key } type="music" properties={ music } loading={ isMusicLoading }/>
                                    ))
                                }
                            </div>
                        </div>
                    )

                })
            }

            <Anchor id={ programmationTitle.films } className={ titleCSS }/>
            <div className={ subtitleCSS }>
                <FormattedText textType={ TextType.movie }/>
            </div>
            {
                festival.id && getFestivalDate(festival).map((date, index) => {
                    const day = date.match(numericDateRegexp)?.[0]
                    return (
                        <div key={index}>
                            <p className={ dateCSS }>{ date }</p>
                            <div className="grid grid-cols-2 gap-2 sm:gap-10">
                                {
                                    movies.filter(film => film.publicationDate === day).map((film, key) => (
                                        <Vignette key={ key } type="movie" properties={ film } loading={ isMovieLoading }/>
                                    ))
                                }
                            </div>
                        </div>
                    )

                })
            }
            <Anchor id={ programmationTitle.concours } className={ titleCSS }/>
            <div className={ subtitleCSS }>
                <FormattedText textType={ TextType.contest }/>
            </div>
        </div>
    )
}

export default Programmation