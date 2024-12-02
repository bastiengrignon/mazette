import { Form, FormInstance, FormProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { IStore, StoreService } from '../../../services/admin/store';

interface IDashboardStoreHooks {
  form: FormInstance<IStore>
  items: IStore[]
  articlesLoading: boolean
  addArticleLoading: boolean
  onAddArticle: (values: IStore) => void
  deleteArticle: (articleId: string) => void
}

export const useDashboardStore = (): IDashboardStoreHooks => {
  const [form] = Form.useForm();
  const [items, setItems] = useState<IStore[]>([]);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(false);
  const [addArticleLoading, setAddArticleLoading] = useState<boolean>(false);

  const onAddArticle: FormProps<IStore>['onFinish'] = useCallback(({ name, price }): void => {
    setAddArticleLoading(true);
    StoreService.addArticle({ name, price, })
      .then((res) => setItems((prevState) => [...prevState, res]))
      .finally(() => setAddArticleLoading(false));
    form.resetFields();
  }, []);

  const deleteArticle = useCallback((articleId: string): void => {
    StoreService.removeArticle(articleId).then(() =>
      setItems((prevState) => prevState.filter((item) => item.id !== articleId))
    );
  }, []);

  useEffect(() => {
    setArticlesLoading(true);
    StoreService.getAllArticles().then(setItems).finally(() => setArticlesLoading(false));
  }, []);

  return {
    form,
    items,
    articlesLoading,
    addArticleLoading,
    onAddArticle,
    deleteArticle,
  };
};
