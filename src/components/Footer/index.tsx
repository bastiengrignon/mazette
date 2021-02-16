import React from "react"
import {FaFacebookF, FaInstagram} from "react-icons/fa"

const links = {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/"
}

const Footer: React.FC = () => (
    <footer className="flex-shrink-0 text-white bg-blue-800 text-center mt-2 p-2">
        <div className="flex justify-center text-3xl">
            <a href={links.instagram} target={"_blank"} rel={"noopener noreferrer"}>
                <FaInstagram className="mx-2"/>
            </a>
            <a href={links.facebook} target={"_blank"} rel={"noopener noreferrer"}>
                <FaFacebookF className="mx-2"/>
            </a>
        </div>
        <div className="uppercase">Partenaires</div>
        <div className="italic">Mentions Légales /// crédits</div>
    </footer>
)

export default Footer