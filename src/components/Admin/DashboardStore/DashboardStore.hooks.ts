import { Form, FormInstance, FormProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { IStore, StoreService } from '../../../services/admin/store';

interface KeyBoolean {
  [x: string]: boolean
}

interface IDashboardStoreHooks {
  form: FormInstance<IStore>
  items: IStore[]
  articlesLoading: boolean
  addArticleLoading: boolean
  deleteArticleLoading: KeyBoolean
  onAddArticle: (values: IStore) => void
  deleteArticle: (articleId: string) => void
}

export const useDashboardStore = (): IDashboardStoreHooks => {
  const [form] = Form.useForm();
  const [items, setItems] = useState<IStore[]>([]);
  const [articlesLoading, setArticlesLoading] = useState<boolean>(false);
  const [addArticleLoading, setAddArticleLoading] = useState<boolean>(false);
  const [deleteArticleLoading, setDeleteArticleLoading] = useState<KeyBoolean>({});

  const onAddArticle: FormProps<IStore>['onFinish'] = useCallback(({ name, price }): void => {
    setAddArticleLoading(true);
    StoreService.addArticle({ name, price, })
      .then((res) => setItems((prevState) => [...prevState, res]))
      .finally(() => setAddArticleLoading(false));
    form.resetFields();
  }, []);

  const deleteArticle = useCallback((articleId: string): void => {
    setDeleteArticleLoading((prevState) => ({ ...prevState, [articleId]: true }));
    StoreService.removeArticle(articleId).then(() => {
        setItems((prevState) => prevState.filter((item) => item.id !== articleId));
        setDeleteArticleLoading((prevState) => ({ ...prevState, [articleId]: false }));
      }
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
    deleteArticleLoading,
    onAddArticle,
    deleteArticle,
  };
};
