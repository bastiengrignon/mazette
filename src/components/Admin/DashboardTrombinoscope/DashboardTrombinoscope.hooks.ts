import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ITrombinoscope, TrombinoscopeService } from '../../../services';
import { Form, FormInstance, message } from 'antd';
import useModal from '../../../constants/hooks';
import { showErrorFormMessage } from '../../../lib/validation';

interface IDashboardTrombinoscopeHooks {
  formRowEdition: FormInstance
  formRowAddition: FormInstance
  isOpen: boolean
  trombinoscopes: ITrombinoscope[]
  previewURL: string
  addRowModalVisible: boolean
  isTrombinoscopeLoading: boolean
  setEditingId: Dispatch<SetStateAction<number>>
  setNewTrombinoscopes: Dispatch<SetStateAction<ITrombinoscope[]>>
  setAddRowModalVisible: Dispatch<SetStateAction<boolean>>
  toggle: () => void
  isEditing: (record: ITrombinoscope) => boolean
  handleOkModal: () => void
  openModalPreview: (imageId: string) => void
}

export const useDashboardTrombinoscopeHooks = (): IDashboardTrombinoscopeHooks => {
  const [isTrombinoscopeLoading, setIsTrombinoscopeLoading] = useState<boolean>(false);
  const [trombinoscopes, setTrombinoscopes] = useState<ITrombinoscope[]>([]);
  const [newTrombinoscopes, setNewTrombinoscopes] = useState<ITrombinoscope[]>([]);

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
    setIsTrombinoscopeLoading(true);
    TrombinoscopeService.getAll()
      .then(setTrombinoscopes)
      .finally(() => setIsTrombinoscopeLoading(false));
  }, [newTrombinoscopes]);

  const isEditing = (record: ITrombinoscope): boolean => record.id === editingId;

  const handleOkModal = () => {
    const hideLoadingMessage = message.loading('Ajout en cours', 0);
    formRowAddition
      .validateFields()
      .then((values) => {
        TrombinoscopeService.create(values)
          .then((trombinoscope) => {
            setTrombinoscopes([...trombinoscopes, trombinoscope]);
            message.success('Trombinoscope ajouté', 2.5);
          })
          .catch((err) => message.error(`Erreur lors de l'ajout: ${err}`, 2.5))
          .finally(() => {
            hideLoadingMessage();
            formRowAddition.resetFields();
          });
        setAddRowModalVisible(false);
      })
      .catch(() => {
        hideLoadingMessage();
        showErrorFormMessage();
      })
      .finally(() => hideLoadingMessage());
  };

  const openModalPreview = (imageId: string) => {
    setPreviewURL(imageId);
    toggle();
  };

  return {
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
  };
};
