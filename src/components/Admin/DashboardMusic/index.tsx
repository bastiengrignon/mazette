import React, { useEffect, useState } from 'react';

import { AdvancedImage } from '@cloudinary/react';
import loadable from '@loadable/component';
import { Button, Form, Modal, Tooltip, message, Select, Flex } from 'antd';
import dayjs from 'dayjs';

import { cloudinary } from '../../../index';
import { formatDate } from '../../../lib/date';
import useModal from '../../../constants/hooks';
import { CommonService, IMusic, MusicService } from '../../../services';

import CustomTable from '../CustomTable';
import ActionButtonsRow, { ActionButtonType } from '../EditableCell/components/ActionButtonsRow';
import { allEditions } from '../../../constants';
import { showErrorFormMessage } from '../../../lib/validation';

const AdminFormAddArtist = loadable(() => import('./components/AdminFormAddArtist'));
const Link = loadable(() => import('../../Link'));
const Navigation = loadable(() => import('../../../pages/admin/Navigation'));
const PreviewModal = loadable(() => import('../PreviewModal'));

const DashboardMusic: React.FC = () => {
  const editions = allEditions(true);
  const [isMusicLoading, setIsMusicLoading] = useState<boolean>(false);
  const [musics, setMusics] = useState<IMusic[]>([]);
  const [newMusics, setNewMusics] = useState<IMusic[]>([]);
  const [selectedEdition, setSelectedEdition] = useState<string>(editions[0].value);

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
    setIsMusicLoading(true);
    MusicService.getAll()
      .then(setMusics)
      .finally(() => setIsMusicLoading(false));
  }, [newMusics]);

  const isEditing = (record: IMusic): boolean => record.id === editingId;

  const handleOkModal = (): void => {
    const hideLoadingMessage = message.loading('Ajout en cours', 0);
    formRowAddition
      .validateFields()
      .then((values) => {
        MusicService.create(values)
          .then((music) => {
            setMusics([...musics, music]);
            message.success('Musique ajoutée', 2.5);
          })
          .catch((err) => message.error(`Erreur lors de l'ajout: ${err}`, 2.5))
          .finally(() => {
            hideLoadingMessage();
            formRowAddition.resetFields();
          });
        setAddRowModalVisible(false);
      })
      .catch(() => showErrorFormMessage())
      .finally(() => hideLoadingMessage());
  };

  const openModalPreview = (imageId: string) => {
    setPreviewURL(imageId);
    toggle();
  };

  const columns = [
    {
      title: 'Nom d’artiste',
      key: 'name',
      dataIndex: 'name',
      editable: true,
      required: true,
      render: function renderTitle(name: string) {
        return <div className="font-avenirBL">{name}</div>;
      },
      sorter: (a: IMusic, b: IMusic) => a.name.localeCompare(b.name),
    },
    {
      title: 'Style',
      key: 'type',
      dataIndex: 'type',
      editable: true,
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      inputType: 'textarea',
      editable: true,
      required: true,
      ellipsis: { showTitle: false },
      render(description: string) {
        return (
          <Tooltip placement="topLeft" title={description} color="blue">
            {description}
          </Tooltip>
        );
      },
    },
    {
      title: 'Date de publication',
      key: 'publicationDate',
      dataIndex: 'publicationDate',
      inputType: 'date',
      editable: true,
      required: true,
      sorter: (a: IMusic, b: IMusic) => Number(a.publicationDate) - Number(b.publicationDate),
      render(date: Date) {
        return <span>{formatDate(date)}</span>;
      },
    },
    {
      title: 'Lien Vidéo',
      key: 'videoLink',
      dataIndex: 'videoLink',
      editable: true,
      ellipsis: { showTitle: false },
      render(link: string) {
        return <Link src={link} title={link} />;
      },
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
      fixed: 'right',
      render(_, record: IMusic) {
        const editable = isEditing(record);
        return (
          <ActionButtonsRow
            editable={editable}
            record={record}
            setEditingId={setEditingId}
            form={formRowEdition}
            setObject={setNewMusics}
            object={musics}
            type={ActionButtonType.MUSIC}
          />
        );
      },
    },
  ];

  const mergedColumns = CommonService.mergedColumns(columns, isEditing);

  return (
    <Navigation>
      <p className="text-xl mb-2">Liste des artistes : </p>
      <Flex className="my-4" justify="space-between">
        <Button type="primary" className="button" onClick={() => setAddRowModalVisible(true)}>
          Ajouter un artiste
        </Button>
        <Select
            options={editions}
            onChange={setSelectedEdition}
            defaultValue={selectedEdition}
            className="w-44"
        />
      </Flex>
      <CustomTable
        form={formRowEdition}
        columns={mergedColumns}
        dataSource={musics.filter((music) => dayjs(music.publicationDate).year() === Number(selectedEdition))}
        loading={isMusicLoading}
        setEditingId={setEditingId}
      />

      <Modal
        title="Nouvel artiste"
        open={addRowModalVisible}
        okText="Ajouter"
        onCancel={() => setAddRowModalVisible(false)}
        okButtonProps={{ className: 'button' }}
        onOk={handleOkModal}
        cancelText="Annuler">
        <AdminFormAddArtist form={formRowAddition} />
      </Modal>
      <PreviewModal open={isOpen} hide={toggle} previewURL={previewURL} />
    </Navigation>
  );
};
export default DashboardMusic;
