import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faLock, faMailBulk, faInfo } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faLock, faMailBulk, faInfo)


Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
