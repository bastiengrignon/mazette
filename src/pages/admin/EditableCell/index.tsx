import React from "react"
import { Form, Input } from "antd"

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: string
    inputType: "text" | "textarea";
    children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "textarea" ? <Input.TextArea /> : <Input />

    return (
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
                    { inputNode }
                </Form.Item> :
                children
            }
        </td>
    )
}
export default EditableCell