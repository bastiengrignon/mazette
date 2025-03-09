import dayjs from 'dayjs';
import loadable from '@loadable/component';
import React from 'react';

import { Card, DatePicker, InputNumber, Switch, Flex, } from 'antd';

import {
  DASHBOARD_PLACEHOLDER_LATITUDE,
  DASHBOARD_PLACEHOLDER_LONGITUDE,
  DASHBOARD_SHOW_HOME_INFORMATION,
  DASHBOARD_SHOW_MOVIES,
  DASHBOARD_SHOW_MUSICS,
  DASHBOARD_TITLE_DATE,
  DASHBOARD_TITLE_GPS_COORDS,
  DASHBOARD_TITLE_INFORMATION,
} from './Dashboard.constants';
import DashboardText from '../DashboardText';
import { useDashboardHooks } from './Dashboard.hooks';

const Navigation = loadable(() => import('../../../pages/admin/Navigation'));
const { RangePicker } = DatePicker;

const Dashboard: React.FC = () => {
  const {
    isTextLoading,
    texts,
    infoText,
    festival,
    setNewTexts,
    setTexts,
    handleFestivalDate,
    handleFestivalLatitude,
    handleFestivalLongitude,
    updateInformationsVisibility,
    toggleVisibility,
    toggleLoading,
  } = useDashboardHooks();
  return (
    <Navigation>
      <div className="grid grid-cols-12 gap-2 md:gap-5">
        <Card variant="borderless" className="rounded-lg col-span-12 lg:col-span-8">
          <DashboardText isLoading={isTextLoading} texts={texts} setTexts={setTexts} setNewTexts={setNewTexts}/>
        </Card>
        <Card variant="borderless" className="rounded-lg col-span-12 lg:col-span-4">
          <div className="space-y-4">
            <div className="text-3xl text-center">{DASHBOARD_TITLE_INFORMATION}</div>
            <Flex align="baseline" justify="space-between">
              <div>{DASHBOARD_TITLE_DATE}</div>
              {festival.startDate && festival.endDate && (
                <RangePicker
                  defaultValue={[dayjs(festival.startDate), dayjs(festival.endDate)]}
                  onChange={handleFestivalDate}
                  format="D MMM YYYY"
                />
              )}
            </Flex>
            <Flex align="baseline" justify="space-between">
              <div className="w-1/2">{DASHBOARD_TITLE_GPS_COORDS}</div>
              <Flex justify="flex-start" gap="small">
                {festival.location && (
                  <InputNumber
                    className="w-full"
                    placeholder={DASHBOARD_PLACEHOLDER_LATITUDE}
                    step="0.00000000001"
                    defaultValue={festival.location?.latitude}
                    onChange={handleFestivalLatitude}
                  />
                )}
                {festival.location && (
                  <InputNumber
                    className="w-full"
                    placeholder={DASHBOARD_PLACEHOLDER_LONGITUDE}
                    step="0.00000000001"
                    defaultValue={festival.location?.longitude}
                    onChange={handleFestivalLongitude}
                  />
                )}
              </Flex>
            </Flex>
            <Flex align="center" gap="small">
              <Switch disabled={!infoText?.id} onChange={updateInformationsVisibility} checked={infoText?.isShowed}/>
              <div>{DASHBOARD_SHOW_HOME_INFORMATION}</div>
            </Flex>
            <Flex align="center" gap="small">
              <Switch
                onChange={toggleVisibility('showMusic')}
                checked={festival.showMusic}
                loading={toggleLoading['showMusic']}
              />
              <div>{DASHBOARD_SHOW_MUSICS}</div>
            </Flex>
            <Flex align="center" gap="small">
              <Switch
                onChange={toggleVisibility('showMovie')}
                checked={festival.showMovie}
                loading={toggleLoading['showMovie']}
              />
              <div>{DASHBOARD_SHOW_MOVIES}</div>
            </Flex>
          </div>
        </Card>
      </div>
    </Navigation>
  );
};
export default Dashboard;
