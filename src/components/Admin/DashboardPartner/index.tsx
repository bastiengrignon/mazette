import loadable from '@loadable/component'
import {
    Button,
    Form,
    Modal,
    Popconfirm,
    Table, Tooltip,
    Typography, message
} from 'antd'
import React, { useEffect, useState } from 'react'

import AdminFormAddPartners from './components/AdminFormAddPartners'
import { AdvancedImage } from '@cloudinary/react'
import Link from '../../Link'
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'

import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { cloudinary } from '../../../index'
import useModal from '../../../constants/hooks'
import { CommonService, IPartner, PartnerService, UploadService } from '../../../services'

const EditableCell = loadable(() => import('../EditableCell'))
const Navigation = loadable(() => import('../../../pages/admin/Navigation'))
const PreviewModal = loadable(() => import('../PreviewModal'))

const DashboardPartner: React.FC = () => {
    const [isPartnerLoading, setIsPartnerLoading] = useState<boolean>(false)
    const [partners, setPartners] = useState<IPartner[]>([])

    // Row edition
    const [newPartners, setNewPartners] = useState<IPartner[]>(partners)
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
        setIsPartnerLoading(true)
        PartnerService.getAll()
            .then(setPartners)
            .finally(() => setIsPartnerLoading(false))
    }, [newPartners])

    const isEditing = (record: IPartner): boolean => record.id === editingId

    const editRow = (record: Partial<IPartner>): void => {
        formRowEdition.setFieldsValue({
            name : '',
            link : '',
            image: '',
            ...record
        })
        setEditingId(record.id || 0)
    }

    const saveRow = async (id: number) => {
        const hideLoadingMessage = message.loading('Modification en cours', 0)
        formRowEdition.validateFields()
            .then(row => {
                PartnerService.update(id, row)
                    .then(res => {
                        const index = partners.findIndex(movie => movie.id === id)
                        setNewPartners(partners.splice(index, 1, {
                            ...partners[index],
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
        await PartnerService.delete(id).then(() => {
            hideLoadingMessage()
            message.success('Ligne supprimée')
        })
        setNewPartners(partners)
    }

    const columns = [
        {
            title    : 'Nom du partenaire',
            key      : 'name',
            dataIndex: 'name',
            editable : true,
            render(name: string) { return <div className="font-avenirBL">{ name }</div> },
            sorter   : (a: IPartner, b: IPartner) => a.name.localeCompare(b.name)
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
            title    : 'Lien',
            key      : 'link',
            dataIndex: 'link',
            render(link: string) { return <Link src={ link } title={ link }/> },
            editable : true
        },
        {
            title    : 'Action',
            key      : 'action',
            dataIndex: 'action',
            render(_, record: IPartner) {
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
                PartnerService.create(values, file)
                    .then(partner => {
                        setPartners([...partners, partner])
                        message.success('Partenaire ajouté', 2.5)
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
            <p className="text-xl mb-2">Liste des Partenaires : </p>
            <Button type="primary" className="my-4 button" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un partenaire
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: () => cancel(), position: [ 'bottomCenter'] }}
                    bordered dataSource={ partners } columns={ mergedColumns } loading={ isPartnerLoading }>
                </Table>
            </Form>

            <Modal title="Nouveau partenaire" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } okButtonProps={{ className: 'button' }}
                onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddPartners form={ formRowAddition } onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL } />
        </Navigation>
    )
}
export default DashboardPartner