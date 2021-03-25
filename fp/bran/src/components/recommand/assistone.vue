<template>
  <div class="capital-content bg-ffffff mt-12"  style="padding: 15px">
    <router-link :to="todetail(item)"  class="linkonly dis-block" style="position: relative;">
    <div class="list-content ">
      <div class="flex-tab">
        <div class="flex-tab-cell tab-left">
          <img v-lazy="getmidpic(item.img_url)" width="90" height="90">
        </div>
        <div class="flex-tab-cell tab-right">
          <h1 class="color-333 f-16 f-normal tit-2row-nowrap">{{item.demand_title}}</h1>
          <range class="range-spe" v-if="item" :value="item.moneycount/item.target_amount*100" disabled :rangeBarHeight="4" ></range>
          <p class="f-14 color-999" style="bottom: -4px">
            <span>目标：<em class="color-orange">{{item.target_amount}}</em> 元</span>
            <span>已筹：<em  class="color-orange">{{item.moneycount}}</em> 元</span>
          </p>
        </div>
      </div>
    </div>
    </router-link>
  </div>
</template>
<script>
  import { Range } from 'vux'
 import { getMidPic } from "@/util/getMid";

export default{
    name: 'assistone',
    components: { Range },
    data () {
      return {

      }
    },
    props: {
      item: {
        type: Object,
        default: null
      }
    },
    methods: {
      todetail (item) {
        return '/loveNeed/' + item.id
      },
        getmidpic(imgurl){
    return getMidPic(imgurl)
    },
    }

}
</script>
<style scoped>

.list-content .tab-left{width: 100px;text-align:left}
.list-content .tab-right{position: relative}
.list-content .tab-right h1{line-height: 130%;text-align:left}
.list-content .tab-right p{position: absolute;bottom: 0}
.list-content .tab-right p span{padding-right: 10px;}


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
.range-spe{position: absolute!important;bottom: 25px;left:0;right:0}
</style>
