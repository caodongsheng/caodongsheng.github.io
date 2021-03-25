<template>
  <div>
    <x-header :left-options="{backText: ''}">银行信息管理<a slot="right" class="color-orange f-16" @click="savebankinfo">保存</a></x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd mt-12" label-width="7.5em">
        <x-input title="银行名称" placeholder="请输入银行名称" v-model="bank_name"></x-input>
      </group>
      <group>
        <x-input title="开户行名称" placeholder="请输入开户行名称" v-model="open_bank" ></x-input>
      </group>
      <group>
        <x-input title="收款人" placeholder="请输入收款人姓名" v-model="getPayee" readonly></x-input>
      </group>
      <group>
        <x-input title="银行账号" placeholder="请输入银行卡号" v-model="bank_account"  keyboard="number" :required="true" :is-type="checkAccount"></x-input>
      </group>
      <group class="group-clearbd defaultvalue mt-12 bg-ffffff">
        <x-switch title="是否设置为默认" v-model="is_default"></x-switch>
      </group>
      <group>
        <div>
          <alert v-model="show2" :title="Congratulations"></alert>
        </div>
      </group>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, XInput,Cell,CheckIcon,XSwitch,Alert } from 'vux'
  import {checkAccountStr} from '@/util/validFun.js';

  export default {
    name: "aided_bank",
    components: {XHeader, Group, XInput,Cell,CheckIcon,XSwitch,Alert },
    data() {
      return {
        id:"",
        userId:"",
        bank_name:"",
        open_bank:'',
        payee:"",
        bank_account:"",
        link_tel:"",
        is_default:false,
        show2:false,
        accountfail:true,
        Congratulations:''
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
     
      async getAidedPersonDetail(){
        await this.$store.dispatch("getAidedPersonDetail",this)
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
      _luhnCheck(bankno){
        if(bankno === "") {
          this.show2 = true
          this.Congratulations = '请填写银行卡号'
          return false;
        }
        if(bankno.length < 16 || bankno.length > 19) {
          this.show2 = true
          this.Congratulations = '银行卡号长度必须在16到19之间'
          return false;
        }
        let num = /^\d*$/;//全数字
        if(!num.exec(bankno)) {
          this.show2 = true
          this.Congratulations = '银行卡号必须全为数字'
          return false;
        }
        let strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if(strBin.indexOf(bankno.substring(0, 2)) === -1) {
          this.show2 = true
          this.Congratulations = '银行卡号开头6位不符合规范'
          return false;
        }
        return true
        // if(this.checkBna(bankno)){
        //   return false;
        // }
      },
      checkBna(bankno){
        let lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
        let first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
        let newArr = new Array();
        for (let i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
          newArr.push(first15Num.substr(i, 1));
        }
        let arrJiShu = new Array(); //奇数位*2的积 <9
        let arrJiShu2 = new Array(); //奇数位*2的积 >9
        let arrOuShu = new Array(); //偶数位数组
        for (let j = 0; j < newArr.length; j++) {
          if ((j + 1) % 2 === 1) { //奇数位
            if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
            else arrJiShu2.push(parseInt(newArr[j]) * 2);
          } else //偶数位
            arrOuShu.push(newArr[j]);
        }

        let jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
        let jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
        for (let h = 0; h < arrJiShu2.length; h++) {
          jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
          jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }

        let sumJiShu = 0; //奇数位*2 < 9 的数组之和
        let sumOuShu = 0; //偶数位数组之和
        let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        let sumTotal = 0;
        for (let m = 0; m < arrJiShu.length; m++) {
          sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }

        for (let n = 0; n < arrOuShu.length; n++) {
          sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }

        for (let p = 0; p < jishu_child1.length; p++) {
          sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
          sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

        //计算luhn值
        let k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10;
        let luhn = 10 - k;

        if (lastNum === luhn) {
          this.show2 = true
          this.Congratulations = '银行卡号格式校验通过'
          return true;
        } else {
          this.show2 = true
          this.Congratulations = "银行卡号必须符合格式校验"
          return false;
        }
      },
      savebankinfo() {
        if(this.accountfail){
          let msg = checkAccountStr(this.bank_account,"银行账号").msg;
           this.showToast('','text',msg,'20em','middle');
          return false
        }else{
          let self = this;
          let obj = {};
          obj.userId = this.userId;
          obj.bankName = this.bank_name;
          obj.openBank = this.open_bank;
          obj.payee = this.payee;
          obj.bankAccount = this.bank_account;
          obj.isDefault = this.is_default===true?1:0;
          if (this.type === "add") {
            this.$http.post('hts/poor/bankSave', obj)
              .then(function (response) {
                if (response.data === "SUCCESS") {
                  self.showToast('','text','保存成功','20em','top');
                  self.$router.push("/aideddetail/" + obj.userId)
                } else {
                  self.showToast('','text',response.msg,'20em','top');
                }
              }).
              catch(err => {
                if(err.msg)
                  this.showToast('','text',err.msg,'20em','top');
              })

              
          } else {
            obj.id = this.id
            this.$http.post('hts/poor/bankEdit', obj).then((response) => {
              if (response.data === "SUCCESS") {
                this.showToast('','text','修改成功','20em','top');
                self.$router.push("/aideddetail/" + obj.userId)
              } else {
                this.showToast('','text',response.msg,'20em','top');
              }
            }).catch(function (error) {
               if(error.msg)
                  self.showToast('','text',error.msg,'20em','top');
            })
          }
        }
      }
    },
    created(){
      this.getAidedPersonDetail();
      let userinfo = this.$store.state.aidedpersondetail;
      this.userId = userinfo.id;

    },
    computed:{
         aidedpersondetail:function(){
      return this.$store.state.aidedpersondetail;
    },
      getPayee(){
         let bankdetail = this.$store.state.bankdetail;
          let userinfo = this.aidedpersondetail;
      if( this.type=="change"){
        this.payee = bankdetail.payee
         return bankdetail.payee;
      }
      else{
         this.payee = userinfo.aided_person_name
         return userinfo.aided_person_name;
      }

      }
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
        this.accountfail = false;
       // this.payee = bankdetail.payee;
        this.is_default = bankdetail.is_default===1?true:false;
      }
      else{
        this.type = "add";
        // this.payee = this.$store.state.aidedpersondetail.aided_person_name;
      }
    },
  }
</script>

<style scoped>
  /*group header右侧操作*/
  .group-clearbd >>> .weui-cells {
    margin-top: 0 !important;
    font-size: 15px;

  }

  .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }

  .group-clearbd >>> .weui-cells:before {
    border: 0 none
  }

  /*cell部分*/
  .weui-cell {
    padding: 14px 15px;
    font-size: 15px
  }

  .weui-cell:before {
    right: 15px
  }

  .weui-cell >>> .weui-cell__ft {
    font-size: 14px;
    padding-right: 0
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

</style>
