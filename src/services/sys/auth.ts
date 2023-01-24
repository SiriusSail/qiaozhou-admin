import request from '@/services/request';

type LoginParams = {
  password?: string;
  username?: string;
};
export const login = (params: LoginParams) =>
  request.post<string>('/backend/sys/auth/login', { data: params });

export const getUserInfo = () => request.get<API.UserInfo>('/backend/sys/auth/info');

export const logout = () => request.get('/backend/sys/auth/logout');
