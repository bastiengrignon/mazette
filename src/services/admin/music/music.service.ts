import { IMusic } from './music.interface'
import { UploadService } from '../upload'
import axiosInstance from "../../axios";

export class MusicService {
    static getAll = async (): Promise<IMusic[]> => await axiosInstance.get('/music').then(r => r.data)

    static create = async (music: IMusic, file?: File): Promise<IMusic> => {
        let tmpFile
        if (file) await UploadService.getBase64(file).then(base64Url => tmpFile = base64Url)
        const tmpMusic = { ...MusicService.formatMovieDates(music), image: tmpFile }
        return await axiosInstance.post('/music', tmpMusic).then(r => r.data)
    }

    static update = async (id: number, updatedMusic: IMusic): Promise<IMusic> => await axiosInstance.put(`/music/${ id }`, updatedMusic).then(r => r.data)

    static delete = async (id: number): Promise<void> => await axiosInstance.delete(`/music/${ id }`).then(r => r.data)

    private static formatMovieDates = (music: IMusic): IMusic => ({
        ...music,
        publicationDate: new Date(music.publicationDate)
    })
}
