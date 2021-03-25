<template>
  <!--需求编号及状态-->
  <div class="pub-state bg-ffffff  f-14">
    <span class="color-999">需求编号：</span>{{demandDetail.id}}
    <div class="state-timeline-head">
      <span class="color-999">需求状态：</span> {{STATUS_MAP_UI[demandDetail.demand_status].statusText}}
    </div>
    <!--进度时间轴部分-->
    <div class="state-timeline-content">
      <timeline>
        <timeline-item v-for="(item,index) in timeline" :key="index">
          <h4 class="recent f-normal f-14" style="height:100%;word-wrap:break-word;word-break:break-all;">{{item.op_result}}</h4>
          <!-- <h5 class="recent f-normal f-14" style="height:100%;word-wrap:break-word;word-break:break-all;">{{item.staff_name+item.op_result}}</h5> -->
         <h6 v-if='item.remarks' class="recent f-normal f-14" style="word-wrap:break-word;word-break:break-all;"><span v-if="item.op_result.indexOf('通过') !== -1">{{item.staff_name}}</span>&nbsp;<span v-if="item.op_result.indexOf('不通过') !== -1">{{item.op_result}}<br/>不通过理由：</span>{{item.remarks}} <span v-if="item.op_result.indexOf('发布') !== -1">{{item.op_result}}</span></h6>
          <p class="recent f-normal f-12">{{item.op_date}}</p>
        </timeline-item>
      </timeline>
    </div>

  </div>
</template>

<script>
  import {XHeader, Group, Cell, CellBox, XButton, Timeline, TimelineItem, Range, Previewer, TransferDom} from 'vux'
  import {mapState} from "vuex";
import STATUS_MAP_UI from '../STATUS_MAP_UI'

  export default {
    name: "timelineList",
    components: {XHeader, Group, Cell, CellBox, XButton, Timeline, TimelineItem, Range, Previewer, TransferDom},
    props: {
      demandDetail: ''
    },
    created() {
      this.getTimeline(this.demandDetail.id)
    //   this.getdemandStatus();
    },
    data() {
      return {
        timeline: [],
        STATUS_MAP_UI: STATUS_MAP_UI
      }
    },
    methods: {
      getTimeline(demandId) {
        this.$http.post('hts/management/logs', {demandId: this.demandDetail.id})
          .then(res => {
            this.timeline = res.data;
          })
      },
    //   getdemandStatus() {
    //       this.alljson.DemandStatusEnum.map((item) => {
    //           if(item.code == this.demandDetail.demand_status) {
    //              this.demandDetail.demand_status = item.value;
    //           }
    //       })
    //   }
    },
    computed:{
        ...mapState(['alljson'])
    }
  }
</script>

<style scoped>
  /*需求编号和进展状态*/
  .pub-state {
    padding: 15px 15px 0 15px;
  }

  .state-timeline-head {
    padding: 5px 0
  }

  /*时间轴*/
  .vux-timeline {
    padding: 10px 2px 10px 80px;
    margin-bottom:50px;
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
</style>
