export interface IFestival {
    id: number
    name: string
    edition: number
    location: ICoordinates
    startDate: Date
    endDate: Date
    showMusic: boolean
    showMovie: boolean
    updatedAt?: Date
    createdAt?: Date
}

export interface ICoordinates {
    latitude: number
    longitude: number
}