import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Header from "@/components/Header.vue";
import Login from "@/views/Login.vue";
import index from "@/views/index.vue";
import Retrieve from '@/views/retrieve.vue'
import Register from '@/views/Register.vue'
import UserInfo from '@/views/UserInfo.vue'
import basicInfo from '@/views/basicInfo.vue'
import changeinfo from '@/views/changeinfo.vue'
import changemail from '@/views/changeinfo.vue'
import changephone from '@/views/changephone.vue'
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
        }
      ]
    },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
