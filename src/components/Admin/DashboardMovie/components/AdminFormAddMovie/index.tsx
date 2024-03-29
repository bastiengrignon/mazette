import dayjs, { Dayjs } from 'dayjs';
import { Button, DatePicker, Form, FormInstance, Input, InputRef, TimePicker, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { UploadService } from '../../../../../services';
import {
  ADMIN_MOVIE_AUTHOR,
  ADMIN_MOVIE_AUTHOR_RULE,
  ADMIN_MOVIE_DESCRIPTION,
  ADMIN_MOVIE_DESCRIPTION_RULE,
  ADMIN_MOVIE_DURATION,
  ADMIN_MOVIE_DURATION_RULE,
  ADMIN_MOVIE_IMAGE_ADD_FILE,
  ADMIN_MOVIE_IMAGE_THUMBNAIL,
  ADMIN_MOVIE_IMAGE_THUMBNAIL_RULE,
  ADMIN_MOVIE_LINK,
  ADMIN_MOVIE_LINK_EXAMPLE,
  ADMIN_MOVIE_LOCATION,
  ADMIN_MOVIE_LOCATION_RULE,
  ADMIN_MOVIE_PUBLICATION_DATE,
  ADMIN_MOVIE_PUBLICATION_DATE_RULE,
  ADMIN_MOVIE_TITLE,
  ADMIN_MOVIE_TITLE_RULE,
  ADMIN_MOVIE_YEAR,
  ADMIN_MOVIE_YEAR_RULE,
} from './AdminFormAddMovie.constants';
import { FestivalService, IFestival } from '../../../../../services/admin/festival';

interface AdminFormAddMovieProps {
  form: FormInstance;
}

const AdminFormAddMovie: React.FC<AdminFormAddMovieProps> = ({ form }) => {
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

  const disabledDates = (current: Dayjs) => {
    const festivalStartDate = dayjs(festival.startDate);
    const festivalEndDate = dayjs(festival.endDate);
    return current && (current.isAfter(festivalEndDate) || current.isBefore(festivalStartDate));
  };

  return (
    <Form form={form}>
      <Form.Item label={ADMIN_MOVIE_TITLE} name="title" rules={[{ required: true, message: ADMIN_MOVIE_TITLE_RULE }]}>
        <Input ref={inputRef} />
      </Form.Item>
      <Form.Item
        label={ADMIN_MOVIE_AUTHOR}
        name="author"
        rules={[{ required: true, message: ADMIN_MOVIE_AUTHOR_RULE }]}>
        <Input className="capitalize" />
      </Form.Item>
      <Form.Item
        label={ADMIN_MOVIE_DESCRIPTION}
        name="description"
        rules={[{ required: true, message: ADMIN_MOVIE_DESCRIPTION_RULE }]}>
        <Input.TextArea />
      </Form.Item>
      <div className="inline-flex justify-between w-full space-x-2">
        <Form.Item
          label={ADMIN_MOVIE_YEAR}
          name="date"
          rules={[{ type: 'object', required: true, message: ADMIN_MOVIE_YEAR_RULE }]}>
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item
          label={ADMIN_MOVIE_LOCATION}
          name="location"
          rules={[{ required: true, message: ADMIN_MOVIE_LOCATION_RULE }]}>
          <Input className="capitalize" placeholder="France" allowClear={true} />
        </Form.Item>
      </div>
      <div className="inline-flex justify-between w-full space-x-2">
        <Form.Item
          label={ADMIN_MOVIE_DURATION}
          name="duration"
          rules={[
            {
              type: 'object',
              required: true,
              message: ADMIN_MOVIE_DURATION_RULE,
            },
          ]}>
          <TimePicker defaultValue={dayjs()} format="HH:mm" />
        </Form.Item>
        <Form.Item
          label={ADMIN_MOVIE_PUBLICATION_DATE}
          name="publicationDate"
          rules={[
            {
              type: 'date',
              required: true,
              message: ADMIN_MOVIE_PUBLICATION_DATE_RULE,
            },
          ]}>
          <DatePicker disabledDate={disabledDates} />
        </Form.Item>
      </div>
      <div className="inline-flex justify-between w-full space-x-2">
        <Form.Item
          label={ADMIN_MOVIE_IMAGE_THUMBNAIL}
          name="imgThumbnail"
          rules={[{ required: true, message: ADMIN_MOVIE_IMAGE_THUMBNAIL_RULE }]}>
          <Upload name="imgThumbnail" customRequest={UploadService.dummyUploadRequest}>
            <Button icon={<UploadOutlined />}>{ADMIN_MOVIE_IMAGE_ADD_FILE}</Button>
          </Upload>
        </Form.Item>
        <Form.Item label={ADMIN_MOVIE_LINK}>
          <Input type="url" placeholder={ADMIN_MOVIE_LINK_EXAMPLE} allowClear={true} />
        </Form.Item>
      </div>
    </Form>
  );
};
export default AdminFormAddMovie;
