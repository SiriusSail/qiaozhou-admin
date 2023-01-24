import { createContainer } from 'unstated-next';
import { getMenuListAPi } from '@/services/sys/menu';
import { useRequest } from 'umi';
import { useMemo } from 'react';

type ValueEnum = Record<string, string>;
export default createContainer(() => {
  // 菜单枚举
  const { data: menuList, run: getMenuList } = useRequest(getMenuListAPi);
  // const { data: listBy, run: listByUserId } = useRequest(listByUserIdApi, {
  //   manual: !getCookie('token'),
  // });
  // const { data: treeBy, run: treeByUserId } = useRequest(treeByUserIdApi, {
  //   manual: !getCookie('token'),
  // });

  // console.log(listBy, treeBy, !getCookie('token'));
  const menuListValueEnum = useMemo(() => {
    const valueEnum: ValueEnum = {};
    menuList?.forEach((item) => {
      valueEnum[item.id] = item.name;
    });
    return valueEnum;
  }, [menuList]);

  return {
    menuListOptions: menuList?.map((item) => ({
      label: item.name,
      value: item.id,
    })),
    menuListValueEnum,
    menuList,
    getMenuList,
  };
});
