import { createContainer } from 'unstated-next';
import { getMenuListAPi } from '@/services/menu';
import { useRequest } from 'umi';

export default createContainer(() => {
  const { data: menuList, run: getMenuList } = useRequest(getMenuListAPi);

  return {
    menuList,
    getMenuList,
  };
});
