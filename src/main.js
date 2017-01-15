//引入vue
import Vue from 'vue'
//0,引入路由
import VueRouter from 'vue-router'
//引入vuex
import Vuex from 'vuex'
//引入组件
import App from './App'
import GoodsPage from './components/GoodsPage.vue'
import HeaderP9 from './components/HeaderP9.vue'
import ShopCart from './components/ShopCart.vue'

//1,注册VueRouter和Vuex
Vue.use(VueRouter);
Vue.use(Vuex);
//注册组件
Vue.component('header-p9',HeaderP9);
Vue.component('goods-page',GoodsPage);
Vue.component('shop-cart',ShopCart);

//创建store实例(store是module名字)
const store = new Vuex.Store({
  //储存状态值
  state: {
    goodsID: 0,
    userID: 0
  },
  //状态值改变方法(同步)
  mutations :{
    changeGoodsID(state,newGoodsID){
      state.goodsID = newGoodsID
    },
    changeUserID(state,newUserID){
      state.userID = newUserID
    }
  },
  //store的计算属性
  getters: {},
  //action,异步改变state,包含mutation
  actions: {}
});

//2, 路由map
const routes = [
  {path: '/',
    components: {
      header: HeaderP9,
      body:GoodsPage
    }
  },
  {path: '/shop-cart',
    components: {
      header: HeaderP9,
      body: ShopCart
    }
  }
];

//3, 创建路由实例
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

/* eslint-disable no-new */

//4, 创建和挂载根实例
const app =new Vue({
  el: '#app',
  //在根实例注入所有子组件
  router,
  //通过this.$store访问store
  store,
  render: h => h(App)
});
