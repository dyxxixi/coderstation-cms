import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'CoderStation',
    pure: true,
    loading: true,
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
      access: 'NormalAdmin',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'UserOutlined',
      access: 'SuperAdmin',
      routes: [
        {
          path: 'adminList',
          name: '管理员列表',
          component: './Admin',
          access: 'SuperAdmin',
        },
        {
          path: 'addAdmin',
          name: '添加管理员',
          component: '@/pages/Admin/addAdmin',
          access: 'SuperAdmin',
        },
      ],
    },
    {
      name: '用户',
      path: '/user',
      icon: 'TeamOutlined',
      access: 'NormalAdmin',
      routes: [
        {
          path: 'userList',
          name: '用户列表',
          component: './User',
          access: 'NormalAdmin',
        },
        {
          path: 'addUser',
          name: '添加用户',
          component: './User/addUser',
          access: 'NormalAdmin',
        },
        {
          path: 'editUser/:id',
          name: '编辑用户',
          component: './User/editUser',
          hideInMenu: true,
          access: 'NormalAdmin',
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      icon: 'ReadOutlined',
      access: 'NormalAdmin',
      routes: [
        {
          path: 'bookList',
          name: '书籍列表',
          component: './Book',
          access: 'NormalAdmin',
        },
        {
          path: 'addBook',
          name: '添加书籍',
          component: './Book/addBook',
          access: 'NormalAdmin',
        },
        {
          path: 'editBook/:id',
          name: '编辑书籍信息',
          component: './Book/editBook',
          hideInMenu: true,
          access: 'NormalAdmin',
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      icon: 'EditOutlined',
      access: 'NormalAdmin',
      routes: [
        {
          path: 'interviewList',
          name: '题目列表',
          component: './Interview',
          access: 'NormalAdmin',
        },
        {
          path: 'addInterview',
          name: '添加题目',
          component: './Interview/addInterview',
          access: 'NormalAdmin',
        },
        {
          path: 'interviewList/:id',
          name: '题目详情',
          component: './Interview/interviewDetail',
          hideInMenu: true,
          access: 'NormalAdmin',
        },
        {
          path: 'editInterview/:id',
          name: '编辑题目',
          component: './Interview/editInterview',
          hideInMenu: true,
          access: 'NormalAdmin',
        },
      ],
    },
    {
      name: '问答',
      path: '/issue',
      component: './Issue',
      icon: 'ProfileOutlined',
      access: 'NormalAdmin',
    },
    {
      name: ' 问答详情',
      path: '/issue/:id',
      component: './Issue/issueDetail',
      hideInMenu: true,
      access: 'NormalAdmin',
    },
    {
      name: '评论',
      path: '/comment',
      component: './Comment',
      icon: 'CalendarOutlined',
      access: 'NormalAdmin',
    },
    {
      name: '类型',
      path: '/type',
      component: './Type',
      icon: 'AppstoreOutlined',
      access: 'NormalAdmin',
    },
    {
      path: '/login',
      component: './Login',
      menuRender: false,
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
