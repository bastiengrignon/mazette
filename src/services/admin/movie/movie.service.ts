import axios from "axios"
import { IMovie } from "./movie.interface"

export class MovieService {
    static getAll = async (): Promise<IMovie[]> => {
        return await axios.get("/movie").then(r => r.data)
    }

    static update = async (id: number, updatedMovie: IMovie): Promise<IMovie> => {
        return await axios.put(`/movie/${id}`, updatedMovie).then(r => r.data)
    }
}