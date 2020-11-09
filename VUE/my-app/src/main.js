<<<<<<< HEAD
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
//import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// https://v2.vuetifyjs.com/en/getting-started/pre-made-layouts/

new Vue({
//  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
=======
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// https://v2.vuetifyjs.com/en/getting-started/pre-made-layouts/

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
>>>>>>> 9cce1114ef3816712297122856d95d284a8504f5
