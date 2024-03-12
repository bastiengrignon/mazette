import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, FormInstance, Input, InputRef, Upload } from 'antd';

import { UploadService } from '../../../../../services';
import {
  ADMIN_ARTIST_DESCRIPTION,
  ADMIN_ARTIST_DESCRIPTION_RULE,
  ADMIN_ARTIST_IMAGE,
  ADMIN_ARTIST_IMAGE_RULE,
  ADMIN_ARTIST_LINK,
  ADMIN_ARTIST_LINK_PLACEHOLDER,
  ADMIN_ARTIST_NAME,
  ADMIN_ARTIST_NAME_RULE,
  ADMIN_ARTIST_PUBLICATION_DATE,
  ADMIN_ARTIST_PUBLICATION_DATE_RULE,
  ADMIN_ARTIST_STYLE,
  ADMIN_ARTIST_STYLE_RULE,
} from './AdminFormAddArtist.constants';
import { FestivalService, IFestival } from '../../../../../services/admin/festival';

interface AdminFormAddArtistProps {
  form: FormInstance;
}

const AdminFormAddArtist: React.FC<AdminFormAddArtistProps> = ({ form }) => {
  const [festival, setFestival] = useState<IFestival>({} as IFestival);
  const inputRef = useRef<InputRef>(null);

  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, 0);

  useEffect(() => {
    FestivalService.getLastFestival().then(setFestival);
  }, []);

  const disabledDates = (current) => {
    const festivalStartDate = dayjs(festival.startDate).format('YYYY-MM-DD');
    const festivalEndDate = dayjs(festival.endDate).format('YYYY-MM-DD');
    const currentDay = dayjs(current).format('YYYY-MM-DD');
    return current && currentDay !== festivalStartDate && currentDay !== festivalEndDate;
  };

  return (
    <Form form={form}>
      <Form.Item label={ADMIN_ARTIST_NAME} name="name" rules={[{ required: true, message: ADMIN_ARTIST_NAME_RULE }]}>
        <Input ref={inputRef} />
      </Form.Item>
      <Form.Item label={ADMIN_ARTIST_STYLE} name="type" rules={[{ required: true, message: ADMIN_ARTIST_STYLE_RULE }]}>
        <Input className="capitalize" />
      </Form.Item>
      <Form.Item
        label={ADMIN_ARTIST_DESCRIPTION}
        name="description"
        rules={[{ required: true, message: ADMIN_ARTIST_DESCRIPTION_RULE }]}>
        <Input.TextArea />
      </Form.Item>
      <div className="inline-flex justify-between w-full space-x-2">
        <Form.Item
          label={ADMIN_ARTIST_PUBLICATION_DATE}
          name="publicationDate"
          rules={[
            {
              type: 'date',
              required: true,
              message: ADMIN_ARTIST_PUBLICATION_DATE_RULE,
            },
          ]}>
          <DatePicker disabledDate={disabledDates} />
        </Form.Item>
        <Form.Item label={ADMIN_ARTIST_LINK}>
          <Input type="url" placeholder={ADMIN_ARTIST_LINK_PLACEHOLDER} allowClear={true} />
        </Form.Item>
      </div>
      <Form.Item label={ADMIN_ARTIST_IMAGE} name="image" rules={[{ required: true, message: ADMIN_ARTIST_IMAGE_RULE }]}>
        <Upload name="image" customRequest={UploadService.dummyUploadRequest}>
          <Button icon={<UploadOutlined />}>{ADMIN_ARTIST_IMAGE_RULE}</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};
export default AdminFormAddArtist;
