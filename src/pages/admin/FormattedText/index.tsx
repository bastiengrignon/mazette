import { IText, TextType } from "../../../services/admin/text/text.interface"
import React, { useEffect, useState } from "react"
import sanitizeHtml from "sanitize-html"
import { Skeleton } from "antd"
import { TextService } from "../../../services/admin/text/text.service"

interface FormattedTextProps {
    textType: TextType
    skeletonRows?: number
}

const FormattedText: React.FC<FormattedTextProps> = ({ textType, skeletonRows = 3 }) => {
    const [texts, setTexts] = useState<IText[]>([])
    const [isTextsLoading, setTextsLoading] = useState<boolean>(false)

    useEffect(() => {
        setTextsLoading(true)
        TextService.getAll().then(texts => setTexts(texts)).finally(() => setTextsLoading(false))
    }, [])

    return (
        <>
            {
                texts.filter(value => value.type === textType).map((text, key) => {
                    const sanitizedHTML = sanitizeHtml(text.text, {
                        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe"]),
                        transformTags: {
                            "a": (tagName, attribs) => ({
                                tagName: "a",
                                attribs: {
                                    href: attribs.href,
                                    target: "_blank",
                                    class: "link"
                                }
                            }),
                            "ul": sanitizeHtml.simpleTransform("ul", { class: "list-disc" }),
                            "iframe": (tagName, attribs) => ({
                                tagName: "iframe",
                                attribs: {
                                    ...attribs,
                                    class: "absolute inset-0 w-full h-full"
                                }
                            })
                        },
                        allowedAttributes: {
                            "ul": ["class"],
                            "a": ["href", "target", "alt", "class"],
                            "iframe": ["src", "class", "allow", "allowfullscreen"]
                        },
                        allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"]
                    }).replaceAll(/<iframe(.+)<\/iframe>/g,
                        "<div class='aspect-w-16 aspect-h-9 relative'>$&</div>")
                    return (
                        <Skeleton key={ key } loading={ isTextsLoading } active={ true } paragraph={ { rows: skeletonRows } }>
                            <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={ { __html: sanitizedHTML } }/>
                        </Skeleton>
                    )
                })
            }
        </>
    )
}
export default FormattedText