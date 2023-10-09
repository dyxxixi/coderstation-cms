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
      ]
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
        }
      ],
    },
    {
      name: '书籍',
      path: '/book',
      component:'./Book',
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
  npmClient: 'pnpm',
});

