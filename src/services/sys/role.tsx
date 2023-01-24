import request from '@/services/request';

export type ResType = {
  /**
   * 编码
   */
  code?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * id
   */
  id?: string;
  /**
   * 菜单权限ids [array]
   */
  menuIds?: string[];
  /**
   * 角色名
   */
  name?: string;
  /**
   * 状态 启用'ENABLE' 禁用'DISABLE'
   */
  status?: string;
  /**
   * 修改时间
   */
  updateTime?: string;
};

type PageReq = {
  roleName: string;
  status: string;
};
/**
 * 分页查询角色
 */
export const rolePage = (data: API.RequestListReqType<PageReq>) =>
  request.post<API.RequestListResType<ResType>>('/backend/sys/role/page', { data });
/**
 * 查询角色列表
 */
export const roleList = () => request.post<ResType[]>('/backend/sys/role/list');
/**
 * 禁用
 */
export const roleDisable = (roleId: string) => request.get(`/backend/sys/role/disable/${roleId}`);
/**
 * 启用
 */
export const roleEnable = (roleId: string) => request.get(`/backend/sys/role/enable/${roleId}`);
/**
 * 新增
 */
export const roleAdd = (data: ResType) => request.post(`/backend/sys/role/add`, { data });
/**
 * 修改
 */
export const roleUpdate = (data: ResType) => request.post(`/backend/sys/role/update`, { data });
