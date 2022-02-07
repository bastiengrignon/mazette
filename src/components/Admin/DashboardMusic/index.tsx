import React, { useEffect, useState } from 'react'

import { AdvancedImage } from '@cloudinary/react'
import loadable from '@loadable/component'
import { Button, Form, Modal, Table, Tooltip, message } from 'antd'

import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { cloudinary } from '../../../index'
import { formatDate } from '../../../lib/date'
import useModal from '../../../constants/hooks'
import { CommonService, IMusic, MusicService, UploadService } from '../../../services'

import ActionButtonsRow, { ActionButtonType } from '../EditableCell/components/ActionButtonsRow'

const AdminFormAddArtist = loadable(() => import('./components/AdminFormAddArtist'))
const EditableCell = loadable(() => import('../EditableCell'))
const Link = loadable(() => import('../../Link'))
const Navigation = loadable(() => import('../../../pages/admin/Navigation'))
const PreviewModal = loadable(() => import('../PreviewModal'))

const DashboardMusic: React.FC = () => {
    const [isMusicLoading, setIsMusicLoading] = useState<boolean>(false)
    const [musics, setMusics] = useState<IMusic[]>([])

    // Row edition
    const [editingId, setEditingId] = useState(0)
    const [formRowEdition] = Form.useForm()

    // Add row modal
    const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false)
    const [formRowAddition] = Form.useForm()
    const [file, setFile] = useState<File>()

    // Preview modal
    const { isOpen, toggle } = useModal()
    const [previewURL, setPreviewURL] = useState<string>('')

    useEffect(() => {
        setIsMusicLoading(true)
        MusicService.getAll()
            .then(setMusics)
            .finally(() => setIsMusicLoading(false))
    }, [musics.length])

    const isEditing = (record: IMusic): boolean => record.id === editingId

    const handleOkModal = (): void => {
        const hideLoadingMessage = message.loading('Ajout en cours', 0)
        formRowAddition.validateFields()
            .then(values => {
                MusicService.create(values, file)
                    .then(music => {
                        setMusics([...musics, music])
                        message.success('Musique ajoutée', 2.5)
                    })
                    .catch(err => message.error(`Erreur lors de l'ajout: ${ err }`, 2.5))
                    .finally(() => {
                        hideLoadingMessage()
                        formRowAddition.resetFields()
                    })
                setAddRowModalVisible(false)
            })
            .catch(err => message.warn('Validation failed: ', err))
    }

    const handleChange = (info: UploadChangeParam<UploadFile<File>>) => setFile(UploadService.handleChange(info))

    const openModalPreview = (imageId: string) => {
        setPreviewURL(imageId)
        toggle()
    }

    const tableRowView = { body: { cell: EditableCell } }

    const columns = [
        {
            title    : 'Nom d\'artiste',
            key      : 'name',
            dataIndex: 'name',
            editable : true,
            required : true,
            render   : function renderTitle(name: string) {
                return <div className="font-avenirBL">{ name }</div>
            },
            sorter: (a: IMusic, b: IMusic) => a.name.localeCompare(b.name)
        },
        {
            title    : 'Style',
            key      : 'type',
            dataIndex: 'type',
            editable : true
        },
        {
            title    : 'Description',
            key      : 'description',
            dataIndex: 'description',
            inputType: 'textarea',
            editable : true,
            required : true,
            ellipsis : { showTitle: false },
            render(description: string) {
                return (
                    <Tooltip placement="topLeft" title={ description } color="blue">
                        { description }
                    </Tooltip>
                )
            }
        },
        {
            title    : 'Date de publication',
            key      : 'publicationDate',
            dataIndex: 'publicationDate',
            inputType: 'date',
            editable : true,
            required : true,
            sorter   : (a: IMusic, b: IMusic) => Number(a.publicationDate) - Number(b.publicationDate),
            render(date: Date) {
                return <span>{ formatDate(date) }</span>
            }
        },
        {
            title    : 'Lien Vidéo',
            key      : 'videoLink',
            dataIndex: 'videoLink',
            editable : true,
            ellipsis : { showTitle: false },
            render(link: string) {
                return <Link src={ link } title={ link }/>
            }
        },
        {
            title    : 'Image',
            key      : 'image',
            dataIndex: 'image',
            render(imageId: string) {
                return <div className="flex justify-center items-center cursor-pointer"
                    title="Visualiser l'image" onClick={ () => openModalPreview(imageId) }>
                    <AdvancedImage className="w-24 h-auto" cldImg={ cloudinary.image(imageId) }/>
                </div>
            },
            editable: false
        },
        {
            title    : 'Action',
            key      : 'action',
            dataIndex: 'action',
            fixed    : 'right',
            render(_, record: IMusic) {
                const editable = isEditing(record)
                return <ActionButtonsRow editable={ editable } record={ record } setEditingId={ setEditingId }
                    form={ formRowEdition } setObject={ setMusics } object={ musics } type={ActionButtonType.MUSIC}/>
            }
        }
    ]

    const mergedColumns = CommonService.mergedColumns(columns, isEditing)

    return (
        <Navigation>
            <p className="text-xl mb-2">Liste des artistes : </p>
            <Button type="primary" className="my-4 button" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un artiste
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={ tableRowView } rowClassName="editable-row" rowKey="id"
                    pagination={ { onChange: () => setEditingId(0), position: ['bottomCenter'] } }
                    bordered dataSource={ musics } columns={ mergedColumns } loading={ isMusicLoading }>
                </Table>
            </Form>

            <Modal title="Nouvel artiste" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } okButtonProps={ { className: 'button' } }
                onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddArtist form={ formRowAddition } onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL }/>
        </Navigation>
    )
}
export default DashboardMusic