import dayjs, { Dayjs } from 'dayjs';
import loadable from '@loadable/component';
import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Button,
  Card,
  Collapse,
  DatePicker,
  Form,
  InputNumber,
  List,
  Modal,
  Select,
  Skeleton,
  Switch,
  Typography,
  message,
  Flex,
  Tabs,
} from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

import { CommonService, CookieService, IText, TextService, TextType } from '../../../services';
import { FestivalService, IFestival } from '../../../services/admin/festival';

import {
  CANCEL,
  DASHBOARD_ADD_ELEMENT,
  DASHBOARD_ADD_TEXT,
  DASHBOARD_MODAL_NEW_TEXT_TITLE,
  DASHBOARD_MODAL_TEXT,
  DASHBOARD_MODAL_TEXT_RULE,
  DASHBOARD_MODAL_TYPE,
  DASHBOARD_MODAL_TYPE_RULE,
  DASHBOARD_PLACEHOLDER_LATITUDE,
  DASHBOARD_PLACEHOLDER_LONGITUDE,
  DASHBOARD_PREVIEW_PAGE,
  DASHBOARD_SHOW_HOME_INFORMATION,
  DASHBOARD_SHOW_MOVIES,
  DASHBOARD_SHOW_MUSICS,
  DASHBOARD_TITLE_DATE,
  DASHBOARD_TITLE_GPS_COORDS,
  DASHBOARD_TITLE_INFORMATION,
} from './Dashboard.constants';
import { MODAL_ADD_TEXT, MODAL_CANCEL_TEXT } from '../Admin.constants';
import { showErrorFormMessage } from '../../../lib/validation';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Draggable from '../Draggable';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { TbDeviceFloppy } from 'react-icons/tb';

const Navigation = loadable(() => import('../../../pages/admin/Navigation'));
const TinyMceEditor = loadable(() => import('../TinyMceEditor'));
const { Option } = Select;
const { RangePicker } = DatePicker;

type NoUndefinedRangeValueType<DateType> = [DateType | null, DateType | null];

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

const Dashboard: React.FC = () => {
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

  const renderListTextItem = (item: IText, key: number): React.ReactNode => {
    const editable = isEditing(item);
    return (
      <List.Item key={key} className="inline-flex items-center justify-between w-full">
        {editable ? (
          <Form.Item
            className="w-full"
            name="text"
            initialValue={item.text}
            rules={[{ required: true, message: 'Entrez le texte' }]}>
            <TinyMceEditor textareaName="text" initialValue={item.text} form={formRowEdition} />
          </Form.Item>
        ) : (
          <div className="w-full whitespace-pre-line" dangerouslySetInnerHTML={{ __html: item.text }} />
        )}
        {editable ? (
          <span className="flex flex-col items-center ml-4 gap-2">
            <Button icon={<SaveOutlined />} onClick={() => saveRow(item.id)} />
            <Typography.Link onClick={cancel} className="text-nowrap">
              {CANCEL}
            </Typography.Link>
          </span>
        ) : (
          <Button icon={<EditOutlined />} onClick={() => editRow(item)} />
        )}
      </List.Item>
    );
  };

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
    { id: '1', content: '1', isVisible: false },
    { id: '2', content: '2', isVisible: false },
    { id: '3', content: '3', isVisible: false },
    { id: '4', content: '4', isVisible: false },
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

  const pages = [
    {
      key: 'default',
      label: 'Défaut',
      children: (
        <>
          <Button type="primary" className="my-4 button" onClick={() => setAddRowModalVisible(true)}>
            {DASHBOARD_ADD_TEXT}
          </Button>
          <Collapse
            accordion={true}
            onChange={cancel}
            defaultActiveKey={0}
            items={Object.values(TextType).map((textType) => ({
              key: textType,
              label: collapseTitle(textType),
              children: (
                <Skeleton avatar={true} active={true} loading={isTextLoading}>
                  <Form form={formRowEdition} component={false}>
                    <List
                      dataSource={texts.filter((value) => value.type === textType)}
                      renderItem={renderListTextItem}
                    />
                  </Form>
                </Skeleton>
              ),
            }))}
          />
        </>
      ),
    },
    {
      key: 'home',
      label: 'Accueil',
      children: (
        <>
          <Flex justify="center">
            <Typography.Title level={2}>{DASHBOARD_PREVIEW_PAGE}</Typography.Title>
          </Flex>
          <Flex align="center" justify="space-between">
            <Button type="primary" className="button my-4" onClick={addDraggableItem}>
              {DASHBOARD_ADD_ELEMENT}
            </Button>
            <TbDeviceFloppy size={30} className="cursor-pointer hover:text-green" onClick={savePage} />
          </Flex>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToVerticalAxis]}>
            <SortableContext items={draggableItems.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
              <Flex vertical gap="small">
                {draggableItems.map(({ id, content, isVisible }) => (
                  <Draggable
                    key={id}
                    id={id}
                    content={content}
                    isVisible={isVisible}
                    onRemove={removeDraggableItem}
                    onSave={updateDraggableContent}
                    toggleVisibility={toggleDraggableVisibility}
                  />
                ))}
              </Flex>
            </SortableContext>
          </DndContext>
        </>
      ),
    },
    { key: 'association', label: 'Association' },
    { key: 'programmation', label: 'Programmation' },
    { key: 'information', label: 'Information' },
  ];

  return (
    <Navigation>
      <div className="grid grid-cols-12 gap-2 md:gap-5">
        <Card bordered={false} className="rounded-lg col-span-12 lg:col-span-8">
          <Tabs defaultActiveKey="home" items={pages} />
        </Card>
        <Card bordered={false} className="rounded-lg col-span-12 lg:col-span-4">
          <div className="space-y-4">
            <div className="text-3xl text-center">{DASHBOARD_TITLE_INFORMATION}</div>
            <Flex align="baseline" justify="space-between">
              <div>{DASHBOARD_TITLE_DATE}</div>
              {festival.startDate && festival.endDate && (
                <RangePicker
                  defaultValue={[dayjs(festival.startDate), dayjs(festival.endDate)]}
                  onChange={handleFestivalDate}
                  format="D MMM YYYY"
                />
              )}
            </Flex>
            <Flex align="baseline" justify="space-between">
              <div className="w-1/2">{DASHBOARD_TITLE_GPS_COORDS}</div>
              <Flex justify="flex-start" gap="small">
                {festival.location && (
                  <InputNumber
                    className="w-full"
                    placeholder={DASHBOARD_PLACEHOLDER_LATITUDE}
                    step="0.00000000001"
                    defaultValue={festival.location?.latitude}
                    onChange={handleFestivalLatitude}
                  />
                )}
                {festival.location && (
                  <InputNumber
                    className="w-full"
                    placeholder={DASHBOARD_PLACEHOLDER_LONGITUDE}
                    step="0.00000000001"
                    defaultValue={festival.location?.longitude}
                    onChange={handleFestivalLongitude}
                  />
                )}
              </Flex>
            </Flex>
            <Flex align="center" gap="small">
              <Switch disabled={!infoText?.id} onChange={updateInformationsVisibility} checked={infoText?.isShowed} />
              <div>{DASHBOARD_SHOW_HOME_INFORMATION}</div>
            </Flex>
            <Flex align="center" gap="small">
              <Switch
                onChange={toggleVisibility('showMusic')}
                checked={festival.showMusic}
                loading={toggleLoading['showMusic']}
              />
              <div>{DASHBOARD_SHOW_MUSICS}</div>
            </Flex>
            <Flex align="center" gap="small">
              <Switch
                onChange={toggleVisibility('showMovie')}
                checked={festival.showMovie}
                loading={toggleLoading['showMovie']}
              />
              <div>{DASHBOARD_SHOW_MOVIES}</div>
            </Flex>
          </div>
        </Card>
      </div>
      <Modal
        title={DASHBOARD_MODAL_NEW_TEXT_TITLE}
        open={addRowModalVisible}
        okText={MODAL_ADD_TEXT}
        onCancel={() => setAddRowModalVisible(false)}
        cancelText={MODAL_CANCEL_TEXT}
        okButtonProps={{ className: 'button' }}
        onOk={handleOkModal}>
        <Form form={formRowAddition}>
          <Form.Item
            label={DASHBOARD_MODAL_TEXT}
            name="text"
            rules={[{ required: true, message: DASHBOARD_MODAL_TEXT_RULE }]}>
            <TinyMceEditor textareaName="text" form={formRowAddition} minHeight={150} />
          </Form.Item>
          <Form.Item
            label={DASHBOARD_MODAL_TYPE}
            name="type"
            rules={[{ required: true, message: DASHBOARD_MODAL_TYPE_RULE }]}>
            <Select>
              {selectTextType.map((type, key) => (
                <Option key={key} value={type.value}>
                  {type.text}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Navigation>
  );
};
export default Dashboard;
