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
import { IMusic } from "../../../services/admin/music/music.interface"
import { MusicService } from "../../../services/admin/music/music.service"
import { UploadService } from "../../../services/admin/upload/upload.service"
import { UploadChangeParam } from "antd/es/upload"
import { UploadFile } from "antd/es/upload/interface"
import { EditableCellService } from "../../../services/admin/common/editable-cell.service"
import PreviewModal from "../PreviewModal"
import useModal from "../../../services/admin/common/modal.service"
import AdminFormAddArtist from "../AdminFormAddArtist"

//TODO: add optional link for auto-promo

const DashboardMusic:React.FC = () => {
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
    const [previewURL, setPreviewURL] = useState<string>("")

    useEffect(() => {
        setIsMusicLoading(true)
        MusicService.getAll()
            .then(musics => setMusics(musics))
            .finally(() => setIsMusicLoading(false))
    }, [newMusics])

    useEffect(() => {
        EditableCellService.init<IMusic>(formRowEdition, musics, setNewMusics)
    }, [])

    const columns = [
        {
            title: "Nom d'artiste",
            key: "name",
            dataIndex: "name",
            editable: true,
            render: function renderTitle(name: string) {
                return <div className="font-avenirBL">{ name }</div>
            },
            sorter: (a: IMusic, b: IMusic) => a.name.localeCompare(b.name)
        },
        {
            title: "Style",
            key: "type",
            dataIndex: "type",
            editable: true
        },
        {
            title: "Description",
            key: "description",
            dataIndex: "description",
            editable: true
        },
        {
            title: "Date de publication",
            key: "publicationDate",
            dataIndex: "publicationDate",
            editable: true,
            sorter: (a: IMusic, b: IMusic) => Number(a.publicationDate) - Number(b.publicationDate)

        },
        {
            title: "Image",
            key: "image",
            dataIndex: "image",
            render: function renderImage(imageId) {
                return <div className="flex justify-center items-center cursor-pointer"
                    title="Visualiser l'image"
                    onClick={ () => openModalPreview(imageId) }>
                    <AdvancedImage className="w-24 h-auto" cldImg={ cloudinary.image(`/${ imageId }`) }/>
                </div>
            },
            editable: false
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",

            render: function renderAction(_, record: IMusic) {
                const editable = EditableCellService.isEditing<IMusic>(record, editingId)
                return editable
                    ?
                    <span>
                        <Typography.Link href="" onClick={ (e) => EditableCellService.save<IMusic>(e, record.id, setEditingId) } className="mr-6">
                            Sauvegarder
                        </Typography.Link>
                        <Popconfirm title="Veux-tu vraiment annuler ?" onConfirm={ () => EditableCellService.cancel(setEditingId) }>
                            <a>Annuler</a>
                        </Popconfirm>
                    </span>
                    :
                    <Typography.Link disabled={ editingId !== 0 } onClick={ () => EditableCellService.edit<IMusic>(record, setEditingId) }>
                        Modifier
                    </Typography.Link>
            }
        },
    ]

    const handleOkModal = () => {
        formRowAddition.validateFields()
            .then(values => {
                MusicService.create(values, file)
                    .then(music => setMusics([...musics, music]))
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
            <p className="text-xl mb-2">Liste des artistes : </p>
            <Button type="primary" className="my-4" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un artiste
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: () => EditableCellService.cancel(setEditingId), position: [ "bottomCenter"] }}
                    bordered dataSource={ musics } columns={ EditableCellService.mergedColumns(columns, editingId) } loading={ isMusicLoading }>
                </Table>
            </Form>

            <Modal title="Nouvel artiste" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddArtist form={ formRowAddition } onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL } />
        </Navigation>
    )
}
export default DashboardMusic