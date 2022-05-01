import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/global.css'
import store from './store'
import request from './utils/request'
import * as echarts from 'echarts' // 引入echarts
import $ from 'jquery'
import VueNeo4j from 'vue-neo4j'

window.jQuery = $
window.$ = $

Vue.use(VueNeo4j)
Vue.prototype.$echarts = echarts // 注册组件
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' })
Vue.prototype.request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
