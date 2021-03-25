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


Vue.use(VueClipboard)
/* 引导页 */
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })
import VConsole from 'vconsole/dist/vconsole.min.js'  //打印错误信息，不需要的时候注释
if(process.env.ENV_CONFIG != 'prod'){
  let vConsole = new VConsole() // 初始化               //打印错误信息，不需要的时候注释
  Vue.use(vConsole)      
}
Vue.prototype.H5PAY_URL = process.env.H5PAY_URL,
  Vue.prototype.qs = qs
Vue.config.productionTip = false
// 微信的url
Vue.prototype.WinXinHost = process.env.WX_HOST
// 百度统计
// Vue.use(ba, '9098f539d4f34c1808700217ea04ccb1')
// 正式环境
Vue.use(ba, 'ab357cfb69685608a784f72d9c11d20e')

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
  attempt: 1
})
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
//FastClick.attach(document.body)
//Vue.prototype.$console = console
router.afterEach((to,from)=>{
  let ua = window.navigator.userAgent.toLowerCase();
  let isWeiXin = false;
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    isWeiXin = true;
  }
  if(isWeiXin){
    let url = window.location.href.split("#")[0];
    // routeurl =obj.link
    Axios.post('uts/wechat/makeWXTicket', { url: url })
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
          let self = newvue;
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
          var obj = {
            title:"中国社会扶贫网",
            desc:"中国社会扶贫网，让爱在阳光下链接",
            link: process.env.WX_HOST + '#' + location.href.split('#')[1]
          }
          wx.onMenuShareAppMessage({
            title: obj.title,
            desc: obj.desc,
            link: shareUrlParamsFilter(obj.link),
            imgUrl:  process.env.H5PAY_URL+"static/appimg/share_icon.png",
            trigger: function (res) {
              // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
              // alert('用户点击发送给朋友');
            },
            success: function (res) {
              
            },
            cancel: function (res) {
             // alert('已取消');
            },
            fail: function (res) {
            //  alert(JSON.stringify(res));
            }
          });
  
  
          // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
          wx.onMenuShareTimeline({
            title: obj.title,
            desc: obj.desc,
            link: shareUrlParamsFilter(obj.link),
            imgUrl:  process.env.H5PAY_URL+"static/appimg/share_icon.png",
            trigger: function (res) {
              // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
              //alert('用户点击分享到朋友圈');
            },
            success: function (res) {
            
            },
            cancel: function (res) {
           //   alert('已取消');
            },
            fail: function (res) {
            //  alert(JSON.stringify(res));
            }
          });
  
          // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
          wx.onMenuShareQQ({
            title: obj.title,
            desc: obj.desc,
            link: shareUrlParamsFilter(obj.link),
            imgUrl: process.env.H5PAY_URL+"static/appimg/share_icon.png",
            trigger: function (res) {
              // alert('用户点击分享到QQ');
            },
            complete: function (res) {
              // alert(JSON.stringify(res));
            },
            success: function (res) {
              
            },
            cancel: function (res) {
             // alert('已取消');
            },
            fail: function (res) {
             // alert(JSON.stringify(res));
            }
          });
          // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
          wx.onMenuShareWeibo({
            title: obj.title,
            desc: obj.desc,
            link: shareUrlParamsFilter(obj.link),
            imgUrl:  process.env.H5PAY_URL+"static/appimg/share_icon.png",
            trigger: function (res) {
              //   alert('用户点击分享到微博');
            },
            complete: function (res) {
              // alert(JSON.stringify(res));
            },
            success: function (res) {
              
            },
            cancel: function (res) {
             // alert('已取消');
            },
            fail: function (res) {
            //  alert(JSON.stringify(res));
            }
          });
        }
        )
})
  }
})
router.beforeEach(({ meta, path }, from, next) => {
  const { auth = false } = meta
  const isLogin = Boolean(localStorage.getItem('token')) // true用户已登录， false用户未登录
  if (auth && !isLogin && path !== '/login') { // 要求权限并且未登录且地址不是登录（否则会死循环）转向登录
    let to = { path: '/login' }
    return next(to)
  }

  let ua = window.navigator.userAgent.toLowerCase();
  let isWeiXin = false;
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    isWeiXin = true;
  }
  if(isWeiXin&&path == '/login'){
    replaceHref();
    return next(false);
  }

  if (isLogin) { // 如果有token且用户login_name为undefined，先加载用户再跳转
    store.dispatch('getUser', { _this: Axios }).then(res => {
      return next()
    }).catch((err) => {
      console.log('加载用户出错了！')
    })
  }
  if (path) {
    _hmt.push(['_trackPageview', '/#' + path])
  }
  next()
})


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
let MobileDetect = require('./util/mobile-detect');
let md = new MobileDetect(window.navigator.userAgent);
let u = navigator.userAgent
Vue.prototype.isios = function(){
  if (md.os()=="iOS") {
      return true;
     }else{
       return false;
     }
}
Vue.prototype.isapp = function(){
  if (md.os()=="iOS"||md.os()=="AndroidOS") {
      return true;
     }else{
       return false;
     }
};
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
  console.log(JSON.stringify(obj)+"2222")
  let self = this;
  let url = window.location.href.split("#")[0];
  let imgUrl = process.env.H5PAY_URL+"static/appimg/share_icon.png";
  if(obj.link.includes("loveNeed")){
    imgUrl = obj.imgUrl
  }
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
          imgUrl:  imgUrl,
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
               // alert('已分享');
              })
            }
            else {
             // alert('已分享');
            }
          },
          cancel: function (res) {
           // alert('已取消');
          },
          fail: function (res) {
          //  alert(JSON.stringify(res));
          }
        });


        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
          title: obj.title,
          desc: obj.desc,
          link: shareUrlParamsFilter(obj.link),
          imgUrl: imgUrl,
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
           //     alert('已分享');
              })
            }
            else {
           //   alert('已分享');
            }
          },
          cancel: function (res) {
         //   alert('已取消');
          },
          fail: function (res) {
          //  alert(JSON.stringify(res));
          }
        });

        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareQQ({
          title: obj.title,
          desc: obj.desc,
          link: shareUrlParamsFilter(obj.link),
          imgUrl: imgUrl,
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
              //  alert('已分享');
              })
            }
            else {
             // alert('已分享');
            }
          },
          cancel: function (res) {
           // alert('已取消');
          },
          fail: function (res) {
           // alert(JSON.stringify(res));
          }
        });
        // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareWeibo({
          title: obj.title,
          desc: obj.desc,
          link: shareUrlParamsFilter(obj.link),
          imgUrl:  imgUrl,
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
             //   alert('已分享');
              })
            }
            else {
             // alert('已分享');
            }
          },
          cancel: function (res) {
           // alert('已取消');
          },
          fail: function (res) {
          //  alert(JSON.stringify(res));
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


let newvue = new Vue({
  router,
  store,
  created: function () {
    FastClick.attach(document.body)
  },
  render: h => h(App)
}).$mount('#app')
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
let curl=window.location.href
if (newvue.isWeixinCient()) {
    if(curl.indexOf('/cmsDetail')>-1 || curl.indexOf('/cmsArticleList')>-1){
      console.log('打开微信')
      
    }else{
      replaceHref();
    }
    // if(curl.indexOf('/cmsDetail')<0 || curl.indexOf('/cmsArticleList')<0){
    //   console.log('打开微信')
    //   replaceHref();
    // }else{
      
    // }
}

function getProvinceArea (){

  // var area = {name: "江西省",id:"360000000000",type:1,provinceArea:"360000000000",provinceName:"江西省"}
  let asd=getUrlParam('cooperation',window.location.href,false)||2
  var area = {cooperation:asd ,name: getUrlParam('name',window.location.href,false),id:getUrlParam('id',window.location.href,false),type:Number(getUrlParam('type',window.location.href,false)),provinceArea:getUrlParam('provinceArea',window.location.href,false),provinceName:getUrlParam('provinceName',window.location.href,false)}
  // 520200000000
  newvue.$store.commit('cityCheck',area)
}
if(getUrlParam('name',window.location.href,false)){
  getProvinceArea()
}else{

  var storageName=localStorage.getItem('city')
  // if(storageName){
  //   newvue.$store.commit('cityCheck',JSON.parse(localStorage.getItem('city')))
  // }else{
    // var area = {cooperation:2,name: "贵州省",id:"520000000000",type:1,provinceArea:"520000000000",provinceName:"贵州省"}
    var area = {cooperation:2,name: "全国",id:"",type:1,provinceArea:"",provinceName:"全国"}
    newvue.$store.commit('cityCheck',area)
  // }
}
// getProvinceArea()
function replaceHref(){
  console.log(window.location.href)
  let code = getUrlParam("code", window.location.href, false)
  // let unionid = localStorage.getItem("unionid")
  // let openid = localStorage.getItem("openid")
  let unionid = getUrlParam("unionid", window.location.href, false)
  let openid = getUrlParam("openid", window.location.href, false)
  if (unionid == '' || unionid == null) {//打开分享链接的情况下
    if (code == '' || code == null) {
      let url = window.location.href;//本页面的地址
      let squrl = getWechatUrlHand(url);//调用授权
   
      window.location.replace(squrl);
    } else {
      // if(localStorage.getItem('openid')==null || localStorage.getItem('openid')=='' || localStorage.getItem('openid') ==undefined){
        getOpenID(code);//授权之后有code了调用wxlogin获取unionid和openid
      // }
    }
  }
  else{
    console.log("ff")//直接打开新版微信的情况
  //  checkWXAndLogin()
  }
}
function getUrlParam(name, href, noDecode) {
  var re = new RegExp('(?:\\?|#|&)' + name + '=([^&]*)(?:$|&|#)', 'i'),
    m = re.exec(href);
  var ret = m ? m[1] : '';
  return !noDecode ? decodeURIComponent(ret) : ret;
}
function getWechatUrlHand(url) {//手动授权地址
  // var s="https://wx.shfp1017.org.cn/pages/QRcode/dist/index.html";
  var k = window.location.href;
  var redirectUrl = encodeURIComponent(k);
  // var appId="wxf8cce3dbe0edfca3";//车行互助呢
  var appId = process.env.WXAPPID;//帮一把啊
  return "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri=" + redirectUrl + "&scope=snsapi_userinfo&response_type=code&state=wxh5267689457315#wechat_redirect";
}

function setCookie (name, value) {
  if (value) {
    var Days = 365
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  }
}
function getOpenID(code) {
  // newvue.$http.post('uts/user/wxLogin', { code: code, states: 'invite' }).then(function (res) {
  //   if (res.code == "UTSI0000") {
  //     let openid = res.data.substring(28, 56);
  //     let unionid = res.data.substring(0, 28);
  //     window.location.replace(newvue.WinXinHost + '?unionid=' + unionid + '&openid=' + openid + "#" + window.location.href.split("#")[1])
    
  //       checkWXAndLogin();
     
  //   } else {
  //     let url = window.location.href;//本页面的地址
  //     let squrl = getWechatUrlHand(url);//调用授权
  //     window.location.replace(squrl);
  //   }
  // })
  axioss.get(process.env.BASE_API+'uts/invitationCode/wxAuthorization?code='+code,
    {headers:{clientType:3}}).then(function (response) {
      let res = response.data;
      if (res.code == 'UTSI0000') {
        let openid = res.data.openid;
        let unionid = res.data.unionid;
      //  window.location.replace(newvue.WinXinHost +"#" + window.location.href.split("#")[1] +'?unionid=' + unionid + '&openid=' + openid )
      
        window.localStorage.setItem('openid', openid)
        window.localStorage.setItem('userid', res.data.userId)
        // window.localStorage.setItem('token', res.data.logintoken)
        window.localStorage.setItem('token', res.data.jhToken)
        setCookie('openid',openid)
        setCookie('userid',res.data.userId)
        store.dispatch('getUser', { _this: Axios })
      
      } else {
        newvue.showToast('','text',res.msg,'20em','','middle');
     
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
      // window.localStorage.setItem('token', response.data.logintoken)
      window.localStorage.setItem('token', response.data.jhToken)
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

