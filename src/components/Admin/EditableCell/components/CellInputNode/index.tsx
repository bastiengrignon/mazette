/* eslint-disable @typescript-eslint/no-explicit-any */
import React  from 'react'
import moment from 'moment'
import { DatePicker, Input } from 'antd'

import { ColumnInputType } from '../../index'

interface CellInputNodeProps {
    inputType: ColumnInputType
    value: any
}

const CellInputNode: React.FC<CellInputNodeProps> = ({ inputType, value, ...restProps }) => {
    const newValue = inputType === 'date' ? moment(value || undefined) : value

    switch (inputType) {
    case 'textarea':
        return <Input.TextArea value={newValue} {...restProps} />
    case 'date':
        return <DatePicker value={newValue} {...restProps} />
    case 'text':
    default:
        return <Input value={newValue} {...restProps} />
    }
}

export default CellInputNode