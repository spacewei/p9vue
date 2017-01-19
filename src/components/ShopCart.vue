<template>
    <div class="shop-cart center-all">
        <div class="goods-total">购物车</div>
        <div class="cart-table">
            <div class="cart-tr table-title">
                <span class="cart-td is-check table-cell-title">
                    <label class="check-goods" for="check-all">全选</label>
                    <input id="check-all" type="checkbox">
                </span>
                <span class="cart-td goods-img table-cell-title">图片</span>
                <span class="cart-td goods-name table-cell-title">商品名称</span>
                <span class="cart-td price table-cell-title">单价</span>
                <span class="cart-td number table-cell-title">数量:{{numberAll}}</span>
                <span class="cart-td total-class table-cell-title">金额:{{total}}</span>
                <span class="cart-td handle table-cell-title">操作</span>
            </div>
            <template v-for="(shopCartItem,key) in shopCartItems">
                <div class="cart-tr" :id="'goodsID-'+shopCartItem.goodsID" v-if="shopCartItem.goodsID">
                    <span class="cart-td is-check table-cell-title">
                        <input class="check-this" type="checkbox">
                    </span>
                    <span class="cart-td goods-img table-cell-title">图片</span>
                    <span class="cart-td goods-name table-cell-title">{{shopCartItem.goodsName}}</span>
                    <span class="cart-td price table-cell-title">{{shopCartItem.price}}</span>
                    <span class="cart-td number table-cell-title">{{shopCartItem.goodsNumber}}</span>
                    <span class="cart-td total-class table-cell-title">{{shopCartItem.rowTotal}}</span>
                    <span class="cart-td handle table-cell-title">
                        <button class='delete-this-goods' @click="deleteThisGoods(shopCartItem,key)">删除商品</button>
                    </span>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import jQuery from 'jquery';
    import {ajax} from '../lib/libSpace'
    export default{
        data(){
            return{
                shopCartItems:[],
                numberAll:0,
                total:0,
                rowTotal: 0,
                shopCartPHPUrl: 'http://localhost/P9Vue/static/PHP/shopCart.php',
                deleteGoodsID: ''
            }
        },
        methods:{
            initShopCart: function(){
                let self = this;
                let sendData = {shopCartFlag: "initShopCart"};
                let success = function(data){
                    if (data.result == "fail") {
                        alert("请登录");
                        return;
                    }
                    for (let key in data) {
                        //转换数组中每个json字符串为js object
                        let dataObj = JSON.parse(data[key]);
                        self.shopCartItems.push(dataObj);
                        //累加商品金额
                        self.total = (parseFloat(self.total) + parseFloat(dataObj.rowTotal));
                        //限制购物车总金额为两位小数
                        self.total = parseFloat(self.total).toFixed(2);
                        //累加商品数量
                        self.numberAll = parseInt(self.numberAll) + parseInt(dataObj.goodsNumber);
                    }
                };
                ajax(self.shopCartPHPUrl,sendData,success);
            },
            deleteThisGoods: function (shopCartItem,key) {
//                console.log("删除前:"+this.shopCartItems);
                let self = this;
                this.deleteGoodsID = shopCartItem.goodsID;
                let sendData = {
                    shopCartFlag: "deleteGoodsClass",
                    thisGoodsID: this.deleteGoodsID
                };
                let success = function(data){
                    if(data){
                        self.shopCartItems.splice(key,1);
                    }
//                    console.log("删除后:"+self.shopCartItems);
                };
                ajax(this.shopCartPHPUrl,sendData,success);
            },
            reloadShopCart: function(){
                if(this.$store.state.userID){
                    window.location.reload();
                }
            }
        },
        created: function(){
            this.initShopCart();
        },
        watch: {
            shopCartItems: {
                handler: function(){
                    let total = 0;
                    let numberAll = 0;
                    for (let item in this.shopCartItems){
                        total = parseFloat(this.shopCartItems[item].rowTotal) + parseFloat(total);
                        numberAll = parseInt(this.shopCartItems[item].goodsNumber) + parseInt(numberAll);
                    }
                    this.total = parseFloat(total).toFixed(2);
                    this.numberAll = parseInt(numberAll);
                },
                deep: true
            }
        }
    }
</script>
<style>
    .goods-total{
        text-align: center;
    }
    /*表格样式*/
    /*只让chrome显示样式*/
    @media all and (min-width: 0){
        .cart-table{
            display: flex;
            flex-direction: column;
            width: 70rem;
        }
        .cart-tr{
            display: flex;
            justify-content: space-around;
            text-align: center;
        }
        .cart-td{
            border: 1px red solid;
        }
        .is-check{
            flex: 1 0 4rem;
        }
        .goods-img{
            flex: 2 0 8rem;
        }
        .goods-name{
            flex: 3 0 12rem;
        }
        .price{
            flex: 2 0 6rem;
        }
        .number{
            flex: 1 0 4rem;
        }
        .total-class{
            flex: 2 0 8rem;
        }
        .handle{
            flex: 1 0 4rem;
        }
    }
    /*只让火狐显示样式*/
    @-moz-document url-prefix(){
        .cart-table{
            display: table;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        .cart-tr{
            display: table-row;
            height: 5rem;
            position: relative;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        .cart-td{
            display: table-cell;
        }
    }
</style>