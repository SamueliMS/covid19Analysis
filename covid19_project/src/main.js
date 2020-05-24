import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import XLSX from 'xlsx'
import VueGeolocation from 'vue-browser-geolocation'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(XLSX)
Vue.use(VueGeolocation);

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCC-q_lhWeXCVFUj3Kig143zxwC8feuU1k'
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
