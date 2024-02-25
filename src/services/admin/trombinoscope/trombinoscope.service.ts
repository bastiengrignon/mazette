import { ITrombinoscope } from './trombinoscope.interface'
import { UploadService } from '../upload'
import axiosInstance from "../../axios";

export class TrombinoscopeService {
    static getAll = async (): Promise<ITrombinoscope[]> => await axiosInstance.get('/trombinoscope').then(r => r.data)

    static create = async (partner: ITrombinoscope, file?: File): Promise<ITrombinoscope> => {
        let tmpFile
        if (file) await UploadService.getBase64(file).then(base64Url => tmpFile = base64Url)
        const tmpTrombinoscope = { ...partner, image: tmpFile }
        return await axiosInstance.post('/trombinoscope', tmpTrombinoscope).then(r => r.data)
    }

    static update = async (id: number, updatedTrombinoscope: ITrombinoscope): Promise<ITrombinoscope> => await axiosInstance.put(`/trombinoscope/${ id }`, updatedTrombinoscope).then(r => r.data)

    static delete = async (id: number): Promise<void> => await axiosInstance.delete(`/trombinoscope/${ id }`).then(r => r.data)
}
