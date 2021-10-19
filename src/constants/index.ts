import { DropdownItem } from '../components/DropDown'

const defaultImgFolder = `${ process.env.PUBLIC_URL }/assets/img`
export const staticImgFolder = `${ defaultImgFolder }/static`
export const musicFolder = `${ defaultImgFolder }/musics`
export const filmsImgFolder = `${ defaultImgFolder }/films`
export const partnersFolder = `${ defaultImgFolder }/partners`

export const adminSubdomain = 'admin'

export enum RouterUrl {
    home = '/',
    programmation = '/programmation',
    association = '/association',
    information = '/information',
    mention = '/mention-legales',
    passSanitaire = '/pass-sanitaire',
    adminMovie = '/movie',
    adminMusic = '/music',
    adminPartner = '/partner',
    adminTrombinoscope = '/trombinoscope'
}

export enum TabName {
    programmation = 'Programmation',
    association = 'Mazette c’est qui ?',
    information = 'Venir au festival'
}

export enum programmationTitle {
    musique = 'musique',
    films = 'courts-métrages',
    concours = 'concours'
}

export enum associationTitle {
    association = 'l\'association',
    equipe = 'l\'équipe',
    adherer = 'adhérer',
}

export enum informationTitle {
    food = 'Boire & Manger',
    festival = 'Venir au festival',
    contact = 'Nous contacter'
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
        instagram : 'https://www.instagram.com/festivalmazette',
        facebook  : 'https://www.facebook.com/festivalmazette',
        myLinkedin: 'https://www.linkedin.com/in/bastien-grignon/'
    },
    music: {
        oulitsa  : 'https://youtu.be/9YVuyx6SoVA',
        elayiis  : 'https://www.youtube.com/channel/UCtKeqrDiSDL9pH5lsOZuYWw',
        elayiisIG: 'https://www.instagram.com/elayiis/',
        wugo     : 'https://youtu.be/wc3LAkClt0k'
    },
    films: {
        anais         : 'https://youtu.be/ng2piTp2LCc',
        jeunesses     : 'https://www.dailymotion.com/video/x7tk541',
        repasDominical: 'https://youtu.be/zrNmA-uv0JU',
        bigorneaux    : 'https://vimeo.com/215049057',
        lila          : 'https://youtu.be/7hqDFebavDc',
        nuisibles     : 'https://vimeo.com/511031470'
    },
    others: {
        payotte : 'https://www.lapayotte.net',
        schedule: `${process.env.PUBLIC_URL}/assets/ligne403_schedule.pdf`
    }
}