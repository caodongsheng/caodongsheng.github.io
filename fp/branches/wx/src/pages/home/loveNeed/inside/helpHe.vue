<template>
  <div class="payWrapper">
    <!--头部-->
    <x-header :left-options="{backText: ''}" >帮助TA</x-header>
    <div class="box-withheader over-auto">
      <!--选择捐助金额-->
      <div class="payContainer">
        <div class="selectMoney">选择捐助金额</div>
        <flexbox
          :gutter="0"
          wrap="wrap"
          justify="space-between"
        >
          <flexbox-item
            :span="48/150 "
            v-for="item in navList"
            :key="item.text"
          >
            <div
              class="flex-demo"
              :class="{active:item.isActive}"
              @click="activeFun(item)"
            >¥{{item.text}}</div>
          </flexbox-item>
        </flexbox>
        <div class="weui-cell__bda">
          <x-input
            placeholder="输入自定义金额"
            v-model="inputMoney"
            ref="inputmoney"
            type="number"          
            @on-blur="changeData"
          ></x-input>
        </div>
      </div>
      <div
        style="position:absolute;top:0;left:0;width:100%;height:100%;background:#000; opacity:0.3;z-index:99999"
        v-if="payType"
      ></div>
      <div
        style="display:flex;justify-content:center"
        v-if="payType"
      >
        <spinner type="circles"></spinner>
      </div>

      <!--我要留言-匿名支付-->
      <div class="messageContainer">
        <x-switch
          class="message-Cell"
          :title="('我要留言')"
          :value-map="['0', '1']"
          v-model="stringValue0"
        ></x-switch>
        <x-textarea
          class="f-14 liuyan"
          :class="changeColor"
          :max="200"
          placeholder="您想对受帮扶者说的话，请以鼓励为主，让世界充满爱，不超过200字"
          v-if="stringValue0 == 1"
          v-model="liuyanContent"
        ></x-textarea>
        <x-switch
          class="message-Cell"
          @click.native="stringValue"
          :title="('匿名支付')"
          :value-map="['0', '1']"
          v-model="stringValue1"
        ></x-switch>
      </div>
      <div class="clearBottom"></div>
      <!--提交-->
      <div class="submitContainer">
        <div class="tip">
        <!-- <check-icon :value.sync="checked" type="plain"></check-icon> -->
        我已阅读并同意<span class="book" @click="showpop2">《用户协议》</span>及<span class="book" @click="showpop3">《服务协议》</span>
       
      </div>
        <x-button
          class="paySubmit"
          type="submit"
          @click.native="getUnifiedOrder()"
        >立即支付</x-button>
      </div>

    </div>

    <!--协议弹窗-->
    <prohelp ref="protocolcon"></prohelp>
    <proservice ref="protoservice"></proservice>
  </div>
</template>

<script>
import {
  XHeader,
  Flexbox,
  FlexboxItem,
  Divider,
  XInput,
  XButton,
  XSwitch,
  CheckIcon,
  XTextarea,
  Spinner
} from "vux";
import prohelp from "@/pages/protocol/prohelp";
import proservice from "@/pages/protocol/proservice"
import Bus from "../../Bus";
import open from "@/assets/js/openWin";
import {checkDesc} from '@/util/validFun.js';

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    XHeader,
    XInput,
    XButton,
    XSwitch,
    XTextarea,
    Spinner,
    CheckIcon,
    prohelp,
    proservice
  },
  data() {
    return {
      checked:true,
      headerTitle: "项目详情",
      stringValue0: "0",
      stringValue1: "0",
      inputMoney: "",
      submitMonet: "10",
      liuyanContent: "",
      payType: false,
      navList: [
        { text: "10", isActive: true },
        { text: "20", isActive: false },
        { text: "50", isActive: false },
        { text: "100", isActive: false },
        { text: "200", isActive: false },
        { text: "500", isActive: false }
      ],
      orderNumber: "", // 交易单号
    
    };
  },
  
  computed:{
     changeColor(){
          if(this.liuyanContent.replace(/(^\s*)|(\s*$)/g, "").length<1){
            return "redfont"
      }
      else{
          return ""
      }
    }
  },
  methods: {
    // 协议弹窗
    showpop2() {
      this.$refs.protocolcon.showpop();
    },
    showpop3() {
      this.$refs.protoservice.showpop();
    },
    activeFun: function(data) {
      this.navList.forEach(function(obj) {
        obj.isActive = false;
      });
      data.isActive = true;
      this.inputMoney = "";
      this.submitMonet = data.text;
    },
    stringValue() {},
    // 获取唯一交易单号
    getUnifiedOrder() {
       if(Number.isInteger(Number(this.inputMoney))==false){
         this.showToast("", "text", "输入金额必须是整数" );
        return;
      }
         if (!this.checked) {
        this.showToast("", "text", "请阅读并同意相关协议");
        return;
      }
        if(this.stringValue0==1){
        let obj = checkDesc(this.liuyanContent,1,200,"留言")
        if(!obj.valid){
         this.showToast("", "text",obj.msg);
        return;
        }else{
          if (!/[^\x00-\xff]{1,200}$/.test(this.liuyanContent.replace(/(^\s*)|(\s*$)/g, ""))) {
          {
            this.showToast("", "text","留言输入有误，必须是中文字符");
           return
          }
           }
        }
        }else{
          this.liuyanContent = ""
        }
      
        Bus.$emit("clickUpdate", true);
        let _this = this;
       // this.payType = true;
        //  if (api.systemType != "ios") {
        this.$http
          .post("hts/help/rescue", {
            demend_code: this.$route.params.id, // 需求ID
            paid_money: this.submitMonet, // 支付金额
            paytype: "1", // 支付方式;1微信2支付宝3银联
            message: this.liuyanContent, //  留言内容
            ishide: this.stringValue1, // 是否匿名1是0否
            is_from_abroad: "0" // 是否境外1是0否
          })
          .then(response => {
            _this.orderNumber = response.data; // 交易单号
            window._orderNumber = _this.orderNumber;
            window._submitMonet = _this.submitMonet;
            let payData = {};
            payData.userId = _this.$store.state.user.id;
            payData.payOrderId = _this.orderNumber; // 获取唯一交易单号
            payData.totalFee = _this.submitMonet;
            payData.productInfo = "爱心帮扶";
            payData.sign = "123456";
            payData.busType = "dj";
            payData.spbillCreateIp = "127.0.0.1";
            // 判断是否是微信环境，走两种不同的支付。统一订单的参数也会根据方式不同而变化，所以此处就要开始区分
            if (_this.isWeixinCient()) {
              payData.payType = "wx_pub";
              payData.mchType = process.env.WX_MCHTYPE
              payData.openid = window.localStorage.getItem("openid");
            } else {
              if (api.systemType != "ios") {
                payData.payType = "wx_app";
                payData.mchType = "wx_default";
              } else {
                payData.payType = "wx_wap";
                payData.mchType = "wx_default";
                payData.sceneInfo =
                  '{"h5_info": {"type":"IOS","app_name": "社会扶贫","package_name": "com.shfpw.app"}}';
              }
              // payData.sceneInfo = '{"h5_info": {"type":"Android","app_name": "社会扶贫","package_name": "com.shfpw.app"}}'
            }
            //window.open("https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx111730266986509f6afaad578570937532&package=2120785799&redirect_url=http%3a%2f%2fwxpay.wxutil.com%2fmch%2fpay%2fh5jumppage.php", '_self', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=800,height=600, top=0, left=0')

            _this.$http
              .post("hts/pay", payData)
              .then(function(response) {
                if (window.api) {
                  // if (api.systemType != "ios") {
                  let appId = api.appId;
                  let wxPay = api.require("wxPay");
                  wxPay.payOrder(
                    {
                      apiKey: response.data.appid,
                      orderId: response.data.prepayid,
                      mchId: response.data.partnerid,
                      nonceStr: response.data.noncestr,
                      timeStamp: response.data.timestamp,
                      package: response.data.package,
                      sign: response.data.sign
                    },
                    function(ret, err) {
                      if (ret.status) {
                        // 支付成功
                        _this.showToast("", "text", "支付成功");
                        _this.payOk();
                      } else {
                        _this.payType = false;
                      }
                    }
                  );
                  //  } else {
                  //           demend_code: this.$route.params.id, // 需求ID
                  // paid_money: this.submitMonet, // 支付金额
                  // paytype: "1", // 支付方式;1微信2支付宝3银联
                  // message: this.liuyanContent, //  留言内容
                  // ishide: this.stringValue1, // 是否匿名1是0否
                  // is_from_abroad: "0" // 是否境外1是0否
                  //    api.openWin({
                  //   name: "payNative_win",
                  //   url: "http://shfp1017.org.cn/payview/payNative.html?",
                  //   rect: {
                  //     x: 0,
                  //     y: 25,
                  //     w: "auto",
                  //     h:
                  //       api.winHeight -
                  //       25
                  //   },
                  //   pageParam: {
                  //     pay: 1,
                  //     url:
                  //       response.data.mweb_url

                  //   }
                  // });

                  // api.openWin({
                  //   name: "webview_win",
                  //   url: "http://www.shfp1017.org.cn/webview_win.html",
                  //   pageParam: {
                  //    title:"微信支付",
                  //     url:  response.data.mweb_url
                  //   }
                  // });
                  // open(
                  //   response.data.mweb_url +
                  //     "&redirect_url=" +
                  //     encodeURI(window.location.href),
                  //   "微信支付"
                  // );
                  // window.open(
                  //   response.data.mweb_url +
                  //     "&redirect_url=" +
                  //     encodeURI(window.location.href),
                  //   "_self",
                  //   "directories=no, width=800,height=600, top=0, left=0"
                  // );
                  // window.open('http://www.fp1017.org.cn/indexs.html?redirect_pay_url=' + response.data.mweb_url, '_self', 'status=no,menubar=no,titlebar=no,toolbar=no,directories=no, width=800,height=600, top=0, left=0')
                  // }
                } else if (_this.isWeixinCient()) {
                  // 微信公众号里支付
                  if (typeof WeixinJSBridge === "undefined") {
                    if (document.addEventListener) {
                      document.addEventListener(
                        "WeixinJSBridgeReady",
                        _this.onBridgeReady(response.data),
                        false
                      );
                    } else if (document.attachEvent) {
                      document.attachEvent(
                        "WeixinJSBridgeReady",
                        _this.onBridgeReady(response.data)
                      );
                      document.attachEvent(
                        "onWeixinJSBridgeReady",
                        _this.onBridgeReady(response.data)
                      );
                    }
                  } else {
                    _this.onBridgeReady(response.data);
                  }
                } else {
                  _this.payType = false;
                  _this.showToast(
                    "",
                    "text",
                    "网页上无法支付，请使用APP或微信"
                  );
                  // _this.payOk()
                }
              })
              .catch(function(error) {
                _this.payType = false;
              });
          }).catch(err =>{
            if(err.msg)
              _this.showToast("", "text",err.msg);
          })
      // } else {
      //   //     api.addEventListener(
      //   //   {
      //   //     name: "iospaysuccess"
      //   //   },
      //   //   function(ret,err) {
      //   //     _this.payType = false;
      //   //      api.closeWin({ name: "payNative_win" });
      //   //     let obj = ret.value;
      //   //     if (obj.success==1) {
      //   //       _this.showToast("", "text", "支付成功");
      //   //       _this.payOk();
      //   //     }
      //   //   }
      //   // );
      //   // api.openWin({
      //   //           name: "payNative_win",
      //   //           url: "http://shfp1017.org.cn/payview/payNative.html",
      //   //           rect: {
      //   //             x: 0,
      //   //             y: 25,
      //   //             w: "auto",
      //   //             h:
      //   //               api.winHeight -
      //   //               25
      //   //           },
      //   //           pageParam: {
      //   //             demand_code: _this.$route.params.id,
      //   //             paid_money:_this.submitMonet,
      //   //             message: _this.liuyanContent,
      //   //             ishide: _this.stringValue1 ,
      //   //             userid:_this.$store.state.user.id ,
      //   //             token: window.localStorage.getItem("token")

      //   //           }
      //   //         });


      //       _this.payType = false;
      //   window.op
      //     "http://shfp1017.org.cn/payview/payNative.html?demand_code=" +
      //       _this.$route.params.id +
      //       "&paid_money=" +
      //       _this.submitMonet +
      //       "&message=" +
      //       _this.liuyanContent +
      //       "&ishide=" +
      //       _this.stringValue1 +
      //       "&userid=" +
      //       _this.$store.state.user.id +
      //       "&token=" +
      //       window.localStorage.getItem("token")
      //   );
      // }
    },
    onBridgeReady: function(data) {
      let _this = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: data.appId, // 公众号名称，由商户传入
          timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, // 随机串
          package: data.package,
          signType: data.signType, // 微信签名方式：
          paySign: data.paySign // 微信签名
        },
        function(res) {
          // alert(JSON.stringify(res.err_msg))
          // alert(res.err_msg == 'get_brand_wcpay_request:ok')
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            // 调用发微信消息接口
            _this.$http
              .post("uts/wechat/wechatMsg", {
                openid: window.localStorage.getItem("openid"),
                money: window._submitMonet,
                poorUser: _this.$route.params.donatorName
              })
            _this.payOk();
            _this.payType = false;
            _this.showToast("", "text", "支付成功");
          } else {
            _this.payType = false;
          }
        }
      );
    },
    paywechat() {},
    valideContent(val){
      let pattern =  /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      this.liuyanContent = val.replace(pattern, ''); 
    },
    changeData() {
      // 获取用户输入的自定义金额并转换为整数
      if(Number.isInteger(Number(this.inputMoney))==false){
        this.$refs.inputmoney[0].focus();
         this.showToast("", "text", "输入金额必须是整数" );
        return;
      }
     
      setTimeout(() => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);

    },
    payOk() {
      let _this = this;
      let aidederName = this.$route.params.donatorName;
      this.$http
        .post("/hts/help/updateCapitalState", {
          id: window._orderNumber,
          pay_flag: 1,
          paid_money: window._submitMonet
        })
        .then(res => {
          _this.payType = false;
          let user = _this.$store.state.user.realname
            ? _this.$store.state.user.realname
            : _this.$store.state.user.nick_name;
          _this.$router.replace({
            path: "/certificate",
            query: { user: user, to: aidederName, target: window._submitMonet + '元' }
           });
        })
        .catch(error => {
          _this.payType = false;
          _this.showToast("", "text", "保存订单状态失败," + error.code);
        });
    }
  },
  watch: {
   
     liuyanContent:function(val){
         this.$nextTick(() => {
       let pattern =  /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      this.liuyanContent = val.replace(pattern, ''); 
         })
     },
    inputMoney: function(val) {
      if (val !== "") {
            this.$nextTick(() => {
           this.inputMoney = val.replace(/[^\0-9\.]/g,'')
            this.submitMonet = this.inputMoney;
            })
        for (var i = 0; i < this.navList.length; i++) {
          this.navList[i].isActive = false;
        }

       // this.submitMonet = parseInt(val);
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$nineColor = #999;
$threeColor = #333;
$whiteColor = #fff;
$twelveFontSize = 12px;
$fifteenFontSize = 15px;
$eighteenFontSize = 18px;

.common-padding {
  padding: 0 15px;
  background: $whiteColor;
}
.redfont {
  .weui-cell__bd {
    .weui-textarea-counter {
      span {
        color:#ff0000
      }
    }
  }
    
  

}
.payWrapper {
  height: 100%;
  background-color #F6F6F6;
}
.box-withheader{background:#F6F6F6;}
.payContainer {
  margin: 0 0 10px 0;
  box-sizing: border-box;
  @extend .common-padding;
  padding-bottom: 20px;
  font-size: 0;

  .selectMoney {
    padding: 30px 0 20px;
    font-size: $fifteenFontSize;
    color: $threeColor;
  }

  .flex-demo {
    padding: 16px 0;
    margin-bottom: 10px;
    color: $threeColor;
    font-size: $fifteenFontSize;
    line-height: 15px;
    text-align: center;
    border: 1px solid #e0e0e0;
    border-radius: 5px;

    &.active {
      border: none;
      background: linear-gradient(120deg, rgba(255, 204, 115, 1), rgba(249, 165, 73, 1));
      color: #fff;
    }
  }

  .weui-cell__bda {
    width: 100%;
    font-size: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;

    &::-webkit-input-placeholder {
      color: $nineColor;
    }

    &:-moz-placeholder {
      color: $nineColor;
    }

    &::-moz-placeholder {
      color: $nineColor;
    }

    &:-ms-input-placeholder {
      color: $nineColor;
    }

    .weui-cell {
      padding: 13px 14px;
    }
  }
}
.tip {
    
    margin-bottom:16px;
    text-align:center;
    color:#666;
    font-size:12px;  
    .book {
      color:#ff8226;
    }
  }
.messageContainer {
  @extend .common-padding;
  box-sizing: border-box;
  overflow:hidden;
  .message-Cell {
    padding: 15px 0;
  }

  .liuyan {
    margin: 0;
    padding: 15px;
    background: #f6f6f6;
    margin-bottom: 15px;
    border-radius: 5px;

    &:before {
      border: 0 none;
    }
  }
}

>>>textarea {
  background: none;
}

.weui-cell {
  &:before {
    left: 0;
  }
}
.weui-btn{
  line-height:initial;
}
>>>.weui-label{
  font-size:15px;
  color:#333;
}
>>>.weui-switch{
  width:40px;
  height:25px;
}
>>>.weui-switch:before{
  width:38px;
  height:23px;
}
>>>.weui-switch:after{
  width:23px;
  height:23px;
}
>>>.weui-switch:checked:after{
  transform: translateX(16px);
}
// 支付
.submitContainer {
  /* position fixed */
  /* bottom 0px */
  /* left 0px */
  /* right 0px */
  padding-bottom: 26px;

  p {
    &.pocotol {
      margin: 0 0 20px 0;
      color: $nineColor;
      font-size: $twelveFontSize;
      text-align: center;
    }
  }

  button {
    &.paySubmit {
      width: 70.8%;
      font-size: $eighteenFontSize;
      background: linear-gradient(-180deg, rgba(253, 139, 42, 1), rgba(255, 129, 37, 1));
      border-radius: 1000px;
      box-shadow: 0 6px 20px rgba(255, 104, 37, 0.33);
      padding:15px 0 14px;
    }
  }
}

.clearBottom {
  width: 100%;
  height: 70px;
}
</style>
