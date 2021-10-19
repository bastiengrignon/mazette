import React from 'react'
import { Button, DatePicker, Form, FormInstance, Input, TimePicker, Upload } from 'antd'

import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { UploadOutlined } from '@ant-design/icons'
import { UploadService } from '../../../services'

interface AdminFormAddMovieProps {
    form: FormInstance
    onUploadChange: (info: UploadChangeParam<UploadFile<File>>) => void
}

const AdminFormAddMovie: React.FC<AdminFormAddMovieProps> = ({ form, onUploadChange }) => {
    return (
        <Form form={ form }>
            <Form.Item label="Titre" name="title" rules={ [{ required: true, message: 'Entrez le titre du court-métrage' }] }>
                <Input/>
            </Form.Item>
            <Form.Item label="Auteur" name="author" rules={ [{ required: true, message: 'Entrez l\'auteur ' }] }>
                <Input className="capitalize"/>
            </Form.Item>
            <Form.Item label="Description" name="description" rules={ [{ required: true, message: 'Entrez une description' }] }>
                <Input.TextArea/>
            </Form.Item>
            <div className="inline-flex justify-between w-full space-x-2">
                <Form.Item label="Date" name="date" rules={ [{ type: 'object', required: true, message: 'Entrez la date de création' }] }>
                    <DatePicker picker="year"/>
                </Form.Item>
                <Form.Item label="Provenance" name="location" rules={ [{ required: true, message: 'Entrez une provenance' }] }>
                    <Input className="capitalize" placeholder="France" allowClear={ true }/>
                </Form.Item>
            </div>
            <div className="inline-flex justify-between w-full space-x-2">
                <Form.Item label="Durée" name="duration" rules={ [{ type: 'object', required: true, message: 'Entrez la durée ' }] }>
                    <TimePicker showHour={ false } format="mm:ss"/>
                </Form.Item>
                <Form.Item label="Date de publication" name="publicationDate" rules={ [{ type: 'date', required: true, message: 'Entrez la date de publication au festival' }] }>
                    <DatePicker/>
                </Form.Item>
            </div>
            <div className="inline-flex justify-between w-full space-x-2">
                <Form.Item label="Fichier" name="imgThumbnail" rules={ [{ required: true, message: 'Ajouter une image !' }] }>
                    <Upload name="imgThumbnail" onChange={ onUploadChange } customRequest={ UploadService.dummyUploadRequest }>
                        <Button icon={ <UploadOutlined /> }>Ajouter un fichier</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Lien bande annonce">
                    <Input type="url" placeholder="https://youtu.be/example" allowClear={ true }/>
                </Form.Item>
            </div>
        </Form>
    )
}
export default AdminFormAddMovie