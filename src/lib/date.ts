import isBetween from 'dayjs/plugin/isBetween';
import dayjs, { Dayjs } from 'dayjs';

dayjs.extend(isBetween);

type AcceptedDate = Dayjs | Date | string;

export const getDatesBetween = (startDate: Date, endDate: Date, includeEndDate?: boolean): Date[] => {
  let dates: Date[] = [];
  const currentDate = startDate;
  while (currentDate < endDate) {
    dates = [...dates, new Date(currentDate)];
    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (includeEndDate) dates = [...dates, endDate];
  return dates;
};

export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(date));

export const datesMatched = (date1: Date, date2: Date): boolean =>
  new Date(date1).toDateString() === new Date(date2).toDateString();

export const isBetweenDates = (dateStart: AcceptedDate, dateEnd: AcceptedDate, dateToCheck: AcceptedDate): boolean =>
  dayjs(dateToCheck).isBetween(dayjs(dateStart), dayjs(dateEnd), 'day', '[]');
