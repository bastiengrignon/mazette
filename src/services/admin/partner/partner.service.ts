import axios from "axios"
import { UploadService } from "../upload/upload.service"
import { IPartner } from "./partner.interface"

export class PartnerService {
    static getAll = async (): Promise<IPartner[]> => await axios.get("/partner").then(r => r.data)

    static create = async (partner: IPartner, file?: File): Promise<IPartner> => {
        let tmpFile
        if (file) await UploadService.getBase64(file).then(base64Url => tmpFile = base64Url)
        const tmpPartner = { ...partner, image: tmpFile }
        return await axios.post("/partner", tmpPartner).then(r => r.data)
    }

    static update = async (id: number, updatedPartner: IPartner): Promise<IPartner> => await axios.put(`/partner/${ id }`, updatedPartner).then(r => r.data)

    static delete = async (id: number): Promise<void> => await axios.delete(`/partner/${ id }`).then(r => r.data)
}