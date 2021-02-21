const filmsImgFolder = `${process.env.PUBLIC_URL}/img/films`
const filmsImgNBFolder = `${filmsImgFolder}/nb`
export const staticImgFolder = `${process.env.PUBLIC_URL}/img/static`

export enum RouterUrl {
    home = "/",
    programmation = "/programmation",
    association = "/association",
    information = "/information"
}

export enum TabName {
    festival = "Le festival",
    programmation = "Programmation",
    association = "L'association",
    information = "Infos Pratiques"
}

export enum programmationTitle {
    films = "Courts-métrages",
    musique = "Musique",
    concours = "Concours"
}

export enum associationTitle {
    association = "L'association",
    equipe = "L'équipe",
    adherer = "Adhérer",
    sponsor = "Partenaires"
}

export enum informationTitle {
    food = "Boire & Manger",
    festival = "Venir au festival",
    contact = "Nous contacter"
}

export const films = [
    {
        filmName: "J'suis pas malheureuse",
        author: "Laïs Lecaster",
        description: "J’ai grandi à Argenteuil, en banlieue parisienne et je viens de terminer" +
            " mon Master 2 de Cinéma en réalisation à l’Université Paris 8 à Saint Denis. J’ai" +
            " vingt trois ans. C’est ce film de fin d'études que je présente aujourd’hui en" +
            " festival. Il a été finalisé sur une période de deux ans, sous la direction de" +
            " Claire Simon.",
        date: "2018",
        location: "France",
        duration: "45min",
        imgThumbnail: `${filmsImgNBFolder}/j_suis_pas_malheureuse_nb.png`,
        imgExtended: `${filmsImgFolder}/j_suis_pas_malheureuse.png`
    },
    {
        filmName: "Le repas dominical",
        author: "Décile Devaux",
        description: "C’est dimanche. Au cours du repas, Jean observe les membres de sa famille." +
            " On lui pose des questions sans écouter les réponses, on lui donne des conseils sans " +
            "les suivre, on le caresse et on le gifle, c’est normal, c’est le repas dominical.",
        date: "2015",
        location: "France",
        duration: "13min - Fiction animation",
        imgThumbnail: `${filmsImgNBFolder}/le_repas_dominical_nb.png`,
        imgExtended: `${filmsImgFolder}/le_repas_dominical.png`
    },
    {
        filmName: "Anaïs s'en va en guerre",
        author: "Marion Gervais",
        description: "Anaïs a 24 ans. Elle vit seule dans une petite maison en Bretagne. Rien ne " +
            "l’arrête. Ni l’administration, ni les professeurs misogynes, ni le tracteur en panne, " +
            "ni les caprices du temps, ni demain ne lui font peur. ",
        date: "2013",
        location: "...",
        duration: "43min - Documentaire",
        imgThumbnail: `${filmsImgNBFolder}/anais_s_en_va_t_en_guerre_nb.png`,
        imgExtended: `${filmsImgFolder}/anais_s_en_va_t_en_guerre.png`
    }
]