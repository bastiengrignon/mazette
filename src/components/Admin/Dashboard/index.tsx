import dayjs from 'dayjs'
import loadable from '@loadable/component'
import React, { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Collapse,
    DatePicker,
    Form,
    InputNumber,
    List,
    Modal,
    Select,
    Skeleton,
    Switch,
    Typography,
    message
} from 'antd'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'

import { FESTIVAL_ID } from '../../../constants'
import { CommonService, IText, TextService, TextType } from '../../../services'
import { FestivalService, IFestival } from '../../../services/admin/festival'

import {
    DASHBOARD_ADD_TEXT,
    DASHBOARD_MODAL_NEW_TEXT_TITLE,
    DASHBOARD_MODAL_TEXT,
    DASHBOARD_MODAL_TEXT_RULE,
    DASHBOARD_MODAL_TYPE,
    DASHBOARD_MODAL_TYPE_RULE,
    DASHBOARD_PLACEHOLDER_LATITUDE,
    DASHBOARD_PLACEHOLDER_LONGITUDE,
    DASHBOARD_SHOW_HOME_INFORMATION,
    DASHBOARD_SHOW_MOVIES,
    DASHBOARD_SHOW_MUSICS,
    DASHBOARD_TITLE_DATE,
    DASHBOARD_TITLE_GPS_COORDS,
    DASHBOARD_TITLE_INFORMATION
} from './Dashboard.constants'
import { MODAL_ADD_TEXT, MODAL_CANCEL_TEXT } from '../Admin.constants'

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
            .then(setTexts)
            .finally(() => setIsTextLoading(false))
        TextService.getByTextType(TextType.info).then(setInfoText)
        FestivalService.getById(FESTIVAL_ID).then(setFestival)
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
                                <SaveOutlined rev={undefined}/>
                            </div>
                            <Typography.Link onClick={ cancel }>Annuler</Typography.Link>
                        </span>
                        :
                        <div className="ml-5 text-blue-500 cursor-pointer" onClick={ () => editRow(item) }>
                            <EditOutlined rev={undefined} />
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
        }).catch(err => message.warning('Validation failed: ', err))
    }

    const collapseTitle = (textType: string): string => CommonService.capitalize(selectTextType.find(item => item.value === textType)?.text || '')

    const updateInformationsVisibility = (checked: boolean): void => {
        TextService.update(infoText?.id || 0, { ...infoText, isShowed: checked }).then(res =>
            setInfoText({
                ...infoText,
                ...res
            }))
    }

    const handleFestivalDate = (_, dateString: [string, string]): void => {
        const startDate = new Date(dateString[0])
        const endDate = new Date(dateString[1])
        FestivalService.update(festival.id || FESTIVAL_ID, { ...festival, startDate, endDate }).then(res =>
            setFestival({
                ...festival,
                ...res
            }))
    }

    const handleFestivalLatitude = (newLatitude: number | null): void => {
        FestivalService.update(festival.id || FESTIVAL_ID, {
            ...festival,
            location: { ...festival.location, latitude: newLatitude || 0 }
        }).then(res =>
            setFestival({
                ...festival,
                ...res
            }))
    }

    const handleFestivalLongitude = (newLongitude: number | null): void => {
        FestivalService.update(festival.id || FESTIVAL_ID, {
            ...festival,
            location: { ...festival.location, longitude: newLongitude || 0 }
        }).then(res =>
            setFestival({
                ...festival,
                ...res
            }))
    }

    const handleShowMusics = (checked: boolean): void => {
        FestivalService.update(FESTIVAL_ID, {
            ...festival,
            showMusic: checked
        }).then(res =>
            setFestival({
                ...festival,
                ...res
            }))
    }

    const handleShowMovies = (checked: boolean): void => {
        FestivalService.update(FESTIVAL_ID, {
            ...festival,
            showMovie: checked
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
                        { DASHBOARD_ADD_TEXT }
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
                    <div className="text-3xl text-center mb-5">{ DASHBOARD_TITLE_INFORMATION }</div>
                    <Switch onChange={ updateInformationsVisibility } checked={ infoText?.isShowed }
                        className="mr-2"/> { DASHBOARD_SHOW_HOME_INFORMATION }
                    <div className="flex items-baseline w-full justify-between">
                        <div className="mt-5">{ DASHBOARD_TITLE_DATE }</div>
                        { festival.id &&
                            <RangePicker defaultValue={ [dayjs(festival.startDate), dayjs(festival.endDate)] }
                                onChange={ handleFestivalDate }/> }
                    </div>
                    <div className="flex items-baseline w-full justify-between">
                        <div className="w-1/2 mt-5">{ DASHBOARD_TITLE_GPS_COORDS }</div>
                        <div className="flex w-full justify-start space-x-4">
                            { festival.location &&
                                <InputNumber className="w-full" placeholder={ DASHBOARD_PLACEHOLDER_LATITUDE }
                                    step="0.00000000001"
                                    defaultValue={ festival.location.latitude }
                                    onChange={ handleFestivalLatitude }/>
                            }
                            { festival.location &&
                                <InputNumber className="w-full" placeholder={ DASHBOARD_PLACEHOLDER_LONGITUDE }
                                    step="0.00000000001"
                                    defaultValue={ festival.location.longitude }
                                    onChange={ handleFestivalLongitude }/>
                            }
                        </div>
                    </div>
                    <div className="my-5 flex align-center">
                        <Switch onChange={ handleShowMusics } checked={ festival.showMusic }
                            className="mr-2"/> { DASHBOARD_SHOW_MUSICS }
                    </div>
                    <div className="my-5">
                        <Switch onChange={ handleShowMovies } checked={ festival.showMovie }
                            className="mr-2"/> { DASHBOARD_SHOW_MOVIES }

                    </div>
                </Card>
            </div>
            <Modal title={ DASHBOARD_MODAL_NEW_TEXT_TITLE } open={ addRowModalVisible } okText={ MODAL_ADD_TEXT }
                onCancel={ () => setAddRowModalVisible(false) } cancelText={ MODAL_CANCEL_TEXT }
                okButtonProps={ { className: 'button' } } onOk={ handleOkModal }>
                <Form form={ formRowAddition }>
                    <Form.Item label={ DASHBOARD_MODAL_TEXT } name="text"
                        rules={ [{ required: true, message: DASHBOARD_MODAL_TEXT_RULE }] }>
                        <TinyMceEditor textareaName="text" form={ formRowAddition }/>
                    </Form.Item>
                    <Form.Item label={ DASHBOARD_MODAL_TYPE } name="type"
                        rules={ [{ required: true, message: DASHBOARD_MODAL_TYPE_RULE }] }>
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
