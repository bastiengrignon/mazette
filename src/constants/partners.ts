import { Image } from "./index"

const partnersFolder = `${process.env.PUBLIC_URL}/img/partners`

export const partners: Image[] = [
    {
        src: `${partnersFolder}/mazette.png`,
        alt: "Mazette!"
    },
    {
        src: `${partnersFolder}/fondation_de_france.png`,
        alt: "Fondation de France"
    },
    {
        src: `${partnersFolder}/pdll.png`,
        alt: "Région Pays De La Loire"
    },
    {
        src: `${partnersFolder}/maze_milon.png`,
        alt: "Mazé-Milon"
    },
    {
        src: `${partnersFolder}/entente_vallee.png`,
        alt: "Entente vallée"
    },
    {
        src: `${partnersFolder}/credit_mutuel.png`,
        alt: "Credit Mutuel"
    },
    {
        src: `${partnersFolder}/la_payotte.png`,
        alt: "La Payotte"
    },
    {
        src: `${partnersFolder}/chambres_d_hotes.png`,
        alt: "Chambres d'hôtes"
    },
]