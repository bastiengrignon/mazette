import React from 'react';
import Navigation from '../../../pages/admin/Navigation';
import { Button, Divider, Flex, Form, Input, InputNumber, Typography } from 'antd';
import { formattedPrice } from '../../../lib/form';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useDashboardStore } from './DashboardStore.hooks';

const DashboardStore: React.FC = () => {
  const { form, items, onAddArticle, deleteArticle } = useDashboardStore();
  return (
    <Navigation>
      <p className="text-xl mb-2">Liste des articles : </p>
      <Form layout="inline" name="addArticle" form={form} onFinish={onAddArticle}>
        <Form.Item name="name" rules={[{ required: true, message: 'Veuillez rentrer un nom d\'article' }]}>
          <Input placeholder="Nom de l'article"/>
        </Form.Item>
        <Form.Item name="price" rules={[{ required: true, message: 'Veuillez rentrer un prix' }]}>
          <InputNumber min={0} step={0.5} placeholder="Prix"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="button">Ajouter</Button>
        </Form.Item>
      </Form>
      <Divider/>
      <Flex gap={8} className="mt-4">
        {items.length > 0 ? items.map((article) => (
          <div key={article.id} className="flex bg-white rounded-md p-2 aspect-[1/1] w-28">
            <Flex vertical justify="space-between" gap={8} className="w-full">
              <Flex align="center" justify="space-between" className="w-full">
                <Typography.Text strong>
                  {article.name}
                </Typography.Text>
                <Button
                  shape="circle"
                  variant="filled"
                  color="danger"
                  size="small"
                  icon={<CloseCircleOutlined/>}
                  onClick={() => deleteArticle(article.id)}
                />
              </Flex>
              <Typography.Text>
                {formattedPrice(article.price)}
              </Typography.Text>
            </Flex>
          </div>
        )) : <div>Aucun article créé</div>}
      </Flex>
    </Navigation>
  );
};

export default DashboardStore;
