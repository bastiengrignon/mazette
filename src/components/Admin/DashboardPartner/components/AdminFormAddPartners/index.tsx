import React from 'react'
import { Button, Form, FormInstance, Input, Upload } from 'antd'

import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { UploadOutlined } from '@ant-design/icons'

import { UploadService } from '../../../../../services'
import {
    ADMIN_PARTNERS_IMAGE,
    ADMIN_PARTNERS_IMAGE_RULE,
    ADMIN_PARTNERS_LINK,
    ADMIN_PARTNERS_LINK_PLACEHOLDER,
    ADMIN_PARTNERS_LINK_RULE,
    ADMIN_PARTNERS_NAME,
    ADMIN_PARTNERS_NAME_PLACEHOLDER,
    ADMIN_PARTNERS_NAME_RULE
} from './AdminFormAddPartners.constants'

interface AdminFormAddPartnerProps {
    form: FormInstance
    onUploadChange: (info: UploadChangeParam<UploadFile<File>>) => void
}

const AdminFormAddPartners: React.FC<AdminFormAddPartnerProps> = ({ form, onUploadChange }) => (
    <Form form={ form }>
        <Form.Item label={ ADMIN_PARTNERS_NAME } name="name"
            rules={ [{ required: true, message: ADMIN_PARTNERS_NAME_RULE }] }>
            <Input placeholder={ ADMIN_PARTNERS_NAME_PLACEHOLDER }/>
        </Form.Item>
        <Form.Item label={ ADMIN_PARTNERS_IMAGE } name="image"
            rules={ [{ required: true, message: ADMIN_PARTNERS_IMAGE_RULE }] }>
            <Upload name="image" onChange={ onUploadChange } customRequest={ UploadService.dummyUploadRequest }>
                <Button icon={ <UploadOutlined rev={undefined}/> }>{ ADMIN_PARTNERS_IMAGE_RULE }</Button>
            </Upload>
        </Form.Item>
        <Form.Item label={ ADMIN_PARTNERS_LINK } name="link"
            rules={ [{ required: false, message: ADMIN_PARTNERS_LINK_RULE }] }>
            <Input placeholder={ ADMIN_PARTNERS_LINK_PLACEHOLDER }/>
        </Form.Item>
    </Form>
)
export default AdminFormAddPartners
