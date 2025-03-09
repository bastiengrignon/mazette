import loadable from '@loadable/component';
import { Button, Modal } from 'antd';
import React from 'react';

import { AdvancedImage } from '@cloudinary/react';
import { cloudinary } from '../../../index';
import { CommonService, ITrombinoscope } from '../../../services';

import CustomTable from '../CustomTable';
import ActionButtonsRow, { ActionButtonType } from '../EditableCell/components/ActionButtonsRow';
import { useDashboardTrombinoscopeHooks } from './DashboardTrombinoscope.hooks';

const AdminFormAddTrombinoscope = loadable(() => import('./components/AdminFormAddTrombinoscope'));
const Navigation = loadable(() => import('../../../pages/admin/Navigation'));
const PreviewModal = loadable(() => import('../PreviewModal'));

const DashboardTrombinoscope: React.FC = () => {
  const {
    formRowEdition,
    formRowAddition,
    isOpen,
    trombinoscopes,
    previewURL,
    addRowModalVisible,
    isTrombinoscopeLoading,
    setEditingId,
    setNewTrombinoscopes,
    setAddRowModalVisible,
    toggle,
    isEditing,
    handleOkModal,
    openModalPreview,
  } = useDashboardTrombinoscopeHooks();
  const columns = [
    {
      title: 'Prénom',
      key: 'name',
      dataIndex: 'name',
      editable: true,
      render(name: string) {
        return <div className="font-avenirBL">{name}</div>;
      },
      sorter: (a: ITrombinoscope, b: ITrombinoscope) => a.name.localeCompare(b.name),
    },
    {
      title: 'Image',
      key: 'image',
      dataIndex: 'image',
      render(imageId: string) {
        return (
          <div
            className="flex justify-center items-center cursor-pointer"
            title="Visualiser l'image"
            onClick={() => openModalPreview(imageId)}>
            <AdvancedImage className="w-24 h-auto" cldImg={cloudinary.image(imageId)} />
          </div>
        );
      },
      editable: false,
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render(_, record: ITrombinoscope) {
        const editable = isEditing(record);
        return (
          <ActionButtonsRow
            editable={editable}
            record={record}
            setEditingId={setEditingId}
            form={formRowEdition}
            setObject={setNewTrombinoscopes}
            object={trombinoscopes}
            type={ActionButtonType.TROMBINOSCOPE}
          />
        );
      },
    },
  ];

  const mergedColumns = CommonService.mergedColumns(columns, isEditing);

  return (
    <Navigation>
      <p className="text-xl mb-2">Liste des Trombinoscope : </p>
      <Button type="primary" className="my-4 button" onClick={() => setAddRowModalVisible(true)}>
        Ajouter un trombinoscope
      </Button>
      <CustomTable
        form={formRowEdition}
        columns={mergedColumns}
        dataSource={trombinoscopes}
        loading={isTrombinoscopeLoading}
        setEditingId={setEditingId}
      />

      <Modal
        title="Nouveau trombinoscope"
        open={addRowModalVisible}
        okText="Ajouter"
        onCancel={() => setAddRowModalVisible(false)}
        okButtonProps={{ className: 'button' }}
        onOk={handleOkModal}
        cancelText="Annuler">
        <AdminFormAddTrombinoscope form={formRowAddition} />
      </Modal>
      <PreviewModal open={isOpen} hide={toggle} previewURL={previewURL} />
    </Navigation>
  );
};
export default DashboardTrombinoscope;
