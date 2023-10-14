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
      icon: 'ReadOutlined',
      routes: [
        {
          path: 'bookList',
          name: '书籍列表',
          component: './Book',
        },
        {
          path: 'addBook',
          name: '添加书籍',
          component: './Book/addBook',
        },
        {
          path: 'editBook/:id',
          name: '编辑书籍信息',
          component: './Book/editBook',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      icon: 'EditOutlined',
      routes: [
        {
          path: 'interviewList',
          name: '题目列表',
          component: './Interview',
        },
        {
          path: 'addInterview',
          name: '添加题目',
          component: './Interview/addInterview',
        },
        {
          path: 'interviewList/:id',
          name: '题目详情',
          component: './Interview/interviewDetail',
          hideInMenu: true,
        },
        {
          path: 'editInterview/:id',
          name: '编辑题目',
          component: './Interview/editInterview',
          hideInMenu: true,
        },
      ],
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
      target: 'https://coderstation-api-dyxxixi.koyeb.app',
      changeOrigin: true,
    },
    '/api': {
      target: 'https://coderstation-api-dyxxixi.koyeb.app',
      changeOrigin: true,
    },
    '/static': {
      target: 'https://coderstation-api-dyxxixi.koyeb.app',
      changeOrigin: true,
    },
  },
  npmClient: 'pnpm',
});
