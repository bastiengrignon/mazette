import React, { useEffect, useState } from "react"
import {
    Button,
    Form,
    message,
    Modal,
    Popconfirm,
    Table,
    Typography,
} from "antd"
import { AdvancedImage } from "@cloudinary/react"

import Navigation from "../Navigation"
import { IMovie } from "../../../services/admin/movie/movie.interface"
import { MovieService } from "../../../services/admin/movie/movie.service"
import EditableCell from "../EditableCell"
import { UploadChangeParam } from "antd/es/upload"
import { UploadFile } from "antd/es/upload/interface"
import { UploadService } from "../../../services/admin/upload/upload.service"
import { cloudinary } from "../../../index"
import { EditableCellService } from "../../../services/admin/common/editable-cell.service"
import PreviewModal from "../PreviewModal"
import useModal from "../../../services/admin/common/modal.service"
import AdminFormAddMovie from "../AdminFormAddMovie"
import Link from "../../../components/Link"

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

    useEffect(() => {
        EditableCellService.init<IMovie>(formRowEdition, movies, setNewMovies)
    }, [])

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
            editable: true
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
            render(link: string) { return <Link src={ link }/> }
        },
        {
            title: "Image",
            key: "imgThumbnail",
            dataIndex: "imgThumbnail",
            editable: false,
            render(imageId) {
                return <div className="flex justify-center items-center cursor-pointer"
                    title="Visualiser l'image"
                    onClick={ () => openModalPreview(imageId) }>
                    <AdvancedImage className="w-24 h-auto"
                        cldImg={ cloudinary.image(imageId) }/>
                </div>
            }
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            render(_, record: IMovie) {
                const editable = EditableCellService.isEditing<IMovie>(record, editingId)
                return editable
                    ?
                    <span>
                        <Typography.Link href="" className="mr-6"
                            onClick={ (e) => EditableCellService.save<IMovie>(e, record.id, setEditingId) }>
                            Sauvegarder
                        </Typography.Link>
                        <Popconfirm title="Veux-tu vraiment annuler ?"
                            onConfirm={ () => EditableCellService.cancel(setEditingId) }>
                            <a>Annuler</a>
                        </Popconfirm>
                    </span>
                    :
                    <Typography.Link disabled={ editingId !== 0 }
                        onClick={ () => EditableCellService.edit<IMovie>(record, setEditingId) }>
                        Modifier
                    </Typography.Link>
            }
        },
    ]

    const handleOkModal = () => {
        formRowAddition.validateFields()
            .then(values => {
                MovieService.create(values, file)
                    .then(movie => setMovies([...movies, movie]))
                    .catch(err => console.log(err))
                    .finally(() => formRowAddition.resetFields())
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
            <Button type="primary" className="my-4" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un court-métrage
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: () => EditableCellService.cancel(setEditingId), position: [ "bottomCenter"] }}
                    bordered dataSource={ movies } columns={ EditableCellService.mergedColumns(columns, editingId) } loading={ isMovieLoading }>
                </Table>
            </Form>

            <Modal title="Nouveau court-métrage" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddMovie form={formRowAddition} onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL } />
        </Navigation>
    )
}
export default DashboardMovie