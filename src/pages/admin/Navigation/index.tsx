import {
  AppstoreOutlined,
  DashboardOutlined,
  FireFilled,
  LogoutOutlined,
  MenuOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  ShopOutlined,
  TeamOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

import { programmationTitle, RouterUrl } from '../../../constants';
import { useNavigationHook } from './useNavigation.hook';

const activatedClassCSS =
  'flex items-center py-2 px-6 bg-gray-200 bg-opacity-1 text-gray-700 hover:text-gray-900 rounded-l-full';
const deactivatedClassCSS =
  'flex items-center py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100';

const adminRoutes = [
  {
    name: 'Pages',
    link: RouterUrl.home,
    icon: <DashboardOutlined />,
  },
  {
    name: programmationTitle.films,
    link: RouterUrl.adminMovie,
    icon: <VideoCameraOutlined />,
  },
  {
    name: programmationTitle.musique,
    link: RouterUrl.adminMusic,
    icon: <PlayCircleOutlined />,
  },
  {
    name: 'Partenaires',
    link: RouterUrl.adminPartner,
    icon: <TeamOutlined />,
  },
  {
    name: 'Trombinoscope',
    link: RouterUrl.adminTrombinoscope,
    icon: <AppstoreOutlined />,
  },
  {
    name: 'Votes',
    link: RouterUrl.adminVote,
    icon: <QuestionCircleOutlined />,
  },
  {
    name: 'Magasin',
    link: RouterUrl.adminStore,
    icon: <ShopOutlined />,
  },
];

interface NavigationProps {
  children?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const { isModalVisible, confirmLoginLoading, loginForm, logout, handleLogin } = useNavigationHook();
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-1 sm:col-span-2 md:col-span-2 bg-gray-900">
        <div className="flex items-center justify-center mt-8">
          <Link to={RouterUrl.home} className="inline-flex justify-center items-center text-2xl mx-2">
            <MenuOutlined className="text-white flex md:hidden" />
            <FireFilled className="text-green hidden md:flex" />
            <span className="text-white ml-2 font-semibold hidden md:flex">Mazette! Dashboard</span>
          </Link>
        </div>
        <nav className="my-10 capitalize">
          <div className="mt-2.5 space-y-2.5">
            {adminRoutes.map((route, key) => (
              <Link
                key={key}
                to={route.link}
                className={
                  location.pathname === route.link ||
                  (route.link !== RouterUrl.home && location.pathname.startsWith(route.link))
                    ? activatedClassCSS
                    : deactivatedClassCSS
                }>
                {route.icon}
                <span className="mx-3 hidden md:flex">{route.name}</span>
              </Link>
            ))}
          </div>
          <Link to={RouterUrl.home} onClick={logout} className={`${deactivatedClassCSS} mt-24`}>
            <LogoutOutlined />
            <span className="mx-3 hidden md:flex">Déconnexion</span>
          </Link>
        </nav>
      </div>
      <div className="col-span-11 sm:col-span-10 md:col-span-10 bg-gray-200">
        <header className="flex justify-center text-xl py-1 bg-white border-b-4 border-green font-avenir capitalize">
          {adminRoutes.find(({ link }) => link === location.pathname)?.name ?? 'Dashboard'}
        </header>
        <main className="overflow-x-hidden overflow-y-auto px-4 mt-4">{!isModalVisible && children}</main>
      </div>
      <Modal
        title="Admin Login"
        open={isModalVisible}
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        confirmLoading={confirmLoginLoading}
        onOk={handleLogin}
        okText="Connexion"
        okButtonProps={{ className: 'bg-gray-700' }}>
        <Form name="login_form" form={loginForm} initialValues={{ remember: true }}>
          <Form.Item
            label="Nom d'utilisateur"
            name="username"
            rules={[
              {
                required: true,
                message: 'Veuillez entrer votre nom d’utilisateur!',
              },
            ]}>
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[
              {
                required: true,
                message: 'Veuillez entrer votre mot de passe !',
              },
            ]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Navigation;
