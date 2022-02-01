import React from 'react'
import { Button, Form, FormInstance, Input, Upload } from 'antd'

import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { UploadOutlined } from '@ant-design/icons'
import { UploadService } from '../../../../../services'

interface AdminFormAddPartnerProps {
    form: FormInstance
    onUploadChange: (info: UploadChangeParam<UploadFile<File>>) => void
}

const AdminFormAddPartners: React.FC<AdminFormAddPartnerProps> = ({ form, onUploadChange }) => (
    <Form form={ form }>
        <Form.Item label="Nom" name="name"
            rules={ [{ required: true, message: 'Entrez un nom' }] }>
            <Input placeholder="Nom du partenaire"/>
        </Form.Item>
        <Form.Item label="Image" name="image" rules={ [{ required: true, message: 'Ajouter une image !' }] }>
            <Upload name="image" onChange={ onUploadChange } customRequest={ UploadService.dummyUploadRequest }>
                <Button icon={ <UploadOutlined/> }>Ajouter une image</Button>
            </Upload>
        </Form.Item>
        <Form.Item label="Lien" name="link"
            rules={ [{ required: false, message: 'Entrez un lien' }] }>
            <Input placeholder="Lien du partenaire"/>
        </Form.Item>
    </Form>
)
export default AdminFormAddPartners