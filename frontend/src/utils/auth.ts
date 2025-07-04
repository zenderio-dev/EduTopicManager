
import Cookies from 'js-cookie';

export const setAuthToken = (token: string) => {
  console.log(token)
  Cookies.set('token', token, {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
};

export const removeAuthToken = () => {
  Cookies.remove('token');
};