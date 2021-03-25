<template>
  <div>
    <x-header :left-options="{backText: ''}">添加银行账号</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group
        class="group-clearbd bg-ffffff"
        label-width="4em"
        label-margin-right="2em"
        label-align="left"
      >
        <cell class="f-16" title="收款人" :value="demandDetail.aideder_name" value-align="left">
          <i
            slot="child"
            class="iconfont icon-f-info color-orange f-22 infolink"
            @click="showconfirm=true"
          ></i>
        </cell>
        <x-input
          v-model.trim="bankAccount"
          class="f-16"
          title="银行卡号"
          placeholder="请填写收款人银行卡号"
         
          keyboard="number"
          :is-type="checkAccount"
       
        ></x-input>
      </group>

      <!--底部按钮-->
      <div class="btm-ope fix-bottom">
        <router-link
          to
          class="btn-orange-lg dis-block text-center color-white"
          @click.native="verify"
        >进行银联校验</router-link>
      </div>
    </div>

    <!--感叹号说明信息弹窗-->
    <div v-transfer-dom>
      <alert v-model="showconfirm" title="提示" button-text="我知道了">
        <p class="f-14 text-left" style="line-height:30px">
          为了账户资金安全，仅支持受助人的实名账户认证通过的银行卡提现。
          <br>
          姓名：{{demandDetail.aideder_name}}
          <br>
          身份证号：{{demandDetail.aideder_idcard}}
        </p>
      </alert>
    </div>

    <!--验证失败提示重选或者手动添加账号弹窗-->
    <div v-transfer-dom>
      <confirm
        v-model="showconfirm2"
        title="提示"
        confirm-text="修改卡号"
        cancel-text="不校验，手动填写"
        @on-confirm
        @on-cancel="toaddnew"
      >
        <p
          class="f-14 text-center"
          style="line-height: 24px;margin: 15px 0"
        >此银行卡尚未通过银联校验，平台仅支持通过银联校验的储蓄卡提现</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, Cell, XInput, Confirm, TransferDom, Alert } from "vux";
import { mapState } from "vuex";
import { checkAccountStr } from "@/util/validFun.js";

export default {
  directives: {
    TransferDom
  },
  name: "bank_add",
  components: { XHeader, Group, Cell, XInput, Confirm, Alert },
  computed: {
    ...mapState(["demandDetail"])
  },
  data() {
    return {
      showconfirm: false,
      showconfirm2: false,
      accountfail: true,
      bankAccount: ""
    };
  },
  watch:{
       bankAccount(val){
      
       this.$nextTick(() => {
           this.bankAccount = val.replace(/[^0-9]/g, "");
             })
     }
  },
  methods: {
    checkAccount(value) {
      let validobj = checkAccountStr(value, "银行卡号");
      if (!validobj.valid) {
        this.accountfail = true;
      } else {
        this.accountfail = false;
      }
      return validobj;
    },
    verify() {
      let validobj = checkAccountStr(this.bankAccount, "银行卡号");
      if (validobj.valid) {
      } else {
        this.showconfirm2 = true;
      }
    },
    toaddnew: function() {
      this.$router.push("/bankaddhand");
    }
  },
  created() {}
};
</script>

<style scoped>
/*group去掉边线*/

.group-clearbd >>> .weui-cells {
  margin-top: 0;
  background: transparent;
}

.group-clearbd >>> .weui-cells:before,
.group-clearbd >>> .weui-cells:after {
  border: 0 none;
}

.group-clearbd >>> .weui-cells {
  margin-top: 12px;
}

.weui-cell {
  padding: 14px 15px;
}

.weui-cell:before {
  left: 0;
}

/*右侧信息图标链接*/
.infolink {
  position: absolute;
  right: 0;
  padding: 0 15px;
}

/*底部按钮*/
.btm-ope {
  padding: 10px 40px 30px 40px;
}

/*弹窗样式*/
.vux-alert >>> .weui-dialog__btn_primary {
  color: #f90;
}

.vux-confirm >>> .weui-dialog__btn_primary {
  color: #fff;
  background: #f37306;
}

.vux-confirm >>> .weui-dialog__ft {
  font-size: 16px;
}

.vux-confirm >>> .weui-dialog__bd {
  font-size: 16px;
}
</style>
