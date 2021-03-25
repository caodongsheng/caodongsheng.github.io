<template>
  <div>
    <x-header :left-options="{backText: ''}" style="border:0 none">注 册</x-header>
    <div class="reg-content box-withheader over-auto">
      <group>
        <x-input
          title="昵称"
          placeholder="请输入2-20个字符的昵称"
          v-model="names"
          label-width="65px"
          :is-type="checkNickfun"
          min="2"
          max="20"
          :required="true"
    
        ></x-input>
      </group>
      <group>
        <x-input
          title="手机号"
          placeholder="请输入11位手机号"
          v-model="phone"
          label-width="65px"
          :is-type="checkphonefun" :required="true"
      
          keyboard="number" 
          :max="11"              
        ></x-input>
      </group>
      <group class="group-psw" style="overflow:visible;">
        <x-input
          title="验证码"
          placeholder="请输入短信验证码"
          v-model="icode"
          class="weui-vcode"
          label-width="65px"
         
        >
          <!--<i slot="label" class="fa fa-mobile-phone" aria-hidden="true"></i>-->
          <x-button
            slot="right"
            type="primary"
            mini
            :disabled="disabled"
            :style="{background:codeStyle}"
            style="width:100px"
            @click.native="checkPhone(true)"
            class="btn-getcode"
          >
            {{getBtnText}}
            <span v-show="timerShow" class="count">
              剩余
              <countdown v-model="time" :start="start" @on-finish="countdownFinish"></countdown>秒
            </span>
          </x-button>
        </x-input>
      </group>
      <group class="group-psw">
        <x-input
          title="设置密码"
          :type="passwordType1"
          placeholder="请输入8-20位数字、字母或符号"
          v-model="pass"
          :min="8"
          :max="20"
          label-width="80px"
          :required="true"
          :is-type="checkpasswordfun"
         
        >
          <span slot="right" @click="showPwd">
            <img
              style="width: 20px;height: 13px;"
              v-if="passwordType1 === 'password'"
              src="../../common/images/eye.png"
            >
            <img v-else style="width: 20px;height: 13px;" src="../../common/images/openeye.png">
          </span>
        </x-input>
      </group>
      <group class="group-psw">
        <x-input
          title="确认密码"
          :type="passwordType2"
          placeholder="请输入上次的密码"
          :required="true"
          v-model="passis"
          :min="8"
          :max="20"
          label-width="80px"
        >
          <span slot="right" @click="showPwd2">
            <img
              style="width: 20px;height: 13px;"
              v-if="passwordType2 === 'password'"
              src="../../common/images/eye.png"
            >
            <img v-else style="width: 20px;height: 13px;" src="../../common/images/openeye.png">
          </span>
        </x-input>
      </group>
      <x-button
        class="btn-orange-lg"
        type="primary"
        action-type="button"
        @click.native="submitRegister"
      >完成注册</x-button>
      <div class="text-center color-999 reg-tipinfo">
        提交即同意
        <router-link to @click.native="showpop2" class="colora color-orange">《中国社会扶贫网注册协议》</router-link>和
        <br>
        <router-link to @click.native="showpop3" class="colora color-orange">《用户隐私政策》</router-link>
      </div>
      <!-- <div class="text-center color-999 reg-tipcrm">您是国家任命的扶贫干部？</div>
      <div class="reg-manager text-center">
        <router-link to="/adminReg" class="c-a color-orange" href="">管理员注册</router-link>
      </div>-->
      <!--验证码弹窗-->
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
            <swpTouch :sID="sID" @commitSuccess="commitSuccessState" @commitFail="commitFailState"></swpTouch>
          </div>
        </div>
      </div>
      <!--报错弹窗-->
      <alert
        v-model="errorShow"
        @on-hide="regOverEnter"
        :title="errorDialogTitle"
      >{{errorDialogContent}}</alert>
    </div>
    <!--协议弹窗-->
    <proreg ref="protocolcon"></proreg>
    <proyszc ref="protocolcon2"></proyszc>
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
  Divider,
  Popup,
  TransferDom
} from "vux";
import adminReg from "./adminReg";
import proreg from "@/pages/protocol/proreg";
import proyszc from "@/pages/protocol/proyszc";
import swpTouch from "../swiperTouch/swiperTouch.vue";
import Bus from "../../assets/js/Bus";
import {checkPhoneStr,checkNickStr,checkpasswordStr} from '@/util/validFun.js';
export default {
  directives: { TransferDom },
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
    adminReg,
    proreg,
    proyszc,
    Popup,
    swpTouch
  },
  data() {
    return {
      phonefail: true,
      passwordfail:true,
      nickfail: true,
      passwordType1: "password",
      passwordType2: "password",
      suc: "",
      sID: "81177363", // 注册场景id
      // 弹窗
      errorDialogTitle: "友情提示", // 报错题目
      errorDialogContent: "", // 报错信息
      regOver: false,
      errorShow: false,
      phone: "", // 手机号
      pass: "", // 密码
      passis: "", //确认密码
      names: "", //昵称
      icode: "", // 手机验证码
      tcode: "", // 图片验证码
      isreg: false, // 是否注册成功
      // 计时
      time: 60, // 计时时间
      start: false, // 是否开始计时
      timerShow: false, // 计时器显示
      disabled: false, // 是否可点击 false为可点击
      codeStyle: "", // 获取验证码按钮颜色
      dialogshow: false, // 验证码验证弹出
      verifyOver: false, // 验证码验证通过
      uuid: "", // 全局唯一标识符
      imgInterface: "",
      reget: false,
      code: "" // 错误验证码提示
    };
  },
  created() {
    this.imgInterface = this.BASE_URL + "mts/graphicCode?markId=" + this.uuid;
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
     checkphonefun(value){
          let validobj = checkPhoneStr(value,"手机号码")
        if(!validobj.valid){
            this.phonefail = true
            
        }
        else{
           this.phonefail = false
        }
        return validobj
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
 
     async checkPhone(isyz) {
      this.phonefail = true
         let validobj = checkPhoneStr(this.phone,"手机号码")
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
    showPwd() {
      if (this.passwordType1 === "password") {
        this.passwordType1 = "";
      } else {
        this.passwordType1 = "password";
      }
    },
    showPwd2() {
      if (this.passwordType2 === "password") {
        this.passwordType2 = "";
      } else {
        this.passwordType2 = "password";
      }
    },
    commitSuccessState(res, token) {
      // alert(res)
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
          })
          .catch(err => {
            if (err.msg)
              this.showToast("", "text", err.msg, "20em", "", "middle");
          });
      }
      Bus.$emit("funClick", this.suc);
    },
    commitFailState(res) {
      this.showToast("", "text", res.msg, "20em", "", "middle");
    },
    // 协议弹窗
    showpop2() {
      this.$refs.protocolcon.showpop();
    },
    showpop3() {
      this.$refs.protocolcon2.showpop();
    },
    // 弹出验证码
    popupeVerify() {
      // 手机号码验证
      let reg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
      let flag = reg.test(this.phone);
      if (this.phone === "" || this.phone.length < 11) {
        this.showToast(
          "",
          "text",
          "手机号码不能为空且必须为11位",
          "20em",
          "",
          "middle"
        );
        return false;
      } else if (!flag) {
        this.showToast("", "text", "手机号码格式不正确", "20em", "", "middle");
        return false;
      } else {
        // 判断用户手机号是否注册过
        this.$http
          .post("uts/user/isRegister", { mobile: this.phone })
          .then(res => {
            this.showToast("", "text", "该手机号已注册", "20em", "", "middle");
            this.isReg = false;
            return false;
          })
          .catch(error => {
            if (error.code === "10108") {
              this.dialogshow = true;
            }
          });
      }
    },
    closeyzmlogin() {
      this.dialogshow = false;
    },
    regOverEnter(regOver) {
      this.regOver = false;
      this.$router.replace("/login");
    },
   
    checkNickfun(value) {
          let validobj = checkNickStr(value,2,20,"昵称")
        if(!validobj.valid){
            this.nickfail = true
            
        }
        else{
           this.nickfail = false
        }
        return validobj
    },
    // 完成注册
    async submitRegister() {
      // 手机号码验证
      if (this.nickfail) {
         this.showToast(
          "",
          "text",
         checkNickStr(this.names,2,20,"昵称").msg,
          "20em",
          "",
          "middle"
        );
        return false;
      }

      await this.checkPhone(false);
      // // 密码验证
      // if (this.pass === "" || this.pass === null) {
      //   this.showToast("", "text", "密码不能为空", "20em", "", "middle");
      //   return false;
      // } else if (this.pass.length < 8) {
      //   this.showToast("", "text", "密码长度不能小于8位", "20em", "", "middle");
      //   return false;
      // }
      //  else if (this.pass.length > 20) {
      //   this.showToast("", "text", "密码长度不能大于20位", "20em", "", "middle");
      //   return false;
      // }
      // let regPass = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
      // let flagPass = regPass.test(this.pass);
      // if (!flagPass) {
      //   this.showToast(
      //     "",
      //     "text",
      //     "必须为字母加数字且长度不小于8位",
      //     "20em",
      //     "",
      //     "middle"
      //   );
      //   return false;
      // }
      if(!this.phonefail){
      if(this.passwordfail){
        let msg = checkpasswordStr(this.pass,8,20,"密码").msg
           this.showToast(
          "",
          "text",
           msg,
          "20em",
          "",
          "middle"
        );
        return false;
      }
      if(this.icode.replace(/(^\s*)|(\s*$)/g, "")==""){
           this.showToast(
          "",
          "text",
         '验证码不能为空！',
          "20em",
          "",
          "middle"
        );
        return false;
      }
      if (this.passis !== this.pass) {
        this.showToast("", "text", "两次密码输入不一致", "20em", "", "middle");
        return false;
      }
      // 调用接口

      this.$http
        .post("uts/user/registerSave", {
          phone: this.phone,
          pass: this.pass,
          nickName: this.names,
          icode: this.icode, // 手机验证码
          ywNo: 1
        })
        .then(res => {
          this.errorShow = true;
          this.errorDialogContent = "恭喜您注册成功";
          this.isreg = true; // 注册成功标识
          this.regOver = true;
          window.localStorage.setItem("token", res.data.res);
          window.localStorage.setItem("longToken", res.data.res); // 长token
          this.$store.commit(types.CHA_USER, res.data.user);
          if (
            this.$route.query.redirect &&
            this.$route.query.redirect === location.hostname
          ) {
            this.$router.go(-1);
          }
          if (
            localStorage.getItem("shopurl") &&
            localStorage.getItem("shopurl") !== ""
          ) {
            this.$router.replace("/mall");
          } else this.$router.push("/");
        })
        .catch(error => {
          if (error.code === "10107") {
            this.errorShow = true;
            this.errorDialogContent = "您已经注册过了，请直接登录";
          }
          if (error.code === "10103") {
            this.showToast(
              "",
              "text",
              "图片验证码错误，请刷新验证码",
              "20em",
              "",
              "middle"
            );
            return false;
          }
          if (error.code === "10104") {
            this.showToast(
              "",
              "text",
             error.msg,
              "20em",
              "",
              "middle"
            );
            return false;
          }
        });
      }
    },
    // 计时器计时结束
    countdownFinish() {
      this.disabled = false; // 是否可点击 false为可点击
      this.codeStyle = ""; // 获取验证码按钮颜色
      this.timerShow = false;
      this.start = false;
      this.time = 60;
      this.reget = true;
    }
    // 生成唯一标识符UUID
  }
};
</script>

<style scoped>
.reg-content >>> .weui-input {
  font-size: 15px;
}
.reg-tipinfo {
  margin-top: 20px;
  line-height: 190%;
}
.reg-tipcrm {
  margin-top: 30px;
}
.reg-manager {
  margin-top: 15px;
}
.reg-manager .c-a {
  display: inline-block;
  padding-bottom: 4px;
  border-bottom: 1px solid #ed6b2b;
}

.btn-orange-lg {
  margin-top: 40px;
}
.weui-cell {
  padding: 15px 0;
}

.vux-x-input >>> .weui-label {
  font-size: 16px;
}
/*注册*/
.vux-divider {
  padding: 20px 0 !important;
}
.reg-content {
  padding: 0 30px 0 30px;
}
.dia-box {
  padding-top: 0px;
}
.reg-content i.fa {
  font-size: 16px;
  color: #ccc;
  padding-right: 20px;
}

.reg-content >>> .vux-x-input {
  font-size: 12px;
}

.reg-content >>> .weui-cells:before {
  border-top-width: 0;
}

.group-psw .weui-cells {
  margin-top: 30px;
}
.vux-alert >>> .weui-dialog__btn_primary {
  color: #fd8929 !important;
}
.buttonColor {
  background: #cccccc !important;
}

.weui-dialog >>> .weui-dialog__btn_primary {
  color: #ec0115 !important;
}

/*小按钮*/
.btn-getcode {
  border-radius: 30px;
  padding: 0 15px;
  position: absolute;
  right: 0px;
  /* top:0; */
  border: 0 none;
  bottom: 16px;
}
.dia-box input {
  width: 100px;
}
.weui-cells,
.vux-no-group-title {
  overflow: visible;
}
.btn-getcode:after {
  border: 0 none !important;
}
</style>
