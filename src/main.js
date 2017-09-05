import Vue from 'vue';
import App from './App';
import router from './router';

//引用cookie
import cookie from 'js-cookie';
window.Cookies=cookie;

//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

//引用axios
import axios from 'axios';
window.axios=axios;

//网络请求全局配置
axios.defaults.baseURL='http://localhost:9002/';
//所有网络请求 (发送) 拦截器
axios.interceptors.request.use(
  function (config) {
    console.log('请求前 : ' + config.url, config.data);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//所有网络请求 (响应) 拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.data.code !== 0) {
      console.log("返回异常 ：", response.data);
    }else {
      console.log('返回: ' + response.config.url + "\n" , response.data.data);
    }
    return response;
  },

  function (error) {
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
