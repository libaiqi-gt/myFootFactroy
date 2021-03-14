import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/home/home'
import Login from '@/view/login/login'
import menuSort from '@/view/menuSort/index'
import menuDetails from '@/view/menuDetails/menuDetails'
import menuList from '@/view/menuList/menuList'

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
    {
      path: '/menuSort',
      name: 'menuSort',
      component: menuSort,
      meta: {
        title: '食材分类'
      }
    },
    {
      path: '/menuDetails/:id',
      name: 'menuDetails',
      component: menuDetails,
      meta: {
        title: '菜谱详情'
      }
    },
    {
      path: '/menuList',
      name: 'menuList',
      component: menuList,
      meta: {
        title: '菜单'
      }
    },
  ]
})
