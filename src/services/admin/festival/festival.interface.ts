export interface IFestival {
  id: string;
  name: string;
  location: ICoordinates;
  startDate: Date;
  endDate: Date;
  showMusic: boolean;
  showMovie: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}
