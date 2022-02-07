import loadable from '@loadable/component'
import {
    Button,
    Form, Modal,
    Table,
    message
} from 'antd'
import React, { useEffect, useState } from 'react'

import { AdvancedImage } from '@cloudinary/react'
import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { cloudinary } from '../../../index'
import useModal from '../../../constants/hooks'
import { CommonService, ITrombinoscope, TrombinoscopeService, UploadService } from '../../../services'

import ActionButtonsRow, { ActionButtonType } from '../EditableCell/components/ActionButtonsRow'

const AdminFormAddTrombinoscope = loadable(() => import('./components/AdminFormAddTrombinoscope'))
const EditableCell = loadable(() => import('../EditableCell'))
const Navigation = loadable(() => import('../../../pages/admin/Navigation'))
const PreviewModal = loadable(() => import('../PreviewModal'))

const DashboardTrombinoscope: React.FC = () => {
    const [isTrombinoscopeLoading, setIsTrombinoscopeLoading] = useState<boolean>(false)
    const [trombinoscopes, setTrombinoscopes] = useState<ITrombinoscope[]>([])

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
    }, [trombinoscopes.length])

    const isEditing = (record: ITrombinoscope): boolean => record.id === editingId

    const columns = [
        {
            title    : 'Prénom',
            key      : 'name',
            dataIndex: 'name',
            editable : true,
            render(name: string) { return <div className="font-avenirBL">{ name }</div> },
            sorter   : (a: ITrombinoscope, b: ITrombinoscope) => a.name.localeCompare(b.name)
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
                    form={ formRowEdition } setObject={ setTrombinoscopes } object={ trombinoscopes } type={ActionButtonType.TROMBINOSCOPE}/>
            }
        },
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
            .catch(err => message.warn('Validation failed: ', err))
    }

    const handleChange = (info: UploadChangeParam<UploadFile<File>>) => setFile(UploadService.handleChange(info))

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
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: () => setEditingId(0), position: [ 'bottomCenter'] }}
                    bordered dataSource={ trombinoscopes } columns={ mergedColumns } loading={ isTrombinoscopeLoading }>
                </Table>
            </Form>

            <Modal title="Nouveau trombinoscope" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } okButtonProps={{ className: 'button' }}
                onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddTrombinoscope form={ formRowAddition } onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL } />
        </Navigation>
    )
}
export default DashboardTrombinoscope