import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/axios'
import './plugins/element.js'
import base from './api/base'
import './assets/css/common.css'

Vue.prototype.$base = base;

Vue.config.productionTip = false


// 从本地获取数据，更新vuex
let username = localStorage.getItem('username')
let isLogin = localStorage.getItem('isLogin')

if(isLogin){
  store.dispatch('setIsLoginAction',isLogin)
}
if(username){
  store.dispatch('setunameAction',username)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
