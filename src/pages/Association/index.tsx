import React, { useEffect, useState } from "react"
import loadable from "@loadable/component"
import { associationTitle, staticImgFolder } from "../../constants"
import { subtitleCSS, titleCSS } from "../Programmation"
import { ITrombinoscope } from "../../services/admin/trombinoscope/trombinoscope.interface"
import { TrombinoscopeService } from "../../services/admin/trombinoscope/trombinoscope.service"
import { AdvancedImage } from "@cloudinary/react"
import { cloudinary } from "../../index"
import { Skeleton } from "antd"
import { IText, TextType } from "../../services/admin/text/text.interface"
import { TextService } from "../../services/admin/text/text.service"

const Anchor = loadable(() => import("../../components/Anchor"))
const Image = loadable(() => import("../../components/Image"))

const Association: React.FC = () => {
    const [trombinoscopes, setTrombinoscopes] = useState<ITrombinoscope[]>([])
    const [isTrombinoscopeLoading, setTrombinoscopeLoading] = useState<boolean>(false)
    const [texts, setTexts] = useState<IText[]>([])
    const [isTextsLoading, setTextsLoading] = useState<boolean>(false)

    useEffect(() => {
        setTrombinoscopeLoading(true)
        setTextsLoading(true)
        TrombinoscopeService.getAll()
            .then(trombinoscopes => setTrombinoscopes(trombinoscopes))
            .finally(() => setTrombinoscopeLoading(false))
        TextService.getAll()
            .then(texts => setTexts(texts))
            .finally(() => setTextsLoading(false))
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
                        {
                            texts.filter(value => value.type === TextType.association).map((text, key) =>
                                <Skeleton key={ key } loading={ isTextsLoading }>
                                    <p className="whitespace-pre-wrap">{ text.text }</p>
                                </Skeleton>
                            )
                        }
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
                        {
                            texts.filter(value => value.type === TextType.adhere).map((text, key) =>
                                <Skeleton key={ key } loading={ isTextsLoading }>
                                    <p key={ key } className="whitespace-pre-wrap">{ text.text }</p>
                                </Skeleton>
                            )
                        }
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