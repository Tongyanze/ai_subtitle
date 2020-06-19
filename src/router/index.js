import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from "@/components/Header.vue";
import Login from "@/views/Login.vue";
import index from "@/views/index.vue";
import About from '@/views/About.vue'
import Retrieve from '@/views/retrieve.vue'
import Register from '@/views/Register.vue'
import UserInfo from '@/views/userinfo/UserInfo.vue'
import basicInfo from '@/views/userinfo/basicInfo.vue'
import changeinfo from '@/views/userinfo/changeinfo.vue'
import changemail from '@/views/userinfo/changeinfo.vue'
import changephone from '@/views/userinfo/changephone.vue'
import contribute from '@/views/userinfo/contribute.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
    {
      path: '/login',
      name: 'Login',
      component: Login
      },
    {
      path: '/retrieve',
      name: 'Retrieve',
      component: Retrieve
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      redirect:'userinfo/basicinfo',
      component: UserInfo,
      children: [
        {
          path: 'basicinfo',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'basicinfo',
          component: basicInfo
        },
        {
          path: 'changeinfo',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'changeinfo',
          component: changeinfo
        },
        {
          path: 'changephone',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'changephone',
          component: changephone
        },
        {
          path: 'changemail',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'changemail',
          component: changemail
        },
        {
          path: 'contribute',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          name: 'contribute',
          component: contribute
        }
      ]
    },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
