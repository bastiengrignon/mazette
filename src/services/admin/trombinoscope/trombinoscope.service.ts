import axios from "axios"
import { UploadService } from "../upload/upload.service"
import { ITrombinoscope } from "./trombinoscope.interface"

export class TrombinoscopeService {
    static getAll = async (): Promise<ITrombinoscope[]> => await axios.get("/trombinoscope").then(r => r.data)

    static create = async (partner: ITrombinoscope, file?: File): Promise<ITrombinoscope> => {
        let tmpFile
        if (file) await UploadService.getBase64(file).then(base64Url => tmpFile = base64Url)
        const tmpTrombinoscope = { ...partner, image: tmpFile }
        return await axios.post("/trombinoscope", tmpTrombinoscope).then(r => r.data)
    }

    static update = async (id: number, updatedTrombinoscope: ITrombinoscope): Promise<ITrombinoscope> => await axios.put(`/trombinoscope/${ id }`, updatedTrombinoscope).then(r => r.data)
}