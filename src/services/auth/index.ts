import request from '@/services/request';

type LoginParams = {
  password?: string;
  username?: string;
};
export const login = (params: LoginParams) =>
  request.post<string>('/backend/sys/auth/login', { data: params });
