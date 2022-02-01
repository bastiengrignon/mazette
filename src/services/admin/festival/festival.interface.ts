export interface IFestival {
    id: number
    name: string
    location: ICoordinates
    startDate: Date
    endDate: Date
    updatedAt?: Date
    createdAt?: Date
}

export interface ICoordinates {
    latitude: number
    longitude: number
}