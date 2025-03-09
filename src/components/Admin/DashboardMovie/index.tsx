import loadable from '@loadable/component';
import { Button, Modal, Tooltip, Flex, Select } from 'antd';
import React from 'react';
import dayjs from 'dayjs';

import { AdvancedImage } from '@cloudinary/react';

import { cloudinary } from '../../../index';
import { formatDate } from '../../../lib/date';
import { CommonService, IMovie } from '../../../services';

import CustomTable from '../CustomTable';
import ActionButtonsRow, { ActionButtonType } from '../EditableCell/components/ActionButtonsRow';
import { useDashboardMovieHooks } from './DashboardMovie.hooks';

const AdminFormAddMovie = loadable(() => import('./components/AdminFormAddMovie'));
const Link = loadable(() => import('../../Link'));
const Navigation = loadable(() => import('../../../pages/admin/Navigation'));
const PreviewModal = loadable(() => import('../PreviewModal'));

const DashboardMovie: React.FC = () => {
  const {
    isOpen,
    previewURL,
    editions,
    movies,
    addRowModalVisible,
    selectedEdition,
    formRowAddition,
    formRowEdition,
    isMovieLoading,
    setSelectedEdition,
    setEditingId,
    setNewMovies,
    setAddRowModalVisible,
    isEditing,
    openModalPreview,
    handleOkModal,
    toggle,
  } = useDashboardMovieHooks();
  const columns = [
    {
      title: 'Titre',
      key: 'title',
      dataIndex: 'title',
      editable: true,
      render(title: string) {
        return <div className="font-avenirBL">{title}</div>;
      },
      sorter: (a: IMovie, b: IMovie) => a.title.localeCompare(b.title),
    },
    {
      title: 'Auteur',
      key: 'author',
      dataIndex: 'author',
      editable: true,
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      editable: true,
      ellipsis: { showTitle: false },
      render(description: string) {
        return (
          <Tooltip placement="top" title={description} color="blue">
            {description}
          </Tooltip>
        );
      },
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
      editable: true,
    },
    {
      title: 'Provenance',
      key: 'location',
      dataIndex: 'location',
      editable: true,
    },
    {
      title: 'Durée',
      key: 'duration',
      dataIndex: 'duration',
      editable: true,
    },
    {
      title: 'Date de publication',
      key: 'publicationDate',
      dataIndex: 'publicationDate',
      inputType: 'date',
      editable: true,
      sorter: (a: IMovie, b: IMovie) => Number(a.publicationDate) - Number(b.publicationDate),
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
      key: 'imgThumbnail',
      dataIndex: 'imgThumbnail',
      editable: false,
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
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      fixed: 'right',
      render(_, record: IMovie) {
        const editable = isEditing(record);
        return (
          <ActionButtonsRow
            editable={editable}
            record={record}
            setEditingId={setEditingId}
            form={formRowEdition}
            setObject={setNewMovies}
            object={movies}
            type={ActionButtonType.MOVIE}
          />
        );
      },
    },
  ];

  const mergedColumns = CommonService.mergedColumns(columns, isEditing);

  return (
    <Navigation>
      <p className="text-xl mb-2">Liste des courts-métrages : </p>
      <Flex className="my-4" justify="space-between">
        <Button type="primary" className="button" onClick={() => setAddRowModalVisible(true)}>
          Ajouter un court-métrage
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
        dataSource={movies.filter((movie) => dayjs(movie.publicationDate).year() === Number(selectedEdition))}
        loading={isMovieLoading}
        setEditingId={setEditingId}
      />

      <Modal
        title="Nouveau court-métrage"
        open={addRowModalVisible}
        okText="Ajouter"
        onCancel={() => setAddRowModalVisible(false)}
        okButtonProps={{ className: 'button' }}
        onOk={handleOkModal}
        cancelText="Annuler">
        <AdminFormAddMovie form={formRowAddition} />
      </Modal>
      <PreviewModal open={isOpen} hide={toggle} previewURL={previewURL} />
    </Navigation>
  );
};
export default DashboardMovie;
