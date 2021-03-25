<template>
  <div>
    <x-header :left-options="{backText: ''}">绑定新手机号<a slot="right" class="color-orange f-16" @click="smsvalidate">提交</a></x-header>
    <div class="box-withheader over-auto bg-ffffff">
      <div class="form-list">
        <group title="" class="f-16 " label-width="5.5em">
          <x-input title="新手机号" placeholder="请输入11位手机号"  :is-type="checkphonefun" :required="true"  v-model="newtelphone"  keyboard="number" :max="11"></x-input>
          <!-- <x-input title="验证码" placeholder="请输入数字验证码"  v-model="datacode">
            <img slot="right" @click='tcodeChange' :src="verificationCode" height="30">
          </x-input> -->
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
          <!-- <x-input title="手机验证码" placeholder=""  v-model="validatecode" type="number" :min="6" :max="6">
            <span slot="right" :class="validateclass"  class="btn-getcode dis-inline  text-center f-14" @click="getValidateCode()">获取验证码
            </span>
          </x-input> -->
        </group>
        <group class="group-psw">
          <x-input title="验证码" placeholder="请输入短信验证码" v-model="smscode" class="weui-vcode" label-width="80px">
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
       
      </div>
    </div>
  </div>
</template>


<script>
  import {XHeader, Group, Cell, XInput,Countdown,XButton} from 'vux'
import swpTouch from '../../../swiperTouch/swiperTouch.vue'
 import Bus from '../../../../assets/js/Bus'
 import {checkPhoneStr} from '@/util/validFun.js';

  export default {
    name: "BindNew",
    components: {XHeader, Group, Cell, XInput,swpTouch,Countdown,XButton},
    data() {
      return {
        phonefail:true,
        reget:false,
          time:60,
        disabled: false, // 是否可点击 false为可点击
        start:false,
        codeStyle: '', // 获取验证码按钮颜色
        dialogshow:false,
        sID:"55098962", // 注册场景id
        validatetime:false,
        newtelphone:"",
        validatecode:"",
        datacode:"",
        smscode:"",
         timerShow:false,
        validatetime:false,
        verificationCode:'',
        random: "",
        dialogshow:false,
      }
    },
    watch:{
     newtelphone(val){
      this.$nextTick(() => {
          this.newtelphone = val.replace(/[^0-9]/g,'')
       
        })
     }
    },
    
    methods:{
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
     async smsvalidate(){
          await this.checkPhone(false);
         if(!this.phonefail){
        
           if(this.smscode == '') {
            this.showToast('','text','请输入短信验证码','20em','','top');
            return;
        }
        let self = this
        let obj = {};
        obj.phone = this.newtelphone;
        obj.icode = this.smscode;
        obj.ywNo = 1;
        this.$http.post('uts/user/changeTel ',obj)
          .then(function (response) {
            self.showToast('','text','新手机号绑定成功!','20em','','top');
            self.$router.push("/setting")
          })
          .catch(function (error) {
            if(error.msg)
              self.showToast('','text',error.msg,'20em','','top');
          })
         }
      },
      tcodeChange(){
        this.random = Math.floor(Math.random() * 1000);
        this.verificationCode =
          this.BASE_URL+"mts/graphicCode?markId=" + this.random;
      },
 
      closeyzmlogin () {
        this.dialogshow = false
      },
      commitSuccessState(flag,token){
        this.suc = flag
        this.random = Math.floor(Math.random()*1000);
        if(flag === true){
         this.$http.post('uts/user/getPhoneCode', {
            phone: this.newtelphone,
            tcode: token,
            ywNo:1,
            markId: this.random
          }).then((res) =>{
              this.timerShow = true
              this.dialogshow = false
              this.start = true
              this.codeStyle = '#ccc!important'
              this.disabled = true
          }).catch(err =>{
            // this.errorShow = true;
            // this.errorDialogContent = '请稍后重试'
            if(err.msg)
            this.showToast('','text',err.msg,'20em','','middle')
          })
        }
        Bus.$emit('funClick',true)
      },
       // 刷新验证码
      countdownFinish () {
        this.disabled = false; // 是否可点击 false为可点击
          this.codeStyle = ''; // 获取验证码按钮颜色
          this.timerShow = false;
          this.start = false;
          this.time = 60;
          this.reget = true;
        
      },
    checkPhone(isyz) {
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
             if (isyz) {
              this.dialogshow = true;
            } else this.dialogshow = false;
            
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
    }
    },
    created(){
      this.tcodeChange()
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
      },
      validateclass:function(){
        if(this.validatetime){
          return "bg-gray color-orange"
        }
        else return "bg-orange color-white"
      }
    }
  }
</script>

<style scoped>

  .form-list{padding: 0 }
  .form-list >>> .weui-cells__title {
    font-size: 16px;
    color: #333;
    margin-bottom: 0;
  }
  .form-list >>> .weui-cells
  {margin-top:0}
  .form-list >>> .weui-cells:before {
    border: 0 none;
  }

  .form-list >>> .weui-cells:after {
    left: 15px;
    right: 15px;
  }

  /*cell*/
  .weui-cell, .vux-cell-box >>> .weui-cell {
    padding: 18px 15px
  }

  .weui-cell:before {
    left: 15px;
    right:15px
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
  /*小按钮*/
  .btn-getcode {
    position: absolute;
    right: 15px;
    bottom: 15px;
    padding: 6px 12px;
    border-radius: 30px
  }
  /*弹窗样式*/
  .vux-alert>>>.weui-dialog__btn_primary{color:#f90}
  .vux-confirm>>>.weui-dialog__btn_primary{color:#fff;background:#f37306}
  .vux-confirm>>>.weui-dialog__ft{font-size: 16px}
  .vux-confirm>>>.weui-dialog__bd{font-size:16px}
</style>

