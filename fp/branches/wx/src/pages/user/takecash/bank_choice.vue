<template>
  <div>
    <x-header :left-options="{backText: ''}">选择银行卡号</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <!--银行账户列表-->
      <div class="bank-list">
        <group class="group-clearbd">
          <radio :options="bankList" class="bank-list-item" @on-change="change" v-model="defaultIndex">
            <div slot-scope="props" slot="each-item">
              <cell>
                <img class="v-middle" slot="icon" width="45">
                 <!-- :src="iconList[props.label.bank_name]" -->
                <h1 slot="title" class="f-16 color-333 f-normal">{{props.label.payee}}
                  <span class="f-14 color-999">{{props.label.bank_name}}</span>
                  <span class="f-12 color-blue"><i class="iconfont icon-f-v f-14  bg-ffffff"></i> 银联认证</span>
                </h1>
                <p slot="inline-desc" class="color-333 f-14">{{props.label.bank_account}}</p>
              </cell>
            </div>
          </radio>
        </group>
      </div>
      <!--底部按钮-->
      <div class="btm-ope">
        <router-link to="/bankaddhand"
                     class="btn-orange-lg dis-block text-center color-white">
          添加新账号
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, Radio, CheckIcon, Badge} from 'vux'
  import {mapState} from 'vuex';

  export default {
    name: "bank_choice",
    components: {XHeader, Group, Cell, Radio, CheckIcon, Badge},
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(typeof from.meta.checkedIndex==="number"){
          vm.defaultIndex=from.meta.checkedIndex
          return
        }
        let index = vm.aidederBankList.findIndex(item => item.is_default === 1)
        if (index === -1) {
          vm.defaultIndex = 0
        }else{
          vm.defaultIndex = index
        }
      })
    },
    beforeRouteLeave(to, from, next) {
      if (this.checkedIndex !== -1) {
        to.meta.checkedIndex = this.checkedIndex
      }
      next()
    },
    created() {
      this.getBankList()
    },
    computed: {
      ...mapState(['demandDetail']),
      ...mapState(['aidederBankList']),
    },
    data() {
      return {
        bankList: [],
        iconList: {
          "中国银行": "static/appimg/bank-icon-zhongguo.png",
          "建设银行": "static/appimg/bank-icon-jianshe.png",
          "农业银行": "static/appimg/bank-icon-nongye.png",
          "工商银行": "static/appimg/bank-icon-gongshang.png",
          "招商银行": "static/appimg/bank-icon-zhaoshang.png",
        },
        checkedIndex:-1,
        defaultIndex:'',
        defaultIndexChangeTime: 0,
      }
    },
    methods: {
      getBankList() {
        for (let i = 0; i < this.aidederBankList.length; i++) {
          let curBank = this.aidederBankList[i]
          let obj = {}
          obj.key = i;
          obj.value = curBank
          this.bankList.push(obj)
        }
      },
      change(value, label) {
        if(this.defaultIndexChangeTime++ === 0){
          return;
        }
        this.checkedIndex=value
        this.$router.go(-1)
      },

    }
  }
</script>

<style scoped>
  /*group去掉边线*/

  .group-clearbd >>> .weui-cells {
    margin-top: 0;
    background: transparent;
  }

  .group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }

  /*银行账号列表*/
  .bank-list >>> .weui-cell_radio {
    background: #fff;
    margin-top: 12px;
    padding: 15px;
  }

  .bank-list >>> .weui-cell_radio .weui-cell {
    padding: 0
  }

  .bank-list >>> .weui-cell:before {
    border-width: 0
  }

  .bank-list-item >>> .vux-cell-primary {
    padding: 0 0px 0 10px
  }

  .bank-list-item h1 {
    padding-bottom: 10px
  }

  .bank-list-item h1 span {
    padding-left: 4px
  }

  /*单选按钮*/
  .weui-cells_radio >>> .weui-check + .weui-icon-checked {
    font-size: 23px;
    color: #ccc
  }

  .weui-cells_radio >>> .weui-check + .weui-icon-checked:before {
    content: "\EA01";
    margin-right: 0;
  }

  .weui-cells_radio >>> .weui-check:checked + .weui-icon-checked:before {
    content: "\EA06";
    font-size: 23px;
    color: #fd8b2a;
    margin-right: 0;
  }

  /*选中状态*/
  .vux-check-icon >>> .weui-icon-success:before, .vux-check-icon >>> .weui-icon-success-circle:before {
    color: #fd8b2a
  }

  /*底部按钮*/
  .btm-ope {
    padding: 10px 40px 30px 40px;
    margin-top: 40px;
  }
</style>
