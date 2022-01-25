import axios from 'axios'

import { CookieService } from '../../common'

export interface ISignInForm {
    username: string
    password: string
}

interface IUser {
    id: number
    username: string
}

export class AuthenticationService {
    static logInAsync = async (signInForm: ISignInForm): Promise<ISignInForm | IUser> => await axios.post('/auth', signInForm).then(r => r.data)

    static connectedUserCookie = (): boolean => CookieService.get(CookieService.authToken) === 'true'

    static logout = (): void => CookieService.delete(CookieService.authToken)
}
