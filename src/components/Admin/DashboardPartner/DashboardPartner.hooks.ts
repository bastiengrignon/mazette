import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IPartner, PartnerService } from '../../../services';
import { Form, FormInstance, message } from 'antd';
import useModal from '../../../constants/hooks';
import { showErrorFormMessage } from '../../../lib/validation';

interface IDashboardPartnersHooks {
  previewURL: string
  isOpen: boolean
  partners: IPartner[]
  addRowModalVisible: boolean
  formRowAddition: FormInstance
  formRowEdition: FormInstance
  isPartnerLoading: boolean
  setEditingId: Dispatch<SetStateAction<number>>
  setNewPartners: Dispatch<SetStateAction<IPartner[]>>
  setAddRowModalVisible: Dispatch<SetStateAction<boolean>>
  isEditing: (record: IPartner) => boolean
  openModalPreview: (imageId: string) => void
  toggle: () => void
  handleOkModal: () => void
}

export const useDashboardPartnerHooks = (): IDashboardPartnersHooks => {
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

  const isEditing = (record: IPartner): boolean => record.id === editingId;

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
      .catch(() => showErrorFormMessage())
      .finally(() => hideLoadingMessage());
  };

  const openModalPreview = (imageId: string): void => {
    setPreviewURL(imageId);
    toggle();
  };

  useEffect(() => {
    setIsPartnerLoading(true);
    PartnerService.getAll()
      .then(setPartners)
      .finally(() => setIsPartnerLoading(false));
  }, [newPartners]);

  return {
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
  };
};
