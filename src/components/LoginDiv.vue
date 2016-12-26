<template>
    <div class="login-div">
      <div class="login-tr title-close title">
        <canvas class="closeSymbol" v-on:click="clickClose"></canvas>
        <h2 class="title-text">请登录{{loginBox}}</h2>
      </div>
      <label class="login-tr" for='user-name'>
        <span>用户名</span>
        <input class="login-td" id='user-name' type='text'>
      </label>
      <label class="login-tr" for='user-password'>
        <span>密码</span>
        <input class="login-td" id='user-password' type='password'>
      </label>
      <label class="login-tr" for="validate-number">
        <span>验证码</span>
        <img class="validate-show" src="">
        <input id="validate-refresh" type="button" value="刷新">
        <input id="validate-number" type="text">
      </label>
      <span class="login-tr">
        <input id='login-btn' type='button' value='登录'>
        <label for="save-login" class="save-login-label">
          <input id="save-login" type="checkbox">1小时内登录有效
        </label>
      </span>
    </div>
</template>
<style>
  .login-div{
    /*display: none;*/
    z-index: 990;
    position: fixed;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    background-color: aqua;
    border: 1px solid red;
    width: 20rem;
    height: 13rem;
  }
  .title{
    position: relative;
  }
  .title-text{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .closeSymbol{
    float: right;
    z-index: 991;
    margin: 5px;
  }
  .login-tr{
    display: block;
    margin: 1rem auto 1rem auto;
    text-align: center;
  }
  .title-close{
    margin: 0px;
    background-color: brown;
  }
  .login-tr:after{
    content: "";
    display: block;
    clear: both;
  }
  .login-tr span{
    display: inline-block;
    width: 4rem;
  }
  #validate-refresh{
    width: 2rem;
  }
  #validate-number{
    width: 2rem;
  }
  .validate-show{
    vertical-align: middle;
    margin-left: 2px;
    margin-right: 2px;
  }
  .save-login-label{
    font-size: 0.5rem;
    vertical-align: middle;
    display: inline-block;
    margin-left: 1rem;
    line-height: 1rem;
  }
  #save-login{
    vertical-align: middle;
  }
</style>
<script>
  import jQuery from 'jquery';
  /*用canvas画出登录框的关闭按键函数*/
//  var myCanvas = function(){
//    //建立canvas对象
//    var closeSymbolDOM = jQuery('.closeSymbol').get(0);
//    closeSymbolDOM.width = '30';
//    closeSymbolDOM.height = '30';
//    //canvas的2d绘制
//    var closeSymbol = closeSymbolDOM.getContext('2d');
//    //用白色填充画布
//    closeSymbol.fillStyle = 'white';
//    closeSymbol.fillRect(0,0,30,30);
//    //绘制从左上到右下的线
//    closeSymbol.beginPath();
//    closeSymbol.moveTo(0,0);
//    closeSymbol.lineTo(30,30);
//    closeSymbol.strokeStyle = 'red';
//    closeSymbol.stroke();
//    closeSymbol.closePath();
//    //绘制从左下到右上的线
//    closeSymbol.beginPath();
//    closeSymbol.moveTo(0,30);
//    closeSymbol.lineTo(30,0);
//    closeSymbol.strokeStyle = 'red';
//    closeSymbol.stroke();
//    closeSymbol.closePath();
//  };
    export default{
        data(){
            return{
//              loginBox: this
            }
        },
        props:['loginBox'],
      computed: {
        loginBox: function(){
          jQuery(document).ready(function(){
            //建立canvas对象
            var closeSymbolDOM = jQuery('.closeSymbol').get(0);
            closeSymbolDOM.width = '30';
            closeSymbolDOM.height = '30';
            //canvas的2d绘制
            var closeSymbol = closeSymbolDOM.getContext('2d');
            //用白色填充画布
            closeSymbol.fillStyle = 'white';
            closeSymbol.fillRect(0,0,30,30);
            //绘制从左上到右下的线
            closeSymbol.beginPath();
            closeSymbol.moveTo(0,0);
            closeSymbol.lineTo(30,30);
            closeSymbol.strokeStyle = 'red';
            closeSymbol.stroke();
            closeSymbol.closePath();
            //绘制从左下到右上的线
            closeSymbol.beginPath();
            closeSymbol.moveTo(0,30);
            closeSymbol.lineTo(30,0);
            closeSymbol.strokeStyle = 'red';
            closeSymbol.stroke();
            closeSymbol.closePath();
          });
        }
      },
      methods: {
        clickClose: function(){
          this.$emit('closeLogin')
        }
      }
    }
</script>
