import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from "@/components/Header.vue";
import Login from "@/views/Login.vue";
import index from "@/views/index.vue";
import Retrieve from '@/views/retrieve.vue';
import Register from '@/views/Register.vue';
import About from '@/views/About.vue'

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
