<template>
  <div class="box" style="height: 100%">
       <!-- <x-header :left-options="{backText: ''}" >{{headerTitle}}</x-header> -->
       <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">{{headerTitle}}</x-header>
    <div class="box-withheader">
    <div class="list-topoperate clearfix f-14 bg-ffffff color-999">
      <p style="border-bottom:1px solid #ccc;">
          <span v-show="nones">
            <input type="checkbox" @click="check"> 本人审核
          </span>
          <span @click="type1">{{types1?types1:"需求类型"}}<i :class="btn" class="icon"></i></span>
          <span @click="state1">{{types2?types2:"用户类型"}} <i :class="btn1" class="icon"></i></span>
      </p>
      <ul v-show="shows">
        <li v-for='(item,index) in types' :key='index' @click="changes(item.code,index)">{{item.value}}</li>
      </ul>
      <ul v-show="shows1">
        <li v-for='(item,index) in poorHouseholds' :key='index' @click="changes1(item.code,index)">{{item.value}}</li>
      </ul>
      <div class="f-14 list-totals">共{{num}}条</div>
    </div>
    <div v-if = "data.total == 0" style="position: absolute;top:77px;left:0;right:0;bottom:0">
        <div class="check-box">
            <img src="../../../../static/appimg/zwnr.png">
            <p class="color-999 f-24">暂无内容</p>
        </div>
    </div>
    <div v-else  style="position: absolute;top:77px;left:0;right:0;bottom:0">
        <audit :data="data" :checkStatus="checkStatus" :iself="iself" :ispoor="ispoor"></audit>
    </div>
    </div>
    </div>
</template>
<script>
import audit from "./audit/audit";
import { XHeader } from "vux";
import { mapState } from "vuex";
export default {
  components: {
    XHeader,
    audit
  },
  data() {
    return {
      btn: "fa fa-caret-up", //需求类型上箭头
      btn1: "fa fa-caret-up", //用户类型上箭头
      shows: false, //需求类型显示隐藏
      shows1: false, //用户类型显示隐藏
      nones: false, //本人审核显示隐藏
      headerTitle: "审核需求",
      types: [],
      poorHouseholds: [],
      data: {},
      num: 0, //共几条
      types1: "", //审核通过或审核不通过
      types2: "", //贫困户或非贫困户
      onFetching: false,
      checkStatus: "",
      ispoor: "",
      datas: "",
      iself: ""
    };
  },

  methods: {
      backToPre() {
          this.$router.replace('/homeWork');
      },
    type1() {
      if (this.shows == false) {
        //审核显示
        this.shows = true;
        //贫困户隐藏
        this.shows1 = false;
        //类型下箭头
        this.btn = "fa fa-caret-down";
        //状态上箭头
        this.btn1 = "fa fa-caret-up";
      } else {
        //审核隐藏
        this.shows = false;
        //审核上箭头
        this.btn = "fa fa-caret-up";
      }
    },
    state1() {
      if (this.shows1 == false) {
        //贫困户显示
        this.shows1 = true;
        //审核隐藏
        this.shows = false;
        //状态下箭头
        this.btn1 = "fa fa-caret-down";
        //状态上箭头
        this.btn = "fa fa-caret-up";
      } else {
        //贫困户隐藏
        this.shows1 = false;
        //状态上箭头
        this.btn1 = "fa fa-caret-up";
      }
    },
    whole() {},
    showList(check_status, is_poor, self) {
      if (check_status == "") {
        this.nones = false;
        this.checkStatus = "";
      } else {
        this.checkStatus = check_status;
        if (check_status == "02") {
          this.nones = true;
        } else {
          this.nones = false;
        }
      }
      this.ispoor = is_poor;
      this.iself = self;
         this.$store.dispatch("changeshowlist",{
          checkStatus: this.checkStatus,
          isPoor: is_poor,
          isOneself: this.iself})
      this.$http
        .post("hts/management/showList", {
          checkStatus: this.checkStatus,
          isPoor: is_poor,
          isOneself: this.iself
        })
        .then(res => {
          if (res.msg == "请求成功") {
            this.data = res.data;
            this.num = res.data.totals;
          }
        });
    },
    //需求类型
    changes(check_status, ind) {
      this.types1 = this.types[ind].value; //审核通过或审核不通过
      this.shows = false;
      this.btn = "fa fa-caret-up";
      this.showList(check_status,this.ispoor,this.iself);
    },
    changes1(is_poor, ind) {
      this.types2 = this.poorHouseholds[ind].value;
      this.shows1 = false;
      this.ispoor = is_poor;
      this.btn1 = "fa fa-caret-up";
      this.showList(this.checkStatus, this.ispoor,this.iself);
    },
    check(e) {
    //   this.showList(this.checkStatus, this.ispoor, e);
      if (e.target.checked) {
        this.checkStatus = "02";
        this.showList(this.checkStatus, this.ispoor, 1);
      } else {
        this.checkStatus = "02";
        this.showList(this.checkStatus, this.ispoor, 0);
      }
    },
    // page(page) {}
  },
  computed: {
    ...mapState(["alljson"])
  },
  created() {
    this.types = this.alljson.HtsStatusenums;
    this.poorHouseholds = this.alljson.UserLeavelEnum;
    this.types1 = this.types[1].value;
    this.shows1 = false;
    this.btn1 = "fa fa-caret-down";
    this.checkStatus ? this.checkStatus : (this.checkStatus = "01");
    this.showList(this.checkStatus);
  }
};
</script>

<style scoped>
._v-container {
  margin-top: 150px;
}
.box {
  background: #f6f5f6;
}
.loading {
  height: 50px;
}
.no-more {
  text-align: center;
}
.box-bg {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: #f6f6f6;
  text-align: left;
}
.icon {
  padding-left: 5px;
  font-size: 12px;
}

.list-totals {
  padding: 5px 15px;
  background-color: #f6f5f6;
}

.list-topoperate {
  padding: 0;
}

.list-topoperate ul {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 43px;
  bottom: 0;
  z-index: 999;
}

.list-topoperate ul li {
  line-height: 36px;
  background: #fff;
  padding-left: 15px;
}
.list-topoperate span {
  display: inline-block;
  padding: 10px 15px;
}

.list-topoperate i.icon-caret {
  display: inline-block;
  position: relative;
  width: 0;
  height: 0;
  border: 4px solid;
  border-color: #999 transparent transparent transparent;
  top: 2px;
  left: 4px;
}

.check-box-one {
  padding: 0 15px;
  background: #fff;
  margin-bottom: 10px;
}

.list-content {
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
  padding: 15px 0;
}

.list-content .tab-left {
  width: 90px;
}

.list-content .tab-right {
  position: relative;
}

.list-content .tab-right h1 {
  line-height: 100%;
}

.list-content .tab-right p {
  position: absolute;
  bottom: 0;
  line-height: 1.6;
}

.list-content .tab-right p span {
  padding-right: 10px;
}

.list-state {
  width: 100%;
  height: 45px;
  line-height: 45px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-state span:nth-child(2) {
  color: #ccc;
}
.list-state .btn-bordered {
  margin-right: 10px;
}

.list-state .btn-bordered.btn-bordered-orange {
  margin-right: 0;
}

.vux-header .vux-header-title b {
  font-size: 16px !important;
}
.check-box {
  text-align: center;
  margin-top: 30%;
}

.check-box img {
  width: 30%;
}
</style>
