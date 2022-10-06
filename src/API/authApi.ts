import { instance } from './axios/axiosInstance';
import { ResponseType } from './todoApi';

export const authApi = {
  me: () => {
    return instance.get<ResponseType>('/auth/me');
  },
  login: (email: string, password: string, rememberMe: boolean) => {
    return instance.post<ResponseType>('/auth/login', { email, password, rememberMe });
  },
  logout: () => {
    return instance.delete<ResponseType>('/auth/login');
  },
};
