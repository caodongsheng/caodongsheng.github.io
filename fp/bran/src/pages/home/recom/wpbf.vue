<template>
  <div class="panel-box">
    <cell title="物品帮扶" value="更多" is-link>
      <img slot="icon" width="20" style="display:block;margin-right:5px;"
           src="../../../common/images/rec-icon-wpbf.png"/>
    </cell>
    <router-link :to="{}" class="adimg"><img src="../../../common/images/rec-wpbf-ad01.jpg"></router-link>
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
            <h1 class="f-14 f-bold tit-nowrap">我需要：{{item.title}}</h1>
            <p class="labelarea">
              <span class="list-label dis-block tit-nowrap" v-for="(item1,index1) in item.label" :key="index1"><em class="f-12">{{item1}}</em></span>
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
    img: './static/appimg/rec-wpbf-img01.jpg',
    title: '米，面，油',
    label: ['生活需求', '米面油']
  },
  {
    url: '',
    userphoto: './static/appimg/user-photo02.jpg',
    name: '王忠诚',
    img: './static/appimg/rec-wpbf-img02.jpg',
    title: '一台电动车',
    label: ['生活需求', '电动车', '农用器械']
  },
  {
    url: '',
    userphoto: './static/appimg/user-photo03.jpg',
    name: '李跃年',
    img: './static/appimg/rec-wpbf-img03.jpg',
    title: '一台洗衣机',
    label: ['生活需求', '洗衣机', '日常用品']
  }]

  export default {
    name: 'wpbf',
    components: {swiper, swiperSlide, Cell, XButton, Range},
    data () {
      return {
        boxlist: boxlist,
        swiperOption: {
          notNextTick: true,
          slidesPerView:1.5,
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

/*标签部分 */
  .labelarea{margin:6px -4px 0 -4px}
  .labelarea .list-label{
    padding: 0px 4px;}
  .labelarea .list-label em{display: inline-block;background:#fff;color:#ed6b2b;
    padding:2px 5px;border-radius: 3px;border:1px solid #ed6b2b}
</style>

