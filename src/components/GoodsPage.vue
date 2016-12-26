<template>
  <div class="goods-page">
    <header class="header-shop center-all">
      <canvas class="sign"></canvas>
      <span class="shop-cart btn btn-default">
        <a>{{shopCartText}}{{loginBox}}</a>
      </span>
      <login-div v-if="loginBox" v-bind:loginBox="loginBox" v-on:closeLogin="controllerLogin"></login-div>
      <span class="login">
        <input class="login-please" type="button" v-on:click="controllerLogin" value="请登录">
        <input class="login-off btn btn-default" type="button" value="退出登录" v-show="loginBox">
        <span class="login-show"></span>
      </span>
    </header>
    <div class="detail center-all">
      <!--<pic></pic>-->
      <section class="goods-detail">
        <h2 class="goods-detail-header">
        </h2>
        <h6 class="goods-detail-header-more">
        </h6>
        <!--<goods-price-freight></goods-price-freight>-->
        <!--<sales-status-show></sales-status-show>-->
        <!--<goods-spec></goods-spec>-->
        <div class="buy-btn-div">
          <span id="buy-btn">立即购买</span>
          <span id="shop-cart-btn"><i>
          </i>加入购物车</span>
        </div>
        <!--<service-promise></service-promise>-->
      </section>
    </div>
    <footer>
    </footer>
  </div>
</template>

<style>
  .header-shop{
    padding: 2px 0;
  }
  .login{
    float: right;
    margin: 0 1rem 0 1rem;
  }
  .login-off{
    /*display: none;*/
  }
  .shop-cart{
    float: right;
    margin: 0 1rem 0 1rem;
    display: none;
  }
  .detail{
    position: relative;
  }
</style>

<script>
  import jQuery from 'jquery';
  import LoginDiv from './LoginDiv.vue'
    export default{
        name: 'goods-page',
        data(){
            return{
              shopCartText:'购物车',
              loginBox: false
            }
        },
      components: {
        LoginDiv
      },
      methods: {
        controllerLogin: function(){
          if(this.loginBox){
            this.loginBox = false
          }else {
            this.loginBox = true
          }
        }
      }
    }
  /*绘制index的logo*/
  var myLogo = function(){
    //建立canvas对象
    var logoSymbolDOM = jQuery('.sign').get(0);
    logoSymbolDOM.width = '60';
    logoSymbolDOM.height = '30';
    //canvas的2d绘制
    var logoSymbol = logoSymbolDOM.getContext('2d');
    //创造渐变,用之填字
    var color = logoSymbol.createLinearGradient(0,0, logoSymbolDOM.width,0);
    color.addColorStop("0","magenta");
    color.addColorStop("0.5","blue");
    color.addColorStop("1.0","red");
    logoSymbol.fillStyle = color;
    //写字:Logo
    logoSymbol.font="20px Arial";
    logoSymbol.fillText("Logo",0,20);
  };
  jQuery(document).ready(function(){
    myLogo();
  })
</script>
