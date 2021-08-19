import { AdvancedImage } from "@cloudinary/react"
import { Skeleton } from "antd"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ReactGA from "react-ga"

import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { externalLinks, RouterUrl } from "../../constants"
import ExternalLink from "../Link"
import { IPartner } from "../../services/admin/partner/partner.interface"
import { PartnerService } from "../../services/admin/partner/partner.service"
import { cloudinary } from "../../index"

const Footer: React.FC = () => {
    const [partners, setPartners] = useState<IPartner[]>([])
    const [isPartnerLoading, setIsPartnerLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsPartnerLoading(true)
        PartnerService.getAll()
            .then(partners => setPartners(partners))
            .finally(() => setIsPartnerLoading(false))
    }, [])
    
    const trackSocialMediaGA = (title: string): void =>
        ReactGA.event({
            category: "Social Media",
            action: `Go to ${ title }`
        })

    return (
        <footer className="text-black text-center w-full p-2 mt-10">
            <div className="bg-footer mx-auto w-11/12 rounded py-1 my-5"/>
            <div className="grid grid-cols-5 xl:grid-cols-6 grid-rows-4">
                <div
                    className="col-span-6 lg:col-span-5 row-span-5 text-left flex flex-row flex-wrap justify-evenly overflow-x-auto">
                    {
                        partners.map((partner, key) => (
                            <Skeleton key={ key } avatar={ true } active={ true } loading={ isPartnerLoading }>
                                <AdvancedImage cldImg={ cloudinary.image(partner.image) }
                                    alt={ partner.name } className="w-auto h-16  2xl:h-24 object-contain"/>
                            </Skeleton>
                        ))
                    }
                </div>
                <div
                    className="col-span-6 lg:col-span-1 row-span-4 flex justify-center lg:justify-evenly items-center text-5xl my-2 lg:my-0">
                    <ExternalLink src={ externalLinks.social.instagram } onClick={ () => trackSocialMediaGA("instagram")}>
                        <FaInstagram className="hover:text-green" title="Instagram logo"/>
                    </ExternalLink>
                    <ExternalLink src={ externalLinks.social.facebook } onClick={ () => trackSocialMediaGA("facebook")}>
                        <FaFacebookF className="hover:text-green" title="Facebook logo"/>
                    </ExternalLink>
                </div>
                <div className="col-span-6 row-span-1 italic mt-4">
                    <Link to={ RouterUrl.mention } className="link">Mentions Légales</Link> - Créé
                    par <ExternalLink src={ externalLinks.social.myLinkedin }>Bastien</ExternalLink>
                </div>
            </div>
        </footer>
    )
}

export default Footer