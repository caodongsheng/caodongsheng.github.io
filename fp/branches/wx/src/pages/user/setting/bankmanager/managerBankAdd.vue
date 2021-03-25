<template>
  <div>
    <x-header :left-options="{backText: ''}">银行账号<a slot="right" class="color-orange f-16" @click="savebankinfo">保存</a></x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd mt-12 bg-ffffff" label-width="7.5em">
        <x-input title="银行名称" placeholder="请输入银行名称" v-model="bank_name" :required="true" ></x-input>
        <x-input title="开户行" placeholder="请输入开户行名称" v-model="open_bank"  :required="true" ></x-input>
        <x-input title="收款人" placeholder="请输入收款人姓名" v-model="payee" :is-type="checkName" :required="true" :min="2" :max="15"></x-input>
        <x-input title="银行账号" placeholder="请输入银行卡号" v-model="bank_account"  keyboard="number" :required="true" :is-type="checkAccount"  ></x-input>
      </group>
      <group class="group-clearbd defaultvalue mt-12 bg-ffffff">
        <x-switch title="是否设置为默认" v-model="is_default"></x-switch>
      </group>
      <!--说明信息-->
      <div class="tipmsg f-14 color-orange">
        <i class="fa fa-exclamation-circle f-16" style="padding-top: 3px"></i>
        <div class="text">
          <p class="text-justify">如果您不知道开户行名称，请致电银行客服获取信息，开户行名称填写错误，可能造成您无法收到捐赠款项。</p>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
  import {XHeader, Group, XInput,Cell,XSwitch } from 'vux'
  import {checkAccountStr,checkNameStr} from '@/util/validFun.js';

  export default {
    components: {XHeader, Group, XInput,Cell,XSwitch },
    name: "managerBankAdd",
    data() {
      return {
        id:"",
        bank_name:"",
        open_bank:'',
        payee:"",
        bank_account:"",
        link_tel:"",
        namefail:true,
        accountfail:true,
        is_default:false
      }
    },
       watch:{
     bank_name(val){
        this.$nextTick(() => {
           this.bank_name = val.replace(/[^\u4E00-\u9FA5]/g, "");
             })
     },
      open_bank(val){
        this.$nextTick(() => {
           this.open_bank = val.replace(/[^\u4E00-\u9FA5]/g, "");
             })
     },
     bank_account(val){
      
       this.$nextTick(() => {
           this.bank_account = val.replace(/[^0-9]/g, "");
             })
     }
    },
    methods:{
       checkName(value) {
          let validobj = checkNameStr(value,2,15,"收款人姓名")
        if(!validobj.valid){
            this.namefail = true
         
            
        }
        else{
           this.namefail = false
          
        }
        return validobj
      },
       checkAccount(value){
       let validobj = checkAccountStr(value,"银行账号");
      if (!validobj.valid) {
        this.accountfail = true;
      } else {
        this.accountfail = false;
      }
      return validobj;
      },
      savebankinfo() {
        let self = this;
        let obj = {};
        obj.bankName = this.bank_name;
        obj.openBank = this.open_bank;
        obj.payee = this.payee;
        obj.bankAccount = this.bank_account;
        obj.isDefault = this.is_default==true?1:0;
        if(this.namefail){
           let msg = checkNameStr(this.payee,2,15,"收款人姓名").msg;
           this.showToast('','text',msg,'20em','middle');
        return false;
        }
        if(this.accountfail){
           let msg = checkAccountStr(this.bank_account,"银行账号").msg;
           this.showToast('','text',msg,'20em','middle');
           return false;
        }
        if (this.type == "add") {
          this.$http.post('uts/user/bankSave', obj)
            .then(function (response) {
              if (response.data == "SUCCESS") {
                //alert("保存成功")
                self.showToast('','text','保存成功','20em','top');
                self.$router.push("/aideddetail/" + self.id)
              }
              else {
                //alert(response.msg)
                self.showToast('','text',response.msg,'20em','top');
              }
            })
        }
        else {
          obj.id = this.id
          this.$http.post('uts/user/bankEdit', obj)
            .then(function (response) {
              if (response.data == "SUCCESS") {
                //alert("修改成功")
                self.showToast('','text','修改成功','20em','top');
                self.$router.push("/aideddetail/" + self.id)
              }
              else {
                //alert(response.msg)
                self.showToast('','text',response.msg,'20em','top');
              }
            })
        }
      }
    },

    created(){


    },
    mounted(){
      let bankdetail = this.$store.state.bankdetail;

      if(bankdetail!=null){
        this.type = "change"
        this.id = bankdetail.id;
        this.bank_name = bankdetail.bank_name;
        this.open_bank = bankdetail.open_bank;
        this.link_tel = bankdetail.link_tel;
        this.bank_account = bankdetail.bank_account;
        this.payee = bankdetail.payee;
        this.is_default = bankdetail.is_default==1?true:false;
        this.namefail = false;
        this.accountfail = false;
      }
      else{
        this.type = "add"
      }
    },
  }
</script>

<style scoped>
  /*group去掉边线*/
  .group-clearbd >>> .weui-cells {
    margin-top: 0 !important;
    font-size: 15px;

  }
  .group-clearbd >>> .weui-cells {
    margin-top: 0;
    background: transparent;
  }

  .group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }
  .weui-cell{padding: 14px 15px}
  .weui-cell:before{right:15px}
  .weui-cell >>> .weui-cell__ft {
    font-size: 14px;
    padding-right: 0
  }

  .weui-cell >>> input {
    font-size: 14px;
    color: #999
  }

  .weui-cell.vux-tap-active >>> .weui-cell__ft {
    padding-right: 18px
  }

  .vux-cell-box >>> .weui-cell {
    padding: 14px 15px;
    font-size: 15px
  }

  .vux-cell-box >>> .weui-cell:before {
    right: 15px
  }

  .vux-cell-box >>> .weui-cell .weui-cell__ft {
    padding-right: 0
  }

  .vux-cell-box >>> .weui-cell.vux-tap-active .weui-cell__ft {
    padding-right: 18px
  }

  .vux-cell-box >>> .weui-cell .vux-cell-value {
    font-size: 14px
  }

.defaultvalue{
  position: relative;padding: 4px 0}

  /*底部提示信息*/

  .tipmsg{
    padding: 15px;
    display: flex;
    position: relative;
  }

  .tipmsg  .text{
    flex: 1;
    padding-left: 8px}
  .tipmsg  .text p{margin-bottom:6px}

</style>
