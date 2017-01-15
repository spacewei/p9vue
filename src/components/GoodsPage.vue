<template>
  <div class="goods-page">
    <div class="detail center-all">
      <pic></pic>
      <section class="goods-detail">
        <good-spec v-on:sendGoodsID="getGoodsID"></good-spec>
        <!--<div>{{goodsID}}</div>-->
        <div>goodsID:{{this.$store.state.goodsID}}</div>
        <div>userID:{{this.$store.state.userID}}</div>
        <!--<service-promise></service-promise>-->
      </section>
    </div>
    <footer>
    </footer>
  </div>
</template>
<script>
  import jQuery from 'jquery';
  import Pic from './Pic.vue'
  import GoodSpec from './GoodSpec.vue'
    export default{
      name: 'goods-page',
      data(){
        return {
          goodsID: 0
        }
      },
      components: {
        Pic,
        GoodSpec
      },
      methods: {
        getGoodsID: function (data) {
          this.goodsID = data;
        }
      }
    }
</script>
<style>
  .detail{
    position: relative;
  }
  .goods-detail{
    margin-left: 450px;
  }
</style>
