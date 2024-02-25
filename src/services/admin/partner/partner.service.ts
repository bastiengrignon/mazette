import { IPartner } from './partner.interface'
import { UploadService } from '../upload'
import axiosInstance from "../../axios";

export class PartnerService {
    static getAll = async (): Promise<IPartner[]> => await axiosInstance.get('/partner').then(r => r.data)

    static create = async (partner: IPartner, file?: File): Promise<IPartner> => {
        let tmpFile
        if (file) await UploadService.getBase64(file).then(base64Url => tmpFile = base64Url)
        const tmpPartner = { ...partner, image: tmpFile }
        return await axiosInstance.post('/partner', tmpPartner).then(r => r.data)
    }

    static update = async (id: number, updatedPartner: IPartner): Promise<IPartner> => await axiosInstance.put(`/partner/${ id }`, updatedPartner).then(r => r.data)

    static delete = async (id: number): Promise<void> => await axiosInstance.delete(`/partner/${ id }`).then(r => r.data)
}
