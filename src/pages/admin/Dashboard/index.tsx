import React, { useEffect, useState } from "react"
import Navigation from "../Navigation"
import {
    Button,
    Card,
    Collapse,
    Form,
    List,
    message,
    Modal,
    Select,
    Skeleton,
    Typography
} from "antd"
import { IText, TextType } from "../../../services/admin/text/text.interface"
import { TextService } from "../../../services/admin/text/text.service"
import { associationTitle, informationTitle, programmationTitle } from "../../../constants"
import { CommonService } from "../../../services/admin/common/common.service"
import { EditOutlined, SaveOutlined } from "@ant-design/icons"
import { TinyMceEditor } from "../../../services/common/common.service"

const { Panel } = Collapse
const { Option } = Select

const selectTextType = [
    { text: "Musique", value: TextType.music },
    { text: "Court-métrage", value: TextType.movie },
    { text: "Concours", value: TextType.contest },
    { text: "Association", value: TextType.association },
    { text: "Mazette c'est qui", value: TextType.team },
    { text: "Adhérer", value: TextType.adhere },
    { text: "Boire et manger", value: TextType.food },
    { text: "Venir au festival", value: TextType.journey },
    { text: "Accueil", value: TextType.home },
    { text: "Pass sanitaire", value: TextType.covid }
]

const Dashboard: React.FC = () => {
    const [isTextLoading, setIsTextLoading] = useState<boolean>(false)
    const [texts, setTexts] = useState<IText[]>([])
    const [newTexts, setNewTexts] = useState<IText[]>(texts)

    const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false)
    const [editingId, setEditingId] = useState<number>(0)
    const [formRowAddition] = Form.useForm()
    const [formRowEdition] = Form.useForm()

    useEffect(() => {
        setIsTextLoading(true)
        TextService.getAll()
            .then(texts => setTexts(texts))
            .finally(() => setIsTextLoading(false))
    }, [newTexts])

    const isEditing = (item: IText): boolean => item.id === editingId

    const saveRow = async (id: number): Promise<void> => {
        const hideLoadingMessage = message.loading("Modification en cours", 0)
        formRowEdition.validateFields()
            .then(row => {
                TextService.update(id, row).then(res => {
                    const index = texts.findIndex(text => text.id === id)
                    setNewTexts(texts.splice(index, 1, {
                        ...texts[index],
                        ...res
                    }))
                }).finally(() => {
                    hideLoadingMessage()
                    message.success("Modification effectuée", 2.5)
                })
            }).catch(err => console.log("Validate Failed: ", err))
            .finally(() => setEditingId(0))
    }

    const editRow = (item: Partial<IText>): void => {
        formRowEdition.setFieldsValue({
            text: "",
            ...item
        })
        setEditingId(item.id || 0)
    }

    const cancel = (): void => setEditingId(0)

    const renderListTextItem = (item: IText, key: number): React.ReactNode => {
        const editable = isEditing(item)
        return (
            <List.Item key={ key } className="inline-flex items-center justify-between w-full">
                {
                    editable ?
                        <Form.Item className="w-full" name="text" initialValue={ item.text }
                            rules={ [{ required: true, message: "Entrez le texte" }] }>
                            <TinyMceEditor textareaName="text" initialValue={ item.text } form={ formRowEdition }/>
                        </Form.Item>
                        :
                        <div className="whitespace-pre-wrap">{ item.text }</div>
                }
                {
                    editable ?
                        <span className="inline-flex justify-around space-x-3 ml-5">
                            <div className="text-blue-500 cursor-pointer"
                                onClick={ () => saveRow(item.id) }>
                                <SaveOutlined/>
                            </div>
                            <Typography.Link onClick={ cancel }>Annuler</Typography.Link>
                        </span>
                        :
                        <div className="ml-5 text-blue-500 cursor-pointer" onClick={ () => editRow(item) }>
                            <EditOutlined/>
                        </div>
                }
            </List.Item>
        )
    }

    const handleOkModal = async (): Promise<void> => {
        const hideLoadingMessage = message.loading("Ajout en cours", 0)
        formRowAddition.validateFields().then(values => {
            TextService.create(values)
                .then(text => setTexts([...texts, text]))
                .catch(err => console.log(err))
                .finally(() => {
                    hideLoadingMessage()
                    message.success("Texte ajouté", 2.5)
                    formRowAddition.resetFields()
                })
            setAddRowModalVisible(false)
        }).catch(err => message.warn("Validation failed: ", err))
    }

    const collapseTitle = (textType: string): string => {
        let tmpTextType
        if (textType === TextType.music) tmpTextType = programmationTitle.musique
        if (textType === TextType.movie) tmpTextType = programmationTitle.films
        if (textType === TextType.contest) tmpTextType = programmationTitle.concours
        if (textType === TextType.association) tmpTextType = associationTitle.association
        if (textType === TextType.team) tmpTextType = associationTitle.equipe
        if (textType === TextType.adhere) tmpTextType = associationTitle.adherer
        if (textType === TextType.food) tmpTextType = informationTitle.food
        if (textType === TextType.journey) tmpTextType = informationTitle.festival
        if (textType === TextType.home) tmpTextType = "Accueil"
        if (textType === TextType.covid) tmpTextType = "Pass sanitaire"
        return CommonService.capitalize(tmpTextType)
    }

    return (
        <Navigation>
            <div className="grid grid-cols-6 gap-2 md:gap-5">
                <Card bordered={ false } className="rounded-lg col-span-6 lg:col-span-4">
                    <Button type="primary" className="my-4" onClick={ () => setAddRowModalVisible(true) }>
                        Ajouter un texte
                    </Button>
                    <Collapse accordion={ true } onChange={ cancel } defaultActiveKey={ 0 }>
                        {
                            Object.values(TextType).map((textType, key) => (
                                <Panel key={ key } header={ collapseTitle(textType) } className="whitespace-pre-wrap">
                                    <Skeleton avatar={ true } active={ true } loading={ isTextLoading }>
                                        <Form form={ formRowEdition } component={ false }>
                                            <List dataSource={ texts.filter(value => value.type === textType) }
                                                renderItem={ renderListTextItem }/>
                                        </Form>
                                    </Skeleton>
                                </Panel>)
                            )
                        }
                    </Collapse>
                </Card>
            </div>
            <Modal title="Nouveau texte" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } cancelText="Annuler"
                onOk={ handleOkModal }>
                <Form form={ formRowAddition }>
                    <Form.Item label="Texte" name="text" rules={ [{ required: true, message: "Entrez du texte" }] }>
                        <TinyMceEditor textareaName="text" form={ formRowAddition }/>
                    </Form.Item>
                    <Form.Item label="Type" name="type" rules={ [{ required: true, message: "Entrez le type de texte" }] }>
                        <Select>
                            {
                                selectTextType.map((type, key) =>
                                    <Option key={ key } value={ type.value }>{ type.text }</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Navigation>
    )
}
export default Dashboard