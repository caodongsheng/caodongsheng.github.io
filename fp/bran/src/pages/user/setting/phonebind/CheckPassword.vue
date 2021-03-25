<template>
  <div>
    <x-header :left-options="{backText: ''}">验证旧手机号<router-link slot="right" class="color-orange f-16" to="" @click.native="passwordcheck">提交</router-link></x-header>
    <div class="box-withheader over-auto bg-ffffff">
      <div class="form-list">
        <group title="" class="f-16 " label-width="5.5em">
          <x-input title="旧手机号" placeholder=""  v-model="oldtelphone" disabled></x-input>
          <x-input title="密码" placeholder=""  v-model="password" :type="passwordType">
                         <span  slot="right" @click="showPwd"><img  style="width: 20px;height: 13px;" v-if="passwordType === 'password'" src="../../../../common/images/eye.png"><img v-else style="width: 20px;height: 13px;" src="../../../../common/images/openeye.png"></span>

          </x-input>
        </group>
      </div>
    </div>
  </div>
</template>


<script>
  import {XHeader, Group, Cell, XInput} from 'vux'

  export default {
    name: "CheckPassword",
    components: {XHeader, Group, Cell, XInput},
    data() {
      return {
        passwordType:"password",
        oldtelphone:"",
        password:""
      }
    },
    created(){
      this.oldtelphone = this.$store.state.usersetting.mobile;
    },
    methods: {
        showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType= ''
        } else {
          this.passwordType = 'password'
        }
      },
      passwordcheck() {
        if(this.password == '') {
            this.showToast('','text','请输入密码','20em','','middle');
        }
        let self = this
        let obj = {};
        obj.oldTel = this.oldtelphone;
        obj.password = this.password;
        this.$http.post('uts/user/checkTelByPass', obj)
          .then(function (response) {
              self.showToast('','text','旧手机号验证成功','20em','','middle');
            self.$router.replace("/BindNew")
          })
          .catch(function (error) {
            if(error.msg)
            self.showToast('','text',error.msg,'20em','','middle');
          })
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

</style>

