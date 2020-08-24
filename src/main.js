import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import axios from 'axios'
// import 'swiper/css/swiper.css'
import 'swiper/swiper-bundle.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import http from './request/http'
import './plugins/element'
import axiosFine from './api/index'
import filter from './common/config/filter'




Vue.prototype.axiosFine = axiosFine
Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$axios = axios

Vue.use(VueLazyLoad,{
  loading : require('./assets/imgs/loading-svg/loading-bubbles.svg')
})
Vue.use(VueCookie)

// mock数据
const mock = false;
if(mock){
  require('./common/mock/mockApi')
}
//注册全局过滤器
Object.keys(filter).forEach(item=>{
  Vue.filter(item,filter[item]);
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
