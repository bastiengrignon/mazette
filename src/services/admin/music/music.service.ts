import axios from "axios"
import { UploadService } from "../upload/upload.service"
import { IMusic } from "./music.interface"

const musicUrl = "/music"

export class MusicService {
    static getAll = async (): Promise<IMusic[]> => await axios.get(musicUrl).then(r => r.data)

    static create = async (music: IMusic, file?: File): Promise<IMusic> => {
        let tmpFile
        if (file) await UploadService.getBase64(file).then(base64Url => tmpFile = base64Url)
        const tmpMusic = { ...MusicService.formatMovieDates(music), image: tmpFile }
        return await axios.post(musicUrl, tmpMusic).then(r => r.data)
    }

    static update = async (id: number, updatedMusic: IMusic): Promise<IMusic> => await axios.put(`/${ musicUrl }/${ id }`, updatedMusic).then(r => r.data)

    static delete = async (id: number): Promise<void> => await axios.delete(`${ musicUrl }/${ id }`).then(r => r.data)

    private static formatMovieDates = (music: IMusic): IMusic => {
        return {
            ...music,
            publicationDate: new Date(music.publicationDate).getUTCDate().toString(),
        }
    }
}