<template>
  <div v-if="demandDetail.demand_status!==undefined">
    <x-header :left-options="{backText: ''}">{{STATUS_MAP_UI[demandDetail.demand_status].statusText}}</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <!--需求头部信息-->
      <header-info :demandDetail="demandDetail"></header-info>

      <!--需求拓展信息-->
      <basic-info :demandDetail="demandDetail"></basic-info>

      <!--受助状态(进度条)-->
      <div v-if="demandDetail.demand_status!==1&&demandDetail.demand_status!==2" class="help-progess bg-ffffff mb-12" style="padding: 15px;">
        <div class="clearfix help-pro-head f-14">
          <span class="f_l color-333"><em class="color-orange">{{demandDetail.donatecount}}</em> 次帮扶</span>
          <span class="f_r color-999">进度：<em class="color-orange">{{parseInt(demandDetail.percentage*100  )}}%</em></span>
        </div>
        <range class="range-spe" :value=demandDetail.percentage*100 disabled :rangeBarHeight="4"></range>
        <p class="f-14 color-333">
          <span>目标：<em class="color-orange">{{demandDetail.target_amount}}</em> 元</span>
          <span>已捐：<em class="color-orange">{{demandDetail.moneycount}}</em> 元</span>
        </p>
      </div>

      <!--爱心反馈-->
      <love-news v-if="getLoveNeedStatus" :demandDetail="demandDetail"></love-news>

      <!--需求编号及状态-->
      <timeline-list :demandDetail="demandDetail"></timeline-list>


    </div>

    <!--底部操作-->
    <button-actions :demandDetail="demandDetail"></button-actions>

  </div>
</template>

<script>
  import {XHeader, Group, Cell, XButton, Timeline, TimelineItem, Range, TransferDom, Confirm} from 'vux'
  import STATUS_MAP_UI from './STATUS_MAP_UI'
  import {mapState, mapGetters} from 'vuex'
import headerInfo from './compoments/headerInfo'
  import basicInfo from './compoments/basicInfo'
  import loveNews from './compoments/loveNews'
  import timelineList from './compoments/timelineList'
  import buttonActions from './compoments/buttonActions'

  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        STATUS_MAP_UI: STATUS_MAP_UI,
        demandDetail: {}
      }
    },
    components: {
      XHeader,
      Group,
      Cell,
      XButton,
      Timeline,
      TimelineItem,
      Range,
      Confirm,
      headerInfo,
      basicInfo,
      loveNews,
      timelineList,
      buttonActions
    },
    name: 'mypub_capital',
    created () {
      // this.getDemandDetail(this.demandId)
      let _this = this
      this.$http.post('hts/myDemand/detail', { demandId: this.$route.params.demandId})
        .then(function (response) {
          _this.demandDetail = response.data
        }).catch(err => {
          console.log(JSON.stringify(err))
        })
    },
    computed: {
      demandId () {
        return this.$route.params.demandId
      },
        getLoveNeedStatus() {
        let statusarr = [0,1,2,8,9,10]
        if(statusarr.indexOf(this.demandDetail.demand_status)!=-1){
          return false
        }
        return true
      },
      ...mapState(['demandDetail'])
     
    },
    methods: {
      getDemandDetail (demandId) {
        this.$store.dispatch('getDemandDetail', {_this: this, demandId})
      }
   

    }

  }
</script>

<style scoped>

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

  /*需求编号和进展状态*/
  .pub-state {
    padding: 15px 15px 0 15px;
  }

  .state-timeline-head {
    padding: 5px 0
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

  /*进度条*/
  .help-progess p {
    padding-top: 6px
  }

  .help-progess p span {
    padding-right: 10px
  }

  .help-pro-head {
    padding-bottom: 6px
  }

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

  /*弹窗样式*/
  .vux-confirm >>> .weui-dialog__btn_primary {
    color: #fff;
    background: #f37306
  }

  .vux-confirm >>> .weui-dialog__ft {
    font-size: 16px
  }

  .vux-confirm >>> .weui-dialog__bd {
    font-size: 16px
  }
</style>

