import { Image } from "./index"

const partnersFolder = `${process.env.PUBLIC_URL}/img/partners`

export const partners: Image[] = [
    {
        src: `${partnersFolder}/mazette.webp`,
        alt: "Mazette!"
    },
    {
        src: `${partnersFolder}/fondation_de_france.webp`,
        alt: "Fondation de France"
    },
    {
        src: `${partnersFolder}/pdll.webp`,
        alt: "Région Pays De La Loire"
    },
    {
        src: `${partnersFolder}/maze_milon.webp`,
        alt: "Mazé-Milon"
    },
    {
        src: `${partnersFolder}/entente_vallee.webp`,
        alt: "Entente vallée"
    },
    {
        src: `${partnersFolder}/credit_mutuel.webp`,
        alt: "Credit Mutuel"
    },
    {
        src: `${partnersFolder}/la_payotte.webp`,
        alt: "La Payotte"
    },
    {
        src: `${partnersFolder}/chambres_d_hotes.webp`,
        alt: "Chambres d'hôtes"
    },
]