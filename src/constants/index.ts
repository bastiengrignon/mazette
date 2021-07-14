import { DropdownItem } from "../components/DropDown"

export interface Image {
    src: string
    alt: string
}

const defaultImgFolder = `${ process.env.PUBLIC_URL }/img`
export const staticImgFolder = `${ defaultImgFolder }/static`
export const musicFolder = `${ defaultImgFolder }/musics`
export const filmsImgFolder = `${ defaultImgFolder }/films`
export const partnersFolder = `${ defaultImgFolder }/partners`

export enum RouterUrl {
    home = "/",
    programmation = "/programmation",
    association = "/association",
    information = "/information",
    mention = "/mention-legales"
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
        facebook: "https://www.facebook.com/festivalmazette",
        myLinkedin: "https://www.linkedin.com/in/bastien-grignon/"
    },
    music: {
        oulitsa: "https://youtu.be/9YVuyx6SoVA",
        wugo: "https://youtu.be/wc3LAkClt0k"
    },
    films: {
        anais: "https://youtu.be/ng2piTp2LCc",
        repasDominical: "https://youtu.be/zrNmA-uv0JU",
        bigorneaux: "https://vimeo.com/215049057",
        lila: "https://youtu.be/7hqDFebavDc",
        nuisibles: "https://vimeo.com/511031470"
    },
    others: {
        payotte: "https://www.lapayotte.net"
    }
}