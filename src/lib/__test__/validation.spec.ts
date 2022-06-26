import { isEmailValid } from '../validation'

const VALID_EMAIL = 'test@gmail.com'
const INVALID_EMAIL = 'test.gmail.com'

describe('Test isEmailValid', () => {
    it('should return true for a valid email', () => {
        expect(isEmailValid(VALID_EMAIL)).toBe(true)
    })

    it('should return false for an invalid email', () => {
        expect(isEmailValid(INVALID_EMAIL)).toBe(false)
    })
})