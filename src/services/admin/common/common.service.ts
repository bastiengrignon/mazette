/* eslint-disable @typescript-eslint/no-explicit-any */

interface TableColumns {
  key: string;
  title: string;
  dataIndex: string;
  inputType?: string;
  required?: boolean;
  editable?: boolean;
}

export class CommonService {
  static mergedColumns = (columns: TableColumns[], isEditing: (record: any) => boolean): any[] =>
    columns.map((col) => {
      if (!col.editable) return col;
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          inputType: col.inputType || 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          required: col?.required ?? col.dataIndex !== 'videoLink',
          editing: isEditing(record),
          currentValue: record[col.dataIndex],
        }),
      };
    });

  static capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);
}
