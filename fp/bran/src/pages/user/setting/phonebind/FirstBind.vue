<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">手机号绑定</x-header>
    <div class="box-withheader over-auto bg-ffffff">
      <!--头部提示-->
      <h1 class="color-orange f-15 f-normal top-msg">为了您的账户安全，请绑定手机</h1>
      <!--表单-->
      <div class="form-list">
        <group title="输入手机号" class="f-16 ">
          <x-input title="" placeholder="请输入11位手机号码" :required="true" is-type="checkphonefun"  v-model="newtelphone"  keyboard="number" :max="11"></x-input>
          <div class="registerDialog" v-show="dialogshow">
            <div class="overlayer"></div>
            <div class="dialog-box">
              <p class="text-center dia-tit">
                <span>请完成拼图验证</span>
                <span class="closePower" @click="closeyzmlogin()"><i class="fa fa-times"></i></span>
              </p>
              <div class="dia-box clearfix">
                <swpTouch :sID="sID" @commitSuccess="commitSuccessState" @commitFail="commitFailState"></swpTouch>
              </div>
            </div>
          </div>
        </group>
        <group class="group-psw">
          <x-input title="验证码" placeholder="请输入短信验证码"  v-model="smscode" class="weui-vcode" label-width="80px">
            <!--<i slot="label" class="fa fa-mobile-phone" aria-hidden="true"></i>-->
            <x-button slot="right" type="primary" style="width:100px" mini :disabled="disabled" :style="{background:codeStyle}" @click.native="checkPhone(true)" class="btn-getcode">
             {{getBtnText}}
              <span v-show="timerShow" class="count">
                 剩余
              <countdown v-model="time" :start="start" @on-finish="countdownFinish"></countdown>
              秒
            </span>
            </x-button>
          </x-input>
        </group>
        <group title="设置密码" class="f-16 " v-if="isRegist">
          <x-input title="" placeholder="8-20位数字、字母或字符" :type="passwordType" v-model="password"   :min="8"
          :max="20"
          label-width="80px"
          :required="true"
          :is-type="checkpasswordfun">
          <span  slot="right" @click="showPwd"><img  style="width: 20px;height: 13px;" v-if="passwordType === 'password'" src="../../../../common/images/eye.png"><img v-else style="width: 20px;height: 13px;" src="../../../../common/images/openeye.png"></span>

          </x-input>
        </group>
      </div>
      <!--注册协议-->
      <div class="ope-btm color-999 text-center">
        <!-- <div>
          完成即同意<router-link class="color-orange" to="" @click.native="showpop2" >《中国社会扶贫网用户注册协议》</router-link>
        </div> -->
        <div class="tip1">
          <check-icon :value.sync="checked" type="plain" selected-label-style="{color: '#FF9900'}"></check-icon>
          已阅读并同意
          <router-link class="color-orange" to="" @click.native="showpop2" >《中国社会扶贫网用户注册协议》</router-link>
        </div>
        <router-link class="ope-btm-btn btn-orange-lg dis-block text-center color-white" to="" @click.native="bindover">{{btnText}}
          <inline-loading v-show="showLoading"></inline-loading>
        </router-link>
      </div>
    </div>
    <!--协议弹窗-->
    <proreg ref="protocolcon"></proreg>
  </div>

</template>


<script>
  import {XHeader, Group, Cell, XInput, XButton, Countdown, InlineLoading,CheckIcon} from 'vux'
  import proreg from '@/pages/protocol/proreg'
  import swpTouch from '../../../swiperTouch/swiperTouch.vue'
  import Bus from '../../../../assets/js/Bus'
  import {mapActions} from "vuex";
  import {checkPhoneStr,checkpasswordStr} from '@/util/validFun.js';
  export default {
    name: 'FirstBind',
    components: {XHeader, Group, Cell, XInput, swpTouch, XButton,proreg, Countdown, InlineLoading,CheckIcon},
    data () {
      return {
        phonefail:true,
        reget:false,
        passwordfail:true,
        passwordType:"password",
        sID: '55098962', // 注册场景id
        btnText: '完成绑定',
        time: 60,
        disabled: false, // 是否可点击 false为可点击
        start: false,
        smscode: '',
        checked: true,
        codeStyle: '', // 获取验证码按钮颜色
        timerShow: false,
        dialogshow: false,
        validatecode: '',
        datacode: '',
        validatetime: false,
        newtelphone: '',
        password: '',
        showLoading: false,
        isBind: false,
        isRegist: false,
        phonefail:true
      }
    },
 watch:{
     newtelphone(val){
      this.$nextTick(() => {
          this.newtelphone = val.replace(/[^0-9]/g,'')
       
        })
     }
    },
    
    methods: {
         ...mapActions(['getUser']),
        getUser() {
            this.$store.dispatch('getUser',{ _this: this.$http });
        },
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
         let validobj = checkPhoneStr(this.newtelphone,"手机号码")
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
          await  this.$http.post('uts/user/isRegister', {'mobile': this.newtelphone})
          .then(res => {
            this.isRegist = false
             if (isyz) {
              this.dialogshow = true;
            } else this.dialogshow = false;
          })
          .catch(err => {
            if (err.code == '10108') {
               if (isyz) {
              this.dialogshow = true;
            } else this.dialogshow = false;
              this.isRegist = true
            }else {
               this.phonefail = false
              if(err.msg)
                this.showToast('','text',err.msg,'20em','','mdidle');
            }

          })
            
             
          //   await this.$http
          // .post("uts/user/checkHasPhone", { phone: this.newtelphone })
          // .then(res => {
           
          //   if (isyz) {
          //     this.dialogshow = true;
          //   } else this.dialogshow = false;
          //     this.phonefail = false
          // })
          // .catch(error => {
          //   if (error.code === "10107") {
          //     this.showToast("", "text", error.msg, "20em", "", "middle");
          //       this.phonefail = true
          //   }
          // });
  
    },
           checkPassword(){
        let reg = /^\w{8,20}$/;
      let flag = reg.test(this.password);
      // if(this.relPhone == ''|| this.relPhone.length < 11 || this.relPhone.length > 11){
      //     this.showToast('','text','手机号码不能为空且必须为11位','20em','','middle');
      //     this.phonefail = true;
      // }
      if (!flag) {
        this.showToast("", "text", "请输入8到20位数字字母或字符！", "20em", "", "middle");
        this.passwordfail = true;
      } else {
        this.passwordfail = false;
      }
    },
     checkpasswordfun(value) {
     let reg = /^\w{8,20}$/;
      if (reg.test(value)) {
        this.passwordfail = false;
        return { valid: true };
      } else {
        this.passwordfail = true;
        return { valid: false };
      }
    },
        showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      countdownFinish () {
        this.disabled = false; // 是否可点击 false为可点击
          this.codeStyle = '';// 获取验证码按钮颜色
          this.timerShow = false;
          this.start = false;
          this.time = 60;
          this.reget = true;
      },
      // 协议弹窗
      showpop2 () {
        this.$refs.protocolcon.showpop()
      },
    
      closeyzmlogin () {
        this.dialogshow = false
      },
     async bindover () {
       await this.checkPhone(false);
        if(!this.phonefail){
          if(this.smscode == '') {
              this.showToast('','text','手机验证码不能为空','20em','','middle');
              return
          }
          // if(this.isRegist && this.password == '') {
          //     this.showToast('','text','密码不能为空','20em','','middle');
          //     return
          // }
           if(this.isRegist&&this.passwordfail){
             let msg = checkpasswordStr(this.password,8,20,"密码").msg
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
          if(this.checked == false) {
              this.showToast('','text','请阅读并同意用户注册协议','20em','','middle')
              return;
          }

        if (this.isBind) {
          return
        }
        let self = this
        let obj = {}
        obj.phone = this.newtelphone
        // obj.icode = this.validatecode
        obj.icode = this.smscode;
        obj.pass = this.password
        obj.ywNo = 1
        this.isBind = true
        this.showLoading = true
        this.btnText = '正在绑定，请稍候'
        this.$http.post('uts/user/bindingPhone', obj).then(function (response) {
            self.getUser();
          self.showToast('', 'text', '新手机号绑定成功！', '20em', '', 'top')
          self.L('token', response.data.logintoken);
          self.L('longToken', response.data.refreshtoken);
            self.$router.replace('/recom');
          // self.L('set_showConfirm', true)
          if (localStorage.getItem('shopurl') && localStorage.getItem('shopurl') !== '') {
            self.$router.push('/mall')
          } else self.$router.push('/setting')
        })
          .catch(function (error) {
            self.btnText = '完成绑定'
            self.isBind = false
            self.showLoading = false
            if(error.code == '10104') {
                self.showToast('','text','验证码输入错误！','20em','','middle')
            }else {
              if(error.msg)
                self.showToast('', 'text', error.msg, '20em', '', 'top')
            }

          })
        }
      },
       

     
      backToPre() {
          this.$router.replace('/setting')
      },
      commitSuccessState (flag, token) {
        this.suc = flag
        if (flag === true) {
          this.$http.post('uts/user/getPhoneCode', {
            phone: this.newtelphone,
            tcode: token,
            ywNo: 1
          }).then((res) => {
            this.timerShow = true
            this.dialogshow = false
            this.start = true
            this.codeStyle = '#ccc!important'
            this.disabled = true
          }).catch(error => {
            Bus.$emit('funClick', true)
            this.showToast('','text','手机号格式不正确','20em','','middle')
          })
        }
        Bus.$emit('funClick', true)
      },
      commitFailState (res) {}
    },
    computed: {
       getBtnText(){
        if(this.timerShow){
          return ""
        }
       if(this.reget){
         return "重新获取"
       }
       return "获取验证码"
      },
      validateclass: function () {
        if (this.validatetime) {
          return 'bg-gray color-orange'
        } else return 'bg-orange color-white'
      },
      imgSrc () {
        return this.BASE_URL + 'mts/graphicCode?markId=1'
      }
    }
  }
</script>

<style scoped>
  .top-msg {
    padding: 15px 30px;
  }

  .form-list{padding: 0 15px}
  .form-list >>> .weui-cells__title {
    font-size: 16px;
    color: #333;
    margin-bottom: 0
  }

  .form-list >>> .weui-cells:before {
    border: 0 none
  }

  .form-list >>> .weui-cells:after {
    left: 15px;
    right: 15px
  }

  /*cell*/
  .weui-cell, .vux-cell-box >>> .weui-cell {
    padding: 14px 15px;
  }

  .weui-cell:before {
    left: 0
  }

  .weui-cell >>> input {
    color: #999;
    font-size: 15px
  }
.dia-box{
  padding-top:0px;
}
  .weui-cell >>> .weui-cell__ft {
    font-size: 14px;
    padding-right: 0
  }

  .weui-cell.vux-tap-active >>> .weui-cell__ft {
    padding-right: 18px
  }

  .weui-cell_access >>> .weui-cell__ft:after {
    margin-top: -3px
  }
  .tip1 {
      font-size: 12px;
  }

  /*小按钮*/
  .btn-getcode {
    position: absolute;
    right: 15px;
    bottom: 10px;
    padding: 6px 12px;
    border-radius: 30px;
    background-color: #fd8929 !important;
    color: #fff;
  }

  /*底部阅读信息*/
  .ope-btm{padding: 20px 30px}
  .ope-btm-btn{margin:30px 0 0 0}
</style>

