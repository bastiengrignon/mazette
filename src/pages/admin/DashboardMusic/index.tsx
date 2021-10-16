import React, { useEffect, useState } from "react"
import Navigation from "../Navigation"
import {
    Button,
    Form, message,
    Modal,
    Popconfirm,
    Table, Tooltip,
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
import PreviewModal from "../PreviewModal"
import useModal from "../../../constants/hooks"
import AdminFormAddArtist from "../AdminFormAddArtist"
import Link from "../../../components/Link"
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons"
import { CommonService } from "../../../services/admin/common/common.service"

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
    const [previewURL, setPreviewURL] = useState<string>("")

    useEffect(() => {
        setIsMusicLoading(true)
        MusicService.getAll()
            .then(musics => setMusics(musics))
            .finally(() => setIsMusicLoading(false))
    }, [newMusics])

    const isEditing = (record: IMusic): boolean => record.id === editingId

    const editRow = (record: Partial<IMusic>): void => {
        formRowEdition.setFieldsValue({
            name: "",
            type: "",
            description: "",
            publicationDate: "",
            image: "",
            ...record
        })
        setEditingId(record.id || 0)
    }

    const saveRow = async (id: number) => {
        const hideLoadingMessage = message.loading("Modification en cours", 0)
        formRowEdition.validateFields()
            .then(row => {
                MusicService.update(id, row).then(res => {
                    const index = musics.findIndex(movie => movie.id === id)
                    setNewMusics(musics.splice(index, 1, {
                        ...musics[index],
                        ...res
                    }))
                }).finally(() => {
                    hideLoadingMessage()
                    message.success("Modification effectuée", 2.5)
                })
            })
            .catch(err => console.log("Validate Failed: ", err))
            .finally(() => setEditingId(0))
    }

    const cancel = (): void => setEditingId(0)

    const deleteRow = async (id: number): Promise<void> => {
        const hideLoadingMessage = message.loading("Suppression en cours", 0)
        await MusicService.delete(id).then(() => {
            hideLoadingMessage()
            message.success("Ligne supprimée")
        })
        setNewMusics(musics)
    }

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
            editable: true,
            ellipsis: { showTitle: false },
            render(description: string) {
                return (
                    <Tooltip placement="top" title={ description } color="blue">
                        { description }
                    </Tooltip>
                )
            }
        },
        {
            title: "Date de publication",
            key: "publicationDate",
            dataIndex: "publicationDate",
            editable: true,
            sorter: (a: IMusic, b: IMusic) => Number(a.publicationDate) - Number(b.publicationDate)

        },
        {
            title: "Lien Vidéo",
            key: "videoLink",
            dataIndex: "videoLink",
            editable: true,
            ellipsis: { showTitle: false },
            render(link: string) { return <Link src={ link } title={ link }/> }
        },
        {
            title: "Image",
            key: "image",
            dataIndex: "image",
            render(imageId: string) {
                return <div className="flex justify-center items-center cursor-pointer"
                    title="Visualiser l'image" onClick={ () => openModalPreview(imageId) }>
                    <AdvancedImage className="w-24 h-auto" cldImg={ cloudinary.image(imageId) }/>
                </div>
            },
            editable: false
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            fixed: "right",
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
        const hideLoadingMessage = message.loading("Ajout en cours", 0)
        formRowAddition.validateFields()
            .then(values => {
                MusicService.create(values, file)
                    .then(music => setMusics([...musics, music]))
                    .catch(err => console.log(err))
                    .finally(() => {
                        hideLoadingMessage()
                        message.success("Musique ajoutée", 2.5)
                        formRowAddition.resetFields()
                    })
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
            <Button type="primary" className="my-4 button" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un artiste
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: () => cancel(), position: [ "bottomCenter"] }}
                    bordered dataSource={ musics } columns={ mergedColumns } loading={ isMusicLoading }>
                </Table>
            </Form>

            <Modal title="Nouvel artiste" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } okButtonProps={{ className: "button" }}
                onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddArtist form={ formRowAddition } onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL } />
        </Navigation>
    )
}
export default DashboardMusic