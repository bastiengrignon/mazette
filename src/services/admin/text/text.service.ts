import axios from "axios"
import { IText } from "./text.interface"

const textUrl = "/text"

export class TextService {
    static getAll = async (): Promise<IText[]> => await axios.get(textUrl).then(r => r.data)

    static create = async (text: IText): Promise<IText> => await axios.post(textUrl, text).then(r => r.data)

    static update = async (id: number, updatedMusic: IText): Promise<IText> => await axios.put(`/${ textUrl }/${ id }`, updatedMusic).then(r => r.data)

    static delete = async (id: number): Promise<void> => await axios.delete(`${ textUrl }/${ id }`).then(r => r.data)
}