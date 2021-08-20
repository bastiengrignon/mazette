export const authToken = "authToken"

export class Storage {
    public static set = (key: string, value: string): void => {
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key)
        }
        localStorage.setItem(key, value)
    }

    public static get = (key: string): string => {
        return localStorage.getItem(key) || ""
    }

    public static delete = (key: string): void => {
        localStorage.removeItem(key)
    }
}