import { IMusic, IMusicUpload } from './music.interface';
import axiosInstance from '../../axios';

export class MusicService {
  static getAll = async (): Promise<IMusic[]> => await axiosInstance.get('/music').then((r) => r.data);

  static create = async (music: IMusicUpload): Promise<IMusic> => {
    const formattedMusic = MusicService.formatMusicDates(music);

    const formData = new FormData();
    formData.append('image', music.image.file.originFileObj);
    Object.entries(formattedMusic).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return await axiosInstance
      .post('/music', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  };

  static update = async (id: number, updatedMusic: IMusic): Promise<IMusic> =>
    await axiosInstance.put(`/music/${id}`, updatedMusic).then((r) => r.data);

  static delete = async (id: number): Promise<void> => await axiosInstance.delete(`/music/${id}`).then((r) => r.data);

  private static formatMusicDates = (music: IMusicUpload): IMusicUpload => ({
    ...music,
    publicationDate: new Date(music.publicationDate),
  });
}
