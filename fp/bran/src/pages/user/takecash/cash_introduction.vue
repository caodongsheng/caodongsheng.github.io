
<template>
  <div class="bg-f6f5f6 h-full">
    <!--头部信息-->
    <div class="cash-header">
      <x-header :left-options="{backText: ''}">提现说明
      </x-header>
    
    </div>
    <!--银行账户-->
    <div class="cash-bank">
     <p>1.在需求变成等待提现状态，点击“提现“按钮可提现；</p>
     <p>2.选择银行账户（没有银行账户，“点击添加“添加成功后可提现）；</p>
     <p>3.收到提现申请提交成功提示，点击“确认“按钮，返回需求列表；</p>
     <p>4.财务线下打款，打款完成，提现成功；</p>
    </div>
        <div class="cash-bank">
     
     <h3 style="text-align:center;padding-bottom:5px">提现注意事项:</h3>
     <p>1.提现银行卡必须与贫困户本人姓名一致，否则不允许提现；</p>
     <p>2.银行卡信息错误，请与平台客服联系，提交凭证进行修改；</p>
    </div>
    <!--底部按钮-->
   

    <!-- <p class="loading" style="text-align:center;" v-show="showLoading">
      <inline-loading></inline-loading>
    </p> -->

  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
  
    name: "cash_introcudtion",
    components: {XHeader},
   
   
  }
</script>

<style scoped>
  /*可提现头部信息*/
  .vux-header {
    background: transparent !important;
    border-color: transparent;
  }

  .vux-header >>> .vux-header-title {
    color: #fff !important
  }

  .vux-header >>> .vux-header-left .left-arrow:before {
    border-color: #fff !important;
    border-width: 2px 0 0 2px !important;
  }

  .cash-header {
    background-image: -webkit-linear-gradient(top, rgba(255, 172, 84, 1) 0, rgba(251, 107, 21, 1) 100%);
    background-image: linear-gradient(to bottom, rgba(255, 172, 84, 1) 0, rgba(251, 107, 21, 1) 100%);
  }

  .cash-header .header-con {
    padding: 20px 15px;
    color: #fff
  }
  .cash-bank{
      margin-bottom: 15px;
  }
 .cash-bank p{
    
    font-size:16px;
   padding: 5px 10px
 }
</style>

