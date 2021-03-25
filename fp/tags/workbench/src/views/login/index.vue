<template>
  <div class="login-container wrap">
    <div class="login-main">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="top-header">
          <div class="header-wrap">
              <img src="./logo.png" alt="">
          </div>
        </div>
        <div class="login-form clearfix">
          <div class="login-left">
            <img src="./fupin.png">
          </div>
          <div class="login-right">
            <div class="logo-title clearfix">
              <!-- <a class="pull-right reg" @click="zhuce">管理员注册</a> -->
              <h3>登录 <span>中国社会扶贫网</span></h3>
            </div>
            <div class="form-con " v-show="loginPhone">
              <el-form-item prop="username">
                <el-input
                  class="form-control user"
                  v-model="loginForm.username"
                  name="username"
                  type="text"
                  auto-complete="on"
                  placeholder="手机号或用户名"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  class="form-control pass"
                  :type="passwordType"
                  v-model="loginForm.password"
                  name="password"
                  auto-complete="on"
                  placeholder="请输入密码"
                  @keyup.enter.native="handleLogin" />
                <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="changeye"/></span>
              </el-form-item>
              <div class="operate-link clearfix">
                <a class="pull-left" @click="loginPhoneAction">快速登录</a>
                <a class="pull-left res" target="_blank" :href="getLink"> 忘记密码？</a>
              </div>
              <div class="tips">
                  请使用“社会扶贫”APP的手机号码与密码登录
              </div>
              <div class="button">
                  <el-button :loading="loading" type="primary"  @click.native.prevent="handleLogin">登录</el-button>
              </div>
            </div>
            <div class="form-con" v-show="!loginPhone">
              <el-form-item>
                <el-input
                  class="form-control pass"
                  v-model="kuaisu.phone"
                  name="password"
                  auto-complete="on"
                  placeholder="请输入手机号"/>
              </el-form-item>
              <el-form-item>  
                <el-input v-model="kuaisu.icode" placeholder="输入短信验证码" style="width: 210px"></el-input>  
                <el-button type="success" style="padding-top:9px;width:100px;margin:0;background:#f57c16;border-color:#f57c16;" id="asd" @click="checkPhone(true)"   :disabled="codeDisabled">{{codeMsg}}</el-button>   
              </el-form-item>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <v-swiperTouch :sID="sID" @commitSuccess="commitSuccessState" @commitFail="commitFailState"></v-swiperTouch>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
                </div>
              </el-dialog>
              <div class="operate-link clearfix">
                <a class="pull-left"  @click="loginPhoneAction">返回登录</a>
                <a class="pull-left res" target="_blank" :href="getLink"> 忘记密码？</a>
              </div>
              <div class="tips">
                  请使用“社会扶贫”APP的手机号码与密码登录
              </div>
              <div class="button">
                  <el-button :loading="loading" type="primary" @click.native.prevent="LoginhandleLogin">登录</el-button>
              </div>
            </div>
            <!--<div class="thr-account">-->
            <!--<div class="icon qq" @click="wechatHandleClick('tencent')">-->
            <!--QQ-->
            <!--</div>-->
            <!--<div class="icon wb" @click="tencentHandleClick('weibo')">-->
            <!--微博-->
            <!--</div>-->
            <!--<div class="icon wx" @click="weiboHandleClick('wechat')">-->
            <!--微信-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>
        <div class="footer-copy">
          <p>指导单位：国务院扶贫办社会扶贫司、国务院扶贫办信息中心  京ICP备：17067839-2 中国社会扶贫网 版权所有</p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
 
  import openWindow from '@/utils/openWindow'
  import swiperTouch from '../swiperTouch/swiperTouch0.vue'
  import base64Js from 'js-base64'
  import Bus from '../../assets/Bus'
  export default {
    name: 'Login',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      return {
        phonefail:true,
        codeDisabled:false,
        //倒计时秒数
        countdown:120,
        //按钮上的文字
        codeMsg:'获取验证码',
        //定时器
        timer:null,
        dialogVisible:false,
        sID: '81177363', // 注册场景id
        loginPhone:true,
        loginForm: {
          username: '',
          password: '',
        },
        kuaisu:{
          phone:'',
          icode:'',
          ywNo:3
        },
        loginRules: {
          username: [{ required: true, trigger: 'change', message: '请输入用户名'}],
          password: [{ required: true, trigger: 'change', validator: validatePassword }],
        },
        passwordType: 'password',
        loading: false,
        showDialog: false
      }
    },
    created() {
      // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan)
    },
    components: {
      "v-swiperTouch": swiperTouch
    },
    methods: {
      getCode(){
        //验证码60秒倒计时
        if(!this.timer){
          this.timer=setInterval(()=>{
            if(this.countdown>0&&this.countdown<=120){
              this.countdown--;
              if(this.countdown!==0){
                this.codeDisabled=true;
                this.codeMsg="重新发送("+this.countdown+")";
              }else{
                clearInterval(this.timer);
                this.codeMsg="获取验证码";
                this.countdown=120;
                this.timer=null;
                this.codeDisabled=false;
              }
            }
          },1000)
        }
      },
      async checkPhone(isyz){
        this.phonefail = true;
        if(this.kuaisu.phone.replace(/(^\s*)|(\s*$)/g, "") == ''|| this.kuaisu.phone.replace(/(^\s*)|(\s*$)/g, "").length < 11 || this.kuaisu.phone.replace(/(^\s*)|(\s*$)/g, "").length > 11){
            alert('手机号码不能为空且必须为11位')
            this.phonefail = true;
            return;
        }
        let reg = /^(((1[345678][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
        let flag = reg.test(this.kuaisu.phone);
        if (!flag) {
          alert("请输入正确手机号！");
          this.phonefail = true;
          return false;
        }
        await this.$http.post("uts/user/isRegister", { mobile:this.kuaisu.phone }).then(res => {
          if(isyz){
            // this.dialogVisible = true;
            _fmOpt.triggerCaptcha()
            // this.commitSuccessState(true)
          }
          else this.dialogVisible = false;
          this.phonefail = false;

        })
    },
      getPhone(){
        //判断是否注册过

        if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.kuaisu.phone))){
          alert("手机号有误")
          return false
        }else{
          this.dialogVisible=true
        }
      },
      commitSuccessState (res, token) {
        this.suc = res

        if (res === true) {
          this.$http.post('uts/user/slidermess', {
            boundContent: this.kuaisu.phone,
            sendType: 3,
            authCode:token
          }).then((res) => {
            this.getCode()
            this.dialogVisible = false
          }).catch((err) => {
            this.errorDialogContent = '请稍后重试'
          })
        }
        // if (res === true) {
        //     let a={
        //       phone: this.kuaisu.phone,
        //       ywNo: 3
        //     }
        //     let b=JSON.stringify(a)
        //   this.$http({
        //       url:'mts/sms/sendSmsCode',
        //       method:'post',
        //       data:b,
        //       // method:'get',
        //       // params:b,
        //       headers:{
        //           'Content-Type':'application/json;charset=UTF-8'
        //       }
        //     }).then((res) => {
        //     this.getCode()
        //     this.dialogVisible = false
        //   }).catch((err) => {
        //     this.errorDialogContent = '请稍后重试'
        //   })
        // }
        Bus.$emit('funClick', this.suc)
      },
      commitFailState (res) {},
      async LoginhandleLogin(){
         await this.checkPhone(false)
        if(!this.phonefail){
         if(this.kuaisu.icode === ''){
          alert("验证码不能为空")
          return false
        }else{
          this.$store.dispatch('LoginByUsernamePhone',this.kuaisu).then(res => {
            if(res === 1){
              alert("该用户无权限登录")
            }else if(res === 2){
              alert("该用户被禁用")
            }else{
              this.loading = false
              this.getManagerLevel()
              this.$router.push({ path: '/' })
            }
          })
        }
        }
      },
      loginPhoneAction(){
        this.loginForm.username =''
        this.kuaisu.phone =''
        this.loginPhone = !this.loginPhone
      },
      zhuce(){
        this.$router.push({
          path:"/signIn"
        })
      },
      weiboHandleClick(thirdpart){
        this.$store.commit('SET_AUTH_TYPE', thirdpart)
        const appid = 'xxxxx'
        const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/authredirect')
        const url = 'https://api.weibo.com/oauth2/authorize?client_id='+appid+'&response_type=code&redirect_uri='+redirect_uri
        openWindow(url, thirdpart, 540, 540)
      },
      wechatHandleClick(thirdpart) {
        this.$store.commit('SET_AUTH_TYPE', thirdpart)
        const appid = 'xxxxx'
        const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/authredirect')
        const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
        openWindow(url, thirdpart, 540, 540)
      },
      tencentHandleClick(thirdpart) {
        this.$store.commit('SET_AUTH_TYPE', thirdpart)
        const client_id = 'xxxxx'
        const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/authredirect')
        const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
        openWindow(url, thirdpart, 540, 540)
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      handleLogin() {

        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
              if(res === 1){
                alert("该用户无权限登录")
              }else if(res === 2){
                alert("该用户被禁用")
              }else{
                this.loading = false
                this.getManagerLevel()
                this.$router.push({ path: '/' })
              }
            })
          } else {
            return false
          }
        })
      },
      getManagerLevel() {
        localStorage.clear();
        this.$http.post('hts/management/workbench').then(data => {
            this.data = data
            // 管理员级别
            localStorage.leaderLevel = this.data.user_level
            const arrs = []
            for (let i = 0; i < this.data.regionName.length; i++) {
              const regionNames = this.data.regionName[i].regionName.replace(/[ ]/g, ',')
              let regionNameArr = []
              if(regionNames.indexOf(",")>-1){
                regionNameArr = regionNames.split(',')
              }
              else if(regionNames.indexOf("-")>-1){
                regionNameArr = regionNames.split('-')
              }
              else{
                regionNameArr = regionNames.split(' ')
              }
              // 缓存管理员级别ID
              const obj = {
                id: this.data.regionName[i].id,
                regionName: ''
              }
              // 根据管理员的级别缓存对应的区域名称
              switch (this.data.user_level) {
                case 1:
                  obj.regionName = regionNameArr[0]
                  break
                case 2:
                  obj.regionName = regionNameArr[1]
                  break
                case 3:
                  obj.regionName = regionNameArr[2]
                  break
                case 4:
                  obj.regionName = regionNameArr[3]
                  break
                case 5:
                  obj.regionName = regionNameArr[4]
                  break
              }
              arrs.push(obj)
            }
          console.log(arrs)
            localStorage.leaderarrs = JSON.stringify(arrs)
          })
      },
      afterQRScan() {
        // const hash = window.location.hash.slice(1)
        // const hashObj = getQueryObject(hash)
        // const originUrl = window.location.origin
        // history.replaceState({}, '', originUrl)
        // const codeMap = {
        //   wechat: 'code',
        //   tencent: 'code'
        // }
        // const codeName = hashObj[codeMap[this.auth_type]]
        // if (!codeName) {
        //   alert('第三方登录失败')
        // } else {
        //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
        //     this.$router.push({ path: '/' })
        //   })
        // }
      }
    },
	  computed:{
      changeye(){
        if(this.passwordType==""){
          return "openeye"
        }
        else{
          return "eye"
        }
      },
      getLink(){
        return this.BASE_URL+"/pages/password1.html"
      }
    },
    mounted(){
      window.that=this
       window.base64Js=base64Js
       let newscripts = document.createElement('script');
        newscripts.type = 'text/javascript';
        newscripts.text = `(function() {
          _fmOpt = {
                display: 'bind  ', //popup方式渲染验证码
                partner: "zgshfp",
                appName: "zgshfp_web",
                fmb: true,
                initialTime: new Date().getTime(),
                token: "zgshfp" + "-" + new Date().getTime() + "-"+ Math.random().toString(16).substr(2),
                env: ${ process.env.FM_ENV},
                getinfo: function(){
                  return "e3Y6ICIyLjUuMCIsIG9zOiAid2ViIiwgczogMTk5LCBlOiAianMgbm90IGRvd25sb2FkIn0=";
                },
            };
            _fmOpt.beforeValidate = function() {
                return true
            }
            _fmOpt.onSuccess = function (e) {
                setTimeout(function(){
                    that.commitSuccessState(true,window.base64Js.Base64.encode(e))
                },1200)
            };
            _fmOpt.onFail = function(e){
                
            }
          var fm = document.createElement('script'); fm.type = 'text/javascript';
            fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 
            'static.tongdun.net/captcha/main/tdc.js?ver=1.0&t=' + (new Date().getTime()/600000).toFixed(0);
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(fm, s);
        })();`
        document.getElementsByTagName('head')[0].appendChild(newscripts)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .clearfix:after {
    display: block;
    content: "";
    clear: both;
    visibility: hidden;
    height: 0;
  }
  .clearfix {
    zoom: 1;
  }

  .el-input--small{
    .el-input__inner{
      height: 40px !important;
      border-radius: 0;
      padding-left: 35px;
      padding-right: 10px;
      background-position: 14px center;
      background-repeat: no-repeat;
      background-image: url(~@/assets/login/icon-username.jpg);
    }
    &.pass{
      .el-input__inner{
        background-image: url(~@/assets/login/icon-userpsw.jpg);
      }
    }
    &.user{
        .el-input__inner{
            border-radius: 10px;
        }
    }
  }


  .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label{
    position: relative;
    .show-pwd{
      position: absolute;
      right: 4%;
      top: 15%;
    }
  }
</style>
<style>
  .td-mask-common{
    background-color: #000 !important;
    opacity: .45 !important;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>

  .login-container{
    // background: url(./login-bg.jpg) no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    display: table;
    .login-main{
      display: table-cell;
      vertical-align: middle;
      padding-top: 30px;
      background: #fff;
      *{
        box-sizing: border-box;
      }
      h3{
          color: #f57c16 !important;
          margin-bottom: 25px !important;
          span{
              font-size: 16px;
          }
      }
      .top-header {
        height: 80px;
        left: 0;
        right: 0;
        position: absolute;
        top: 0;
        background: #f5f7fa;
        .header-wrap {
          width: 1200px;
          margin: 0 auto;
          // background: url(logo.png) no-repeat left 14px top 23px;
          height: 80px;
          img{
              margin-top: 18px;
              margin-left: 14px;
          }
        }
      }
      .login-form {
        height: 388px;
        width: 915px;
        margin: 0 auto;
        background: #fff;
        box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1);
        .login-left {
          float: left;
        }
        .login-right {
          width: 415px;
          height: 388px;
          float: right;
          background: #fff;
          position: relative;
          padding: 38px 50px;
          a.reg {
            display: inline-block;
            padding-bottom: 5px;
            padding-top: 3px;
            border-bottom: 1px solid #e46216;
            color: #e46216;
            float: right;
            cursor: pointer;
          }
          h3 {
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: normal;
            color: #444;
            margin-top: 0;
          }
          .form-control{
              .el-button, .el-button--success, .el-button--small{
                  margin: 0;
              }
            /deep/ .el-input__inner{border-color:#dcdfe6;border-radius: 4px;line-height: 33px;height:33px;font-size: 14px;color: #919190}
            /deep/ input:-webkit-autofill{background: #fff}
            .el-input__inner{
              background-position: 14px center;
              background-repeat: no-repeat;
              background-color: #ffffff;
              border: 1px solid #e3e3e3;
              width: 100%;
              border-radius: 0;
            }
          }
          .button{
              background: url('./loginbg.png') no-repeat;
              height: 54px;
            button{
                border: 0;
                background: rgba(0,0,0,0);
                margin: 0;
                height: 44px;
                display: inline-block;
                padding: 0 0px;
                line-height: 44px !important;
                text-align: center;
                font-size: 18px;
                border-radius: 0px;
                width: 100%;
                transition: all 0.3s;
            }

          }
          .operate-link{
            margin-bottom: 20px;
            .pull-left{
              color: #666;
              font-size: 14px;
              border-bottom: 1px solid #666;
            }
            .res{
                border-bottom: none;
                color: red;
            }
          }
          .tips{
              font-size: 14px;
              color: #f57c16;
              margin-bottom: 26px;
          }
          .thr-account {
            text-align: center;
            padding-top: 30px;
            .icon{
              display: inline-block;
              padding: 50px 20px 0 20px;
              background-repeat: no-repeat;
              background-position: center top;
              background-size: 40px;
              opacity: 0.9;
              transition: all 0.5s;
              font-size: 14px;
              &.qq{
                background-image: url(./qq.png);
              }
              &.wb{
                background-image: url('./weibo.png');
              }
              &.wx{
                background-image: url('./weixin.png');
              }
            }
          }
        }
      }
      .footer-copy {
        position: absolute;
        bottom: 0;
        height: 48px;
        line-height: 48px;
        left:0;
        right:0;
        overflow: hidden;
        text-align: center;
        background: #fff;
        border-top: 1px solid #ddd;
        p{
          color: #666;
          margin: 0;
          font-size: 14px;
        }
      }
    }
  }
</style>
