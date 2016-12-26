//引入vue
import Vue from 'vue'
////引入路由
import VueRouter from 'vue-router'
//引入组件
import App from './App'
//import ViewA from './components/ViewA.vue'
//import ViewB from './components/ViewB.vue'
//import User from './components/User.vue'
//import UserChildren from './components/UserChildren.vue'
import GoodsPage from './components/GoodsPage.vue'

import $ from 'jquery'

//注册
Vue.use(VueRouter);
//Vue.use(GoodsPage);

//2, 路由map
const routes = [
  //{path: '/ViewA',component: ViewA},
  //{path: '/ViewB',component: ViewB},
  //{path: '/user/:userName/id/:id',component: User,
  //  children: [
  //    {
  //      path: 'profile',component: UserChildren
  //    }
  //  ]
  //},
  //{path: '/ok',components: {
  //  a: ViewA,
  //  b: ViewB
  //}}
  {path: '/goodsPage',component: GoodsPage}
];

//3, 创建路由实例
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

/* eslint-disable no-new */

//4, 创建和挂载根实例
const app =new Vue({
  el: '#app',
  router,
  render: h => h(App)
  //  ...App
});
