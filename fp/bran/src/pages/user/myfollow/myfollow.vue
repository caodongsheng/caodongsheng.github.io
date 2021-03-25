<template>
  <div>
    <!-- <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="goack">我的关注
      <a v-if="followlist.length>0" slot="right" class="color-orange f-16" @click="st">{{state}}</a>
    </x-header> -->
    <div class="heads">
      <a  class="color-orange f-16 headright" @click="st">{{state}}</a>
    </div>
    <followtemplate :isManager="isManager">
    <template>
      <!--   <div class="qiehuan">
        <div>
            <span class="active" @click="goout()">全国</span>
            <span class="span1 ">地方</span>
        </div>
       </div> -->

      <div
        class="follow-list bg-ffffff mb-12"
        v-for="(item,index) in followlist"
        :key="item.id"
        :class="isManager?'manager':''">
        <div class="list-header clearfix" style="padding-bottom: 0">
          <badge text="众筹" v-if="item.userType===1" class="f_r f-12 badge-green"></badge>
          <badge text="打包" v-if="item.userType===2" class="f_r f-12 badge-red"></badge>
          <badge text="个人" v-if="item.userType===3" class="f_r f-12 badge-orange"></badge>
          <!-- <img class="v-middle bd-radius-cir dis-inline" :src="item.user_pic" width="30"  height="30"> -->
          <avatar tsize="1" width="36" height="36"
              style="float: left;margin-top: 3px" :image="item.user_pic" :name="item.aideder_name"></avatar>
          <span class="tit-nowrap color-999 f-16">{{item.aideder_name}}</span>
          <div class="address color-999">
        <p class="f-12 text-justify"><i class="fa fa-map-marker  f-14" style="color:#d0d0d0"></i>{{item.region_name}}
        </p>
      </div>
        </div>
        <div class="list-content">
          <!--管理选择-->
          <check-icon
            :value.sync="checkBox.items[index]"
            class="checkicon"
            @click.native="handleInputChange(item.id)"
          ></check-icon>
          <!--主内容-->
          <div class="flex-tab" @click="todetail(item)">
            <div class="flex-tab-cell tab-left linkonly">
              <img v-lazy="getmidpic(item.img_url)" width="90" height="90">
            </div>
            <div class="flex-tab-cell tab-right"  v-if="item.demand_type!=1">
              <h1 class="color-333 f-14 tit-2row-nowrap" style="margin-bottom:10px">{{item.demand_title}}</h1>
              <Progresss
                :proge="Number(item.speed)"
                style="margin:15px 0"
              ></Progresss>
              <!--<range class="range-spe" :value="item.moneycount/item.target_amount*100" disabled :rangeBarHeight="4"></range>-->
              <p class="f-14 color-999">
                <span>目标：
                  <em class="color-orange">{{item.target_amount}}</em> 元
                </span>
                <span>已筹：
                  <em class="color-orange">{{item.moneycount}}</em> 元
                </span>
              </p>
            </div>
                 <div class="flex-tab-cell tab-right"  v-else>
              <h1 class="color-333 f-14 tit-2row-nowrap">{{item.demand_title}}</h1>
               <div class="color-333 f-14 tit-2row-nowrap mt-15" >{{item.demand_coment}}</div>
            </div>
          </div>
        </div>
      </div>
      </template>
    </followtemplate>
    <!--底部全选-->
    <div class="fix-bottom btm-checkall clearfix bg-ffffff" v-show="isManager&&followlist.length>0">
      <check-icon :value.sync="isAllChecked" class="f_l" @click.native="checkedAll">全选</check-icon>
      <router-link
        to
        class="btmopebtn f-16 text-center color-white"
        @click.native="delConcernList"
      >删除</router-link>
    </div>
    <div v-transfer-dom>
      <confirm
        v-model="show"
        title="操作提示"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
        @on-show="onShow"
        @on-hide="onHide"
      >
        <p style="text-align:center;">确定删除</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import {
  XHeader,
  Badge,
  Range,
  CheckIcon,
  Confirm,
  Tab,
  TabItem,
  TransferDomDirective as TransferDom
} from "vux";
import followtemplate from "./followtemplate";
import Avatar from "../../../components/util/avatar";
import { getMinPic } from "../../../util/getMin";
import Progresss from "@/components/prog/Progress";
 import { getMidPic } from "@/util/getMid";

export default {
  name: "myfollow",
  directives: {
    TransferDom
  },
  components: {
      Tab,
  TabItem,
    XHeader,
    Badge,
    Range,
    CheckIcon,
    followtemplate,
    Confirm,
    Avatar,
    Progresss
  },
  data() {
    return {
      show: false,
      // 管理状态,
      state: "管理",
      isManager: false,
      isAllChecked: false,
      checkBox: {
        checked: false,
        items: {}
      },
      selectedData: [],
      followlist: [
        /*{
          id:'3434',
          user_pic: './static/appimg/ylbf_logo.png',
          aideder_name: '中国福利基金会5654654654',
          img_url: './static/appimg/pro-img.jpg',
          demand_title: '不要让孩子的上学梦 止步于疾病和贫穷',
          moneycount: 20000,
          target_amount: 50000,
          userType: 1,
          helpmoney: 100,
          ischeck:true
        },{
          id:'1212',
          user_pic: './static/appimg/ylbf_logo.png',
          aideder_name: '中国福利基金会',
          img_url: './static/appimg/pro-img.jpg',
          demand_title: '不要让孩子的上学梦 止步于疾病和贫穷',
          moneycount: 20000,
          target_amount: 50000,
          userType: 2,
          helpmoney: 100,
          ischeck:false
        }*/
      ]
    };
  },
  created() {
    this.getFollowList();
  },
  mounted() {
    this.followlist.forEach((item, index) => {
      // this.selectedData.push(item.id);
      this.$set(this.checkBox.items, index, this.checkBox.checked);
    });
  },
  methods: {
     getmidpic(imgurl){
    return getMidPic(imgurl)
    },
     goack(){
        // if(this.$route.query.from&&this.$route.query.from=="app"){
       //  window.history.go(-1)
            // window.myhome.windowfinish();
            this.ModuleNative('close','返回原生')

        // }
       //  else{
       //    this.$router.replace("/user")
      //   }

      },
    goout(){
      ///pages/amconcerned/myaubout-y/myaubout.html?userid=4239897398&token=28bb9ed9454f180f2c0b448539d52a5098d4d19588bfa76d90b9e29277709e933f694fc29e6c28c084cc04b82c1b89060d2e2ee911f153e823546adc0f54fc06097dbdcc79a4ac4810061
          window.location.href=process.env.DJRES_URL_DEV+'appia630/pages/amconcerned/myaubout-y/myaubout.html?version=1&userid='+localStorage.getItem("userid")+"&token="+this.G("token");

    },
    st() {
      this.isManager = !this.isManager;
      this.state = this.isManager == true ? "完成" : "管理";
    },
    todetail(item) {
      // this.$router.push("/loveNeed/" + item.id);
      let url=window.location.protocol + window.location.host+"/gzddpt/index.html#/loveNeed/" + item.id
      console.log('==',url)
      this.ModuleNative('pushPage',url)
    },
    onCancel() {
      this.isManager = true;
    },
    delConcernList() {
      if (this.selectedData.length === 0) {
        this.showToast("", "text", "请至少选择一项", "20em", "", "middle");
      } else {
        this.show = true;
      }
    },
   async onConfirm(msg) {
      let self = this;
     //  if(self.isManager){
        self.isManager = true;
        self.isManager = false;
    //  }
      let demandidarr = [];
      let demandindex = [];
      self.selectedData.map(item1 => {
        self.followlist.map((item2, index) => {
          if (self.followlist[index].id === item1) {
            demandidarr.push(item1);
            demandindex.push(index);
          }
        });
      });
     await  this.$http
        .post("uts/user/loveConcern", {
          demand_id: demandidarr.join(","),
          check: 0
        })
        .then(res => {})
        .catch(err => {
          if (err.code == "03016") {
            demandidarr.forEach(val => {
               self.followlist.map(function(val2,index){
                if(val2.id==val){
                   self.followlist.splice(index,1)
                }
               })
              self.selectedData.splice(self.selectedData.indexOf(val), 1);
            });
          }
        });
        self.state = "管理"
       for(let key in self.checkBox.items){
         self.checkBox.items[key] = false
       }
         self.selectedData = []
    },
    onHide() {},
    onShow() {},
    checkedAll() {
      let trueNum = 0;
      let checkBoxNum = 0;
      Object.keys(this.checkBox.items).forEach(key => {
        checkBoxNum++;
        if (this.checkBox.items[key] == true) {
          trueNum++;
        }
      });
      if (trueNum != 0) {
        if (
          trueNum != this.followlist.length ||
          checkBoxNum < this.followlist.length
        ) {
          this.checkboxDataMap(!this.checkBox.checked);
        } else {
          this.checkboxDataMap(this.checkBox.checked);
        }
      } else {
        this.checkboxDataMap(!this.checkBox.checked);
      }
    },
    checkboxDataMap(checked) {
      let checkboxDataId = [];
      this.followlist.forEach((item, index) => {
        this.checkBox.items[index] = checked;
        checkboxDataId.push(item.id);
      });
      if (checked == true) {
        this.selectedData = this.arrayMerging(
          this.selectedData,
          checkboxDataId
        );
      } else {
        this.selectedData.splice(0, this.followlist.length);
      }
    },
    //图片后缀修改(min格式)
    changetype(imgurl) {
      return getMinPic(imgurl);
    },
    handleInputChange(id) {
      setTimeout(() => {
        if (this.selectedData.indexOf(id) > -1) {
          this.remove(this.selectedData, id);
        } else {
          this.selectedData.push(id);
        }
        if (this.selectedData.length < this.followlist.length) {
          this.isAllChecked = false;
        } else {
          this.isAllChecked = true;
        }
      },0);
      // if(!this.isManager){
      //    this.isManager = true;
      // }
      this.isManager = false;
      this.isManager = true;

    },
    //数组删除
    remove(arr, val) {
      var index = arr.indexOf(val);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    //数组合并去重
    arrayMerging(arr1, arr2) {
      var arr = arr1.concat();
      for (var i = 0; i < arr2.length; i++) {
        if (arr.indexOf(arr2[i]) === -1) {
          arr.push(arr2[i]);
        }
      }
      return arr;
    },
    getFollowList() {
      let self = this;
      this.$http.post("uts/user/concernList", {}).then(function(response) {
        if (response.msg == "请求成功") {
          self.followlist = response.data.list;
        } else {
          //alert(response.msg)
          self.showToast("", "text", response.msg, "20em", "top");
        }
      });
    }
  }
};
</script>

<style scoped>
.heads{
  height: 53px;
}
.heads .headright{
    float: right;
    line-height: 50px;
    padding: 0 20px;
}
.list-header {
  padding: 10px 15px;
}

.list-content {
  padding: 10px 15px;
}

.list-content .tab-left {
  width: 100px;
}

.list-content .tab-right {
  position: relative;
}

.list-content .tab-right h1 {
  line-height: 130%;
}

.list-content .tab-right p {
  position: absolute;
  bottom: 0;
}

.list-content .tab-right p span {
  padding-right: 10px;
}

.list-info .list-info-header {
  padding: 10px 15px 10px;
  border-bottom: 1px solid #eee;
}

.list-info .list-info-content {
  padding: 10px 15px 10px;
  position: relative;
}

.list-info-content ul li {
  padding: 4px 0;
}

.list-content .tab-left {
  width: 105px !important;
}

.list-state .btn-bordered {
  margin-right: 10px;
}

.list-state .btn-bordered.btn-bordered-orange {
  margin-right: 0;
}

.list-header .vux-badge {
  margin-top: 5px;
}

/*进度条*/

.vux-range-input-box {
  padding: 8px 0;
  margin: 0 !important;
}

.vux-range-input-box >>> .range-max,
.vux-range-input-box >>> .range-min {
  display: none;
}

.vux-range-input-box >>> .range-bar-disabled {
  opacity: 1;
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

.range-spe {
  position: absolute !important;
  bottom: 30px;
  left: 0;
  right: 0;
}

/*管理状态可用*/
.follow-list {
  overflow: hidden;
}
.follow-list.manager .list-header,
.follow-list.manager .list-content {
  transform: translate(35px, 0px);
}
.follow-list .list-header,
.follow-list .list-content {
  transition: all 0.5s;
}

.checkicon {
  position: absolute;
  left: -25px;
  top: 50%;
  transform: translate(0, -50%);
}
.follow-list .list-content .checkicon {
  display: none;
}
.follow-list.manager .list-content .checkicon {
  display: block;
}
/*选中状态*/

.vux-check-icon >>> .weui-icon-success:before,
.vux-check-icon >>> .weui-icon-success-circle:before {
  color: #fd8b2a;
}

/*显示底部全选*/
.btm-checkall {
  padding: 13px;
  border-top: 1px solid #eee;
  box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.15);
}
.btmopebtn {
  height: 53px;
  line-height: 53px;
  padding: 0 50px;
  background: #ff6902;
  display: inline-block;
  position: absolute;
  right: 0px;
  top: 0;
}
.qiehuan{
    width: 100%;
    overflow: hidden;
    display:inline-block;
     text-align: center;
}
.qiehuan div{
  display:inline-block;

    color: #fff;
    font-size: 15px;
    overflow: hidden;
    margin: 0 auto;
}
.qiehuan div span{
    padding: 7px 18px;
    background: #ee6b2b;
    border-radius: 5px 0 0 5px;
    float: left;
    border: 1px solid #ee6b2b;
    box-sizing: border-box;
}
.qiehuan div .span1{
    border-radius: 0 5px 5px 0;
}
.qiehuan div .active{
    background: #fff;
    color: #ee6b2b;
}
</style>
