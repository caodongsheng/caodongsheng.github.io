<template>
  <div class="com-share">

    <popup
      v-model="show"
      is-transparent
    >
      <!--分享-->
      <div class="share">
        <div class="share-content">
          <divider>分享给好友</divider>
          <ul class="clearfix">
            <li @click="shareToWXFirends()"><img src="../../../static/appimg/share/weixin.png"></li>
            <li @click="shareToWXTimeline()"><img src="../../../static/appimg/share/pengyouquan.png"></li>
            <li @click="shareToWB()"><img src="../../../static/appimg/share/weibo.png"></li>
            <li @click="shareToQQ()"><img src="../../../static/appimg/share/QQ.png"></li>
          </ul>
        </div>
        <x-button @click.native="show = false">取消</x-button>
      </div>
    </popup>

    <!--<div v-show="show">-->
    <!--<div class="overlayer"></div>-->
    <!--&lt;!&ndash;分享&ndash;&gt;-->
    <!--<div class="share">-->
    <!--<div class="share-content">-->
    <!--<divider>分享给好友</divider>-->
    <!--<ul>-->
    <!--<li><a href=""> <img src="../../../static/appimg/share/weixin.png"></a></li>-->
    <!--<li><a href=""><img src="../../../static/appimg/share/pengyouquan.png"></a></li>-->
    <!--<li><a href=""><img src="../../../static/appimg/share/weibo.png"></a></li>-->
    <!--<li><a href=""><img src="../../../static/appimg/share/QQ.png"></a></li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--<div class="stopshare" @click="toCloseShare">取消</div>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import { Divider, Popup, XButton } from "vux";
import wx from "weixin-js-sdk";
import shareUrlParamsFilter from '@/util/filter.js';

export default {
  props: ["vos"],
  components: {
    Popup,
    Divider,
    XButton
  },
  data() {
    return {
      // isHtml5: true,
      show: false,
      shareTitle: "",
      shareContent: "",
      shareImg: "",
      demandId: "",
      appid: ""
    };
  },
  methods: {
    // toCloseShare () {
    //   this.show = false
    // },
    toShare() {
      this.getAppId();
      this.show = true;
    },
    async getAppId() {
      let _this = this;
      await this.$http.post("uts/wechat/makeWXTicket").then({
        url:_this.WX_HOST
        },function(data) {
        _this.appid = data.data.appid;
      });
    },
    // initShareData () {
    //   this.shareTitle = `中国社会扶贫网，让爱在阳光下链接-${
    //     this.vos.region_name.indexOf('县') > 0
    //       ? this.vos.region_name.split('县')[0] + '县'
    //       : this.vos.region_name.split('市')[0] + '市'
    //   }的需求${this.vos.demand_title}`
    //   this.shareContent = this.vos.demand_coment
    //   this.shareImg = this.vos.imgUrl[0]
    //   this.demandId = this.vos.id
    // },
    shareToWXFirends() {
      let self = this;
      // let shareTitle1 = this.shareTitle
      // let shareContent1 = this.shareContent
      // let shareUrl = this.WinXinHost + '#' + location.href.split('#')[1]
      // let downloadImg = this.shareImg
      let shareTitle1 = this.vos.title;
      let shareContent1 = this.vos.desc;
      let shareUrl = shareUrlParamsFilter(this.vos.link)
      let downloadImg = this.vos.imgUrl;
      // var sharedImg = "widget://image/share_icon.png";
      const tyy = "http://zgshfp.oos-website-cn.oos.ctyunapi.cn";
      let url = shareUrl;
      let shareInfo = '{"picurl":"' + this.H5PAY_URL + '/appia630/images/helpRecord/offline_share.jpg","title":"' + shareTitle1 + '","text":"' + shareContent1 + '","type":"' + 6 + '","url":"' + url + '","ischange":' + '"2"' + '}'
       window.share.getShareDetailView(shareInfo);
      // let wx = api.require("wx");
      // if (downloadImg.substr(0, tyy.length) == tyy) {
      //   api.download(
      //     {
      //       url: downloadImg,
      //       savePath:
      //         "fs://shareImages/" +
      //         downloadImg.substr(downloadImg.lastIndexOf("/") + 1),
      //       report: true,
      //       cache: true,
      //       allowResume: true
      //     },
      //     function(ret, err) {
      //       if (ret.state == 1) {
      //         // 下载成功
      //         // sharedImg =
      //         //   "fs://shareImages/" +
      //         //   downloadImg.substr(downloadImg.lastIndexOf("/") + 1);
      //          sharedImg = "widget://image/share_icon.png";
      //       } else {
      //         // 图片下载失败
      //         sharedImg = "widget://image/share_icon.png";
      //       }
      //       console.log(sharedImg+"aaaaaaaaaa")
      //       wx.isInstalled(function(ret, err) {
      //         if (ret.installed) {
      //           wx.shareWebpage(
      //             {
      //               apiKey: "",
      //               scene: "session",
      //               title: shareTitle1,
      //               description: shareContent1,
      //               thumb: sharedImg,
      //               contentUrl: shareUrl
      //             },
      //             function(ret, err) {
      //               if (ret.status) {
      //                 let umAnalysis = api.require("umAnalysis");
      //                 let id = self.vos.demandId;
      //                 umAnalysis.onEventJson(
      //                   {
      //                     eventid: "sharetowxfriends",
      //                     eAttribute: {
      //                       id: id
      //                     }
      //                   },
      //                   function(ret, err) {
                       
      //                   }
      //                 );
      //                 api.toast({ msg: "分享成功" });
      //                 if (self.vos.demandId !== ""&&self.G('token')) {
      //                   self.$http.post("hts/myDemand/maidian", {
      //                     demandId: self.vos.demandId,
      //                     token: self.G("token")
      //                   });
      //                 }
      //               } else {
      //                 if (err.code == 2) {
      //                   api.toast({
      //                     msg: "分享已取消"
      //                   });
      //                 } else {
      //                   api.toast({
      //                     msg: "分享失败" + err.code
      //                   });
      //                 }
      //               }
      //             }
      //           );
      //         } else {
      //           api.toast({ msg: "当前设备未安装微信客户端" });
      //         }
      //       });
      //     }
      //   );
      // } else {
      //   wx.isInstalled(function(ret, err) {
      //     console.log(sharedImg+"bbbbbbbbbb")
      //     if (ret.installed) {
      //       wx.shareWebpage(
      //         {
      //           apiKey: "",
      //           scene: "session",
      //           title: shareTitle1,
      //           description: shareContent1,
      //           thumb: sharedImg,
      //           contentUrl: shareUrl
      //         },
      //         function(ret, err) {
      //           if (ret.status) {
      //             api.toast({ msg: "分享成功" });
      //             let umAnalysis = api.require("umAnalysis");
      //             let id = self.vos.demandId;
      //             umAnalysis.onEventJson(
      //               {
      //                 eventid: "sharetowxfriends",
      //                 eAttribute: {
      //                   id: id
      //                 }
      //               },
      //               function(ret, err) {
                 
      //               }
      //             );
      //             if (self.vos.demandId !== ""&&self.G('token')) {
      //               self.$http.post("hts/myDemand/maidian", {
      //                 demandId: self.vos.demandId
      //                 //token: self.G("token")
      //               });
      //             }
      //           } else {
      //             if (err.code == 2) {
      //               api.toast({
      //                 msg: "分享已取消"
      //               });
      //             } else {
      //               api.toast({
      //                 msg: "分享失败" + err.code
      //               });
      //             }
      //           }
      //         }
      //       );
      //     } else {
      //       api.toast({ msg: "当前设备未安装微信客户端" });
      //     }
      //   });
      // }
      // } else {
      //   this.getWXConfig(function() {
      //     wx.ready(function() {
      //       wx.onMenuShareAppMessage({
      //         title: shareTitle1,
      //         desc: shareContent1,
      //         imgUrl: sharedImg,
      //         link: shareUrl,
      //         success: function() {
      //           self.showToast('', 'text', '分享成功', '20em', '', 'middle')

      //           self.$http.post('hts/myDemand/maidian', {
      //             demandId: self.vos.demandId,
      //             token: self.G('token')
      //           })
      //         },
      //         cancel: function() {
      //           self.showToast('', 'text', '取消分享', '20em', '', 'middle')
      //         }
      //       })
      //     })
      //   })
      // }
      this.show = false;
    },
    shareToWXTimeline() {
      let self = this;
      // let shareTitle1 = this.shareTitle
      // let shareContent1 = this.shareContent
      // let shareUrl = this.WinXinHost + '#' + location.href.split('#')[1]
      // let downloadImg = this.shareImg
      // let sharedImg = ''
      let shareTitle1 = this.vos.title;
      let shareContent1 = this.vos.desc;
        let shareUrl = shareUrlParamsFilter(this.vos.link)

      let downloadImg = this.vos.imgUrl;
      var sharedImg = "widget://image/share_icon.png";
      const tyy = "http://zgshfp.oos-website-cn.oos.ctyunapi.cn";
      let wx = api.require("wx");
      if (downloadImg.substr(0, tyy.length) == tyy) {
        api.download(
          {
            url: downloadImg,
            savePath:
              "fs://shareImages/" +
              downloadImg.substr(downloadImg.lastIndexOf("/") + 1),
            report: true,
            cache: true,
            allowResume: true
          },
          function(ret, err) {
            if (ret.state === 1) {
              // 下载成功
              // sharedImg =
              //   "fs://shareImages/" +
              //   downloadImg.substr(downloadImg.lastIndexOf("/") + 1);
               sharedImg = "widget://image/share_icon.png";
            } else {
              // 图片下载失败
              sharedImg = "widget://image/share_icon.png";
            }

            wx.isInstalled(function(ret, err) {
              if (ret.installed) {
                wx.shareWebpage(
                  {
                    apiKey: "",
                    scene: "timeline",
                    title: shareTitle1,
                    description: shareContent1,
                    thumb: sharedImg,
                    contentUrl: shareUrl
                  },
                  function(ret, err) {
                    if (ret.status) {
                      api.toast({ msg: "分享成功" });
                      let umAnalysis = api.require("umAnalysis");
                      let id = self.vos.demandId;
                      umAnalysis.onEventJson(
                        {
                          eventid: "sharetowxtimeline",
                          eAttribute: {
                            id: id
                          }
                        },
                        function(ret, err) {
                   
                        }
                      );
                      if (self.vos.demandId !== ""&&self.G('token')) {
                        self.$http.post("hts/myDemand/maidian", {
                          demandId: self.vos.demandId,
                          token: self.G("token")
                        });
                      }
                    } else {
                      if (err.code == 2) {
                        api.toast({
                          msg: "分享已取消"
                        });
                      } else {
                        api.toast({
                          msg: "分享失败" + err.code
                        });
                      }
                    }
                  }
                );
              } else {
                api.toast({ msg: "当前设备未安装微信客户端" });
              }
            });
          }
        );
      } else {
        wx.isInstalled(function(ret, err) {
          if (ret.installed) {
            wx.shareWebpage(
              {
                apiKey: "",
                scene: "timeline",
                title: shareTitle1,
                description: shareContent1,
                thumb: sharedImg,
                contentUrl: shareUrl
              },
              function(ret, err) {
                if (ret.status) {
                  api.toast({ msg: "分享成功" });
                  let umAnalysis = api.require("umAnalysis");
                  let id = self.vos.demandId;
                  umAnalysis.onEventJson(
                    {
                      eventid: "sharetowxtimeline",
                      eAttribute: {
                        id: id
                      }
                    },
                    function(ret, err) {
                   
                    }
                  );
                  if (self.vos.demandId !== ""&&self.G('token')) {
                    self.$http.post("hts/myDemand/maidian", {
                      demandId: self.vos.demandId,
                      token: self.G("token")
                    });
                  }
                } else {
                  if (err.code == 2) {
                    api.toast({
                      msg: "分享已取消"
                    });
                  } else {
                    api.toast({
                      msg: "分享失败" + err.code
                    });
                  }
                }
              }
            );
          } else {
            api.toast({ msg: "当前设备未安装微信客户端" });
          }
        });
      }

      // } else {
      // this.getWXConfig(function() {
      //   wx.ready(function() {
      //     wx.onMenuShareTimeline({
      //       title: shareTitle1,
      //       desc: shareContent1,
      //       imgUrl: sharedImg,
      //       link: shareUrl,
      //       trigger: function(res) {},
      //       success: function() {
      //         self.showToast('', 'text', '分享成功', '20em', '', 'middle')

      //         self.$http.post('hts/myDemand/maidian', {
      //           demandId: self.vos.demandId,
      //           token: self.G('token')
      //         })
      //       },
      //       cancel: function() {
      //         self.showToast('', 'text', '取消分享', '20em', '', 'middle')
      //       },
      //       fail: function(res) {
      //         self.showToast('', 'text', JSON.stringify(res), '20em', '', 'middle')
      //       }
      //     })
      //   })
      // })
      // if (typeof WeixinJSBridge != 'undefined') {
      //   WeixinJSBridge.invoke(
      //     'shareTimeline',
      //     {
      //       appid: 'wxf8cce3dbe0edfca3', //appid 设置空就好了。
      //       img_url: sharedImg, //分享时所带的图片路径
      //       img_width: '120', //图片宽度
      //       img_height: '120', //图片高度
      //       link: shareUrl, //分享附带链接地址
      //       desc: shareContent1, //分享内容介绍
      //       title: shareTitle1
      //     },
      //     function(res) {
      //       alert(JSON.stringify(res))
      //       self.showToast('', 'text', '分享成功', '20em', '', 'middle')

      //       self.$http.post('hts/myDemand/maidian', {
      //         demandId: self.vos.demandId,
      //         token: self.G('token')
      //       })

      //     }
      //   )

      // }
      // }
      this.show = false;
    },
    shareToWB() {
      let self = this;
      // let shareContent1 = this.shareContent
      // let downloadImg = this.shareImg
      // var sharedImg = ''
      let shareTitle1 = this.vos.title;
      let shareContent1 = this.vos.desc;
       let shareUrl = shareUrlParamsFilter(this.vos.link)

      let downloadImg = this.vos.imgUrl;
      var sharedImg = "";
      // if (!this.isHtml5) {
      api.download(
        {
          url: downloadImg,
          savePath:
            "fs://shareImages/" +
            downloadImg.substr(downloadImg.lastIndexOf("/") + 1),
          report: true,
          cache: true,
          allowResume: true
        },
        function(ret, err) {
          if (ret.state == 1) {
            // 下载成功
            sharedImg =
              "fs://shareImages/" +
              downloadImg.substr(downloadImg.lastIndexOf("/") + 1);
          } else {
            // 图片下载失败
            sharedImg = "widget://image/share_icon.png";
          }
          var weiboPlus = api.require("weiboPlus");
          weiboPlus.isInstalled(function(ret) {
            if (ret.status) {
              weiboPlus.shareImage(
                {
                  text: shareContent1,
                  imageUrl: sharedImg
                },
                function(ret, err) {
                  if (ret.status) {
                    api.toast({ msg: "分享成功" });
                    let umAnalysis = api.require("umAnalysis");
                    let id = self.vos.demandId;
                    umAnalysis.onEventJson(
                      {
                        eventid: "sharetoweibo",
                        eAttribute: {
                          id: id
                        }
                      },
                      function(ret, err) {
                      
                      }
                    );
                    if (self.vos.demandId !== ""&&self.G('token')) {
                      self.$http.post("hts/myDemand/maidian", {
                        demandId: self.vos.demandId,
                        token: self.G("token")
                      });
                    }
                  } else {
                    if (err.code == 1) {
                      api.toast({
                        msg: "分享已取消"
                      });
                    } else {
                      api.toast({
                        msg: "分享失败" + err.code
                      });
                    }
                  }
                }
              );
            } else {
              api.toast({ msg: "未安装新浪微博客户端" });
            }
          });
        }
      );
      // } else {
      //   this.getWXConfig(function() {
      //     wx.ready(function() {
      //       wx.onMenuShareWeibo({
      //         title: shareTitle1,
      //         desc: shareContent1,
      //         imgUrl: sharedImg,
      //         link: shareUrl,
      //         success: function() {
      //           self.showToast('', 'text', '分享成功', '20em', '', 'middle')

      //           self.$http.post('hts/myDemand/maidian', {
      //             demandId: self.vos.demandId,
      //             token: self.G('token')
      //           })
      //         },
      //         cancel: function() {
      //           self.showToast('', 'text', '取消分享', '20em', '', 'middle')
      //         }
      //       })
      //     })
      //   })
      // }

      this.show = false;
    },
    shareToQQ() {
      let self = this;
      // let shareTitle1 = this.shareTitle
      // let shareContent1 = this.shareContent
      // let shareUrl = this.WinXinHost + '#' + location.href.split('#')[1]
      let shareTitle1 = this.vos.title;
      let shareContent1 = this.vos.desc;
           let shareUrl = shareUrlParamsFilter(this.vos.link)

      let downloadImg = this.vos.imgUrl;
      var sharedImg = "";
      console.log("1111111")
      // if (!this.isHtml5) {
      var qq = api.require("QQPlus");
      qq.installed(function(ret, err) {
         console.log("2222222")
        if (ret.status) {
           console.log("33333333")
          qq.shareNews(
            {
              url: shareUrl,
              title: shareTitle1,
              description: shareContent1,
              imgUrl:downloadImg,
              type: "QFriend"
            },
            function(ret, err) {
               console.log("4444444")
              if (ret.status) {
                 console.log("5555555555")
                api.toast({ msg: "分享成功" });
                let umAnalysis = api.require("umAnalysis");
                let id = self.vos.demandId;
                umAnalysis.onEventJson(
                  {
                    eventid: "sharetoqqfriends",
                    eAttribute: {
                      id: id
                    }
                  },
                  function(ret, err) {
                 
                  }
                );
                if (self.vos.demandId !== ""&&self.G('token')) {
                   console.log("7777777")
                  self.$http.post("hts/myDemand/maidian", {
                    demandId: self.vos.demandId,
                    token: self.G("token")
                  });
                }
              } else {
                 if (err.code==-1){
                console.log("6666666666")
                 }
                 else if (err.code == -4) {
                  api.toast({
                    msg: "分享已取消"
                  });
                } else {
                  api.toast({
                    msg: "分享失败"
                  });
                }
              }
            }
          );
        } else {
          api.toast({ msg: "未安装QQ客户端" });
        }
      });
      // } else {
      //   this.getWXConfig(function() {
      //     wx.ready(function() {
      //       wx.onMenuShareQQ({
      //         title: shareTitle1,
      //         desc: shareContent1,
      //         imgUrl: sharedImg,
      //         link: shareUrl,
      //         success: function() {
      //           self.showToast('', 'text', '分享成功', '20em', '', 'middle')

      //           self.$http.post('hts/myDemand/maidian', {
      //             demandId: self.vos.demandId,
      //             token: self.G('token')
      //           })
      //         },
      //         cancel: function() {
      //           self.showToast('', 'text', '取消分享', '20em', '', 'middle')
      //         }
      //       })
      //     })
      //   })
      // }
      this.show = false;
    }
    // getWXConfig(callback) {
    //   let url = location.href.split('#')[0] //url不能写死

    //   this.$http
    //     .post('uts/wechat/makeWXTicket', { url: url })
    //     .then(function(data) {
    //       wx.config({
    //         debug: true, ////生产环境需要关闭debug模式
    //         appId: data.data.appid, //appId通过微信服务号后台查看
    //         timestamp: data.data.timestamp, //生成签名的时间戳
    //         nonceStr: data.data.nonceStr, //生成签名的随机字符串
    //         signature: data.data.signature, //签名
    //         jsApiList: [
    //           //需要调用的JS接口列表
    //           'checkJsApi', //判断当前客户端版本是否支持指定JS接口
    //           'onMenuShareTimeline', //分享给好友
    //           'onMenuShareAppMessage', //分享到朋友圈
    //           'onMenuShareQQ',
    //           'onMenuShareWeibo'
    //         ]
    //       })
    //       callback()
    //     })
    //     .catch(function(err) {
    //       alert(JSON.stringify(err))
    //     })
    // }
  }
  // mounted() {
  //   try {
  //     if (api) {
  //       this.isHtml5 = false
  //     }
  //   } catch (err) {
  //     this.isHtml5 = true
  //   }
  // },
  // watch: {
  //   vos () {
  //     this.initShareData()
  //   }
  // }
};
</script>

<style scoped>
/*分享弹窗*/
.com-share >>> .vux-popup-dialog {
  position: fixed !important;
}
.share {
  margin: 10px;
  border-radius: 5px;
}

.share-content {
  background: #ffffff;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  padding: 20px 25px;
  margin-bottom: 10px;
}

.share-content ul {
  padding: 15px 0 0 0;
  display: flex;
  margin: 0 -20px;
}

.share-content li {
  flex: 1;
  text-align: center;
}

.share-content li img {
  width: 60%;
  margin: 0 auto;
}

.weui-btn {
  font-size: 16px;
  line-height: 42px;
  background: #fff;
}

.weui-btn:after {
  border: 0 none;
}

/****分享****/
/*.share {*/
/*width: 90%;*/
/*z-index: 100;*/
/*position: fixed;*/
/*left: 5%;*/
/*bottom: 10px;*/
/*text-align: center;*/
/*}*/

/*.share-content {*/
/*background: #ffffff;*/
/*height: 130px;*/
/*overflow: hidden;*/
/*border-radius: 20px;*/
/*position: relative;*/
/*z-index: 101;*/
/*}*/

/*.vux-divider {*/
/*color: #000000 !important;*/
/*padding: 20px 0 !important;*/
/*}*/

/*.share-content ul {*/
/*}*/

/*.share-content li {*/
/*width: 25%;*/
/*float: left;*/
/*text-align: center;*/
/*}*/

/*.share-content li img {*/
/*width: 60%;*/
/*margin: 0 auto;*/
/*}*/

/*.share-content p {*/
/*}*/

/*.stopshare {*/
/*background: #ffffff;*/
/*height: 50px;*/
/*line-height: 50px;*/
/*margin-top: 10px;*/
/*border-radius: 20px;*/
/*}*/
</style>
