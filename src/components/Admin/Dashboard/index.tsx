import loadable from '@loadable/component'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Checkbox,
    Collapse,
    DatePicker,
    Form,
    InputNumber,
    List,
    Modal,
    Select,
    Skeleton,
    Typography,
    message
} from 'antd'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'

import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { FESTIVAL_ID } from '../../../constants'
import { CommonService, IText, TextService, TextType } from '../../../services'
import { FestivalService, IFestival } from '../../../services/admin/festival'

const Navigation = loadable(() => import('../../../pages/admin/Navigation'))
const TinyMceEditor = loadable(() => import('../TinyMceEditor'))
const { Panel } = Collapse
const { Option } = Select
const { RangePicker } = DatePicker

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
    const [festival, setFestival] = useState<IFestival>({} as IFestival)

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
        FestivalService.getById(FESTIVAL_ID).then(festival => setFestival(festival))
    }, [newTexts])

    const isEditing = (item: IText): boolean => item.id === editingId

    const saveRow = async (id: number): Promise<void> => {
        const hideLoadingMessage = message.loading('Modification en cours', 0)
        formRowEdition.validateFields()
            .then(row => {
                TextService.update(id, row)
                    .then(res => {
                        const index = texts.findIndex(text => text.id === id)
                        setNewTexts(texts.splice(index, 1, {
                            ...texts[index],
                            ...res
                        }))
                        message.success('Modification effectuée', 2.5)
                    })
                    .catch(err => message.error(`Erreur lors de la modification: ${ err }`, 2.5))
                    .finally(() => {
                        hideLoadingMessage()
                        formRowEdition.resetFields()
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
                        <Form.Item className="w-full" name="text" initialValue={ item.text } rules={ [{ required: true, message: 'Entrez le texte' }] }>
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
                .then(text => {
                    setTexts([...texts, text])
                    message.success('Texte ajouté', 2.5)
                })
                .catch(err => message.error(`Erreur lors de l'ajout: ${ err }`, 2.5))
                .finally(() => {
                    hideLoadingMessage()
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

    const handleFestivalDate = (_, dateString: [string, string]) => {
        const startDate = new Date(dateString[0])
        const endDate = new Date(dateString[1])
        FestivalService.update(festival.id || 0, { ...festival, startDate, endDate }).then(res =>
            setFestival({
                ...festival,
                ...res
            }))
    }

    const handleFestivalLatitude = (newLatitude: number) => {
        FestivalService.update(festival.id || 0, {
            ...festival,
            location: { ...festival.location, latitude: newLatitude }
        }).then(res =>
            setFestival({
                ...festival,
                ...res
            }))
    }

    const handleFestivalLongitude = (newLongitude: number) => {
        FestivalService.update(festival.id || 0, {
            ...festival,
            location: { ...festival.location, longitude: newLongitude }
        }).then(res =>
            setFestival({
                ...festival,
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
                <Card bordered={ false } className="rounded-lg col-span-12 lg:col-span-4">
                    <div className="text-3xl text-center mb-5">Informations générales</div>
                    <Checkbox onChange={ updateInformationsVisibility } checked={ infoText?.isShowed }>
                        Afficher les informations sur la page d&apos;accueil
                    </Checkbox>
                    <div className="flex items-baseline w-full justify-between">
                        <div className="mt-5">Date du festival :</div>
                        { festival.id &&
                            <RangePicker defaultValue={ [moment(festival.startDate), moment(festival.endDate)] }
                                onChange={ handleFestivalDate }/> }
                    </div>
                    <div className="flex items-baseline w-full justify-between">
                        <div className="w-1/2 mt-5">Coordonnées GPS :</div>
                        <div className="flex w-full justify-start space-x-4">
                            { festival.location &&
                                <InputNumber className="w-full" placeholder="latitude" step="0.00000000001"
                                    defaultValue={ festival.location.latitude }
                                    onChange={ handleFestivalLatitude }/>
                            }
                            { festival.location &&
                                <InputNumber className="w-full" placeholder="longitude" step="0.00000000001"
                                    defaultValue={ festival.location.longitude }
                                    onChange={ handleFestivalLongitude }/>
                            }
                        </div>
                    </div>
                </Card>
            </div>
            <Modal title="Nouveau texte" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } cancelText="Annuler"
                okButtonProps={ { className: 'button' } } onOk={ handleOkModal }>
                <Form form={ formRowAddition }>
                    <Form.Item label="Texte" name="text" rules={ [{ required: true, message: 'Entrez du texte' }] }>
                        <TinyMceEditor textareaName="text" form={ formRowAddition }/>
                    </Form.Item>
                    <Form.Item label="Type" name="type"
                        rules={ [{ required: true, message: 'Entrez le type de texte' }] }>
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