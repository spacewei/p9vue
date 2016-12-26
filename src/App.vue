<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<hello>Hello space</hello>-->
    <!--<router-link to="/ViewA">Go to Foo</router-link>-->
    <!--<router-link to="/ViewB">Go to Bar</router-link>-->
    <!--<router-link to="/user/a/id/1/profile">to</router-link>-->
    <!--<router-link to="/user/b/id/2">to</router-link>-->
    <!--<router-link to="/ok">to</router-link>-->
    <!--<viewA></viewA>-->
    <!--<viewB></viewB>-->
    <!--<router-view></router-view>-->
    <!--<router-view name='a'></router-view>-->
    <!--<router-view name='b'></router-view>-->
    <goods-page></goods-page>
  </div>
</template>

<!--<script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>-->
<script>
//import Hello from './components/Hello'
//import viewA from './components/ViewA.vue'
//import viewB from './components/ViewB.vue'
//import user from './components/User.vue'
//import userChildren from './components/UserChildren.vue'
import GoodsPage from './components/GoodsPage.vue'
//import LoginDiv from './components/LoginDiv.vue'

export default {
  name: 'app',
  components: {
    //Hello
    //viewA,
    //viewB,
    //user,
    //userChildren
    GoodsPage
  }
}
</script>
<!--<style scoped src="./css/common.css"></style>-->
<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
   /*-webkit-font-smoothing: antialiased;*/
   /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
