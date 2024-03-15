/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction } from 'react';

import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { FormInstance, Popconfirm, Tooltip, Typography, message } from 'antd';
import {
  MovieService,
  MusicService,
  PartnerService,
  TrombinoscopeService,
  serviceOperation,
  HttpServiceType,
} from '../../../../../services';

interface IObject {
  id: number;
}

export const ActionButtonType = {
  MUSIC: MusicService,
  MOVIE: MovieService,
  PARTNER: PartnerService,
  TROMBINOSCOPE: TrombinoscopeService,
};

interface ButtonGroupTableProps {
  editable: boolean;
  record: any;
  setEditingId: Dispatch<SetStateAction<number>>;
  setObject: Dispatch<SetStateAction<any>>;
  object: Record<any, any>;
  form: FormInstance;
  type: HttpServiceType;
}

const ActionButtonsRow: React.FC<ButtonGroupTableProps> = ({
  editable,
  record,
  setEditingId,
  setObject,
  object,
  form,
  type,
}) => {
  const cancelRow = () => setEditingId(0);

  const deleteRow = async (id: number): Promise<void> => {
    const hideLoadingMessage = message.loading('Suppression en cours', 0);
    await serviceOperation(type, 'delete', id)
      .then(() => {
        hideLoadingMessage();
        message.success('Enregistrement supprimée');
      })
      .finally(() => hideLoadingMessage());
    setObject(object.filter((item: IObject) => item.id !== id));
  };

  const editRow = (record: Partial<IObject>): void => {
    form.setFieldsValue(record);
    setEditingId(record.id || 0);
  };

  const saveRow = async (id: number): Promise<void> => {
    const hideLoadingMessage = message.loading('Modification en cours', 0);
    form
      .validateFields()
      .then((row) => {
        serviceOperation(type, 'update', id, row)
          .then((res) => {
            const index = object.findIndex((item: IObject) => item.id === id);
            setObject(
              object.splice(index, 1, {
                ...object[index],
                ...res,
              })
            );
            message.success('Modification effectuée', 2.5);
          })
          .catch((err) => message.error(`Erreur lors de la modification: ${err}`, 2.5))
          .finally(() => {
            hideLoadingMessage();
            form.resetFields();
          });
      })
      .catch((err) => {
        hideLoadingMessage();
        message.error(`Erreur de validation: ${err.errorFields.map((error) => error.errors.join(', '))}`, 5);
      })
      .finally(() => {
        hideLoadingMessage();
        setEditingId(0);
      });
  };

  return editable ? (
    <span className="inline-flex justify-around w-full">
      <Tooltip title="Sauvegarder">
        <div className="text-green cursor-pointer" onClick={() => saveRow(record.id)}>
          <SaveOutlined />
        </div>
      </Tooltip>
      <Typography.Link onClick={cancelRow}>Annuler</Typography.Link>
    </span>
  ) : (
    <span className="inline-flex justify-around w-full">
      <Typography.Link onClick={() => editRow(record)}>
        <EditOutlined />
      </Typography.Link>
      <Popconfirm
        placement="left"
        className="text-red cursor-pointer hover:text-gray-700"
        title="Veux-tu vraiment supprimer ?"
        okButtonProps={{ className: 'bg-red' }}
        onConfirm={() => deleteRow(record.id)}>
        <DeleteOutlined />
      </Popconfirm>
    </span>
  );
};

export default ActionButtonsRow;
