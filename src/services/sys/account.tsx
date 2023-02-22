import request from '@/services/request';

export type AccountType = {
  /**
   * 创建人
   */
  createBy?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 用户昵称
   */
  nickname?: string;
  /**
   * 角色信息
   */
  roles?: {
    name: string;
    id: string;
  }[];
  // /**
  //  * 角色名
  //  */
  // name?: {
  //   name: string;
  //   id: string;
  // };
  /**
   * 状态
   */
  status?: string;
  /**
   * 修改人
   */
  updateBy?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 用户名
   */
  username?: string;
};

type RolePageReq = {
  roleName: string;
  status: string;
};
export const accountPage = (data: API.RequestListReqType<RolePageReq>) =>
  request.post<API.RequestListResType<AccountType>>('/backend/sys/account/page', { data });
/**
 * 禁用
 */
export const accountDisable = (roleId: string) =>
  request.get(`/backend/sys/account/disable/${roleId}`);
/**
 * 启用
 */
export const accountEnable = (roleId: string) =>
  request.get(`/backend/sys/account/enable/${roleId}`);
/**
 * 新增
 */
export const accountAdd = (data: AccountType) => request.post(`/backend/sys/account/add`, { data });
/**
 * 修改
 */
export const accountUpdate = (data: AccountType) =>
  request.post(`/backend/sys/account/update`, { data });
/**
 * 重置密码
 */
export const resetPassword = (data: {
  accountId?: string;
  confirmPassword?: string;
  password?: string;
}) => request.post(`/backend/sys/account/resetPassword`, { data });
