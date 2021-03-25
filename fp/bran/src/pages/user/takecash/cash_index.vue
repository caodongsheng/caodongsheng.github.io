<template>
  <div class="bg-f6f5f6 h-full">
    <!--头部信息-->
    <div class="cash-header">
      <x-header :left-options="{backText: ''}">提现<a slot="right" @click="getCashIntroduce()"><i class="iconfont icon-f-wenhao f-24 color-white"></i></a>
      </x-header>
      <div class="header-con">
        <p style="margin-bottom: 6px" class="f-14">可提现金额</p>
        <p class="f-30 f-bold"><em class="f-16">¥</em>{{demandDetail.moneycount}}元</p>
      </div>
    </div>
    <!--银行账户-->
    <div class="cash-bank">
      <group class="bank-cur group-clearbd " title="选择提现银行账户">
        <!--if有银行卡-->
        <cell is-link link="/bankchoice"
              class="bank-cur-item" v-if="bank">
          <!-- <img class="v-middle" slot="icon" :src=iconList[bank.bank_name] width="50"> -->
          <h1 slot="title" class="f-16 color-333 f-normal">{{demandDetail.aideder_name}}<span class="f-14 color-999">{{bank.bank_name}}</span>
          </h1>
          <p slot="inline-desc" class="color-333 f-14">{{bank.bank_account}}</p>
        </cell>
        <!--else没有银行卡-->
        <router-link v-else class="bank-none-item text-center" to="/bankaddhand">
          <p class="f-14 color-999" style="margin-bottom: 5px">没有添加银行账户</p>
          <p class="color-orange f-14">点击添加</p>
        </router-link>
      </group>
    </div>
    <!--底部按钮-->
    <div class="btm-ope fix-bottom">
      <div class="btn-orange-lg dis-block text-center color-white" @click="putforward">提现</div>
    </div>

    <!-- <p class="loading" style="text-align:center;" v-show="showLoading">
      <inline-loading></inline-loading>
    </p> -->

  </div>
</template>

<script>
  import {XHeader, Group, Cell, TransferDom, Confirm, InlineLoading} from 'vux'
  import {mapState} from 'vuex';

  export default {
    directives: {
      TransferDom
    },
    name: "cash_index",
    components: {XHeader, Group, Cell, Confirm, InlineLoading},
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (!from.path.includes('bankchoice')) {
          vm.getDemandDetail()
        }else {

          vm.getCurrentBank()
        }
      })
    },
    computed: {
      demandId() {
        return this.$route.params.demandId
      },
      ...mapState(['aidederBankList']),
      ...mapState(['demandDetail'])
    },
    data() {
      return {
        showconfirm: false,
        iconList: {
          "中国银行": "static/appimg/bank-icon-zhongguo.png",
          "建设银行": "static/appimg/bank-icon-jianshe.png",
          "农业银行": "static/appimg/bank-icon-nongye.png",
          "工商银行": "static/appimg/bank-icon-gongshang.png",
          "招商银行": "static/appimg/bank-icon-zhaoshang.png",
        },
        index: '',
        bank: '',
        isUploading: false,
        showLoading: false,
        status: ''
      }
    },
    methods: {
      async getAidederBankList() {
        await this.$store.dispatch('getAidederBankList', {_this: this, aidedId: this.demandDetail.aideder_user_id})
        if (this.aidederBankList.length > 0) {
          this.getCurrentBank()
        }
      },
      getCurrentBank() {
        if(this.aidederBankList.length===0){
          return
        }

        if (this.$route.meta.checkedIndex>-1) {
          this.index = this.$route.meta.checkedIndex
        } else {
          this.index = this.aidederBankList.findIndex(item => item.is_default === 1)
          if (this.index === -1) {
            this.index = 0
          }
        }
        this.bank = this.aidederBankList[this.index]
      },
      async getDemandDetail() {
        await this.$store.dispatch('getDemandDetail', {_this: this, demandId: this.demandId})
        this.getAidederBankList()
        //判断当前需求状态是等待提现(demand_status == 4)还是提前提现也就是帮扶中(demand_status == 3 )
        if(this.demandDetail.demand_status == 4) {
            //如果为需求状态为4 需要区分是金额筹满还是需要超时关闭等待提现两种情况
            if(this.demandDetail.moneycount >= this.demandDetail.target_amount) {
                //筹满情况
                this.status = 1;
            }else if(this.demandDetail.moneycount < this.demandDetail.target_amount) {
                this.status = 2;
            }
        }else if(this.demandDetail.demand_status == 3){
            //提前提现状态
            this.status = 3;
        }
      },
      getCashIntroduce(){
      this.$router.push('/cash_introduction')
      },
      putforward() {
        if (!this.bank) {
          this.showToast('', 'text', '请选择银行卡')
          return
        }
        if (this.isUploading) {
          return
        }
        this.isUploading = true
    //    this.showLoading = true
        this.$http.post("hts/myDemand/withDraw", {
          id: this.demandDetail.id,
          bankId: this.bank.id,
          withdraw_condition: this.status

        })
          .then(res => {
            this.$router.push('/cashsuccess')
          }).catch(err => {
          this.isUploading = false
          this.showLoading = false
          if(err.msg)
          this.showToast('', 'text', err.msg)
   //     }).finally(() => {
        
        })
      },
    }
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

  /*group去掉边线*/

  .group-clearbd >>> .weui-cells {
    margin-top: 0
  }

  .group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }

  /*银行账户列表*/
  .bank-none-item {
    padding: 20px 15px
  }

  .bank-cur-item {
    padding: 15px
  }

  .bank-cur-item >>> .vux-cell-primary {
    padding: 0 10px
  }

  .bank-cur-item h1 {
    padding-bottom: 10px
  }

  .bank-cur-item h1 span {
    padding-left: 10px
  }

  /*底部按钮*/
  .btm-ope {
    padding: 10px 40px 30px 40px;
  }

  /*弹窗样式*/
  .vux-alert >>> .weui-dialog__btn_primary {
    color: #f90
  }

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

