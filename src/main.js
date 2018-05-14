import Vue from 'vue'
import App from './App.vue'
import Shuttle from '../dist/transfer'

Vue.use(Shuttle)

new Vue({
  el: '#app',
  render: h => h(App)
})
