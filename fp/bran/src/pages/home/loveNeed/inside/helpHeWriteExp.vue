<template>
  <div>
    <!-- <x-header :left-options="{backText: ''}">{{type == 2? '填写快递':'填写信息'}}</x-header> -->
    <x-header
      :left-options="{backText: '',preventGoBack: true}"
      @on-click-back="backToPre"
    >{{type == 2? '填写快递':'填写信息'}}</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <!--收货地址-->
      <div class="address bg-ffffff mb-12">
        <group class="group-clearbd">
          <cell class="f-16 address-title" title="收货地址"></cell>
        </group>
        <div class="clearfix name-area f-14">
          <span class="f_l">
            <em>收货人：</em>
            {{aidedObj.aideder_name}}
          </span>
          <span class="f_r">{{aidedObj.aideder_tel}}</span>
        </div>
        <div class="add-area flex-tab-cell f-14">
          <div class="flex-tab-cell tab-left v-top" style="width: 50px;">地址：</div>
          <div class="flex-tab-cell tab-right v-top">{{aidedObj.aideder_address}}</div>
        </div>
      </div>
      <group
        class="group-clearbd bg-ffffff"
        label-width="4em"
        label-margin-right="2em"
        label-align="left"
      >
        <popup-picker
          class="labelStyle"
          v-if="type==2"
          title="快递公司"
          :data="companyList"
          v-model="selectCompany"
          value-text-align="left"
        ></popup-picker>
        <x-input
          class="f-16 labelStyle"
          :is-type="companyOrdercheck"
          :required="true"
          v-for="(item,index) in expressList"
          :key="index"
          @on-focus="inputFocus"
        
          :title="item.title"
          :placeholder="item.default"
          v-model="item.model"
          v-if="type==2"
        ></x-input>
        <x-input
          class="f-16 labelStyle"
          type="text"
          v-for="(item,index) in ftfList"
          :required="true"
          :key="index"
          :title="item.title"
          :placeholder="item.default"
         
          v-model="item.model"
          v-if="type==1"
          :is-type="checkNameG"
          :min="2"
          :max="15"
        ></x-input>
        <x-input
          class="f-16 labelStyle"
          title="联系人"
        
          :required="true"
          placeholder="请填写您的姓名"
          v-model="donorName"
          :is-type="checkName"
          :min="2"
          :max="15"
        ></x-input>
        <x-input
          class="f-16 labelStyle"
          :is-type="checkphonefun"
          :required="true"
          title="手机号码"
          placeholder="请填写11位手机号码"
          v-model.trim="relPhone"
          keyboard="number"
          :max="11"
        ></x-input>
      </group>
    </div>
    <div class="btn-opearea" @click="footSubmit">提交</div>
    <div v-transfer-dom>
      <confirm
        v-model="confirmBack"
        title="提交"
        confirm-text="确认"
        cancel-text="取消"
        show-cancel-button="false"
        @on-confirm="confirmBackFun"
        @on-cancel="cancelBackFun"
      >
        <p
          class="f-14 text-center"
          style="line-height: 24px;margin: 15px 0;font-size: 15px;color: #353535;"
        >您尚未填写快递信息，是否确认退出后续添加或查看收货人姓名及地址信息，请在三天内到“我的-帮扶记录-物品帮扶”中进行</p>
      </confirm>
    </div>
    <!-- <p class="loading" style="text-align:center;" v-show="showLoading">
      <inline-loading></inline-loading>
    </p>-->
    <!-- <div class="lightBox" v-show="showPrompt"></div> -->
  </div>
</template>

<script>
import {
  XHeader,
  Group,
  Cell,
  CellBox,
  XButton,
  XInput,
  TransferDom,
  Confirm,
  PopupPicker,
  InlineLoading
} from "vux";
import { mapState } from "vuex";
import { checkPhoneStr, checkNameStr } from "@/util/validFun.js";
export default {
  components: {
    XHeader,
    Group,
    Cell,
    CellBox,
    XButton,
    XInput,
    PopupPicker,
    InlineLoading,
    Confirm
  },
  name: "helpHeWriteExp",
  directives: {
    TransferDom
  },
  data() {
    return {
      timer:null,
      namefail: true,
      namegfail: true,
      expressfail: true,
      type: this.$route.params.type,
      // companyList:[['圆通速递','申通速递','百世快递','中通快递','顺丰速递','宅急送','全峰快递','德邦物流','优速物流','京东快递','信丰快递','跨越速运','邮政平邮','天天快递','快捷速运','亚马逊','韵达快递']],
      selectCompany: ["圆通速递"],
      typeList: [],
      aidedObj: {},
     
      demanduse: "",
      aidedname: "",
      showLoading: false,
      showPrompt: false,
      routePath: "",
      phonefail: true,
      expressList: [
        { title: "快递单号", default: "请填写快递单号", model: "" }
      ],
      ftfList: [{ title: "捐赠方", default: "请填写捐赠方名称", model: "" }],
      donorName:'',
      confirmBack: false
    };
  },
  watch: {
    relPhone(val) {
      this.$nextTick(() => {
        this.relPhone = val.replace(/[^\0-9]/g, "");
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path.indexOf("helpHeGoods") !== -1) {
        vm.routePath = "/loveNeed/" + vm.$route.params.demandId;
      }
    });
  },
  computed: {
    ...mapState(["allexpress"]),
    companyList() {
      return [
        this.allexpress.logistics_company.map(x => {
          return x.name;
        })
      ];
    },
    user(){
      if(this.$store.state.user){
       return  this.$store.state.user.realname
        ? this.$store.state.user.realname
        : this.$store.state.user.nick_name
      }
      return "";
    },
    // donorName(){
    //     if(this.$store.state.user){
    //        return  this.$store.state.user.realname!=""
    //     ? this.$store.state.user.realname
    //     : this.$store.state.user.nick_name
    //     }
    //     return "";
    // },
    relPhone(){
        if(this.$store.state.user){
           this.phonefail = false;
          return this.$store.state.user.mobile;
        }
        return "";
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  created() {
    // if (this.$store.state.user.is_certification === 1) {
    //   this.donorName = this.$store.state.user.realname;
    //   this.relPhone = this.$store.state.user.mobile;
    //   this.phonefail = false;
    // } else {
    //   if (this.$store.state.user.nick_name !== null) {
    //     // this.donorName = this.$store.state.user.nick_name
    //   }
    //   if (this.$store.state.user.mobile !== null) {
    //     this.relPhone = this.$store.state.user.mobile;
    //     this.phonefail = false;
    //   }
    // }
    if(this.$store.state.user){
      if(this.$store.state.user.realname!=""){
        this.donorName = this.$store.state.user.realname
      }else{
        this.donorName = this.$store.state.user.nick_name
      }
    }
    if (this.type == 1) {
      this.typeList = this.ftfList;
    } else if (this.type == 2) {
      this.typeList = this.expressList;
    }
    this.$store.dispatch("getUser",{_this:this.$http})
    this.$http
      .post("hts/record/goods", {
        povertyCode: this.$route.params.id
      })
      .then(res => {
        this.aidedObj = res.data;
        this.demanduse = this.aidedObj.demand_title;
        this.aidedname = this.aidedObj.user_name;
      })
      .catch(err => {});
    this.aidedObj = this.$store.state.gooddetail;
  },
  methods: {
    confirmBackFun(){
      if (this.routePath !== "") {
        this.$router.replace(this.routePath);
      } else {
        this.$router.go(-1);
      }
    },
    cancelBackFun(){
      this.confirmBack = false
    },
    companyOrdercheck(value) {
    
      // let arr = this.allexpress.logistics_company.filter(item => {
      //   return item.name == this.selectCompany[0];
      // });
     // let reg = new RegExp(arr[0].reg_mail_no);// /^[0-9a-zA-Z]*$/g;
       this.timer = setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
     let reg = new RegExp(/^[0-9a-zA-Z]*$/g)
      if (reg.test(value)) {
        this.expressfail = false;
        return { valid: true };
      } else {
        this.expressfail = true;
        return { valid: false, msg: this.selectCompany[0] + "单号输入错误" };
      }
    },
    backToPre() {
      this.confirmBack = true
      // if (this.routePath !== "") {
      //   this.$router.replace(this.routePath);
      // } else {
      //   this.$router.go(-1);
      // }
    },
    checkName(value) {
       this.timer = setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
      let validobj = checkNameStr(value, 2, 15, "联系人");
      if (!validobj.valid) {
        this.namefail = true;
      } else {
        this.namefail = false;
      }
      return validobj;
    },
     inputFocus() {
       clearTimeout(this.timer);
    },
    checkNameG(value) {
      this.timer = setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
      let validobj = checkNameStr(value, 2, 15, "捐赠方");
      if (!validobj.valid) {
        this.namegfail = true;
      } else {
        this.namegfail = false;
      }
      return validobj;
    },
    faceSubmit() {
      //  this.showLoading = true
      this.showPrompt = true;
      let _this = this;
      this.$http
        .post("hts/record/addFace", {
          id: this.$route.params.id,
          donor: this.typeList[0].model,
          donor_link_man: this.donorName,
          donor_link_tel: this.relPhone
        })
        .then(function(response) {
          _this.showLoading = false;
          _this.showPrompt = false;
          _this.showToast("", "text", "提交成功", "", "middle");
          //   _this.$router.replace({path:'/loveNeed/' + _this.$route.params.demandId});
          _this.$router.replace({
            path: "/certificate",
            query: {
              user: _this.user,
              to: _this.aidedname,
              target: _this.demanduse
            }
          });
        })
        .catch(function(response) {
          _this.showLoading = false;
          _this.showPrompt = false;
          _this.showToast("", "text", "提交失败", "20em", "", "middle");
        });
    },
    expressSubmit() {
      this.showLoading = true;
      this.showPrompt = true;
      let _this = this;
      this.$http
        .post("hts/record/addExpress", {
          id: this.$route.params.id,
          //   'demand_code':
          express_org: this.selectCompany[0],
          express_no: this.typeList[0].model,
          donor_link_man: this.donorName,
          donor_link_tel: this.relPhone
        })
        .then(function(response) {
          _this.showLoading = false;
          _this.showPrompt = false;
          _this.showToast("", "text", "提交成功", "20em", "", "middle");
          //   _this.$router.replace({path:'/loveNeed/' + _this.$route.params.demandId});
          _this.$router.replace({
            path: "/certificate",
            query: {
              user: _this.user,
              to: _this.aidedname,
              target: _this.demanduse
            }
          });
        })
        .catch(function(response) {
          _this.showLoading = false;
          _this.showPrompt = false;
          _this.showToast("", "text", "提交失败", "20em", "", "middle");
        });
    },

    checkphonefun(value) {
        this.timer = setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
      let validobj = checkPhoneStr(value, "手机号码");
      if (!validobj.valid) {
        this.phonefail = true;
      } else {
        this.phonefail = false;
      }
      return validobj;
    },

    footSubmit() {
      if (this.namefail) {
        let msg = checkNameStr(this.donorName, 2, 15, "联系人").msg;
        this.showToast("", "text", msg, "20em", "", "middle");
        return;
      }
      if (this.phonefail) {
        let msg = checkPhoneStr(this.relPhone, "手机号码").msg;
        this.showToast("", "text", msg, "20em", "", "middle");
        return;
      }
      if (this.$route.params.type == 1) {
        if (this.namegfail) {
          this.showToast("", "text", "捐赠方输入有误", "20em", "", "middle");
          return;
        }
        // 面对面配送
        //   let j=0;
        //   for(let i=0;i<this.typeList.length;i++){
        //     if(this.typeList[i].model==''){
        //       this.showToast('', 'text', '信息不能为空','20em','','middle')
        //       return false
        //     }else{
        //       j+=1;
        //     }
        //     if(j==2){
        //       this.faceSubmit();
        //     }
        //   }

        this.faceSubmit();
      } else if (this.$route.params.type == 2) {
        //快递配送
        if (this.expressfail) {
          this.showToast(
            "",
            "text",
            this.selectCompany[0] + "单号输入有误",
            "",
            "middle"
          );
          return;
        } else this.expressSubmit();
      }
    }
  }
};
</script>

<style scoped>
/*group去掉边线*/

.group-clearbd >>> .weui-cells {
  margin-top: 0;
  background: transparent;
}

.group-clearbd >>> .weui-cells:before,
.group-clearbd >>> .weui-cells:after {
  border: 0 none;
}

.group-clearbd >>> .weui-cells {
  margin-top: 12px;
}

.weui-cell,
.vux-cell-box >>> .weui-cell {
  padding: 14px 15px;
}

.weui-cell:before {
  left: 0;
}
.vux-cell-box >>> .weui-label {
  width: 6em !important;
}
.vux-x-input >>> .weui-label {
  width: 6em !important;
}
.weui-cell >>> input {
  color: #999;
  font-size: 12px;
}
.labelStyle {
  color: #333;
  font-size: 14px;
}
/*content*/
..box-withheader {
  bottom: 44px;
}
/*底部按钮*/
.btn-opearea {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 !important;
  height: 44px !important;
  color: #fff;
  font-size: 15px;
  text-align: center;
  background: linear-gradient(-180deg, #fd8b2a, #ff8125);
  line-height: 44px !important;
  box-shadow: none;
}
/*收货地址部分*/
.address .name-area {
  padding: 15px 15px;
  border-top: 1px solid #eee;
  font-size: 13px;
  color: #333;
}
.address {
  margin-top: -12px;
  background: url("/static/appimg/address-bg.jpg") repeat-x bottom #fff;
  background-size: auto 5px;
}
.address .address-title {
  color: #333;
  font-size: 15px;
}
.address .add-area {
  padding: 0 15px 20px 15px;
  font-size: 13px;
  color: #333;
}
.loading {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.loading .weui-loading {
  width: 50px;
  height: 50px;
}
.lightBox {
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
}
</style>
