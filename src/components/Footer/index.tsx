import React from "react"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { partners } from "../../constants/partners"
import { externalLinks } from "../../constants"
import Link from "../Link"


const Footer: React.FC = () => (
    <footer className="text-white text-center w-full p-2 mt-10 bg-footer-gray">
        <div className="grid grid-cols-5 xl:grid-cols-6 grid-rows-4">
            <div className="col-span-6 lg:col-span-5 row-span-5 text-left flex flex-row flex-wrap justify-evenly overflow-x-auto">
                {
                    partners.map((partner, key) => (
                        <img key={key} src={partner.src} alt={partner.alt} className="w-auto h-16  2xl:h-24 object-contain"/>
                    ))
                }
            </div>
            <div className="col-span-6 lg:col-span-1 row-span-4 flex justify-center lg:justify-evenly items-center text-5xl my-2 lg:my-0">
                <Link src={externalLinks.social.instagram}>
                    <FaInstagram className="hover:text-test-green"/>
                </Link>
                <Link src={externalLinks.social.facebook}>
                    <FaFacebookF className="hover:text-test-green"/>
                </Link>
            </div>
            <div className="col-span-6 row-span-1 italic mt-4">
                Mentions Légales /// Créé par <Link src={externalLinks.social.myLinkedin}>Bastien</Link>
            </div>
        </div>
    </footer>
)

export default Footer