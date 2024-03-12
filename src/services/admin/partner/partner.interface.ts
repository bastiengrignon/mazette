export interface IPartner {
  id: number;
  name: string;
  link: string;
  image: string;
  createdAt?: Date;
}

export interface IPartnerUpload {
  id: number;
  name: string;
  link: string;
  image: { file: { originFileObj: Blob } };
  createdAt?: Date;
}
