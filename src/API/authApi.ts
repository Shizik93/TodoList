import { instance } from './axios/axiosInstance';

export const authApi = {
  me: () => {
    return instance.get('/auth/me').then(res => res.data);
  },
  login: (email: string, password: string, rememberMe: boolean) => {
    return instance
      .post('/auth/login', { email, password, rememberMe })
      .then(res => res.data);
  },
  logout: () => {
    return instance.delete('/auth/login');
  },
};
