import { adminSubdomain } from "../../constants"

export class CookieService {
    static cookieName = "allow-cookies"
    static authToken = "authToken"

    static isCookiesAllowed = (): boolean => {
        if (!CookieService.cookieExists()) return false
        return CookieService.get(CookieService.cookieName) === "true"
    }
    static cookieNeedsToBeDisplayed = (): boolean => {
        const isLocalhost = window.location.href.includes("localhost")
        const isAdminPanel = window.location.host.split(".")[0].includes(adminSubdomain)
        const isCookieExists = CookieService.cookieExists()
        return !isLocalhost && !isAdminPanel && !isCookieExists
    }

    static get = (key: string): string => {
        const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"))
        return match ? match[2] : ""
    }

    static set = (key: string, value: string, age = 60 * 60 * 24 * 30): void => {
        if (CookieService.get(key)) CookieService.delete(key)

        document.cookie = `${ key }=${ value }; max-age=${ age }; path=/` // default 30 days
    }

    static delete = (key: string): void => {
        document.cookie = `${ key }=; max-age=0;`
    }

    private static cookieExists = (): boolean => CookieService.get(CookieService.cookieName) !== ""
}