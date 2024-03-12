export interface IMusic {
  id: number;
  name: string;
  type: string;
  description: string;
  publicationDate: Date;
  image: string;
  videoLink?: string;
}

export interface IMusicUpload {
  name: string;
  type: string;
  description: string;
  publicationDate: Date;
  image: { file: { originFileObj: Blob } };
  videoLink?: string;
}
