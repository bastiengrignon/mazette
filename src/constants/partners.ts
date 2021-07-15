import { externalLinks, Image, partnersFolder } from "./index"

interface PartnersImage extends Image {
    link: string
}
export const partners: PartnersImage[] = [
    {
        src: `${ partnersFolder }/mazette`,
        alt: "Mazette!",
        link: ""
    },
    {
        src: `${ partnersFolder }/fondation_de_france`,
        alt: "Fondation de France",
        link: "https://www.fondationdefrance.org/fr"
    },
    {
        src: `${ partnersFolder }/pdll`,
        alt: "Région Pays De La Loire",
        link: "https://www.paysdelaloire.fr"
    },
    {
        src: `${ partnersFolder }/maze_milon`,
        alt: "Mazé-Milon",
        link: "https://www.maze-milon.fr"
    },
    {
        src: `${ partnersFolder }/entente_vallee`,
        alt: "Entente vallée",
        link: "https://www.beaufortenanjou.fr/vie-municipale/l-entente-vallee/"
    },
    {
        src: `${ partnersFolder }/credit_mutuel`,
        alt: "Credit Mutuel",
        link: "https://www.creditmutuel.fr/fr/particuliers.html"
    },
    {
        src: `${ partnersFolder }/la_payotte`,
        alt: "La Payotte",
        link: externalLinks.others.payotte
    },
    {
        src: `${ partnersFolder }/chambres_d_hotes`,
        alt: "Chambres d'hôtes",
        link: ""
    },
]