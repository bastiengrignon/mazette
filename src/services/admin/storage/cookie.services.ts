export class Cookies {
    public static set = (key: string, value: string): void => {
        if (Cookies.get(key)) {
            Cookies.delete([key])
        }

        document.cookie = `${key}=${value}; expires=${Cookies.createExpirationDate().toUTCString()}; path=/`
    }

    public static get = (key: string): string => {
        const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"))
        if (match) return match[2]
        return ""
    }

    public static delete = (cookieNames: string[]): void => {
        if (!cookieNames.length) {
            return
        }

        const date = new Date()
        const negativeDayNumberToDeleteCookieNow = -1 * 24 * 60 * 60 * 1000
        date.setTime(date.getTime() + negativeDayNumberToDeleteCookieNow)

        cookieNames.map((name: string) => document.cookie = name+"=; expires="+date.toUTCString()+";")
    }

    private static createExpirationDate = (): Date => {
        const date = new Date()
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)) // 7 days
        return date
    }
}