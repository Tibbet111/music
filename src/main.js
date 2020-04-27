import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import './assets/style/globle.scss'
import { PullRefresh, Swipe, SwipeItem, Lazyload } from 'vant'
import api from './api/api'
Vue.use(PullRefresh)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Lazyload)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
