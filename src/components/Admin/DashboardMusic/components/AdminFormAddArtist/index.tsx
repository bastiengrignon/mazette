import React from 'react'
import { UploadChangeParam } from 'antd/es/upload'
import { UploadFile } from 'antd/es/upload/interface'
import { UploadOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, FormInstance, Input, Upload } from 'antd'

import { UploadService } from '../../../../../services'
import {
    ADMIN_ARTIST_DESCRIPTION,
    ADMIN_ARTIST_DESCRIPTION_RULE, ADMIN_ARTIST_IMAGE,
    ADMIN_ARTIST_IMAGE_RULE,
    ADMIN_ARTIST_LINK,
    ADMIN_ARTIST_LINK_PLACEHOLDER,
    ADMIN_ARTIST_NAME,
    ADMIN_ARTIST_NAME_RULE,
    ADMIN_ARTIST_PUBLICATION_DATE,
    ADMIN_ARTIST_PUBLICATION_DATE_RULE,
    ADMIN_ARTIST_STYLE,
    ADMIN_ARTIST_STYLE_RULE
} from './AdminFormAddArtist.constants'

interface AdminFormAddArtistProps {
    form: FormInstance
    onUploadChange: (info: UploadChangeParam<UploadFile<File>>) => void
}

const AdminFormAddArtist: React.FC<AdminFormAddArtistProps> = ({ form, onUploadChange }) => (
    <Form form={ form }>
        <Form.Item label={ADMIN_ARTIST_NAME} name="name"
            rules={ [{ required: true, message: ADMIN_ARTIST_NAME_RULE }] }>
            <Input/>
        </Form.Item>
        <Form.Item label={ADMIN_ARTIST_STYLE} name="type"
            rules={ [{ required: true, message: ADMIN_ARTIST_STYLE_RULE }] }>
            <Input className="capitalize"/>
        </Form.Item>
        <Form.Item label={ADMIN_ARTIST_DESCRIPTION} name="description"
            rules={ [{ required: true, message: ADMIN_ARTIST_DESCRIPTION_RULE }] }>
            <Input.TextArea/>
        </Form.Item>
        <div className="inline-flex justify-between w-full space-x-2">
            <Form.Item label={ADMIN_ARTIST_PUBLICATION_DATE} name="publicationDate"
                rules={ [{ type: 'date', required: true, message: ADMIN_ARTIST_PUBLICATION_DATE_RULE }] }>
                <DatePicker/>
            </Form.Item>
            <Form.Item label={ADMIN_ARTIST_LINK}>
                <Input type="url" placeholder={ADMIN_ARTIST_LINK_PLACEHOLDER} allowClear={ true }/>
            </Form.Item>
        </div>
        <Form.Item label={ADMIN_ARTIST_IMAGE} name="image" rules={ [{ required: true, message: ADMIN_ARTIST_IMAGE_RULE }] }>
            <Upload name="image" onChange={ onUploadChange } customRequest={ UploadService.dummyUploadRequest }>
                <Button icon={ <UploadOutlined/> }>{ ADMIN_ARTIST_IMAGE_RULE }</Button>
            </Upload>
        </Form.Item>
    </Form>
)
export default AdminFormAddArtist