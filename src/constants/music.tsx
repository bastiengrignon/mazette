import React, { ReactNode } from "react"
import { externalLinks, musicFolder } from "./index"
import Link from "../components/Link"

export interface MusicProps {
    groupName: string
    type: string
    description: string | ReactNode
    image: string
    publicationDate: string
}

export const musics: MusicProps[] = [
    {
        groupName: "Oulitsa",
        type: "Chants tsiganes et russes",
        description: <div>
            Oulitsa, ce n’est ni plus ni moins que trois musiciens qui vous feront voyager à travers
            un répertoire d’airs populaires des contrées d’Europe de l’Est. <br/>
            Pour les curieux c’est ici 👇🏼 <br/>
            <Link src={ externalLinks.music.oulitsa }>{ externalLinks.music.oulitsa }</Link>
        </div>,
        image: `${ musicFolder }/oulitsa`,
        publicationDate: "30"
    },
    {
        groupName: "Elayiis",
        type: "Rap soul et pop urbaine",
        description: <div>
            <Link src={externalLinks.music.elayiis_ig}>@elayiis</Link>  chanteuse, interprète et compositrice angevine nous rejoindra demain soir
            pour nous porter dans son univers entre rap, soul et pop urbaine. Toutes les chansons
            de son EP nommé Cumulus sont associées à une couleur différente, illustrant une émotion
            qu’un souvenir de sa vie sur Terre lui a fait ressentir.
            Laissez vous porter par sa voix douce et envoûtante… <br/>
            Pour les curieux 👉
            <Link src={ externalLinks.music.elayiis }/>
        </div>,
        image: `${ musicFolder }/elayiis`,
        publicationDate: "30"
    },
    {
        groupName: "Félix Hardouin Quartet",
        type: "Jazz",
        description: <div>
            Fondé autour des deux frères Félix Hardouin et Jean Hardouin (batterie), ce quartet
            intègre les excellents Levi Harvey (piano) et Alexis Denis Callier (contrebasse). <br/>
            Deux set de compositions énergiques et dynamiques, teintées de jazz et de musique latine
            !
        </div>,
        image: `${ musicFolder }/felix_hardouin_quartet`,
        publicationDate: "31"
    },
    {
        groupName: "Wugo",
        type: "Pop",
        description: <div>
            On ne peut pas faire plus local, artiste lyonnais qui a grandi juste à côté de
            Mazé-Milon, on est très contentes de pouvoir inviter Wugo, que nous suivons depuis
            de nombreuses années. <br/>Sa pop synthétique sillonne les parois du rêve et nous
            emmène dans les méandres de l’esprit du jeune artiste où tempêtes et rayons de soleil 
            font bon ménage. <br/>
            Pour découvrir sa musique c’est ici 👇🏼 <br/>
            <Link src={ externalLinks.music.wugo }>https://youtu.be/wc3LAkClt0k</Link>
        </div>,
        image: `${ musicFolder }/wugo`,
        publicationDate: "31"
    }
]