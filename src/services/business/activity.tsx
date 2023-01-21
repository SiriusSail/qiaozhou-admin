import request from '@/services/request';

export type ActivityType = {
  /**
   * 活动内容
   */
  actContent: number;
  /**
   * 活动描述
   */
  actDescribe: number;
  /**
   * 活动结束时间
   */
  actEndTime: string;
  /**
   * 活动名称
   */
  actName: string;
  /**
   * 活动开始时间
   */
  actStartTime: string;
  /**
   * 活动状态
   */
  actStatus: string;
  /**
   * 创建人
   */
  createBy: string;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 描述
   */
  description: string;
  /**
   * id
   */
  id: string;
  /**
   * 红包最高金额
   */
  maxAmount: number;
  /**
   * 商户名称
   */
  merName: string;
  /**
   * 商户ID
   */
  merchantId: string;
  /**
   * 红包最低金额
   */
  minAmount: number;
  /**
   * 红包总量
   */
  total: number;
  /**
   * 修改人
   */
  updateBy: string;
  /**
   * 修改时间
   */
  updateTime: string;
  /**
   * 核销数量
   */
  useNum: number;
};

type RolePageReq = {
  roleName: string;
  status: string;
};
/**
 * 分页查询活动列表
 */
export const activityPage = (data: API.RequestListReqType<RolePageReq>) =>
  request.post<API.RequestListResType<ActivityType>>('/backend/business/activity/page', { data });
/**
 * 通过活动id查询活动详情
 */
export const getActivityById = (activityId: string) =>
  request.get<ActivityType>(`/backend/business/activity/getActivityById/${activityId}`);
