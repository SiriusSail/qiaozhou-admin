import request from '@/services/request';
import type { UploadFile } from 'antd';

export type ResType = {
  id: string;
  /**
   * 是否显示 1：显示 0：不显示
   */
  isShow: string;
  /**
   * 跳转链接
   */
  jumpLink: string;
  /**
   * 轮播图url
   */
  url: string;
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

export type ReqType = {
  /**
   * file
   */
  file: UploadFile[];
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
/**
 * 分页查询活动列表
 */
export const bannerPage = (data: API.RequestListReqType) =>
  request.post<API.RequestListResType<ResType>>('/backend/business/banner/page', { data });

/**
 * 添加banner
 */
export const addBanner = ({ file, ...value }: ReqType) => {
  console.log(value, 3333);
  const formData = new FormData();
  Object.entries(value)
    .filter(([, item]) => !!item)
    .forEach(([key, item]) => {
      formData.append(key, item);
    });
  formData.append('file', file[0].originFileObj!);
  console.log(formData);
  // return Promise.resolve();

  return request.post<ResType>(`/backend/business/banner/add`, {
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
/**
 * 删除banner
 */
export const deleteBanner = (bannerId: string) =>
  request.delete(`/backend/business/banner/delete/${bannerId}`);
