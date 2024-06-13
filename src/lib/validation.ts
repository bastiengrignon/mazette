import { message } from 'antd';

const emailRegex = /^[a-zA-Z\d.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/;

export const isEmailValid = (email: string): boolean => emailRegex.test(email);

export const showErrorFormMessage = () => {
    message.warning('Vérifiez les données du formulaire');
};
