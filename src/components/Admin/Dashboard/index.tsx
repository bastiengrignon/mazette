import loadable from '@loadable/component'
import React, { useEffect, useState } from 'react'

import { Button, Card, Checkbox, Collapse, Form, List, Modal, Select, Skeleton, Typography, message } from 'antd'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'

import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { CommonService, IText, TextService, TextType } from '../../../services'

const Navigation = loadable(() => import('../../../pages/admin/Navigation'))
const TinyMceEditor = loadable(() => import('../TinyMceEditor'))
const { Panel } = Collapse
const { Option } = Select

const selectTextType = [
    { text: 'Musique', value: TextType.music },
    { text: 'Court-métrage', value: TextType.movie },
    { text: 'Concours', value: TextType.contest },
    { text: 'Association', value: TextType.association },
    { text: 'Mazette c\'est qui', value: TextType.team },
    { text: 'Adhérer', value: TextType.adhere },
    { text: 'Boire et manger', value: TextType.food },
    { text: 'Venir au festival', value: TextType.journey },
    { text: 'Accueil', value: TextType.home },
    { text: 'Info', value: TextType.info },
    { text: 'Edition 2021', value: TextType.previousEdition }
]

const Dashboard: React.FC = () => {
    const [isTextLoading, setIsTextLoading] = useState<boolean>(false)
    const [texts, setTexts] = useState<IText[]>([])
    const [newTexts, setNewTexts] = useState<IText[]>(texts)
    const [infoText, setInfoText] = useState<IText>({} as IText)

    const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false)
    const [editingId, setEditingId] = useState<number>(0)
    const [formRowAddition] = Form.useForm()
    const [formRowEdition] = Form.useForm()

    useEffect(() => {
        setIsTextLoading(true)
        TextService.getAll()
            .then(texts => setTexts(texts))
            .finally(() => setIsTextLoading(false))
        TextService.getByTextType(TextType.info).then(text => setInfoText(text))
    }, [newTexts])

    const isEditing = (item: IText): boolean => item.id === editingId

    const saveRow = async (id: number): Promise<void> => {
        const hideLoadingMessage = message.loading('Modification en cours', 0)
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
                    message.success('Modification effectuée', 2.5)
                })
            }).catch(err => console.log('Validate Failed: ', err))
            .finally(() => setEditingId(0))
    }

    const editRow = (item: Partial<IText>): void => {
        formRowEdition.setFieldsValue({
            text: '',
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
                            rules={ [{ required: true, message: 'Entrez le texte' }] }>
                            <TinyMceEditor textareaName="text" initialValue={ item.text } form={ formRowEdition }/>
                        </Form.Item>
                        :
                        <div className="w-full whitespace-pre-line">{ item.text }</div>
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
        const hideLoadingMessage = message.loading('Ajout en cours', 0)
        formRowAddition.validateFields().then(values => {
            TextService.create(values)
                .then(text => setTexts([...texts, text]))
                .catch(err => console.log(err))
                .finally(() => {
                    hideLoadingMessage()
                    message.success('Texte ajouté', 2.5)
                    formRowAddition.resetFields()
                })
            setAddRowModalVisible(false)
        }).catch(err => message.warn('Validation failed: ', err))
    }

    const collapseTitle = (textType: string): string => CommonService.capitalize(selectTextType.find(item => item.value === textType)?.text || '')

    const updateInformationsVisibility = (event: CheckboxChangeEvent) => {
        TextService.update(infoText?.id || 0, { ...infoText, isShowed: event.target.checked }).then(res =>
            setInfoText({
                ...infoText,
                ...res
            }))
    }
    
    return (
        <Navigation>
            <div className="grid grid-cols-12 gap-2 md:gap-5">
                <Card bordered={ false } className="rounded-lg col-span-12 lg:col-span-8">
                    <Button type="primary" className="my-4 button" onClick={ () => setAddRowModalVisible(true) }>
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
                <Card bordered={false} className="rounded-lg col-span-12 lg:col-span-4">
                    <div className="text-3xl text-center mb-5">Informations générales</div>
                    <Checkbox onChange={updateInformationsVisibility} checked={infoText?.isShowed}>
                        Afficher les informations sur la page d&apos;accueil
                    </Checkbox>
                </Card>
            </div>
            <Modal title="Nouveau texte" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } cancelText="Annuler"
                okButtonProps={{ className: 'button' }} onOk={ handleOkModal }>
                <Form form={ formRowAddition }>
                    <Form.Item label="Texte" name="text" rules={ [{ required: true, message: 'Entrez du texte' }] }>
                        <TinyMceEditor textareaName="text" form={ formRowAddition }/>
                    </Form.Item>
                    <Form.Item label="Type" name="type" rules={ [{ required: true, message: 'Entrez le type de texte' }] }>
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