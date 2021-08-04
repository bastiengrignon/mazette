import React, { useEffect, useState } from "react"
import Navigation from "../Navigation"
import {
    Button,
    DatePicker,
    Form,
    Input, message,
    Modal,
    Popconfirm,
    Table,
    Typography, Upload
} from "antd"
import EditableCell from "../EditableCell"
import { AdvancedImage } from "@cloudinary/react"
import { cloudinary } from "../../../index"
import { IMusic } from "../../../services/admin/music/music.interface"
import { MusicService } from "../../../services/admin/music/music.service"
import { UploadService } from "../../../services/admin/upload/upload.service"
import { UploadOutlined } from "@ant-design/icons"
import { UploadChangeParam } from "antd/es/upload"
import { UploadFile } from "antd/es/upload/interface"

const DashboardMusic:React.FC = () => {
    const [musics, setMusics] = useState<IMusic[]>([])
    const [newMusics, setNewMusics] = useState<IMusic[]>(musics)
    const [editingId, setEditingId] = useState(0)

    const [formRowEdition] = Form.useForm()
    const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false)
    const [formRowAddition] = Form.useForm()
    const [file, setFile] = useState<File>()

    const [previewModalVisible, setPreviewModalVisible] = useState<boolean>(false)
    const [previewURL, setPreviewURL] = useState<string>("")

    useEffect(() => {
        MusicService.getAll().then(musics => setMusics(musics))
    }, [newMusics])

    const isEditing = (record: IMusic) => record.id === editingId

    const cancel = () => setEditingId(0)

    const edit = (record: Partial<IMusic>) => {
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

    const save = async (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
        e.preventDefault()
        try {
            const row = (await formRowEdition.validateFields()) as IMusic

            MusicService.update(id, row).then(res => {
                const index = musics.findIndex(movie => movie.id === id)
                setNewMusics(musics.splice(index, 1, {
                    ...musics[index],
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
            title: "Nom d'artiste",
            key: "name",
            dataIndex: "name",
            editable: true,
            render: function renderTitle(title: string) {
                return <div className="font-avenirBL">{ title }</div>
            },
            sorter: (a, b) => a.title.localeCompare(b.title)
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
            editable: true
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
            onCell: (record: IMusic) => ({
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
                MusicService.create(values, file)
                    .then(music => setMusics([...musics, music]))
                    .catch(err => console.log(err))
                    .finally(() => formRowAddition.resetFields())
                setAddRowModalVisible(false)
            })
            .catch(err => message.warn("Validation failed: ", err))
    }

    const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
        if (info.file.status === "done")
            message.success(`${ info.file.name } uploadé avec succès`)
        else if (info.file.status === "error")
            message.error(`${ info.file.name } ne s'est pas uploadé!`)
        setFile(info.file.originFileObj)
    }

    const handleCancelModal = () => {
        setAddRowModalVisible(false)
    }

    const handleCancelModalPreview = () => {
        setPreviewModalVisible(false)
    }

    const openModalPreview = (imageId: string) => {
        setPreviewModalVisible(true)
        setPreviewURL(imageId)
    }

    return (
        <Navigation>
            <p className="text-xl mb-2">Liste des artistes : </p>
            <Button type="primary" className="my-4" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un artiste
            </Button>
            <Form form={ formRowEdition } component={ false }>
                <Table components={{ body: { cell: EditableCell, } }} rowClassName="editable-row"
                    rowKey="id" pagination={{ onChange: cancel, position: [ "bottomCenter"] }}
                    bordered dataSource={ musics } columns={ mergedColumns }>
                </Table>
            </Form>
            <Modal title="Nouvel artiste" visible={ addRowModalVisible } okText="Ajouter"
                onCancel={ handleCancelModal } onOk={ handleOkModal } cancelText="Annuler">
                <Form form={ formRowAddition }>
                    <Form.Item label="Nom" name="name" rules={ [{ required: true, message: "Entrez le nom de l'artiste" }] }>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Style" name="type" rules={ [{ required: true, message: "Entrez le style artistique " }] }>
                        <Input className="capitalize"/>
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={ [{ required: true, message: "Entrez une description" }] }>
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item label="Date de publication" name="publicationDate" rules={ [{ type: "date", required: true, message: "Entrez la date de publication au festival" }] }>
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item label="Image" name="image" rules={ [{ required: true, message: "Ajouter une image !" }] }>
                        <Upload name="image" onChange={ handleChange } customRequest={ UploadService.dummyUploadRequest }>
                            <Button icon={ <UploadOutlined /> }>Ajouter une image</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal visible={ previewModalVisible } footer={ null } onCancel={ handleCancelModalPreview }>
                <AdvancedImage className="w-full h-auto my-5" cldImg={ cloudinary.image(`/${ previewURL }`) }/>
            </Modal>
        </Navigation>
    )
}
export default DashboardMusic