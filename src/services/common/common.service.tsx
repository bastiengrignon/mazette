import { FormInstance, Skeleton } from "antd"
import React from "react"
import sanitizeHtml from "sanitize-html"
import { IText, TextType } from "../admin/text/text.interface"
import { Editor } from "@tinymce/tinymce-react"

/**
 * Get fetched text from API, then sanitize it & modify for a and iframe tag
 * @param texts text to show
 * @param textType type of texte to show
 * @param loading text is loading from API
 * @param skeletonRows number of rows to show when loading
 */
export const formattedFetchedText = (texts: IText[], textType: TextType, loading: boolean, skeletonRows = 3): React.ReactNode => (
    texts.filter(value => value.type === textType).map((text, key) => {
        const sanitizedHTML = sanitizeHtml(text.text, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([ "img", "iframe" ]),
            transformTags: {
                "a": (tagName, attribs) => ({
                    tagName: "a",
                    attribs: {
                        href: attribs.href,
                        target: "_blank",
                        class: "link"
                    }
                }),
                "iframe": (tagName, attribs) => ({
                    tagName: "iframe",
                    attribs: {
                        ...attribs,
                        class: "absolute inset-0 w-full h-full"
                    }
                })
            },
            allowedAttributes: {
                "a": [ "href", "target", "alt", "class" ],
                "iframe": [ "src", "class", "allow", "allowfullscreen" ]
            },
            allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"]
        }).replaceAll(/<iframe(.+)<\/iframe>/g,
            "<div class='aspect-w-16 aspect-h-9 relative'>$&</div>")
        return (
            <Skeleton key={ key } loading={ loading } active={ true } paragraph={ { rows: skeletonRows } }>
                <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={ { __html: sanitizedHTML } }/>
            </Skeleton>
        )
    })
)


const transformLink = (node: HTMLElement, children: Node[]): React.ReactNode => {
    if (node.tagName.toLowerCase() === "a")
        return (<Link src={ node.getAttribute("href") || "" }>{ children }</Link>)
}