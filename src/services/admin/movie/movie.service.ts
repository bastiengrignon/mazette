import axios from "axios"
import { IMovie } from "./movie.interface"

export class MovieService {
    static getAll = async (): Promise<IMovie[]> => await axios.get("/movie").then(r => r.data)

    static create = async (movie: IMovie, file: string): Promise<IMovie> => {
        const tmpMovie = { ...MovieService.formatMovieDates(movie), imgThumbnail: file }
        return await axios.post("/movie", tmpMovie).then(r => r.data)
    }

    static update = async (id: number, updatedMovie: IMovie): Promise<IMovie> => await axios.put(`/movie/${ id }`, updatedMovie).then(r => r.data)

    private static formatMovieDates = (movie: IMovie): IMovie => {
        return {
            ...movie,
            date: new Date(movie.date).getUTCFullYear().toString(),
            publicationDate: new Date(movie.publicationDate).getUTCDate().toString(),
            duration: `${ new Date(movie.duration).getUTCMinutes() }min ${ new Date(movie.duration).getUTCSeconds() }s`
        }
    }
}