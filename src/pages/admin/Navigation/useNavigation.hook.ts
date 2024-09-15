import { useState } from 'react';
import { AuthenticationService, CookieService } from '../../../services';
import { Form, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouterUrl } from '../../../constants';
import { AxiosError } from 'axios';

export const useNavigationHook = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(!AuthenticationService.connectedUserCookie());
  const [confirmLoginLoading, setConfirmLoginLoading] = useState<boolean>(false);
  const [loginForm] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    AuthenticationService.logout();
    navigate(RouterUrl.home);
    if (location.pathname === RouterUrl.home) navigate(0);
  };

  const handleLogin = () => {
    setConfirmLoginLoading(true);
    loginForm
      .validateFields()
      .then((values) => {
        AuthenticationService.logInAsync(values)
          .then((result) => {
            setConfirmLoginLoading(false);
            setIsModalVisible(false);
            CookieService.set(CookieService.authToken, 'true', 60 * 60 * 2); // 2 hours
            message.success(`${result.username} connecté`);
          })
          .catch(async (error: AxiosError) => {
            await message.error(error.response?.data as string);
            setConfirmLoginLoading(false);
            CookieService.set(CookieService.authToken, 'false');
          })
          .finally(() => loginForm.resetFields());
      })
      .catch((info) => message.warning('Validation failed: ', info));
  };

  return {
    isModalVisible,
    confirmLoginLoading,
    loginForm,
    logout,
    handleLogin
  };
};
