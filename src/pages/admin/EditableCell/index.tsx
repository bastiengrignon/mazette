import React from "react"
import { Form, Input } from "antd"

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: string
    inputType: "text" | "textarea"
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
    const inputNode = inputType === "textarea" ? <Input.TextArea /> : <Input />

    return (
        <td { ...restProps }>
            { editing ?
                <Form.Item
                    name={ dataIndex }
                    style={ { margin: 0 } }
                    rules={ [
                        {
                            required: required,
                            message: `Entrer un ${ title } !`,
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