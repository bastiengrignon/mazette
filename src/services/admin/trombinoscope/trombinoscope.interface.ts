export interface ITrombinoscope {
  id: number;
  name: string;
  image: string;
  createdAt?: Date;
}

export interface ITrombinoscopeUpload {
  name: string;
  image: { file: { originFileObj: Blob } };
}
