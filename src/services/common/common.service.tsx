import { Skeleton } from "antd"
import Interweave, { Node } from "interweave"
import React from "react"
import { IText, TextType } from "../admin/text/text.interface"
import Link from "../../components/Link"

export const fetchedText = (texts: IText[], textType: TextType, loading: boolean, skeletonRows = 3): React.ReactNode =>
    texts.filter(value => value.type === textType).map((text, key) => (
        <Skeleton key={ key } loading={ loading } active={ true } paragraph={ { rows: skeletonRows } }>
            <Interweave className="whitespace-pre-wrap" content={ text.text } transform={ transformLink }/>
        </Skeleton>
    ))

const transformLink = (node: HTMLElement, children: Node[]): React.ReactNode => {
    if (node.tagName.toLowerCase() === "a")
        return (<Link src={ node.getAttribute("href") || "" }>{ children }</Link>)
}