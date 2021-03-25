<template>
  <div class="box-withheaderover-auto">
    <x-header :left-options="{backText: ''}" style="border:0 none">找回密码</x-header>
    <div class="reg-content">
      <group>
        <x-input title="新密码" placeholder="8-20位字母数字或符号" :type="passwordType1" v-model="pass" :is-type="checkpasswordfun"
          :min="8" :max="20" :required="true">
                       <span  slot="right" @click="showPwd"><img  style="width: 20px;height: 13px;" v-if="passwordType1 === 'password'" src="../../common/images/eye.png"><img v-else style="width: 20px;height: 13px;" src="../../common/images/openeye.png"></span>

        </x-input>
      </group>
      <group>
        <x-input title="确认密码" placeholder="8-20位字母数字或符号" :type="passwordType2" v-model="enterPass" :min="8" :max="20" :required="true">
                       <span  slot="right" @click="showPwd2"><img  style="width: 20px;height: 13px;" v-if="passwordType2 === 'password'" src="../../common/images/eye.png"><img v-else style="width: 20px;height: 13px;" src="../../common/images/openeye.png"></span>

        </x-input>
      </group>
      <x-button class="btn-orange-lg" type="primary" action-type="button" @click.native="changPass">完成</x-button>
    </div>
    <!--报错弹窗-->
    <alert v-model="errorShow" :title=errorDialogTitle @on-hide="onHide()"> {{errorDialogContent}}</alert>

  </div>
</template>

<script>
  import {Group, Cell, XInput, XButton, XHeader, Alert, Divider, PopupPicker} from 'vux'
  import adminReg2 from './adminReg2'
  import {checkpasswordStr} from '@/util/validFun.js';

  export default {
    components: {Group, Cell, XInput, XButton, XHeader, Alert, Divider, PopupPicker, adminReg2},
    data () {
      return {
        passwordfail:true,
        passwordType1:"password",
        passwordType2:"password",
        errorDialogTitle: '友情提示', // 报错题目
        errorDialogContent: '', // 报错信息
        errorShow: false,
        state: false,
        pass: '',
        enterPass: ''
      }
    },
    methods: {
      
     checkpasswordfun(value) {
     let validobj = checkpasswordStr(value, 8, 20, "新密码");
      if (!validobj.valid) {
        this.passwordfail = true;
      } else {
        this.passwordfail = false;
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
      // 提交
      changPass () {
        // 密码验证
        // if (this.pass == null || this.pass.length < 8) {
        //   this.errorShow = true
        //   this.errorDialogContent = '密码不能为空长度不小于8位'
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
         if(this.passwordfail){
          let msg = checkpasswordStr(this.pass, 8, 20, "新密码").msg;
            this.showToast("", "text", msg, "20em", "", "middle");
        return false;
      }
      if (this.enterPass !== this.pass) {
        this.showToast("", "text", "两次密码输入不一致", "20em", "", "middle");
        return false;
      }
        let _this = this
        let storage = window.localStorage
        _this.$http.post('uts/user/resetPass', {
          mobile: storage.getItem('phone'),
          pass: _this.pass,
          rePass: _this.enterPass
        })
          .then(function (response) {
            _this.state = true
            _this.errorShow = true
            _this.errorDialogContent = '密码修改成功,请登录'
            return false
          })
          .catch(function (error) {
            console.log(error)
            if (error.code === '10111') {
              _this.errorShow = true
              _this.errorDialogContent = '新密码与旧密码相同'
              return false
            }
            if (error.code == '10110') {
              _this.errorShow = true
              _this.errorDialogContent = '两次密码输入不一致'
              return false
            }
            if (error.code == 'M2003') {
              _this.errorShow = true
              _this.errorDialogContent = error.msg
              return false
            }
          })
      },
      onHide () {
        if (this.state == true) {
          this.$router.push({name: 'login'})
        }
      }
    }
  }
</script>

<style  scoped>
  .vux-divider {
    padding: 20px 0 !important;
  }

  .vux-x-input>>> .weui-label {
    font-size: 16px;}
  .weui-cell{padding: 15px 0}

  .reg-content {
    padding: 30px 30px 0 30px;
  }

  .reg-content i.fa {
    font-size: 16px;
    color: #ccc;
    padding-right: 20px
  }

  .reg-content >>> .vux-x-input {
    font-size: 14px;
  }

  .reg-content >>> .weui-cells:before {
    border-top-width: 0;
  }

  .group-psw .weui-cells {
    margin-top: 30px
  }
  .btn-orange-lg {
    margin-top: 30px;
  }

  .vux-popup-picker-select {
    text-align: center !important;
  }

  .vux-popup-header-right {
    color: #000000 !important;
  }
  .weui-cell__hd {
    width: 30% !important;
  }
  .reg-content >>> .weui-cells:before {
    border-top-width: 0;
  }
  .weui-dialog >>>.weui-dialog__btn_primary{color: #ec0115!important;}
</style>
