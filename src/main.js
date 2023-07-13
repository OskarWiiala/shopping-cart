import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import { currency } from '@/currency'

Vue.config.productionTip = false
// Vue's built in command?
Vue.filter('currency', currency)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store, // You have to add this in order to use vuex inspection in the browser
  render: h => h(App)
})
