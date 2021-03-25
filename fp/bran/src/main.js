// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import '../static/css/font-awesome.css'
import '../static/css/iconfont.css'
import '../static/css/common.css'
import '../static/css/animate.min.css'
import loadingspin from '../static/appimg/loading-spin.svg'

import Axios from './scripts/ajax.js'
import shareUrlParamsFilter from './util/filter.js';
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
import axioss from 'axios'
import 'swiper/dist/css/swiper.css'
import store from './store/index'
import VueScroller from 'vue-scroller'
import ba from 'vue-ba'
import { ToastPlugin, Flexbox, FlexboxItem } from 'vux'
import wx from 'weixin-js-sdk'
import qs from 'qs'
import VueClipboard from 'vue-clipboard2'
import * as types from './store/mutation-types.js'
import VueLazyload from 'vue-lazyload'
import Bus from "./pages/home/Bus";
import "babel-polyfill"
Vue.use(VueClipboard)
/* 引导页 */
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })
import VConsole from 'vconsole/dist/vconsole.min.js'  //打印错误信息，不需要的时候注释
if(process.env.ENV_CONFIG != 'prod'){
  let vConsole = new VConsole() // 初始化               //打印错误信息，不需要的时候注释
  Vue.use(vConsole)
}
import ModuleNative from './util/module.js'
Vue.prototype.ModuleNative = ModuleNative
Vue.prototype.H5PAY_URL = process.env.H5PAY_URL,
  Vue.prototype.qs = qs
Vue.config.productionTip = false
// 微信的url
Vue.prototype.WinXinHost = process.env.WX_HOST
// 百度统计
// Vue.use(ba, '9098f539d4f34c1808700217ea04ccb1')
// 正式环境
// Vue.use(ba, 'b958f66706f99a9de12c888e3103cde1')

// 开启debug模式
Vue.config.debug = true
Vue.prototype.$http = Axios
Vue.prototype.path = '1'
Vue.prototype.$https = axioss
Vue.use(ToastPlugin)
//Vue.use(LoadingPlugin)
Vue.use(VueScroller)
Vue.use(wx)
Vue.use(VueLazyload, {
  loading:loadingspin,
  attempt: 1,
  error:require('../static/appimg/noimg.png'),//这个是请求失败后显示的图片

})
let MobileDetect = require('./util/mobile-detect');
let md = new MobileDetect(window.navigator.userAgent);
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
//FastClick.attach(document.body)
// localStorage.setItem('user_id',"39292957");
// localStorage.setItem('token',"90507d1903fc667b179006decf9241b98e0c90d15748b2e1bcbe389a525aa055e9ec9fc47cf06905b2804bdb350b642845f1af6de5832d6963c62002d99e72018ccd5f235fac9e08061")
console.log(window.location.href)
if(window.location.search.indexOf('token')){
  localStorage.setItem('token',getUrlParam("token", window.location.href, false));
}
if(window.location.search.indexOf('userid')){
  localStorage.setItem('userid',getUrlParam("userid", window.location.href, false));
}
if(window.location.search.indexOf('nickname')){
  localStorage.setItem('nickname',getUrlParam("nickname", window.location.href, false));
}
if(window.location.search.indexOf('user_type')){
  localStorage.setItem('user_type',getUrlParam("user_type", window.location.href, false));
}
router.beforeEach(({ meta, path }, from, next) => {

  // let umeng;
  // if (window.api) {
  //   umeng = api.require('umAnalysis');
  // }
  const { auth = false } = meta
  const isLogin = localStorage.getItem('token')&& localStorage.getItem('token')!="";// true用户已登录， false用户未登录
  if (auth) { // 要求权限并且未登录且地址不是登录（否则会死循环）转向登录
 if(!isLogin){

    next(false)
    // window.android.login()
    this.ModuleNative('AppReturnToLoginPage','需求详情去登录')
 }
 else{
    store.dispatch('getUser', { _this: Axios })
  }
  }
  let ua = window.navigator.userAgent.toLowerCase();
  let isWeiXin = false;
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    isWeiXin = true;
  }else{
    // 修改状态栏背景颜色
    // if (md.os()=="iOS") {
    //   setTimeout(function(){
    //       if(window.app.getVersion!=undefined){
    //         var version = window.app.getVersion()
    //         version=version.split('.')
    //         if(version[0]<=1){
    //           if(version[1]<=9){
    //             if(version[2]<1){
    //             }else{
    //               setTimeout(function(){
    //                 window.navCtrlBarColor.getColor("255,255,255")
    //               },1000)
    //             }
    //           }
    //         }else{
    //            setTimeout(function(){
    //               window.navCtrlBarColor.getColor("255,255,255")
    //           },1000)
    //         }
    //       }
    //   },1000)

    //   // setTimeout(function(){
    //   //   window.navCtrlBarColor.getColor("255,255,255")
    //   // },1000)
    // }else{
    //   // 安卓
    //   if(window.navCtrlBarColor != undefined){
    //     window.navCtrlBarColor.getColor("255,255,255")
    //   }
    // }
  }
  if(isWeiXin&&path == '/login'){
    replaceHref();
    return next(false);
  }
  /*if (path) {
    _hmt.push(['_trackPageview', '/#' + path])
  }*/
  next()
})

// 20210301添加百度统计代码

router.afterEach( ( to, from, next ) => {
 setTimeout(()=>{
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?b958f66706f99a9de12c888e3103cde1";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
 },0);
});

//统计代码结束
Vue.prototype.isios = function(){
  if (md.os()=="iOS") {
    //  config.headers.IMEI = plus.device.uuid
      return true;
     }
     else{
       return false;
     }
}
Vue.prototype.isapp = function(){
  if (md.os()=="iOS"||md.os()=="AndroidOS") {
    //  config.headers.IMEI = plus.device.uuid
      return true;
     }
     else{
       return false;
     }
};
// 公用的toasr(全局变量)
Vue.prototype.showToast = function (showPositionValue, type, text, width = '20em', position = 'bottom') {
  this.$vux.toast.show({
    showPositionValue: false,
    text: text,
    type: type,
    width: width,
    position: position,
    showBackArrow: true
  })
}

// 公用方法，用于判断当前环境是否是微信环境
Vue.prototype.isWeixinCient = function () {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}
Vue.prototype.setWeixinConfig = function (obj) {
  let self = this;
  let url = window.location.href.split("#")[0];
  // routeurl =obj.link
  this.$http.post('uts/wechat/makeWXTicket', { url: url })
    .then(function (data) {
      wx.config({
        debug: false, ////生产环境需要关闭debug模式
        appId: data.data.appid, //appId通过微信服务号后台查看
        timestamp: data.data.timestamp, //生成签名的时间戳
        nonceStr: data.data.nonceStr, //生成签名的随机字符串
        signature: data.data.signature, //签名
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'chooseImage']
      });
      wx.ready(function () {

        // let shareUrl =
        // "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        // data.data.appid +
        // "&redirect_uri=" +
        // encodeURIComponent(self.BASE_URL+'uts/user/wxLogin?urls='+routeurl+"?&;") +
        // "&reload=reload&response_type=code&scope=snsapi_userinfo&connect_redirect=1#wechat_redirect";
        // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        wx.checkJsApi({
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'chooseImage'],
          success: function (res) { }
        });
        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareAppMessage({
          title: obj.title,
          desc: obj.desc,
          link: shareUrlParamsFilter(obj.link),
          imgUrl: "https://wx.fpmai.com/m/images/share_icon.png",
          trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            // alert('用户点击发送给朋友');
          },
          success: function (res) {
            if (obj.demandId !== ""&&self.G('token')) {
              self.$http.post('hts/myDemand/maidian', {
                demandId: obj.demandId,
                token: self.G('token')
              }).then(data => {
                alert('已分享');
              })
            }
            else {
              alert('已分享');
            }
          },
          cancel: function (res) {
            alert('已取消');
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });


        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
          title: obj.title,
          desc: obj.desc,
          link: shareUrlParamsFilter(obj.link),
          imgUrl: "https://wx.fpmai.com/m/images/share_icon.png",
          trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            //alert('用户点击分享到朋友圈');
          },
          success: function (res) {
            if (obj.demandId !== ""&&self.G('token')) {
              self.$http.post('hts/myDemand/maidian', {
                demandId: obj.demandId,
                token: self.G('token')
              }).then(data => {
                alert('已分享');
              })
            }
            else {
              alert('已分享');
            }
          },
          cancel: function (res) {
            alert('已取消');
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });

        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareQQ({
          title: obj.title,
          desc: obj.desc,
          link: shareUrlParamsFilter(obj.link),
          imgUrl: "https://wx.fpmai.com/m/images/share_icon.png",
          trigger: function (res) {
            // alert('用户点击分享到QQ');
          },
          complete: function (res) {
            // alert(JSON.stringify(res));
          },
          success: function (res) {
            if (obj.demandId !== ""&&self.G('token')) {
              self.$http.post('hts/myDemand/maidian', {
                demandId: obj.demandId,
                token: self.G('token')
              }).then(data => {
                alert('已分享');
              })
            }
            else {
              alert('已分享');
            }
          },
          cancel: function (res) {
            alert('已取消');
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
        // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareWeibo({
          title: obj.title,
          desc: obj.desc,
          link: shareUrlParamsFilter(obj.link),
          imgUrl: "https://wx.fpmai.com/m/images/share_icon.png",
          trigger: function (res) {
            //   alert('用户点击分享到微博');
          },
          complete: function (res) {
            // alert(JSON.stringify(res));
          },
          success: function (res) {
            if (obj.demandId !== ""&&self.G('token')) {
              self.$http.post('hts/myDemand/maidian', {
                demandId: obj.demandId,
                token: self.G('token')
              }).then(data => {
                alert('已分享');
              })
            }
            else {
              alert('已分享');
            }
          },
          cancel: function (res) {
            alert('已取消');
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
      }
      )
    })
}

Vue.prototype.L = function (a, b) {
  localStorage.setItem(a, b)
}
Vue.prototype.getPhoneType = function(){
  var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
       return "android"
    }
    if (isIOS) {
　　　　return "ios"
    }
}
Vue.prototype.K = function (a, b) {
  localStorage.setItem(a, b)
}
Vue.prototype.G = function (a) {
  return localStorage.getItem(a)
}
//Vue.prototype.BASE_URL = 'http://www.fp1017.org.cn/'

Vue.prototype.BASE_URL = process.env.BASE_API

Vue.prototype.QKL_URL = process.env.QKL_URL
// window.onload = function(){
//   let token = localStorage.getItem('token')
//   console.log("传给getuserinfo的"+token)
// if (!token || token === '') {

// } else {

//    store.dispatch('getUser', { _this: Axios })
// }
// }
window.addEventListener("beforeunload",()=>{ //在页面刷新时将vuex里的信息保存到sessionStorage里
  sessionStorage.setItem("store",JSON.stringify(store.state))
})

let newvue = new Vue({
  router,
  store,
  created: function () {
    if (sessionStorage.getItem("store") ) { //在页面加载时读取sessionStorage里的状态信息
      store.replaceState(Object.assign({}, store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    FastClick.attach(document.body)
  },

  render: h => h(App)
}).$mount('#app')
//原生刷新vue页面
window.userInfoChangeAction = function() {
//   this.console.log("111111111111")
//   if(localStorage.getItem("gettoken")&&localStorage.getItem("gettoken")!=""){
//     //localStorage.setItem("gettoken",'')
//   }
// else{
//   localStorage.setItem("gettoken",'geted')
//   window.location.reload();
// }
}
window.getPhoto = function(uploadpic){
  Bus.$emit("getpicture", uploadpic);
}
window.nativeGoBack = function(uploadpic){
  Bus.$emit("nativeGoBack", uploadpic);
}
window.ReturnUser = function(users){
  let a=JSON.parse(users)
  let ytoken=a.token
  let fpUserId=a.fpUserId
  let user_type=a.user_type
  console.log("从原生获得的token",ytoken,'原生用户信息',users);
  let token = localStorage.getItem("token");
  if(ytoken&&ytoken!=""){
    if(ytoken!=token){
        console.log("从原生获得的token并设置"+ytoken);
        localStorage.setItem("token",ytoken)
        localStorage.setItem("userid",fpUserId)
        localStorage.setItem("user_type",user_type)
        let u=window.location.href
        console.log('u',u)
        let b=changeURLPar(u,'token',ytoken)
        console.log('b',b)
        let c=changeURLPar(b,'userid',fpUserId)
        console.log('c',c)
        let d=changeURLPar(c,'user_type',user_type)
        console.log('d',d)
        let e=d.split('#')
        let f= e[0] + '?#' + e[1]
        console.log('f',f)
        console.log('e',e)
        window.location.replace(f)
    }
  }
}
//url处理
function changeURLPar(destiny, par, par_value){
  var pattern = par+'=([^&]*)';
  var replaceText = par+'='+par_value;
  if (destiny.match(pattern)){
    var tmp = '/\\'+par+'=[^&]*/';
    if(par=='token'){
      tmp = destiny.replace(par+'=', replaceText);
    }else{
      tmp = destiny.replace(eval(tmp), replaceText);
    }
    return (tmp);
  }else{
    if (destiny.match('[\?]')){
      return destiny+'&'+ replaceText;
    }else{
      return destiny+'?'+replaceText;
    }
  }
  return destiny+'\n'+par+'\n'+par_value;
}
//原生刷新
window.goBack = function(){
    if(router){
      console.log('物理返回router.go(-1)'+router.currentRoute.fullPath)
      if(router.currentRoute.query.flag==1){
        if(router.currentRoute.query.routepath){
          router.replace({path:router.currentRoute.query.routepath})
          return false;
        }
       else { history.go(-5);
        return false;
       }
      }
      history.length > 1
      ? router.go(-1)
      : router.push('/')

    }else{
        console.log('物理返回window.go(-1)')
        history.go(-1)
    }
}

window.addEventListener("online", function () {
  // window.offline = false
  // router.replace(window.offlinepath[offlinepath.length-1].url)
  newvue.$children[0].reload()
      }, false);
window.addEventListener("offline", function () {
  // window.offline = true
  // window.offlinepath = [];
  // window.offlinepath.push({url: newvue.$route.fullPath});

}, false);

function replaceHref(){
  console.log(window.location.href)
  let code = getUrlParam("code", window.location.href, false)
  let unionid = getUrlParam("unionid", window.location.href, false)
  let openid = getUrlParam("openid", window.location.href, false)
  if (unionid == '' || unionid == null) {//打开分享链接的情况下
    if (code == '' || code == null) {
      let url = window.location.href;//本页面的地址
      let squrl = getWechatUrlHand(url);//调用授权

      window.location.replace(squrl);
    } else {
      getOpenID(code);//授权之后有code了调用wxlogin获取unionid和openid
    }
  }
  else{
    console.log("ff")//直接打开新版微信的情况
    checkWXAndLogin()
  }
}

function getUrlParam(name, href, noDecode) {
  var re = new RegExp('(?:\\?|#|&)' + name + '=([^&]*)(?:$|&|#)', 'i'),
    m = re.exec(href);
  var ret = m ? m[1] : '';
  return !noDecode ? decodeURIComponent(ret) : ret;
}

// 接收原生区划
function getProvinceArea (){
  
  // var area = {cooperation:1,name: "江西省",id:"360000000000",type:1,provinceArea:"360000000000",provinceName:"江西省"}
  let asd=getUrlParam('cooperation',window.location.href,false)||2
  var area = {cooperation:asd ,name: getUrlParam('name',window.location.href,false),id:getUrlParam('id',window.location.href,false),type:Number(getUrlParam('type',window.location.href,false)),provinceArea:getUrlParam('provinceArea',window.location.href,false),provinceName:getUrlParam('provinceName',window.location.href,false)}
  // 520200000000
  newvue.$store.commit('cityCheck',area)
}
if(getUrlParam('name',window.location.href,false)){
  getProvinceArea()
}else{
  // var storageName=localStorage.getItem('city')
  // if(storageName.name){
  //   newvue.$store.commit('cityCheck',JSON.parse(localStorage.getItem('city')))
  // }else{
    //cooperation 是否东西部合作， 2否 1是
    // var area = {cooperation:1,name: "北京省",id:"110128000000",type:1,provinceArea:"520000000000",provinceName:"贵州省"}
    var area = {cooperation:2,name: "全国",id:"",type:1,provinceArea:"",provinceName:"全国"}
    newvue.$store.commit('cityCheck',area)
  // }
}
function getWechatUrlHand(url) {//手动授权地址
  // var s="https://wx.shfp1017.org.cn/pages/QRcode/dist/index.html";
  var k = window.location.href;
  var redirectUrl = encodeURIComponent(k);
  // var appId="wxf8cce3dbe0edfca3";//车行互助呢
  var appId = "wx9aeccc5da4c9194b";//帮一把啊
  return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9aeccc5da4c9194b&redirect_uri=" + redirectUrl + "&scope=snsapi_userinfo&response_type=code&state=wxh5267689457315#wechat_redirect";
}
function getOpenID(code) {
  newvue.$http.post('uts/user/wxLogin', { code: code, states: 'invite' }).then(function (res) {
    if (res.code == "UTSI0000") {
      let openid = res.data.substring(28, 56);
      let unionid = res.data.substring(0, 28);
      window.location.replace(newvue.WinXinHost + '?unionid=' + unionid + '&openid=' + openid + "#" + window.location.href.split("#")[1])

        checkWXAndLogin();

    } else {
      let url = window.location.href;//本页面的地址
      let squrl = getWechatUrlHand(url);//调用授权
      window.location.replace(squrl);
    }
  })
}
function checkWXAndLogin () {
  if (newvue.isWeixinCient()) {
    let openid = getUrlParam('openid', window.location.href, false).substring(0, 28)
    let unionid =getUrlParam('unionid', window.location.href, false).substring(0, 28)
   // let url = this.getQueryString("url");
   console.log(openid+"ddd"+unionid)
    window.localStorage.setItem('openid', openid)
    // 调用自动登录
    newvue.$http.post('uts/user/thirdLogin', {
      username: openid,
      openid:openid,
      uid: unionid,
      type: '4'
    }).then((response) => {
      window.localStorage.setItem('token', response.data.logintoken)
      window.localStorage.setItem('longToken', response.data.refreshtoken) // 长token
      newvue.$store.commit(types.CHA_USER, response.data.user)
      // if(url!=""){
      //   _this.$router.replace(url)
      // }
     // if (!response.data.user.mobile) {
      //   alert('登录成功，请绑定手机号！')
      //   _this.$router.push('/FirstBind')
      // }
    })

  }
}
//   let umeng = api.require('umAnalysis');
//   umeng.onPageStart({
//     pagename: "/recom"
//   }, function (ret, err) {
//   });

//   api.addEventListener({ name: "toapproute" }, function (ret, err) {
//     const obj = ret.value;

//     api.closeWin({ name: "webview_win" });
//     if (obj.url != "") {
//       router.replace(obj.url);
//     }
//   })

//   api.addEventListener({
//     name: 'offline'
//   }, function (ret, err) {
    // setTimeout(function () {
    //   window.currentpath = router.currentRoute.fullPath
    //   router.replace('/networkError')
    // }, 3000)
    // window.offline = true
    // console.log(newvue.$route.fullPath+"aaa")
    // window.offlinepath = [];
    // window.offlinepath.push({url: newvue.$route.fullPath});;
  // });

  // api.addEventListener({
  //   name: 'online'
  // }, function (ret, err) {

  //   newvue.$children[0].reload()


  // });

  // if (window.history.length <= 1) {
  //   exitApp();
  // }
  // else {
  //   api.removeEventListener({ name: "keyback" });
  // }
  // const phonetype = newvue.getPhoneType()
  // if(phonetype =="android"){
  // const headerheight = api.safeArea.top + 'px';
  // window.localStorage.setItem("hheight", headerheight);
  // const header = document.getElementById("header")
  // const app = document.getElementById("app");
  // // fixStatusBar_API(header, app);
  //    header.style.paddingTop = api.safeArea.top + 'px';
  //     app.style.top = api.safeArea.top + 'px';
  //     app.style.bottom = '0px';
  //     app.style.height = "auto"
  // }

  // api.setStatusBarStyle({
  //   style: 'dark',
  //   color: '#fff'
  // });
  // fixStatusBar_API(header, app);

//}

// 返回键双击退出
// function exitApp() {
//   api.addEventListener({
//     name: 'keyback'
//   }, function (ret, err) {
//     api.toast({
//       msg: '再按一次返回键退出' + api.appName,
//       duration: 2000,
//       location: 'bottom'
//     })
//     api.addEventListener({
//       name: 'keyback'
//     }, function (ret, err) {
//       api.closeWidget({
//         id: api.appId,//这里改成自己的应用ID
//         retData: { name: 'closeWidget' },
//         silent: true
//       })
//     })
//     setTimeout(function () {
//       exitApp()
//     }, 3000)
//   })

// }
// // function fixIos7Bar_API(el, app) {
//   const strDM = api.systemType;
//   if (strDM === 'ios') {
//     const strSV = api.systemVersion;
//     const numSV = parseInt(strSV, 10);
//     const fullScreen = api.fullScreen;
//     console.log(numSV)
//     const iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
//     if (numSV >= 7 && fullScreen == 'false' && iOS7StatusBarAppearance) {
//       el.style.paddingTop = '20px';
//       app.style.top = "20px";
//       app.style.bottom = '0px';
//       app.style.height = "auto"
//     }
//     else {
//       el.style.paddingTop = api.safeArea.top + 'px';
//       app.style.top = api.safeArea.top + 'px';
//       app.style.bottom = '0px';
//       app.style.height = "auto"
//     }
//   }
// }
// function fixStatusBar_API(el, app) {
//   const sysType = api.systemType;
//   if (sysType == 'ios') {
//     fixIos7Bar_API(el, app);
//   } else if (sysType == 'android') {
//     let ver = api.systemVersion;
//     ver = parseFloat(ver);
//     if (ver >= 4.4) {
//       el.style.paddingTop = '25px';
//       app.style.top = "25px";
//       app.style.bottom = '0px';
//       app.style.height = "auto"
//     }
//   }
// };


// function fixStatusBar_API(el, app) {
//    if (api != undefined && api != null) {
//     api.setStatusBarStyle({
//       style: 'dark',
//       color: '#fff'
//     });
//     el.style.paddingTop = localStorage.getItem("hheight");

//     app.style.top =  localStorage.getItem("hheight");
//     app.style.bottom = '0px';
//     app.style.height = "auto"

//   }
// }
