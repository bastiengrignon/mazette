import React, { useEffect, useState } from "react"
import Navigation from "../Navigation"
import {
    Button,
    Form, message,
    Modal,
    Popconfirm,
    Table,
    Typography
} from "antd"
import EditableCell from "../EditableCell"
import { AdvancedImage } from "@cloudinary/react"
import { cloudinary } from "../../../index"
import { UploadService } from "../../../services/admin/upload/upload.service"
import { UploadChangeParam } from "antd/es/upload"
import { UploadFile } from "antd/es/upload/interface"
import { EditableCellService } from "../../../services/admin/common/editable-cell.service"
import PreviewModal from "../PreviewModal"
import useModal from "../../../services/admin/common/modal.service"
import AdminFormAddImages from "../AdminFormAddImages"
import { TrombinoscopeService } from "../../../services/admin/trombinoscope/trombinoscope.service"
import { ITrombinoscope } from "../../../services/admin/trombinoscope/trombinoscope.interface"

const DashboardTrombinoscope: React.FC = () => {
    const [isTrombinoscopeLoading, setIsTrombinoscopeLoading] = useState<boolean>(false)
    const [trombinoscopes, setTrombinoscopes] = useState<ITrombinoscope[]>([])

    // Row edition
    const [newTrombinoscope, setNewTrombinoscope] = useState<ITrombinoscope[]>(trombinoscopes)
    const [editingId, setEditingId] = useState(0)
    const [formRowEdition] = Form.useForm()

    // Add row modal
    const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false)
    const [formRowAddition] = Form.useForm()
    const [file, setFile] = useState<File>()

    // Preview modal
    const { isOpen, toggle } = useModal()
    const [previewURL, setPreviewURL] = useState<string>("")

    useEffect(() => {
        setIsTrombinoscopeLoading(true)
        TrombinoscopeService.getAll()
            .then(trombinoscopes => setTrombinoscopes(trombinoscopes))
            .finally(() => setIsTrombinoscopeLoading(false))
    }, [newTrombinoscope])

    useEffect(() => {
        EditableCellService.init<ITrombinoscope>(formRowEdition, trombinoscopes, setNewTrombinoscope)
    }, [])

    const columns = [
        {
            title: "Prénom",
            key: "name",
            dataIndex: "name",
            editable: true,
            render(name: string) { return <div className="font-avenirBL">{ name }</div> },
            sorter: (a: ITrombinoscope, b: ITrombinoscope) => a.name.localeCompare(b.name)
        },
        {
            title: "Image",
            key: "image",
            dataIndex: "image",
            render(imageId) {
                return <div className="flex justify-center items-center cursor-pointer"
                    title="Visualiser l'image"
                    onClick={ () => openModalPreview(imageId) }>
                    <AdvancedImage className="w-24 h-auto"
                        cldImg={ cloudinary.image(`/${ imageId }`) }/>
                </div>
            },
            editable: false
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",

            render(_, record: ITrombinoscope) {
                const editable = EditableCellService.isEditing<ITrombinoscope>(record, editingId)
                return editable
                    ?
                    <span>
                        <Typography.Link href=""
                            onClick={ (e) => EditableCellService.save<ITrombinoscope>(e, record.id, setEditingId) }
                            className="mr-6">
                            Sauvegarder
                        </Typography.Link>
                        <Popconfirm title="Veux-tu vraiment annuler ?"
                            onConfirm={ () => EditableCellService.cancel(setEditingId) }>
                            <a>Annuler</a>
                        </Popconfirm>
                    </span>
                    :
                    <Typography.Link disabled={ editingId !== 0 }
                        onClick={ () => EditableCellService.edit<ITrombinoscope>(record, setEditingId) }>
                        Modifier
                    </Typography.Link>
            }
        },
    ]

    const handleOkModal = () => {
        formRowAddition.validateFields()
            .then(values => {
                TrombinoscopeService.create(values, file)
                    .then(trombinoscope => setTrombinoscopes([...trombinoscopes, trombinoscope]))
                    .catch(err => console.log(err))
                    .finally(() => formRowAddition.resetFields())
                setAddRowModalVisible(false)
            })
            .catch(err => message.warn("Validation failed: ", err))
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
            <p className="text-xl mb-2">Liste des Trombinoscope : </p>
            <Button type="primary" className="my-4" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un trombinoscope
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: () => EditableCellService.cancel(setEditingId), position: [ "bottomCenter"] }}
                    bordered dataSource={ trombinoscopes } columns={ EditableCellService.mergedColumns(columns, editingId) } loading={ isTrombinoscopeLoading }>
                </Table>
            </Form>

            <Modal title="Nouveau trombinoscope" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddImages form={ formRowAddition } onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL } />
        </Navigation>
    )
}
export default DashboardTrombinoscope