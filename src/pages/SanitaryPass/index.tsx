import React from 'react';
import loadable from '@loadable/component';

import { BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { RouterUrl, staticImgFolder } from '../../constants';

const ExternalLink = loadable(() => import('../../components/Link'));

const titleCSS = 'font-avenirBL text-2xl sm:text-4xl mt-5';
const testTypeCSS = 'text-green my-8';
const listTestCSS = 'font-avenirBL mt-5';

const SanitaryPass: React.FC = () => (
  <div className="p-2">
    <Link to={RouterUrl.home} className="inline-flex items-center animate-bounce">
      <BiChevronLeft /> Retour
    </Link>
    <div className="grid grid-cols-6">
      <div className="col-span-6 sm:col-span-3 text-center">
        <p className={titleCSS}>⚠ Infos pass sanitaire ⚠</p>
        <p>(nécessaire pour les +18 ans)</p>
        <div className="flex items-center justify-center ">
          <img
            src={`${staticImgFolder}/pass_sanitaire.png`}
            alt="Pass sanitaire"
            className="w-full sm:w-2/3 lg:w-1/3 h-auto"
          />
        </div>
      </div>
      <div className="col-span-6 sm:col-span-3">
        <div>
          <div className={titleCSS}>Attestation de vaccination</div>
          <div>
            L’attestation de vaccination est valide : <br />
            &nbsp;&nbsp; - 1 semaine après la 2e injection pour les vaccins à double injection (Pfizer, Moderna,
            AstraZeneca). <br />
            &nbsp;&nbsp; - 4 semaines après l’injection pour les vaccins à une seule injection (Janssen/Johnson &
            Johnson). <br />
            &nbsp;&nbsp; - 1 semaine après l’injection du vaccin chez les personnes ayant eu le Covid (1 seule
            injection). <br />
          </div>
        </div>
        <div>
          <div className={titleCSS}>Attestation de rétablissement du Covid-19</div>
          <div>
            Il s’agit du résultat d’un test RT-PCR positif attestant du rétablissement du Covid, datant d’au moins 11
            jours et de moins de 6 mois.
          </div>
        </div>
      </div>
    </div>
    <div className={titleCSS}>Où se faire tester près de Mazé-Milon ?</div>
    <div className={testTypeCSS}>
      TESTS PCR <br />
      → Sur rendez-vous, résultat sous 24h à 36h <br />
      → Gratuit avec la carte vitale <br />
      → Valable 48h <br />
    </div>
    <div>
      Laboratoire BIOLARIS <br />
      ZAC DE LA POISSONNIÈRE <br />
      49250 BEAUFORT EN ANJOU <br />
      02 41 57 40 22 <br />
      Lundi au Vendredi 07h30 - 12h30 / 14h - 18h <br />
      Samedi : 07h30 - 12h <br />
    </div>
    <div className={listTestCSS}>
      Liste des centres de dépistage Maine-et-Loire : <br />
    </div>
    <ExternalLink src="https://www.cascoronavirus.fr/centre-laboratoire-test-depistage/ville/maze-milon/49140?fbclid=IwAR3_fomhPHjT94xXpnqdo-rMSPh4rNefX0FfDbf8y_eFjUT85-1ILZ1uP28">
      https://www.cascoronavirus.fr/centre-laboratoire-test-depistage/ville/maze-milon/
    </ExternalLink>

    <div className={testTypeCSS}>
      TESTS ANTIGÉNIQUES <br />
      → Sur rendez-vous, résultat sous 24h à 36h <br />
      → Gratuit avec la carte vitale <br />
      → Valable 48h <br />
    </div>

    <div className={listTestCSS}>
      Liste des centres de dépistage Maine-et-Loire : <br />
    </div>
    <ExternalLink src="https://www.sante.fr/cf/centres-depistage-covid/departement-49-maine-et-loire.html" />

    <div className="mt-5">
      Pharmacie Petit-Robbe <br />
      7 Levée du Roi René <br />
      ST MATHURIN SUR LOIRE <br />
      49250 LOIRE-AUTHION <br />
      <a href="tel:0241570068" className="link">
        02 41 57 00 68
      </a>{' '}
      <br />
      <br />
      Pharmacie Bossard <br />
      1 Rue Victor Hugo <br />
      49150 BAUGE-EN-ANJOU <br />
      <a href="tel:0241891217" className="link">
        02 41 89 12 17
      </a>{' '}
      <br />
      <br />
      Pharmacie Breteau - Couffon <br />
      5 Rue DU MARCHE & 63 PLACE DU MARCHE <br />
      49150 BAUGE-EN-ANJOU <br />
      <a href="tel:0241898107" className="link">
        02 41 89 81 07
      </a>{' '}
      <br />
      <br />
      Augereau Valerie - Infirmier <br />
      17 Rue de l’Ancienne Mairie <br />
      49350 GENNES-VAL-DE-LOIRE <br />
      <a href="tel:0241502801" className="link">
        02 41 50 28 01
      </a>{' '}
      <br />
      <br />
      Filmon Beatrice - Infirmier <br />
      17 Rue de l’Ancienne Mairie <br />
      49350 GENNES-VAL-DE-LOIRE <br />
      <a href="tel:0241506510" className="link">
        02 41 50 65 10
      </a>{' '}
      <br />
      <br />
      Moise Marjolaine - Infirmier <br />
      18 Rue des Fontaines <br />
      49350 GENNES-VAL-DE-LOIRE <br />
      <br />
      Patrice Audrey - Infirmier <br />
      17 Rue de l’Ancienne Mairie <br />
      49350 GENNES-VAL-DE-LOIRE <br />
      <a href="tel:0241506510" className="link">
        02 41 50 65 10
      </a>{' '}
      <br />
      <br />
      Pharmacie Giffard - Abellard <br />
      5 Rue de la Poste GENNES <br />
      49350 GENNES-VAL-DE-LOIRE <br />
      <a href="tel:0241518137" className="link">
        02 41 51 81 37
      </a>{' '}
      <br />
      <br />
      Rahon Clementine - Infirmier <br />
      17 Rue de l’Ancienne Mairie <br />
      49350 GENNES-VAL-DE-LOIRE <br />
      <a href="tel:0610226757" className="link">
        06 10 22 67 57
      </a>{' '}
      <br />
      <br />
      Canevet Severine - Infirmier <br />
      1 Rue de la Mairie <br />
      49160 LONGUE-JUMELLES <br />
      <a href="tel:0241512636" className="link">
        02 41 51 26 36
      </a>{' '}
      <br />
      <br />
      Dubois Mathilde - Infirmier <br />
      1 Rue de la Mairie <br />
      49160 LONGUE-JUMELLES <br />
      <a href="tel:0241512636" className="link">
        02 41 51 26 36
      </a>{' '}
      <br />
      <br />
      Poiroux Aude Marie - Infirmier <br />
      1 Rue de la Mairie <br />
      49160 LONGUE-JUMELLES <br />
    </div>
  </div>
);
export default SanitaryPass;
