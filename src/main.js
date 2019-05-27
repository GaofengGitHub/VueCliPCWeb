// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import {HOST_CONFIG} from './constans/Urls'

import App from './App'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false;
Vue.use(ElementUI);
// Vue.use(axios) ;
Vue.prototype.$ajax = axios;
axios.defaults.baseURL = HOST_CONFIG;
axios.defaults.timeout = 2500;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
