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
        imgThumbnail: `${process.env.PUBLIC_URL}/img/malheureuse.jpg`,
        imgExtended: `${process.env.PUBLIC_URL}/img/malheureuse_extended.jpg`
    },
    {
        filmName: "Gros bonhomme sur des chaises",
        author: "Jean Pierre",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi" +
        " consectetur consequatur dolores excepturi exercitationem in iusto laborum magnam" +
            " quaerat quos, sint soluta ullam ut",
        date: "2018",
        location: "France",
        duration: "39min",
        imgThumbnail: `${process.env.PUBLIC_URL}/img/chair.jpg`
    },
    {
        filmName: "L'homme au sourire",
        author: "Albert Mike",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi" +
            " consectetur consequatur dolores excepturi exercitationem in iusto laborum magnam" +
            " quaerat quos, sint soluta ullam ut.",
        date: "2018",
        location: "France",
        duration: "25min",
        imgThumbnail: `${process.env.PUBLIC_URL}/img/portrait.jpg`
    }
    ,
    {
        filmName: "Fille dans un champ",
        author: "Sandy Nancy",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi" +
            " consectetur consequatur dolores excepturi exercitationem in iusto laborum magnam" +
            " quaerat quos, sint soluta ullam ut",
        date: "2016",
        location: "Américain",
        duration: "1h15min",
        imgThumbnail: `${process.env.PUBLIC_URL}/img/leaf.jpg`
    }
]