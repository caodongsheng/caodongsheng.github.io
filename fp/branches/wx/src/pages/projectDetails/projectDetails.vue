<template>
<div  class="box-full over-auto">
  <header class="top-header">
    <a class="icona" href="javascript:history.go(-1)">
      <img src="../../common/images/left.png">
    </a>
    <h3>项目详情</h3>

    <a class="iconb" href="/">
      <img src="../../common/images/share.png">
    </a>
  </header>
  <img src="../../common/images/projectDetailsBanner.png" class="banner">
  <h3 class="banner_title">慈善募捐 | 白内障复明工程 | 中国社会扶贫网</h3>
  <div class="clear"></div>
  <!--百分比-->
  <div class="xmxq_range">
    <range v-model="overCJ" :rangeBarHeight="4" disabled></range>
  </div>
  <div class="clear"></div>
  <!--榜单-->
  <flexbox style="margin-top: 20px">
    <flexbox-item>
      <div class="rank-item text-center">
        <em class="color-orange  dis-block f-14 f-bold">269.86</em>
        <span class="f-11 color-999 dis-block">爱心需求(万次)</span>
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="rank-item text-center">
        <em class="color-orange  dis-block f-14 f-bold">372.23</em>
        <span class="f-11 color-999 dis-block">爱心次数(万个)</span>
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="rank-item text-center">
        <em class="color-orange  dis-block f-14 f-bold">4421.37</em>
        <span class="f-11 color-999 dis-block">爱心款项(万元)</span>
      </div>
    </flexbox-item>
  </flexbox>
  <!--区间分割线-->
<div class="Interval-division"></div>
<div class="clear"></div>

  <ul class="xqul">

    <li>
      <p>发起机构:</p>
      <a href="#">山东省东明县县政府</a>
    </li>
    <li>
      <p>善款接收:</p>
      <a href="#">中国社会公益基金会</a>
    </li>
    <li>
      <p>帮扶对象:</p>
      <a href="#">200名家庭困难的大学生</a>
    </li>
    <li>
      <p>上线时间:</p>
      <a href="#">2018.03.01-2018.05.01</a>
    </li>

  </ul>
<!--tab-->
  <tab v-model="index">
    <tab-item :selected="demo1 === item" v-for="(item, index) in list2" @click="demo1 = item" :key="index">{{item}}</tab-item>
  </tab>


  <!--tab-contain-->
  <div class="tab-contain">

    <div v-if="index === 0">
      <h4>项目简介</h4>
      <p>现代众筹指通过互联网方式发布筹款项目并募集资金。相对
        于传统的融资方式，众筹更为开放，能否获得资金也不再是
        由项目的商业价值作为唯一标准。只要是网友喜欢的项目，
        都可以通过众筹方式获得项目启动的第一笔资金，为更多小
        本经营或创作的人提供了无限的可能。</p>
      <p>现代众筹指通过互联网方式发布筹款项目并募集资金。相对
        于传统的融资方式，众筹更为开放，能否获得资金也不再是
        由项目的商业价值作为唯一标准。只要是网友喜欢的项目，
        都可以通过众筹方式获得项目启动的第一笔资金，为更多小
        本经营或创作的人提供了无限的可能。</p>
      <p>现代众筹指通过互联网方式发布筹款项目并募集资金。相对
        于传统的融资方式，众筹更为开放，能否获得资金也不再是
        由项目的商业价值作为唯一标准。只要是网友喜欢的项目，
        都可以通过众筹方式获得项目启动的第一笔资金，为更多小
        本经营或创作的人提供了无限的可能。</p>
      <p>现代众筹指通过互联网方式发布筹款项目并募集资金。相对
        于传统的融资方式，众筹更为开放，能否获得资金也不再是
        由项目的商业价值作为唯一标准。只要是网友喜欢的项目，
        都可以通过众筹方式获得项目启动的第一笔资金，为更多小
        本经营或创作的人提供了无限的可能。</p>
      <div class="js-load-more">查看全部</div>
    </div>
    <div v-if="index === 1">
      11111
      <div class="js-load-more">加载更多</div>
    </div>
    <div v-if="index === 2">
      2222
      <div class="js-load-more">加载更多</div>
    </div>

  </div>

  <div class="clear"></div>
  <!--foot-->
  <footAssist></footAssist>
<!--dialog-->
  <projectDialog></projectDialog>
</div>
</template>

<script>
  import { Range, Flexbox, FlexboxItem, Cell, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  import footAssist from '../../components/footer/footAssist'
  import projectDialog from './projectDialog'
  const list = () => ['项目详情', '项目进展', '爱心反馈']
  export default {
    components: {
      projectDialog,
      footAssist,
      Range,
      Flexbox,
      FlexboxItem,
      Cell,
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        overCJ: 2000 / 5000 * 100,
        list2: list(),
        demo1: '项目详情',
        index: 0
      }
    }
  }
</script>

<style scoped>
.top-header{
  z-index: 1;
  width: 100%;
  background-color: #fff;
  display: table;
  position: relative;

}
.top-header .icona{
  width: 8.5%;
  float: left;
  position: absolute;
  top: 10px;
  left: 5px;
  vertical-align: middle;
}/*只能添加图标*/
.top-header h3 {
  text-align: center;
  font-size: 1.9em;
  color: #333;
  display: table-cell;
  font-weight: normal;
  text-align: center;
  padding: 0.2em 0;
}
.top-header .iconb{
  width: 11%;
  position: absolute;
  top: 10px;
  right: 5px;
  vertical-align: middle;
}/*只能添加图标*/
  .banner{
    width: 100%;
    margin: 0 auto;
  }
  .xmxq_range{
    margin-top: 20px;
  }
  .banner_title{
    width: 100%;
    text-align: center;
  }
  .vux-range-input-box{margin-right:36px!important;margin-left:27px!important;}
  .xqul{padding: 0px; margin: 0px;text-decoration: none;}
  .xqul li {
    padding: 0px;
    margin: 0px;
    text-decoration: none;
    border-bottom: none;
    list-style: none;
    width: 90%;
    margin: 0 auto;
    padding: 0;
    line-height: 3.5em;
  }
.xqul li p {
  background: url(../../common/images/dian.png) center left no-repeat;
  background-size: 21.2%;
  padding-left: 30px;
  color: #333333;
  float: left;
  display: inline;
}
.xqul li a{
  padding-left: 10px;
  color: #32b4ff;
  }

.vux-tab .vux-tab-item.vux-tab-selected{
  color: #ee6b2b!important;
  border-bottom: 3px solid #ee6b2b!important;
}
.vux-tab-ink-bar{background-color:#ee6b2b!important;}
  .js-load-more{width: 100%;text-align: center; color: #ee6b2b; font-size: 16px;}
</style>
