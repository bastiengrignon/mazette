import { IMovie, IMovieUpload } from './movie.interface';
import axiosInstance from '../../axios';

export class MovieService {
  static getAll = async (): Promise<IMovie[]> => await axiosInstance.get('/movie').then((r) => r.data);

  static create = async (movie: IMovieUpload): Promise<IMovie> => {
    const formattedMovie = MovieService.formatMovieDates(movie);

    const formData = new FormData();
    formData.append('image', movie.imgThumbnail.file.originFileObj);
    Object.entries(formattedMovie).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return await axiosInstance
      .post('/movie', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  };

  static update = async (id: number, updatedMovie: IMovie): Promise<IMovie> =>
    await axiosInstance.put(`/movie/${id}`, updatedMovie).then((r) => r.data);

  static delete = async (id: number): Promise<void> => await axiosInstance.delete(`/movie/${id}`).then((r) => r.data);

  private static formatMovieDates = (movie: IMovieUpload): IMovieUpload => ({
    ...movie,
    date: new Date(movie.date).getUTCFullYear().toString(),
    publicationDate: new Date(movie.publicationDate),
    duration: `${new Date(movie.duration).getUTCMinutes()}min ${new Date(movie.duration).getUTCSeconds() !== 0 ? `${new Date(movie.duration).getUTCSeconds()}s` : ''}`,
  });
}
