<template>
  <div>
<!--     <div>
      <p class="hur">返回</p>
      <a class="paarit" >相册</a> 
      <button @click="aa">aa</button>

    </div>  -->

  </div>
</template>


<script>

import axios from 'axios'
import wx from 'weixin-js-sdk'

export default{
  data:function(){
     return{
        url:""
     }
  },  
  methods:{
     },
  mounted:function() {  
    var that=this 
    //2.调用微信搜扫一扫方法
    var lineLink=window.location.href.split('#')[0];
    this.$http.post('uts/wechat/makeWXTicket', { url: lineLink }).then(function(data){
      console.log(resouse)
      if (resouse.status == 200) {      
        wx.config({
          debug: false,
          appId: data.data.appid, //appId通过微信服务号后台查看,公众号的唯一标识
          timestamp: data.data.timestamp, //生成签名的时间戳
          nonceStr: data.data.nonceStr, //生成签名的随机字符串
          signature: data.data.signature, //签名
          //jsApiList: ['scanQRCode'],//要调用的微信接口
          jsApiList: [ 
            'scanQRCode',
            'translateVoice'
          ],
        });
        wx.ready(function() {
          wx.checkJsApi({
            jsApiList: ['scanQRCode'],
            success: function (res) {
            }
          });
          wx.scanQRCode({   
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              //sessionStorage.setItem('saomiao_result',result);
              //其它网页调用二维码扫描结果： 
             // var resultG=sessionStorage.getItem('saomiao_result');
            function getUrlParam(name, href, noDecode) {
              var re = new RegExp('(?:\\?|#|&)' + name + '=([^&]*)(?:$|&|#)', 'i'),
              m = re.exec(href);
              var ret = m ? m[1] : '';
              return !noDecode ? decodeURIComponent(ret) : ret;
            }
              var ycode=getUrlParam("NumCode",result,false);
              if(ycode==""){
                alert("该二维码为无效二维码信息")
                window.location.href="https://wx.shfp1017.org.cn/m/index.html"
              }else{
                // that.setCookie("ycode",ycode);
                //  that.getCookie("ycode")
                that.$router.push({
                  path: '/inviteislog',query:{ycode:ycode}
                })  
              }  
            }
          });
        });
      }
      wx.error(function(res){
      });
    })
  }
}
</script>
<style >

</style>
