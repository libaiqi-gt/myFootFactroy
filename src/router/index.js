import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home/home'
import Login from '@/view/login/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '美食工厂'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
  ]
})
