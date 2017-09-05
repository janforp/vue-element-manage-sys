import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main';

import Login from '@/components/Login';

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
      name: 'Main',
      component: Main
    }
  ]
})
