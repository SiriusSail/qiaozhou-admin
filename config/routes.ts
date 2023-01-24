export default [
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
    ],
  },
  {
    component: './404',
  },
];
