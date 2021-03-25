<template>
  <div>
    <div>

    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import wx from 'weixin-js-sdk'
  export default{
    data:function(){
      return{
        // userId:'',
        // follow_subscribe:'',
        // openID:'',//微信用户在商户对应appid下的唯一标识
        // userid:'',//社会扶贫网用户唯一标识
        // unionid:'',//微信用户唯一标识
        // nickName:'',//微信用户昵称
        // thirdHeadPath:'',
        // thirdNickname:'',
      }
    },
    methods:{
      setCookie(name, value) {
        var Days = 3;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      },
      getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return null;
      },
      wxInit:function(Num){ //wx.config Num：{1=closeWindow}
        let lineLink=window.location.href.split('#')[0]
        //接口
        this.$http.post('uts/wechat/makeWXTicket', { url: lineLink }).then(function (data){
          wx.config({
            debug: false, ////生产环境需要关闭debug模式
            appId: data.data.appid, //appId通过微信服务号后台查看,公众号的唯一标识
            timestamp: data.data.timestamp, //生成签名的时间戳
            nonceStr: data.data.nonceStr, //生成签名的随机字符串
            signature: data.data.signature, //签名
            jsApiList: ['closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function(){
            wx.checkJsApi({
              jsApiList: ['closeWindow',],
              success: function (res) {
                if(Num==1){
                  wx.closeWindow();
                }
              }
            });
          })
        })
      },
      getUrlParam: function(name, href, noDecode) {
        var re = new RegExp('(?:\\?|#|&)' + name + '=([^&]*)(?:$|&|#)', 'i'),
            m = re.exec(href);
        var ret = m ? m[1] : '';
        return !noDecode ? decodeURIComponent(ret) : ret;
      },
      thirdLogin(oid,uid){
        let self = this;
        this.$http.post('uts/user/thirdLogin',{username:oid,uid:uid,type:4}).then(res=>{
          console.log(res)
          self.setCookie('userid',res.data.user.id);
          self.setCookie('nickName',res.data.user.nick_name);
          self.setCookie('thirdHeadPath',res.data.user.user_pic);
          self.setCookie('thirdNickname',res.data.user.user_pic);
        })
      },
      ifFollow(open_ID){ 
        let self = this;
        console.log(open_ID)
        this.$http.post('/uts/invitationCode/chackNopublic',{openid:open_ID}).then(function(fres){
          console.log(fres)
          if(!fres.data){
            alert("请先关注“社会扶贫”公众号，再进行扫码注册")
            // 初始化微信jdk,并直接执行关闭页面
            self.wxInit(1)
          } 
          else if(fres.data){
            //关注判断二维码是否失效
            // var syou= self.getCookie("ycode")
            var syou= self.$route.query.ycode
            self.$http.post("uts/invitationCode/getMsgByCode",{invitationCode:syou}).then((result) => {
              console.log(result)
              if(result.code=="UTSI0000"){  
                if(result.data.validType==0){
                  alert("该二维码为无效二维码信息 请更换")
                  window.location.href="https://wx.fpmai.com/m/index.html?"                
                }
                if(result.data.validType==1){
                  //绑定手机号
                  self.$http.post("uts/ccbUser/getUserInfo").then(function(res){
                    if(res.code=='UTSI0000'){
                      if(res.data.mobile==null||res.data.mobile=='null'||res.data.mobile==''){
                        self.setCookie('mobile',1)
                        self.$router.push({path: '/inviteRegister',query:{ycode:syou}})
                      }else{
                        self.setCookie('mobile',2)
                        window.location.href="https://wx.fpmai.com/m/index.html";
                      }
                    }
                  }) 
                }
              }
              else if(result.code=="UTSIC003"){  
                alert("该二维码为无效二维码信息 请更换")
                window.location.href="https://wx.fpmai.com/m/index.html"
              }
              else if(result.code=="UTSIC002"){  
                alert("邀请码不存在")
                window.location.href="https://wx.fpmai.com/m/index.html"
              }
              else{
                console.log('wrong')
              }
            })
          }
        })
      }
    },
    mounted:function() {
      if (!this.isWeixinCient()) {
        alert("请使用微信浏览器")
        window.close();
  　　};
      var openid = this.getUrlParam("openid",window.location.href,false);
      var unionid = this.getUrlParam("unionid",window.location.href,false);
      this.thirdLogin(openid,unionid);
      this.ifFollow(openid);//是否关注公众号
      
      // var open_ID = 'wxf8cce3dbe0edfca3'//车行互助公众号ID
      //获取code码以后的判断
      /*var code=this.getUrlParam("code",window.location.href,false)
      if(code==''||code==null){
        var url=window.location.href;//本页面的地址
        var squrl=this.getWechatUrlHand(url);//调用授权
        window.location.replace(squrl);
      }else if(code!=null&&code!=''){
        this.getOpenID(code);//获取openido
      }      */
      var ycode = this.getUrlParam("ycode",window.location.href,false);
      this.setCookie('ycode',ycode);
      this.setCookie('openid',openid);
      this.setCookie('unionid',unionid);
    }
  }
</script>