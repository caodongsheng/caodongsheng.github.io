// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
import { routeMapAdd } from './unit/router_unit'
import store from './store'

import './scss/index.scss'
/* eslint-disable no-new */
routeMapAdd()
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
