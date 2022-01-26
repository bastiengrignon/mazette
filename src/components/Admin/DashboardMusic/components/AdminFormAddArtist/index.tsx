import React from 'react'
import { Button, DatePicker, Form, FormInstance, Input, Upload } from 'antd'

import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { UploadOutlined } from '@ant-design/icons'
import { UploadService } from '../../../../../services'

interface AdminFormAddArtistProps {
    form: FormInstance
    onUploadChange: (info: UploadChangeParam<UploadFile<File>>) => void
}

const AdminFormAddArtist: React.FC<AdminFormAddArtistProps> = ({ form, onUploadChange }) => (
    <Form form={ form }>
        <Form.Item label="Nom" name="name"
            rules={ [{ required: true, message: 'Entrez le nom de l\'artiste' }] }>
            <Input/>
        </Form.Item>
        <Form.Item label="Style" name="type"
            rules={ [{ required: true, message: 'Entrez le style artistique ' }] }>
            <Input className="capitalize"/>
        </Form.Item>
        <Form.Item label="Description" name="description"
            rules={ [{ required: true, message: 'Entrez une description' }] }>
            <Input.TextArea/>
        </Form.Item>
        <div className="inline-flex justify-between w-full space-x-2">
            <Form.Item label="Date de publication" name="publicationDate"
                rules={ [{ type: 'date', required: true, message: 'Entrez la date de publication au festival' }] }>
                <DatePicker/>
            </Form.Item>
            <Form.Item label="Lien bande annonce">
                <Input type="url" placeholder="https://youtu.be/example" allowClear={ true }/>
            </Form.Item>
        </div>
        <Form.Item label="Image" name="image" rules={ [{ required: true, message: 'Ajouter une image !' }] }>
            <Upload name="image" onChange={ onUploadChange } customRequest={ UploadService.dummyUploadRequest }>
                <Button icon={ <UploadOutlined/> }>Ajouter une image</Button>
            </Upload>
        </Form.Item>
    </Form>
)
export default AdminFormAddArtist