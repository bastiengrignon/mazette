import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CookieService, IText, TextService, TextType } from '../../../services';
import { FestivalService, IFestival } from '../../../services/admin/festival';
import { Dayjs } from 'dayjs';
import { SwitchChangeEventHandler } from 'antd/es/switch';

type NoUndefinedRangeValueType<DateType> = [DateType | null, DateType | null] | null;

interface IDashboardHooks {
  isTextLoading: boolean
  texts: IText[]
  infoText: IText
  festival: IFestival
  setNewTexts: Dispatch<SetStateAction<IText[]>>
  setTexts: Dispatch<SetStateAction<IText[]>>
  handleFestivalDate: (dates: NoUndefinedRangeValueType<Dayjs> | null, dateStrings: [string, string]) => void
  handleFestivalLatitude: (value: number | null) => void
  handleFestivalLongitude: (value: number | null) => void
  updateInformationsVisibility: SwitchChangeEventHandler
  toggleVisibility: (key: string) => (checked: boolean) => void
  toggleLoading: { [x: string]: boolean }
}

export const useDashboardHooks = (): IDashboardHooks => {
  const [isTextLoading, setIsTextLoading] = useState<boolean>(false);
  const [texts, setTexts] = useState<IText[]>([]);
  const [newTexts, setNewTexts] = useState<IText[]>(texts);
  const [infoText, setInfoText] = useState<IText>({} as IText);
  const [festival, setFestival] = useState<IFestival>({} as IFestival);
  const [toggleLoading, setToggleLoading] = useState<{ [x: string]: boolean }>({});

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

  return {
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
  };
};
