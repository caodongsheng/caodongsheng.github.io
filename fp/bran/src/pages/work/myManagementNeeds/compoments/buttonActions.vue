<template>
  <div>
    <div class="display-flex justify-flex-end" v-if='STATUS_MAP_UI.getDetailButtonArray(demandDetail)'
         :class="STATUS_MAP_UI.getDetailButtonArray(demandDetail).length !== 0 ? 'btm-ope' : ''">
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
      <!-- <div v-else @click.prevent="close"
           v-if="demandDetail."
           class=" btn-bordered btn-bordered-orange f-16 ml-10">
        {{btn.text}}
      </div> -->
    </div>

    <!--关闭需求弹窗-->
    <div v-transfer-dom>
      <confirm v-model="showconfirm" title="" confirm-text="确认" cancel-text="取消" @on-confirm="onConfirm()"
               @on-cancel="onCancel()">
        <p style="text-align:center;">{{STATUS_MAP_UI.getConfirmText(demandDetail)}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
  import {TransferDom, Confirm ,AlertPlugin} from 'vux'
  import STATUS_MAP_UI from '../STATUS_MAP_UI'
Vue.use(AlertPlugin)

// 或者umd方式
// 引入构建的js文件
  export default {
    directives: {
      TransferDom
    },
    components: {Confirm},
    name: 'buttonActions',
    props: {
      demandDetail: ''
    },
    data () {
      return {
        showconfirm: false,
        clickedBtn: '',
        STATUS_MAP_UI: STATUS_MAP_UI
      }
    },
    methods: {
      onClick (btn) {
        this.clickedBtn = btn
        let text = btn.text
        let donatedMoney = this.demandDetail.moneycount ? this.demandDetail.moneycount : 0
        if (text.indexOf('删除') > -1 || text.indexOf('关闭') > -1 || text.indexOf('提前结束') > -1 || text.indexOf('收货') > -1) {
          if(text.indexOf('提前结束') > -1 && this.demandDetail.isSpecial==1){//isSpecial 是否发起特殊提现  1是 2否
            this.$vux.alert.show({
              title: '提示',
              content: '此需求已由县级管理员进行了特殊提现操作，如有疑问请与管理员联系。',
              onShow () {
                console.log('此需求已由县级管理员进行了特殊提现操作，如有疑问请与管理员联系 showing')
              },
              onHide () {
                console.log('此需求已由县级管理员进行了特殊提现操作，如有疑问请与管理员联系  hiding')
              }
            })
            //此需求已由县级管理员进行了特殊提现操作，如有疑问请与管理员联系。
          }else{
            this.showconfirm = !this.showconfirm
          }
        } else {
          if(this.demandDetail.demand_status==4 && this.demandDetail.isSpecial==1){
            this.$vux.alert.show({
              title: '提示',
              content: '此需求已由县级管理员进行了特殊提现操作，如有疑问请与管理员联系。',
              onShow () {
                console.log('此需求已由县级管理员进行了特殊提现操作，如有疑问请与管理员联系 showing')
              },
              onHide () {
                console.log('此需求已由县级管理员进行了特殊提现操作，如有疑问请与管理员联系  hiding')
              }
            })
          }else{
            this.$router.push({name: btn.url, params: {demandId: this.demandDetail.id,code: this.demandDetail.help_type_code}})
          }
        }
      },
      async onConfirm () {
        let text = this.clickedBtn.text
        if (text.indexOf('删除') > -1) {
          try {
            await this.$http.post('hts/myDemand/deleteDemand', {demandId: this.demandDetail.id})
            this.$router.go(-1)
          } catch (e) {
            if(e.msg)    this.showToast('', 'text', e.msg, '20em', '', 'bottom')
          }
        } else if (text.indexOf('关闭') > -1) {
          try {
            await this.$http.post('hts/myDemand/closeDemand', {demandId: this.demandDetail.id})
            this.$router.go(-1)
          } catch (e) {
             if(e.msg)    this.showToast('', 'text', e.msg, '20em', '', 'bottom')
          }
        } else if (text.indexOf('收货') > -1) {
          try{
            let res = await this.$http.post('hts/myDemand/receipt', {demandId: this.demandDetail.id})
            // debugger
            this.$router.go(-1)
          } catch(e) {
            this.showToast('','text',e.msg,'20em','','bottom');
          }


        } else {
          this.$router.push({name: this.clickedBtn.url, params: {demandId: this.demandDetail.id}})
        }
      },
      onCancel () {

      }

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
    right: 0;
    background: #fff;
    z-index: 9999;

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
