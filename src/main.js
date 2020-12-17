import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http'
import global from '@/utils/global'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import stores from './store/store'//---------自定义的全局变量
import './assets/css/base.css'                    //---------引入的全局公共css

Vue.use(ElementUI)
Vue.use(api)

import Mui from 'vue-awesome-mui';
Vue.use(Mui);
Vue.prototype.global = global

new Vue({
  el: '#app',
  router,
  store:stores,          //-----全局变量
  render: h => h(App)
});
