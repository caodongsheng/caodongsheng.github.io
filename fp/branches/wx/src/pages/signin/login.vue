<template>
  <div>
    <div class="pop-close" style="height: 40px">
      <span class="vux-close" @click="closeLogin" style="left:20px;top:20px"></span>
    </div>
    <div class="popup-login" style="position: absolute;top:40px;bottom:0;overflow-y: auto">
      <div class="login-wrap">
        <img class="siginlogo" src="../../common/images/signin-logo.png" alt>
        <group class="group-user">
          <x-input placeholder="请输入手机号" v-model="name" keyboard="number" :max="11" is-type="china-mobile" :required="true">
            <!--<i slot="label" class="fa fa-phone" aria-hidden="true"></i>-->
            <i slot="label" class="icon-phone" aria-hidden="true"></i>
          </x-input>
        </group>
        <group class="group-psw" v-if="!kuai">
          <x-input
            title
            placeholder="请输入8-20位密码"
            v-model="pass"
            :type="passwordType"
           
          >
            <!--<i slot="label" class="fa fa-unlock-alt" aria-hidden="true"></i>-->
            <i slot="label" class="icon-psw" aria-hidden="true"></i>
            <span slot="right" @click="showPwd">
              <img
                style="width: 20px;height: 13px;"
                v-if="passwordType === 'password'"
                src="../../common/images/eye.png"
              >
              <img v-else style="width: 20px;height: 13px;" src="../../common/images/openeye.png">
            </span>
          </x-input>
        </group>

        <div class="registerDialog" v-if="dialogshow">
          <div class="overlayer"></div>
          <div class="dialog-box">
            <p class="text-center dia-tit">
              <span>请完成拼图验证</span>
              <span class="closePower" @click="closeyzmlogin">
                <i class="fa fa-times"></i>
              </span>
            </p>
            <div class="dia-box clearfix">
              <swpTouch
                :sID="sID"
                @commitSuccess="commitSuccessState"
                @commitFail="commitFailState"
              ></swpTouch>
            </div>
          </div>
        </div>
        <group class="group-psw" v-if="kuai">
          <x-input
            title
            placeholder="短信验证码"
            v-model="icode"
            type="number"
            class="weui-vcode"
         
            label-width="100px"
            :show-clear="false"
          >
            <!--<i slot="label" class="fa fa-commenting-o" aria-hidden="true"></i>-->
            <i slot="label" class="icon-code" aria-hidden="false"></i>
            <x-button
              slot="right"
              type="primary"
              mini
              :disabled="disabled"
              :style="{background:codeStyle}"
              style="width:100px"
              @click.native="checkPhone(true)"
              class="btn-getcode"
            >
              {{getBtnText}}
              <span v-show="timerShow" class="count">
                剩余
                <countdown v-model="time" :start="start" @on-finish="countdownFinish"></countdown>秒
              </span>
            </x-button>
          </x-input>
        </group>
        <flexbox style="padding-top: 15px">
          <flexbox-item>
            <div class="text-left c-f">
              <div class="color-999 f-15" @click="kuaisu">{{!this.kuai?"快速登录":"密码登录"}}</div>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="text-right c-f">
              <router-link to="/retrievePassword" class="color-999 f-15">忘记密码</router-link>
            </div>
          </flexbox-item>
        </flexbox>
        <x-button
          type="primary"
          @click.native="toLoginKuai"
          action-type="button"
          class="btn-orange-lg"
          v-if="kuai"
        >
          登
          录
        </x-button>
        <x-button
          type="primary"
          @click.native="toLogin"
          action-type="button"
          class="btn-orange-lg"
          v-if="!kuai"
        >登 录</x-button>
        <div class="regtip color-999">
          还没有账号？
          <router-link :to="{path:'/reg'}">去注册</router-link>
        </div>
        <divider style="margin-top: 20px">第三方登录</divider>
        <flexbox>
          <flexbox-item>
            <div class="flex-demo-center">
              <img src="../../common/images/weixin_logo.png"  @click="AuthWX()">
            </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo-center">
              <img src="../../common/images/weibo_logo.png"  @click="AuthWB()">
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>

    <div class="lightBox" v-show="showPrompt"></div>
    <div v-transfer-dom>
      <confirm
        v-model="showconfirm"
        title="友情提示"
        confirm-text="前往注册"
        cancel-text="取消"
        @on-cancel="cancelR"
        @on-confirm="continueRegister"
      >
        <p class="f-14 text-center" style="line-height: 24px;margin: 15px 0">此手机号还未注册，建议您先注册再登陆</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import swpTouch from "../swiperTouch/swiperTouch.vue";
import {
  Group,
  TransferDom,
  Cell,
  XInput,
  XButton,
  Divider,
  Toast,
  Flexbox,
  Popup,
  Countdown,
  Confirm,
  Alert
} from "vux";
import retrievePassword from "./retrievePassword";
import * as types from "@/store/mutation-types.js";

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    Divider,
    Toast,
    Flexbox,
    retrievePassword,
    Popup,
    Countdown,
    swpTouch,
    TransferDom,
    Confirm,
    Alert
  },

  data() {
    return {
      phonefail:true,
      passwordType: "password",
      time: 60, // 计时时间
      start: false, // 是否开始计时
      dialogshow: false,
      codeStyle: "", // 获取验证码按钮颜色
      timerShow: false, // 计时器显示
      disabled: false, // 是否可点击 false为可点击
      kuai: false,
      suc: "",
      sID: "81177363", // 注册场景id
      icode: "",
      showPrompt: false,
      // 弹窗
    //  errorDialogTitle: "友情提示", // 报错题目
    //  errorDialogContent: "", // 报错信息
      regOver: false,
      errorShow: false,
      show: true,
      name: "",
      pass: "",
      errorMessage: "",
      showconfirm: false,
      ishtml5: true,
      demandID: this.$route.query.demandId,
      reget: false
    };
  },
    directives: {
      TransferDom
    },
  mounted() {
    if (window.api != undefined) {
      this.ishtml5 = false;
    }
    // 将thirdLogin方法绑定到window下面，提供给外部调用
    window["thirdDo"] = type => {
      this.thirdLogin(window.loginParam, type);
    };
  },
   watch:{
       name(val){
      this.$nextTick(() => {
          this.name = val.replace(/[^0-9]/g,'')
       
        })
    },
    },
  methods: {
   async checkPhone(isyz){
     this.phonefail = true;
       if(this.name.replace(/(^\s*)|(\s*$)/g, "") == ''|| this.name.replace(/(^\s*)|(\s*$)/g, "").length < 11 || this.name.replace(/(^\s*)|(\s*$)/g, "").length > 11){
                this.showToast('','text','手机号码不能为空且必须为11位','20em','','middle');
           this.phonefail = true;
           return false;
        }
      let reg = /^(((1[345678][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
      let flag = reg.test(this.name);
      if (!flag) {
        this.showToast("", "text", "请输入正确手机号！", "20em", "", "middle");
    
         this.phonefail = true;
         return false;
      } 

        await this.$http
          .post("uts/user/checkHasPhone", { phone: this.name })
          .then(res => {
           this.showconfirm = true;
           this.phonefail = true;
    
          })
          .catch(error => {
            if (error.code == "10107") {
             
              if(isyz){
                this.dialogshow = true;
              }
              else this.dialogshow = false;
              this.phonefail = false;
            }
          });
     
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },

    closeyzmlogin() {
      this.dialogshow = false;
    },
    filterFun() {
      if (/[\u4E00-\u9FA5]/g.test(this.name)) {
        this.name = this.name.replace(/[\u4E00-\u9FA5]/g, " ");
      }
    },
    commitSuccessState(res, token) {
      this.suc = res;
      if (res === true) {
        this.$http
          .post("uts/user/getPhoneCode", {
            phone: this.name,
            tcode: token,
            ywNo: 1
          })
          .then(res => {
            this.timerShow = true;
            this.dialogshow = false;
            this.start = true;
            this.codeStyle = "#ccc!important";
            this.disabled = true;
          })
          .catch(err => {
            this.showToast("", "text", "请稍后重试", "20em", "", "middle");
           
          });
      }
      Bus.$emit("funClick", this.suc);
    },
    commitFailState(res) {
      this.showToast("", "text", res.msg, "20em", "", "middle");
    },

    async toLoginKuai(path) {
      let _this = this;
      await this.checkPhone(false)
      // let reg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
      // let flag = reg.test(this.name)
      // if (this.phonefail) {
      //   // this.errorMessage = '请输入账号'
      //   this.showToast(
      //     "",
      //     "text",
      //     "请输入正确手机号码！",
      //     "20em",
      //     "",
      //     "middle"
      //   );
      //   return false;
      // }
      //  else if(!flag) {
      //     this.showToast('','text','请检查手机号是否输入正确','20em','','middle')
      //     return false
      // }
      if(!this.phonefail){
      if (this.icode === "") {
        // this.errorMessage = '请输入密码'
        this.showToast("", "text", "请输入验证码", "20em", "", "middle");
      } else {
        this.$http
          .post("uts/user/fastLogin", {
            mobile: _this.name,
            ywNo: 1,
            code: _this.icode
          })
          .then(response => {
            window.localStorage.setItem("token", response.data.logintoken);
            window.localStorage.setItem(
              "longToken",
              response.data.refreshtoken
            ); // 长token
            window.localStorage.setItem("logintype", "fast");
            _this.$store.commit(types.CHA_USER, response.data.user);
            if (
              this.$route.query.redirect &&
              this.$route.query.redirect === location.hostname
            ) {
              _this.$router.go(-1);
            }
            if (
              localStorage.getItem("shopurl") &&
              localStorage.getItem("shopurl") !== ""
            ) {
              _this.$router.replace("/mall");
            } else _this.$router.push("/");
          })
          .catch(function(error) {
            if (error.code === "10001" || error.code === "10002") {
              //   _this.errorMessage = '用户名或密码错误'
              _this.showToast(
                "",
                "text",
                "用户名或密码错误",
                "20em",
                "",
                "middle"
              );
              //   _this.name = ''
              //   _this.pass = ''
              return false;
            } else if (error.code === "10002") {
              //   _this.errorMessage = '用户不存在'
              _this.showToast("", "text", "用户不存在", "20em", "", "middle");
              //   _this.name = ''
              //   _this.pass = ''
            } else if (error.code == "10104") {
              _this.showToast(
                "",
                "text",
                error.msg,
                "20em",
                "",
                "middle"
              );
            } else if (error.code == "10108") {
              _this.showconfirm = true;
            } else {
              if (error.msg)
                _this.showToast("", "text", error.msg, "20em", "", "middle");
            }
          });
      }
    }
    },
    kuaisu() {
      this.kuai = !this.kuai;
    },
    countdownFinish() {
      (this.disabled = false), // 是否可点击 false为可点击
        (this.codeStyle = ""), // 获取验证码按钮颜色
        (this.timerShow = false),
        (this.start = false),
        (this.time = 60);
      this.reget = true;
    },
    continueRegister() {
      this.$router.push("/reg");
      this.showconfirm = false;
    },
    cancelR() {
      this.showconfirm = false;
    },

    // ...mapActions(["getUserInfo"]),
    changeShow(data) {
      this.show = data;
    },
    closeLogin() {
      if (
        localStorage.getItem("shopurl") &&
        localStorage.getItem("shopurl") !== ""
      ) {
        this.$router.replace("/mall");
      } else this.$router.push("/");
    },
    async toLogin(path) {
      let _this = this;
      // if (this.phonefail) {
      //   // this.errorMessage = '请输入账号'
      //   this.showToast(
      //     "",
      //     "text",
      //     "请输入正确手机号码！",
      //     "20em",
      //     "",
      //     "middle"
      //   );
      //   return false;
      // } else 
       await this.checkPhone(false)
      if(!this.phonefail){
      if (this.pass === "") {
        // this.errorMessage = '请输入密码'
        this.showToast("", "text", "请输入密码", "20em", "", "middle");
      } else {
        this.$http
          .post("uts/user/login", {
            name: _this.name,
            pass: _this.pass
          })
          .then(response => {
            window.localStorage.setItem("token", response.data.logintoken);
            window.localStorage.setItem(
              "longToken",
              response.data.refreshtoken
            ); // 长token
            window.localStorage.setItem("logintype", "account");
            _this.$store.commit(types.CHA_USER, response.data.user);
            if (_this.$route.query.demandId) {
              _this.$router.replace("/loveNeed" + "/" + _this.demandID);
            } else if (
              localStorage.getItem("shopurl") &&
              localStorage.getItem("shopurl") !== ""
            ) {
              _this.$router.replace("/mall");
            } else _this.$router.push("/user");
          })
          .catch(function(error) {
            if (error.code === "10001") {
              //   _this.errorMessage = '用户名或密码错误'
              _this.showToast(
                "",
                "text",
                "用户名或密码错误",
                "20em",
                "",
                "middle"
              );
              return false;
            } else if (error.code === "10002") {
              //   _this.errorMessage = '用户不存在'
              _this.showToast("", "text", "用户不存在", "20em", "", "middle");
            } else if (error.code == "D2999") {
              _this.showToast(
                "",
                "text",
                "该账号已被禁用",
                "20em",
                "",
                "middle"
              );
            } else {
              if (error.msg)
                _this.showToast("", "text", error.msg, "20em", "", "middle");
            }
          });
      }
      }
    },

    thirdLogin(userinfo, type) {
      let _this = this;
      let postdata = {};
      if (type === "2") {
        postdata.username = userinfo.nickName;
        postdata.uid = userinfo.openId;
        postdata.type = type;
      } else if (type === "4") {
        postdata.username = userinfo.nickName;
        postdata.uid = userinfo.uid;
        postdata.openid = userinfo.openid;
        postdata.type = type;
        postdata.user_pic = userinfo.avatar;
      } else {
        postdata.username = userinfo.nickName;
        postdata.uid = userinfo.uid;
        postdata.type = type;
        postdata.user_pic = userinfo.avatar;
      }
      console.log(JSON.stringify(postdata));
      this.$http.post("uts/user/thirdLogin", postdata).then(response => {
        window.localStorage.setItem("token", response.data.logintoken);
        window.localStorage.setItem("longToken", response.data.refreshtoken); // 长token
        _this.$store.commit(types.CHA_USER, response.data.user);

        if (_this.$route.query.demandId) {
          _this.$router.replace("/loveNeed" + "/" + _this.demandID);
        } else {
          if (
            localStorage.getItem("shopurl") &&
            localStorage.getItem("shopurl") != ""
          ) {
            _this.$router.replace("/mall");
          } else _this.$router.push("/user");
        }
      });
    },
    AuthWX() {
      let _this = this;
      if (!this.ishtml5) {
        let wx = api.require("wx");
        wx.isInstalled(function(ret, err) {
          if (!ret.installed) {
            alert("当前设备未安装微信客户端");
          } else {
            _this.showPrompt = true;
            wx.auth(function(ret, err) {
              if (ret.status) {
                wx.getToken(
                  {
                    // apiKey: 'wxae8803ed717eb1af',
                    // apiSecret: 'c2298473b5a3f0dd1988253c9fdf5ed6',
                    code: ret.code
                  },
                  function(ret, err) {
                    if (ret.status) {
                      api.showProgress({
                        style: "default",
                        animationType: "fade",
                        title: "授权成功",
                        text: "绑定处理中...",
                        modal: true
                      });
                      let loginParam = {};

                      loginParam.accessToken = ret.accessToken;
                      loginParam.refreshToken = ret.dynamicToken;
                      //获取wx头像，昵称
                      wx.getUserInfo(
                        {
                          accessToken: ret.accessToken,
                          openId: ret.openId
                        },
                        function(ret, err) {
                          loginParam.uid = ret.unionid;
                          loginParam.openid = ret.openid;
                          if (ret.status) {
                            _this.showPrompt = false;
                            // 绑定成功
                            loginParam.nickName = ret.nickname;
                            loginParam.avatar = ret.headimgurl;
                            window.localStorage.setItem("logintype", "wx");
                            // 实现绑定动作
                            _this.thirdLogin(loginParam, "4");
                            api.hideProgress();
                          } else {
                            _this.showPrompt = false;
                            alert("登陆失败！");
                          }
                        }
                      );
                    } else {
                      _this.showPrompt = false;
                      alert("登陆失败！");
                    }
                  }
                );
              } else {
                _this.showPrompt = false;
                alert("授权失败！");
              }
            });
          }
        });
      }
    },
    AuthWB() {
      let _this = this;
      if (!this.ishtml5) {
        let weiboPlus = api.require("weiboPlus");
        weiboPlus.isInstalled(
          // apiKey: "2458166125"},
          function(ret) {
            console.log(JSON.stringify(ret));
            if (ret.status) {
              weiboPlus.auth(
                // {apiKey: "2458166125", registUrl: "https://www.zgshfp.com.cn/?w=1"},
                function(ret, err) {
                  if (ret.status) {
                    window.loginParam = {};
                    window.loginParam.uid = ret.userId;
                    weiboPlus.getUserInfo(
                      {
                        token: ret.token,
                        userId: ret.userId
                      },
                      function(uret, err) {
                        if (uret.status) {
                          // 绑定成功
                          try {
                            window.loginParam.nickName = JSON.parse(
                              uret.userInfo
                            ).screen_name;
                            window.loginParam.avatar = JSON.parse(
                              uret.userInfo
                            ).profile_image_url;
                          } catch (err) {
                            window.loginParam.nickName =
                              uret.userInfo.screen_name;
                            window.loginParam.avatar =
                              uret.userInfo.profile_image_url;
                          }
                          window.localStorage.setItem("logintype", "weibo");
                          // 实现绑定动作
                          window.thirdDo("5");
                        }
                      }
                    );
                  } else {
                    _this.showToast("", "text", "取消授权");
                  }
                }
              );
            } else {
              _this.showToast("", "text", "请安装新浪微博客户端");
            }
          }
        );
      }
    }
  },
  computed: {
    getBtnText() {
      if (this.timerShow) {
        return "";
      }
      if (this.reget) {
        return "重新获取";
      }
      return "获取验证码";
    },
    changeye() {
      if (this.passwordType == "") {
        return "../../common/images/eye.png";
      } else {
        return "../../common/images/openeye.png";
      }
    }
  }
};
</script>

<style scoped>
.vux-close:before,
.vux-close:after {
  width: 21px;
  height: 2px;
}

.vux-divider {
  color: #999;
}

.btn-getcode {
  border-radius: 30px;
  position: absolute;
  right: 0;
  /* top: 0; */
  border: 0 none;
  bottom: 16px;
  height: 35px;
}

.vux-flex-row {
  padding-top: 15px;
}

.linkfor {
  padding: 20px 0;
}

.btn-orange-lg {
  margin-top: 30px;
}

.flex-demo {
  display: flex;
  justify-content: left;
  align-items: center;
}

.flex-demo-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-demo-center img {
  width: 31%;
}

.flex-demo a {
  float: right;
  color: #ccc;
}

/*登录*/
.group-user >>> .weui-cell,
.group-psw >>> .weui-cell {
  padding: 15px 0;
}

.login-wrap {
  padding: 15px 40px;
}

.login-wrap {
  padding: 15px 40px;
}

.login-wrap .siginlogo {
  width: 90%;
  display: block;
  margin: 20px auto 40px auto;
}

.icon-phone {
  background: url(../../common/images/login-phone.png) no-repeat;
  width: 22px;
  height: 22px;
  display: inline-block;
  background-size: 100% 100%;
  margin-right: 15px;
  vertical-align: bottom;
}

.icon-psw {
  background: url(../../common/images/login-psw.png) no-repeat;
  width: 22px;
  height: 22px;
  display: inline-block;
  background-size: 100% 100%;
  margin-right: 15px;
  vertical-align: bottom;
}

.icon-code {
  background: url(../../common/images/login-code.png) no-repeat;
  width: 22px;
  height: 22px;
  display: inline-block;
  background-size: 100% 100%;
  margin-right: 15px;
  vertical-align: bottom;
}

.login-wrap i.fa {
  font-size: 16px;
  color: #ccc;
  padding-right: 20px;
}

.login-wrap >>> .vux-x-input {
  font-size: 15px;
}

.login-wrap >>> .weui-cells:before {
  border-top-width: 0;
}

.login-wrap .regtip {
  text-align: center;
  font-size: 14px;
  margin: 20px 0 15px 0;
}

.login-wrap .regtip a {
  color: #ff8225;
}

.login-wrap >>> .weui-cells {
  margin-top: 0;
}

.login-wrap .group-psw >>> .weui-cells {
  margin-top: 20px;
}
.dia-box {
  padding-top: 0px;
}
.vux-popup-dialog {
  height: 100vh !important;
  background: #ffffff;
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

