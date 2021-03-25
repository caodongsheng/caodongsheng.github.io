<template>
  <div class="local-wrap bg-f6f5f6 box-withfooter over-auto">
    <!--头部搜索-->
    <header style="background-image: url(static/appimg/local-topbg.jpg);">
      <div class="search-white">
        <x-input title="" placeholder="瞳爱光明项目">
          <i slot="label" class="fa fa-search" aria-hidden="true"></i>
        </x-input>
      </div>
      <!--头部地区信息-->
      <span class="sel-area color-white"><i class="fa fa-map-marker"></i><em class="f-22">湖南</em><i
        class="fa fa-angle-down"></i></span>
      <p class="info-num f-14 color-white">938475个需求</p>
      <div class="info-des f-12 color-white tit-nowrap">
        <i class="fa fa-clock-o"></i>过去24小时 <em class="f-20">8765</em>人在这里帮扶了<i>10093</i>个贫困户
      </div>
    </header>

    <!--广告位轮播-->
    <div class="localindex-ad">
      <div class="scrollswiper-wrap">
        <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
          <!-- 轮播con -->
          <swiper-slide v-for="(item,index) in imglist" :key="index">
            <router-link :to="item.url" class="linkonly"><img class="bd-radius-5" :src="item.img"></router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--栏目图标分类-->
    <div class="icon-grid bg-ffffff ">
      <grid :show-vertical-dividers="false" :show-lr-borders="false" :cols="4">
        <grid-item v-for="(item2,index) in iconlist" :key="index" :link="item2.url">
          <img :src="item2.img">
          <p class="text-center f-12 tit-nowrap">{{item2.title}}</p>
        </grid-item>
      </grid>
    </div>

    <!--项目列表  -->
    <div class="pro-list mt-15">
      <panel  :list="list" :type="type" ></panel>
    </div>

    <!--其他更多区域-->
    <div class="areamore mt-15 mb-15 bg-ffffff">
        <cell title="更多区域" value="" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;"
               src="../../common/images/local-icon-morearea.png"/>
        </cell>
      <div class="area-itemlist">
        <grid :show-vertical-dividers="false" :show-lr-borders="false" :cols="3">
          <grid-item v-for="(item3,index) in areaitemlist" :key="index" :link="item3.url">
            <p class="text-center f-14 tit-nowrap bd-radius-4"><span>{{item3.title.split('')[0]}}</span>{{item3.title}}</p>
          </grid-item>
        </grid>
      </div>
  </div>
  </div>
</template>

<script>
  import {XInput, Grid, GridItem, Panel, Cell} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  const imglist = [{
    url: '',
    img: './static/appimg/local-ad-img01.jpg',
    title: ''
  }, {
    url: '',
    img: './static/appimg/local-ad-img02.jpg',
    title: ''
  }, {
    url: 'javascript:',
    img: './static/appimg/local-ad-img01.jpg',
    title: ''
  }]
const iconlist = [{
    url: '',
    img: './static/appimg/local-icon01.png',
    title: '全部'
  }, {
    url: '',
    img: './static/appimg/local-icon02.png',
    title: '扶贫头条'
  }, {
    url: '',
    img: './static/appimg/local-icon03.png',
    title: '扶贫新模式'
  }, {
    url: '',
    img: './static/appimg/local-icon04.png',
    title: '扶贫故事'
  }, {
    url: '',
    img: './static/appimg/local-icon05.png',
    title: '企业帮扶'
  }, {
    url: '',
    img: './static/appimg/local-icon06.png',
    title: '爱心人士'
  }, {
    url: '',
    img: './static/appimg/local-icon07.png',
    title: '特色旅游'
  }, {
    url: '',
    img: './static/appimg/local-icon08.png',
    title: '传统文化'
  }]
const areaitemlist = [{
    url: '',
    img: '',
    title: '安化县'
  }, {
    url: '',
    img: '',
    title: '桑植县'
  }, {
    url: '',
    img: '',
    title: '平江县'
  }, {
    url: '',
    img: '',
    title: '安化县'
  }, {
    url: '',
    img: '',
    title: '桑植县'
  }, {
    url: '',
    img: '',
    title: '平江县'
  }, {
    url: '',
    img: '',
    title: '安化县'
  }, {
    url: '',
    img: '',
    title: '桑植县'
  }, {
    url: '',
    img: '',
    title: '平江县'
  }]

  export default {
    components: { XInput, swiper, swiperSlide, Grid, GridItem, Panel, Cell },
    name: 'local_index',
    data () {
      return {
        imglist: imglist,
        iconlist: iconlist,
        areaitemlist: areaitemlist,
        swiperOption: {
          notNextTick: true,
          slidesPerView: 2,
          spaceBetween: 12
        },
        type: '5',
        list: [{
          src: './static/appimg/local-act-img01.jpg',
          title: '桑植县：为庭院增一抹绿，为致富添一把劲',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '',
          meta: {
            source: '',
            date: '2小时前',
            other: '作者：铜川统战'
          }
        }, {
          src: './static/appimg/local-act-img02.jpg',
          title: '弘扬照金精神  村企联手聚力深度贫困',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '',
          meta: {
            source: '',
            date: '2小时前',
            other: '作者：铜川统战'
          }
        }]
      }
    }
  }
</script>

<style scoped>
  header {
    height: 190px;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
  }

  .sel-area {
    display: inline-block;
    margin: 0 auto;
  }

  .sel-area i {
    padding: 0 10px;
  }

  header .info-num {
    margin-top: 10px
  }

  header .info-des {
    padding: 2px 8px;
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin: 0 20px;
    margin-top: 10px;
    border-radius: 4px;
  }

  header .info-des .fa {
    padding-right: 5px
  }

  .localindex-ad {
    padding: 12px
  }

  /*图标链接部分 */
  .weui-grid {
    padding: 10px
  }

  .icon-grid {
    text-align: center;
    padding: 10px 0;
  }

  .icon-grid img {
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto
  }

  .icon-grid p {
    color: #666;
    padding-top: 10px
  }

  .weui-grids:before {
    border: 0 none !important
  }

  .weui-grid:after {
    border: 0 none !important
  }

  /*图文panel部分*/
  .weui-panel>>> .weui-media-box{padding: 15px 12px}
  .weui-panel>>>  .weui-media-box_appmsg .weui-media-box__hd{width:100px;height:73px}
  .weui-panel>>>  .weui-media-box_appmsg{align-items: flex-start}
  .weui-panel:after,.weui-panel:before{border:0 none}
  .weui-panel >>> .weui-media-box_text .weui-media-box__title{
    line-height: 1.2;margin-bottom:12px}
  .weui-panel >>>.weui-media-box__desc{line-height: 1.5}

  /*更多区域部分*/

  .areamore p{ color: #666;
    padding: 5px 0;vertical-align: middle}
  .areamore  p  span{display: inline-block;width: 30px;height:30px;color:#ff7000;background:#f6dfc0;border-radius: 100%;overflow: hidden;    vertical-align: middle;
  margin-right:8px;font-size: 14px;line-height: 30px;text-align: center}
  .area-itemlist{
    padding: 0 2px 10px 2px;}
</style>

