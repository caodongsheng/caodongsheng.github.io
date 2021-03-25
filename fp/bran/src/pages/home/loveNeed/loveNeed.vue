<template>
  <!--https://www.cnblogs.com/yesyes/p/6689082.html-->
  <div class="loveNeed-wrapper">
    <!-- <x-header :left-options="{backText: ''}" title="爱心需求"> -->
    <x-header
      :left-options="{backText: '',preventGoBack: true}"
      @on-click-back="backToPre"
      title="爱心需求"
    >
      <a slot="right" @click="toShare" v-show="cansee">
        <i class="iconfont icon-f-share2 f-20"></i>
      </a>
    </x-header>
    <!-- <share ref="sharea" :vos='vos'></share> -->
    <div class="loveNeed-container" :style="constainerHeight">
      <!--帮扶信息-->
      <headInfo :vos="voss"></headInfo>
      <div v-if="type==1" class="needTitle-container">
        <p class="needTitle">{{voss.demand_title}}</p>
        <p class="needClassify">
          <span v-if="voss.beforCateGory!=''">#{{voss.beforCateGory}}</span>
          <span>#{{voss.demand_use}}</span>
        </p>
      </div>
      <div v-else-if="type==2">
        <!--帮扶完成-->
        <percent :vos="voss"></percent>
        <!--资金用途-->
        <!-- <moneyUse :vos='voss'></moneyUse> -->
        <!--帮扶榜-->
        <helpList :paramsID="paramsID"></helpList>
      </div>
      <!--需求详情-->
      <demandDetails :vos="voss"></demandDetails>
      <!--需求证明-->
      <demandProve v-if="voss.demand_status==3" :paramsID="paramsID"></demandProve>
      <!--帮扶记录-爱心反馈-->
      <tab
        v-if="voss.demand_status==3 || voss.demand_status==6 || voss.demand_status==1"
        v-model="index"
        active-color="#F06B1B"
        custom-bar-width="50%"
      >
        <!-- <tab-item :selected="demo1 === item" v-for="(item, index) in list2" @click="demo1 = item" :key="index">{{item}}</tab-item> -->
        <tab-item
          :selected="demo1 === item"
          v-for="(item, index) in list2"
          @click="demo1 = item"
          :key="index"
        >{{item}}</tab-item>
      </tab>
      <Helprecord
        :paramsID="paramsID"
        :type="type"
        v-show="index === 0 && (voss.demand_status==3||voss.demand_status==6 ||voss.demand_status==1)"
      ></Helprecord>
      <Feedback
        :paramsID="paramsID"
        v-show="index === 1 && (voss.demand_status==3 || voss.demand_status==6 || voss.demand_status==1)"
      ></Feedback>
    </div>
    <!--Foot-->
    <demandFoot
      v-if="voss.demand_status==3 && user_type"
      :vos="voss"
      :paramsID="paramsID"
      :concern="concern"
      @goout="getOutLink"
      :aideder_name="voss.aideder_name"
    ></demandFoot>
    <transition name="fadeisN">
      <div class="isPayTip-wrapper" v-show="payIsNShow">
        <div class="isPayTip-container">
          <p class="isPayTip-con">感谢您的捐赠，为了保证您的账户权益及后续爱心积分的即时到账，建议您立刻前往注册及登录</p>
          <div class="isPayTip-operate">
            <span @click="cancelLoginFun">取消</span>
            <span @click="confirmLoginFun">去登录</span>
          </div>
        </div>
        
      </div>
    </transition>
   <!--  <div v-transfer-dom>
      <confirm
        v-model="payIsNShow"
        title="提示"
        confirm-text="去登录"
        cancel-text="取消"
        @on-confirm="confirmLoginFun"
        @on-cancel="cancelLoginFun">
        <p class="f-14 text-center" style="margin: 15px 0;font-size: 15px;color: #353535;"
        >感谢您的捐赠，为了保证您的账户权益及后续爱心积分的即时到账，建议您立刻前往注册及登录</p></confirm>
    </div> -->
    <div class="footer" v-if="voss.demand_status==6">该条爱心需求当前正处于待送出状态</div>
    <div class="footer" v-if="voss.demand_status==1">该条爱心需求当前正处于待审核状态</div>
  </div>
</template>

<script>
import { Tab, TabItem, XHeader, Confirm, TransferDom} from "vux";
import shareUrlParamsFilter from "@/util/filter.js";
// import share from '@/components/share/share'
import percent from "./percent";
import demandDetails from "./demandDetails";
import demandProve from "./demandProve";
// import moneyUse from "./moneyUse";
import headInfo from "./headInfo";
import helpList from "./helpList";
import demandFoot from "./demandFoot";
import Feedback from "./loveNeedCom/Feedback";
import Helprecord from "./loveNeedCom/Helprecord";
import { mapActions, mapState } from "vuex";
const list = () => ["帮扶记录", "爱心反馈"];
export default {
  directives: {
    TransferDom
  },
  components: {
    headInfo,
    percent,
    demandDetails,
    demandProve,
    // moneyUse,
    helpList,
    demandFoot,
    Tab,
    TabItem,
    Feedback,
    Helprecord,
    XHeader,
    Confirm
    //   share
  },
  data: function() {
    return {
      flag: true,
      list2: list(),
      demo1: "帮扶记录",
      index: 0,
      paramsID: "", // 需求详情id
      type: "",
      concern: "", // 是否关注，0为未关注
      vos: {},
      voss: {},
      cansee: true,
      frompay:false,
      routepath: "",
      payIsNShow:false,
      loginCont:"感谢您的捐赠，为了保证您的账户权益及后续爱心积分的即时到账，建议您立刻前往注册及登录",
      user_type:true
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path.indexOf("demand") != -1) {
        vm.routepath = from.path;
      } else if (from.path.indexOf("searchList") != -1) {
        vm.routepath = from.path;
      } else {
        vm.routepath = "/recom";
      }
      //如果flag是1且是直接跳转过来的而不是从证书页调过来的，说明是支付页跳转过来
      if(from.path=="/"&&vm.$route.query.flag == 1)
       vm.frompay = true;
    });
  },
  mounted() {

  },
  watch:{
    
  },
  methods: {
    ...mapActions(["getDynamicList"]),
    getDynamicList() {
      this.$store.dispatch("getDynamicList", this);
    },
    confirmLoginFun(){
      this.payIsNShow = false
      // window.android.login()
      this.ModuleNative('AppReturnToLoginPage','需求详情去登录')
    },
    cancelLoginFun(){
      this.payIsNShow = false
      localStorage.setItem("isFirstPay",1)
    },
    payOk(ordernum, submitmoney) {
      let _this = this;
      let aidederName = this.voss.aideder_name;
      // 以下前端回调暂时注释，测试微信回调后台功能
      this.$http
        .post("/hts/help/updateCapitalState", {
          id: ordernum,
          pay_flag: 1,
          paid_money: submitmoney
        })
        .then(res => {
          let user = _this.$store.state.user.realname
            ? _this.$store.state.user.realname
            : _this.$store.state.user.nick_name;
          _this.$router.push({
            path: "/certificate",
            query: {
              user: user,
              to: aidederName,
              target: submitmoney + "元",
              flag: 1,
              routepath: _this.$route.path
            }
          });
        })
        .catch(error => {
          _this.showToast("", "text", "保存订单状态失败," + error.code);
        });
    },

    getOutLink() {
      this.flag = false;
    },
    toShare() {
      if (this.isWeixinCient()) {
        // let obj = {}
        // obj.title = `中国社会扶贫网，让爱在阳光下链接-${
        //   this.vos.region_name.indexOf('县') > 0
        //     ? this.vos.region_name.split('县')[0] + '县'
        //     : this.vos.region_name.split('市')[0] + '市'
        // }的需求${this.vos.demand_title}`
        // obj.desc = this.vos.demand_coment
        // obj.link = this.WinXinHost + '#' + location.href.split('#')[1]
        // obj.imgUrl = this.vos.imgUrl[0]
        // obj.demandId = this.vos.id

        alert('点击右上角"...",分享给朋友或朋友圈，让更多的人帮助TA');
      } else if (this.isapp()) {
        let shareTitle1 = this.vos.title;
        let shareContent1 = this.vos.desc;
        if(shareContent1.length>100){
          shareContent1 = shareContent1.substr(0,100);
        }
        let shareUrl = shareUrlParamsFilter(this.vos.link);
        let downloadImg = this.vos.imgUrl;
        let url = shareUrl;
        let shareInfo =
          '{"picurl":"' +
          downloadImg+'","title":"' +
          shareTitle1 +
          '","text":"' +
          shareContent1 +
          '","type":"' +
          6 +
          '","url":"' +
          url +
          '","ischange":' +
          '"2"' +
          "}";
          console.log('分享参数',shareInfo)
          this.ModuleNative('share',shareInfo)
      } else {
        this.showToast("", "text", "网页上无法分享，请使用APP或微信");
      }
    },
    backToPre() {
       if(this.$route.query.from&&this.$route.query.from=="app"){
            console.log("从app进入爱心需求")
            // window.myhome.windowfinish();
            this.ModuleNative('close','返回原生')
            return;
        }
        if (this.$route.query.flag == 1) {
          // history.go(-5);
          console.log("flag==1  爱心需求")
          // window.myhome.windowfinish();
          this.ModuleNative('close','详情返回原生')
          return false
        } else {
          this.$router.go(-1);
        }
    },
    gotoCer(){
        if(this.$route.query.payIsN == "false"){
          this.$store.dispatch("getUser", { _this: this.$http }).then(response => {
              let ordernum = this.$route.query.ordernum;
              let money = this.$route.query.money;
              if( this.$route.query.success == 1){
               this.payOk(ordernum,money)
              }
          });
        }
        
     
    },
    getAllBangfuInfo() {
      this.paramsID = this.$route.params.id;
      let _this = this;
      let linkurl = _this.WinXinHost + "#" + location.href.split("#")[1];
      this.$http
        .post("hts/help/detail", { demand_id: this.$route.params.id })
        .then(function(response) {
          _this.concern = response.data.concern;
          _this.type = response.data.demand_type;
          _this.voss = response.data;
          _this.vos = {};

          _this.vos.title = `中国社会扶贫网，让爱在阳光下链接-${
            _this.voss.region_name.indexOf("县") > 0
              ? _this.voss.region_name.split("县")[0] + "县"
              : _this.voss.region_name.split("市")[0] + "市"
          }的需求${_this.voss.demand_title}`;
          _this.vos.desc = _this.voss.demand_coment;
          // _this.vos.link = linkurl;
          // _this.vos.link = _this.WinXinHost + '#'+location.href.split("#")[1]
          _this.vos.link = _this.WinXinHost + '#'+location.href.split("#")[1] + '?name='+encodeURIComponent(_this.city.name)+'&id='+_this.city.id+'&type=1&provinceName='+encodeURIComponent(_this.city.provinceName)+'&provinceArea='+_this.city.provinceArea
          _this.vos.imgUrl = _this.voss.imgUrl[0];
          _this.vos.demandId = _this.voss.id;
          _this.cansee = true;
          if (_this.isWeixinCient()) {
            _this.setWeixinConfig(_this.vos);
          }
          if(_this.frompay){
            _this.gotoCer()
          }
        })
        .catch(function(error) {
          _this.cansee = false;
          if (error.code === "D2002") {
            _this.showToast(
              "",
              "text",
              "该需求已经不存在了。",
              "20em",
              "middle"
            );
            _this.$router.push("/");
          }
        });
    }
  },
  created() {
    this.user_type=localStorage.user_type!='20'?true:false
    if(localStorage.getItem("isFirstPay") == 1 || localStorage.getItem("isFirstPay") == '1'){
      this.payIsNShow = false
    }else{
      if(this.$route.query.payIsN == "false" || this.$route.query.payIsN == undefined){
        this.payIsNShow = false
      }else {
        this.payIsNShow = true
      }
    }
    this.getAllBangfuInfo();
    this.getDynamicList();
  },
  computed: {
    ...mapState(["dynamicList",'city']),
    feedDetail: function() {
      return (this.feedList = this.$store.state.dynamicList);
    },
    constainerHeight: function() {
      if (this.voss.demand_status == 3) {
        return {
          bottom: "50px"
        };
      } else {
        return {
          bottom: "0px"
        };
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.fadeisN-enter-active, .fadeisN-leave-active {
  transition: opacity .5s;
}
.fadeisN-enter, .fadeisN-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.isPayTip-wrapper{
    position:fixed;
    background: rgba(0,0,0,.5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .isPayTip-container{
      position:absolute;
      background: #fff;
      width: 80%;
      left: 10%;
      top: 33%;
      border-radius: 4px;
      .isPayTip-con{
        color:#353535;
        font-size:15px;
        text-align:center;
        padding:30px 10px 10px;
      }
      .isPayTip-operate{
        position:relative;
        display: flex;
        margin-top: 15px;
        &:after{
          position:absolute;
          top:0;
          left:0;
          right:0;
          border-top:1px solid #D5D5D6;
          transform: scaleY(0.5);
          content:'';
        }
        span{
          flex:1;
          padding: 10px;
          text-align:center;
          font-size:15px;
          &:first-child{
            color:#353535;
          }
          &:last-child{
            color:#fff;
            background:#f37306;
          }
        }
      }
    }
}
.loveNeed-wrapper {
  min-height: 100%;
  background-color: #FAFAFA;

  .needTitle-container {
    padding: 0 17px;
    margin-bottom: 10px;
    background: #fff;

    .needTitle {
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }

    .needClassify {
      padding: 12px 0;

      span {
        display: inline-block;
        margin-right: 20px;
        color: #F9A410;
        font-size: 13px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .loveNeed-container {
    -webkit-overflow-scrolling: touch;
    position: absolute;
    top: 47px;
    width: 100%;
    overflow-y: auto;
    margin-bottom: 10px;
  }
}

.vux-tab-wrap {
  height: 46px;
  padding-top: 0 !important;

  .vux-tab-container {
    position: relative;
    height: 46px;

    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 1px solid #E5E5E5;
    }

    .vux-tab {
      height: 46px;

      .vux-tab-item {
        font-size: 16px;
        color: #333;
        line-height: 46px;
      }
    }
  }
}

.footer {
  position: fixed;
  background-color: white;
  bottom: 0;
  color: #f37306;
}
</style>
