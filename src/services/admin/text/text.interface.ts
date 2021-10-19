export interface IText {
    id: number
    text: string
    type: TextType
    updatedAt?: Date
    createdAt?: Date
}

export enum TextType {
    music = 'music',
    movie = 'movie',
    contest = 'contest',
    association = 'association',
    team = 'team',
    adhere = 'adhere',
    food = 'food',
    journey = 'journey',
    home = 'home',
    covid = 'covid'
}