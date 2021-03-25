<template>
  <div>
    <x-header :left-options="{backText: ''}">贫困户认证</x-header>
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
          :required="true"
          :is-type="checkName"
          :disabled="inputdisabled"
        ></x-input>
        <x-input
          class="f-16"
          title="身份证号"
          placeholder="请输入身份证号"
          type="text"
          v-model="idCard"
          :disabled="inputdisabled"
          :is-type="checkIDCard"
          :required="true"
          :min="15"
          :max="18"
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
    <!-- <p class="loading" style="text-align:center;" v-show="showLoading">
      <inline-loading></inline-loading>
      <span style="color: #999">认证中...</span>
    </p>-->
    <!-- <div class="lightBox" v-show="showPrompt"></div> -->
  </div>
</template>


<script>
import { XHeader, Group, Cell, XInput, InlineLoading } from "vux";
import { mapState, mapActions } from "vuex";
import * as types from "@/store/mutation-types.js";
import { checkNameStr, checkIDCardStr } from "@/util/validFun.js";

export default {
  name: "set_poorname",
  components: { XHeader, Group, Cell, XInput, InlineLoading },
  data() {
    return {
      noaudit: true,
      idCard: "",
      realname: "",
      namefail: true,
      idcardfail: true,
      inputdisabled: false,
      showLoading: false
      // showPrompt: false
    };
  },
  computed: {},
  watch:{
    idCard(val){
        this.$nextTick(() => {
          this.idCard = val.replace(/[^\a-\z\A-\Z0-9]/g,'')
       
        })
    }
  },
  
  created() {
    this.getRealInfo();
  },
  methods: {
    ...mapActions(["user"]),
    getUser() {
      this.$store.dispatch("getUser", { _this: this.$http });
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
          .post("uts/user/getUserCertification")
          .then(function(response) {
            self.realname = response.data.realname;
            self.idCard = response.data.idcard;
          })
          .catch(function(error) {
            if (error.msg)
              this.showToast("", "text", error.msg, "20em", "", "middle");
          });
      } else {
        this.noaudit = true;
        if (this.$store.state.user.is_certification == 1) {
          this.inputdisabled = true;
          this.$http
            .post("uts/ccbUser/getUserInfo")
            .then(res => {
              self.realname = res.data.realname;
              self.idCard = res.data.idcard;
            })
            .catch(function(error) {
              if (error.msg)
                this.showToast("", "text", error.msg, "20em", "", "middle");
            });
        }
      }
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
         async isPoor(){
     
            let user = {}
        user.mobile= this.$store.state.user.mobile
        user.realName = this.realname
        user.cardNo = this.idCard;
        let userstr = JSON.stringify(user);
        console.log( "https://www.zgshfp.com.cn/server/appUsers/checkJdlkUser?jsonStr="+userstr+"&marked=checkJdlkUser&inaccess_token="+this.G('token')+"&successCallback=_jsonpfsngcd6l2ye" )
      await this.$https
        .post(
          "https://www.zgshfp.com.cn/server/appUsers/checkJdlkUser?jsonStr="+userstr+"&marked=checkJdlkUser&inaccess_token="+this.G('token')+"&successCallback=_jsonpfsngcd6l2ye" 
        )
        .then(response => {
          console.log(JSON.stringify(response))
            this.showToast("", "text", "建档立卡认证成功", "20em", "", "middle");
            this.getUser();
            this.$router.go(-1)
        })
         
      },
    getData(obj = null) {
      let self = this;
      this.$http
        .post("hts/demand/realNameAuthentication", obj)
        .then(function(response) {
          // 建档立卡成功后变更user is_poor 属性
          self.$store.state.user.is_poor = 1;
          self.$store.state.user.is_certification = 1;
          // self.showLoading = false
          // self.showPrompt = false
          self.showToast("", "text", "建档立卡认证成功", "20em", "", "middle");
          //self.getUser();
          self.$router.push({ path: "/setting" });
        })
        .catch(function(error) {
          if (error.msg) {
            self.showToast("", "text", error.msg);
          }
        });
    },
    audit() {
      if (this.$store.state.user.is_certification == 1) {
        // let obj = {};
        // obj.state = 1;
        // obj.name = this.realname;
        // obj.idCard = this.idCard;
        this.isPoor();
      } else {
        if (this.namefail) {
          let msg = checkNameStr(this.realname, 2, 15, "真实姓名").msg;
          this.showToast("", "text", msg, "20em", "", "middle");
          return false;
        }
        if (this.idcardfail) {
          let msg = checkIDCardStr(this.idCard, "身份证号").msg;
          this.showToast("", "text", msg, "20em", "", "middle");
          return false;
        }
       this.isPoor();

        // this.showLoading = true
        // this.showPrompt = true
      }
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
.lightBox {
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
</style>
