<template>
  <div>
    <x-header :left-options="{backText: ''}">验证银行账号</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <!--银行列表-->
      <group class="bank-support group-clearbd " title="B">
        <cell class="bg-ffffff f-16"  title="北京银行（信用卡）"></cell>
      </group>
      <group class="bank-support group-clearbd " title="C">
        <cell class="bg-ffffff f-16"  title="重庆农商银行（信用卡）"></cell>
        <cell  class="bg-ffffff f-16"  title="长沙银行（信用卡）"></cell>
      </group>
    </div>
  </div>
</template>

<script>
  import {XHeader,Group,Cell} from 'vux'
  export default {
    name: "bank_supportlist",
    components:{XHeader,Group,Cell}
  }
</script>

<style scoped>
  /*group去掉边线*/

  .bank-support >>> .weui-cells {
    margin-top: 0;
    background: transparent;
  }

  .bank-support >>> .weui-cells:before, .bank-support >>> .weui-cells:after {
    border: 0 none
  }
  .bank-support>>>  .weui-cells{margin-top:0x}
  .weui-cell{padding: 14px 15px}
  .weui-cell:before{left:0}

  .bank-support>>>.weui-cells__title{margin: 4px 0}
</style>
