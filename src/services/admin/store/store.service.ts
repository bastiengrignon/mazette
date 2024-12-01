import { IStore } from './store.interface';
import axiosInstance from '../../axios';

export class StoreService {
  static getAllArticles = async (): Promise<IStore[]> => (await axiosInstance.get('/store')).data;
  static addArticle = async ({ name, price }: Partial<IStore>): Promise<IStore> => (await axiosInstance.post('/store', { name, price })).data;
  static removeArticle = async (id: string): Promise<void> => (await axiosInstance.delete(`/store/${id}`)).data;
}
