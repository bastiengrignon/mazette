import { useCallback, useEffect, useState } from 'react';
import { CommonService, CookieService, IText, TextService, TextType } from '../../../services';
import { FestivalService, IFestival } from '../../../services/admin/festival';
import { Form, message } from 'antd';
import { showErrorFormMessage } from '../../../lib/validation';
import { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

type NoUndefinedRangeValueType<DateType> = [DateType | null, DateType | null] | null;

type DraggableItem = {
  id: string;
  content: string;
  isVisible: boolean;
};

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

export const useDashboard = () => {
  const [isTextLoading, setIsTextLoading] = useState<boolean>(false);
  const [texts, setTexts] = useState<IText[]>([]);
  const [newTexts, setNewTexts] = useState<IText[]>(texts);
  const [infoText, setInfoText] = useState<IText>({} as IText);
  const [festival, setFestival] = useState<IFestival>({} as IFestival);
  const [toggleLoading, setToggleLoading] = useState<{ [x: string]: boolean }>({});

  const [addRowModalVisible, setAddRowModalVisible] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number>(0);
  const [formRowAddition] = Form.useForm();
  const [formRowEdition] = Form.useForm();

  useEffect(() => {
    setIsTextLoading(true);
    TextService.getAll()
      .then(setTexts)
      .finally(() => setIsTextLoading(false));
    TextService.getByTextType(TextType.info).then(setInfoText);
    FestivalService.getLastFestival().then((festival) => {
      CookieService.set(CookieService.festivalId, festival.id);
      setFestival(festival);
    });
  }, [newTexts]);

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
      .finally(() => setEditingId(0));
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
      .catch(() => showErrorFormMessage())
      .finally(() => hideLoadingMessage());
  };

  const collapseTitle = (textType: string): string =>
    CommonService.capitalize(selectTextType.find((item) => item.value === textType)?.text || '');

  const updateInformationsVisibility = (checked: boolean): void => {
    if (infoText) {
      TextService.update(infoText.id, {
        ...infoText,
        isShowed: checked,
      }).then((res) =>
        setInfoText({
          ...infoText,
          ...res,
        })
      );
    }
  };

  const handleFestivalDate = (dates: NoUndefinedRangeValueType<Dayjs>): void => {
    if (dates) {
      if (dates[0] && dates[1]) {
        FestivalService.update(festival.id, {
          ...festival,
          startDate: dates[0].toDate(),
          endDate: dates[1].toDate(),
        }).then((res) =>
          setFestival({
            ...festival,
            ...res,
          })
        );
      }
    }
  };

  const handleFestivalLatitude = (newLatitude: number | null): void => {
    FestivalService.update(festival.id, {
      ...festival,
      location: { ...festival.location, latitude: newLatitude || 0 },
    }).then((res) =>
      setFestival({
        ...festival,
        ...res,
      })
    );
  };

  const handleFestivalLongitude = (newLongitude: number | null): void => {
    FestivalService.update(festival.id, {
      ...festival,
      location: { ...festival.location, longitude: newLongitude || 0 },
    }).then((res) =>
      setFestival({
        ...festival,
        ...res,
      })
    );
  };

  const toggleVisibility =
    (key: string) =>
      (checked: boolean): void => {
        setToggleLoading({ [key]: true });
        FestivalService.update(festival.id, {
          ...festival,
          [key]: checked,
        })
          .then((res) => setFestival({ ...festival, ...res }))
          .finally(() => setToggleLoading({ [key]: false }));
      };

  const [draggableItems, setDraggableItems] = useState<DraggableItem[]>([
    { id: uuidv4(), content: '1', isVisible: false },
    { id: uuidv4(), content: '2', isVisible: false },
    { id: uuidv4(), content: '3', isVisible: false },
    { id: uuidv4(), content: '4', isVisible: false },
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = useCallback(({ over, active }): void => {
    if (active.id !== over?.id) {
      setDraggableItems((items) => {
        const oldIndex = items.findIndex(({ id }) => id === active.id);
        const newIndex = items.findIndex(({ id }) => id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  const addDraggableItem = () =>
    setDraggableItems([
      {
        id: uuidv4(),
        content: 'Ajouter du text ici',
        isVisible: false,
      },
      ...draggableItems,
    ]);

  const removeDraggableItem = (id: string | null) => setDraggableItems(draggableItems.filter((item) => item.id !== id));

  const updateDraggableContent = (id: string, content: string) =>
    setDraggableItems(
      draggableItems.map((item) =>
        item.id === id
          ? {
            ...item,
            content,
          }
          : item
      )
    );

  const toggleDraggableVisibility = (id: string) =>
    setDraggableItems(
      draggableItems.map((item) =>
        item.id === id
          ? {
            ...item,
            isVisible: !item.isVisible,
          }
          : item
      )
    );

  const savePage = () => {
    console.log({ draggableItems });
  };

  return {
    texts,
    festival,
    infoText,
    isTextLoading,
    toggleLoading,
    addRowModalVisible,
    formRowEdition,
    formRowAddition,
    isEditing,
    saveRow,
    editRow,
    cancel,
    handleOkModal,
    setAddRowModalVisible,
    collapseTitle,
    updateInformationsVisibility,
    handleFestivalDate,
    handleFestivalLatitude,
    handleFestivalLongitude,
    toggleVisibility,
    selectTextType,

    draggableItems,
    sensors,
    onDragEnd,
    addDraggableItem,
    removeDraggableItem,
    updateDraggableContent,
    toggleDraggableVisibility,
    savePage
  };
};
