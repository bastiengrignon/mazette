import loadable from '@loadable/component'
import {
    Button,
    Form,
    Modal,
    Tooltip,
    message
} from 'antd'
import React, { useEffect, useState } from 'react'

import { AdvancedImage } from '@cloudinary/react'

import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { cloudinary } from '../../../index'
import { formatDate } from '../../../lib/date'
import useModal from '../../../constants/hooks'
import { CommonService, IMovie, MovieService, UploadService } from '../../../services'

import CustomTable from '../CustomTable'
import ActionButtonsRow, { ActionButtonType } from '../EditableCell/components/ActionButtonsRow'

const AdminFormAddMovie = loadable(() => import('./components/AdminFormAddMovie'))
const Link = loadable(() => import('../../Link'))
const Navigation = loadable(() => import('../../../pages/admin/Navigation'))
const PreviewModal = loadable(() => import('../PreviewModal'))

const DashboardMovie: React.FC = () => {
    const [isMovieLoading, setIsMovieLoading] = useState<boolean>(false)
    const [movies, setMovies] = useState<IMovie[]>([])
    const [newMovies, setNewMovies] = useState<IMovie[]>([])

    // Row edition
    const [editingId, setEditingId] = useState<number>(0)
    const [formRowEdition] = Form.useForm()

    // Add row modal
    const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false)
    const [formRowAddition] = Form.useForm()
    const [file, setFile] = useState<File>()

    // Preview modal
    const { isOpen, toggle } = useModal()
    const [previewURL, setPreviewURL] = useState<string>('')

    useEffect(() => {
        setIsMovieLoading(true)
        MovieService.getAll()
            .then(setMovies)
            .finally(() => setIsMovieLoading(false))
    }, [newMovies])

    const isEditing = (record: IMovie): boolean => record.id === editingId

    const columns = [
        {
            title    : 'Titre',
            key      : 'title',
            dataIndex: 'title',
            editable : true,
            render(title: string) {
                return <div className="font-avenirBL">{ title }</div>
            },
            sorter: (a: IMovie, b: IMovie) => a.title.localeCompare(b.title)
        },
        {
            title    : 'Auteur',
            key      : 'author',
            dataIndex: 'author',
            editable : true
        },
        {
            title    : 'Description',
            key      : 'description',
            dataIndex: 'description',
            editable : true,
            ellipsis : { showTitle: false },
            render(description: string) {
                return (
                    <Tooltip placement="top" title={ description } color="blue">
                        { description }
                    </Tooltip>
                )
            }
        },
        {
            title    : 'Date',
            key      : 'date',
            dataIndex: 'date',
            editable : true
        },
        {
            title    : 'Provenance',
            key      : 'location',
            dataIndex: 'location',
            editable : true
        },
        {
            title    : 'Durée',
            key      : 'duration',
            dataIndex: 'duration',
            editable : true
        },
        {
            title    : 'Date de publication',
            key      : 'publicationDate',
            dataIndex: 'publicationDate',
            inputType: 'date',
            editable : true,
            sorter   : (a: IMovie, b: IMovie) => Number(a.publicationDate) - Number(b.publicationDate),
            render(date: Date) {
                return <span>{ formatDate(date) }</span>
            },
        },
        {
            title    : 'Lien Vidéo',
            key      : 'videoLink',
            dataIndex: 'videoLink',
            editable : true,
            ellipsis : { showTitle: false },
            render(link: string) {
                return <Link src={ link } title={ link }/>
            }
        },
        {
            title    : 'Image',
            key      : 'imgThumbnail',
            dataIndex: 'imgThumbnail',
            editable : false,
            render(imageId: string) {
                return <div className="flex justify-center items-center cursor-pointer"
                    title="Visualiser l'image" onClick={ () => openModalPreview(imageId) }>
                    <AdvancedImage className="w-24 h-auto" cldImg={ cloudinary.image(imageId) }/>
                </div>
            }
        },
        {
            title    : 'Action',
            key      : 'action',
            dataIndex: 'action',
            fixed    : 'right',
            render(_, record: IMovie) {
                const editable = isEditing(record)
                return <ActionButtonsRow editable={ editable } record={ record } setEditingId={ setEditingId }
                    form={ formRowEdition } setObject={ setNewMovies } object={ movies }
                    type={ ActionButtonType.MOVIE }/>
            }
        }
    ]

    const mergedColumns = CommonService.mergedColumns(columns, isEditing)

    const handleOkModal = () => {
        const hideLoadingMessage = message.loading('Ajout en cours', 0)
        formRowAddition.validateFields()
            .then(values => {
                MovieService.create(values, file)
                    .then(movie => {
                        setMovies([...movies, movie])
                        message.success('Court-métrage ajouté', 2.5)
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

    const openModalPreview = (imageId: string) => {
        setPreviewURL(imageId)
        toggle()
    }

    const handleChange = (info: UploadChangeParam<UploadFile<File>>) => setFile(UploadService.handleChange(info))

    return (
        <Navigation>
            <p className="text-xl mb-2">Liste des courts-métrages : </p>
            <Button type="primary" className="my-4 button" onClick={ () => setAddRowModalVisible(true) }>
                Ajouter un court-métrage
            </Button>
            <CustomTable form={ formRowEdition } columns={ mergedColumns } dataSource={ movies }
                loading={ isMovieLoading } setEditingId={ setEditingId }/>

            <Modal title="Nouveau court-métrage" open={ addRowModalVisible } okText="Ajouter"
                onCancel={ () => setAddRowModalVisible(false) } okButtonProps={ { className: 'button' } }
                onOk={ handleOkModal } cancelText="Annuler">
                <AdminFormAddMovie form={ formRowAddition } onUploadChange={ handleChange }/>
            </Modal>
            <PreviewModal open={ isOpen } hide={ toggle } previewURL={ previewURL }/>
        </Navigation>
    )
}
export default DashboardMovie
