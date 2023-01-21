import request from '@/services/request';

export type MenuType = {
  /**
   * 	权限code
   */
  code: string;
  /**
   * 	前端路由地址
   */
  component: string;
  /**
   * 	说明
   */
  description: string;
  /**
   * 	图标
   */
  icon: string;
  id: string;
  /**
   * 	权限名
   */
  name: string;
  /**
   * 	父级id
   */
  parentId: string;
  /**
   * 		string
   */
  ptype: string;
  /**
   * 	菜单排序
   */
  sort: number;
  /**
   * 	前端路由地址
   */
  url: string;
};

export const getMenuListAPi = () => request.get<MenuType[]>('/backend/sys/menu/list');
