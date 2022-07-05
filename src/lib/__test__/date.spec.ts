import { isBetweenDates } from '../date'

const START_DATE = new Date('2022-07-26')
const END_DATE = new Date('2022-07-30')
const DATE_BETWEEN = new Date('2022-07-28')
const DATE_NOT_BETWEEN = new Date('2022-07-25')

describe('Test isBetweenDates', () => {
    it('should return true when date is inside date range', () => {
        expect(isBetweenDates(START_DATE, END_DATE, DATE_BETWEEN)).toBeTruthy()
    })

    it('should return false when date is outside date range', () => {
        expect(isBetweenDates(START_DATE, END_DATE, DATE_NOT_BETWEEN)).toBeFalsy()
    })
})