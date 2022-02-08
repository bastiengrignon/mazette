export interface IMovie {
    id: number
    title: string
    author: string
    description: string
    date: string
    publicationDate: Date
    location: string
    duration: string
    imgThumbnail: string
    videoLink?: string
}