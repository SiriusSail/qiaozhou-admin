import request from '@/services/request';

export type ResType = {
  /**
   * 	校区
   */
  campusList: string;
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
   * 	会员结束时间
   */
  endTime: string;
  /**
   * 	id
   */
  id: string;
  /**
   * 	会员名称
   */
  menberName: string;
  /**
   * 	会员类型
   */
  menberType: number;
  /**
   * 	用户昵称
   */
  nickname: string;
  /**
   * 	会员开始时间
   */
  startTime: string;
  /**
   * 	修改人
   */
  updateBy: string;
  /**
   * 	修改时间
   */
  updateTime: string;
  /**
   * 	用户ID
   */
  userId: string;
};

type PageReq = {
  campusId?: string;
};
/**
 * 分页查询微信用户列表
 */
export const memberPage = (data: API.RequestListReqType<PageReq>) =>
  request.post<API.RequestListResType<ResType>>('/backend/business/member/page', { data });
