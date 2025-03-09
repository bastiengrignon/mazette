import loadable from '@loadable/component';
import { Button, Modal } from 'antd';
import React from 'react';

import AdminFormAddPartners from './components/AdminFormAddPartners';
import { AdvancedImage } from '@cloudinary/react';

import CustomTable from '../CustomTable';
import Link from '../../Link';
import ActionButtonsRow, { ActionButtonType } from '../EditableCell/components/ActionButtonsRow';

import { cloudinary } from '../../../index';
import { CommonService, IPartner } from '../../../services';
import { useDashboardPartnerHooks } from './DashboardPartner.hooks';

const Navigation = loadable(() => import('../../../pages/admin/Navigation'));
const PreviewModal = loadable(() => import('../PreviewModal'));

const DashboardPartner: React.FC = () => {
  const {
    previewURL,
    isOpen,
    partners,
    addRowModalVisible,
    formRowAddition,
    formRowEdition,
    isPartnerLoading,
    setEditingId,
    setNewPartners,
    setAddRowModalVisible,
    handleOkModal,
    isEditing,
    openModalPreview,
    toggle,
  } = useDashboardPartnerHooks();
  const columns = [
    {
      title: 'Nom du partenaire',
      key: 'name',
      dataIndex: 'name',
      editable: true,
      render(name: string) {
        return <div className="font-avenirBL">{name}</div>;
      },
      sorter: (a: IPartner, b: IPartner) => a.name.localeCompare(b.name),
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
            <AdvancedImage className="w-24 h-auto" cldImg={cloudinary.image(imageId)}/>
          </div>
        );
      },
      editable: false,
    },
    {
      title: 'Lien',
      key: 'link',
      dataIndex: 'link',
      required: false,
      render(link: string) {
        return <Link src={link} title={link}/>;
      },
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render(_, record: IPartner) {
        const editable = isEditing(record);
        return (
          <ActionButtonsRow
            editable={editable}
            record={record}
            setEditingId={setEditingId}
            form={formRowEdition}
            setObject={setNewPartners}
            object={partners}
            type={ActionButtonType.PARTNER}
          />
        );
      },
    },
  ];

  const mergedColumns = CommonService.mergedColumns(columns, isEditing);

  return (
    <Navigation>
      <p className="text-xl mb-2">Liste des Partenaires : </p>
      <Button type="primary" className="my-4 button" onClick={() => setAddRowModalVisible(true)}>
        Ajouter un partenaire
      </Button>
      <CustomTable
        form={formRowEdition}
        columns={mergedColumns}
        dataSource={partners}
        loading={isPartnerLoading}
        setEditingId={setEditingId}
      />

      <Modal
        title="Nouveau partenaire"
        open={addRowModalVisible}
        okText="Ajouter"
        onCancel={() => setAddRowModalVisible(false)}
        okButtonProps={{ className: 'button' }}
        onOk={handleOkModal}
        cancelText="Annuler">
        <AdminFormAddPartners form={formRowAddition}/>
      </Modal>
      <PreviewModal open={isOpen} hide={toggle} previewURL={previewURL}/>
    </Navigation>
  );
};
export default DashboardPartner;
