import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import store from '../store/index'
import Params from '../pages/Params/Params'
import Content from '../pages/Content/Content'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[{
      path: '',
      name: 'Home',
      component: Home,
    },{
      path: 'params',
      name: 'Params',
      component: Params,
    },{
      path: 'content',
      name: 'Content',
      component: Content,
    }]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
]

const router = new VueRouter({
  linkActiveClass:'active',
  routes
})



// 路由守卫,验证是否登录
router.beforeEach((to,from ,next)=>{
    if(to.path == '/login'){
      next()
    }
    // 从vuex中取数据
    let isLogin = store.state.isLogin;
    if(isLogin){
      next()
    }else{
      next('/login')
    }
})

export default router
