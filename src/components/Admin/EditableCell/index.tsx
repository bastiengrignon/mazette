import React from 'react'
import { DatePicker, Form, Input } from 'antd'

export type ColumnInputType = 'text' | 'textarea' | 'date'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: string
    inputType: ColumnInputType
    children: React.ReactNode
    required: boolean
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    children,
    required,
    ...restProps
}) => {
    const inputNode = inputType === 'textarea' ? <Input.TextArea /> : inputType === 'text' ? <Input /> : <DatePicker/>

    return (
        <td { ...restProps }>
            { editing ?
                <Form.Item
                    name={ dataIndex }
                    style={ { margin: 0 } }
                    rules={ [
                        {
                            required: required,
                            message : `Entrer un ${ title } !`,
                        },
                    ] }
                >
                    { inputNode }
                </Form.Item> :
                children
            }
        </td>
    )
}
export default EditableCell