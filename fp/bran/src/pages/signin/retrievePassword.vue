<template>
  <div>
    <x-header :left-options="{backText: ''}" style="border:0 none">{{title}}</x-header>
    <div class="reg-content box-withheader over-auto">
      <group style="marign-top:0">
        <x-input
          title="手机号"
          placeholder="请输入11位手机号"
          v-model="phone"
          
          keyboard="number"
          :max="11"
          is-type="china-mobile"
          :required="true"
        ></x-input>
      </group>

      <group class="group-psw" style="margin-top: 20px">
        <x-input title="验证码" placeholder="请输入短信验证码" v-model="icode" class="weui-vcode">
          <!--<i slot="label" class="fa fa-mobile-phone" aria-hidden="true"></i>-->
          <x-button
            slot="right"
            style="width:100px"
            type="primary"
            mini
            :disabled="disabled"
            :style="{background:codeStyle}"
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
      <group>
        <x-input
          title="新密码"
          placeholder="8-20位字母数字或符号"
          :type="passwordType1"
          :required="true"
          :min="8"
          :max="20"
          v-model="pass"
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
      <group>
        <x-input
          title="确认密码"
          placeholder="8-20位字母数字或符号"
          :type="passwordType2"
          v-model="enterPass"
           :min="8"
          :max="20"
          :required="true"
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
      >完成</x-button>

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
           <div v-transfer-dom>
      <confirm
        v-model="showconfirm"
        title="友情提示"
        confirm-text="前往注册"
        cancel-text="取消"
        @on-cancel="cancelR"
        @on-confirm="continueRegister"
      >
        <p class="f-14 text-center" style="line-height: 24px;margin: 15px 0">此手机号还未注册，建议您先注册</p>
      </confirm>
    </div>
      <!--报错弹窗-->
      <alert v-model="errorShow" :title="errorDialogTitle">{{errorDialogContent}}</alert>
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
  TransferDom,
  Countdown,
  Divider
} from "vux";
import adminReg from "./adminReg";
import swpTouch from "../swiperTouch/swiperTouch.vue";
import Bus from "../../assets/js/Bus";
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
    TransferDom,
    Countdown,
    Divider,
    adminReg,
    swpTouch
  },
  data() {
    return {
      title:"",
      phonefail: true,
      passwordfail: true,
      passwordType1: "password",
      passwordType2: "password",
      suc: "",
      sID: "81177363", // 注册场景id
      // 弹窗
      errorDialogTitle: "友情提示", // 报错题目
      errorDialogContent: "", // 报错信息
      errorShow: false,
      phone: "", // 手机号
      icode: "", // 手机验证码
      tcode: "", // 图片验证码
      pass: "",
      reget: false,
      enterPass: "",
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
      showconfirm: false,
    };
  },
  created: function() {
    this.generateUUID();

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
    async checkPhone(isyz) {
      this.phonefail = true;
      let validobj = checkPhoneStr(this.phone, "手机号码");
      if (!validobj.valid) {
        this.phonefail = true;

        this.showToast("", "text", validobj.msg, "20em", "", "middle");
        return false;
      }

      this.phonefail = false;
      await this.$http
        .post("uts/user/checkHasPhone", { phone: this.phone })
        .then(res => {
          this.showconfirm = true;
          this.phonefail = true;
        })
        .catch(error => {
          if (error.code === "10107") {
            if (isyz) {
              this.dialogshow = true;
            } else this.dialogshow = false;
            this.phonefail = false;
          }
        });
    },

    checkpasswordfun(value) {
      let validobj = checkpasswordStr(value, 8, 20, "新密码");
      if (!validobj.valid) {
        this.passwordfail = true;
      } else {
        this.passwordfail = false;
      }
      return validobj;
    },
     continueRegister() {
      this.$router.push("/reg");
      this.showconfirm = false;
    },
    cancelR() {
      this.showconfirm = false;
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
            this.errorShow = true;
            this.errorDialogContent = "请稍后重试";
          });
      }
      Bus.$emit("funClick", this.suc);
    },
    commitFailState(res) {},
    closeyzmlogin() {
      this.dialogshow = false;
    },
    // 刷新验证码
    tcodeChange() {
      this.imgInterface = this.BASE_URL + "mts/graphicCode?markId=" + this.uuid;
    },
    // 弹出验证码
    // popupeVerify() {
    //   // 手机号码验证
    //   let reg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
    //   let flag = reg.test(this.phone);
    //   if (this.phone === "" || this.phone.length < 11) {
    //     this.errorShow = true;
    //     this.errorDialogContent = "手机号码不能为空且必须为11位";
    //     return false;
    //   }
    //   if (!flag) {
    //     this.errorShow = true;
    //     this.errorDialogContent = "手机号码格式不正确";
    //     return false;
    //   }

    //   // 手机号是否注册判断
    //   let _this = this;
    //   this.$http
    //     .post("uts/user/isRegister", {
    //       mobile: _this.phone
    //     })
    //     .then(function(response) {
    //       // 判断手机号已经注册后
    //       // 弹出弹窗
    //       _this.dialogshow = true;
    //     })
    //     .catch(function(error) {
    //       // 如果手机号没有注册弹窗提示该手机号未注册
    //       if (error.code === "10108") {
    //         _this.errorShow = true;
    //         _this.errorDialogContent = "该手机号还未注册,请先去注册";
    //         _this.phone = "";
    //         return false;
    //       }
    //     });
    // },
    // 验证码确认
    tcodeVerify() {
      let _this = this;
      this.$http
        .post("uts/user/getPhoneCode", {
          phone: _this.phone,
          tcode: _this.tcode,
          markId: _this.uuid,
          ywNo: 1
        })
        .then(function(response) {
          _this.timerShow = true;
          _this.dialogshow = false;
          _this.start = true;
          _this.codeStyle = "#ccc!important";
          _this.disabled = true;
        });
    },
    // 下一步
    async submitRegister() {
      // 手机号码验证
      await this.checkPhone(false);
      if (!this.phonefail) {
        if (this.icode == "") {
          this.errorShow = true;
          this.errorDialogContent = "验证码不能为空";
          return false;
        }
        // if (this.pass == null || this.pass.length < 8) {
        //   this.errorShow = true
        //   this.errorDialogContent = '密码不能为空且长度不小于8位'
        //   return false
        // }
        // let regPass = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
        // var flagPass = regPass.test(this.pass)
        // if (!flagPass) {
        //   this.errorShow = true
        //   this.errorDialogContent = '密码必须为字母加数字且长度不小于8位'
        //   return false
        // }
        // // 确认密码验证
        // if (this.enterPass == null || this.enterPass.length < 8) {
        //   this.errorShow = true
        //   this.errorDialogContent = '确认密码不能为空长度不小于8位'
        //   return false
        // }
        // var flagEnterPass = regPass.test(this.pass)
        // if (!flagEnterPass) {
        //   this.errorShow = true
        //   this.errorDialogContent = '确认密码必须为字母加数字且长度不小于8位'
        //   return false
        // }
        if (this.passwordfail) {
          let msg = checkpasswordStr(this.pass, 8, 20, "新密码").msg;
          this.showToast("", "text", msg, "20em", "", "middle");
          return false;
        }
        if (this.enterPass !== this.pass) {
          this.showToast(
            "",
            "text",
            "两次密码输入不一致",
            "20em",
            "",
            "middle"
          );
          return false;
        }

        // 调用接口 判断手机号是否已经被注册
        // 手机号是否注册判断
        let _this = this;
        // this.$http
        //   .post("uts/user/isRegister", {
        //     mobile: _this.phone
        //   })
        //   .then(response => {
            // 如果手机号没有注册弹窗提示该手机号未注册
            // 判断手机号已经注册后
            // 3手机号+手机验证码验证
            // _this.$http.post('uts/user/isYZMOK', {
            //   mobile: _this.phone,
            //   icode: _this.icode,
            //   ywNo: 1
            // }).then((response) => {
            //       // 通过
            //   let storage = window.localStorage
            //   storage.setItem('phone', _this.phone)
            //   _this.$router.push({path: '/setNewPassword'})
            // }).catch((error) => {
            //   if (error.code === '10104') {
            //     _this.errorShow = true
            //     _this.errorDialogContent = '验证码过期或者失效'
            //     return false
            //   }
            // }) // over-手机号+手机验证码验证
            let arg = {};
            arg.pass = _this.pass;
            arg.rePass = _this.enterPass;
            arg.mobile = _this.phone;
            arg.icode = _this.icode;
            arg.ywNo = 1;
            _this.$http
              .post("uts/user/resetPass", arg)
              .then(res => {
                if(_this.title=="找回密码"){
                _this.showToast(
                  "",
                  "text",
                  "密码修改成功",
                  "20em",
                  "",
                  "middle"
                );
                _this.$router.replace("/login");
                }
                else{
                  _this.showToast(
                  "",
                  "text",
                  "密码设置成功",
                  "20em",
                  "",
                  "middle"
                );
                _this.$router.replace("/setting");
                }
              })
              .catch(err => {
                if (err.code === "10111") {
                  _this.errorShow = true;
                  _this.errorDialogContent = "新密码与旧密码相同";
                  return false;
                } else if (err.code == "10110") {
                  _this.errorShow = true;
                  _this.errorDialogContent = "两次密码输入不一致";
                  return false;
                } else if (err.code == "10104") {
                  _this.errorShow = true;
                  _this.errorDialogContent = "验证码输入有误";
                  return false;
                } else {
                  if (err.msg)
                    _this.showToast("", "text", err.msg, "20em", "", "middle");
                }
              });
          // })
          // .catch(error => {
          //   if (error.code === "10108") {
          //     _this.errorShow = true;
          //     _this.errorDialogContent = "该手机号还未注册,请先去注册";
          //     return false;
          //   }
          // });
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
  },
   beforeRouteEnter(to, from, next) {
      next(vm => {
          if(from.path.indexOf('login') >-1) {
             vm.title="找回密码"
          }else  {
              vm.title="设置密码"
          }
      })
      
  },
  mounted() {
  
  }
};
</script>

<style scoped>
.btn-orange-lg {
  margin-top: 90px;
}
.dia-box {
  padding-top: 0px;
}
.zhanshi {
  disabled: false;
}
.vux-alert >>> .weui-dialog__btn_primary {
  color: #fd8929 !important;
}
/*注册*/
.vux-divider {
  padding: 20px 0 !important;
}

.reg-content {
  padding: 10px 30px 10px 30px;
}

.reg-content i.fa {
  font-size: 16px;
  color: #ccc;
  padding-right: 20px;
}

.reg-content >>> .vux-x-input {
  font-size: 15px;
}

.reg-content >>> .weui-cells:before {
  border-top-width: 0;
}

.group-psw .weui-cells {
  margin-top: 30px;
}

.buttonColor {
  background: #cccccc !important;
}

.weui-dialog >>> .weui-dialog__btn_primary {
  color: #ec0115 !important;
}
.weui-cell {
  padding: 15px 0 18px 0;
}
/*小按钮*/
.btn-getcode {
  border-radius: 30px;
  position: absolute;
  right: 0;
  top: 0;
  border: 0 none;
  bottom: 16px;
}
.btn-getcode:after {
  border: 0 none !important;
}
</style>
