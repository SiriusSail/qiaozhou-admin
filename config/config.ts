// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      layout: false,
      name: 'login',
      path: '/login',
      component: './login',
      hideInMenu: true,
    },
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      name: '角色列表',
      icon: 'table',
      path: '/role',
      component: './role',
    },
    {
      name: '用户管理',
      icon: 'table',
      path: '/user-management',
      component: './userManagement',
    },
    {
      name: '活动管理',
      icon: 'table',
      path: '/business',
      component: './business',
    },
    {
      name: '活动详情',
      layout: false,
      hideInMenu: true,
      icon: 'smile',
      path: '/business/details/:id',
      component: './business/details',
    },
    {
      name: '校区管理',
      icon: 'smile',
      path: '/campus',
      component: './campus',
    },
    {
      name: '微信用户管理',
      icon: 'smile',
      path: '/wechat-user',
      component: './wechatUser',
    },
    {
      name: '商户管理',
      icon: 'smile',
      path: '/merchant',
      component: './merchant',
    },
    {
      name: '会员管理',
      icon: 'smile',
      path: '/member',
      component: './member',
    },
    {
      name: '数据字典',
      icon: 'smile',
      path: '/data-dictionary',
      component: './dataDictionary',
    },
    {
      name: '操作日志',
      icon: 'smile',
      path: '/log',
      component: './log',
    },
    {
      component: '404',
    },
  ],
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
