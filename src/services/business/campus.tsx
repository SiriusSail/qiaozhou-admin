import request from '@/services/request';

export type CampusType = {
  /**
   * 	纬度
   */
  campusLat?: number;
  /**
   * 	经度
   */
  campusLng?: number;
  /**
   * 	校区名称
   */
  campusName?: string;
  /**
   * 	创建人
   */
  createBy?: string;
  /**
   * 	创建时间
   */
  createTime?: string;
  /**
   * 	描述
   */
  description?: string;
  /**
   * 	分组
   */
  groupId?: string;
  /**
   * 	id
   */
  id?: string;
  /**
   * 	修改人
   */
  updateBy?: string;
  /**
   * 	修改时间
   */
  updateTime?: string;
};

type CampusPageReq = {
  campusName?: string;
};

type CampusMenu = {
  campusName: string;
  id: string;
};
/**
 * 分页查询校区列表
 */
export const campusPage = (data: API.RequestListReqType<CampusPageReq>) =>
  request.post<API.RequestListResType<CampusType>>('/backend/business/campus/page', { data });

/**
 * 查询校区列表
 */
export const campusList = () =>
  request.get<CampusMenu[]>('/backend/business/campus/findCampusList');

/**
 * 添加校区
 */
export const addCampus = (data: CampusType) =>
  request.post<CampusType>(`/backend/business/campus/add`, { data });
/**
 * 更新校区
 */
export const updateCampus = (data: CampusType) =>
  request.post<CampusType>(`/backend/business/campus/update`, { data });

/**
 * 删除校区
 */
export const deleteCampus = (campusId: string) =>
  request.delete<CampusType>(`/backend/business/campus/delete/${campusId}`);
