<template>
  <div class="panel-box">
    <cell title="扶贫公募" value="更多" is-link>
      <img slot="icon" width="20" style="display:block;margin-right:5px;"
           src="../../../common/images/rec-icon-fpzc.png"/>
    </cell>
    <div class="scrollswiper-wrap">
      <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
        <!-- 轮播con -->
        <swiper-slide v-for="(item,index) in boxlist" :key="index">
          <router-link :to="item.url"   class="boxlist-item" :style="item.bgimg">
            <span class="label">{{item.label}}</span>
            <div class="box-caption">
              <h1 class="f-16 tit-nowrap">{{item.title}}</h1>
              <p class="list-state tit-nowrap">
                <span class="f-12">已帮扶<em class="color-red f-bold">{{item.helpnum}}</em> </span>
                <span class="f-12"><em class="color-red f-bold">{{item.supportnum}}</em>人已支持</span>
              </p>
            </div>
            <x-button type="warn">我要帮扶</x-button>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>

  </div>
</template>

<script>
  import {Cell, XButton} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  const boxlist = [{
    url: '',
    label: '慈善募捐',
    bgimg: 'background-image: url(./static/appimg/rec-fpzc-img01.jpg)',
    title: '为孩子们建一间梦想教室',
    helpnum: '10000.00',
    supportnum: '1000'
  },
  {
    url: '',
    label: '慈善募捐',
    bgimg: 'background-image: url(./static/appimg/rec-fpzc-img02.jpg)',
    title: '帮助山村孩子读书',
    helpnum: '10000.00',
    supportnum: '1000'
  }]

  export default {
    name: 'fpzc',
    components: {swiper, swiperSlide, Cell, XButton},
    data () {
      return {
        boxlist: boxlist,
        swiperOption: {
          notNextTick: true,
          slidesPerView: 1.2,
          spaceBetween: 0,
          touchReleaseOnEdges:true,
          nested:true,
          on: {
              touchStart(event){
                  // alert(event);
                  event.cancelBubble = true;
                  event.stopPropagation();
                  return false;
              },

         }
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
    padding:0  0 12px 0;
    background: #fff;

  }

  .scrollswiper-wrap>>>.swiper-container{padding-right: 12px;}

  .scrollswiper-wrap a {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    display: block;
    height: 160px;
    border-radius: 5px;
    overflow: hidden;
    margin-left:12px;
  }
  .scrollswiper-wrap a >>> .weui-btn {
    position: absolute;
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    border-radius: 24px;
    width: auto !important;
    right: 12px;
    bottom: 10px;
    font-size: 12px;
    overflow: hidden;
  }

  .scrollswiper-wrap a .label {
    position: absolute;
    top: 12px;
    left: 12px;
    border-radius: 2px;
    display: block;
    height: 22px;
    line-height: 22px;
    color: #000;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    font-size: 12px;
    padding: 0 8px
  }
  .scrollswiper-wrap .list-state{padding-right: 60px}
  .scrollswiper-wrap .list-state span{position: relative;padding-right: 4px}
  .scrollswiper-wrap .list-state span:after{position: absolute;border-right:1px solid #fff;height:10px;top:2px;right:0;content: ''}
  .scrollswiper-wrap .list-state span:last-child:after{border:0 none}
  .scrollswiper-wrap a em{display:inline-block;padding:0 3px}
  .scrollswiper-wrap a h1{font-weight: normal;margin-bottom:8px}
</style>
