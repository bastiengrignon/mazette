import React from 'react'
import { Button, Form, FormInstance, Input, Upload } from 'antd'

import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { UploadOutlined } from '@ant-design/icons'

import { UploadService } from '../../../../../services'
import {
    ADMIN_TROMBINOSCOPE_IMAGE, ADMIN_TROMBINOSCOPE_IMAGE_RULE,
    ADMIN_TROMBINOSCOPE_NAME,
    ADMIN_TROMBINOSCOPE_NAME_RULE
} from './AdminFormAddTrombinoscope.constants'

interface AdminFormAddPartnerProps {
    form: FormInstance
    onUploadChange: (info: UploadChangeParam<UploadFile<File>>) => void
}

const AdminFormAddTrombinoscope: React.FC<AdminFormAddPartnerProps> = ({ form, onUploadChange }) => (
    <Form form={ form }>
        <Form.Item label={ADMIN_TROMBINOSCOPE_NAME} name="name"
            rules={ [{ required: true, message: ADMIN_TROMBINOSCOPE_NAME_RULE }] }>
            <Input/>
        </Form.Item>
        <Form.Item label={ADMIN_TROMBINOSCOPE_IMAGE} name="image" rules={ [{ required: true, message: ADMIN_TROMBINOSCOPE_IMAGE_RULE }] }>
            <Upload name="image" onChange={ onUploadChange } customRequest={ UploadService.dummyUploadRequest }>
                <Button icon={ <UploadOutlined/> }>{ADMIN_TROMBINOSCOPE_IMAGE_RULE}</Button>
            </Upload>
        </Form.Item>
    </Form>
)
export default AdminFormAddTrombinoscope