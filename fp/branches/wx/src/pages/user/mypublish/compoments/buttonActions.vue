<template>
  <div>
    <div class="btm-ope display-flex justify-flex-end">

      <div v-if="demandDetail.demand_status===6" class="f-16 color-orange text-center" style="width: 100%">
        <i class="iconfont icon-f-time"></i>
        {{STATUS_MAP_UI.getCountdown(demandDetail)}}
      </div>

      <div v-else @click.prevent="onClick(btn)"
           v-for="(btn,index) in STATUS_MAP_UI.getDetailButtonArray(demandDetail)"
           :key="index"
           class=" btn-bordered btn-bordered-orange f-16 ml-10">
        {{btn.text}}
      </div>

    </div>

    <!--关闭需求弹窗-->
    <div v-transfer-dom>
      <confirm v-model="showconfirm" title="" confirm-text="确认" cancel-text="取消" @on-confirm="onConfirm()" @on-cancel="onCancel()">
        <p style="text-align:center;">{{STATUS_MAP_UI.getConfirmText(demandDetail)}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import {TransferDom, Confirm} from 'vux'
  import STATUS_MAP_UI from '../STATUS_MAP_UI'

  export default {
    directives: {
      TransferDom
    },
    components: {Confirm},
    name: "buttonActions",
    props: {
      demandDetail: '',
      type:""
    },
    data() {
      return {
        showconfirm: false,
        clickedBtn: '',
        STATUS_MAP_UI: STATUS_MAP_UI
      }
    },
    methods: {
      onClick(btn) {
        this.clickedBtn = btn
        let text = btn.text
        if (text.indexOf("删除") > -1 || text.indexOf("关闭") > -1 || text.indexOf("提前结束") > -1 || text.indexOf("收货") > -1) {
          this.showconfirm = !this.showconfirm
        } else {
          this.$router.push({name: btn.url, params: {demandId: this.demandDetail.id, code: this.demandDetail.demand_type}})
        }
      },
      async onConfirm() {
        let text = this.clickedBtn.text
        try {
          if (text.indexOf("删除") > -1) {
            await this.$http.post('hts/myDemand/deleteDemand', {demandId: this.demandDetail.id})
            this.showToast('','text','删除成功','20em','','middle');
            this.$router.go(-1);
          } else if (text.indexOf("关闭") > -1) {
            await this.$http.post('hts/myDemand/closeDemand', {demandId: this.demandDetail.id});
            this.$router.replace('/mypublist/0');
          } else if (text.indexOf("收货") > -1) {
            await this.$http.post('hts/myDemand/receipt', {demandId: this.demandDetail.id})
            this.$router.go(-1);
          } else {
            this.$router.push({name: this.clickedBtn.url, params: {demandId: this.demandDetail.id}})
          }
        } catch (err) {
          switch (err.code) {
            case 'D1007':
              this.showToast('', 'text', '删除失败')
              break
            case 'D1006':
              if(text.indexOf("关闭") > -1){
                this.showToast('', 'text', '关闭失败')
              }else{
                this.showToast('', 'text', '确认收货失败')
              }
              break
          }
        }
      },
    }
  }
</script>

<style scoped>

  /*底部操作栏*/
  .btm-ope {
    padding: 13px 15px;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0

  }

  .btm-ope .btn-bordered {
    margin-right: 10px
  }

  .btm-ope .btn-bordered.btn-bordered-orange {
    margin-right: 0
  }

  /*弹窗样式*/
  .vux-confirm >>> .weui-dialog__btn_primary {
    color: #fff;
    background: #f37306
  }

  .vux-confirm >>> .weui-dialog__ft {
    font-size: 16px
  }

  .vux-confirm >>> .weui-dialog__bd {
    font-size: 16px
  }
</style>
