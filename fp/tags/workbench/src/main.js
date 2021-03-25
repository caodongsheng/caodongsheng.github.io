import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
// import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import "babel-polyfill";
import './mock' // simulation data
import request from '@/utils/request'
import * as filters from './filters' // global filters


import '@/styles/them.scss'

Vue.use(Element, {
  size: 'small'
})
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
Vue.prototype.$http = request
Vue.prototype.$console = window.console
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//  判断扶贫
Vue.prototype.link = process.env.BASE_API
Vue.prototype.BASE_URL = process.env.BASE_URL
// Vue.prototype.BASE_URL = ''
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
