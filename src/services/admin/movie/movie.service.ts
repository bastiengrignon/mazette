import axios from "axios"
import { IMovie } from "./movie.interface"
import { UploadService } from "../upload/upload.service"

export class MovieService {
    static getAll = async (): Promise<IMovie[]> => await axios.get("/movie").then(r => r.data)

    static create = async (movie: IMovie, file?: File): Promise<IMovie> => {
        let tmpFile
        if (file) await UploadService.getBase64(file).then(base64Url => tmpFile = base64Url)
        const tmpMovie = { ...MovieService.formatMovieDates(movie), imgThumbnail: tmpFile }
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