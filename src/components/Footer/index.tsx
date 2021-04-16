import React from "react"
import {FaFacebookF, FaInstagram} from "react-icons/fa"
import {associationTitle, RouterUrl} from "../../constants"

const links = {
    instagram: "https://www.instagram.com/festivalindigo/?hl=fr",
    facebook: "https://facebook.com/"
}

const Footer: React.FC = () => (
    <footer className="text-white bg-logo-blue text-center w-full p-2">
        <div className="flex justify-center text-3xl">
            <a href={links.instagram} target={"_blank"} rel={"noopener noreferrer"}>
                <FaInstagram className="mx-2 hover:text-logo-yellow"/>
            </a>
            <a href={links.facebook} target={"_blank"} rel={"noopener noreferrer"}>
                <FaFacebookF className="mx-2 hover:text-logo-yellow"/>
            </a>
        </div>
        <div className="uppercase">
            <a href={`${RouterUrl.association}#${associationTitle.sponsor}`}>
                Partenaires
            </a>
        </div>
        <div className="italic">Mentions Légales /// crédits</div>
    </footer>
)

export default Footer