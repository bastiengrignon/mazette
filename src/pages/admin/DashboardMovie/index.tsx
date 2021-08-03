import React, { useEffect, useState } from "react"
import {
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Popconfirm,
    Table,
    TimePicker,
    Typography,
    Upload
} from "antd"
import { UploadOutlined } from "@ant-design/icons"
import Navigation from "../Navigation"
import { IMovie } from "../../../services/admin/movie/movie.interface"
import { MovieService } from "../../../services/admin/movie/movie.service"
import EditableCell from "../EditableCell"
import { UploadChangeParam } from "antd/es/upload"
import { UploadFile } from "antd/es/upload/interface"
import { UploadService } from "../../../services/admin/upload/upload.service"

const DashboardMovie: React.FC = () => {
    const [movies, setMovies] = useState<IMovie[]>([])
    const [newMovies, setNewMovies] = useState<IMovie[]>(movies)
    const [editingId, setEditingId] = useState(0)
    const [formRowEdition] = Form.useForm()

    const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false)
    const [formRowAddition] = Form.useForm()
    const [imageUrl, setImageUrl] = useState<string>("")

    useEffect(() => {
        MovieService.getAll().then(movies => setMovies(movies))
    }, [newMovies])

    const isEditing = (record: IMovie) => record.id === editingId

    const cancel = () => setEditingId(0)

    const edit = (record: Partial<IMovie>) => {
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

    const save = async (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
        e.preventDefault()
        try {
            const row = (await formRowEdition.validateFields()) as IMovie

            MovieService.update(id, row).then(res => {
                const index = movies.findIndex(movie => movie.id === id)
                setNewMovies(movies.splice(index, 1, {
                    ...movies[index],
                    ...res
                }))
            })
            setEditingId(0)
        } catch (err) {
            console.log("Validate Failed: ", err)
        }
    }

    const columns = [
        {
            title: "Titre",
            key: "title",
            dataIndex: "title",
            editable: true,
            render: function renderTitle(title: string) {
                return <div className="font-avenirBL">{ title }</div>
            },
            sorter: (a, b) => a.title.localeCompare(b.title)
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
            editable: true
        },
        {
            title: "Image",
            key: "imgThumbnail",
            dataIndex: "imgThumbnail",
            render: function renderImage(imageSrc) {
                return <div className="flex justify-center items-center">
                    <img className="w-24 h-auto" src={ imageSrc } alt={ imageSrc }/>
                </div>
            },
            editable: false
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",

            render: function renderAction(_, record: IMovie) {
                const editable = isEditing(record)
                return editable
                    ?
                    <span>
                        <Typography.Link href="" onClick={ (e) => save(e, record.id) } className="mr-6">
                            Sauvegarder
                        </Typography.Link>
                        <Popconfirm title="Veux-tu vraiment annuler ?" onConfirm={ cancel }>
                            <a>Annuler</a>
                        </Popconfirm>
                    </span>
                    :
                    <Typography.Link disabled={ editingId !== 0 } onClick={ () => edit(record) }>
                        Modifier
                    </Typography.Link>
            }
        },
    ]

    const mergedColumns = columns.map(col => {
        if (!col.editable) return col
        return {
            ...col,
            onCell: (record: IMovie) => ({
                record,
                inputType: "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        }
    })

    const handleOkModal = () => {
        formRowAddition.validateFields()
            .then(values => {
                MovieService.create(values, imageUrl)
                    .then(movie => setMovies([...movies, movie]))
                    .catch(err => console.log(err))
                    .finally(() => formRowAddition.resetFields())
                setAddRowModalVisible(false)
            })
            .catch(err => message.warn("Validation failed: ", err))
    }

    const handleCancelModal = () => {
        setAddRowModalVisible(false)
    }

    const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
        if (info.file.status === "done")
            message.success(`${ info.file.name } uploadé avec succès`)
        else if (info.file.status === "error")
            message.error(`${ info.file.name } ne s'est pas uploadé!`)
        setImageUrl(URL.createObjectURL(info.file.originFileObj))
    }

    return (
        <Navigation>
            <p className="text-xl mb-2">Liste des courts-métrages : </p>
            <Button type="primary" className="my-4" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un court-métrage
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: cancel, position: [ "bottomCenter"] }}
                    bordered dataSource={ movies } columns={ mergedColumns }>
                </Table>
            </Form>
            <Modal title="Nouveau court-métrage" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ handleCancelModal } onOk={ handleOkModal } cancelText="Annuler">
                <Form form={ formRowAddition }>
                    <Form.Item label="Titre" name="title" rules={ [{ required: true, message: "Entrez le titre du court-métrage" }] }>
                        <Input className="capitalize"/>
                    </Form.Item>
                    <Form.Item label="Auteur" name="author" rules={ [{ required: true, message: "Entrez l'auteur " }] }>
                        <Input className="capitalize"/>
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={ [{ required: true, message: "Entrez une description" }] }>
                        <Input.TextArea className="capitalize"/>
                    </Form.Item>
                    <div className="inline-flex space-x-2">
                        <Form.Item label="Date" name="date" rules={ [{ type: "object", required: true, message: "Entrez la date de création" }] }>
                            <DatePicker picker="year"/>
                        </Form.Item>
                        <Form.Item label="Provenance" name="location" rules={ [{ required: true, message: "Entrez une provenance" }] }>
                            <Input className="capitalize"/>
                        </Form.Item>
                    </div>
                    <div className="inline-flex space-x-2">
                        <Form.Item label="Durée" name="duration" rules={ [{ type: "object", required: true, message: "Entrez la durée " }] }>
                            <TimePicker showHour={ false } format="mm:ss"/>
                        </Form.Item>
                        <Form.Item label="Date de publication" name="publicationDate" rules={ [{ type: "date", required: true, message: "Entrez la date de publication au festival" }] }>
                            <DatePicker/>
                        </Form.Item>
                    </div>
                    <Form.Item label="Fichier" name="imgThumbnail" rules={ [{ required: true, message: "Ajouter une image !" }] }>
                        <Upload name="imgThumbnail" onChange={ handleChange } customRequest={ UploadService.dummyUploadRequest }>
                            <Button icon={ <UploadOutlined /> }>Ajouter un fichier</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </Navigation>
    )
}
export default DashboardMovie