import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
const router = new VueRouter({
  mode: 'history',
  routes
})
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./scss/main.scss"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
