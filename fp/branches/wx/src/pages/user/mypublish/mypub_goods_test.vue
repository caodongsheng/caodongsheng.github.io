<template>
  <div>
    <x-header :left-options="{backText: ''}">已送出</x-header>
    <div class="box-withbar over-auto bg-f6f5f6">
      <!--需求基本信息-->
      <div class="info-base bg-ffffff mb-12">
        <div class="flex-tab">
          <div class="flex-tab-cell tab-left linkonly">
            <img src="../../../../static/appimg/pro-img.jpg" width="80">
          </div>
          <div class="flex-tab-cell tab-right">
            <h1 class="color-333 f-16 f-normal tit-nowrap">孩子上学喝水难，谁给买个杯子</h1>
            <p class="color-999 f-14 tit-2row-nowrap">我叫陈英水，家庭条件困难，为了孩子更好的教育，希望爱心人士帮助!</p>
          </div>
        </div>

      </div>
      <!--需求拓展信息-->
      <div class="info-exn mb-12 bg-ffffff">
        <ul class="f-14">
          <li><span class="color-999">受助人：</span>王春华</li>
          <li><span class="color-999">身份证号：</span>152521********6546</li>
          <li><span class="color-999">地区：</span>湖南省 株洲市 永州县 永州乡 永州村</li>
          <li><span class="color-999">需求发布人：</span>村级管理员-刘玉婷 发布</li>
          <li><span class="color-999">发布人联系方式：</span>13717921434</li>
          <li><span class="color-999">发布人与受助人关系：</span>亲戚</li>
        </ul>
      </div>

      <!--爱心反馈-->
      <div class="love-news bg-ffffff mb-12 f-16">
        <group class="group-clearbd">
        <cell title="爱心反馈" is-link link="lovedynamics">
          <span class="f-14">共<em class="f-14 color-orange"> 2 </em>条</span>
        </cell>
        </group>
        <div class="writelovenews">
          <router-link to="lovedynwrite" class="btn-orange-lg dis-block text-center color-white">发布爱心反馈</router-link>
        </div>
      </div>

      <!--收货地址-->
      <div class="address bg-ffffff mb-12">
        <group class="group-clearbd">
        <cell title="收货地址"></cell>
        </group>
        <div class="clearfix name-area f-14">
          <span class="f_l"><em class="color-999">收货人：</em> 王钢碳</span><span class="f_r">13651130332</span>
        </div>
        <div class="add-area flex-tab-cell f-14">
          <div class="flex-tab-cell tab-left v-top color-999" style="width: 50px;">地址：</div>
          <div class="flex-tab-cell tab-right v-top">宁夏回族自治区石嘴山大武口石炭井路22号鑫源小区5号楼3单元404</div>
        </div>
      </div>

      <!--帮扶记录-->
      <div class="helprecord bg-ffffff mb-12">
        <group class="group-clearbd">
        <cell title="帮扶记录" is-link link="mypubgoodsrecord">
          <span class="f-14">共<em class="f-14 color-orange"> 2 </em>次</span>
        </cell>
        </group>
        <div class="recordshow">
          <router-link to="" class="dis-block">
            <h1 class="clearfix  f-14 f-normal">
              <em class="f_r color-999">03-19</em>
              <span class="dis-block tit-nowrap f-16">张三给你赠送了两个杯子</span>
            </h1>
            <p class="f-14 color-999">
              北京嘉实公益基金会支持运作，致力于解决乡村小规模学校学生饮水健康教育缺失问题，温暖水杯推行
            </p>
          </router-link>
          <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
            <swiper-slide v-for="(item1,index1) in foodsimglist" :key="index1">
              <img :src="item1.src" class="previewer-demo-img" @click="show(index1)">
            </swiper-slide>
          </swiper>
          <div v-transfer-dom>
            <previewer :list="foodsimglist" ref="previewer" :options="options" :style="getTop"></previewer>
          </div>
        </div>


      </div>

      <!--捐赠方式-->
      <div class="helpway bg-ffffff mb-12">
        <group class="group-clearbd">
        <!--捐赠方式：面对面v-if-->
        <cell title="捐赠方式" value="面对面捐赠" v-if="helpway===1"></cell>
        <!--捐赠方式：快递v-if-->
        <cell title="捐赠方式" value="快递" v-if="helpway===2"></cell>
        </group>
      </div>

      <!--v-if=面对面，捐赠人信息-->
      <div class="donor bg-ffffff mb-12" v-if="helpway===1">
        <cell title="捐赠人信息"></cell>
        <div class="donor-content">
          <ul class="f-14">
            <li><span class="color-999">捐赠人：</span>张三</li>
            <li><span class="color-999">联系人：</span>张三</li>
            <li><span class="color-999">联系电话：</span>13847836678</li>
            <li><span class="color-999">预计捐赠日期：</span>2018-04-20</li>
          </ul>
        </div>
      </div>

      <!--v-if=快递，物流信息-->
      <div class="transport bg-ffffff mb-12" v-if="helpway===2">
        <group class="group-clearbd">
        <cell title="物流信息"></cell>
        </group>
        <group class="group-clearbd">
        <cell-box is-link link="transportinfo" class="trans-con">
          <div class="color-orange f-14">
            <p>已签收，本人签收</p>
            <p>2018-03-16 12:34:23</p>
          </div>
        </cell-box>
        </group>
      </div>

      <!--需求编号及状态-->
      <div class="pub-state bg-ffffff  f-14">
        <span class="color-999">需求编号：</span>5452651762728123
        <div class="state-timeline-head">
          <span class="color-999">需求状态：</span>
        </div>
        <!--进度时间轴部分-->
        <div class="state-timeline-content">
          <timeline>
            <timeline-item v-for="(item,index) in timelinelist" :key="index">
              <h4 class="recent f-normal f-14">{{item.prostate}}</h4>
              <h5 class="recent f-normal f-14">{{item.prodes}}</h5>
              <p class="recent f-normal f-12">{{item.prodate}}</p>
            </timeline-item>
          </timeline>
        </div>

      </div>


    </div>

    <!--底部操作-->
    <div class="btm-ope clearfix">
      <router-link to="" class="f_r btn-bordered btn-bordered-orange f-16">确认收货</router-link>
    </div>

  </div>
</template>

<script>
  import {XHeader,Group, Cell, CellBox, XButton, Timeline, TimelineItem, Range, Previewer, TransferDom} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {XHeader,Group,Cell, CellBox, XButton, Timeline, TimelineItem, Range, swiper, swiperSlide, Previewer},
    name: "mypub_goods",
    directives: {
      TransferDom
    },
     computed:{
     getTop(){
       return {
         top:window.localStorage.getItem("hheight")
       }
    },

  },
    data() {
      return {
        // 帮扶方式 1.面对面 2.快递
        helpway: 2,
        foodsimglist: [{
          src: './static/appimg/foods-img02.jpg'
        }, {
          src: './static/appimg/foods-img01.jpg'
        }, {
          src: './static/appimg/foods-img03.jpg'
        }
        ],
        swiperOption: {
          notNextTick: true,
          slidesPerView: 3,
          spaceBetween: 10
        },
        timelinelist: [
          {
            prostate: '已送出',
            prodes: '张三的2个杯子已经送出',
            prodate: '2016-04-21 11:00'
          }, {
            prostate: '待送出',
            prodes: '张三给你捐赠了2个杯子',
            prodate: '2016-04-20 10:00'
          }, {
            prostate: '帮扶中',
            prodes: '需求已上线',
            prodate: '2016-04-17 12:00'
          }, {
            prostate: '审核通过',
            prodes: '湖南省 株洲市 永州县 永州乡 永州村党委办公室',
            prodate: '2016-04-16 10:23'
          }, {
            prostate: '发布需求',
            prodes: '村级管理员--李吉峰',
            prodate: '2016-04-17 12:00'
          }],
        options: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }

      }
    },
    methods: {
    
      show(index1) {
        this.$refs.previewer.show(index1)
      }
    }
  }
</script>



<style scoped>
  .box-withbar{bottom:55px}

  .weui-cell_access >>> .weui-cell__ft:after {
    margin-top: -2px
  }

  .group-clearbd >>> .weui-cells {
    margin-top: 0
  }

  .group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }

  /*需求基本信息*/
  .info-base {
    padding: 15px 15px
  }

  .info-base .tab-left {
    width: 90px
  }

  .info-base .tab-right {
    position: relative
  }

  .info-base .tab-right h1 {
    line-height: 100%;
  }

  .info-base .tab-right p {
    position: absolute;
    bottom: 0
  }

  .info-base .tab-right p span {
    padding-right: 10px;
  }

  /*需求拓展信息*/
  .info-exn {
    padding: 10px 15px
  }

  .info-exn ul li {
    padding: 5px 0
  }

  /*爱心反馈部分*/

  .writelovenews {
    padding: 15px 40px;
    border-top: 1px solid #eee
  }

  .btn-orange-lg {
    height: 40px !important;
    line-height: 40px !important;
    border-radius: 40px !important;
    font-size: 15px !important;
  }

  /*收货地址部分*/

  .address .name-area {
    padding: 15px 15px;
    border-top: 1px solid #eee
  }

  .address .add-area {
    padding: 0 15px 20px 15px;
    background: url('../../../../static/appimg/address-bg.jpg') repeat-x bottom;
    background-size: auto 5px
  }

  /*捐赠人信息*/
  .donor-content {
    padding: 10px 15px;
    border-top: 1px solid #eee;
  }

  .donor-content ul li {
    padding: 5px 0
  }

  /*帮扶记录部分*/
  .recordshow {
    border-top: 1px solid #eee;
    padding: 10px 15px;
  }

  .recordshow h1 span {
    padding: 0 10px 6px 0
  }

  .recordshow h1 em {
    padding-top: 4px
  }

  .recordshow p {
    padding-bottom: 10px
  }

  /*需求编号和进展状态*/
  .pub-state {
    padding: 15px 15px 0 15px;
  }

  .state-timeline-head {
    padding: 5px 0
  }


  /*物流信息部分*/

  .trans-con{border-top:1px solid #eee;padding:15px 30px 15px 15px}

  /*时间轴*/
  .vux-timeline {
    padding: 10px 2px 10px 80px
  }

  .vux-timeline-item >>> .vux-timeline-item-content {
    padding: 0 0 1.5rem 1.6rem;
  }

  .vux-timeline-item >>> p {
    position: absolute;
    top: 0;
    left: -90px;
    text-align: center;
    width: 90px
  }

  .vux-timeline-item >>> .vux-timeline-item-content {
    color: #999;
  }

  .vux-timeline-item >>> .vux-timeline-item-tail {
    background-color: #ececec;
  }

  .vux-timeline-item >>> .vux-timeline-item-head-first {
    background-color: #f37306 !important;
    border-color: #f9bd8a !important;
    width: 10px;
    height: 10px;
    top: 2px;
    left: -3px
  }

  .vux-timeline-item:first-child >>> .vux-timeline-item-content {
    color: #f37306
  }

  .vux-timeline-item >>> .weui-icon-success-no-circle {
    font-size: 20px
  }

  .vux-timeline-item >>> .vux-timeline-item-checked.weui-icon-success-no-circle::before {
    font-size: 0;
    position: absolute;
    left: 2px;
    top: 2px;
  }

  .vux-timeline-item >>> .vux-timeline-item-color {
    background-color: #ccc;
    border: 4px solid #eee;
  }

  .vux-timeline-item >>> .vux-timeline-item-head {
    width: 10px;
    height: 10px;
    left: -3px;
    top: 3px;
  }

  /*底部操作栏*/
  .btm-ope {
    padding: 13px 15px;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0
  }

  .btm-ope .btn-bordered {
    margin-right: 10px
  }

  .btm-ope .btn-bordered.btn-bordered-orange {
    margin-right: 0
  }


</style>
