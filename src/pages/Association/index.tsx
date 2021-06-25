import React from "react"
import {associationTitle, staticImgFolder} from "../../constants"
import {subtitleCSS, titleCSS} from "../Programmation"
import {trombinoscope} from "../../constants/trombinoscope"

const Association: React.FC = () => (
    <div>
        <div className="page-content">
            <div id={associationTitle.association} className={titleCSS}>
                {associationTitle.association} <span className="italic"> Mazette!</span>
            </div>
            <div className="lg:flex flex-row">
                <img src={`${staticImgFolder}/logo_mazette.svg`} alt="Association Mazette Image"
                    className="w-1/3 md:w-1/3 xl:w-1/4 h-full float-left"/>
                <p className="text-sm sm:text-base md:text-2xl">
                    L’objectif, proposer des événements culturels en territoire rural.
                    Mazette!, c’est l’histoire d’une bande de copines qui, pour la plupart, ont grandi ensemble sur le
                    territoire Mazéiais. C’est une furieuse envie de rassembler nos forces et nos savoir-faire afin de
                    développer des événements culturels au cœur de ces lieux qui nous ont vu évoluer et de les partager
                    avec ses habitants.
                    <br/><br/>
                    Porté en nous depuis longtemps et mûri aux fils de nos années d’amitié, ce désir fort de projet
                    collectif s’est concrétisé en novembre 2019, avec la création de l’association Mazette! <br/><br/>
                </p>
            </div>
            <div id={associationTitle.equipe} className={titleCSS}>Mazette! C’est qui ?</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {
                    trombinoscope.map((trombi, id) => (
                        <img key={id} src={trombi.src} alt={trombi.alt} className="w-32 sm:w-48 h-full mx-auto"/>
                    ))
                }
            </div>
            <div id={associationTitle.adherer} className={titleCSS}>{associationTitle.adherer}</div>
            <div className="flex flex-col items-start">
                <p className={`${subtitleCSS} my-0 sm:my-2`}>
                    Vous souhaitez rejoindre l’association ou l’aider à développer ses activités ? Adhérez!
                </p>
                <iframe id="haWidget" scrolling="auto"
                    src="https://www.helloasso.com/associations/mazette/adhesions/adhesion-association-mazette/widget"
                    className="w-full px-2 h-screen pr-0 md:pr-10"/>
            </div>
        </div>
    </div>
)

export default Association