import request from '@/services/request';

export const getMenuListAPi = () => request.get<API.AccessType[]>('/backend/sys/menu/list');

/**
 *
 * @returns 查询当前登录用户拥有的菜单列表
 */
export const listByUserIdApi = () =>
  request.get<API.AccessType[]>('/backend/sys/menu/listByUserId');
/**
 *
 * @returns 查询当前登录用户拥有的菜单树
 */
export const treeByUserIdApi = () =>
  request.get<API.AccessType[]>('/backend/sys/menu/treeByUserId');
