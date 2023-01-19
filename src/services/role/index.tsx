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

export const rolePage = () =>
  request.get<API.RequestListResType<RoleType>>('/backend/sys/role/page');
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
  request.post<API.RequestListResType<RoleType>>(`/backend/sys/role/enable`, { data });
