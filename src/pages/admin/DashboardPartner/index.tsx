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
import { IPartner } from "../../../services/admin/partner/partner.interface"
import { PartnerService } from "../../../services/admin/partner/partner.service"
import AdminFormAddPartner from "../AdminFormAddPartner"

const DashboardPartner:React.FC = () => {
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
    const [previewURL, setPreviewURL] = useState<string>("")

    useEffect(() => {
        setIsPartnerLoading(true)
        PartnerService.getAll()
            .then(partners => setPartners(partners))
            .finally(() => setIsPartnerLoading(false))
    }, [newPartners])

    useEffect(() => {
        EditableCellService.init<IPartner>(formRowEdition, partners, setNewPartners)
    }, [])

    const columns = [
        {
            title: "Nom du partenaire",
            key: "name",
            dataIndex: "name",
            editable: true,
            render(name: string) { return <div className="font-avenirBL">{ name }</div> },
            sorter: (a: IPartner, b: IPartner) => a.name.localeCompare(b.name)
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

            render(_, record: IPartner) {
                const editable = EditableCellService.isEditing<IPartner>(record, editingId)
                return editable
                    ?
                    <span>
                        <Typography.Link href=""
                            onClick={ (e) => EditableCellService.save<IPartner>(e, record.id, setEditingId) }
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
                        onClick={ () => EditableCellService.edit<IPartner>(record, setEditingId) }>
                        Modifier
                    </Typography.Link>
            }
        },
    ]

    const handleOkModal = () => {
        formRowAddition.validateFields()
            .then(values => {
                PartnerService.create(values, file)
                    .then(partner => setPartners([...partners, partner]))
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
            <p className="text-xl mb-2">Liste des Partenaires : </p>
            <Button type="primary" className="my-4" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un partenaire
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: () => EditableCellService.cancel(setEditingId), position: [ "bottomCenter"] }}
                    bordered dataSource={ partners } columns={ EditableCellService.mergedColumns(columns, editingId) } loading={ isPartnerLoading }>
                </Table>
            </Form>

            <Modal title="Nouvel artiste" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddPartner form={ formRowAddition } onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL } />
        </Navigation>
    )
}
export default DashboardPartner