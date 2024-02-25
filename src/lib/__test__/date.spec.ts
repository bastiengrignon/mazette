import { isBetweenDates } from '../date';

describe('Test isBetweenDates', () => {
  it('should return true when date is inside date range', () => {
    const START_DATE = '2022-07-26';
    const END_DATE = '2022-07-30';
    const DATE_BETWEEN = '2022-07-28';
    expect(isBetweenDates(START_DATE, END_DATE, DATE_BETWEEN)).toBeTruthy();
  });

  it('should return false when date is outside date range', () => {
    const START_DATE = '2022-07-26';
    const END_DATE = '2022-07-30';
    const DATE_NOT_BETWEEN = '2021-07-25';
    expect(isBetweenDates(START_DATE, END_DATE, DATE_NOT_BETWEEN)).toBeFalsy();
  });

  it('should return false when date is same but different year', () => {
    const DATE_TO_CHECK = new Date('2021-07-30');
    const DATE_START = new Date('2022-07-29');
    const DATE_END = new Date('2022-07-30');
    expect(isBetweenDates(DATE_START, DATE_END, DATE_TO_CHECK)).toBeFalsy();
  });
});
