<template>
  <div>
    <x-header :left-options="{backText: ''}">查看物流</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <div class="bg-ffffff mb-12">
        <!--物流订单信息-->
        <ul class="trans-state f-14">
          <li><span class="color-999">物流公司：</span>顺丰</li>
          <li><span class="color-999">物流单号：</span>98583722772</li>
        </ul>
      </div>

      <div class="bg-ffffff" style="padding: 15px">
        <!--物流进度时间轴部分-->
        <div class="trans-timeline">
          <timeline>
            <timeline-item v-for="(item,index) in  trans_timeline_list" :key="index">
              <h4 class="f-normal f-14">{{item.transtext}}</h4>
              <p class="f-normal f-12">{{item.transdate}}</p>
            </timeline-item>
          </timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Timeline, TimelineItem} from 'vux'

  export default {
    name: "transport_info",
    components: {XHeader, Timeline, TimelineItem},
    data() {
      return {
        trans_timeline_list: [
          {
            transtext: '您的订单正在配送途中，请您准备签收，感谢您的耐心等待。',
            transdate: '2016-04-20 11:23'
          }, {
            transtext: '您的订单在分拣中心发货完成，准备送往国际站',
            transdate: '2016-04-18 19:28'
          }, {
            transtext: '配送员杨亚东已经揽收完成',
            transdate: '2016-04-17 14:16'
          }, {
            transtext: '您的订单从上海市发货，预计4月20日 24:00前送达',
            transdate: '2016-04-16 10:23'
          }]
      }
    }
  }
</script>

<style scoped>
  /*物流状态信息*/
  .trans-state {
    padding: 12px 15px
  }

  .trans-state  li {
    padding: 3px 0
  }
  /*物流时间轴*/
 .trans-timeline .vux-timeline {
    padding: 0 0 0 5px
  }

  .trans-timeline .vux-timeline-item >>> .vux-timeline-item-content {
    padding: 0 0 1.5rem 1.6rem;
  }


  .trans-timeline .vux-timeline-item >>> .vux-timeline-item-content {
    color: #999;
  }

  .trans-timeline  .vux-timeline-item >>> .vux-timeline-item-tail {
    background-color: #ececec;
  }

  .trans-timeline  .vux-timeline-item >>> .vux-timeline-item-head-first {
    background-color: #f37306 !important;
    border-color: #f9bd8a !important;
    width: 10px;
    height: 10px;
    top: 2px;
    left: -3px
  }

  .trans-timeline  .vux-timeline-item:first-child >>> .vux-timeline-item-content {
    color: #f37306
  }

  .trans-timeline .vux-timeline-item >>> .weui-icon-success-no-circle {
    font-size: 20px
  }

  .trans-timeline .vux-timeline-item >>> .vux-timeline-item-checked.weui-icon-success-no-circle::before {
    font-size: 0;
    position: absolute;
    left: 2px;
    top: 2px;
  }

  .trans-timeline  .vux-timeline-item >>> .vux-timeline-item-color {
    background-color: #ccc;
    border: 4px solid #eee;
  }

  .trans-timeline .vux-timeline-item >>> .vux-timeline-item-head {
    width: 10px;
    height: 10px;
    left: -3px;
    top: 3px;
  }
</style>
