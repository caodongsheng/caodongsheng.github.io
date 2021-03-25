<template>
  <div>
    <x-header :left-options="{backText: ''}">提现</x-header>
    <div class="cash-success box-withbar over-auto">
      <msg title="操作成功" icon="success">
        <div slot="description" class="f-14 text-center">提现申请已提交，我们将在10个工作日内将资金打到您选择的银行卡上，请注意查收！</div>
        <div class="btns" slot="buttons">
          <x-button plain type="primary" class="f-16" link="/mypublish">返回我发布的需求列表</x-button>
        </div>
      </msg>


  </div>
  </div>
</template>

<script>
  import {XHeader, Msg, XButton} from 'vux'

  export default {
    name: "cash_success",
    components: {XHeader, Msg, XButton}
  }
</script>

<style scoped>
  .cash-success{padding: 0 25px}
  .weui-msg>>>.weui-icon-success{color:#ef6b2b}
  .weui-btn_plain-primary {
    color: #ef6b2b;
    border: 1px solid #ef6b2b;
    line-height: 42px;
  }
  .weui-btn {
    font-size: 16px;
    line-height: 42px;
  }
</style>
