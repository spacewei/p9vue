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
            <template v-for="shopCartItem in shopCartItems">
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
                        <button class='delete-this-goods' @click="deleteThisGoods(shopCartItem)">删除商品</button>
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
                        //先限制成浮点数,再计算每件商品的价格(存入时已计算,现取消)
//                            let x = parseFloat(dataObj.price);
//                            let y = parseInt(dataObj.goodsNumber);
//                            self.rowTotal = x * y;
                        //累加商品金额
                        self.total = (parseFloat(self.total) + parseFloat(dataObj.rowTotal));
                        //限制购物车总金额为两位小数
                        self.total = parseFloat(self.total).toFixed(2);
                        //累加商品数量
                        self.numberAll = parseInt(self.numberAll) + parseInt(dataObj.goodsNumber);
                    }
                };
                ajax(self.shopCartPHPUrl,sendData,success);
                //绑定登录后刷新页面
                jQuery('#login-btn').on('click', function () {
                    window.location.reload();
                });
                //绑定退出后刷新页面
                jQuery('.login-off').on('click', function () {
                    window.location.reload();
                })
            },
            deleteThisGoods: function (shopCartItem) {
                this.deleteGoodsID = shopCartItem.goodsID;
                let sendData = {
                    shopCartFlag: "deleteGoodsClass",
                    thisGoodsID: this.deleteGoodsID
                };
//                let success = function(){
//                    shopCartItem.goodsID = false;
//                };
//                shopCartItem.goodsID = false;
                ajax(this.shopCartPHPUrl,sendData);
                shopCartItem.goodsID = false;
            }
        },
        created: function(){
            this.initShopCart();
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