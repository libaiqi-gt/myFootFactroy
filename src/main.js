// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
import '../src/global/style.less'
import VueWechatTitle from 'vue-wechat-title'
import store from './stroe'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(VueWechatTitle)

Vue.config.productionTip = false

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
