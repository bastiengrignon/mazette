import axios from "axios"
import { authToken, Storage } from "../storage/storage.services"

export interface ISignInForm {
    username: string
    password: string
}

interface IUser {
    id: number
    username: string
}

export class AuthenticationService {
    static logInAsync = async (signInForm: ISignInForm): Promise<IUser> => await axios.post("/auth", signInForm).then(r => r.data)

    static connectedUserCookie = (): boolean => Storage.get(authToken) === "true"
}
