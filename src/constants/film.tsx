import React, { ReactNode } from "react"

const filmsImgFolder = `${process.env.PUBLIC_URL}/img/films`
const filmsImgNBFolder = `${filmsImgFolder}/nb`

export interface FilmProps {
    filmName: string
    author: string
    description: string | ReactNode
    date: string
    location: string
    duration: string
    imgThumbnail: string
    imgExtended?: string
}

export const films: FilmProps[] = [
    {
        filmName: "J'suis pas malheureuse",
        author: "Laïs Lecaster",
        description: <div>
            J’ai grandi à Argenteuil, en banlieue parisienne et je viens de terminer mon Master 2 de Cinéma
            en réalisation à l’Université Paris 8 à Saint Denis. J’ai vingt trois ans. C’est ce film de fin d’études
            que je présente aujourd’hui en festival. Il a été finalisé sur une période de deux ans, sous la direction de
            Claire Simon.
        </div>,
        date: "2018",
        location: "France",
        duration: "45min",
        imgThumbnail: `${filmsImgNBFolder}/j_suis_pas_malheureuse_nb.png`,
        imgExtended: `${filmsImgFolder}/j_suis_pas_malheureuse.png`
    },
    {
        filmName: "Le repas dominical",
        author: "Cécile Devaux",
        description: <div>
            C’est dimanche. Au cours du repas, Jean observe les membres de sa famille. On lui pose des questions sans
            écouter les réponses, on lui donne des conseils sans les suivre, on le caresse et on le gifle, c’est normal,
            c’est le repas dominical.
        </div>,
        date: "2015",
        location: "France",
        duration: "13min - Fiction animation",
        imgThumbnail: `${filmsImgNBFolder}/le_repas_dominical_nb.png`,
        imgExtended: `${filmsImgFolder}/le_repas_dominical.png`
    },
    {
        filmName: "Anaïs s'en va en guerre",
        author: "Marion Gervais",
        description: <div>
            Anaïs a 24 ans. Elle vit seule dans une petite maison en Bretagne. Rien ne l’arrête. Ni l’administration,
            ni les professeurs misogynes, ni le tracteur en panne, ni les caprices du temps, ni demain ne lui font peur.
        </div>,
        date: "2013",
        location: "...",
        duration: "43min - Documentaire",
        imgThumbnail: `${filmsImgNBFolder}/anais_s_en_va_t_en_guerre_nb.png`,
        imgExtended: `${filmsImgFolder}/anais_s_en_va_t_en_guerre.png`
    }
]