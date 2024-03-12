import React, { useRef } from 'react';
import { Button, Form, FormInstance, Input, InputRef, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import { UploadService } from '../../../../../services';
import {
  ADMIN_TROMBINOSCOPE_IMAGE,
  ADMIN_TROMBINOSCOPE_IMAGE_RULE,
  ADMIN_TROMBINOSCOPE_NAME,
  ADMIN_TROMBINOSCOPE_NAME_RULE,
} from './AdminFormAddTrombinoscope.constants';

interface AdminFormAddPartnerProps {
  form: FormInstance;
}

const AdminFormAddTrombinoscope: React.FC<AdminFormAddPartnerProps> = ({ form }) => {
  const inputRef = useRef<InputRef>(null);

  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, 0);

  return (
    <Form form={form}>
      <Form.Item
        label={ADMIN_TROMBINOSCOPE_NAME}
        name="name"
        rules={[{ required: true, message: ADMIN_TROMBINOSCOPE_NAME_RULE }]}>
        <Input ref={inputRef} />
      </Form.Item>
      <Form.Item
        label={ADMIN_TROMBINOSCOPE_IMAGE}
        name="image"
        rules={[{ required: true, message: ADMIN_TROMBINOSCOPE_IMAGE_RULE }]}>
        <Upload name="image" customRequest={UploadService.dummyUploadRequest}>
          <Button icon={<UploadOutlined />}>{ADMIN_TROMBINOSCOPE_IMAGE_RULE}</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};
export default AdminFormAddTrombinoscope;
