import React, { useEffect, useState } from "react"
import loadable from "@loadable/component"
import { informationTitle } from "../../constants"
import { titleCSS } from "../Programmation"
import { IText, TextType } from "../../services/admin/text/text.interface"
import { TextService } from "../../services/admin/text/text.service"
import { Skeleton } from "antd"

const ContactForm = loadable(() => import("../../components/ContactForm"))
const Maps = loadable(() => import("../../components/Maps"))

const Information: React.FC = () => {
    const [texts, setTexts] = useState<IText[]>([])
    const [isTextsLoading, setTextsLoading] = useState<boolean>(false)

    useEffect(() => {
        setTextsLoading(true)
        TextService.getAll().then(texts => setTexts(texts)).finally(() => setTextsLoading(false))
    }, [])

    return (
        <div className="flex flex-col z-10 page-content">
            <div className={ titleCSS }>{ informationTitle.food }</div>
            <div className="px-2 mt-5 text-black text-xl">
                {
                    texts.filter(value => value.type === TextType.food).map((text, key) =>
                        <Skeleton key={ key } loading={ isTextsLoading }>
                            <p className="whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: text.text.replace(/La Payotte/g,
                                    "<a href='https://www.lapayotte.net' target='_blank' class='link'>La Payotte</a>") }}/>
                        </Skeleton>
                    )
                }
            </div>
            <div className={ titleCSS }>{ informationTitle.festival }</div>
            <div className="grid grid-rows-1 grid-cols-6">
                <div className="col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-2">
                    <Maps/>
                </div>
                <div
                    className="my-auto col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-4 text-black text-lg sm:text-xl mx-2 sm:mx-10 space-y-5">
                    {
                        texts.filter(value => value.type === TextType.journey).map((text, key) =>
                            <Skeleton key={ key } loading={ isTextsLoading }>
                                <p className="whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={ { __html: text.text.replace(/ligne 403/g,
                                        "<a href='/assets/ligne403_schedule.pdf' target='_blank' class='link'>ligne 403</a>") } }/>
                            </Skeleton>
                        )
                    }
                </div>
            </div>
            <div className={ titleCSS }>{ informationTitle.contact }</div>
            <ContactForm/>
        </div>
    )
}

export default Information