import dayjs from 'dayjs';
import loadable from '@loadable/component';
import React from 'react';

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
  Flex,
  Tabs,
} from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

import { IText, TextType } from '../../../services';

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
import { closestCenter, DndContext } from '@dnd-kit/core';
import Draggable from '../Draggable';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { TbDeviceFloppy } from 'react-icons/tb';
import { useDashboard } from './Dashboard.hooks';

const Navigation = loadable(() => import('../../../pages/admin/Navigation'));
const TinyMceEditor = loadable(() => import('../TinyMceEditor'));

const Dashboard: React.FC = () => {
  const {
    texts,
    festival,
    infoText,
    isTextLoading,
    toggleLoading,
    addRowModalVisible,
    formRowAddition,
    formRowEdition,
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
  } = useDashboard();

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
            <TinyMceEditor textareaName="text" initialValue={item.text} form={formRowEdition}/>
          </Form.Item>
        ) : (
          <div className="w-full whitespace-pre-line" dangerouslySetInnerHTML={{ __html: item.text }}/>
        )}
        {editable ? (
          <span className="flex flex-col items-center ml-4 gap-2">
            <Button icon={<SaveOutlined/>} onClick={() => saveRow(item.id)}/>
            <Typography.Link onClick={cancel} className="text-nowrap">
              {CANCEL}
            </Typography.Link>
          </span>
        ) : (
          <Button icon={<EditOutlined/>} onClick={() => editRow(item)}/>
        )}
      </List.Item>
    );
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
            <TbDeviceFloppy size={30} className="cursor-pointer hover:text-green" onClick={savePage}/>
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
          <Tabs defaultActiveKey="home" items={pages}/>
        </Card>
        <Card bordered={false} className="rounded-lg col-span-12 lg:col-span-4">
          <div className="space-y-4">
            <div className="text-3xl text-center">{DASHBOARD_TITLE_INFORMATION}</div>
            <Flex align="baseline" justify="space-between">
              <div>{DASHBOARD_TITLE_DATE}</div>
              {festival.startDate && festival.endDate && (
                <DatePicker.RangePicker
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
              <Switch disabled={!infoText?.id} onChange={updateInformationsVisibility} checked={infoText?.isShowed}/>
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
            <TinyMceEditor textareaName="text" form={formRowAddition} minHeight={150}/>
          </Form.Item>
          <Form.Item
            label={DASHBOARD_MODAL_TYPE}
            name="type"
            rules={[{ required: true, message: DASHBOARD_MODAL_TYPE_RULE }]}>
            <Select>
              {selectTextType.map((type, key) => (
                <Select.Option key={key} value={type.value}>
                  {type.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Navigation>
  );
};
export default Dashboard;
