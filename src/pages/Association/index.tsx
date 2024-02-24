import { AdvancedImage } from '@cloudinary/react'
import { Skeleton } from 'antd'
import loadable from '@loadable/component'
import React, { useEffect, useState } from 'react'

import Vignette from '../../components/Vignette'
import { cloudinary } from '../../index'
import { isBetweenDates } from '../../lib/date'
import { associationTitle, staticImgFolder } from '../../constants'
import { FestivalService, IFestival } from '../../services/admin/festival'
import {
    IMovie,
    IMusic,
    ITrombinoscope,
    MovieService,
    MusicService,
    TextType,
    TrombinoscopeService
} from '../../services'
import { MAZETTE, MAZETTE_WHO, SECTION_COMPETITION, SECTION_MOVIES, SECTION_MUSICS } from './Association.contants'
import { subtitleCSS, titleCSS } from '../Programmation'

const Anchor = loadable(() => import('../../components/Anchor'))
const Image = loadable(() => import('../../components/Image'))
const FormattedText = loadable(() => import('../../components/Admin/FormattedText'))

const Association: React.FC = () => {
    const [festival, setFestival] = useState<IFestival>({} as IFestival)
    const [trombinoscopes, setTrombinoscopes] = useState<ITrombinoscope[]>([])
    const [musics, setMusics] = useState<IMusic[]>([])
    const [movies, setMovies] = useState<IMovie[]>([])

    const [isTrombinoscopeLoading, setTrombinoscopeLoading] = useState<boolean>(false)
    const [isMusicLoading, setIsMusicLoading] = useState<boolean>(false)
    const [isMovieLoading, setIsMovieLoading] = useState<boolean>(false)

    useEffect(() => {
        setTrombinoscopeLoading(true)
        setIsMusicLoading(true)
        setIsMovieLoading(true)
        FestivalService.getLastFestival().then(setFestival)
        TrombinoscopeService.getAll()
            .then(setTrombinoscopes)
            .finally(() => setTrombinoscopeLoading(false))
        MusicService.getAll().then(setMusics).finally(() => setIsMusicLoading(false))
        MovieService.getAll().then(setMovies).finally(() => setIsMovieLoading(false))

    }, [])

    return (
        <div>
            <div className="page-content">
                <Anchor id={ associationTitle.association } className={ titleCSS }>
                    { associationTitle.association } <span className="italic"> { MAZETTE }</span>
                </Anchor>
                <div className="flex flex-col sm:flex-row items-center md:grid grid-cols-3">
                    <div className="w-1/2 sm:w-full h-auto float-left col-span-1">
                        <Image src={ `${ staticImgFolder }/logo_mazette` }
                            alt="Association Mazette Image"/>
                    </div>
                    <div className="text-sm sm:text-base md:text-2xl col-span-2">
                        <FormattedText textType={ TextType.association }/>
                    </div>
                </div>
                <Anchor id={ associationTitle.equipe } className={ titleCSS }>
                    { MAZETTE_WHO }
                </Anchor>
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                    {
                        trombinoscopes.map((trombinoscope, key) => (
                            <Skeleton key={ key } avatar={ true } active={ true } loading={ isTrombinoscopeLoading }>
                                <AdvancedImage cldImg={ cloudinary.image(trombinoscope.image) }
                                    alt={ trombinoscope.name }
                                    className="w-36 sm:w-48 xl:w-60 h-auto mx-auto"/>
                            </Skeleton>
                        ))
                    }
                </div>
                <Anchor id={ associationTitle.adherer } className={ titleCSS }/>
                <div className="flex flex-col items-start">
                    <div className={ `${ subtitleCSS } my-0 sm:my-2` }>
                        <FormattedText textType={ TextType.adhere }/>
                    </div>
                    <iframe id="haWidget"
                        src="https://www.helloasso.com/associations/mazette/adhesions/adhesion-association-mazette/widget"
                        className="w-full px-2 h-screen pr-0 md:pr-10"/>
                </div>
                <Anchor id={ associationTitle.previousEdition } className={ titleCSS }/>
                <div className={ `${ subtitleCSS } my-0 sm:my-2` }>
                    <FormattedText textType={ TextType.previousEdition }/>
                </div>
                <div className="text-3xl my-5">{ SECTION_MUSICS }</div>
                <div className="grid grid-cols-4 gap-2 sm:gap-10">
                    {
                        musics.filter(music => !isBetweenDates(festival.startDate, festival.endDate, music.publicationDate)).map((music, key) => (
                            <Vignette key={ key } type="music" properties={ music } loading={ isMusicLoading }/>
                        ))
                    }
                </div>
                <div className="text-3xl my-5">{ SECTION_MOVIES }</div>
                <div className="grid grid-cols-4 gap-2 sm:gap-10">
                    {
                        movies.filter(movie => !isBetweenDates(festival.startDate, festival.endDate, movie.publicationDate)).map((film, key) => (
                            <Vignette key={ key } type="movie" properties={ film } loading={ isMovieLoading }/>
                        ))
                    }
                </div>
                <div className="text-3xl my-5">{ SECTION_COMPETITION }</div>
                <div className="w-1/2 mx-auto">
                    <FormattedText textType={ TextType.contest }/>
                </div>
            </div>
        </div>
    )
}

export default Association
