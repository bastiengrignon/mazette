import loadable from '@loadable/component'
import {
    Button,
    Form, Modal,
    Popconfirm,
    Table,
    Tooltip, Typography,
    message
} from 'antd'
import React, { useEffect, useState } from 'react'

import { AdvancedImage } from '@cloudinary/react'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'

import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { cloudinary } from '../../../index'
import useModal from '../../../constants/hooks'
import { CommonService, IMusic, MusicService, UploadService } from '../../../services'

const AdminFormAddArtist = loadable(() => import('./components/AdminFormAddArtist'))
const EditableCell = loadable(() => import('../EditableCell'))
const Link = loadable(() => import('../../Link'))
const Navigation = loadable(() => import('../../../pages/admin/Navigation'))
const PreviewModal = loadable(() => import('../PreviewModal'))

const DashboardMusic: React.FC = () => {
    const [isMusicLoading, setIsMusicLoading] = useState<boolean>(false)
    const [musics, setMusics] = useState<IMusic[]>([])

    // Row edition
    const [newMusics, setNewMusics] = useState<IMusic[]>(musics)
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
    }, [newMusics])

    const isEditing = (record: IMusic): boolean => record.id === editingId

    const editRow = (record: Partial<IMusic>): void => {
        formRowEdition.setFieldsValue({
            name           : '',
            type           : '',
            description    : '',
            publicationDate: '',
            image          : '',
            ...record
        })
        setEditingId(record.id || 0)
    }

    const saveRow = async (id: number) => {
        const hideLoadingMessage = message.loading('Modification en cours', 0)
        formRowEdition.validateFields()
            .then(row => {
                MusicService.update(id, row)
                    .then(res => {
                        const index = musics.findIndex(music => music.id === id)
                        setNewMusics(musics.splice(index, 1, {
                            ...musics[index],
                            ...res
                        }))
                        message.success('Modification effectuée', 2.5)
                    })
                    .catch(err => message.error(`Erreur lors de la modification: ${ err }`, 2.5))
                    .finally(() => {
                        hideLoadingMessage()
                        formRowEdition.resetFields()
                    })
            })
            .catch(err => console.log('Validate Failed: ', err))
            .finally(() => setEditingId(0))
    }

    const cancel = (): void => setEditingId(0)

    const deleteRow = async (id: number): Promise<void> => {
        const hideLoadingMessage = message.loading('Suppression en cours', 0)
        await MusicService.delete(id).then(() => {
            hideLoadingMessage()
            message.success('Ligne supprimée')
        })
        setNewMusics(musics)
    }

    const columns = [
        {
            title    : 'Nom d\'artiste',
            key      : 'name',
            dataIndex: 'name',
            editable : true,
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
            editable : true,
            ellipsis : { showTitle: false },
            render(description: string) {
                return (
                    <Tooltip placement="top" title={ description } color="blue">
                        { description }
                    </Tooltip>
                )
            }
        },
        {
            title    : 'Date de publication',
            key      : 'publicationDate',
            dataIndex: 'publicationDate',
            editable : true,
            sorter   : (a: IMusic, b: IMusic) => Number(a.publicationDate) - Number(b.publicationDate)

        },
        {
            title    : 'Lien Vidéo',
            key      : 'videoLink',
            dataIndex: 'videoLink',
            editable : true,
            ellipsis : { showTitle: false },
            render(link: string) { return <Link src={ link } title={ link }/> }
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
                return editable
                    ?
                    <span className="inline-flex justify-around w-full">
                        <Tooltip title="Sauvegarder">
                            <div className="text-blue-500 cursor-pointer"
                                onClick={ () => saveRow(record.id) }>
                                <SaveOutlined/>
                            </div>
                        </Tooltip>
                        <Typography.Link onClick={ cancel }>Annuler</Typography.Link>
                    </span>
                    :
                    <span className="inline-flex justify-around w-full">
                        <Tooltip title="Modifier">
                            <Typography.Link disabled={ editingId !== 0 }
                                onClick={ () => editRow(record) }>
                                <EditOutlined/>
                            </Typography.Link>
                        </Tooltip>
                        <Tooltip title="Supprimer" placement="bottom">
                            <Popconfirm placement="left" className="text-red cursor-pointer"
                                title="Veux-tu vraiment supprimer ?"
                                onConfirm={ () => deleteRow(record.id) }>
                                <a><DeleteOutlined/></a>
                            </Popconfirm>
                        </Tooltip>
                    </span>
            }
        },
    ]

    const mergedColumns = CommonService.mergedColumns(columns, isEditing)

    const handleOkModal = () => {
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

    const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
        setFile(UploadService.handleChange(info))
    }

    const openModalPreview = (imageId: string) => {
        setPreviewURL(imageId)
        toggle()
    }

    return (
        <Navigation>
            <p className="text-xl mb-2">Liste des artistes : </p>
            <Button type="primary" className="my-4 button" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un artiste
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: () => cancel(), position: [ 'bottomCenter'] }}
                    bordered dataSource={ musics } columns={ mergedColumns } loading={ isMusicLoading }>
                </Table>
            </Form>

            <Modal title="Nouvel artiste" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } okButtonProps={{ className: 'button' }}
                onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddArtist form={ formRowAddition } onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL } />
        </Navigation>
    )
}
export default DashboardMusic