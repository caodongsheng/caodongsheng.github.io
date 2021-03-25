<template>
  <div>
    <x-header :left-options="{backText: ''}">商城订单</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <!--if没有任何订单（当订单为空时显示否则不显示）-->
      <div v-if="orderlist.length==0" class="nocontent f-14 color-999 text-center" style="padding: 30px 15px">
        <img class="dis-block" src="../../../static/appimg/no-content.png" style="width:90px;margin:0 auto">
        <p style="margin-top: 15px">您还没有任何订单</p>
      </div>

      <!--elseif存在订单列表时显示-->
      <div class="orderlist">
        <div class="orderlist-item  mb-12">
          <!--头部信息-->
          <div class="header">
            <p><span class="color-999">订单号：</span>201811192203701</p>
            <div class="clearfix baseinfo">
              <router-link  to=""  class="tit-nowrap store"><i class="fa fa-shopping-cart color-orange f-14" style="padding-right: 8px"></i>湖南省江永县扶贫专营店</router-link>
              <span class="data color-red">等待发货</span>
            </div>
          </div>
          <!--商品信息-->
          <router-link to="" class="flex-tab goodsdetail">
              <div class="flex-tab-cell  tab-left linkonly">
                <img  src="../../../static/appimg/goods-img02.jpg" width="90" height="90">
              </div>
            <div class="flex-tab-cell goodsdes">
              <p class="tit-2row-nowrap">楼兰蜜语：一级红枣一等核桃山区直供一级红枣一等核桃山区直</p>
              <router-link to="" class="opearea">再次购买</router-link>
            </div>
          </router-link>
          <!--付款金额-->
          <div class="paymoney">
            实付款：<span class="color-red f-bold">¥52.00</span>
          </div>
        </div>


        <div class="orderlist-item  mb-12">
          <!--头部信息-->
          <div class="header">
            <p><span class="color-999">订单号：</span>201811192203701</p>
            <div class="clearfix baseinfo">
              <router-link  to=""  class="tit-nowrap store"><i class="fa fa-shopping-cart color-orange f-14" style="padding-right: 8px"></i>湖南省江永县扶贫专营店</router-link>
              <span class="data color-red">等待发货</span>
            </div>
          </div>
          <!--商品信息-->
          <router-link to="" class="flex-tab goodsdetail">
            <div class="flex-tab-cell  tab-left linkonly">
              <img  src="../../../static/appimg/goods-img01.jpg" width="90" height="90">
            </div>
            <div class="flex-tab-cell goodsdes">
              <p class="tit-2row-nowrap">楼兰蜜语：一级红枣一等核桃山区直供一级红枣一等核桃山区直</p>
              <router-link to="" class="opearea">再次购买</router-link>
            </div>
          </router-link>
          <!--付款金额-->
          <div class="paymoney">
            实付款：<span class="color-red f-bold">¥52.00</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  export default {
    components: {XHeader},
    data() {
      return {
        orderlist:[]
      }
    }
  }
</script>

<style  lang="less"  scoped>
.orderlist-item{
  background: #fff;
  padding: 15px;
  font-size: 14px;
  .header{
    border-bottom: 1px solid #eee;
    padding: 0 0 12px 0;
    p{margin-bottom: 10px}
    .baseinfo{
      position: relative;
      .store{padding-right:100px;display: block}
      .data{position: absolute;right:0;top:0}
    }

  }
  .goodsdetail{
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    .tab-left{width:100px;height:90px}
    p{
      height:46px;overflow: hidden;
    }
    .goodsdes{
      position: relative;
      .opearea{
        position: absolute;
        right: 0;bottom: 0;
        display: block;
        padding: 3px 10px;
        border:1px solid #e42626;
        color:#e42626;
        border-radius: 3px;
      }
    }

  }

  .paymoney{padding-top:12px}
}
</style>
