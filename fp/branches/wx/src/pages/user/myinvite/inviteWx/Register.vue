<template>
  <div>
    <!-- <x-header :left-options="{backText: ''}" style="border:0 none">注 册</x-header> -->

    <div class="reg-content box-full over-auto">
      <p style="font-size: 16px;text-align: center;">账号注册</p>
      <group>
        <x-input title="昵称" placeholder="请输入昵称" v-model="names" label-width="65px"  :is-type="checkNickfun" min="2" max="20" :required="true"></x-input>
      </group>
      <group>
        <x-input title="手机号" placeholder="请输入11位手机号" v-model="phone" label-width="65px" :is-type="checkphonefun" :required="true"  keyboard="number" :max="11"  ></x-input>
      </group>
      <group class="group-psw" style="overflow:visible;">
        <x-input title="验证码" placeholder="请输入短信验证码" v-model="icode" class="weui-vcode" label-width="65px" >
          <!--<i slot="label" class="fa fa-mobile-phone" aria-hidden="true"></i>-->
          <x-button slot="right" style="width:100px" type="primary" mini :disabled="disabled" :style="{background:codeStyle}" @click.native="checkPhone(true)" class="btn-getcode">
           {{getBtnText}}
            <span v-show="timerShow" class="count">
               剩余
              <countdown v-model="time" :start="start" @on-finish="countdownFinish"></countdown>
            秒
            </span>
          </x-button>
        </x-input>
      </group>
      <group class="group-psw">
        <x-input title="设置密码" :type="passwordType1" placeholder="请输入8-20位数字、字母或符号" v-model="pass"  :min="8"
          :max="20"
          label-width="80px"
          :required="true"
          :is-type="checkpasswordfun">
                     <span  slot="right" @click="showPwd"><img  style="width: 20px;height: 13px;" v-if="passwordType1 === 'password'" src="../../../../common/images/eye.png"><img v-else style="width: 20px;height: 13px;" src="../../../../common/images/openeye.png"></span>

        </x-input>
      </group>
      <group class="group-psw">
        <x-input title="确认密码" :type="passwordType2" placeholder="请输入上次的密码" v-model="passis" :required="true" label-width="80px"  :min="8" :max="20">
                    <span  slot="right" @click="showPwd2"><img  style="width: 20px;height: 13px;" v-if="passwordType2 === 'password'" src="../../../../common/images/eye.png"><img v-else style="width: 20px;height: 13px;" src="../../../../common/images/openeye.png"></span>

        </x-input>
      </group>
      <group class="group-psw">
        <x-input title="邀请码" disabled="true" placeholder="请填写8-20位数字邀请码" v-model="ycode" label-width="80px">
        </x-input>
      </group>
      <x-button class="btn-orange-lg" type="primary" action-type="button" @click.native="submitRegister">完成注册</x-button>
      <div class="text-center color-999 reg-tipinfo">提交即同意
        <router-link to=""  @click.native="showpop2" class="colora color-orange" >《中国社会扶贫网注册协议》</router-link>
        和  <br><router-link to=""  @click.native="showpop3" class="colora color-orange" >《用户隐私政策》</router-link>
      </div>
     <!--  <div class="text-center color-999 reg-tipcrm">您是国家任命的扶贫干部？</div>
      <div class="reg-manager text-center">
        <router-link to="/adminReg" class="c-a color-orange" href="">管理员注册</router-link>
      </div> -->
      <!--验证码弹窗-->
      <div class="registerDialog" v-show="dialogshow">
        <div class="overlayer"></div>
        <div class="dialog-box">
          <p class="text-center dia-tit">
            <span>请输入验证码</span>
            <span class="closePower" @click="closeyzmlogin()"><i class="fa fa-times"></i></span>
          </p>
          <div class="dia-box clearfix">
            <swpTouch :sID="sID" @commitSuccess="commitSuccessState" @commitFail="commitFailState"></swpTouch>
          </div>
        </div>
      </div>
      <!--报错弹窗-->
      <alert v-model="errorShow" @on-hide="regOverEnter" :title=errorDialogTitle> {{errorDialogContent}}</alert>
    </div>
    <!--协议弹窗-->
    <proreg ref="protocolcon"></proreg>
    <proyszc ref="protocolcon2"></proyszc>
  </div>
</template>

<script>
  import {Group, Cell, XInput, XButton, XHeader, Alert, Confirm, Countdown, Divider, Popup, TransferDom} from 'vux'
  import adminReg from '@/pages/signin/adminReg'
  import proreg from '@/pages/protocol/proreg'
  import proyszc from '@/pages/protocol/proyszc'
  import swpTouch from '@/pages/swiperTouch/swiperTouch.vue'
  import Bus from '@/assets/js/Bus'
  import {checkPhoneStr,checkNickStr,checkpasswordStr} from '@/util/validFun.js';

  export default {
    directives: {TransferDom},
    components: {Group, Cell, XInput, XButton, XHeader, Alert, Confirm, Countdown, Divider, adminReg, proreg, proyszc,Popup, swpTouch},
    data () {
      return {
         reget:false,
         phonefail:true,
        nickfail:true,
        passwordfail:true,
        passwordType1:"password",
        passwordType2:"password",
        suc: '',
        ycode:'',//邀请码
        sID: '81177363', // 注册场景id
        // 弹窗
        errorDialogTitle: '友情提示', // 报错题目
        errorDialogContent: '', // 报错信息
        regOver: false,
        errorShow: false,
        phone: '', // 手机号
        pass: '', // 密码
        passis:'',//确认密码
        names:'',//昵称
        icode: '', // 手机验证码
        tcode: '', // 图片验证码
        isreg: false, // 是否注册成功
        // 计时
        time: 60, // 计时时间
        start: false, // 是否开始计时
        timerShow: false, // 计时器显示
        disabled: false, // 是否可点击 false为可点击
        codeStyle: '', // 获取验证码按钮颜色
        dialogshow: false, // 验证码验证弹出
        verifyOver: false, // 验证码验证通过
        uuid: '', // 全局唯一标识符
        imgInterface: '',
        code: ''// 错误验证码提示
      }
    },
    created () {
      this.imgInterface = this.BASE_URL + 'mts/graphicCode?markId=' + this.uuid
      this.ycode = this.$route.query.ycode
    },
  watch:{
       phone(val){
      this.$nextTick(() => {
          this.phone = val.replace(/[^0-9]/g,'')
       
        })
    },
    },
     computed:{
      getBtnText(){
        if(this.timerShow){
          return ""
        }
       if(this.reget){
         return "重新获取"
       }
       return "获取验证码"
      }
      },
    methods: {
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
        checkPassword(){
        let reg = /^\w{8,20}$/;
      let flag = reg.test(this.pass);
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
        if (this.passwordType1 === 'password') {
          this.passwordType1= ''
        } else {
          this.passwordType1 = 'password'
        }
      },
       showPwd2() {
        if (this.passwordType2 === 'password') {
          this.passwordType2= ''
        } else {
          this.passwordType2 = 'password'
        }
      },
      commitSuccessState (res, token) {
        // alert(res)
        this.suc = res
        if (res === true) {
          this.$http.post('uts/user/getPhoneCode', {
            phone: this.phone,
            tcode: token,
            ywNo: 1
          }).then((res) => {
            this.timerShow = true
            this.dialogshow = false
            this.start = true
            this.codeStyle = '#ccc!important'
            this.disabled = true
          }).catch((err) => {
            if(err.msg)
            this.showToast('','text',err.msg,'20em','','middle');
          })
        }
        Bus.$emit('funClick', this.suc)
      },
      commitFailState (res) {
        this.showToast('','text',res.msg,'20em','','middle');
      },
      // 协议弹窗
      showpop2 () {
        this.$refs.protocolcon.showpop()
      },
      showpop3 () {
        this.$refs.protocolcon2.showpop()
      },
      // 弹出验证码
      popupeVerify () {
        // 手机号码验证
        let reg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
        let flag = reg.test(this.phone)
        if (this.phone === '' || this.phone.length < 11) {
          this.showToast('','text','手机号码不能为空且必须为11位','20em','','middle');
          return false
        } else if (!flag) {
          this.showToast('','text','手机号码格式不正确','20em','','middle');
          return false
        } else { // 判断用户手机号是否注册过
          this.$http.post('uts/user/isRegister',
            {'mobile': this.phone})
            .then(res => {
              this.showToast('', 'text', '该手机号已注册', '20em', '', 'middle')
              this.isReg = false
              return false
            }).catch(error => {
            if (error.code === '10108') {
              this.dialogshow = true;
            }
          })
        }
      },
      closeyzmlogin () {
        this.dialogshow = false
      },
      regOverEnter (regOver) {
        this.regOver = false;
        this.$router.replace('/user')
      },
      // 完成注册
     async  submitRegister () {
        // 手机号码验证
        if (this.nickfail) {
          let msg = checkNickStr(this.names,2,20,"昵称").msg
          this.showToast('','text',msg,'20em','','middle');
          return false
        }
        // if (this.phone === '' || this.phone.length < 11) {
        //   this.showToast('','text','手机号码不能为空且必须为11位','20em','','middle');
        //   return false
        // }
        // let reg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
        // let flag = reg.test(this.phone)
       
        // 密码验证
        // if (this.pass === '' || this.pass === null) {
        //   this.showToast('','text','密码不能为空','20em','','middle');
        //   return false
        // } else if (this.pass.length < 8) {
        //   this.showToast('','text','密码长度不小于8位','20em','','middle');
        //   return false
        // }
        // let regPass = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
        // let flagPass = regPass.test(this.pass)
        // if (!flagPass) {
        //   this.showToast('','text','必须为字母加数字且长度不小于8位','20em','','middle');
        //   return false
        // }
        // }
         await this.checkPhone(false);
         if(!this.phonefail){
         if(this.passwordfail){
            let msg = checkpasswordStr(this.pass,8,20,"密码").msg
            this.showToast('','text',msg,'20em','','middle');
        return false;
      }
        if(this.passis !== this.pass){
          this.showToast('','text','两次密码输入不一致','20em','','middle');
          return false
        }
        // 调用接口

        this.$http.post('uts/invitationCode/qrCodeRegistered', {
          yanzhenma: this.icode, // 手机验证码
          invitationCode:this.ycode, // 邀请码
          phone: this.phone,
          unionId:this.getCookie('unionid'),
          openid:this.getCookie('openid'),
          thirdHeadPath:this.getCookie('thirdHeadPath'),//微信头像
          thirdNickname:this.getCookie('thirdNickname'),//微信头像
          password: this.pass,
          thirdType:4,
          nickname:this.names,
          ywNo: 1
        }).then((res) =>{
              this.errorShow = true
              this.errorDialogContent = '恭喜您注册成功'
              this.isreg = true // 注册成功标识
              this.regOver = true
              this.$router.push({path:'/invitemember',query:{ycode:this.ycode}})
          /*this.errorShow = true
          this.errorDialogContent = '恭喜您注册成功'
          this.isreg = true // 注册成功标识
          this.regOver = true
          window.localStorage.setItem('token', res.data.res)
          window.localStorage.setItem('longToken', res.data.res) // 长token
          this.$store.commit(types.CHA_USER, res.data.user)
          if (this.$route.query.redirect && this.$route.query.redirect === location.hostname) {
            this.$router.go(-1)
          }
          if (localStorage.getItem('shopurl') && localStorage.getItem('shopurl') !== '') {
            this.$router.replace('/mall')
          } else this.$router.push('/')*/
        }).catch((error) =>{
          console.log(error)
          if (error.code === '10107') {
            /*this.errorShow = true
            this.errorDialogContent = '该手机号已注册'*/
            this.showToast('','text','该手机号已注册','20em','','middle');
            return false
          }
          if (error.code === '10103') {
            this.showToast('','text','图片验证码错误，请刷新验证码','20em','','middle');
            return false
          }
          if (error.code === '10104') {
            this.showToast('','text',error.msg,'20em','','middle');
            return false
          }
        })
         }
      },
      // 计时器计时结束
      countdownFinish () {
        this.disabled = false; // 是否可点击 false为可点击
          this.codeStyle = ''; // 获取验证码按钮颜色
          this.timerShow = false;
          this.start = false;
          this.time = 60;
          this.reget = true;
      },
      // 生成唯一标识符UUID

      //GetCookie
      getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return null;
      },
    }
  }
</script>

<style scoped>
  .reg-content>>> .weui-input{font-size: 15px}
  .reg-tipinfo{margin-top: 20px;line-height: 190%;}
  .reg-tipcrm{margin-top: 50px}
  .reg-manager{margin-top:15px}
  .reg-manager .c-a{display: inline-block;padding-bottom:4px;border-bottom:1px solid #ed6b2b}

  .btn-orange-lg {
    margin-top: 60px;
  }
  .weui-cell{padding: 15px 0}
  .zhanshi {
    disabled: false
  }
  .vux-x-input>>> .weui-label{font-size: 16px}
  /*注册*/
  .vux-divider {
    padding: 20px 0 !important;
  }
  .reg-content {
    padding: 10px 30px 0 30px;
  }
  .dia-box{
    padding-top:0px;
  }
  .reg-content i.fa {
    font-size: 16px;
    color: #ccc;
    padding-right: 20px
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
  .vux-alert>>>.weui-dialog__btn_primary{
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
    right:0px;
    /* top:0; */
    border:0 none;
    bottom: 16px;
  }
  .dia-box input{
    width:100px ;
  }
  .weui-cells,.vux-no-group-title{
    overflow: visible;
  }
  .btn-getcode:after{border:0 none!important;}
</style>

<!-- <template>
  <div>
     <div class="dkwjo" v-if="filterIs">
     <div class="ekjo">
        <div class="yuan" @click="ekmf"><img src="../img/buttom-cosnt.png" style="width:2rem;height:2rem"></div>
       <iframe  :src="ifsrc" frameborder="0" scrolling="no" style="width:90%;height:100%;display:block;margin: 0 auto"></iframe>
      </div>
    </div>
    <div class="warp">
      <div class="zterc">账号注册</div>
      <div class="dshovet-v">
        <div class="shout">手机号</div>
        <input type="text" placeholder="请输入11位手机号" class="sopt" id="" ref="user">
      </div>
      <div class="dshovet-v mfoe">
        <div class="shout">验证码</div>
        <input type="text" placeholder="请输入短信验证码" class="sopt-v" ref="yzm" >
        <div class="fejio" v-if="eismfe"></div>
        <div class="huq" @click="send">
          <span v-show="show" >获取验证码</span>
          <span v-show="!show" class="count">{{count}}秒后重新发送</span>
        </div>
      </div>
      <div class="dshovet-v">
        <div class="shout">昵称</div>
        <input type="text" placeholder="请输入8个字符以内的昵称" class="sopt" style="margin-left:-.3rem" ref="nammes">
      </div>
      <div class="dshovet-v">
        <div class="shout">设置密码</div>
        <input type="password" placeholder="8-20位数字、字母或符号" class="sopt" ref="mimm">
      </div>
      <div class="dshovet-v">
        <div class="shout">确认密码</div>
        <input type="password" placeholder="8-20位数字、字母或符号" class="sopt" ref="qrg"> 
      </div>
      <div class="minse">密码必须由8-20位数字、字母、字符中至少两种组合</div>
      <div class="dshovet-v zh_input" style="overflow: hidden;">
        <div class="shout"  >邀请码</div>
        <input type="text" placeholder="8-20位数字邀请码" class="sopt" ref="eiof" v-model="nife">
        <div class="feo" v-if="tus"></div> 
      </div>
      <div class="minse">可输入企业或好友的邀请码(非必填)</div>
      <div class="dilert" @click="zstor">完成注册</div>
      <div class="fsle">提交即同意<span @click="pwo">《中国社会扶贫网注册协议》</span></div>
      <div class="tank" v-if="ishow">
        <div class="shoue">{{item}}</div>
        <div class="soe" @click="jewk"><span>确定</span></div>
      </div>
    </div>
  </div>
</template>



<script src="publish/4.1.0/js/puzzle.4.1.0.min.js"></script>
<script>
import func from "./vue-temp/vue-editor-bridge";
import { log } from "util";

    var cclog = console.log;
</script>
<script>

import axios from 'axios'
export default{
  data:function(){
    return{
      reGet: false, // 重新获取
      rTime: 60, // 发送验证码倒计时
      sendMsgDisabled: false, // 发送验证码按钮状态
      tel: "",
      code: "",
      ishow:false,
      item:"",
      nife:"",
      tus:true,
      filterIs:false,
      if:"https://wx.shfp1017.org.cn/pages/webhj/demo.html?tel=",
      ifsrc:"",
      show: true,
      count: '',
      timer: null,
      eismfe:false
    }
  },
  mounted:function() { 
    var  that=this; 
    var s=that.$route.query.ycode||"";
    that.nife=s
    if(s==""){
      this.tus=false;
    }else{
      this.tus=true;
    }
    window.onmessage = function (e) {
      that.$data.filterIs=false;
      console.log(that)
      const TIME_COUNT = 60; 
      if (!that.timer) {
        that.count = TIME_COUNT;
        that.show = false;
        that.timer = setInterval(() => {
          if (that.count > 0 && that.count <= TIME_COUNT) {
            that.count--;
             //判断验证码的遮罩层
            if(that.count==0){
              that.eismfe=false
            }else{
              that.eismfe=true
            }
          } else {
            that.show = true;
            clearInterval(that.timer);
            that.timer = null; 
          }
        }, 1000)
      }
    } 
    //  window.aa=alert(aa)
    //邀请码遮罩层
  },
  methods:{
    send:function() {
      //发送端信验证码
      var shoeur = this.$refs.user.value
      this.ifsrc=this.if+shoeur
      if(shoeur==""){
        this.ishow=true
         this.item="手机号不能为空"
      }else{
        this.filterIs=true
      }
    },
    jewk:function(){
     this.ishow=false
    },
    ekmf:function(){
    this.filterIs=false
    },
    pwo:function(){
          this.$router.push({
                path: '/shoutime',
          })
    },
    zstor:function(){
      var that=this
      var phone = this.$refs.user.value
      var mimm=this.$refs.mimm.value
      var yzm=this.$refs.yzm.value
      var nammes=this.$refs.nammes.value
      var qrg=this.$refs.qrg.value
      var eiof=this.$refs.eiof.value
      var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      var eiof_reg = /^\d{8}$/;
      if(!myreg.test(phone)){
        this.ishow=true
        this.item="请输入正确的号码"
      }else if(yzm==""){
        this.ishow=true
        this.item="验证码不能为空"
      }else if(nammes.length>8){
      this.ishow=true
        this.item="请输入正确昵称"
      }
      else if(!/((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{8,20}/g.test(mimm)){
        this.ishow=true
        this.item="请输入正确的密码"
      }else if(qrg==""){
           this.ishow=true
        this.item="请确认密码"
      }else if( qrg!=mimm){
        this.ishow=true
        this.item="两次密码不一致"
      }else if(this.$refs.eiof.value!=''&&!eiof_reg.test(eiof)){
        this.ishow=true
        this.item="请填写正确的邀请码"
      }
      else{
        this.ishow=false;
        var phone = this.$refs.user.value;
        var mimm=this.$refs.mimm.value;
        var yzm=this.$refs.yzm.value;
        var nammes=this.$refs.nammes.value;
        var qrg=this.$refs.qrg.value;
        var eiof=this.$refs.eiof.value;
        var url="https://www.shfp1017.org.cn/ssoredis/invitationCodeUser/qrCodeRegistered";
        var message={
          yanzhenma:yzm,//验证码
          phone:phone,//手机号
          password:mimm,
          nickname:nammes,
          unionId:that.getCookie('unionid'),
          thirdHeadPath:that.getCookie('thirdHeadPath'),
          thirdNickname:that.getCookie('thirdNickname'),
          openid:that.getCookie('openID'),
          thirdType:"4",
          // inviteCode:that.getCookie('ycode'),
          inviteCode:eiof
        }
        that.$http.post(url,message).then((result) =>{
          console.log(result)
          if(result.statusCode==200){
            if(result.result.status=="000"){
              that.$router.push({
              path: '/member', query:{ycode:this.$refs.eiof.value}
              })
            }
            if(result.result.status=="001"){
              alert(result.result.msg)
            }                       
            if(result.result.status=="002"){
              alert(result.result.msg)
            }
            if(result.result.status=="005"||result.result.status=="003"){
                alert(result.result.msg)
            }                               
          }
        }).catch((err) => {
        }); 
      }
    },
    setCookie(name, value) {
      var Days = 3;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return null;
    },
  }
}
</script>
<style >
*{margin: 0;padding: 0;}
.warp{margin: 0;box-sizing: border-box;padding: 0px 1rem}
input{border: 0px;outline:none;cursor: pointer;height: 2.7rem;margin-left: .5rem;width: 10.9rem;color: black;background-color:transparent;border:0}
.zterc{width: 100%;height: 2.5rem;text-align: center;line-height: 2.5rem}
.zterc span{float: left;font-size: 1.4rem}
.dshovet-v{width: 100%;border-bottom :.1rem solid #E5E5E5;height: 2.89rem;margin-top: .4rem;font-size: .3rem;}
.shout{width: 3.9rem;float: left;margin-top: .3rem;height: 2.8rem;line-height: 2.1rem;font-size: .9rem;color: #323232;font-weight:700;}
.sopt{float: left;}
.huq{width:6.3rem;height: 2.3rem;background-color: #FD8B2B;float: right;border-radius: 22px;text-align: center;line-height: 2.3rem;color: #fff}
.sopt-v{width: 6.7rem;color: #323232}
.minse{float: left;width: 100%;font-size: .4rem;color: #FD8B2B;margin-bottom: .4rem}
.dilert{width:100%;height: 2.7rem;background-color:#FD8B2B;border-radius: 33px ;text-align: center;overflow: hidden;margin-top: 1.9rem;line-height:2.7rem;color: #FBD7BD;box-shadow:0 2px 0 #FFDED0;   }
.fsle{font-size: .6rem;color: #D8D8D8;width: 100%;height: .9rem;margin-top: 1.5rem;text-align: center}
  .fsle span{color: #FD8B2B;}
  .shower{width: 100%;font-size: .3rem;color: #D8D8D8;text-align: center;margin-top: 2.2rem;}
.tank{width: 250px;height: 150px;color: black;position: fixed;left:50%;top:50%;transform:translate(-50%,-50%);background-color: #fff}
.shoue{width: 90%;height: 88px;margin: 0 auto;text-align: center;line-height: 100px}
.soe{width: 100%;}
.soe span{display: block;margin: 0 auto;width: 50px;text-align: center}
.feo{width: 100%;position: absolute;left: 44px;height:43px;opacity: 0;}
.zh_input{position: relative;}
.dkwjo{width: 100%;height: 100%;background-color: rgba(0,0,0,.5);position: fixed;z-index: 1}
.ekjo{width: 86%;height: 218px;color: black;position: fixed;left:50%;top:50%;transform:translate(-50%,-50%);background-color: #fff}
.yuan{width: 2rem;height: 2rem;border-radius: 30px;position: absolute;right: -8px;top: -16px;text-align: center;}
.fejio{width: 6.3rem;height: 2.3rem;opacity:0;position: absolute;top:0rem;right: 0rem; }
.mfoe{position: relative;}
</style>
 -->