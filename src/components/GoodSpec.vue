<template>
    <div class="">
      <h2 class="goods-detail-header">
        {{goodsName}}
      </h2>
      <h6 class="goods-detail-header-more">
        {{goodsSubtitle}}
      </h6>
      <div class="goods-price_freight">
        <div class="goods-price">{{specData.price}}</div>
        <div class="goods-freight"></div>
      </div>
      <ul class="sales-status-show">
        <li>月销量<span class="sales-show">{{specData.monthlySales}}</span></li>
        <li>累计评价<span class="evaluation-show">{{specData.evaluate}}</span></li>
        <li>库存<span class="stock-show">{{specData.stock}}</span></li>
      </ul>
      <div class="goods-spec">
          <!--<template v-for="(value,key) in testData.proper">-->
              <!--<div class="goods-spec-choice-div">-->
                  <!--<span class="goods-spec-choice">{{value.name}}</span>-->
                  <!--<template v-for="(value0,key0,index0) in value.parameter">-->
                          <!--<label class="" for="">{{value0}}-->
                              <!--<input id="" class="spec-radio spec-network" type="radio" value="全网通" name="spec-network-all" checked="checked">-->
                          <!--</label>-->
                  <!--</template>-->
              <!--</div>-->
          <!--</template>-->
          <template v-for="(value,key) in specData.proper">
              <div class="goods-spec-choice-div">
                  <span class="goods-spec-choice">{{value.displayName}}</span>
                  <template v-for="(value0,key0) in value.parameter">
                      <label :for="key+'-'+key0" :class="{selected: (value.check == value0),'cursor-hand': true}">{{value0}}
                          <input :id="key+'-'+key0" class="spec-radio" type="radio" :value="value0" :name="key" v-model="value.check" @change="getSpec" @click="selectedParameter">
                      </label>
                  </template>
              </div>
          </template>
          <div class="number-choice goods-spec-choice-div">
              <span class="goods-spec-choice">数量</span>
              <input id="number-input" v-model="goodsNumber" type="number" max="30" min="1" placeholder="1">
          </div>
          <div class="buy-btn-div">
              <span class="buy-btn">立即购买</span>
          <span class="shop-cart-btn" @click="pushShopCart">加入购物车</span>
          </div>
          <div>你选择的参数:{{specData.proper.spec0.check}} {{specData.proper.spec1.check}} {{specData.proper.spec2.check}} {{specData.proper.spec3.check}}{{goodsNumber}}</div>
      </div>
    </div>
</template>
<script>
  import jQuery from 'jquery';
  import {ajax} from '../lib/libSpace'
    export default{
        data(){
            return{
                goodsName: "【华为官方】HuaWei/华为 P9 plus全网通5.5英寸4G智能手机",
                goodsSubtitle: "买就送 TypeC 数据线 1200万 双摄像头",
                urlGoodsPHP: 'http://localhost/P9Vue/static/PHP/goodsShow.php',
                urlShopCart: 'http://localhost/P9Vue/static/PHP/shopCart.php',
                goodsNumber: 1,
                specData: {
                    "goodsID": "",
                    "goodsName": "",
                    "price": "",
                    "stock": "",
                    "monthlySales": "",
                    "evaluate": "",
                    "img0": null,
                    "img1": null,
                    "img2": null,
                    "img3": null,
                    "img4": null,
                    "proper": {
                        "spec0":{"displayName":"","parameter":"","check":"全网通"},
                        "spec1":{"displayName":"","parameter":"","check":"128GB"},
                        "spec2":{"displayName":"","parameter":"","check":"琥珀灰"},
                        "spec3":{"displayName":"","parameter":"","check":"官方标配"}
                    },
                    "propertyId": "1"
                },
//                testData: {
//                    "proper": {
//                        "spec0":{"name":"网络","parameter":["s0p0","s0p1"],"spec":"s0p1"},
//                        "spec1":{"name":"容量","parameter":["s1p0","s1p1","s1p2"],"spec":"s1p1"},
//                        "spec2":{"name":"颜色","parameter":["s3p0"],"spec":"s2p0"}
//                    }
//                },
                selectFlag: false
            }
        },
        methods: {
            /*初始化页面后,显示默认选择的商品信息*/
            specInit:function () {
                //初始化默认选择商品,并显示该商品信息
                let self = this;
                let ajaxData = {};
                for (let keyName in self.specData.proper){
                    ajaxData[keyName] = self.specData.proper[keyName].check;
                }
                jQuery.extend(ajaxData, {"ready": "ok"},{"propertyId": self.specData.propertyId});
                let success = function(getData){
                    if(getData){
                        for(let keyName in getData){
                            if(keyName.indexOf('spec') != 0){
                                if(keyName == 'proper'){
                                    for(let key0 in getData.proper){
                                        self.specData.proper[key0].displayName = getData.proper[key0].displayName;
                                        self.specData.proper[key0].parameter = getData.proper[key0].parameter;
                                    }
                                }else {
                                    self.specData[keyName] = getData[keyName]
                                }
                            }
                        }
                        self.sendGoodsID(self.specData.goodsID);
                        self.storeGoodsID(self.specData.goodsID);
                    }else {
                        self.specData.goodsID = null;
                        self.sendGoodsID(0);
                        self.storeGoodsID(0);
                    }
                };
                ajax(self.urlGoodsPHP,ajaxData,success);
            },
            /*取得选择的商品规格函数*/
            getSpec: function () {
                let self = this;
                let ajaxData = {};
                for (let keyName in self.specData.proper){
                    ajaxData[keyName] = self.specData.proper[keyName].check;
                }
                jQuery.extend(ajaxData, {"specFlag": "ok"},{"propertyId": self.specData.propertyId});
                let success = function(getData){
                    if(getData){
                        for(let keyName in getData){
                            if(keyName.indexOf('spec') != 0 && keyName.indexOf('proper') !=0){
                                self.specData[keyName] = getData[keyName];
                            }
                            if(keyName.indexOf('spec') == 0){
                                self.specData.proper[keyName].check = getData[keyName]
                            }
                        }
                        self.sendGoodsID(self.specData.goodsID);
                        self.storeGoodsID(self.specData.goodsID);
                    }else{
                        for(let keyName in self.specData){
                            if(keyName.indexOf('proper') != 0 && keyName.indexOf('price') != 0){
                                self.specData[keyName] = null;
                            }
                            if(keyName.indexOf('price') == 0){
                                self.specData[keyName] = '无记录';
                            }
                        }
                        self.sendGoodsID(0);
                        self.storeGoodsID(0);
                    }
                };
                ajax(self.urlGoodsPHP,ajaxData,success);
            },
            /*点选参数后改变选择的商品*/
            selectedParameter: function(event){
                //先判断是否点击label之前有选中,选中就不要变色
                if (jQuery(event.target).parent().hasClass('selected')) {
                    return;
                }
                jQuery('.spec-radio').parent().removeClass('selected');
                jQuery('.spec-radio:checked').parent().addClass('selected');
            },
            /*点击加入购物车方法*/
            pushShopCart: function(){
                let self = this;
                let ajaxData = {shopCartFlag: "pushShopCart", goodsNumber: self.goodsNumber};
                let success = function(data){
                    if (data.result == 'fail') {
                        alert("请登录");
                    }
                };
                ajax(self.urlShopCart,ajaxData,success);
            },
            /*发送该组件选择的商品ID给父组件,自定义事件*/
            sendGoodsID: function(goodsID){
                this.$emit('sendGoodsID',goodsID);
            },
            /*储存初始化及选取后的商品ID*/
            storeGoodsID: function(goodsID){
                this.$store.commit('changeGoodsID',goodsID)
            },
            testAlert: function(obj){
                alert(obj)
            }
        },
        watch: {
            testData0: function(){
                alert('change')
            }
        },
        created: function(){
            this.specInit();
        }
    }
</script>
<style>
    h1,h2,h3,h4,h5,h6{
        margin: 1rem 0 1rem 0;
    }
    h6{
        font-weight: normal;
    }
    .goods-price_freight{
        margin: 1rem auto 1rem 1rem;
    }
    .goods-price{
        font-size: 3rem;
    }
    .goods-freight{
        font-size: 2rem;
    }
    .sales-status-show{
        text-align: left;
        font-size: 1rem;
        padding: 0;
    }
    .sales-status-show li{
        display: inline-block;
        width: 8rem;
        border: 1px solid red;
        background-color: aqua;
    }
    .goods-spec-choice-div{
        font-size: 2rem;
        line-height: 2.5rem;
        margin: 0.5rem auto 0.5rem auto;
    }
    .goods-spec-choice-div:after{
        content: "";
        display: block;
        clear: both;
    }
    .goods-spec-choice{
        float: left;
        margin-right: 1rem;
    }
    .goods-spec-choice-div ul{
        line-height: 2.5rem;
        vertical-align: middle;
    }
    .goods-spec-choice-div li,.goods-spec-choice-div input{
        font-size: 1.5rem;
        background-color: aqua;
        float: left;
        margin-right: 1rem;
        border: 1px solid red;
    }
    .goods-spec-choice-div input{
        width: 5rem;
    }
    #number-input{
        display: inline-block;
    }
    /*全部用label代替商品规格选择div*/
    .goods-spec-choice-div input{
        display: none;
    }
    .goods-spec-choice-div label{
        font-size: 1.5rem;
        background-color: aqua;
        margin-right: 0.5rem;
        border: 1px solid red;
    }
    .selected{
        color: red;
    }
    .cursor-hand{
        cursor: pointer;
    }
    /*购买按键*/
    .buy-btn-div{
        font-size: 2rem;
    }
    .buy-btn,.shop-cart-btn{
        display: inline-block;
        height: 3rem;
        width: 12rem;
        background-color: red;
        border-radius: 0.5rem;
        text-align: center;
        line-height: 3rem;
        box-shadow: 3px 3px rgba(255,0,0,0.5);
    }
    .buy-btn:hover,.shop-cart-btn:hover{
        background-color: rgba(0,255,0,1);
        box-shadow: 3px 3px rgba(0,255,0,0.5);
        cursor: pointer;
    }
    .buy-btn:active,.shop-cart-btn:active{
        background-color: inherit;
        cursor: pointer;
    }
</style>