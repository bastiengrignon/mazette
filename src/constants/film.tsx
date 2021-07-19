import React, { ReactNode } from "react"
import { externalLinks, filmsImgFolder } from "./index"
import Link from "../components/Link"

export interface FilmProps {
    filmName: string
    author: string
    description: string | ReactNode
    date: string
    publicationDate: string
    location: string
    duration: string
    imgThumbnail: string
    imgExtended?: string
}

export const films: FilmProps[] = [
    {
        filmName: "Anaïs s'en va en guerre",
        author: "Marion Gervais",
        duration: "46min - Documentaire",
        location: "France",
        date: "2014",
        description: <div>
            Anaïs a 24 ans. Elle vit seule dans une petite maison au milieu d’un champ en Bretagne.
            Rien ne l’arrête, ni l’administration, ni les professeurs misogynes, ni son tracteur
            en panne, ni les caprices du temps. En accord avec ses convictions profondes, elle est
            portée par son rêve de toujours : celui de devenir agricultrice et de faire pousser
            des plantes aromatiques et médicinales. Le film accompagne cette jusqu’au-boutiste,
            (presque) seule contre tous.
            <br/>
            Bande annonce : <br/>
            <Link src={ externalLinks.films.anais }>{ externalLinks.films.anais }</Link>
        </div>,
        imgThumbnail: `${ filmsImgFolder }/anaïs_s_en_va_en_guerre_de_marion_gervais`,
        publicationDate: "31"
    },
    {
        filmName: "Jeunesses Françaises",
        author: "Stéphan Castang",
        duration: "19min14s - Fiction documentaire",
        location: "France",
        date: "2011",
        description: <div>
            Des lycéens, cadre serré, répondent aux questions d’un conseiller d’orientation un peu
            agressif. Tour à tour, les adolescents se révèlent, plus dans la manière que dans
            l’anecdote, entre le vrai et le faux, entre fiction et documentaire.
            <br/>
            Bande annonce : <br/>
            <Link src={ externalLinks.films.jeunesses }>{ externalLinks.films.jeunesses }</Link>
        </div>,
        imgThumbnail: `${ filmsImgFolder }/jeunesses_francaises_de_stephan_castang`,
        publicationDate: "30"
    },
    {
        filmName: "K-nada",
        author: "Hubert Charuel",
        duration: "21min48s - Fiction",
        location: "France",
        date: "2014",
        description: <div>
            Deux frères que tout oppose, sont paumés sur la route de leurs rêves un peu absurdes.
            Dans deux jours, ils doivent se rendre à Amsterdam. Greg pour un concours de DJing,
            Valentin pour en ramener des kilos de marijuana.
        </div>,
        imgThumbnail: `${ filmsImgFolder }/k-nada_de_hubert_charuel`,
        publicationDate: "31"
    },
    {
        filmName: "Le repas dominical",
        author: "Cécile Devaux",
        duration: "13min58s - Cinéma d'animation",
        location: "France",
        date: "2015",
        description: <div>
            C’est dimanche. Au cours du repas, Jean observe les membres de sa famille. On lui pose
            des questions sans écouter les réponses, on lui donne des conseils sans les suivre,
            on le caresse et on le gifle, c’est normal, c’est le repas dominical.
            <br/>
            Bande annonce : <br/>
            <Link
                src={ externalLinks.films.repasDominical }>{ externalLinks.films.repasDominical }</Link>
        </div>,
        imgThumbnail: `${ filmsImgFolder }/le_repas_dominical_de_céline_devaux`,
        publicationDate: "31",
    },
    {
        filmName: "Les Bigorneaux",
        author: "Alice Vial",
        duration: "25min - Fiction",
        location: "France",
        date: "2017",
        description: <div>
            Zoé, trente ans, travaille au bar Les Bigorneaux avec son père, Guy. Tantôt serveuse,
            barman, patronne, elle s’épuise à tout prendre en charge, épaulant Guy depuis la mort
            prématurée de sa mère. Un matin, Zoé se met à souffrir de vertiges et de nausées qui
            perturbent son quotidien. Elle craint d’être tombée enceinte, mais sa gynéco lui
            apprend qu’elle souffre d’un tout autre mal.

            Bande annonce : <br/>
            <Link src={ externalLinks.films.bigorneaux }>{ externalLinks.films.bigorneaux }</Link>
        </div>,
        imgThumbnail: `${ filmsImgFolder }/les_bigorneaux_de_alice_vial`,
        publicationDate: "30"
    },
    {
        filmName: "Lila",
        author: "Broadcast Club",
        duration: "12min - Documentaire de création",
        location: "France ",
        date: "2009",
        description: <div>
            La chaleur d’une journée d’août, au Camping-club des Lilas, au pied de la Dune du Pilat.
            <br/>
            Bande annonce : <br/>
            <Link src={ externalLinks.films.lila }>{ externalLinks.films.lila }</Link>
        </div>,
        imgThumbnail: `${ filmsImgFolder }/lila_du_broadcast_club`,
        publicationDate: "31"
    },
    {
        filmName: "Nuisibles",
        author: "Juliette Laboria",
        duration: "6min30s - Cinéma d'animation",
        location: "France",
        date: "2020",
        description: <div>
            Sous la chaleur de l’été, les guêpes dévorent les fruits mûrs et sucrés. Mais les
            enfants veulent aussi s’approprier les précieuses richesses du jardin. Une guerre se
            prépare. Que le meilleur gagne.
            <br/>
            Bande annonce : <br/>
            <Link src={ externalLinks.films.nuisibles }>{ externalLinks.films.nuisibles }</Link>
        </div>,
        imgThumbnail: `${ filmsImgFolder }/nuisibles_de_juliette_laboria`,
        publicationDate: "31"
    },
    {
        filmName: "Enough",
        author: "Anna Mantzaris",
        duration: "2min22s - Cinéma d'animation",
        location: "Grande-Bretagne",
        date: "2017",
        description: <div>
            Il y a des moments où l’on perd tout contrôle de soi. On souhaite seulement hurler :
            “Assez !”.
        </div>,
        imgThumbnail: `${ filmsImgFolder }/enough_de_anna_mantzaris`,
        publicationDate: "30"
    },
    {
        filmName: "Sousaphone",
        author: "Flo Linus Baumann",
        duration: "13min34s - Fiction",
        location: "Suisse, Etats-Unis",
        date: "2019",
        description: <div>
            Quelques jours avant un concert important, un jeune retraité constate avec désarroi que
            son cher instrument de musique ne produit plus un son.
        </div>,
        imgThumbnail: `${ filmsImgFolder }/sousaphone_flo_linus_baumann`,
        publicationDate: "30"
    }
    /*,{
        filmName: "Four roads",
        author: "Alice Rohrwacher",
        duration: "45min",
        location: "France",
        date: "2018",
        description: <div>
            J’ai grandi à Argenteuil, en banlieue parisienne et je viens de terminer mon Master 2
            de Cinéma en réalisation à l’Université Paris 8 à Saint Denis. J’ai vingt trois ans.
            C’est ce film de fin d’études que je présente aujourd’hui en festival. Il a été
            finalisé sur une période de deux ans, sous la direction de Claire Simon.
        </div>,
        imgThumbnail: `${filmsImgFolder}/four_roads_alice_rohrwacher`,
        publicationDate: "30"
    }*/
]