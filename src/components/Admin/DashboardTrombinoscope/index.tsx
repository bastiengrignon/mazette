import loadable from '@loadable/component'
import {
    Button,
    Form, Modal,
    message
} from 'antd'
import React, { useEffect, useState } from 'react'

import { AdvancedImage } from '@cloudinary/react'
import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { cloudinary } from '../../../index'
import useModal from '../../../constants/hooks'
import { CommonService, ITrombinoscope, TrombinoscopeService, UploadService } from '../../../services'

import CustomTable from '../CustomTable'
import ActionButtonsRow, { ActionButtonType } from '../EditableCell/components/ActionButtonsRow'

const AdminFormAddTrombinoscope = loadable(() => import('./components/AdminFormAddTrombinoscope'))
const Navigation = loadable(() => import('../../../pages/admin/Navigation'))
const PreviewModal = loadable(() => import('../PreviewModal'))

const DashboardTrombinoscope: React.FC = () => {
    const [isTrombinoscopeLoading, setIsTrombinoscopeLoading] = useState<boolean>(false)
    const [trombinoscopes, setTrombinoscopes] = useState<ITrombinoscope[]>([])
    const [newTrombinoscopes, setNewTrombinoscopes] = useState<ITrombinoscope[]>([])

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
        setIsTrombinoscopeLoading(true)
        TrombinoscopeService.getAll()
            .then(setTrombinoscopes)
            .finally(() => setIsTrombinoscopeLoading(false))
    }, [newTrombinoscopes])

    const isEditing = (record: ITrombinoscope): boolean => record.id === editingId

    const columns = [
        {
            title    : 'Prénom',
            key      : 'name',
            dataIndex: 'name',
            editable : true,
            render(name: string) {
                return <div className="font-avenirBL">{ name }</div>
            },
            sorter: (a: ITrombinoscope, b: ITrombinoscope) => a.name.localeCompare(b.name)
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
            render(_, record: ITrombinoscope) {
                const editable = isEditing(record)
                return <ActionButtonsRow editable={ editable } record={ record } setEditingId={ setEditingId }
                    form={ formRowEdition } setObject={ setNewTrombinoscopes }
                    object={ trombinoscopes } type={ ActionButtonType.TROMBINOSCOPE }/>
            }
        }
    ]

    const mergedColumns = CommonService.mergedColumns(columns, isEditing)

    const handleOkModal = () => {
        const hideLoadingMessage = message.loading('Ajout en cours', 0)
        formRowAddition.validateFields()
            .then(values => {
                TrombinoscopeService.create(values, file)
                    .then(trombinoscope => {
                        setTrombinoscopes([...trombinoscopes, trombinoscope])
                        message.success('Trombinoscope ajouté', 2.5)
                    })
                    .catch(err => message.error(`Erreur lors de l'ajout: ${ err }`, 2.5))
                    .finally(() => {
                        hideLoadingMessage()
                        formRowAddition.resetFields()
                    })
                setAddRowModalVisible(false)
            })
            .catch(err => message.warning('Validation failed: ', err))
    }

    const handleFileChange = (info: UploadChangeParam<UploadFile<File>>): void => setFile(UploadService.handleChange(info))

    const openModalPreview = (imageId: string) => {
        setPreviewURL(imageId)
        toggle()
    }

    return (
        <Navigation>
            <p className="text-xl mb-2">Liste des Trombinoscope : </p>
            <Button type="primary" className="my-4 button" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un trombinoscope
            </Button>
            <CustomTable form={ formRowEdition } columns={ mergedColumns } dataSource={ trombinoscopes }
                loading={ isTrombinoscopeLoading } setEditingId={ setEditingId }/>

            <Modal title="Nouveau trombinoscope" open={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } okButtonProps={ { className: 'button' } }
                onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddTrombinoscope form={ formRowAddition } onUploadChange={ handleFileChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL }/>
        </Navigation>
    )
}
export default DashboardTrombinoscope
