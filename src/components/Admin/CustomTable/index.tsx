/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormInstance, Table } from 'antd'
import React, { Dispatch, SetStateAction } from 'react'

import EditableCell from '../EditableCell'

const tableRowView = { body: { cell: EditableCell } }

interface CustomTableProps {
    form: FormInstance
    columns: any[]
    dataSource: any[]
    loading: boolean
    setEditingId: Dispatch<SetStateAction<number>>
}

const CustomTable: React.FC<CustomTableProps> = ({ form, columns, dataSource, loading, setEditingId }) => (
    <Form form={ form } component={ false }>
        <Table components={ tableRowView } rowClassName="editable-row"
            rowKey="id" pagination={ { onChange: () => setEditingId(0), position: ['bottomCenter'] } }
            bordered dataSource={ dataSource } columns={ columns } loading={ loading }>
        </Table>
    </Form>
)

export default CustomTable