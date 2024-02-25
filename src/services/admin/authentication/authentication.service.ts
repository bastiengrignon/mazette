import { CookieService } from '../../common';
import axiosInstance from '../../axios';

export interface ISignInForm {
  username: string;
  password: string;
}

interface IUser {
  id: number;
  username: string;
}

export class AuthenticationService {
  static logInAsync = async (signInForm: ISignInForm): Promise<ISignInForm | IUser> =>
    await axiosInstance.post('/auth', signInForm).then((r) => r.data);

  static connectedUserCookie = (): boolean => CookieService.get(CookieService.authToken) === 'true';

  static logout = (): void => CookieService.delete(CookieService.authToken);
}
