import { datesMatched, formatDate, getDatesBetween } from '../lib/date'

const DATE_RIGHT = new Date(2022, 2, 8)
const DATE_RIGHT_2 = DATE_RIGHT
const DATE_WRONG = new Date(2022, 2, 9)
const DATE_RIGHT_PLUS_3_DAYS = new Date(2022, 2, 11)

describe('Date match tests', () => {
    it('should match the two dates', () => {
        expect(datesMatched(DATE_RIGHT, DATE_RIGHT_2)).toBe(true)
    })

    it('should not match this two dates', () => {
        expect(datesMatched(DATE_RIGHT, DATE_WRONG)).toBe(false)
    })
})

describe('Date format tests', () => {
    it('should format the date right', () => {
        expect(formatDate(DATE_RIGHT)).toBe('mardi 8 mars')
    })

    it('should not format the date right', () => {
        expect(formatDate(DATE_WRONG)).toBe('mercredi 9 mars')
    })
})

describe('Dates between two dates tests', () => {
    it('should include all dates', () => {
        expect(getDatesBetween(DATE_RIGHT, DATE_RIGHT_PLUS_3_DAYS)).toEqual([
            new Date(2022, 2, 8),
            new Date(2022, 2, 9),
            new Date(2022, 2, 10),
        ])
    })

    it('should include all dates including last date', () => {
        expect(getDatesBetween(new Date(2022, 2, 8), new Date(2022, 2, 11), true)).toEqual([
            new Date(2022, 2, 8),
            new Date(2022, 2, 9),
            new Date(2022, 2, 10),
            new Date(2022, 2, 11),
        ])
    })
})