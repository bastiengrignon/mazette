import React, { useEffect, useState } from "react"
import loadable from "@loadable/component"

const Anchor = loadable(() => import("../../components/Anchor"))
const Image = loadable(() => import("../../components/Image"))
import { associationTitle, staticImgFolder } from "../../constants"
import { subtitleCSS, titleCSS } from "../Programmation"
import { ITrombinoscope } from "../../services/admin/trombinoscope/trombinoscope.interface"
import { TrombinoscopeService } from "../../services/admin/trombinoscope/trombinoscope.service"
import { AdvancedImage } from "@cloudinary/react"
import { cloudinary } from "../../index"
import { Skeleton } from "antd"

const Association: React.FC = () => {
    const [trombinoscopes, setTrombinoscopes] = useState<ITrombinoscope[]>([])
    const [isTrombinoscopeLoading, setIsTrombinoscopeLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsTrombinoscopeLoading(true)
        TrombinoscopeService.getAll().then(trombinoscopes => setTrombinoscopes(trombinoscopes)).finally(() => setIsTrombinoscopeLoading(false))
    }, [])

    return (
        <div>
            <div className="page-content">
                <Anchor id={ associationTitle.association } className={ titleCSS }>
                    { associationTitle.association } <span className="italic"> Mazette!</span>
                </Anchor>
                <div className="flex flex-col sm:flex-row items-center md:grid grid-cols-3">
                    <div className="w-1/2 sm:w-full h-auto float-left col-span-1">
                        <Image src={ `${ staticImgFolder }/logo_mazette` }
                            alt="Association Mazette Image"/>
                    </div>
                    <p className="text-sm sm:text-base md:text-2xl col-span-2">
                        Mazette!, c’est l’histoire d’une bande de copines qui, pour la plupart, ont
                        grandi ensemble sur le territoire Mazéiais. C’est une furieuse envie de
                        rassembler nos forces et nos savoir-faire afin de développer des événements
                        culturels au cœur de ces lieux qui nous ont vu évoluer et de les partager
                        avec
                        ses habitants.
                        <br/><br/>
                        Porté en nous depuis longtemps et mûri aux fils de nos années d’amitié, ce
                        désir
                        fort de projet collectif s’est concrétisé en novembre 2019, avec la création
                        de l’association Mazette! <br/><br/>
                    </p>
                </div>
                <Anchor id={ associationTitle.equipe } className={ titleCSS }>
                    Mazette! C’est qui ?
                </Anchor>
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                    {
                        trombinoscopes.map((trombinoscope, key) => (
                            <Skeleton key={ key } avatar={ true } active={ true } loading={ isTrombinoscopeLoading }>
                                <AdvancedImage cldImg={ cloudinary.image(trombinoscope.image) }
                                    alt={ trombinoscope.name } className="w-36 sm:w-48 xl:w-60 h-auto mx-auto"/>
                            </Skeleton>
                        ))
                    }
                </div>
                <Anchor id={ associationTitle.adherer } className={ titleCSS }/>
                <div className="flex flex-col items-start">
                    <p className={ `${ subtitleCSS } my-0 sm:my-2` }>
                        Vous souhaitez rejoindre l’association ou l’aider à développer ses activités
                        ?
                        Adhérez!
                    </p>
                    <iframe id="haWidget" scrolling="auto"
                        src="https://www.helloasso.com/associations/mazette/adhesions/adhesion-association-mazette/widget"
                        className="w-full px-2 h-screen pr-0 md:pr-10"/>
                </div>
            </div>
        </div>
    )
}

export default Association