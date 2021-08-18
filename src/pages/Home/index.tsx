import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import loadable from "@loadable/component"

import { RouterUrl, staticImgFolder } from "../../constants"
import { IText, TextType } from "../../services/admin/text/text.interface"
import { TextService } from "../../services/admin/text/text.service"
import { formattedFetchedText } from "../../services/common/common.service"

const Image = loadable(() => import("../../components/Image"))

const Home: React.FC = () => {
    const [texts, setTexts] = useState<IText[]>([])
    const [isTextsLoading, setTextsLoading] = useState<boolean>(false)

    useEffect(() => {
        setTextsLoading(true)
        TextService.getAll().then(texts => setTexts(texts)).finally(() => setTextsLoading(false))
    }, [])


    return (
        <div
            className="page-content mt-0 sm:mt-10 2xl:mt-0">
            <div className="font-avenirBL">
                <p className="text-3xl sm:text-5xl text-red my-1 font-avenirBLO text-center">&#9888; Infos
                    pass sanitaire &#9888;</p>
                <div className="flex justify-center">
                    { formattedFetchedText(texts, TextType.covid, isTextsLoading) }
                </div>
                <div className="flex justify-center">
                    <Link to={ RouterUrl.passSanitaire } className="link">
                        Cliquer ici pour en savoir plus
                    </Link>
                </div>
            </div>
            <hr className="my-3 sm:my-10"/>
            <div className="flex md:inline-flex flex-col md:flex-row items-center justify-center">
                <Image src={ `${ staticImgFolder }/transat` } alt="Transat"
                    className="flex-none h-24 md:h-32 w-auto" loading={ isTextsLoading } />
                <div className="text-base md:text-xl lg:text-2xl text-justify w-full md:w-2/3">
                    { formattedFetchedText(texts, TextType.home, isTextsLoading) }
                </div>
                <Image src={ `${ staticImgFolder }/transat` } alt="Transat"
                    className="flex-none h-24 md:h-32 w-auto" loading={ isTextsLoading }/>
            </div>
        </div>
    )
}

export default Home