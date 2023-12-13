import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from '@/store'
import store from '@/utils/cacheStore'
import '@/styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'; // 引入英文语言包

Vue.use(ElementUI, { locale });

process.env.NODE_ENV === 'development' && require('../mock/index')

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
