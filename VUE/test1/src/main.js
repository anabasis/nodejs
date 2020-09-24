import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Component 전역적으로 적용
//Vue.component('testCom',{
//
//});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
