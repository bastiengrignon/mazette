import { ITrombinoscope, ITrombinoscopeUpload } from './trombinoscope.interface';
import axiosInstance from '../../axios';
import { fillFormDataWithKeys } from '../../../lib/form';

export class TrombinoscopeService {
  static getAll = async (): Promise<ITrombinoscope[]> => await axiosInstance.get('/trombinoscope').then((r) => r.data);

  static create = async (trombinoscope: ITrombinoscopeUpload): Promise<ITrombinoscope> => {
    const formData = new FormData();
    formData.append('image', trombinoscope.image.file.originFileObj);
    fillFormDataWithKeys(formData, trombinoscope);

    return await axiosInstance
      .post('/trombinoscope', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  };

  static update = async (id: number, updatedTrombinoscope: ITrombinoscope): Promise<ITrombinoscope> =>
    await axiosInstance.put(`/trombinoscope/${id}`, updatedTrombinoscope).then((r) => r.data);

  static delete = async (id: number): Promise<void> =>
    await axiosInstance.delete(`/trombinoscope/${id}`).then((r) => r.data);
}
