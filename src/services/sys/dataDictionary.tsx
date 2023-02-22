import request from '@/services/request';

export type ResType = {
  /**
   *   数据编码
   */
  dataCode: string;
  /**
   *   数据名称
   */
  dataValue: string;
  /**
   *   id
   */
  id?: string;
  /**
   *   父级id
   */
  parentId?: string;
  /**
   *   顺序
   */
  sortNo?: number;
  /**
   *   状态'ENABLE'开启,'DISABLE'关闭
   */
  status?: string;
};

type PageReq = {
  parentId?: string;
};
/**
 * 分页查询字典数据
 */
export const dataDictionaryPage = (data: API.RequestListReqType<PageReq>) =>
  request.post<API.RequestListResType<ResType>>('/backend/sys/dataDictionary/page', { data });
/**
 * 查询字典列表
 */
export const dataDictionaryList = () =>
  request.get<ResType[]>('/backend/sys/dataDictionary/leve1List');

/**
 * 查询二级字典数据
 */
export const dataDictionaryCodeList = (dataCode?: string) =>
  request.get<ResType[]>(`/backend/sys/dataDictionary/childList/${dataCode}`);
/**
 * 禁用
 */
export const dataDictionaryDisable = (roleId?: string) =>
  request.get(`/backend/sys/dataDictionary/disable/${roleId}`);
/**
 * 启用
 */
export const dataDictionaryEnable = (roleId?: string) =>
  request.get(`/backend/sys/dataDictionary/enable/${roleId}`);
/**
 * 新增
 */
export const dataDictionaryAdd = (data?: ResType) =>
  request.post(`/backend/sys/dataDictionary/add`, { data });
/**
 * 修改
 */
export const dataDictionaryUpdate = (data: ResType) =>
  request.post(`/backend/sys/dataDictionary/update`, { data });
