<template>
    <header class="header-shop center-all">
        <canvas class="sign"></canvas>
        <span class="shop-cart-a" v-if="signed">
            <router-link to="/shop-cart">{{shopCartText}}</router-link>
        </span>
        <login-div v-on:sendSigned="getSigned"></login-div>
    </header>
</template>
<script>
    import jQuery from 'jquery';
    import LoginDiv from './LoginDiv.vue'
    export default{
        data(){
            return{
                //登录flag
                signed: false,
                //购物车
                shopCartText:'购物车'
            }
        },
        components:{
            LoginDiv
        },
        methods: {
            myLogo: function () {
                //建立canvas对象
                var logoSymbolDOM = jQuery('.sign').get(0);
                logoSymbolDOM.width = '60';
                logoSymbolDOM.height = '30';
                //canvas的2d绘制
                var logoSymbol = logoSymbolDOM.getContext('2d');
                //创造渐变,用之填字
                var color = logoSymbol.createLinearGradient(0, 0, logoSymbolDOM.width, 0);
                color.addColorStop("0", "magenta");
                color.addColorStop("0.5", "blue");
                color.addColorStop("1.0", "red");
                logoSymbol.fillStyle = color;
                //写字:Logo
                logoSymbol.font = "20px Arial";
                logoSymbol.fillText("Logo", 0, 20);
            },
            getSigned: function(signed){
                this.signed = signed;
            }
        },
        mounted: function(){
            this.myLogo();
        }
    }
</script>
<style>
    .header-shop{
        padding: 2px 0;
    }
    .shop-cart-a{
        float: right;
    }
</style>
