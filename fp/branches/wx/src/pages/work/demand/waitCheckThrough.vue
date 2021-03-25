<template>
  <div>
    <x-header :left-options="{backText: ''}">审核不通过</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">

      <!--需求基本信息-->
      <div class="info-base bg-ffffff mb-12" @click="through">
        <div class="flex-tab">
          <div class="flex-tab-cell tab-left linkonly">
            <img :src="reviewList.img_url" width="80" height="80">
          </div>
          <div class="flex-tab-cell tab-right">
            <h1 class="color-333 f-16 f-normal tit-nowrap">{{reviewList.demand_title}}</h1>
            <p class="color-999 f-14 tit-2row-nowrap">{{reviewList.demand_coment}}</p>
          </div>
        </div>

      </div>
      <!--需求拓展信息-->
      <div class="info-exn mb-12 bg-ffffff">
        <ul class="f-14">
          <li><span class="color-999">受助人：</span>{{reviewList.aideder_name}}</li>
          <li><span class="color-999">身份证号：</span>{{reviewList.aideder_idcard}}</li>
          <li><span class="color-999">地区：</span>{{reviewList.user_region_name}}</li>
          <li><span class="color-999">需求发布人：</span>{{reviewList.publish_name}} 发布</li>
          <li><span class="color-999">发布人联系方式：</span>{{reviewList.publish_tel}}</li>
          <li><span class="color-999">发布人与受助人关系：</span>{{reviewList.user_relation}}</li>
        </ul>
      </div>

      <!--需求编号及状态-->
      <div class="pub-state bg-ffffff  f-14">
        <span class="color-999">需求编号：</span>{{reviewList.id}}
        <div class="state-timeline-head">
          <span class="color-999">需求状态：</span>{{reviewList.demand_status}}
        </div>
        <!--进度时间轴部分-->
        <!-- <div class="state-timeline-content">
            <timeline-list :demandDetail="item" v-for="(item,index) in timelinelist" :key="index"></timeline-list>
          <!-- <timeline>
            <timeline-item v-for="(item,index) in timelinelist" :key="index">
              <!-- <h4 class="recent f-normal f-14">{{item.op_result}}</h4> 
              <h5 class="recent f-normal f-14" style="height:100%;word-wrap:break-word;word-break:break-all;">
                <!-- {{item.staff_name}} 
                {{item.op_result}} 
                <!-- {{item.remarks?"不通过理由："+item.remarks : ''}} 
                {{item.remarks}}
              </h5>
              <p class="recent f-normal f-12">{{item.op_date}}</p>
            </timeline-item>
          </timeline> 
        </div> -->
         <div class="state-timeline-content">
      <timeline>
        <timeline-item v-for="(item,index) in timelinelist" :key="index">
          <h4 class="recent f-normal f-14" style="height:100%;word-wrap:break-word;word-break:break-all;">{{item.op_result}}</h4>
          <!-- <h5 class="recent f-normal f-14" style="height:100%;word-wrap:break-word;word-break:break-all;">{{item.staff_name+item.op_result}}</h5> -->
         <h6 v-if='item.remarks' class="recent f-normal f-14" style="word-wrap:break-word;word-break:break-all;"><span v-if="item.op_result.indexOf('通过') !== -1">{{item.staff_name}}</span>&nbsp;<span v-if="item.op_result.indexOf('不通过') !== -1">{{item.op_result}}<br/>不通过理由：</span>{{item.remarks}} <span v-if="item.op_result.indexOf('发布') !== -1">{{item.op_result}}</span></h6>
          <p class="recent f-normal f-12">{{item.op_date}}</p>
        </timeline-item>
      </timeline>
    </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XHeader, Timeline, TimelineItem } from "vux";
import {mapState} from "vuex";
  import timelineList from '../myManagementNeeds/compoments/timelineList'

export default {
  components: { XHeader, Timeline, TimelineItem ,timelineList},
  name: "mypub_goods",
  data() {
    return {
      reviewList: {},
      timelinelist: [],
      options: {
        getThumbBoundsFn(index) {
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[
            index
          ];
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          let rect = thumbnail.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      }
    };
  },
  methods: {
    show(index1) {
      this.$refs.previewer.show(index1);
    },
    through() {
      this.$router.push({
        name: "allStatus",
        params: {
          id: this.$route.params.id
        }
      });
    }
  },
  computed:{
    ...mapState(['alljson'])
  },
  created() {
    this.$http
      .post("hts/myDemand/detail", {
        demandId: this.$route.params.id
      })
      .then(res => {
        this.alljson.recipients.map((item,index)=>{
          if(item.value == res.data.user_relation||item.name == res.data.user_relation){
            res.data.user_relation = item.name 
            this.reviewList = res.data;
          }
        this.alljson.DemandStatusEnum.map((item,index) => {
            if(item.code === res.data.demand_status) {
                res.data.demand_status = item.value;
            }
        })
      })
      });
    this.$http
      .post("hts/management/logs", {
        demandId: this.$route.params.id
      })

      .then(res => {
        this.timelinelist = res.data;
      });
  }
};
</script>
<style scoped>
.dsh-header {
  width: 100%;
  height: 50px;
  background: #fff2e9;
}

.dsh-header img {
  width: 26px;
  float: left;
}

.dsh-header p {
  float: left;
  width: 80%;
}

.dsh-header i {
  float: right;
  color: #f37409;
  padding-top: 17px;
  float: right;
}
.box-withbar {
  bottom: 55px;
}

.weui-cell_access >>> .weui-cell__ft:after {
  margin-top: -2px;
}

.group-clearbd >>> .weui-cells {
  margin-top: 0;
}

.group-clearbd >>> .weui-cells:before,
.group-clearbd >>> .weui-cells:after {
  border: 0 none;
}

/*需求基本信息*/
.info-base {
  padding: 15px 15px;
}

.info-base .tab-left {
  width: 90px;
}

.info-base .tab-right {
  position: relative;
}

.info-base .tab-right h1 {
  line-height: 100%;
}

.info-base .tab-right p {
  position: absolute;
  bottom: 0;
}

.info-base .tab-right p span {
  padding-right: 10px;
}

/*需求拓展信息*/
.info-exn {
  padding: 10px 15px;
}

.info-exn ul li {
  padding: 5px 0;
}

/*爱心反馈部分*/

.writelovenews {
  padding: 15px 40px;
  border-top: 1px solid #eee;
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
  border-top: 1px solid #eee;
}

.address .add-area {
  padding: 0 15px 20px 15px;
  background: url("../../../../static/appimg/address-bg.jpg") repeat-x bottom;
  background-size: auto 5px;
}

/*捐赠人信息*/
.donor-content {
  padding: 10px 15px;
  border-top: 1px solid #eee;
}

.donor-content ul li {
  padding: 5px 0;
}

/*帮扶记录部分*/
.recordshow {
  border-top: 1px solid #eee;
  padding: 10px 15px;
}

.recordshow h1 span {
  padding: 0 10px 6px 0;
}

.recordshow h1 em {
  padding-top: 4px;
}

.recordshow p {
  padding-bottom: 10px;
}

/*需求编号和进展状态*/
.pub-state {
  padding: 15px 15px 0 15px;
}

.state-timeline-head {
  padding: 5px 0;
}

/*物流信息部分*/

.trans-con {
  border-top: 1px solid #eee;
  padding: 15px 30px 15px 15px;
}

/*时间轴*/
.vux-timeline {
  padding: 10px 2px 10px 80px;
}

.vux-timeline-item >>> .vux-timeline-item-content {
  padding: 0 0 15px 30px;
}

.vux-timeline-item >>> p {
  position: absolute;
  top: 0;
  left: -90px;
  text-align: center;
  width: 90px;
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
  left: -3px;
}

.vux-timeline-item:first-child >>> .vux-timeline-item-content {
  color: #f37306;
}

.vux-timeline-item >>> .weui-icon-success-no-circle {
  font-size: 20px;
}

.vux-timeline-item
  >>> .vux-timeline-item-checked.weui-icon-success-no-circle::before {
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
  right: 0;
}

.btm-ope ul {
  display: flex;
}
.btm-ope ul li {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
