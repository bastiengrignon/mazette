import React from "react"
import { Link } from "react-router-dom"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { partners } from "../../constants/partners"
import { externalLinks, RouterUrl } from "../../constants"
import ExternalLink from "../Link"
import Image from "../Image"

const Footer: React.FC = () => (
    <footer className="text-black text-center w-full p-2 mt-10">
        <div className="bg-footer mx-auto w-11/12 rounded py-1 my-5"/>
        <div className="grid grid-cols-5 xl:grid-cols-6 grid-rows-4">
            <div className="col-span-6 lg:col-span-5 row-span-5 text-left flex flex-row flex-wrap justify-evenly overflow-x-auto">
                {
                    partners.map((partner, key) => (
                        <Image key={key} src={partner.src} alt={partner.alt} className="w-auto h-16  2xl:h-24 object-contain" isPng={true}/>
                    ))
                }
            </div>
            <div className="col-span-6 lg:col-span-1 row-span-4 flex justify-center lg:justify-evenly items-center text-5xl my-2 lg:my-0">
                <ExternalLink src={externalLinks.social.instagram}>
                    <FaInstagram className="hover:text-test-green" title="Instagram logo"/>
                </ExternalLink>
                <ExternalLink src={externalLinks.social.facebook}>
                    <FaFacebookF className="hover:text-test-green"  title="Facebook logo"/>
                </ExternalLink>
            </div>
            <div className="col-span-6 row-span-1 italic mt-4">
                <Link to={ RouterUrl.mention}>Mentions Légales</Link> - Créé par <ExternalLink src={externalLinks.social.myLinkedin}>Bastien</ExternalLink>
            </div>
        </div>
    </footer>
)

export default Footer