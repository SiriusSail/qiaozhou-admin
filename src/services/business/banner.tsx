import request from '@/services/request';

export type CampusType = {
  /**
   * file
   */
  file: string;
  /**
   * 是否显示 1：显示 0：不显示
   */
  isShow: string;
  /**
   * 跳转链接
   */
  jumpLink: string;
  /**
   * 排序
   */
  sort: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 轮播图类型 1：首页轮播图 2：其他轮播图
   */
  type: string;
};

type CampusPageReq = {
  campusName?: string;
};
/**
 * 分页查询活动列表
 */
export const bannerPage = (data: API.RequestListReqType<CampusPageReq>) =>
  request.post<API.RequestListResType<CampusType>>('/backend/business/banner/page', { data });

/**
 * 添加校区
 */
export const addBanner = (data: CampusType) =>
  request.post<CampusType>(`/backend/business/banner/add`, { data });
/**
 * 删除banner
 */
export const deleteBanner = (bannerId: string) =>
  request.delete<CampusType>(`/backend/business/banner/delete/${bannerId}`);
