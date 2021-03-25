<template>
  <div class="box">
    <x-header :left-options="{backText: ''}">添加银行账号</x-header>
    <div class="box-withheader over-auto bg-f6f5f6 posr">
      <group class="group-clearbd bg-ffffff" label-width="4em" label-margin-right="2em" label-align="left">
        <!-- <x-address class="f-16" title="开户地区" v-model="value" :list="addressData" placeholder="请选择开户行所在地区"
                   :show.sync="showAddress" value-text-align="left"></x-address> -->
        <x-input class="f-16" title="银行名称" :required="true" v-model="bankName" placeholder="银行全称（例：中国工商银行）" type="text" ></x-input>
        <x-input class="f-16" title="开户行" :required="true" v-model="openingBank" placeholder="详细开户行名称（例：马巷分行）" type="text" ></x-input>
        <x-input class="f-16" title="收款人" placeholder="" type="text" v-model="demandDetail.aideder_name"
                 disabled></x-input>
        <x-input class="f-16" title="收款卡号" :required="true" v-model="payeeKard" placeholder="请输入收款银行卡号"   keyboard="number" :is-type="checkAccount"  ></x-input>
      </group>
      <!--说明信息-->
      <div class="tipmsg f-14 color-orange">
        <i class="fa fa-exclamation-circle f-16" style="padding-top: 2px"></i>
        <div class="text">
          <p>1.开户行，请如实填写详细开户行名称，如：马巷分行、龙堂支行</p>
          <p>2.收款卡号，请务必确保所填的收款银行卡号是收款人所属，否则可能无法拨款成功</p>
        </div>
      </div>
      <!--底部按钮-->
      <div class="btm-ope fix-bottom nopo">
        <div class="btn-orange-lg dis-block text-center color-white" @click="verify">
          进行银联校验
        </div>
      </div>
    </div>
    <!-- <p class="loading" style="text-align:center;" v-show="showLoading">
      <inline-loading></inline-loading>
    </p> -->
  </div>
</template>

<script>
  import {XHeader, Group, Cell, XInput, XAddress, ChinaAddressV4Data, InlineLoading} from 'vux'
  import {mapState} from 'vuex';
  import {checkAccountStr} from '@/util/validFun.js';

  export default {
    name: "bank_add_hand",
    components: {XHeader, Group, Cell, XInput, XAddress, InlineLoading},
    data() {
      return {
        showAddress: false,
        addressData: ChinaAddressV4Data,
        value: [],
        bankName: '',    //银行名称
        openingBank: '',     //开户行
        payeeKard: '',      //收款卡号,
        isUploading: false,
        accountfail:true,
        showLoading: false
      }
    },
    computed: {
      ...mapState(['demandDetail'])
    },
       watch:{
     bankName(val){
        this.$nextTick(() => {
           this.bankName = val.replace(/[^\u4E00-\u9FA5]/g, "");
             })
     },
      openingBank(val){
        this.$nextTick(() => {
           this.openingBank = val.replace(/[^\u4E00-\u9FA5]/g, "");
             })
     },
     payeeKard(val){
      
       this.$nextTick(() => {
           this.payeeKard = val.replace(/[^0-9]/g, "");
             })
     }
    },
    methods: {
       checkAccount(value){
       let validobj = checkAccountStr(value,"收款卡号");
      if (!validobj.valid) {
        this.accountfail = true;
      } else {
        this.accountfail = false;
      }
      return validobj;
      },
      verify() {
        if (this.isUploading) {
          return
        }
        if (this.bankName == '') {
          this.showToast('', 'text', '请填写银行名称');
        } else if (this.openingBank == '') {
          this.showToast('', 'text', '请填写开户行');
        } else if (this.accountfail) {
          let msg = checkAccountStr(this.payeeKard,"收款卡号").msg;
           this.showToast('','text',msg,'20em','niddle');
          return 
        } else {
          this.isUploading = true
       //   this.showLoading = true
          this.$http.post("hts/poor/bankSave", {
            userId: this.demandDetail.aideder_user_id,
            payee: this.demandDetail.aideder_name,
            bankName: this.bankName,
            openBank: this.openingBank,
            bankAccount: this.payeeKard
          })
            .then(res => {
              this.showToast('', 'text', '添加銀行卡成功')
              this.$store.dispatch('getAidederBankList', {_this: this, aidedId: this.demandDetail.aideder_user_id}).then(res=>{
                //this.$router.push({name: 'cashindex', params: {demandId: this.demandDetail.id}})
                this.$router.go(-1)
              }).catch(err=>{

              // }).finally(() => {
                this.isUploading = false
                this.showLoading = false
              })
            }).catch(err => {
            this.isUploading = false
            this.showLoading = false
            if(err.msg)
            this.showToast('', 'text', err.msg);
        //  }).finally(() => {
          
          })
        }
      }
    }

  }
</script>

<style scoped>
  /*group去掉边线*/
  .nopo{
      position:static;
  }
  .group-clearbd >>> .weui-cells {
    margin-top: 0;
    background: transparent;
  }

  .group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }

  .group-clearbd >>> .weui-cells {
    margin-top: 12px
  }

  .weui-cell, .vux-cell-box >>> .weui-cell {
    padding: 14px 15px
  }

  .weui-cell:before {
    left: 0
  }

  .vux-cell-box >>> .weui-cell_access .weui-cell__ft:after {
    margin-top: -3px
  }

  /*底部提示信息*/

  .tipmsg {
    padding: 15px;
    display: flex
  }

  .tipmsg .text {
    flex: 1;
    padding-left: 8px
  }

  .tipmsg .text p {
    margin-bottom: 6px
  }

  /*底部按钮*/
  .btm-ope {
    padding: 10px 40px 30px 40px;
  }

  .loading {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .loading .weui-loading {
    width: 50px;
    height: 50px;
  }
</style>
