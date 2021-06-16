import React from "react"
import {FaFacebookF, FaInstagram} from "react-icons/fa"

const links = {
    instagram: "https://www.instagram.com/festivalindigo/?hl=fr",
    facebook: "https://facebook.com/"
}

const Footer: React.FC = () => (
    <footer className="text-white text-center w-full p-2" style={{backgroundColor: "#55505c"}}>
        <div className="flex justify-between">
            <div className="flex">
                logo des partenaires
            </div>
            <div className="flex justify-center text-3xl">
                <a href={links.instagram} target={"_blank"} rel={"noopener noreferrer"}>
                    <FaInstagram className="mx-2 hover:text-test-red"/>
                </a>
                <a href={links.facebook} target={"_blank"} rel={"noopener noreferrer"}>
                    <FaFacebookF className="mx-2 hover:text-test-red"/>
                </a>
            </div>
        </div>
        <div className="italic">Mentions Légales /// crédits</div>
    </footer>
)

export default Footer