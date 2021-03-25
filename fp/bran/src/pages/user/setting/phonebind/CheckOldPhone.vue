<template>
  <div>
    <x-header :left-options="{backText: ''}">手机号绑定<router-link slot="right" class="color-orange f-16" to="" @click.native="smsvalidate">下一步</router-link></x-header>
    <div class="box-withheader over-auto bg-ffffff">
      <div class="form-list">
        <group title="" class="f-16 " label-width="5.5em">
          <x-input title="旧手机号"   v-model="oldtelphone" disabled></x-input>
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
          <x-input title="验证码" placeholder="请输入短信验证码" v-model="smscode" class="weui-vcode" label-width="80px">
            <!--<i slot="label" class="fa fa-mobile-phone" aria-hidden="true"></i>-->
            <x-button slot="right"  style="width:100px" type="primary" mini :disabled="disabled" :style="{background:codeStyle}" @click.native="getValidateCode()" class="btn-getcode">
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
      <!--说明信息-->
      <div class="tipmsg f-14 color-orange">
        <i class="fa fa-exclamation-circle f-16" style="padding-top: 3px"></i>
        <div class="text">
          <p @click="showconfirm=true">手机号丢失/停用 </p>
        </div>
      </div>
    </div>
    <!--提示弹窗-->
    <div v-transfer-dom>
      <confirm v-model="showconfirm" title="提示" confirm-text="确定" cancel-text="取消"    @on-confirm="toWritePassword">
        <p class="f-14 text-center" style="line-height: 24px;margin: 15px 0">手机号丢失或停用？<br>请输入原手机号和密码验证</p>
      </confirm>
    </div>
  </div>
</template>


<script>
  import {XHeader, Group, Cell, XInput,TransferDom, Confirm,Countdown,XButton} from 'vux'
  import swpTouch from '../../../swiperTouch/swiperTouch.vue'
  import Bus from '../../../../assets/js/Bus'
  export default {
    directives: {
      TransferDom
    },
    name: "CheckOldPhone",
    components: {XHeader, Group, Cell, XInput,Confirm,swpTouch,Countdown,XButton},
    data() {
      return {
        reget:false,
        time:60,
        disabled: false, // 是否可点击 false为可点击
        start:false,
        codeStyle: '', // 获取验证码按钮颜色
        timerShow:false,
        dialogshow:false,
        sID:"55098962", // 注册场景id
        oldtelphone:"",
        showconfirm:false,
        validatetime:false,
        datacode:"",
        smscode:"",
        imgInterface:'',//验证码
        random:''//验证码随机数
      }
    },
    methods:{
      // 刷新验证码
      countdownFinish () {
        this.disabled = false; // 是否可点击 false为可点击
          this.codeStyle = ''; // 获取验证码按钮颜色
          this.timerShow = false;
          this.start = false;
          this.time = 60;
          this.reget = true;
        
      },
    //   tcodeChange () {
    //     this.random = Math.floor(Math.random()*1000);
    //     this.imgInterface = this.BASE_URL+'mts/graphicCode?markId=' + this.random;
    //   },
      toWritePassword () {
        this.$router.push('/CheckPassword');
      },
      getDataCode(){},
      smsvalidate(){
        if(this.oldtelphone === '') {
          this.showToast('','text','请输入旧手机号','20em','','top');
          return;
        }
        if(this.smscode == '') {
            this.showToast('','text','请输入短信验证码','20em','','top');
            return;
        }
        let self = this
        let obj = {};
        obj.mobile = this.oldtelphone;
        obj.icode = this.smscode;
        obj.ywNo = 1,
        this.$http.post('uts/user/isYZMOK',obj)
        .then(res => {
            this.$router.replace('/BindNew')
        })
        .catch(err => {
          if(err.msg)
            this.showToast('','text',err.msg,'20em','','middle')
        })
        // this.$http.post('uts/user/changeTel',obj).then((response) => {
        //       self.$router.replace("/BindNew");
        //   })
        //   .catch(err => {
        //       this.showToast('','text',err.msg,'20em','','middle')
        //   })
      },
      getValidateCode(){
      
          this.dialogshow = true
        
      },
      commitSuccessState(flag,token){
        this.suc = flag
          this.random = Math.floor(Math.random()*1000);
        if(flag === true){
          this.$http.post('uts/user/getPhoneCode', {
            phone: this.oldtelphone,
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
      commitFailState(res){},
      closeyzmlogin () {
        this.dialogshow = false
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
      },
      validateclass:function(){
        if(this.validatetime){
          return "bg-gray color-orange"
        }
        else return "bg-orange color-white"
      }
    },
    created(){
      this.oldtelphone = this.$store.state.usersetting.mobile;
      this.getDataCode();
      this.tcodeChange()
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
.dia-box{
    padding-top:0px;
  }
  /*小按钮*/
  .btn-getcode {
    position: absolute;
    right: 15px;
    bottom: 14px;
    padding: 6px 12px;
    border-radius: 30px;
    background-color: #fd8929 !important;
    color: #fff;
  }
  /*底部提示信息*/

  .tipmsg{
    padding: 15px;
    display: flex;
    position: relative;
  }
  .checkCode{
    position: absolute;
    top:10px;
    right: 36px;
  }

  .tipmsg  .text{
    flex: 1;
    padding-left: 8px}
  .tipmsg  .text p{margin-bottom:6px}

  /*弹窗样式*/
  .vux-alert>>>.weui-dialog__btn_primary{color:#f90}
  .vux-confirm>>>.weui-dialog__btn_primary{color:#fff;background:#f37306}
  .vux-confirm>>>.weui-dialog__ft{font-size: 16px}
  .vux-confirm>>>.weui-dialog__bd{font-size:16px}
</style>

