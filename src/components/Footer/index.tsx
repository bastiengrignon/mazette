import React from "react"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { partners } from "../../constants/partners"
import { externalLinks } from "../../constants"


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
                <a href={externalLinks.social.instagram} target={"_blank"} rel={"noopener noreferrer"}>
                    <FaInstagram className="hover:text-test-green"/>
                </a>
                <a href={externalLinks.social.facebook} target={"_blank"} rel={"noopener noreferrer"}>
                    <FaFacebookF className="hover:text-test-green"/>
                </a>
            </div>
            <div className="col-span-6 row-span-1 italic mt-4">
                Mentions Légales /// Créé par <a href={externalLinks.social.myLinkedin} target={"_blank"} rel={"noopener noreferrer"} className="link">Bastien</a>
            </div>
        </div>
    </footer>
)

export default Footer