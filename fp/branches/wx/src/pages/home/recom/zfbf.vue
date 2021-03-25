<template>
  <div class="panel-box">
    <cell title="住房帮扶" value="更多" is-link>
      <img slot="icon" width="20" style="display:block;margin-right:5px;"
           src="../../../common/images/rec-icon-zfbf.png"/>
    </cell>
    <router-link :to="{}" class="adimg"><img src="../../../common/images/rec-zfbf-ad01.jpg"></router-link>
    <div class="scrollswiper-wrap">
      <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
        <!-- 轮播con -->
        <swiper-slide v-for="(item,index) in boxlist" :key="index">
          <router-link :to="item.url"  class="boxlist-item">
            <div class="listitem-user">
              <img :src="item.userphoto">
              <span class="f-14">{{item.name}}</span>
            </div>
            <img :src="item.img" class="listitem-img">
            <h1 class="f-14 f-bold tit-nowrap">{{item.title}}</h1>
            <range v-model="item.data" disabled :rangeBarHeight="4"></range>
            <p class="clearfix">
              <span class="f_l f-12">已筹<em class="color-orange f-18">{{item.raised}}</em>元</span>
              <span class="f_r f-12 rang-data">{{item.data}}%</span>
            </p>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>

  </div>
</template>

<script>
  import {Cell, XButton, Range} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  const boxlist = [{
    url: '',
    userphoto: './static/appimg/user-photo01.jpg',
    name: '杨晓明',
    img: './static/appimg/rec-zfbf-img01.jpg',
    title: '旧村改造进湖南',
    raised: 175,
    data: 80
  },
  {
    url: '',
    userphoto: './static/appimg/user-photo02.jpg',
    name: '王忠诚',
    img: './static/appimg/rec-zfbf-img02.jpg',
    title: '危改房临时安置',
    raised: 175,
    data: 30
  },
  {
    url: '',
    userphoto: './static/appimg/user-photo03.jpg',
    name: '李跃年',
    img: './static/appimg/rec-zfbf-img03.jpg',
    title: '危房改建走访征集活动',
    raised: 175,
    data: 100
  }]

  export default {
    name: 'zfbf',
    components: {swiper, swiperSlide, Cell, XButton, Range},
    data () {
      return {
        boxlist: boxlist,
        swiperOption: {
          notNextTick: true,
          slidesPerView: 1.5,
          spaceBetween: 0
        }
      }
    },

    methods: {}
  }
</script>

<style scoped>
  .vux-flexbox-item {
    margin-left: 0 !important;
  }

  .weui-cell {
    padding: 10px 12px
  }

  .weui-cell >>> .vux-label {
    font-weight: bold;
    font-size: 16px;
    color: #333
  }

  .weui-cell >>> .weui-cell__ft {
    font-size: 12px
  }

  .scrollswiper-wrap {
    padding: 0 0 8px 0;
    background: #fff;

  }

  .scrollswiper-wrap >>> .swiper-container {
    padding-right: 12px;
  }

  .scrollswiper-wrap >>> .swiper-slide {
    padding: 8px 0
  }

  .scrollswiper-wrap a {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    display: block;
    border-radius: 5px;
    overflow: hidden;
    margin-left: 12px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    padding: 12px;
    color: #666;
  }
  .listitem-img{
    border-radius: 3px;
  }
  .rang-data{padding-top:4px}
  .scrollswiper-wrap a em {
    display: inline-block;
    padding: 0 3px
  }

  .scrollswiper-wrap a h1 {
    margin-bottom: 0px
  }

  .listitem-user img {
    display: inline-block;
    width: 30px;
    border-radius: 100%
  }

  .listitem-user span {
    vertical-align: top;
    padding-top: 4px;
    display: inline-block;
    padding-left: 5px
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
</style>
