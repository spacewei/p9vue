<template>
  <div class="login-all">
    <span class="login">
        <input class="login-please" type="button" value="请登录" @click="controllerLogin" v-show="!signed && !loginBox">
        <input class="login-off" type="button" value="退出登录" @click="loginOff" v-show="signed">
        <span class="login-show">{{loginShow}}</span>
        <span>{{this.$store.state.userID}}</span>
    </span>
    <div class="login-div" v-show="loginBox">
      <div class="login-tr title-close title">
        <canvas class="closeSymbol" @click="clickClose"></canvas>
        <h2 class="title-text">请登录</h2>
      </div>
      <label class="login-tr" for='user-name'>
        <span>用户名</span>
        <input class="login-td" id='user-name' type='text' v-model="userName">
      </label>
      <label class="login-tr" for='user-password'>
        <span>密码</span>
        <input class="login-td" id='user-password' type='password' v-model="userPassword">
      </label>
      <label class="login-tr" for="validate-number">
        <span>验证码</span>
        <img class="validate-show" src="">
        <input class="validate-refresh" type="button" value="刷新" @click="validateRefresh">
        <input id="validate-number" type="text" v-model="userValidate">
      </label>
      <span class="login-tr">
        <input id='login-btn' type='button' value='登录' @click="loginSubmit">
        <label for="save-login" class="save-login-label">
          <input id="save-login" type="checkbox" v-model="saveLogin">1小时内登录有效
        </label>
      </span>
    </div>
  </div>
</template>
<script>
  import jQuery from 'jquery';
  import {ajax} from '../lib/libSpace'
    export default{
        data(){
            return{
              //验证码
              validate: "",
              //输入的用户名
              userName: "",
              //输入的密码
              userPassword: "",
              //输入的验证码
              userValidate: "",
              //是否维持登录
              saveLogin: false,
              //登录框显示flag
              loginBox: false,
              //登录flag
              signed: false,
              //登录结果显示
              loginShow: "",
              //购物车
              shopCartText:'购物车',
              //login PHP url
              loginUrl: "http://localhost/P9Vue/static/PHP/login.php",
              //验证码PHP url
              validateUrl : "http://localhost/P9Vue/static/PHP/validate.php"
            }
        },
      methods: {
        controllerLogin: function(){
          if(this.loginBox){
            this.loginBox = false
          }else {
            this.loginBox = true
          }
          this.validateRefresh();
        },
        /*关闭登录框*/
        clickClose: function(){
          this.loginBox = false
        },
        /*绘制验证码方法*/
        validateRefresh: function(){
          let urlValidate = this.validateUrl;
          jQuery('.validate-show').attr({'src':urlValidate+"?"+Math.random()});
        },
        /*提交登录信息方法*/
        loginSubmit: function(){
          let self = this;
          let ajaxData = {
            loginFlag:"loginIn",
            userName:self.userName,
            userPWD:self.userPassword,
            validate:self.userValidate,
            saveLogin:self.saveLogin
          };
          let success = function(data){
            switch (data.flag) {
              case 'none' :
                self.loginShow = '无此用户';
                break;
              case 'false' :
                self.loginShow = '密码错误' + data.password;
                break;
              case 'validateFalse' :
                self.loginShow = '验证码错误' + data.validate;
                break;
              case 'true' :
                self.loginBox = false;
                self.signed = true;
                self.sendSigned();
                self.storeUserID(data.userID);
                self.loginShow = '欢迎' + data.userName;
                break;
            }
          };
          ajax(self.loginUrl,ajaxData,success);
        },
        /*退出登录方法*/
        loginOff: function(){
          let self = this;
          let ajaxData = {loginFlag:'loginOff'};
          let success = function(data){
            self.signed=false;
            self.sendSigned();
            self.loginShow = "";
            self.storeUserID(0)
          };
          ajax(self.loginUrl,ajaxData,success);
        },
        /*载入页面,检查是否保持登录,分session和cookie情况*/
        loginUserReady: function(){
          let self = this;
          let sendData = {loginFlag:'ready'};
          let success = function(data){
            if(data.flag == 'keepSession'){
              console.log('keepSession');
              self.loginBox = false;
              self.signed = true;
              self.sendSigned();
              self.loginShow = '继续欢迎' + data.loginUserName;
              self.storeUserID(data.loginUserID);
              console.log(data.loginUserName);
            }
            if(data.flag == 'keepCookie'){
              console.log('keepCookie');
              self.loginBox = false;
              self.signed = true;
              self.sendSigned();
              self.loginShow = '继续欢迎' + data.loginUserName;
              self.storeUserID(data.loginUserID);
              console.log(data.loginUserName);
            }
            if(data.flag == 'keepNone'){
              console.log(data.flag);
            }
          };
          ajax(self.loginUrl,sendData,success);
        },
        /*储存登录的user ID*/
        storeUserID: function(userID){
          this.$store.commit('changeUserID',userID)
        },
        sendSigned: function(){
          this.$emit('sendSigned',this.signed);
        }
      },
      mounted: function(){
        let self = this;
          /*建立canvas对象*/
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
          self.loginUserReady();
      }
    }
</script>
<style>
  .login-all{
    display: inline;
  }
  .login{
    float: right;
    margin: 0 1rem 0 1rem;
  }
  .login-div{
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
    margin: 0;
    padding: 0;
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
    margin: 0;
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
  .validate-refresh{
    width: 2.5rem;
    padding: 0;
    box-sizing: border-box;
  }
  #validate-number{
    width: 2.5rem;
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