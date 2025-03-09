import React, { Dispatch, SetStateAction } from 'react';
import { Button, Collapse, Form, List, Modal, Select, Skeleton, Typography } from 'antd';
import {
  CANCEL,
  DASHBOARD_ADD_TEXT,
  DASHBOARD_MODAL_NEW_TEXT_TITLE,
  DASHBOARD_MODAL_TEXT,
  DASHBOARD_MODAL_TEXT_RULE,
  DASHBOARD_MODAL_TYPE,
  DASHBOARD_MODAL_TYPE_RULE,
} from '../Dashboard/Dashboard.constants';
import { IText, TextType } from '../../../services';
import { MODAL_ADD_TEXT, MODAL_CANCEL_TEXT } from '../Admin.constants';
import TinyMceEditor from '../TinyMceEditor';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useDashboardText } from './useDashboardText.hook';

interface DashboardTextProps {
  isLoading: boolean;
  texts: IText[],
  setTexts: Dispatch<SetStateAction<IText[]>>
  setNewTexts: Dispatch<SetStateAction<IText[]>>
}

const DashboardText: React.FC<DashboardTextProps> = ({ isLoading, texts, setTexts, setNewTexts }) => {
  const {
    isEditing,
    saveRow,
    editRow,
    cancel,
    collapseTitle,
    addRowModalVisible,
    handleOkModal,
    setAddRowModalVisible,
    formRowAddition,
    formRowEdition,
    selectTextType,
  } = useDashboardText({ texts, setTexts, setNewTexts });

  const renderListTextItem = (item: IText, key: number): React.ReactNode => {
    const editable = isEditing(item);
    return (
      <List.Item key={key} className="inline-flex items-center justify-between w-full">
        {editable ? (
          <Form.Item
            className="w-full"
            name="text"
            initialValue={item.text}>
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

  return (
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
            <Skeleton avatar={true} active={true} loading={isLoading}>
              <Form form={formRowEdition} component={false}>
                <List
                  dataSource={texts.filter(({ type }) => type === textType)}
                  renderItem={renderListTextItem}
                />
              </Form>
            </Skeleton>
          ),
        }))}
      />

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
            <TinyMceEditor textareaName="text" form={formRowAddition}/>
          </Form.Item>
          <Form.Item
            label={DASHBOARD_MODAL_TYPE}
            name="type"
            rules={[{ required: true, message: DASHBOARD_MODAL_TYPE_RULE }]}>
            <Select>
              {selectTextType.map(({ value, text }, key) => (
                <Select.Option key={key} value={value}>
                  {text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
};

export default DashboardText;
