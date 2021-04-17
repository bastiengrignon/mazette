import React from "react"
import {associationTitle, staticImgFolder} from "../../constants"

const Association: React.FC = () => (
    <div>
        <div className="text-black pl-0 lg:pl-24">
            <div
                className="text-left text-2xl sm:text-3xl md:text-5xl uppercase font-bold w-full xl:w-1/2 z-0  text-test-red"
                id={associationTitle.association}>
                {associationTitle.association} <span className="italic"> Mazette!</span>
            </div>
            <div className="flex flex-col xl:flex-row my-10 items-center">
                <img src={`${staticImgFolder}/logo_mazette.svg`}
                    alt="Association Mazette Image"
                    className="w-9/12 md:w-1/2 xl:w-1/3 h-full px-5 mx-auto"/>
                <p className="text-sm sm:text-2xl md:text-4xl mx-5 md:mx-10 mt-5 xl:mt-0">
                    Mazette!, c’est avant tout l’histoire d’une bande de copines qui, pour la
                    plupart, ont grandi ensemble sur le territoire Mazéiais. C’est aussi une
                    furieuse envie de rassembler nos forces et nos savoir-faire afin de développer
                    des événements culturels au cœur de ces lieux qui nous ont vu évoluer et de les
                    partager avec ses habitants. <br/><br/>
                    Porté en nous depuis longtemps et mûri aux fils de nos années d’amitié, ce désir
                    fort de projet collectif s’est concrétisé en septembre 2019, avec la création de
                    l’association Mazette! <br/><br/>
                    L’objectif, proposer des événements culturels en territoire rural.


                </p>
            </div>
            <div
                className="text-left text-2xl sm:text-3xl md:text-5xl uppercase font-bold w-full xl:w-1/2 z-0 text-test-red"
                id={associationTitle.equipe}>
                Mazette! C’est qui ?
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap my-10 items-center">
                <img src={`${staticImgFolder}/trombi_mathilde.png`} alt="Mathilde"
                    className="w-32 sm:w-48 h-full mx-10 my-5 sm:my-0"/>
                <img src={`${staticImgFolder}/trombi_lea.png`} alt="Léa"
                    className="w-32 sm:w-48 h-full mx-10 my-5 sm:my-0"/>
                <img src={`${staticImgFolder}/trombi_lisa.png`} alt="Lisa"
                    className="w-32 sm:w-48 h-full mx-10 my-5 sm:my-0"/>
                <img src={`${staticImgFolder}/trombi_marine.png`} alt="Marine"
                    className="w-32 sm:w-48 h-full mx-10 my-5 sm:my-0"/>
            </div>
            <div
                className="text-left text-2xl sm:text-3xl md:text-5xl uppercase font-bold w-full xl:w-1/2 z-0 text-test-red"
                id={associationTitle.adherer}>
                {associationTitle.adherer}
            </div>
            <div className="flex flex-col mt-10 items-start">
                <iframe id="haWidget" scrolling="auto"
                    src="https://www.helloasso.com/associations/mazette/adhesions/adhesion-association-mazette/widget"
                    className="w-full px-2 h-screen pr-0 md:pr-10"/>
            </div>

            <div
                className="text-left text-2xl sm:text-3xl md:text-5xl uppercase font-bold w-full xl:w-1/2 z-0 text-test-red"
                id={associationTitle.sponsor}>
                {associationTitle.sponsor}
            </div>
        </div>
    </div>
)

export default Association