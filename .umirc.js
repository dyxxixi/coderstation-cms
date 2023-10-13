import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'CoderStation',
  },
  dva: {},
  icons: { autoInstall: {} }, // 使用icon
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      icon: 'HomeOutlined',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'UserOutlined',
      routes: [
        {
          path: 'adminList',
          name: '管理员列表',
          component: './Admin',
        },
        {
          path: 'addAdmin',
          name: '添加管理员',
          component: '@/pages/Admin/addAdmin',
        },
      ],
    },
    {
      name: '用户',
      path: '/user',
      icon: 'TeamOutlined',
      routes: [
        {
          path: 'userList',
          name: '用户列表',
          component: './User',
        },
        {
          path: 'addUser',
          name: '添加用户',
          component: './User/addUser',
        },
        {
          path: 'editUser/:id',
          name: '编辑用户',
          component: './User/editUser',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      component: './Book',
      icon: 'ReadOutlined',
    },
    {
      name: '面试题',
      path: '/interview',
      component: './Interview',
      icon: 'EditOutlined',
    },
    {
      name: '问答',
      path: '/issue',
      component: './Issue',
      icon: 'ProfileOutlined',
    },
    {
      name: '评论',
      path: '/comment',
      component: './Comment',
      icon: 'CalendarOutlined',
    },
    {
      name: '类型',
      path: '/type',
      component: './Type',
      icon: 'AppstoreOutlined',
    },
  ],
  proxy: {
    // 本地：http://127.0.0.1:7001    外部：https://coderstation-api-dyxxixi.koyeb.app
    '/res': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/static': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  npmClient: 'pnpm',
});
