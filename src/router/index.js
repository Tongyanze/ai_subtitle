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
import favourition from '@/views/favourition.vue'
import uploader from "@/views/uploader";
import VideoModify from "@/views/VideoModify";
import VideoDetail from "@/views/VideoDetail";
import Search from "@/views/Search";
import Message from'@/views/Message.vue';
import subm1 from'@/views/subm1.vue';
import subm2 from'@/views/subm2.vue';
import subm3 from'@/views/subm3.vue';
import subm4 from'@/views/subm4.vue';
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
      path: '/favourition',
      name: 'favourition',
      component: favourition
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      redirect:'Message/subm1',
       children:[
         {
         path:'subm1',
         name:'subm1',
         component:subm1 
         }, 
          {
            path:'subm2',
         name:'subm2',
         component:subm2 
          },        
          {
            path:'subm3',
         name:'subm3',
         component:subm3
          },
          {
            path:'subm4',
         name:'subm4',
         component:subm4
          }
        ]
    },
    {
      path: '/videomodify',
      name: 'VideoModify',
      component: VideoModify
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
    },
    {
      path: '/uploader',
      name: 'uploader',
      component: uploader
    },
    {
      path: '/videodetail',
      name: 'videodetail',
      component: VideoDetail
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})



export default router
