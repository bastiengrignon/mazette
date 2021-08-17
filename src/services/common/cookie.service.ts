
export class CookieService {
    static cookieName = "allow-cookies"

    static cookieExists = (): boolean => CookieService.get(CookieService.cookieName) !== ""
    static isCookiesAllowed = (): boolean => {
        if (!CookieService.cookieExists()) return false
        return CookieService.get(CookieService.cookieName) === "true"
    }

    static get = (key: string): string => {
        const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"))
        if (match) return match[2]
        return ""
    }

    static set = (key: string, value: string): void => {
        if (CookieService.get(key)) CookieService.delete(key)

        document.cookie = `${ key }=${ value }; max-age=${ 60 * 60 * 24 * 30 }; path=/` // 30 days
    }

    static delete = (key: string): void => {
        document.cookie = `${ key }=; max-age=0;`
    }
}