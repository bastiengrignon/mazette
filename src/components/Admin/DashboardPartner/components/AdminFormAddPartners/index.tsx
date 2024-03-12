import React, { useRef } from 'react';
import { Button, Form, FormInstance, Input, InputRef, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import { UploadService } from '../../../../../services';
import {
  ADMIN_PARTNERS_IMAGE,
  ADMIN_PARTNERS_IMAGE_RULE,
  ADMIN_PARTNERS_LINK,
  ADMIN_PARTNERS_LINK_PLACEHOLDER,
  ADMIN_PARTNERS_LINK_RULE,
  ADMIN_PARTNERS_NAME,
  ADMIN_PARTNERS_NAME_PLACEHOLDER,
  ADMIN_PARTNERS_NAME_RULE,
} from './AdminFormAddPartners.constants';

interface AdminFormAddPartnerProps {
  form: FormInstance;
}

const AdminFormAddPartners: React.FC<AdminFormAddPartnerProps> = ({ form }) => {
  const inputRef = useRef<InputRef>(null);

  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, 0);

  return (
    <Form form={form}>
      <Form.Item
        label={ADMIN_PARTNERS_NAME}
        name="name"
        rules={[{ required: true, message: ADMIN_PARTNERS_NAME_RULE }]}>
        <Input placeholder={ADMIN_PARTNERS_NAME_PLACEHOLDER} ref={inputRef} />
      </Form.Item>
      <Form.Item
        label={ADMIN_PARTNERS_IMAGE}
        name="image"
        rules={[{ required: true, message: ADMIN_PARTNERS_IMAGE_RULE }]}>
        <Upload name="image" customRequest={UploadService.dummyUploadRequest}>
          <Button icon={<UploadOutlined />}>{ADMIN_PARTNERS_IMAGE_RULE}</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label={ADMIN_PARTNERS_LINK}
        name="link"
        rules={[{ required: false, message: ADMIN_PARTNERS_LINK_RULE }]}>
        <Input placeholder={ADMIN_PARTNERS_LINK_PLACEHOLDER} />
      </Form.Item>
    </Form>
  );
};
export default AdminFormAddPartners;
