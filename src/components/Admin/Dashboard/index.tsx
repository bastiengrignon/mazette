import dayjs, { Dayjs } from 'dayjs';
import loadable from '@loadable/component';
import React, { useEffect, useState } from 'react';

import {
  Card,
  DatePicker,
  InputNumber,
  Switch,
  Flex,
} from 'antd';

import { CookieService, IText, TextService, TextType } from '../../../services';
import { FestivalService, IFestival } from '../../../services/admin/festival';

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
import DashboardPages from '../DashboardPages';

const Navigation = loadable(() => import('../../../pages/admin/Navigation'));
const { RangePicker } = DatePicker;

type NoUndefinedRangeValueType<DateType> = [DateType | null, DateType | null] | null;

const Dashboard: React.FC = () => {
  const [isTextLoading, setIsTextLoading] = useState<boolean>(false);
  const [texts, setTexts] = useState<IText[]>([]);
  const [newTexts, setNewTexts] = useState<IText[]>(texts);
  const [infoText, setInfoText] = useState<IText>({} as IText);
  const [festival, setFestival] = useState<IFestival>({} as IFestival);
  const [toggleLoading, setToggleLoading] = useState<{ [x: string]: boolean }>({});

  useEffect(() => {
    setIsTextLoading(true);
    TextService.getAll()
      .then(setTexts)
      .finally(() => setIsTextLoading(false));
    TextService.getByTextType(TextType.info).then(setInfoText);
    FestivalService.getLastFestival().then((festival) => {
      CookieService.set(CookieService.festivalId, festival.id);
      setFestival(festival);
    });
  }, [newTexts]);

  const updateInformationsVisibility = (checked: boolean): void => {
    if (infoText) {
      TextService.update(infoText.id, {
        ...infoText,
        isShowed: checked,
      }).then((res) =>
        setInfoText({
          ...infoText,
          ...res,
        })
      );
    }
  };

  const handleFestivalDate = (dates: NoUndefinedRangeValueType<Dayjs>): void => {
    if (dates) {
      if (dates[0] && dates[1]) {
        FestivalService.update(festival.id, {
          ...festival,
          startDate: dates[0].toDate(),
          endDate: dates[1].toDate(),
        }).then((res) =>
          setFestival({
            ...festival,
            ...res,
          })
        );
      }
    }
  };

  const handleFestivalLatitude = (newLatitude: number | null): void => {
    FestivalService.update(festival.id, {
      ...festival,
      location: { ...festival.location, latitude: newLatitude || 0 },
    }).then((res) =>
      setFestival({
        ...festival,
        ...res,
      })
    );
  };

  const handleFestivalLongitude = (newLongitude: number | null): void => {
    FestivalService.update(festival.id, {
      ...festival,
      location: { ...festival.location, longitude: newLongitude || 0 },
    }).then((res) =>
      setFestival({
        ...festival,
        ...res,
      })
    );
  };

  const toggleVisibility =
    (key: string) =>
    (checked: boolean): void => {
      setToggleLoading({ [key]: true });
      FestivalService.update(festival.id, {
        ...festival,
        [key]: checked,
      })
        .then((res) => setFestival({ ...festival, ...res }))
        .finally(() => setToggleLoading({ [key]: false }));
    };

  return (
    <Navigation>
      <div className="grid grid-cols-12 gap-2 md:gap-5">
        <Card bordered={false} className="rounded-lg col-span-12 lg:col-span-8">
          <DashboardPages />
          {/*<DashboardText isLoading={isTextLoading} texts={texts} setTexts={setTexts} setNewTexts={setNewTexts} />*/}
        </Card>
        <Card bordered={false} className="rounded-lg col-span-12 lg:col-span-4">
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
              <Switch disabled={!infoText?.id} onChange={updateInformationsVisibility} checked={infoText?.isShowed} />
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
