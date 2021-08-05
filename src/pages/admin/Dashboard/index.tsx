import React, { useEffect, useState } from "react"
import Navigation from "../Navigation"
import {
    Card,
    List,
    Skeleton,
    Typography
} from "antd"
import { IText } from "../../../services/admin/text/text.interface"
import { TextService } from "../../../services/admin/text/text.service"

const Dashboard: React.FC = () => {
    const [isTextLoading, setIsTextLoading] = useState<boolean>(false)
    const [texts, setTexts] = useState<IText[]>([])

    useEffect(() => {
        setIsTextLoading(true)
        TextService.getAll()
            .then(texts => setTexts(texts))
            .finally(() => setIsTextLoading(false))
    }, [])

    const renderListTextItem = (item: IText, key: number) => (
        <List.Item key={ key } className="inline-flex items-center justify-between w-full">
            <div>{ item.text }</div>
            <Typography.Link className="ml-5" href="" onClick={() => console.log("")}>
                Modifier
            </Typography.Link>
        </List.Item>
    )

    return (
        <Navigation>
            <div className="grid grid-cols-6">
                <Card bordered={ false } className="rounded-lg col-span-3">
                    <p className="text-xl mb-2">Textes d’introduction : </p>
                    <Skeleton avatar={ true } active={ true } loading={ isTextLoading } >
                        <List dataSource={ texts } renderItem={ renderListTextItem }/>
                    </Skeleton>
                </Card>
            </div>
        </Navigation>
    )
}
export default Dashboard