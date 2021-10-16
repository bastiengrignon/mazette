import React, { useEffect, useState } from "react"
import {
    Button,
    Form,
    message,
    Modal,
    Popconfirm,
    Table, Tooltip,
    Typography,
} from "antd"
import { AdvancedImage } from "@cloudinary/react"
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons"

import Navigation from "../Navigation"
import { IMovie } from "../../../services/admin/movie/movie.interface"
import { MovieService } from "../../../services/admin/movie/movie.service"
import EditableCell from "../EditableCell"
import { UploadChangeParam } from "antd/es/upload"
import { UploadFile } from "antd/es/upload/interface"
import { UploadService } from "../../../services/admin/upload/upload.service"
import { cloudinary } from "../../../index"
import PreviewModal from "../PreviewModal"
import useModal from "../../../constants/hooks"
import AdminFormAddMovie from "../AdminFormAddMovie"
import Link from "../../../components/Link"
import { CommonService } from "../../../services/admin/common/common.service"

const DashboardMovie: React.FC = () => {
    const [isMovieLoading, setIsMovieLoading] = useState<boolean>(false)
    const [movies, setMovies] = useState<IMovie[]>([])
    // Row edition
    const [newMovies, setNewMovies] = useState<IMovie[]>(movies)
    const [editingId, setEditingId] = useState<number>(0)
    const [formRowEdition] = Form.useForm()

    // Add row modal
    const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false)
    const [formRowAddition] = Form.useForm()
    const [file, setFile] = useState<File>()

    // Preview modal
    const { isOpen, toggle } = useModal()
    const [previewURL, setPreviewURL] = useState<string>("")

    useEffect(() => {
        setIsMovieLoading(true)
        MovieService.getAll()
            .then(movies => setMovies(movies))
            .finally(() => setIsMovieLoading(false))
    }, [newMovies])

    const isEditing = (record: IMovie): boolean => record.id === editingId

    const editRow = (record: Partial<IMovie>): void => {
        formRowEdition.setFieldsValue({
            title: "",
            author: "",
            description: "",
            date: "",
            publicationDate: "",
            location: "",
            duration: "",
            ...record
        })
        setEditingId(record.id || 0)
    }

    const saveRow = async (id: number) => {
        const hideLoadingMessage = message.loading("Modification en cours", 0)
        formRowEdition.validateFields()
            .then(row => {
                MovieService.update(id, row).then(res => {
                    const index = movies.findIndex(movie => movie.id === id)
                    setNewMovies(movies.splice(index, 1, {
                        ...movies[index],
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
        await MovieService.delete(id).then(() => {
            hideLoadingMessage()
            message.success("Ligne supprimée")
        })
        setNewMovies(movies)
    }

    const columns = [
        {
            title: "Titre",
            key: "title",
            dataIndex: "title",
            editable: true,
            render(title: string) { return <div className="font-avenirBL">{ title }</div> },
            sorter: (a: IMovie, b: IMovie) => a.title.localeCompare(b.title)
        },
        {
            title: "Auteur",
            key: "author",
            dataIndex: "author",
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
            title: "Date",
            key: "date",
            dataIndex: "date",
            editable: true
        },
        {
            title: "Provenance",
            key: "location",
            dataIndex: "location",
            editable: true
        },
        {
            title: "Durée",
            key: "duration",
            dataIndex: "duration",
            editable: true
        },
        {
            title: "Date de publication",
            key: "publicationDate",
            dataIndex: "publicationDate",
            editable: true,
            sorter: (a: IMovie, b: IMovie) => Number(a.publicationDate) - Number(b.publicationDate)

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
            key: "imgThumbnail",
            dataIndex: "imgThumbnail",
            editable: false,
            render(imageId: string) {
                return <div className="flex justify-center items-center cursor-pointer"
                    title="Visualiser l'image" onClick={ () => openModalPreview(imageId) }>
                    <AdvancedImage className="w-24 h-auto" cldImg={ cloudinary.image(imageId) }/>
                </div>
            }
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            fixed: "right",
            render(_, record: IMovie) {
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
                MovieService.create(values, file)
                    .then(movie => setMovies([...movies, movie]))
                    .catch(err => console.log(err))
                    .finally(() => {
                        hideLoadingMessage()
                        message.success("Court-métrage ajouté", 2.5)
                        formRowAddition.resetFields()
                    })
                setAddRowModalVisible(false)
            })
            .catch(err => message.warn("Validation failed: ", err))
    }

    const openModalPreview = (imageId: string) => {
        setPreviewURL(imageId)
        toggle()
    }

    const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
        setFile(UploadService.handleChange(info))
    }

    return (
        <Navigation>
            <p className="text-xl mb-2">Liste des courts-métrages : </p>
            <Button type="primary" className="my-4 button" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un court-métrage
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: () => cancel(), position: [ "bottomCenter"] }}
                    bordered dataSource={ movies } columns={ mergedColumns } loading={ isMovieLoading }>
                </Table>
            </Form>

            <Modal title="Nouveau court-métrage" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } okButtonProps={{ className: "button" }}
                onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddMovie form={formRowAddition} onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL } />
        </Navigation>
    )
}
export default DashboardMovie