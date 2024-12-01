import dayjs from 'dayjs';

const defaultImgFolder = '/assets/img';
export const staticImgFolder = `${defaultImgFolder}/static`;

export const adminSubdomain = 'admin';
export const MAZETTE_USER_ID = 'mazette-user-id';

export enum RouterUrl {
  home = '/',
  programmation = '/programmation',
  association = '/association',
  information = '/information',
  mention = '/mention-legales',
  passSanitaire = '/pass-sanitaire',
  vote = '/vote',

  adminMovie = '/movie',
  adminMusic = '/music',
  adminPartner = '/partner',
  adminTrombinoscope = '/trombinoscope',
  adminVote = '/votes',
  adminVoteStatistics = '/votes/:voteId',
  adminStore = '/store',

  notFound = '*',
}

export enum TabName {
  programmation = 'Programmation',
  association = 'Mazette c’est qui ?',
  information = 'Venir au festival',
}

export enum programmationTitle {
  musique = 'musique',
  films = 'courts-métrages',
  concours = 'concours',
}

export enum associationTitle {
  association = 'l’association',
  equipe = 'l’équipe',
  adherer = 'adhérer',
  previousEdition = 'Éditions précédentes',
}

export enum informationTitle {
  food = 'Boire & Manger',
  festival = 'Venir au festival',
  contact = 'Nous contacter',
}

export const programmationItems = [
  {
    name: programmationTitle.musique,
    link: RouterUrl.programmation,
  },
  {
    name: programmationTitle.films,
    link: RouterUrl.programmation,
  },
  {
    name: programmationTitle.concours,
    link: RouterUrl.programmation,
  },
];

export const associationItems = [
  {
    name: associationTitle.association,
    link: RouterUrl.association,
  },
  {
    name: associationTitle.equipe,
    link: RouterUrl.association,
  },
  {
    name: associationTitle.adherer,
    link: RouterUrl.association,
  },
  {
    name: associationTitle.previousEdition,
    link: RouterUrl.association,
  },
];

export const externalLinks = {
  social: {
    instagram: 'https://www.instagram.com/festivalmazette',
    facebook: 'https://www.facebook.com/festivalmazette',
    myLinkedin: 'https://www.linkedin.com/in/bastien-grignon/',
  },
  music: {
    oulitsa: 'https://youtu.be/9YVuyx6SoVA',
    elayiis: 'https://www.youtube.com/channel/UCtKeqrDiSDL9pH5lsOZuYWw',
    elayiisIG: 'https://www.instagram.com/elayiis/',
    wugo: 'https://youtu.be/wc3LAkClt0k',
  },
  films: {
    anais: 'https://youtu.be/ng2piTp2LCc',
    jeunesses: 'https://www.dailymotion.com/video/x7tk541',
    repasDominical: 'https://youtu.be/zrNmA-uv0JU',
    bigorneaux: 'https://vimeo.com/215049057',
    lila: 'https://youtu.be/7hqDFebavDc',
    nuisibles: 'https://vimeo.com/511031470',
  },
  others: {
    payotte: 'https://www.lapayotte.net',
    schedule: '/ligne403.pdf',
  },
};

type PreviousEdition = {
  value: string;
  label: string;
};

const startYearFirstEdition: number = 2021;

export const allEditions = (includeCurrentYear: boolean = true): PreviousEdition[] => {
    const currentYear = includeCurrentYear ? dayjs().year() : dayjs().year() - 1;
    return Array.from({ length: currentYear - startYearFirstEdition + 1 }, (_, i) => startYearFirstEdition + i)
        .map((year) => ({
            value: `${year}`, label: `Édition ${year}`
        }))
        .sort()
        .reverse();
};
