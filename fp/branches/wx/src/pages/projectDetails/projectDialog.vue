<template>
  <div>

      <x-dialog v-model="showScrollBox" class="dialog-demo">
        <p class="dialog-title">公益活动</p>
        <div class="img-box" style="height:120px;padding:5px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">
          国家对贫困户的界定，有其严格的划
          分标准：即绝对贫困人口（年人均收
          入低于1111.1元）相对贫困人口（年
          人均纯收入866-1205元）；一般收
          入和高输入（年人均纯收入1205元以
          上）。通常把年人均纯收入低于1205
          元的家庭人口统称为弱势群体
        </div>
        <div @click="showScrollBox=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>


  </div>
</template>

<script>
  import { XDialog, XButton, XSwitch, TransferDomDirective as TransferDom } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XDialog,
      XButton,
      XSwitch
    },
    methods: {
      doShowToast () {
        this.$vux.toast.show({
          text: 'toast'
        })
      }
    },
    data () {
      return {
        showScrollBox: true

      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/close';

  .dialog-demo {
    .weui-dialog{
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .img-box {
      height: 350px;
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
</style>
