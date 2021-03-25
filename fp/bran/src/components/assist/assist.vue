<template>
  <div>

    <div class="capital-content mt-10 bg-ffffff" v-for="item in demandlist" :key="item.id">
        <router-link :to="'/loveNeed/'+item.id">
        <div class="list-header clearfix">
          <!-- <badge text="众筹" v-if="item.userType==='众筹'" class="f_r f-12 badge-green"></badge>-->
          <badge text="贫困户" v-if="item.userType==='贫困户'" class="f_r f-12 badge-red"></badge>
          <badge text="个人" v-if="'个人'==='个人'" class="f_r f-12 badge-orange"></badge>
          <img class="v-middle bd-radius-cir dis-inline" :src="item.user_pic" width="30">
          <span class="tit-nowrap color-999 f-16">{{item.aideder_name}}</span>
        </div>
        <div class="list-content">
          <div class="flex-tab">
            <div class="flex-tab-cell tab-left">
              <img :src="item.img_url" width="90" height="90" alt="用户未上传图片">
            </div>
            <div class="flex-tab-cell tab-right">
              <h1 class="color-333 f-14 tit-2row-nowrap">{{item.demand_title}}</h1>
              <range class="range-spe" v-if="item" :value="item.advance" disabled
                     :rangeBarHeight="4"></range>
              <p class="f-14 color-999">
                <span>目标：<em class="color-orange">{{item.target_amount}}</em> 元</span>
                <span>已筹：<em class="color-orange">{{item.moneycount}}</em> 元</span>
              </p>
            </div>
          </div>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
  import {XHeader, Badge, Range} from 'vux'

  import assistitem from "./assistitem"
  export default {
    name: 'record_capital_detail',

    components: {XHeader, Badge, Range},
    props: ['demandlist'],
    data () {
      return {
        data1: 50
      }
    },
    methods: {
      total (moneycount, target_amount) {
        return moneycount / target_amount * 100
      }
    }
  }
</script>

<style scoped>
  .list-header {
    padding: 10px 15px 5px
  }

  .list-content {
    padding: 10px 15px
  }

  .list-content .tab-left {
    width: 100px
  }

  .list-content .tab-right {
    position: relative
  }

  .list-content .tab-right h1 {
    line-height: 130%;
  }

  .list-content .tab-right p {
    position: absolute;
    bottom: 0
  }

  .list-content .tab-right p span {
    padding-right: 10px;
  }

  .list-info .list-info-header {
    padding: 10px 15px 10px 120px;
    border-bottom: 1px solid #eee
  }

  .list-info-header a {
    color: #ed6b2b;
    padding: 5px;
  }

  .list-info .list-info-content {
    padding: 10px 15px 10px;
    position: relative
  }

  .list-state {
    padding: 13px 15px;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0
  }

  .list-state .btn-bordered {
    margin-right: 10px
  }

  .list-state .btn-bordered.btn-bordered-orange {
    margin-right: 0
  }

  .list-header .vux-badge {
    margin-top: 5px
  }

  .list-info-content ul li {
    padding: 4px 0
  }

  .btn-copy {
    display: inline-block;
    position: absolute;
    right: 15px;
    top: 20px;
    border: 1px solid #ddd;
    padding: 1px 10px
  }

  /*进度条*/

  .vux-range-input-box {
    padding: 8px 0;
    margin: 0 !important
  }

  .vux-range-input-box >>> .range-max, .vux-range-input-box >>> .range-min {
    display: none
  }

  .vux-range-input-box >>> .range-bar-disabled {
    opacity: 1
  }

  .vux-range-input-box >>> .range-handle {
    background-color: #f8711a;
    cursor: move;
    height: 10px;
    left: 0;
    position: absolute;
    width: 20px;
    border-radius: 2px;
    top: -3px !important;
    box-shadow: none;

  }

  .vux-range-input-box >>> .range-quantity {
    background-color: #f15717;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .vux-range-input-box >>> .range-bar {
    background-color: #e6e6e6;
  }

  .range-spe {
    position: absolute !important;
    bottom: 30px;
    left: 0;
    right: 0
  }
</style>
