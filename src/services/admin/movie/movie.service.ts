import { IMovie } from './movie.interface'
import { UploadService } from '../upload'
import axiosInstance from '../../axios'

export class MovieService {
    static getAll = async (): Promise<IMovie[]> => await axiosInstance.get('/movie').then(r => r.data)

    static create = async (movie: IMovie, file?: File): Promise<IMovie> => {
        let tmpFile
        if (file) await UploadService.getBase64(file).then(base64Url => tmpFile = base64Url)
        const tmpMovie = { ...MovieService.formatMovieDates(movie), imgThumbnail: tmpFile }
        return await axiosInstance.post('/movie', tmpMovie).then(r => r.data)
    }

    static update = async (id: number, updatedMovie: IMovie): Promise<IMovie> => await axiosInstance.put(`/movie/${ id }`, updatedMovie).then(r => r.data)

    static delete = async (id: number): Promise<void> => await axiosInstance.delete(`/movie/${ id }`).then(r => r.data)

    private static formatMovieDates = (movie: IMovie): IMovie => ({
        ...movie,
        date           : new Date(movie.date).getUTCFullYear().toString(),
        publicationDate: new Date(movie.publicationDate),
        duration       : `${ new Date(movie.duration).getUTCMinutes() }min ${ new Date(movie.duration).getUTCSeconds() !== 0 ? `${ new Date(movie.duration).getUTCSeconds() }s` : '' }`
    })
}
