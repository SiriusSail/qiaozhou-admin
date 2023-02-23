import request from '@/services/request';

export type ResType = {
  /**
   * 	所有金额
   */
  allAmount: number;
  /**
   * 	地区ID
   */
  campusId: string;
  /**
   * 	数据ID
   */
  id: string;
  /**
   * 	总金额
   */
  totalAmount: number;
};

type PageReq = {
  campusId?: string;
  endTime?: string;
  startTime?: string;
};
/**
 * 分页查询微信用户列表
 */
export const chargeStatisticsPage = (data: API.RequestListReqType<PageReq>) =>
  request.post<API.RequestListResType<ResType>>('/backend/business/chargeStatistics/page', {
    data,
  });
