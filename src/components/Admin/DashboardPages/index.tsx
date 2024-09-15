import React from 'react';
import { Tabs, TabsProps } from 'antd';
import { ApartmentOutlined, AppstoreFilled, HomeFilled, InfoCircleFilled } from '@ant-design/icons';
import DashboardPageHome from './DashboardPageHome';
import DashboardPageAssociation from './DashboardPageAssociation';
import DashboardPageProgrammation from './DashboardPageProgrammation';
import DashboardPageInformation from './DashboardPageInformation';

const DashboardPages: React.FC = () => {
  const pages: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tout',
      icon: <HomeFilled />,
      children: <DashboardPageHome />
    },
    {
      key: '2',
      label: 'Association',
      icon: <ApartmentOutlined />,
      children: <DashboardPageAssociation />,
      disabled: true,
    },
    {
      key: '3',
      label: 'Programmation',
      icon: <AppstoreFilled />,
      children: <DashboardPageProgrammation />,
      disabled: true,
    },
    {
      key: '4',
      label: 'Information',
      icon: <InfoCircleFilled />,
      children: <DashboardPageInformation />,
      disabled: true,
    }
  ];
  return (<Tabs items={pages} />);
};

export default DashboardPages;
