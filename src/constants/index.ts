import { DropdownItem } from "../components/DropDown"

export interface Image {
    src: string
    alt: string
}

export const staticImgFolder = `${process.env.PUBLIC_URL}/img/static`

export enum RouterUrl {
    home = "/",
    programmation = "/programmation",
    association = "/association",
    information = "/information"
}

export enum TabName {
    programmation = "Programmation",
    association = "Mazette c’est qui ?",
    information = "Venir au festival"
}

export enum programmationTitle {
    musique = "musique",
    films = "courts-métrages",
    concours = "concours"
}

export enum associationTitle {
    association = "l'association",
    equipe = "l'équipe",
    adherer = "adhérer",
}

export enum informationTitle {
    food = "Boire & Manger",
    festival = "Venir au festival",
    contact = "Nous contacter"
}

export const programmationItems: DropdownItem[] = [
    {
        name: programmationTitle.musique,
        link: RouterUrl.programmation
    },
    {
        name: programmationTitle.films,
        link: RouterUrl.programmation
    },
    {
        name: programmationTitle.concours,
        link: RouterUrl.programmation
    }
]

export const associationItems: DropdownItem[] = [
    {
        name: associationTitle.association,
        link: RouterUrl.association
    },
    {
        name: associationTitle.equipe,
        link: RouterUrl.association
    },
    {
        name: associationTitle.adherer,
        link: RouterUrl.association
    }
]

export const externalLinks = {
    social: {
        instagram: "https://www.instagram.com/festivalmazette",
        facebook: "https://www.facebook.com/festivalmazette"
    },
    music: {
        oulitsa: "https://youtu.be/9YVuyx6SoVA",
        wugo: "https://youtu.be/wc3LAkClt0k"
    },
    others: {
        payotte: "https://www.lapayotte.net"
    }
}