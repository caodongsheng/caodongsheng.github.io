<template>
    
</template>

<script>
      export default{
 data:function(){
     return{
     }
 },
mounted() {
  var that=this
    function getUrlParam(name, href, noDecode) {
      var re = new RegExp('(?:\\?|#|&)' + name + '=([^&]*)(?:$|&|#)', 'i'),
      m = re.exec(href);
      var ret = m ? m[1] : '';
      return !noDecode ? decodeURIComponent(ret) : ret;
    }
    var ycode=getUrlParam("NumCode",window.location.href,false);
    that.$router.push({
      path: '/inviteislog',query:{ycode:ycode}
    })
/*    // var appId="wxf8cce3dbe0edfca3";//车行互助
    var appId="wx9aeccc5da4c9194b";//帮一把啊
    var BaseUrl="http://wx.fpmai.com";
    var islogUrl="/inviteislog?ycode="+getUrlParam("NumCode",window.location.href,false);
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        appId +
        "&redirect_uri=" +
        encodeURIComponent(BaseUrl+"/uts/user/wxLogin?urls="+ islogUrl ) +
        "&response_type=code&scope=snsapi_userinfo&connect_redirect=1#wechat_redirect"*/
  },     
}
</script>
