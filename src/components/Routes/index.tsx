import React from 'react';
import loadable from '@loadable/component';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

import Home from '../../pages/Home';
import { adminSubdomain, RouterUrl } from '../../constants';
import { useGATracker } from '../../constants/hooks';

const Information = loadable(() => import('../../pages/Information'));
const Programmation = loadable(() => import('../../pages/Programmation'));
const Association = loadable(() => import('../../pages/Association'));
const LegalMention = loadable(() => import('../../pages/LegalMention'));
const SanitaryPass = loadable(() => import('../../pages/SanitaryPass'));
const Dashboard = loadable(() => import('../Admin/Dashboard'));
const VotePage = loadable(() => import('../../pages/Vote'));
const NotFound = loadable(() => import('../../pages/NotFound'));
const DashboardMovie = loadable(() => import('../Admin/DashboardMovie'));
const DashboardMusic = loadable(() => import('../Admin/DashboardMusic'));
const DashboardPartner = loadable(() => import('../Admin/DashboardPartner'));
const DashboardTrombinoscope = loadable(() => import('../Admin/DashboardTrombinoscope'));
const DashboardVote = loadable(() => import('../Admin/DashboardVote'));
const DashboardVoteStatistics = loadable(() => import('../Admin/DashboardVoteStatistics'));
const Footer = loadable(() => import('../../components/Footer'));
import Navbar from '../../components/Navbar';

const Routes: React.FC = () => {
  useGATracker();
  const isAdmin = window.location.host.split('.')[0] === adminSubdomain;

  return isAdmin ? (
    <RouterRoutes>
      <Route path={RouterUrl.adminMovie} element={<DashboardMovie />} />
      <Route path={RouterUrl.adminMusic} element={<DashboardMusic />} />
      <Route path={RouterUrl.adminPartner} element={<DashboardPartner />} />
      <Route path={RouterUrl.adminTrombinoscope} element={<DashboardTrombinoscope />} />
      <Route path={RouterUrl.adminVote} element={<DashboardVote />} />
      <Route path={RouterUrl.adminVoteStatistics} element={<DashboardVoteStatistics />} />

      <Route path={RouterUrl.home} element={<Dashboard />} />
    </RouterRoutes>
  ) : (
    <>
      <Navbar />
      <RouterRoutes>
        <Route path={RouterUrl.programmation} element={<Programmation />} />
        <Route path={RouterUrl.association} element={<Association />} />
        <Route path={RouterUrl.information} element={<Information />} />
        <Route path={RouterUrl.mention} element={<LegalMention />} />
        <Route path={RouterUrl.passSanitaire} element={<SanitaryPass />} />
        <Route path={RouterUrl.vote} element={<VotePage />} />

        <Route path={RouterUrl.home} element={<Home />} />
        <Route path={RouterUrl.notFound} element={<NotFound />} />
      </RouterRoutes>
      <Footer />
    </>
  );
};
export default Routes;
