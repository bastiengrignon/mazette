import axios from 'axios'

import { IText } from './text.interface'

export class TextService {
    static getAll = async (): Promise<IText[]> => await axios.get('/text').then(r => r.data)

    static create = async (text: IText): Promise<IText> => await axios.post('/text', text).then(r => r.data)

    static update = async (id: number, updatedMusic: IText): Promise<IText> => await axios.put(`/text/${ id }`, updatedMusic).then(r => r.data)

    static delete = async (id: number): Promise<void> => await axios.delete(`/text/${ id }`).then(r => r.data)
}