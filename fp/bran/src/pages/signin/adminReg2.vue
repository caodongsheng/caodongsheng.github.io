<template>
  <div class="reg-wrap">
    <x-header :left-options="{backText: ''}" style="border:0 none">管理员注册</x-header>
    <div class="box-withheader over-auto">
      <p class="color-orange title-text f-12">该注册功能只限村级和乡级扶贫干部提交注册信息,信息提交后请等待上级管理员审核</p>
      <div class="reg-content">
        <div class="input">
          <x-input title="手机号" placeholder="请输入11位手机号" :is-type="checkphonefun" :required="true" v-model="phone"  keyboard="number" :max="11"></x-input>
          <div class="registerDialog" v-show="dialogshow">
            <div class="overlayer"></div>
            <div class="dialog-box">
              <p class="text-center dia-tit">
                <span>请完成拼图验证</span>
                <span class="closePower" @click="closeyzmlogin()">
                  <i class="fa fa-times"></i>
                </span>
              </p>
              <div class="dia-box clearfix">
                <swpTouch
                  :sID="sID"
                  @commitSuccess="commitSuccessState"
                  @commitFail="commitFailState"
                ></swpTouch>
              </div>
            </div>
          </div>
        </div>
        <div class="input">
          <x-input
            title="设置密码"
            :type="passwordType"
            placeholder="8到20位数字字母或字符"
            v-model="pass"
            :is-type="checkpasswordfun"
            :required="true"
          >
            <span slot="right" @click="showPwd">
              <img
                style="width: 20px;height: 13px;"
                v-if="passwordType === 'password'"
                src="../../common/images/eye.png"
              >
              <img v-else style="width: 20px;height: 13px;" src="../../common/images/openeye.png">
            </span>
          </x-input>
        </div>
        <div class="input">
          <x-input title="验证码" placeholder="输入短信验证码" v-model="icode">
            <x-button
              slot="right"
              type="primary"
              mini
              :disabled="disabled"
              :style="{background:codeStyle}"
              style="width:100px"
              @click.native="checkPhone(true)"
              class="weui-btn btn-getcode weui-btn_mini weui-btn_primary"
            >
              {{getBtnText}}
              <span v-show="timerShow" class="count">
                剩余
                <countdown v-model="time" :start="start" @on-finish="countdownFinish"></countdown>秒
              </span>
            </x-button>
          </x-input>
        </div>
        <div class="btn">
          <x-button
            class="btn-orange-lg"
            type="primary"
            action-type="button"
            @click.native="submitAdminReg"
          >完成注册</x-button>
        </div>
        <!--报错弹窗-->
        <alert
          v-model="errorShow"
          :title="errorDialogTitle"
          @on-hide="regOverEnter"
        >{{errorDialogContent}}</alert>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Group,
  Cell,
  XInput,
  XButton,
  XHeader,
  Alert,
  Confirm,
  Countdown,
  Divider
} from "vux";
import swpTouch from "../swiperTouch/swiperTouch.vue";
import Bus from "../../assets/js/Bus";
import { setTimeout } from "timers";
  import {checkPhoneStr,checkpasswordStr} from '@/util/validFun.js';

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    XHeader,
    Alert,
    Confirm,
    Countdown,
    Divider,
    swpTouch
  },
  data() {
    return {
      
      passwordfail: true,
      phonefail:true,
      passwordType: "password",
      sID: "55098962", // 注册场景id
      errorDialogTitle: "友情提示", // 报错题目
      errorDialogContent: "", // 报错信息
      errorShow: false,
      //    regOver: false,
      phone: "", // 手机号
      pass: "", // 密码
      icode: "", // 手机验证码
      tcode: "", // 图片验证码
      identity: "", // 身份选择
      name: "", // 姓名
      idcard: "", // 身份证号
      territory: "", // 负责区域
      territoryId: "", // 负责区域的ID
      // 计时
      time: 60, // 计时时间
      start: false, // 是否开始计时
      timerShow: false, // 计时器显示
      disabled: false, // 是否可点击 false为可点击
      codeStyle: "", // 获取验证码按钮颜色
      dialogshow: false, // 验证码验证弹出
      verifyOver: false, // 验证码验证通过
      imgInterface: "",
      random: "",
      showText: false,
      reget: false,
      checkText: "",
      Information: "" // 信息提示
    };
  },
   watch:{
       phone(val){
      this.$nextTick(() => {
          this.phone = val.replace(/[^0-9]/g,'')
       
        })
    },
    },
  computed: {
    getBtnText() {
      if (this.timerShow) {
        return "";
      }
      if (this.reget) {
        return "重新获取";
      }
      return "获取验证码";
    }
  },
  methods: {
    async checkPhone(isyz) {
      this.phonefail = true
         let validobj = checkPhoneStr(this.phone,"联系方式")
        if(!validobj.valid){
            this.phonefail = true
         
            this.showToast(
          "",
          "text",
          validobj.msg,
          "20em",
          "",
          "middle"
        );
        return false;
        }

           this.phonefail = false
            await this.$http
          .post("uts/user/checkHasPhone", { phone: this.phone })
          .then(res => {
           
            if (isyz) {
              this.dialogshow = true;
            } else this.dialogshow = false;
              this.phonefail = false
          })
          .catch(error => {
            if (error.code === "10107") {
              this.showToast("", "text", error.msg, "20em", "", "middle");
                this.phonefail = true
            }
          });
       
    },
    checkphonefun(value){
         let validobj = checkPhoneStr(value,"手机号码")
        if(!validobj.valid){
            this.phonefail = true
         
            
        }
        else{
           this.phonefail = false
          
        }
          return validobj;
      },
  
    checkpasswordfun(value) {
       let validobj = checkpasswordStr(value,8,20,"密码")
        if(!validobj.valid){
            this.passwordfail = true
         
            
        }
        else{
           this.passwordfail = false
          
        }
          return validobj;
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    commitSuccessState(res, token) {
      this.suc = res;
      if (res === true) {
        this.$http
          .post("uts/user/getPhoneCode", {
            phone: this.phone,
            tcode: token,
            ywNo: 1
          })
          .then(res => {
            this.timerShow = true;
            this.dialogshow = false;
            this.start = true;
            this.codeStyle = "#ccc!important";
            this.disabled = true;
          });
      }
      Bus.$emit("funClick", this.suc);
    },
    regOverEnter() {
      // this.regOver = false;
      this.$router.replace("/user");
    },
    commitFailState(res) {},
    countdownFinish() {
      this.disabled = false; // 是否可点击 false为可点击
      this.codeStyle = ""; // 获取验证码按钮颜色
      this.timerShow = false;
      this.start = false;
      this.time = 60;
      this.reget = true;
    },
    // 验证码弹窗关闭
    closeyzmlogin() {
      this.dialogshow = false;
    },
    // 验证码确认
    tcodeVerify() {
      let _this = this;
      this.$http
        .post("uts/user/getPhoneCode", {
          phone: _this.phone,
          tcode: _this.tcode,
          markId: this.random,
          ywNo: 1
        })
        .then(function(response) {
          _this.timerShow = true;
          _this.dialogshow = false;
          _this.start = true;
          _this.codeStyle = "#ccc!important";
          _this.disabled = true;
          _this.tcode = "";
        })
        .catch(function(error) {
          if (error.code == "10103") {
            _this.showText = true;
            _this.checkText = error.msg;
          } else if (error.code == "10101") {
            _this.checkText = "验证码不能为空";
            _this.showText = true;
          }
          console.log("验证码确认失败");
          _this.tcode = "";
        });
      this.tcodeChange();
    },
    // 最后一步-提交注册
   async  submitAdminReg() {
      // 手机号码验证
      // let reg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
      // var flag = reg.test(this.phone)
      // if (this.phone == '' || this.phone.length < 11) {
      //   this.showToast('','text','手机号码不能为空且必须为11位','20em','','middle');

      //   return false
      // } else if (!flag) {
      //   this.showToast('','text','手机号码格式不正确','20em','','middle');
      //   return false
      // if(this.phonefail){
      //   this.showToast('','text','请输入正确手机号码！','20em','','middle');
      //   return false;
      // }
      await this.checkPhone(false);
      // 密码验证
      // if (this.pass == null || this.pass.length < 8) {
      // //   this.errorShow = true
      // //   this.errorDialogContent = '密码不能为空长度不小于8位'
      //   this.showToast('','text','密码不能为空长度不小于8位','20em','','middle');
      //   return false
      // }
      // let regPass = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
      // var flagPass = regPass.test(this.pass)
      if(!this.phonefail){
      if (this.passwordfail) {

        this.showToast(
          "",
          "text",
         checkpasswordStr(value,8,20,"密码").msg,
          "20em",
          "",
          "middle"
        );
        return false;
      }

      if (!window.localStorage) {
        //   this.errorShow = true
        //   this.errorDialogContent = '浏览器不支持localstorage'
        this.showToast(
          "",
          "text",
          "浏览器不支持localstorage",
          "20em",
          "",
          "middle"
        );
        return false;
      } else {
        // 主逻辑业务
        var storage = window.localStorage;
        storage.setItem("phone", this.phone);
        storage.setItem("icode", this.icode);
        this.$http
          .post("hts/management/addAdmin", {
            identity: storage.getItem("identityID"), // 身份选择(村级管理员乡级管理员编号)
            territory: storage.getItem("territory"), // 负责区域
            territoryId: storage.getItem("territoryId"), // 负责区域的编号
            name: storage.getItem("name"), // 姓名
            idcard: storage.getItem("idcard"), // 身份证号
            phone: this.phone, // 手机号
            pass: this.pass, // 密码
            icode: this.icode, // 手机验证码
            ywNo: 1
          })
          .then(res => {
            //   _this.Information = response
            // this.showToast('','text','注册成功','20em','','middle');
            this.errorShow = true;
            this.errorDialogContent = "恭喜您,注册成功";
            // _this.regOver = true;
            // _this.$router.push({ path: '/adminRegOver' })
            //根据用户手机号及密码注册成功直接登录进入个人中心页
            this.$http
              .post("uts/user/login", { name: this.phone, pass: this.pass })
              .then(res => {
                this.L("token", res.data.logintoken);
                this.L("longToken", res.data.refreshtoken);
                this.$router.replace("/user");
              });
          })
          .catch(err => {
            if (err.code == "10107") {
              // this.errorShow = true
              // this.errorDialogContent = err.msg
              this.showToast("", "text", err.msg, "20em", "", "middle");
              return false;
            }
            if (err.code == "10104") {
              // this.errorShow = true
              // this.errorDialogContent = err.msg
              this.showToast("", "text", err.msg, "20em", "", "middle");
              return false;
            } else {
              if (err.msg)
                this.showToast("", "text", err.msg, "20em", "", "middle");
            }
          });
      }
      }
    }
  },
  created() {
    this.tcodeChange();
  }
};
</script>

<style  scoped>
.input >>> .weui-label {
  font-size: 15px;
}
.weui-cell {
  padding: 15px 0;
}
.btn-orange-lg {
  margin-top: 40px;
  margin-bottom: 30px;
}

.vux-popup-picker-select {
  text-align: center !important;
}

.vux-popup-header-right {
  color: #000000 !important;
}
.dia-box {
  padding-top: 0px;
}
.input {
  border-bottom: 1px solid #d9d9d9;
  margin: 0 30px;
  padding-top: 20px;
}

.title-text {
  margin: 0 30px;
  padding-top: 20px;
}
.btn button.weui-btn,
input.weui-btn {
  width: 80%;
}
.dialog-box h4 {
  margin-top: 0;
}
.check {
  position: absolute;
  left: 20px;
  top: 116px;
  font-size: 10px;
  color: red;
}
/*小按钮*/
.btn-getcode {
  border-radius: 30px;
  position: absolute;
  right: 0;
  /* top: 0; */
  border: 0 none;
  bottom: 16px;
}
.btn-getcode:after {
  border: 0 none !important;
}
</style>
