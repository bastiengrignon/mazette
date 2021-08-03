import axios from "axios"
import { IMovie } from "./movie.interface"

export class MovieService {
    static getAll = async (): Promise<IMovie[]> => await axios.get("/movie").then(r => r.data)

    static create = async (movie: IMovie): Promise<IMovie> => await axios.post("/movie", movie).then(r => r.data)

    static update = async (id: number, updatedMovie: IMovie): Promise<IMovie> => await axios.put(`/movie/${ id }`, updatedMovie).then(r => r.data)
}