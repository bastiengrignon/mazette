import { IPartner } from '../partner'

export class CommonService {
    // eslint-disable-next-line
    static mergedColumns = (columns: any, isEditing: (record: any) => boolean): [] => {
        return columns.map((col) => {
            if (!col.editable) return col
            return {
                ...col,
                onCell: (record: IPartner) => ({
                    record,
                    inputType: col.inputType || 'text',
                    dataIndex: col.dataIndex,
                    title    : col.title,
                    required : col.dataIndex !== 'videoLink',
                    editing  : isEditing(record)
                }),
            }
        })
    }

    static capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1)
}