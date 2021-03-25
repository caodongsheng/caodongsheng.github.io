<template>
  <div>
    <x-header :left-options="{backText: ''}">待审核</x-header>
        <div class="box-withbar over-auto bg-f6f5f6">
      <router-link :to="{name:titles.help_type_code_total?'waitCheckNeeds':'',params:{nams:reviewList.aideder_name,id:ids,num:titles.total}}">
        <div class="dsh-header"  >
          <img src="../../../../static/appimg/user-pub-wp.png">
          <p>{{reviewList.aideder_name}} 最近3个月内已有{{titles.help_type_code_total?titles.help_type_code_total:'0'}}条{{titles.help_type_code_name}}；该人累计总需求量达{{titles.total?titles.total:'0'}}条</p>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
      </router-link>
      <!--需求基本信息-->

      <div class="info-base bg-ffffff mb-12">
         <div class="flex-tab">
          <div class="flex-tab-cell tab-left linkonly">
            <img :src="reviewList.img_url" width="80" height="80">
          </div>
          <div class="flex-tab-cell tab-right" @click="loveDemand">
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
          <li><span class="color-999">需求发布人：</span>{{reviewList.publish_name}}</li>
          <li><span class="color-999">发布人联系方式：</span>{{reviewList.publish_tel}}</li>
          <li><span class="color-999">发布人与受助人关系：</span>{{reviewList.user_relation}}</li>
        </ul>
      </div>

      <!--需求编号及状态-->
      <div class="pub-state bg-ffffff  f-14 mb-12">
        <span class="color-999">需求编号：</span>{{reviewList.id}}
        <div class="state-timeline-head">
          <span class="color-999">需求状态：</span>{{reviewList.demand_status}}
        </div>
        <!--进度时间轴部分-->
        <div class="state-timeline-content">
          <timeline>

            <timeline-item v-for="(item,index) in timelinelist" :key="index">
              <h4 class="recent f-normal f-14">{{item.op_result}}</h4>
              <h5 class="recent f-normal f-14" style="height:100%;word-wrap:break-word;word-break:break-all;">{{item.staff_name}}</h5>
              <p class="recent f-normal f-12">{{item.op_date}}</p>
            </timeline-item>
          </timeline>
        </div>

      </div>
    </div>
    <!--底部操作-->
      <div class="btn">
        <p v-for="(item,index) in btn" :key="index" :class="{active:index==btn1}" @click="btns(index)">{{item}}</p>
      </div>
   <div v-transfer-dom>
               <confirm v-model="showpassconfirm" title = '提示' @on-confirm = "pass" @on-cancel="showpassconfirm=false"><p style="text-align:center;">确定此需求审核通过？</p></confirm>
</div>
    </div>
</template>
<script>
import { XHeader, Timeline, TimelineItem, Scroller,Confirm ,TransferDom} from "vux";
import {mapState} from "vuex";
export default {
directives: {TransferDom},

  components: { XHeader, Timeline, TimelineItem ,Confirm},
  name: "mypub_goods",
  data() {
    return {
      showpassconfirm:false,
      reviewList: {},
      Demand: {}, //三个月内的条数与总数量
      timelinelist: [],
      titles: {},
      ids: {},
      btn: ["审核通过", "审核不通过"],
      btn1: 0,
      Scroller,
      userRelation:'',
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
    pass () {
            this.$http.post("hts/management/isPass", {
            id: this.$route.params.id,
            isCheck: 1,
            isPoor: this.$route.params.is_poor
          })
          .then(res => {
                this.$router.replace({
                    name: "waitCheckAdopt",
                    params: {
                        id: this.$route.params.id,
                        nextId: res.data,
                    }
                })
          })
          .catch(err => {
              if(err.code == 'HTS03007') {
                  this.showToast('','text','该用户需求发布过多','20em','','middle');
              }else {
                if(err.msg)
                  this.showToast('','text',err.msg,'20em','','middle');
              }
          })
            this.showpassconfirm = false;
    },
    btns(ind) {
      this.btn1 = ind;
      if (ind === 0) {
       this.showpassconfirm = true;
  
      } else {
        this.$router.replace({
          name: "notpass",
          params: {
            id: this.$route.params.id
          }
        });
      }
    },
    //跳转爱心需求页面
    loveDemand() {
      this.$router.push({
        name: "loveNeed",
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
        //获取与受助人关系
        this.alljson.recipients.map((item,index)=>{
        if(item.value == res.data.user_relation||item.name == res.data.user_relation){
          res.data.user_relation = item.name
          this.reviewList = res.data;
        }
        //获取需求状态
        this.alljson.DemandStatusEnum.map((item) => {
            if(item.code == res.data.demand_status) {
                res.data.demand_status = item.value;
            }
        })
      })

        this.ids = res.data.aideder_user_id;
        this.$http
          .post("hts/management/getDetails", {
            aidederUserId: res.data.aideder_user_id,
            help_type_code: res.data.help_type_code
          })
          .then(res => {
            this.titles = res.data;
          });
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dsh-header img {
  width: 26px;
  float: left;
  padding-left: 10px;
}

.dsh-header p {
  float: left;
  width: 80%;
  font-size: 12px;
}

.dsh-header i {
  float: right;
  color: #f37409;
  float: right;
  padding-right: 10px;
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
.btn {
  width: 100%;
  height: 54px;
  position: fixed;
  bottom: 0;
  display: flex;
  border-top: 1px solid #f2f2f2;
}
.btn p {
  flex: 1;
  text-align: center;
  line-height: 54px;
  background: #fff;
}
.btn .active {
  background: #f37306;
  color: #fff;
}
</style>
