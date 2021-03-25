<template>
  <div>
    <x-header :left-options="{backText: ''}">实名认证</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group
        class="group-clearbd bg-ffffff"
        label-width="6em"
        label-margin-right="2em"
        label-align="left"
      >
        <x-input
          class="f-16"
          title="真实姓名"
          placeholder="请输入真实姓名"
          type="text"
          v-model="realname"
          :disabled="inputdisabled"
          :required="true"
          :is-type="checkName"
        ></x-input>
        <x-input
          class="f-16"
          title="身份证号"
          placeholder="请输入身份证号"
          type="text"
          v-model="idCard"
          :is-type="checkIDCard"  :required="true"
          :disabled="inputdisabled"
          :min="15" :max="18"
         >
        ></x-input>
      </group>
    </div>
    <div class="fix-bottom btm-logout bg-ffffff">
      <template v-if="noaudit">
        <router-link
          to
          @click.native="audit()"
          class="btn-opearea btn-orange-lg dis-block text-center color-white"
        >认证</router-link>
      </template>
      <template v-else></template>
    </div>
  </div>
</template>


<script>
import { XHeader, Group, Cell, XInput } from "vux";
import { mapState, mapActions } from "vuex";
import * as types from "@/store/mutation-types.js";
import { checkNameStr,checkIDCardStr } from "@/util/validFun.js";

export default {
  name: "set_realname",
  components: { XHeader, Group, Cell, XInput },
  data() {
    return {
      idcardfail:true,
      namefail:true,
      noaudit: true,
      idCard: "",
      realname: "",
      inputdisabled: false,
      frompath: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path.indexOf("loveNeed") < 0) {
        vm.frompath = "/publish";
        console.log(vm.frompath);
      } else {
        vm.frompath = from.path;
      }
    });
  },
   watch:{
    idCard(val){
        this.$nextTick(() => {
          this.idCard = val.replace(/[^\a-\z\A-\Z0-9]/g,'')
       
        })
    }
  },
  
  computed: {},
  created() {
    this.getRealInfo();
  },
  methods: {
    ...mapActions(["user"]),
    getUser() {
      this.$store.dispatch("getUser", this);
    },
  checkName(value) {
      let validobj = checkNameStr(value, 2, 15, "真实姓名");
      if (!validobj.valid) {
        this.namefail = true;
      } else {
        this.namefail = false;
      }
      return validobj;
    },
    checkIDCard(value) {
      let validobj = checkIDCardStr(value, "身份证号");
      if (!validobj.valid) {
        this.idcardfail = true;
      } else {
        this.idcardfail = false;
      }
      return validobj;
    },
    getRealInfo() {
      let self = this;
      let isauth = this.$route.params.isauth;
      if (isauth == 1) {
        this.noaudit = false;
        this.inputdisabled = true;
        this.$http
          .post("uts/user/getUserCertification ")
          .then(function(response) {
            self.realname = response.data.realname;
            self.idCard = response.data.idcard;
          })
          .catch(function(error) {
            if (error.msg)
              self.showToast("", "text", error.msg, "20em", "", "middle");
          });
      } else {
        this.noaudit = true;
      }
    },
    audit() {
       if(this.namefail){
         let msg = checkNameStr(this.realname, 2, 15, "真实姓名").msg;
         this.showToast("", "text", msg, "20em", "", "middle");
        return false;
       }
       if(this.idcardfail){
         let msg = checkIDCardStr(this.idCard, "身份证号").msg;
         this.showToast("", "text", msg, "20em", "", "middle");
       return false;
       }
      let obj = {};
      obj.name = this.realname;
      obj.idCard = this.idCard;
      obj.state = 2;
      this.$http
        .post("hts/demand/realNameAuthentication", obj)
        .then(res => {
          // 实名认证成功后变更user is_certification 属性
          this.$store.state.user.is_certification = 1;
          console.log(this.$store.state.user.is_certification);
          // this.getUser();
          this.showToast("", "text", "实名认证成功", "20em", "", "middle");
          this.$router.replace(this.frompath);
        })
        .catch(err => {
          if (err.msg) {
            this.showToast("", "text", err.msg, "20em", "", "middle");
          }
        });
    }
  }
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

.weui-cell,
.vux-cell-box >>> .weui-cell {
  padding: 14px 15px;
}

.weui-cell:before {
  left: 0;
}
.weui-cell >>> input {
  color: #999;
  font-size: 15px;
}

/*底部按钮*/
.btn-opearea {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 !important;
  height: 53px !important;
  line-height: 53px !important;
  box-shadow: none;
}
</style>
