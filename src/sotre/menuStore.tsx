import { createContainer } from 'unstated-next';
import { getMenuListAPi } from '@/services/sys/menu';
import { useRequest } from 'umi';
import { useMemo } from 'react';

type ValueEnum = Record<string, string>;
export default createContainer(() => {
  const { data: menuList, run: getMenuList } = useRequest(getMenuListAPi);

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
