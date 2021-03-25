<template>
  <div v-if="demandDetail.demand_status!==undefined">
    <x-header :left-options="{backText: ''}">{{STATUS_MAP_UI[demandDetail.demand_status].statusText}}</x-header>
    <div class="box-withbar over-auto bg-f6f5f6" :style="getBottom">
      <!--需求头部信息-->
      <header-info :demandDetail="demandDetail"></header-info>

      <!--需求拓展信息-->
      <basic-info :demandDetail="demandDetail"></basic-info>

      <!--爱心反馈-->
      <love-news v-if="getStatus()" :demandDetail="demandDetail"></love-news>

      <!--收货地址-->
      <div class="address bg-ffffff mb-12">
        <group class="group-clearbd">
          <cell title="收货地址"></cell>
        </group>
        <div class="clearfix name-area f-14">
          <span class="f_l"><em class="color-999">收货人：</em> {{demandDetail.linkman}}</span><span class="f_r">{{demandDetail.link_tel}}</span>
        </div>
        <div class="add-area flex-tab f-14">
          <div class="flex-tab-cell tab-left v-top color-999" style="width: 50px;padding-left:15px">地址：</div>
          <div class="flex-tab-cell tab-right v-top">{{demandDetail.detail_addr}}</div>
        </div>
      </div>

      <!--帮扶记录-->
      <div class="helprecord bg-ffffff ">
        <group class="group-clearbd">
          <cell title="帮扶记录" :is-link="num">
            <span class="f-14" v-if="num" @click="goToGoodsRecord">共<em class="f-14 color-orange"> {{demandDetail.record_count}}</em>次</span>
          </cell>
          <div v-if="demandDetail.record_count==0" class="noRecord text-center color-999 f-italic">暂无最新捐赠记录</div>
        </group>
        <div v-if="demandDetail.record_count>0" class="recordshow">
          <router-link to="" class="dis-block">
            <h1 class="clearfix  f-14 f-normal">
              <em class="f_r color-999">{{demandDetail.create_date}}</em>
              <span class="dis-block tit-nowrap f-16">{{demandDetail.user_name}}给你赠送了{{demandDetail.goods}}</span>
            </h1>
            <p class="f-14 color-999">
              {{demandDetail.bf_detail}}
            </p>
          </router-link>
          <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
            <swiper-slide v-for="(item1,index1) in goodsImglist" :key="index1">
              <div class="previewer-demo-img" style="padding-top:100%" @click="show(index1)" :style="{backgroundImage:'url('+item1.src+')',backgroundSize:'cover',backgroundPosition:'center'}">
              </div>
            </swiper-slide>
          </swiper>
          <div v-transfer-dom>
              <previewer :list="goodsImglist" ref="previewer" :options="options" :style="getTop"></previewer>
          </div>
        </div>


      </div>

      <!--捐赠方式-->
      <div class="detail.help_pattern bg-ffffff mb-12">
        <group class="group-clearbd">
          <!--捐赠方式：面对面v-if-->
          <cell title="捐赠方式" value="面对面捐赠" v-if="demandDetail.help_pattern===1"></cell>
          <!--捐赠方式：快递v-if-->
          <cell title="捐赠方式" value="快递" v-if="demandDetail.help_pattern===2"></cell>
        </group>
      </div>

      <!--v-if=面对面，捐赠人信息-->
      <div class="donor bg-ffffff mb-12" v-if="demandDetail.help_pattern===1">
        <cell title="捐赠人信息"></cell>
        <div class="donor-content">
          <div v-if="demandDetail.demand_status==6" class="color-999 f-italic">暂无信息</div>
          <ul v-else class="f-14">
            <li><span class="color-999">捐赠人：</span>{{demandDetail.donor}}</li>
            <li><span class="color-999">联系人：</span>{{demandDetail.donor_link_man}}</li>
            <li><span class="color-999">联系电话：</span>{{demandDetail.donor_link_tel}}</li>
            <li><span class="color-999">预计捐赠日期：</span>{{demandDetail.donor_date}}</li>
          </ul>
        </div>
      </div>


      <!--需求编号及状态-->
      <timeline-list :demandDetail="demandDetail"></timeline-list>

    </div>

    <!--底部操作-->
    <button-actions :demandDetail="demandDetail"></button-actions>

  </div>
</template>

<script>
  import {XHeader, Group, Cell, CellBox, XButton, Range, Previewer, TransferDom, Confirm} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import STATUS_MAP_UI from './STATUS_MAP_UI'
  import {mapState, mapGetters} from 'vuex';
  import headerInfo from './compoments/headerInfo'
  import basicInfo from './compoments/basicInfo'
  import loveNews from './compoments/loveNews'
  import timelineList from './compoments/timelineList'
  import buttonActions from './compoments/buttonActions'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Group,
      Cell,
      CellBox,
      XButton,
      Range,
      Confirm,
      swiper,
      swiperSlide,
      Previewer,
      headerInfo,
      basicInfo,
      loveNews,
      timelineList,
      buttonActions
    },
    name: "mypub_capital",
    created() {
      this.getDemandDetail(this.demandId)
    },
    data() {
      return {
        showconfirm: false,
        STATUS_MAP_UI: STATUS_MAP_UI,
        clickedBtn: '',
        swiperOption: {
          notNextTick: true,
          slidesPerView: 3,
          spaceBetween: 10
        },
        goodsImglist: [],
        options: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        },
      }
    },
    computed: {
      ...mapState(['demandDetail']),
      demandId() {
        return this.$route.params.demandId
      },
     getTop(){
       return {
         top:window.localStorage.getItem("hheight")
       }
    },

      num() {
        return this.demandDetail.record_count > 0
      },
      getBottom(){
        if(STATUS_MAP_UI[this.demandDetail.demand_status].detailButtonArray.length>0){
          return {
            bottom:'55px'
          }
        }
        else{
          return {
            bottom:"0px"
          }
        }
      }
    },
    methods: {
   
      getStatus(){
       if(this.demandDetail.demand_status==11){
         return true
       }
       else if(this.demandDetail.demand_status>2&&this.demand_status<8){
         return true;
       }
       else return false;
      },
      async getDemandDetail(demandId) {
        try{
          await this.$store.dispatch('getDemandDetail', {_this: this, demandId})
        }catch (e) {
          this.showToast('', 'text', '获取需求失败')
          return
        }
        if(this.demandDetail.record_count){
          this.getGoodsImglist()
        }
      },
      goToGoodsRecord() {
        this.$router.push({name: 'mypubgoodsrecord', params: {demandId: this.demandId}})
      },
      getGoodsImglist() {
        let imgList = this.demandDetail.record_imgs;
        if(imgList)
        imgList.forEach(item => {
          let img = {};
          img.src = item;
          this.goodsImglist.push(img)
        })
      },
      show(index1) {
        this.$refs.previewer.show(index1)
      }

    }

  }
</script>

<style scoped>
  .box-withbar {
    bottom: 55px
  }

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
    padding-bottom: 20px;
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

  .noRecord {
    height: 70px;
    line-height: 70px;
  }

  /*需求编号和进展状态*/
  .pub-state {
    padding: 15px 15px 0 15px;
  }

  .state-timeline-head {
    padding: 5px 0
  }

  /*物流信息部分*/

  .trans-con {
    border-top: 1px solid #eee;
    padding: 15px 30px 15px 15px
  }

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

