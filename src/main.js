import Vue from 'vue'
import App from './App'
import router from './router'
import CookieStorage from './services/cookie.storage.js'
import './assets/styles/reset.css'

Vue.config.productionTip = false

console.log(CookieStorage.getUserId())

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
