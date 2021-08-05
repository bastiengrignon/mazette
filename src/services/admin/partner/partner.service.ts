import axios from "axios"
import { UploadService } from "../upload/upload.service"
import { IPartner } from "./partner.interface"

const partnerUrl = "/partner"

export class PartnerService {
    static getAll = async (): Promise<IPartner[]> => await axios.get(partnerUrl).then(r => r.data)

    static create = async (partner: IPartner, file?: File): Promise<IPartner> => {
        let tmpFile
        if (file) await UploadService.getBase64(file).then(base64Url => tmpFile = base64Url)
        const tmpPartner = { ...partner, image: tmpFile }
        return await axios.post(partnerUrl, tmpPartner).then(r => r.data)
    }

    static update = async (id: number, updatedPartner: IPartner): Promise<IPartner> => await axios.put(`/${ partnerUrl }/${ id }`, updatedPartner).then(r => r.data)

    static delete = async (id: number): Promise<void> => await axios.delete(`${ partnerUrl }/${ id }`).then(r => r.data)
}