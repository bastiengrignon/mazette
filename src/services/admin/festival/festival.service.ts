import axios from "axios";

import { IFestival } from './festival.interface'

export class FestivalService {
    static getAll = async (): Promise<IFestival[]> => await axios.get('/festival').then(r => r.data)

    static getById = async (id: string): Promise<IFestival> => await axios.get(`/festival/${ id }`).then(r => r.data)

    static getLastFestival = async (): Promise<IFestival> => await axios.get(`/festival/last`).then(r => r.data)

    static update = async (id: string, updatedFestival: IFestival): Promise<IFestival> => await axios.put(`/festival/${ id }`, updatedFestival).then(r => r.data)

    static delete = async (id: string): Promise<void> => await axios.delete(`/festival/${ id }`).then(r => r.data)
}
