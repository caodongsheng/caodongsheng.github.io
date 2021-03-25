<template>
  <div>
    <x-header :left-options="{backText: ''}">验证银行账号信息</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd checkcon"  label-width="4em" label-margin-right="2em" label-align="left">
        <div slot="title" class="tipmsg f-14">
          绑卡须知：平台只支持<em class="color-red">储蓄卡</em>提现，请勿绑定<em class="color-red">信用卡、存折</em>等以免影响提现。
        </div>
        <cell  class="f-16 bg-ffffff" title="收款人" value="王大拿" value-align="left">
          <i slot="child" class="iconfont icon-f-info color-orange f-22 infolink" @click="showconfirm=true"></i>
        </cell>
        <x-input class="f-16 bg-ffffff"   title="银行卡号"   placeholder=""  type="text" value="6225 3874 0899 027"></x-input>
      </group>


      <!--底部按钮-->
      <div class="btm-ope">
        <router-link to="banksupportlist" class="color-blue f-14 text-center dis-block" style="margin-bottom: 20px">支持的银行列表</router-link>
        <router-link to="" class="btn-orange-lg dis-block text-center color-white" @click.native="check=true">进行银联校验</router-link>
      </div>
    </div>


    <!--感叹号说明信息弹窗-->
    <div v-transfer-dom>
      <alert v-model="showconfirm"   title="提示" button-text="我知道了" >
        <p  class="f-14 text-left" style="line-height:30px">
          为了账户资金安全，仅支持受助人的实名账户认证通过的银行卡提现。<br>姓名：王大拿<br>身份证号：110*************789
        </p>
      </alert>
    </div>

  </div>
</template>

<script>
  import {XHeader,Group,Cell,XInput,Confirm,TransferDom,Alert} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    name: "bank_check",
    components:{XHeader,Group,Cell,XInput,Confirm,Alert},
    data(){
      return{
        check:false,
        showconfirm:false
      }
    }
  }
</script>

<style scoped>
  /*group去掉边线*/

  .checkcon >>> .weui-cells {
    margin-top: 0;
    background: transparent;
  }

  .checkcon >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }
  .checkcon>>>  .weui-cells{margin-top:0}
  .weui-cell{padding: 14px 15px}
  .weui-cell:before{left:0}

  /*说明信息*/
.checkcon>>>.tipmsg{
  padding: 10px 15px;
}

  /*右侧信息图标链接*/
  .infolink{position: absolute;right:0;padding:0 15px}

  /*底部按钮*/
  .btm-ope {
    padding: 10px 40px 30px 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0
  }

  /*弹窗样式*/
  .vux-alert>>>.weui-dialog__btn_primary{color:#f90}
  .vux-confirm>>>.weui-dialog__btn_primary{color:#fff;background:#f37306}
  .vux-confirm>>>.weui-dialog__ft{font-size: 16px}
  .vux-confirm>>>.weui-dialog__bd{font-size:16px}
</style>
