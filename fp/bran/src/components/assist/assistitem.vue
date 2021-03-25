<template>
  <div class="capital-content mt-12 bg-ffffff">
    <div class="list-header clearfix" style="padding-bottom: 0">
      <badge text="众筹" v-if="item.userType===2" class="f_r f-12 badge-green"></badge>
      <badge text="代发求助" v-if="item.user_relation==='12'" class="f_r f-12 badge-orange"></badge>
      <badge text="个人求助" v-if="item.user_relation!=='12'" class="f_r f-12 badge-orange"></badge>
      <badge text="已审核" class="f_r f-12 badge-orange" style="margin-right:3px"></badge>

      <!-- <img class="v-middle dis-inline bd-radius-cir"  :src="item.user_pic" width="30"> -->
      <avatar :image="item.user_pic" :name="item.aideder_name" tsize="1" width="36" height="36"
              style="float: left;margin-top: 3px"/>
      <span class="tit-nowrap color-333 f-15" style="padding-left: 10px">{{item.aideder_name == null? item.user_name : item.aideder_name}}</span>
      <div class="address color-999">
        <p class="f-12 text-justify"><i class="fa fa-map-marker  f-14" style="color:#d0d0d0"></i>{{item.region_name}}
        </p>
      </div>
    </div>
    <div class="list-content" @click="todetail(item)">
      <div class="flex-tab">
        <div class="flex-tab-cell tab-left linkonly">
         <img v-lazy="item.img_url? getmidpic(item.img_url): getmidpic(item.image)" width="110" height="85">
          <!-- <img :src='changetype(item.img_url)' width="90" height="90"> -->
        </div>
        <div class="flex-tab-cell tab-right" v-if='item.demand_type == 1'>
          <h2 class="color-333 f-15 tit-2row-nowrap dem-tit">{{item.demand_title}}</h2>
          <div class="color-333 f-14 tit-2row-nowrap mt-15">{{item.demand_coment}}</div>
        </div>
        <div class="flex-tab-cell tab-right" v-else>
          <h2 class="color-333 f-15 tit-2row-nowrap dem-tit" style="height:40px;">{{item.demand_title}}</h2>
          <!-- <div class="color-999 f-12 tit-2row-nowrap mt-10" style="line-height: 14px;">{{item.demand_coment}}</div > -->
          <!-- <range class="range-spe dem-rang" v-if="item" :value="item.moneycount/item.target_amount*100" disabled :rangeBarHeight="4" ></range> -->
          <Progresss :proge="Number(item.speed)" style="margin-top:10px;"></Progresss>
          <!-- <Progresss proge="100.0" style="margin-top:10px;"></Progresss> -->
          <p class="f-14 color-333 dem-ext clearfix">
            <span class="f_l">目标：<em
              class="color-orange">{{item.targetMount? item.targetMount : item.target_amount}}</em> 元</span>
            <span class="f_r">已筹：<em class="color-orange">{{item.moneyCount? item.moneyCount : item.moneycount}}</em> 元</span>
            <!--<span>支持次数: <em class="color-orange">{{item.donatecount}}</em>次</span>-->
          </p>
        </div>
      </div>
      <!--需求下方便签，例如物品需求（#农用设备），医疗需求（#癌症）-->
      <!--div class="tag flex-tab">
        <div class="flex-tab-cell tableft"></div>
        <div class="flex-tab-cell tabright">
              <div class="tagcon f-12 color-orange">
                <span>#重大疾病</span><span>#白内障</span>
              </div>
        </div>
      </div -->
    </div>
  </div>

</template>

<script>
  import {XHeader, Badge, Range} from 'vux'
  import Avatar from '../util/avatar'
  import Progresss from '@/components/prog/Progress'
import { getMidPic } from "@/util/getMid";
  export default {
    name: 'assistitem',
    components: {Avatar, XHeader, Badge, Range, Progresss},
    // props:{
    //     item:{
    //       type:Object,
    //       default:null
    //     }
    // },
    props: ['item', 'type'],
    data() {
      return {
        data1: 50,
        itemdata: null
      }
    },
  
    methods: {
      changetype(item){
       return getMinPic(item.img_url)? getMinPic(item.img_url): getMinPic(item.image)
      },
      total(moneycount, target_amount) {
        return moneycount / target_amount * 100
      },
         getmidpic(imgurl){
    return getMidPic(imgurl)
    },
      todetail(item) {
        let id
        if (item.demend_code) {
          id = item.demend_code;
        }
         else {
          id = item.id;
        }
        this.$router.push('/loveNeed/' + id);
      },
      getRate() {
        if (this.item.moneyCount) {
          let num = this.item.moneyCount / this.item.targetMount * 100
       
          let fixNum = new Number(num).toFixed(1);//四舍五入之前加1  
          return parseInt(fixNum*10)/10
        }else if (this.item.moneycount && this.item.moneycount !== 0) {
              let num = this.item.moneycount / this.item.target_amount * 100
         // let fixNum = new Number(num).toFixed(1);//四舍五入之前加1  
        
          return parseInt(num*10)/10
        }else {
            return 0
        }
      }
   
    }
  }
</script>

<style scoped>
  .tag .tableft{width: 120px}
  .tag .tagcon{padding-top:8px;border-top:1px solid #eee}
  .tag .tagcon span{padding-right:12px}
  .tag .tagcon span:last-child{padding-right: 0}

  .list-header {
    padding: 10px 15px
  }

  .list-content {
    padding: 10px 15px
  }

  .list-content .tab-left {
    width: 120px
  }

  .list-content .tab-right {
    position: relative
  }

  .list-content .tab-right h1 {
    line-height: 130%;
  }

  .list-content .tab-right p {
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0
  }

  /* .list-content .tab-right p span{padding-right: 10px;} */
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

  .address {
    margin-left: 45px
  }

  .address p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .address p i {
    margin-right: 3px
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
    bottom: 24px;
    left: 0;
    right: 0
  }

  .dem-tit {
    margin-top: -3px;
    line-height: 130%
  }

  .dem-ext {
    line-height: 130%;
    bottom: 0
  }

</style>
