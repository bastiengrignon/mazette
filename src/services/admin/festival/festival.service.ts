import axios from 'axios'

import { IFestival } from './festival.interface'

export class FestivalService {
    static getAll = async (): Promise<IFestival[]> => await axios.get('/festival').then(r => r.data)

    static create = async (festival: Partial<IFestival>): Promise<Partial<IFestival>> => {
        console.log('festival: ')
        console.log({ festival })
        return await axios.post('/festival', festival).then(r => r.data)
    }

    static getById = async (id: number): Promise<IFestival> => await axios.get(`/festival/${ id }`).then(r => r.data)

    static update = async (id: number, updatedFestival: IFestival): Promise<IFestival> => await axios.put(`/festival/${ id }`, updatedFestival).then(r => r.data)

    static delete = async (id: number): Promise<void> => await axios.delete(`/festival/${ id }`).then(r => r.data)
}