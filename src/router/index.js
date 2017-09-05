import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main';

import Login from '@/components/Login';

import Form from '@/components/nav1/Form';
import Table from '@/components/nav1/Table';
import user from '@/components/nav1/user';
import Home from '@/components/Home';



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },

    {
      path: '/',
      component: Home,
      name: '导航一',
      iconCls: 'el-icon-message',//图标样式class
      children: [
        { path: '/main', component: Main, name: '主页', hidden: true },
        { path: '/table', component: Table, name: 'Table' },
        { path: '/form', component: Form, name: 'Form' },
        { path: '/user', component: user, name: '列表' },
      ]
    },
  ]
})
