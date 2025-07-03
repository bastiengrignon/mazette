import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

import { AdvancedImage, lazyload } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

import ExternalLink from '../Link';
import { cloudinary } from '../../index';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { IPartner, PartnerService } from '../../services';
import { RouterUrl, externalLinks } from '../../constants';
import { ALT_TEXT_SOCIAL_MEDIAS, CREATED_BY, LEGAL_MENTION, WEBSITE_AUTHOR } from './Footer.constants';

const Footer: React.FC = () => {
  const [partners, setPartners] = useState<IPartner[]>([]);
  const [isPartnerLoading, setIsPartnerLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsPartnerLoading(true);
    PartnerService.getAll()
      .then(setPartners)
      .finally(() => setIsPartnerLoading(false));
  }, []);

  const trackSocialMediaGA = (title: string): void =>
    ReactGA.event({
      category: 'Social Media',
      action: `Go to ${title}`,
    });

  return (
    <footer className="text-black text-center w-full p-2 mt-10">
      <div className="bg-footer mx-auto w-11/12 rounded py-1 my-5" />
      <div className="flex justify-center flex-wrap gap-2">
        {partners.map((partner, key) => (
          <Skeleton key={key} avatar={true} active={true} loading={isPartnerLoading}>
            {(partner.link || '').trim() === '' ? (
              <AdvancedImage
                plugins={[lazyload({ threshold: 0.5 })]}
                cldImg={cloudinary.image(partner.image)}
                alt={partner.name}
                className="w-36 h-16 2xl:h-24 object-contain"
              />
            ) : (
              <ExternalLink src={partner.link || ''}>
                <AdvancedImage
                  plugins={[lazyload({ threshold: 0.5 })]}
                  cldImg={cloudinary.image(partner.image)}
                  alt={partner.name}
                  className="w-36 h-16 2xl:h-24 object-contain"
                />
              </ExternalLink>
            )}
          </Skeleton>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="flex justify-center lg:justify-evenly items-center text-5xl gap-2">
          <ExternalLink src={externalLinks.social.instagram} onClick={() => trackSocialMediaGA('instagram')}>
            <FaInstagram className="text-green hover:text-green/50" title={ALT_TEXT_SOCIAL_MEDIAS.instagram} />
          </ExternalLink>
          <ExternalLink src={externalLinks.social.facebook} onClick={() => trackSocialMediaGA('facebook')}>
            <FaFacebookF className="text-green hover:text-green/50" title={ALT_TEXT_SOCIAL_MEDIAS.facebook} />
          </ExternalLink>
        </div>
        <div>
          <Link to={RouterUrl.mention} className="link">
            {LEGAL_MENTION}
          </Link>
          <div>
            {CREATED_BY}
            <ExternalLink src={externalLinks.social.myLinkedin}>{WEBSITE_AUTHOR}</ExternalLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
