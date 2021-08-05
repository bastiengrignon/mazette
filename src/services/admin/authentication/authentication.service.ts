import axios, { AxiosResponse } from "axios"
import { authToken, Storage } from "../storage/storage.services"

export interface ISignInForm {
    username: string
    password: string
}

export class AuthenticationService {
    static logInAsync = async (signInForm: ISignInForm): Promise<AxiosResponse> => await axios.post("/auth", signInForm).then(r => r.data)

    static connectedUserCookie = (): boolean => Storage.get(authToken) === "true"
}
