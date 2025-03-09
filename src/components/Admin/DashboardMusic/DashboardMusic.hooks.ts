import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { allEditions, PreviousEdition } from '../../../constants';
import { IMusic, MusicService } from '../../../services';
import { Form, FormInstance, message } from 'antd';
import useModal from '../../../constants/hooks';
import { showErrorFormMessage } from '../../../lib/validation';

interface IDashboardMusicHooks {
  isOpen: boolean
  previewURL: string
  editions: PreviousEdition[]
  musics: IMusic[]
  addRowModalVisible: boolean
  selectedEdition: string
  formRowAddition: FormInstance
  formRowEdition: FormInstance
  isMusicLoading: boolean
  setSelectedEdition: Dispatch<SetStateAction<string>>
  setEditingId: Dispatch<SetStateAction<number>>
  setNewMusics: Dispatch<SetStateAction<IMusic[]>>
  setAddRowModalVisible: Dispatch<SetStateAction<boolean>>
  isEditing: (record: IMusic) => boolean
  openModalPreview: (imageId: string) => void
  handleOkModal: () => void
  toggle: () => void
}

export const useDashboardMusicHooks = (): IDashboardMusicHooks => {
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

  useEffect(() => {
    setIsMusicLoading(true);
    MusicService.getAll()
      .then(setMusics)
      .finally(() => setIsMusicLoading(false));
  }, [newMusics]);

  return {
    isOpen,
    previewURL,
    editions,
    musics,
    addRowModalVisible,
    selectedEdition,
    formRowAddition,
    formRowEdition,
    isMusicLoading,
    setSelectedEdition,
    setEditingId,
    setNewMusics,
    setAddRowModalVisible,
    isEditing,
    openModalPreview,
    handleOkModal,
    toggle,
  };
};
