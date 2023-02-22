import { createContainer } from 'unstated-next';
import { getMenuListAPi } from '@/services/sys/menu';
import {
  dataDictionaryList as dataDictionaryListAPI,
  dataDictionaryCodeList,
} from '@/services/sys/dataDictionary';
import { campusList as campusListAPI } from '@/services/business/campus';
import { useRequest } from 'umi';
import { useMemo } from 'react';
import { useSetState } from 'ahooks';
import { getCookie } from '@/utils/cookies';

type ValueEnum = Record<string, string>;
export default createContainer(() => {
  // 菜单枚举
  const { data: menuList, run: getMenuList } = useRequest(getMenuListAPi, {
    manual: !getCookie('token'),
  });

  const [menuMap, setMenuMap] = useSetState<Record<string, Record<string, string>>>({});

  // 校区
  const { data: campusList, run: getCampusList } = useRequest(
    () =>
      campusListAPI().then((res) => ({
        ...res,
        data: res.data.reduce((previousValue, currentValue) => {
          return {
            ...previousValue,
            [currentValue.id]: currentValue.campusName,
          };
        }, {}),
      })),
    {
      manual: !getCookie('token'),
    },
  );

  // 父级字典
  const {
    data: dataDictionaryList,
    run: getDataDictionaryList,
    loading: dataDictionaryListLoading,
  } = useRequest(
    () =>
      dataDictionaryListAPI().then((res) => {
        res.data?.forEach(({ dataCode }) =>
          dataDictionaryCodeList(dataCode).then((item) => {
            setMenuMap({
              [dataCode]: item.data.reduce((previousValue, currentValue) => {
                return {
                  ...previousValue,
                  [currentValue.dataCode]: currentValue.dataValue,
                };
              }, {}),
            });
          }),
        );
        return res;
      }),
    {
      manual: !getCookie('token'),
    },
  );

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

  const dataSourceValueEnum = useMemo(() => {
    dataDictionaryList?.reduce((previousValue, currentValue) => {
      return {
        ...previousValue,
        [currentValue.id!]: `${currentValue.dataValue}: ${currentValue.id}`,
      };
    }, {});
  }, [dataDictionaryList]);

  console.log(menuMap);

  return {
    menuListOptions: menuList?.map((item) => ({
      label: item.name,
      value: item.id,
    })),
    menuMap,
    dataDictionaryList,
    dataSourceValueEnum,
    getDataDictionaryList,
    dataDictionaryListLoading,
    menuListValueEnum,
    menuList,
    campusList,
    getCampusList,
    getMenuList,
  };
});
