import axios, { AxiosResponse } from "axios"

export interface ISignInForm {
    username: string
    password: string
}

export class AuthenticationService {
    static logInAsync = async (signInForm: ISignInForm): Promise<AxiosResponse> => await axios.post("/auth", signInForm).then(r => r.data)
}
