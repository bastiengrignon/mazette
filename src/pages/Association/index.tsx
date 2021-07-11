import React from "react"
import { associationTitle, staticImgFolder } from "../../constants"
import { subtitleCSS, titleCSS } from "../Programmation"
import { trombinoscope } from "../../constants/trombinoscope"
import Image from "../../components/Image"
import Anchor from "../../components/Anchor"

const Association: React.FC = () => (
    <div>
        <div className="page-content">
            <Anchor id={ associationTitle.association } className={ titleCSS }>
                { associationTitle.association } <span className="italic"> Mazette!</span>
            </Anchor>
            <div className="flex flex-col sm:flex-row items-center md:grid grid-cols-3">
                <div className="w-1/2 sm:w-full h-auto float-left col-span-1">
                    <Image src={ `${ staticImgFolder }/logo_mazette` }
                        alt="Association Mazette Image"/>
                </div>
                <p className="text-sm sm:text-base md:text-2xl col-span-2">
                    Mazette!, c’est l’histoire d’une bande de copines qui, pour la plupart, ont
                    grandi ensemble sur le territoire Mazéiais. C’est une furieuse envie de
                    rassembler nos forces et nos savoir-faire afin de développer des événements
                    culturels au cœur de ces lieux qui nous ont vu évoluer et de les partager avec
                    ses habitants.
                    <br/><br/>
                    Porté en nous depuis longtemps et mûri aux fils de nos années d’amitié, ce désir
                    fort de projet collectif s’est concrétisé en novembre 2019, avec la création
                    de l’association Mazette! <br/><br/>
                </p>
            </div>
            <Anchor id={ associationTitle.equipe } className={ titleCSS }>
                Mazette! C’est qui ?
            </Anchor>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {
                    trombinoscope.map((trombi, id) => (
                        <Image key={ id } src={ trombi.src } alt={ trombi.alt }
                            className="w-36 sm:w-48 xl:w-60 h-auto mx-auto"/>
                    ))
                }
            </div>
            <Anchor id={ associationTitle.adherer } className={ titleCSS }/>
            <div className="flex flex-col items-start">
                <p className={ `${ subtitleCSS } my-0 sm:my-2` }>
                    Vous souhaitez rejoindre l’association ou l’aider à développer ses activités ?
                    Adhérez!
                </p>
                <iframe id="haWidget" scrolling="auto"
                    src="https://www.helloasso.com/associations/mazette/adhesions/adhesion-association-mazette/widget"
                    className="w-full px-2 h-screen pr-0 md:pr-10"/>
            </div>
        </div>
    </div>
)

export default Association