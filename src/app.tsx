import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, useAccess, Access } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { getUserInfo } from './services/sys/auth';
import MenuStore from '@/sotre/menuStore';
import defaultSettings from '../config/defaultSettings';
import { getCookie } from '@/utils/cookies';
import Fallback from '@/pages/401';
import { listByUserIdApi } from '@/services/sys/menu';

const loginPath = '/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserInfo;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.UserInfo | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const syncMsg = getUserInfo();
      const syncPathAccess = listByUserIdApi();
      const msg = await syncMsg;
      const pathAccess = await syncPathAccess;
      return {
        ...msg.data,
        pathAccess: pathAccess.data,
      };
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.nickname,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      const token = getCookie('token');
      // useAccess()
      // 如果没有登录，重定向到 login
      if (!token || (!initialState?.currentUser && location.pathname !== loginPath)) {
        history.push(loginPath);
      }
    },
    // links: isDev
    //   ? [
    //       <Link
    //         key="openapi"
    //         to="http://192.168.31.229:9000/doc.html#/%E6%9C%8D%E5%8A%A1%E6%8E%A5%E5%8F%A3/%E7%94%A8%E6%88%B7%E8%AE%A4%E8%AF%81%E7%AE%A1%E7%90%86%E6%8E%A5%E5%8F%A3/getInfoUsingGET"
    //         target="_blank"
    //       >
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs" key="docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    postMenuData: (menuData) => {
      const pathAccess: string[] =
        (initialState?.currentUser as any)?.pathAccess?.map((item: API.AccessType) => item.id) ||
        [];
      return menuData?.filter((item) => pathAccess.includes(item.access)) || [];
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const access = useAccess();
      const pathname = props.location?.pathname;
      const route = props.route?.routes?.find((item) => item.path === pathname);
      return (
        <MenuStore.Provider>
          <Access accessible={access.codeJudgeAccess(route?.access)} fallback={<Fallback />}>
            {children}
          </Access>
          {/* {children} */}
          {/* {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )} */}
        </MenuStore.Provider>
      );
    },
    ...initialState?.settings,
  };
};
