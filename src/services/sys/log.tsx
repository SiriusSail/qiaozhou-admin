import request from '@/services/request';

export type ResType = {
  /**
   * 	id
   */
  id: string;
  /**
   * 	操作地址
   */
  ip: string;
  /**
   * 	日志类型
   */
  logType: string;
  /**
   * 	操作人员
   */
  operName: string;
  /**
   * 	操作时间
   */
  operTime: string;
  /**
   * 	请求方式
   */
  requestMethod: string;
  /**
   * 	操作状态（0正常 1异常）
   */
  status: 0 | 1;
  /**
   * 	标题
   */
  title: string;
  /**
   * 	请求url
   */
  url: string;
};

type PageReqType = {
  roleName: string;
  status: string;
};
/**
 * 分页查询角色
 */
export const logPage = (data: API.RequestListReqType<PageReqType>) =>
  request.post<API.RequestListResType<ResType>>('/backend/sys/log/page', { data });
