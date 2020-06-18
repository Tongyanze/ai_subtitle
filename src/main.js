import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faLock, faMailBulk, faInfo, faMobile} from '@fortawesome/free-solid-svg-icons'
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/iconfont.css'
import global from '@/assets/js/global'

library.add(faUser, faLock, faMailBulk, faInfo, faMobile)

Vue.prototype.$global = global
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon);

//拦截器
router.beforeEach((to, from, next) => {
  if (to.path ==='/' || to.path === '/register' || to.path === '/retrieve' || to.path === '/about') {
    next();
  }
  else if (to.path ==='/login') {
    if (localStorage.getItem('token') != null && localStorage.getItem('token') !== '') {
      next(from.path);
    }
    else {
      next();
    }
  }
  else if(localStorage.getItem('token') != null && localStorage.getItem('token') !== ''){
    next();
  }
  else {
    next('/')
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
