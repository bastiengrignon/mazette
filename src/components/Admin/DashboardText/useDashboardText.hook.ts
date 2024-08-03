import { CommonService, IText, TextService, TextType } from '../../../services';
import { Form, message } from 'antd';
import { showErrorFormMessage } from '../../../lib/validation';
import { useState } from 'react';

const selectTextType = [
  { text: 'Musique', value: TextType.music },
  { text: 'Court-métrage', value: TextType.movie },
  { text: 'Concours', value: TextType.contest },
  { text: 'Association', value: TextType.association },
  { text: 'Mazette c’est qui', value: TextType.team },
  { text: 'Adhérer', value: TextType.adhere },
  { text: 'Boire et manger', value: TextType.food },
  { text: 'Venir au festival', value: TextType.journey },
  { text: 'Accueil', value: TextType.home },
  { text: 'Info', value: TextType.info },
  { text: 'Editions précédentes', value: TextType.previousEdition },
];

export const useDashboardText = ({ texts, setTexts, setNewTexts }) => {
  const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number>(0);
  const [formRowAddition] = Form.useForm();
  const [formRowEdition] = Form.useForm();

  const collapseTitle = (textType: string): string =>
    CommonService.capitalize(selectTextType.find((item) => item.value === textType)?.text || '');

  const isEditing = (item: IText): boolean => item.id === editingId;

  const saveRow = async (id: number): Promise<void> => {
    const hideLoadingMessage = message.loading('Modification en cours', 0);
    formRowEdition
      .validateFields()
      .then((row) => {
        TextService.update(id, row)
          .then((res) => {
            const index = texts.findIndex((text) => text.id === id);
            setNewTexts(
              texts.splice(index, 1, {
                ...texts[index],
                ...res,
              })
            );
            message.success('Modification effectuée', 2.5);
          })
          .catch((err) => message.error(`Erreur lors de la modification: ${err}`, 2.5))
          .finally(() => {
            hideLoadingMessage();
            formRowEdition.resetFields();
          });
      })
      .catch(() => showErrorFormMessage())
      .finally(() => {
        hideLoadingMessage();
        setEditingId(0);
      });
  };

  const editRow = (item: Partial<IText>): void => {
    formRowEdition.setFieldsValue({
      text: '',
      ...item,
    });
    setEditingId(item.id || 0);
  };

  const cancel = (): void => setEditingId(0);

  const handleOkModal = async (): Promise<void> => {
    const hideLoadingMessage = message.loading('Ajout en cours', 0);
    formRowAddition
      .validateFields()
      .then((values) => {
        TextService.create(values)
          .then((text) => {
            setTexts([...texts, text]);
            message.success('Texte ajouté', 2.5);
          })
          .catch((err) => message.error(`Erreur lors de l'ajout: ${err}`, 2.5))
          .finally(() => {
            hideLoadingMessage();
            formRowAddition.resetFields();
          });
        setAddRowModalVisible(false);
      })
      .catch(() => {
        showErrorFormMessage();
      })
      .finally(() => hideLoadingMessage());
  };

  return {
    collapseTitle,
    handleOkModal,
    isEditing,
    saveRow,
    editRow,
    cancel,
    addRowModalVisible,
    setAddRowModalVisible,
    formRowAddition,
    formRowEdition,
    selectTextType,
  };
};
