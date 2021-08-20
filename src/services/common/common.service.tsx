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
                "ul": sanitizeHtml.simpleTransform("ul", { class: "list-disc"}),
                "iframe": (tagName, attribs) => ({
                    tagName: "iframe",
                    attribs: {
                        ...attribs,
                        class: "absolute inset-0 w-full h-full"
                    }
                })
            },
            allowedAttributes: {
                "ul": [ "class" ],
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


const editorPluginsConfig = "advlist autolink lists link media wordcount emoticons"
const editorToolbarConfig = "undo redo | formatselect | bold italic underline strikethrough link " +
    "media emoticons | outdent indent bullist numlist"


interface TinyMceEditorProps {
    textareaName: string
    initialValue?: string
    editorRef?: React.MutableRefObject<unknown>
    form: FormInstance
}

/**
 * TinyMCE Editor with global config for multiple usage
 * @param textareaName name of textarea for form sending
 * @param initialValue default value of editor
 * @param editorRef reference of editor
 * @param form form instance for setting fields value
 * @constructor
 */
export const TinyMceEditor: React.FC<TinyMceEditorProps> = ({ textareaName, initialValue, editorRef, form }) => (
    <Editor apiKey={ process.env.REACT_APP_KEY_TINYMCE } textareaName={ textareaName }
        initialValue={ initialValue } toolbar={ editorToolbarConfig } plugins={ editorPluginsConfig }
        onInit={(event, editor) => editorRef ? editorRef.current = editor : null }
        onEditorChange={(value) => form.setFields([{ name: textareaName, value: value }]) }
        init={{
            menubar: false,
            /* eslint-disable */
            forced_root_block: false,
            no_newline_selector: "",
            entity_encoding: "raw",
            /* eslint-enable */
            language: "fr_FR"
        }}
    />
)