import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main';
import Login from '@/components/Login';
import Form from '@/components/form/Form';
import Home from '@/components/Home';
import stoneList from '@/components/stone/stoneList';
import echarts from '@/components/echarts/echarts';

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
      name: '产品管理',
      iconCls: 'fa fa-id-card-o',//图标样式class
      children: [
        { path: '/main', component: Main, name: '主页', hidden: true },
        { path: '/form', component: Form, name: 'Form' },
      ]
    },

    {
      path: '/',
      component: Home,
      name: '石头管理',
      iconCls: 'fa fa-address-card',//图标样式class
      children: [
        { path: '/stoneList', component: stoneList, name: '石头列表' },
      ]
    },

    {
      path: '/',
      component: Home,
      name: '图表统计',
      iconCls: 'fa fa-bar-chart',//图标样式class
      children: [
        { path: '/echarts', component: echarts, name: 'echarts' },
      ]
    },
  ]
})
