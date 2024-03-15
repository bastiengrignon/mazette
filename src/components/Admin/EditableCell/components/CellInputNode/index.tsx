/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import dayjs from 'dayjs';
import { DatePicker, Input } from 'antd';

import { ColumnInputType } from '../../index';

interface CellInputNodeProps {
  inputType: ColumnInputType;
  value: any;
  required?: boolean;
}

const CellInputNode: React.FC<CellInputNodeProps> = ({ inputType, value, required, ...restProps }) => {
  const newValue = inputType === 'date' ? dayjs(value || undefined) : value;

  switch (inputType) {
    case 'textarea':
      return <Input.TextArea value={newValue} {...restProps} required={required} />;
    case 'date':
      return <DatePicker value={newValue} {...restProps} required={required} />;
    case 'text':
    default:
      return <Input value={newValue} {...restProps} required={required} />;
  }
};

export default CellInputNode;
