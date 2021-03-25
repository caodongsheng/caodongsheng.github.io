<template>
  <div>
    <x-header :left-options="{backText: ''}">商品收藏<a v-if="collectionlist.length>0" slot="right" class="color-orange f-16" @click="isManager=!isManager">管理</a></x-header>
    <div class="over-auto bg-f6f5f6"  :class="isManager?'box-withbar':'box-withheader'">
      <!--if没有任何收藏（当收藏为空时显示否则不显示）-->
      <div v-if="collectionlist.length==0" class="nocontent f-14 color-999 text-center" style="padding: 30px 15px">
        <img class="dis-block" src="../../../static/appimg/no-content.png" style="width:90px;margin:0 auto">
        <p style="margin-top: 15px">您还没有收藏任何商品</p>
      </div>

      <!--elseif存在收藏列表时显示-->
      <div class="collectionlist" :class="isManager?'manager':''">
        <div class="collectionlist-item  mb-12">
          <div class="item-wrap">
          <!--头部信息-->
          <div class="header">
            <div class="clearfix baseinfo">
              <router-link  to=""  class="tit-nowrap store"><i class="fa fa-shopping-cart color-orange f-14" style="padding-right: 8px"></i>湖南省江永县扶贫专营店</router-link>
            </div>
          </div>

          <!--多选按钮-->
          <check-icon :value.sync="demo1" class="checkicon"></check-icon>

          <!--商品信息-->
          <router-link to="" class="flex-tab goodsdetail">
            <div class="flex-tab-cell  tab-left linkonly">
              <img  src="../../../static/appimg/goods-img02.jpg" width="90" height="90">
            </div>
            <div class="flex-tab-cell goodsdes">
              <p class="tit-2row-nowrap">楼兰蜜语：一级红枣一等核桃山区直供一级红枣一等核桃山区直</p>
              <div class="price">
                价格：<span class="color-red f-bold">¥52.00</span>
              </div>
            </div>
          </router-link>
          </div>
        </div>


        <div class="collectionlist-item  mb-12">
          <div class="item-wrap">
          <!--头部信息-->
          <div class="header">
            <div class="clearfix baseinfo">
              <router-link  to=""  class="tit-nowrap store"><i class="fa fa-shopping-cart color-orange f-14" style="padding-right: 8px"></i>湖南省江永县扶贫专营店</router-link>
            </div>
          </div>
          <!--多选按钮-->
          <check-icon :value.sync="demo2" class="checkicon"></check-icon>
          <!--商品信息-->
          <router-link to="" class="flex-tab goodsdetail">
            <div class="flex-tab-cell  tab-left linkonly">
              <img  src="../../../static/appimg/goods-img01.jpg" width="90" height="90">
            </div>
            <div class="flex-tab-cell goodsdes">
              <p class="tit-2row-nowrap">楼兰蜜语：一级红枣一等核桃山区直供一级红枣一等核桃山区直</p>
              <div class="price">
                价格：<span class="color-red f-bold">¥52.00</span>
              </div>
            </div>
          </router-link>
          </div>
        </div>

      </div>
    </div>
    <!--底部全选-->
    <div class="fix-bottom btm-checkall clearfix bg-ffffff"  v-if="isManager&&collectionlist.length>0">
      <check-icon :value.sync="isAllChecked"  class="f_l" @click.native="checkedAll">全选</check-icon>
      <router-link to="" class="btmopebtn f-16 text-center color-white"  @click.native="delList">删除</router-link>
    </div>
  </div>
</template>

<script>
  import {XHeader,CheckIcon} from 'vux'
  export default {
    components: {XHeader, CheckIcon},
    data() {
      return {
        collectionlist:[1,2],
        isManager:false,
        demo1:true,
        demo2:false,
        isAllChecked:false
      }
    },
    methods:{
      // 全选
      checkedAll () {
      },
      // 删除
      delList(){

      }
    }
  }
</script>

<style  lang="less"  scoped>
  .collectionlist{
  .collectionlist-item{
    background: #fff;
    padding: 15px;
    font-size: 14px;
    overflow: hidden;
    .item-wrap{
      transition: all 0.5s;
    }
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
      padding: 12px 0 0 0;
      .tab-left{width:100px;height:90px}
      p{
        height:46px;overflow: hidden;
      }
      .goodsdes{
        position: relative;
        .price{
          position: absolute;
          left: 0;bottom: 0;
        }
      }

    }
  }
  &.manager{
    .item-wrap{
      transform: translate(35px, 0px);
      transition: all 0.5s;
    }
    .checkicon {
      display: block
    }
  }
    .checkicon {
      position: absolute;
      left: -40px;
      top: 50%;
      transform: translate(0, -50%);
      display: none;
    }
  }

  /*选中状态*/

  .vux-check-icon/deep/ .weui-icon-success:before, .vux-check-icon /deep/ .weui-icon-success-circle:before {
    color: #fd8b2a
  }

  /*显示底部全选*/
  .btm-checkall {
    padding: 13px;
    border-top: 1px solid #eee;
    box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.15);
  }

  .btmopebtn {
    height: 53px;
    line-height: 53px;
    padding: 0 50px;
    background: #ff6902;
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0
  }

</style>
