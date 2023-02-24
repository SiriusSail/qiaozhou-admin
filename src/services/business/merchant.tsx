import request from '@/services/request';

export type ResType = {
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
   * 	是否通过审核
   */
  examine: string;
  /**
   * 	审核时间
   */
  examineTime: string;
  /**
   * 	id
   */
  id: string;
  /**
   * 	商铺地址
   */
  merAddress: string;
  /**
   * 	商铺坐标纬度
   */
  merLat: number;
  /**
   * 	商铺坐标经度
   */
  merLng: number;
  /**
   * 	商铺名称
   */
  merName: string;
  /**
   * 	商户编号
   */
  merNo: string;
  /**
   * 	商铺负责人
   */
  merPerson: string;
  /**
   * 	联系人电话
   */
  merPersonTel: string;
  /**
   * 	商铺类型
   */
  merType: string;
  /**
   * 	商铺类型名称
   */
  merTypeName: string;
  /**
   * 	用户昵称
   */
  nickname: string;
  /**
   * 	是否启用
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
  /**
   * 	用户ID
   */
  userId: string;
};

type PageReq = {
  examine?: string;
  merName?: string;
  merNo?: string;
  status?: string;
};
/**
 * 分页查询角色
 */
export const merchantPage = (data: API.RequestListReqType<PageReq>) =>
  request.post<API.RequestListResType<ResType>>('/backend/business/merchant/page', { data });
/**
 * 查询角色列表
 */
export const merchantList = () =>
  request.post<ResType[]>('/backend/business/merchant/findMerchantLis');
/**
 * 禁用
 */
export const merchantDisable = (merchantId: string) =>
  request.get(`/backend/business/merchant/disable/${merchantId}`);
/**
 * 启用
 */
export const merchantEnable = (merchantId: string) =>
  request.get(`/backend/business/merchant/enable/${merchantId}`);
/**
 * 商户审核不通过
 */
export const merchantExamineeNotPass = (merchantId?: string) =>
  request.get(`/backend/business/merchant/examineePass/${merchantId}`);
/**
 * 商户审核通过
 */
export const merchantExamineePass = (merchantId?: string) =>
  request.get(`/backend/business/merchant/examineePass/${merchantId}`);
/**
 * 商户删除
 */
export const merchantDelete = (merchantId?: string) =>
  request.get(`/backend/business/merchant/delete/${merchantId}`);
// /**
//  * 新增
//  */
// export const merchantAdd = (data: ResType) =>
//   request.post(`/backend/business/merchant/add`, { data });
// /**
//  * 修改
//  */
// export const merchantUpdate = (data: ResType) =>
//   request.post(`/backend/business/merchant/update`, { data });
