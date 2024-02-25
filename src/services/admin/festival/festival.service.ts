import { IFestival } from './festival.interface';
import axiosInstance from '../../axios';

export class FestivalService {
  static getAll = async (): Promise<IFestival[]> => await axiosInstance.get('/festival').then((r) => r.data);

  static getById = async (id: string): Promise<IFestival> =>
    await axiosInstance.get(`/festival/${id}`).then((r) => r.data);

  static getLastFestival = async (): Promise<IFestival> =>
    await axiosInstance.get('/festival/last').then((r) => r.data);

  static update = async (id: string, updatedFestival: IFestival): Promise<IFestival> =>
    await axiosInstance.put(`/festival/${id}`, updatedFestival).then((r) => r.data);

  static delete = async (id: string): Promise<void> =>
    await axiosInstance.delete(`/festival/${id}`).then((r) => r.data);
}
