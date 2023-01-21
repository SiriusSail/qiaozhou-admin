import request from '@/services/request';

export type RoleType = {
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

type RolePageReq = {
  roleName: string;
  status: string;
};
/**
 * 分页查询角色
 */
export const rolePage = (data: API.RequestListReqType<RolePageReq>) =>
  request.post<API.RequestListResType<RoleType>>('/backend/sys/role/page', { data });
/**
 * 查询角色列表
 */
export const roleList = () => request.post<RoleType[]>('/backend/sys/role/list');
/**
 * 禁用
 */
export const roleDisable = (roleId: string) =>
  request.get<API.RequestListResType<RoleType>>(`/backend/sys/role/disable/${roleId}`);
/**
 * 启用
 */
export const roleEnable = (roleId: string) =>
  request.get<API.RequestListResType<RoleType>>(`/backend/sys/role/enable/${roleId}`);
/**
 * 新增
 */
export const roleAdd = (data: RoleType) =>
  request.post<API.RequestListResType<RoleType>>(`/backend/sys/role/add`, { data });
/**
 * 修改
 */
export const roleUpdate = (data: RoleType) =>
  request.post<API.RequestListResType<RoleType>>(`/backend/sys/role/update`, { data });
