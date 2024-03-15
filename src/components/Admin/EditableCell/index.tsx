/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import CellInputNode from './components/CellInputNode';
import { Form } from 'antd';

export type ColumnInputType = 'text' | 'textarea' | 'date';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: ColumnInputType;
  children: React.ReactNode;
  required: boolean;
  currentValue: any;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  currentValue,
  ...restProps
}) => {
  const childNode = !editing ? (
    children
  ) : (
    <Form.Item
      name={dataIndex}
      style={{ margin: 0 }}
      rules={[
        {
          required: restProps.required,
          message: `Entrer un ${title} !`,
        },
      ]}>
      <CellInputNode inputType={inputType} value={currentValue} required={restProps.required} />
    </Form.Item>
  );

  return <td {...restProps}>{childNode}</td>;
};
export default EditableCell;
