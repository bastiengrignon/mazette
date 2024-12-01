import { Form, FormInstance, FormProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { IStore, StoreService } from '../../../services/admin/store';

interface IDashboardStoreHooks {
  form: FormInstance<IStore>
  items: IStore[]
  onAddArticle: (values: IStore) => void
  deleteArticle: (articleId: string) => void
}

export const useDashboardStore = (): IDashboardStoreHooks => {
  const [form] = Form.useForm();
  const [items, setItems] = useState<IStore[]>([]);

  const onAddArticle: FormProps<IStore>['onFinish'] = useCallback(({ name, price }): void => {
    StoreService.addArticle({ name, price, }).then((res) => setItems([...items, res]));
    form.resetFields();
  }, []);

  const deleteArticle = useCallback((articleId: string): void => {
    StoreService.removeArticle(articleId).then(() =>
      setItems(items.filter((item) => item.id !== articleId))
    );
  }, []);

  useEffect(() => {
    StoreService.getAllArticles().then(setItems);
  }, []);

  return {
    form,
    items,
    onAddArticle,
    deleteArticle,
  };
};
