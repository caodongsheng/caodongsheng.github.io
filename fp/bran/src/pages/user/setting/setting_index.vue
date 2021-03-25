<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="goback">个人信息</x-header>
    <div class="box-withbar over-auto bg-f6f5f6" :style="{bottom:bottomHeight}">
      <!--操作列表start-->
      <div class="opelist mb-12">
        <group class="mt-12 bg-ffffff">
          <upload-icon ref="uploadicon"></upload-icon>
          <!-- <cell title="用户名" is-link :link="getusername(usersetting.login_name)">
            <span class="color-999">{{usersetting.login_name}}</span>
          </cell>-->
          <!-- <cell title="用户名">
            <span class="color-999">{{usersetting.login_name}}</span>
          </cell> -->
          <cell
            title="第三方账号"
            is-link
            link="setthirdaccounts"
            v-if="(isBind !== '' || isBind !==null)"
          ></cell>
          <cell title="昵称" is-link :link="getnickname(usersetting.nick_name)">
            <span class="color-999">{{usersetting.nick_name}}</span>
          </cell>
        </group>
        <group class="mt-12 bg-ffffff">
          <!-- <cell title="实名认证" is-link :link="gotorealname(usersetting.is_certification)"> -->
          <!-- <cell title="实名认证" is-link @click.native="gotorealname(usersetting.is_certification)">
            <span class="color-999">{{usersetting.is_certification===1?"已认证" : "未认证"}}</span>
          </cell>-->
          <!-- <cell title="贫困户认证" is-link :link="getpoorname(usersetting.is_poor)"> -->
          <cell title="贫困户认证" is-link @click.native="getpoorname(usersetting.is_poor)">
            <span class="color-999">{{usersetting.is_poor===1? "已认证" : "未认证"}}</span>
          </cell>
          <cell title="已绑定手机" v-if="apimobile">
            <span class="color-999">{{usersetting.mobile}}</span>
          </cell>
          <cell v-else :title="mob" is-link :link="bindtelphonepath(usersetting.mobile)">
            <span
              class="color-999 label-value f-14"
            >{{usersetting.mobile===""?"未绑定":usersetting.mobile}}</span>
          </cell>
        </group>
        <group class="mt-12 bg-ffffff">
          <cell title="爱心关注" is-link link="setlovefollow"></cell>
          <datetime
            v-model="birthday"
            title="出生年月"
            :readonly="!iscu"
            :start-date="startDate"
            :end-date="endDate"
            format="YYYY-MM-DD"
            @on-confirm="onConfirmBirthday"
          ></datetime>
          <popup-picker
            title="性别"
            :data="sexlist"
            :columns="1"
            v-model="sex"
            :disabled="!iscu"
            @on-change="onChange"
            show-name
          ></popup-picker>
          <cell title="修改密码" is-link @click.native="gotopassword()"></cell>
        </group>
        <group v-if="isApp" class="mt-12 bg-ffffff">
          <cell title="系统设置" is-link link="setsystem"></cell>
        </group>
      </div>
    </div>
    <!--未绑定手机号提示弹窗-->
    <div v-transfer-dom>
      <confirm
        v-model="showconfirm"
        title
        confirm-text="去绑定"
        cancel-text="取消"
        @on-confirm="onConfirm()"
        @on-cancel
        :content="cont"
      ></confirm>
    </div>
    <div v-transfer-dom>
      <confirm
        v-model="showpassconfirm"
        title
        confirm-text="去设置"
        cancel-text="取消"
        @on-confirm="onPassConfirm()"
        @on-cancel
        :content="cont"
      >当前用户没有密码，需要先设置密码</confirm>
    </div>
    <!--底部注销按钮-->
    <div class="fix-bottom btm-logout bg-ffffff" v-if="!this.isWeixinCient()">
      <router-link
        to
        @click.native="closeLogin()"
        class="f-16 dis-block text-center color-orange"
        style="height:53px;line-height:53px"
      >退出登录</router-link>
    </div>
    <actionsheet v-model="showmenu" :menus="menus1" show-cancel></actionsheet>
  </div>
</template>

<script>
import {
  XHeader,
  XButton,
  Group,
  Cell,
  Badge,
  Datetime,
  PopupPicker,
  Actionsheet,
  TransferDom,
  Confirm
} from "vux";
import { mapActions, mapState } from "vuex";
import UploadIcon from "./uploadicon/UploadIcon";
export default {
  directives: { TransferDom },
  name: "setting_index",
  components: {
    UploadIcon,
    XHeader,
    XButton,
    Group,
    Cell,
    Badge,
    Datetime,
    PopupPicker,
    Actionsheet,
    UploadIcon,
    Confirm
  },
  data() {
    return {
      readonly: "",
      id: "",
      birthday: "",
      sex: [],
      sexlist: [
        { name: "男", value: "1" },
        { name: "女", value: "0" },
        { name: "", value: "2" }
      ],
      showmenu: false,
      cont: "您还未绑定手机号,请绑定后再进行认证！",
      showconfirm: false,
      showpassconfirm: false,
      isBind: "",
      menus1: {
        album: "从相册选择",
        camera: "拍照"
      },
      startDate: "1900-01-01"
    };
  },
  created() {
    this.getUserSetting();
  },
  computed: {
    ...mapState(["user"]),
    isApp() {
      if (window.api) {
        return true;
      } else {
        return false;
      }
    },
    apimobile(){
        if(window.api&&this.usersetting.mobile) return true;
        return false;
    },
    mob() {
      if (this.usersetting.mobile) {
        return "已绑定手机";
      } else {
        return "绑定手机";
      }
    },
    iscu() {
      if (this.user.is_certification === 1) {
        return false;
      } else {
        return true;
      }
    },
    bottomHeight() {
      if (this.isWeixinCient()) {
        return "0px";
      } else {
        return "53px";
      }
    },
    usersetting: function() {
      let gender = this.$store.state.usersetting.gender;
      if (gender == 1) {
        this.sex = ["1"];
      } else if (gender == 0) {
        this.sex = ["0"];
      } else {
        this.sex = ["2"];
      }
      this.birthday = this.$store.state.usersetting.birthday;
      this.id = this.$store.state.usersetting.id;
      return this.$store.state.usersetting;
    },
    // 生日可选结束时间
    endDate() {
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },

  methods: {
    ...mapActions(["getUserSetting"]),
    async getUserSetting() {
      await this.$store.dispatch("getUserSetting", this);
      this.isBind = this.$store.state.usersetting.mobile;
    },
    chooseAvatar() {
      this.showmenu = true;
    },
    onChange(value) {
      if (this.iscu) {
        let va = parseInt(value[0]);
        this.$http
          .post("uts/user/userEdit ", { gender: va })
          .then(function(response) {
            if (response.data === "SUCCESS") {
            } else {
              //alert(response.msg)
              this.showToast("", "text", response.msg, "20em", "", "top");
            }
          })
          .catch(err => {
            if (err.msg) {
              this.showToast("", "text", err.msg, "20em", "top");
            }
          });
      }
    },
    onConfirm() {
      this.$router.replace("/firstBind");
    },
    onPassConfirm() {
      this.$router.push("/retrievePassword");
    },
    goback() {
      this.$router.push("/user");
    },
    onConfirmBirthday() {
      this.$http
        .post("uts/user/userEdit ", { birthday: this.birthday })
        .then(function(response) {
          if (response.data === "SUCCESS") {
          } else {
            this.showToast("", "text", response.msg, "20em", "top");
          }
        })
        .catch(err => {
          if (err.msg) {
            this.showToast("", "text", err.msg, "20em", "top");
          }
        });
    },

    gotorealname(isauth) {
      if (this.$store.state.usersetting.mobile == null) {
        this.showconfirm = true;
      } else {
        this.$router.push({ name: "setrealname", params: { isauth: isauth } });
        // return '/setrealname/' + isauth
      }
    },
    gotopassword() {
      if (this.$store.state.usersetting.is_pass == 1) {
        if (this.$store.state.usersetting.mobile == null) {
          this.showconfirm = true;
        } else {
          this.$router.push({ name: "setpassword" });
          // return '/setrealname/' + isauth
        }
      } else {
        this.showpassconfirm = true;
      }
    },
    getusername(username) {
      let userNameUpdateCount = this.$store.state.usersetting.is_allow_update;
      if (userNameUpdateCount === 0) {
        return "/setusername/" + username;
      } else {
        return "";
      }
    },
    getpoorname(isauth) {
      if (this.$store.state.usersetting.mobile == null) {
        this.showconfirm = true;
      } else {
        // return '/setpoorname/' + isauth
        this.$router.push({ name: "setpoorname", params: { isauth: isauth } });
      }
    },
    bindtelphonepath(bindtelphone) {
      if (bindtelphone == null) {
        return "/FirstBind";
      } else {
        return "/ReBind";
      }
    },
    getnickname(nickname) {
      return "/setnickname/" + nickname;
    },
    cancleWeiBoAuth() {
      if(window.api){
      let self = this;
      let weiboPlus = api.require("weiboPlus");
      weiboPlus.cancelAuth(function(ret, err) {
        if (ret.status) {
          self.showToast("", "text", "微博登出", "20em", "", "middle");
        } else {
          alert(JSON.stringify(err));
        }
      });
      }
    },
    closeLogin() {
      let self = this;
      let obj = {};
      obj.loginToken = window.localStorage.getItem("token");
      obj.refreshToken = window.localStorage.getItem("longToken");
      const logintype = window.localStorage.getItem("logintype");
      this.$http
        .post("uts/user/logout", obj)
        .then(function(response) {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("longToken");
          if (logintype === "weibo") {
            self.cancleWeiBoAuth();
          }
          window.localStorage.removeItem("logintype");
          self.$store.commit("CHA_USER", {});
          self.$router.push({ path: "/recom" });
        })
        .catch(function(error) {
          if (error.msg)
            self.showToast("", "text", error.msg, "20em", "", "middle");
        });
    }
  }
};
</script>

<style scoped>
/*操作列表区域*/
.opelist >>> .weui-cells {
  margin-top: 0 !important;
  font-size: 15px;
}

.opelist >>> .weui-cells:after {
  border: 0 none;
}

.opelist >>> .weui-cells:before {
  border: 0 none;
}

.weui-cell_access >>> .weui-cell__ft:after {
  margin-top: -3px;
}

.weui-cell:before {
  right: 15px;
}

.weui-cell {
  padding: 14px 15px;
}
.weui-cell >>> .weui-cell__ft {
  font-size: 14px;
  padding-right: 18px;
}

.vux-cell-box >>> .weui-cell_access .weui-cell__ft {
  padding-right: 18px;
  font-size: 14px;
}

/*底部注销按钮*/
.btm-logout {
  border-top: 1px solid #eee;
  box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.15);
}
</style>
