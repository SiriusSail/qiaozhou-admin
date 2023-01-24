import request from '@/services/request';

export type ResType = {
  /**
   * 	头像地址
   */
  avatarurl: string;
  /**
   * 	城市
   */
  city: string;
  /**
   * 	国家
   */
  country: string;
  /**
   * 	创建人
   */
  createBy: string;
  /**
   * 	创建时间
   */
  createTime: string;
  /**
   * 	描述
   */
  description: string;
  /**
   * 	性别
   */
  gender: string;
  /**
   * 	id
   */
  id: string;
  /**
   * 	手机号
   */
  mobile: string;
  /**
   * 	用户昵称
   */
  nickname: string;
  /**
   * 	省份
   */
  province: string;
  /**
   * 	状态
   */
  status: string;
  /**
   * 	修改人
   */
  updateBy: string;
  /**
   * 	修改时间
   */
  updateTime: string;
};

type PageReq = {
  campusName?: string;
};
/**
 * 分页查询微信用户列表
 */
export const userPage = (data: API.RequestListReqType<PageReq>) =>
  request.post<API.RequestListResType<ResType>>('/backend/business/user/page', { data });

/**
 * 禁用
 */
export const userDisable = (roleId: string) =>
  request.get(`/backend/business/user/disable/${roleId}`);
/**
 * 启用
 */
export const userEnable = (roleId: string) =>
  request.get(`/backend/business/user/enable/${roleId}`);
