import { IPartner, IPartnerUpload } from './partner.interface';
import axiosInstance from '../../axios';
import { fillFormDataWithKeys } from '../../../lib/form';

export class PartnerService {
  static getAll = async (): Promise<IPartner[]> => await axiosInstance.get('/partner').then((r) => r.data);

  static create = async (partner: IPartnerUpload): Promise<IPartner> => {
    const formData = new FormData();
    formData.append('image', partner.image.file.originFileObj);
    fillFormDataWithKeys(formData, partner);

    return await axiosInstance
      .post('/partner', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  };

  static update = async (id: number, updatedPartner: IPartner): Promise<IPartner> =>
    await axiosInstance.put(`/partner/${id}`, updatedPartner).then((r) => r.data);

  static delete = async (id: number): Promise<void> => await axiosInstance.delete(`/partner/${id}`).then((r) => r.data);
}
