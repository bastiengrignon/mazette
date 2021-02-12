import React from "react"
import Navbar from "../../components/Navbar"
import {DropdownMenuAssociation} from "../../constants"

const Association: React.FC = () => (
    <div>
        <Navbar/>
        <div className="text-my-indigo mt-10 sm:pl-24">
            <div
                className="text-left text-2xl sm:text-3xl md:text-5xl uppercase font-bold w-full xl:w-1/2 z-0"
                id={DropdownMenuAssociation.association}>
                {DropdownMenuAssociation.association} <span className="italic"> Mazette!</span>
            </div>
            <div className="flex flex-col lg:flex-row my-10">
                <img src={`${process.env.PUBLIC_URL}/img/mazette_association.png`}
                    alt="Association Mazette Image"
                    className="w-10/12 md:w-9/12 lg:w-1/4 h-auto px-5 mx-auto"/>
                <p className="text-sm sm:text-2xl mx-5 md:mx-10 mt-5 lg:mt-0">
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
                className="text-left text-2xl sm:text-3xl md:text-5xl uppercase font-bold w-full xl:w-1/2 z-0"
                id={DropdownMenuAssociation.equipe}>
                Mazette! C’est qui ?
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap my-10 items-center">
                <img src={`${process.env.PUBLIC_URL}/img/mathilde_trombinoscope.png`}
                    alt="Mathilde" className="w-32 sm:w-48 h-full mx-10 my-5 sm:my-0"/>
                <img src={`${process.env.PUBLIC_URL}/img/lea_trombinoscope.png`} alt="Léa"
                    className="w-32 sm:w-48 h-full mx-10 my-5 sm:my-0"/>
                <img src={`${process.env.PUBLIC_URL}/img/lisa_trombinoscope.png`} alt="Lisa"
                    className="w-32 sm:w-48 h-full mx-10 my-5 sm:my-0"/>
                <img src={`${process.env.PUBLIC_URL}/img/marine_trombinoscope.png`} alt="Marine"
                    className="w-32 sm:w-48 h-full mx-10 my-5 sm:my-0"/>
            </div>
            <div
                className="text-left text-2xl sm:text-3xl md:text-5xl uppercase font-bold w-full xl:w-1/2 z-0"
                id={DropdownMenuAssociation.adherer}>
                {DropdownMenuAssociation.adherer}
            </div>
            <div className="flex flex-col my-10 items-start">
                <iframe id="haWidget" allowTransparency={true}
                    src="https://www.helloasso.com/associations/mazette/adhesions/adhesion-association-mazette/widget-bouton"/>
                <div>
                    Propulsé par <a href="https://www.helloasso.com"
                        className="hover:font-semibold hover:underline"
                        target={"_blank"} rel={"noopener noreferrer nofollow"}>HelloAsso</a>
                </div>
            </div>
        </div>
    </div>
)

export default Association