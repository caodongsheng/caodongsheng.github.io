<template lang="html">
  <div class="bg-f6f5f6">
    <div class="mt-10" v-for="(item,index) in helpdata" :key="index" @click="goitem(index+1)">
      <div class="panel-box">
        <cell :title="item.help_type_name" value="更多" :link="item.link_url" is-link>

          <img slot="icon"  style="width:22px;display:block;margin-right:5px;"
               :src="item.icon_url"/>
        </cell>
        <router-link v-if="item.banner_link_url!=null" :to="item.banner_link_url" class="adimg">
          <img :src="item.banner_pic_url">
        </router-link>
        <a class="adimg" v-else>
          <img :src="item.banner_pic_url">
        </a>

<!--有报错先注释-->

        <div class="scrollswiper-wrap">
          <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
            <!-- 轮播con -->
            <swiper-slide v-for="(option,index) in item.recommendList" :key="index">

              <router-link to="" @click.native="todetail({name:'loveNeed',params:{id:option.demand_id}},item.help_type_name)" class="boxlist-item" :class="{'firstMargin':index==0}">

                <div class="listitem-user">

                  <avatar  :image="option.user_pic" :name="option.aideder_name" class="img" width="20" height="20"></avatar>
                  <span class="f-12">{{option.aideder_name}}</span><!--用户名称-->
                </div>
                <img v-lazy="getmidpic(option.cover_pic)" class="listitem-img"><!--轮播图-->
                <h1 class="f-12 f-bold tit-nowrap tit-marginBottom" v-if="item.help_type_code!=='4'">{{option.demand_title?option.demand_title:option.re_desc}}</h1>
                <p class="labelarea" v-if="item.help_type_code=='4'">
                  <span class="list-label dis-block tit-nowrap" >{{option.demand_title}}</span>
                </p>
                <Progresss v-if="proshow && item.help_type_code!=='4'" :proge="Number(option.speed).toFixed()" style="margin:5px 0;"></Progresss>
                <p class="clearfix tit-margin" v-if="item.help_type_code!=='4'">
                  <span class="f_l f-12" >已筹<em class="color-orange f-15 font-spe">{{option.moneycount}}</em>元</span>
                  <!-- <span class="f_r f-12 rang-data">{{option.advance}}%</span> -->
                </p>
                <h1 class="f-12 f-bold tit-nowrap" v-if="item.help_type_code=='4'"><em v-for="item in option.cateList">{{item}}</em></h1>
                

              </router-link>

            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, XButton, Range } from "vux";
import Progresss from "@/components/prog/Progress";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import avatar from "@/components/util/avatar";
import { defaultCoreCipherList } from "constants";
  import {getMinPic} from '@/util/getMin'
 import { getMidPic } from "@/util/getMid";

let Vue;
export default {
  name: "bfmodel",
  components: { swiper, swiperSlide, Cell, XButton, Range, avatar, Progresss },
  data() {
    return {
      proshow: "",
      boxlist: [],
      swiperOption: {
        // notNextTick: true,
        slidesPerView: 2.2,
        freeMode: true,
        freeModeMinimumVelocity: 0,
        passiveListeners: false,
        updateOnImagesReady: true,
        on: {
          imagesReady() {
            Vue.proshow = true;
          },
          // reachBeginning() {
          //   //swiper 第一张执行
          // },
          // reachEnd() {
          //   //swiper 最后一张执行
          // },
          touchMoveOpposite(e) {
            window.vm.$store.state.navflag = true;
          },
          sliderMove(e) {
            window.vm.$store.state.navflag = false;
          },
          touchEnd(e) {
            // e.stopPropagation();
            // e.cancelBubble = true;
            window.vm.$store.state.navflag = true;
          }
        }
      }
    };
  },
  props: ["helpdata"],
  mounted() {
    Vue = this;
  },
  computed: {
  
  },
  methods: {
    // getAllBangfuInfo(){
    //
    // }
   
    getmidpic(imgurl){
    return getMidPic(imgurl)
    },
    goitem(index) {
      this.$store.state.nav_index = index;
    },
    todetail(pathobj, title) {
      if (window.api) {
        let umAnalysis = api.require("umAnalysis");
        let eventid = "";
        let id = pathobj.params.id;
        switch (title) {
          case "教育帮扶":
            eventid = "bannnerofrecomtoedudetail";
            break;
          case "健康帮扶":
            eventid = "bannnerofrecomtomedicialdetail";
            break;
          case "住房帮扶":
            eventid = "bannnerofrecomtohousedetail";
            break;
          case "物品帮扶":
            eventid = "bannnerofrecomtogoodsdetail";
            break;
          default:
            break;
        }
        umAnalysis.onEventJson(
          {
            eventid: eventid,
            eAttribute: {
              id: id
            }
          },
          function(ret, err) {
            // api.toast({
            //   msg: JSON.stringify(ret)
            // });
          }
        );
      }
      this.$router.push(pathobj);
    }
  }
};
</script>

<style scoped>
.vux-flexbox-item {
  margin-left: 0 !important;
}

.weui-cell {
  padding: 20px 15px;
}

.weui-cell >>> .vux-label {
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 3px;
  color: #333;
}

.weui-cell >>> .weui-cell__ft {
  font-size: 12px;
}

.scrollswiper-wrap {
  padding: 0 0 12px 0;
  background: #fff;
}

.scrollswiper-wrap >>> .swiper-container {
  padding-right: 15px;
}

.scrollswiper-wrap >>> .swiper-slide {
  padding: 1px 0;
}

.scrollswiper-wrap a {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: block;
  overflow: hidden;
  margin-left: 12px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  padding: 7px;
  color: #666;
  border-radius: 5px;
}
.scrollswiper-wrap a.firstMargin{
  margin-left: 15px;
}

.scrollswiper-wrap a em {
  display: inline-block;
  padding: 0 3px;
}

.scrollswiper-wrap a h1 {
  margin-bottom: 0px;
}

.listitem-img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 0px;
}

.rang-data {
  padding-top: 2px;
}
.listitem-user {
  padding-bottom: 8px;
}
.listitem-user img {
  display: inline-block;
  width: 30px;
  border-radius: 100%;
}
.listitem-user em {
  display: inline-block;
  width: 20px;
  height: 23px;
  background-color: red;
  border-radius: 50%;
  text-align: center;
  color: #fff;
}
.listitem-user span {
  vertical-align: top;
  padding-top: 2px;
  display: inline-block;
  padding-left: 0px;
}

/*进度条*/
.tit-margin{
  margin-top: 10px;
}
.tit-marginBottom{
  margin-top: -3px;
  margin-bottom: 10px;
}
.vux-range-input-box {
  padding: 8px 0;
  margin: 0 !important;
}

.vux-range-input-box >>> .range-max,
.vux-range-input-box >>> .range-min {
  display: none;
}

.vux-range-input-box >>> .range-bar-disabled {
  opacity: 1;
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
  height: 6px;
  border-radius: 6px;
}

/*标签部分 */
.labelarea {
  margin: 6px -4px 0 -4px;
}

.labelarea .list-label {
  padding: 0px 4px;
}

.labelarea .list-label em {
  display: inline-block;
  background: #fff;
  color: #ed6b2b;
  padding: 2px 5px;
  border-radius: 3px;
  border: 1px solid #ed6b2b;
}
.adimg{
  padding: 0 15px 13px 15px;
}
</style>
