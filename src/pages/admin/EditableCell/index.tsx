import React from "react"
import { Form, Input } from "antd"

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: string
    children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    children,
    ...restProps
}) => (
    <td { ...restProps }>
        { editing ?
            <Form.Item
                name={ dataIndex }
                style={ { margin: 0 } }
                rules={ [
                    {
                        required: true,
                        message: `Please Input ${ title }!`,
                    },
                ] }
            >
                <Input/>
            </Form.Item> :
            children
        }
    </td>
)
export default EditableCell