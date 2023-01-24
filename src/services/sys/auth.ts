import request from '@/services/request';

type LoginParams = {
  password?: string;
  username?: string;
};
export const login = (params: LoginParams) =>
  request.post<string>('/backend/sys/auth/login', { data: params });

export type UserType = {
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 用户名
   */
  username: string;
};

export const getUserInfo = () => request.get<UserType>('/backend/sys/auth/info');
export const logout = () => request.get<UserType>('/backend/sys/auth/logout');
