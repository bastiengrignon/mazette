import loadable from '@loadable/component';
import { Button, Form, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';

import AdminFormAddPartners from './components/AdminFormAddPartners';
import { AdvancedImage } from '@cloudinary/react';

import CustomTable from '../CustomTable';
import Link from '../../Link';
import ActionButtonsRow, { ActionButtonType } from '../EditableCell/components/ActionButtonsRow';

import { cloudinary } from '../../../index';
import useModal from '../../../constants/hooks';
import { CommonService, IPartner, PartnerService } from '../../../services';

const Navigation = loadable(() => import('../../../pages/admin/Navigation'));
const PreviewModal = loadable(() => import('../PreviewModal'));

const DashboardPartner: React.FC = () => {
  const [isPartnerLoading, setIsPartnerLoading] = useState<boolean>(false);
  const [partners, setPartners] = useState<IPartner[]>([]);
  const [newPartners, setNewPartners] = useState<IPartner[]>([]);

  // Row edition
  const [editingId, setEditingId] = useState(0);
  const [formRowEdition] = Form.useForm();

  // Add row modal
  const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false);
  const [formRowAddition] = Form.useForm();

  // Preview modal
  const { isOpen, toggle } = useModal();
  const [previewURL, setPreviewURL] = useState<string>('');

  useEffect(() => {
    setIsPartnerLoading(true);
    PartnerService.getAll()
      .then(setPartners)
      .finally(() => setIsPartnerLoading(false));
  }, [newPartners]);

  const isEditing = (record: IPartner): boolean => record.id === editingId;

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
            <AdvancedImage className="w-24 h-auto" cldImg={cloudinary.image(imageId)} />
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
        return <Link src={link} title={link} />;
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

  const handleOkModal = () => {
    const hideLoadingMessage = message.loading('Ajout en cours', 0);
    formRowAddition
      .validateFields()
      .then((values) => {
        PartnerService.create(values)
          .then((partner) => {
            setPartners([...partners, partner]);
            message.success('Partenaire ajouté', 2.5);
          })
          .catch((err) => message.error(`Erreur lors de l'ajout: ${err}`, 2.5))
          .finally(() => {
            hideLoadingMessage();
            formRowAddition.resetFields();
          });
        setAddRowModalVisible(false);
      })
      .catch((err) => message.warning('Validation failed: ', err))
      .finally(() => hideLoadingMessage());
  };

  const openModalPreview = (imageId: string) => {
    setPreviewURL(imageId);
    toggle();
  };

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
        <AdminFormAddPartners form={formRowAddition} />
      </Modal>
      <PreviewModal open={isOpen} hide={toggle} previewURL={previewURL} />
    </Navigation>
  );
};
export default DashboardPartner;
