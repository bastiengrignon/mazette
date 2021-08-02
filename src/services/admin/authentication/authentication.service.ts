import axios, { AxiosResponse } from "axios"
import { tokenKey } from "./authentication.constants"
import { Cookies } from "../storage/cookie.services"

export interface ISignInForm {
    username: string
    password: string
}

export class AuthenticationService {
    static logInAsync = async (signInForm: ISignInForm): Promise<AxiosResponse> => {
        const authResponse = await axios.post("/auth", signInForm)
        const token = authResponse.data
        Cookies.set(tokenKey, token)
        axios.defaults.headers = { Cookies: `${tokenKey}=${Cookies.get(tokenKey)}` }

        console.log(authResponse)

        return authResponse
    }
}
