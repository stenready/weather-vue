import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';

import Loader from './components/Loader.vue'

Vue.config.productionTip = false
Vue.component('Loader', Loader)


new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
