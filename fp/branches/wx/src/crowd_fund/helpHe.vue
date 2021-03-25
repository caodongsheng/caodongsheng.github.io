<template>
  <div class="payWrapper">
    <!--头部-->
    <div class="fixed">
      <headerBackTitle headerTitle='确认支付'></headerBackTitle>
    </div>


    <div clas="bigda">
    <div style="position:absolute;top:47px;left:0;width:100%;height:100%;background:#000;opacity:0.3;z-index:99999" v-if="payType"></div>
      <div style="display:flex;justify-content:center;margin-top:150px;" v-if="payType">
        <spinner type="circles"></spinner>
      </div>


          <div class="box-withheader over-auto main">

      <p class="chose">选择捐助金额</p>
      <div class="payContainer">
        <flexbox :gutter="10" wrap="wrap" justify="space-between">
          <flexbox-item v-for="item in navList" :key="item.text">
            <div class="flex-demo" :class="{active:item.isActive}" @click="activeFun(item)">¥{{item.text}}</div>
          </flexbox-item>
        </flexbox>
        <div class="weui-cell__bda">
           <x-input placeholder="输入自定义金额" v-model="inputMoney"></x-input>

        </div>
        <div class="weui-cell__bda border_none" @click="ischose">
          <CheckIcon v-model="anonymous"></CheckIcon>
          <span>匿名支持</span>
        </div>
        <div class="clear"></div>
      </div>
      <span class="bjcolor"></span>
      <div class="main_two">

      </div>
      <div class="submitContainer" @click.stop = "isagreechose">
        <CheckIcon v-model="isagree"></CheckIcon>
        <span class="pocotol lineHe" @click.stop="showpop2">我已阅读并同意（用户协议）</span>
      </div>

      <div class="submitContainer top" @click.stop = "isinvoicechose">
        <CheckIcon v-model="isinvoice"></CheckIcon>
        <span class="pocotol lineHe">我要发票</span>
      </div>
      <div class="invoice" v-show="isinvoice">
        <div class="invoice_top">
          <div class="center">抬头类型</div>
          <div class="submitContainer top" @click="enterprisechose">
            <CheckIcon v-model="people"></CheckIcon>
            <span class="pocotol lineHe">企业</span>
          </div>
          <div class="submitContainer top" @click="enterprisechose">
            <CheckIcon v-model="people1"></CheckIcon>
            <span class="pocotol lineHe">个人/非企业单位</span>
          </div>
          <div class="clear"></div>
        </div>

        <div class="invoice_center" v-if="people">
          <div class="dashed">
            <x-input title="发票抬头" placeholder="填写发票抬头" placeholder-align="right" v-model="paydata.title"></x-input>
          </div>
          <div class="dashed">
            <x-input title="纳税人识别码" placeholder="填写纳税人识别码" placeholder-align="right" v-model="paydata.cdkey"></x-input>
          </div>
          <div class="dashed">
            <x-input title="联系电话" placeholder="填写联系电话" placeholder-align="right" v-model="paydata.tel"></x-input>
          </div>
          <div class="dashed">
            <x-input title="邮寄地址" placeholder="填写邮寄地址" placeholder-align="right" v-model="paydata.mailAddress "></x-input>
          </div>
          <div class="dashed">
            <x-input title="详细地址" placeholder="填写详细地址" placeholder-align="right" v-model="paydata.detailAddress"></x-input>
          </div>
          <div class="dashed">
            <x-input title="邮政编码" placeholder="填写邮政编码" placeholder-align="right" v-model="paydata.postalCode" type="number"></x-input>
          </div>
        </div>

        <div class="invoice_center" v-else>
          <div class="dashed">
            <x-input title="发票抬头" placeholder="填写发票抬头" placeholder-align="right" v-model="paydata.title"></x-input>
          </div>
          <div class="dashed">
            <x-input title="联系电话" placeholder="填写联系电话" placeholder-align="right" v-model="paydata.tel"></x-input>
          </div>
          <div class="dashed">
            <x-input title="邮寄地址" placeholder="填写邮寄地址" placeholder-align="right" v-model="paydata.mailAddress"></x-input>
          </div>
          <div class="dashed">
            <x-input title="详细地址" placeholder="填写详细地址" placeholder-align="right" v-model="paydata.detailAddress"></x-input>
          </div>
          <div class="dashed">
            <x-input title="邮政编码" placeholder="填写邮政编码" placeholder-align="right" v-model="paydata.postalCode" type="number"></x-input>
          </div>
        </div>
      </div>



    </div>
          <footer class="footer">
            <div class="footer_center">需支付：￥<span class="color">{{ submitMonet }}</span></div>
            <div class="pay" @click="gopey">支付</div>
          </footer>
    </div>

    <!--协议弹窗-->
    <prohelp ref="protocolcon">

    </prohelp>
  </div>
</template>

<script>
  import {XInput, XButton,Flexbox, FlexboxItem,XSwitch,CheckIcon,Spinner } from 'vux'
  import prohelp from '@/crowd_fund/prohelp'
  import headerBackTitle from '@/components/header/headerBackTitle'
  export default {
    components: {
      Flexbox,
      FlexboxItem,
      XInput,
      XButton,
      prohelp,
      XSwitch,
      CheckIcon,
      headerBackTitle,
      Spinner
    },
    data () {
      return {
        navList:[
          {text: '10', isActive: true},
          {text: '20', isActive: false},
          {text: '50', isActive: false},
          {text: '100', isActive: false}
        ],
        paydata:{
          title:'',       //发票抬头
          cdkey:'',       //纳税人识别码
          tel:'',        //联系电话
          mailAddress:'',  //邮寄地址
          detailAddress:'', //详细地址
          postalCode:''      //邮政编码
        },
        inputMoney:'',
        anonymous:false,    //是否匿名支持
        afr052:2,           //1为匿名2非匿名  接口需要
        isagree:true,       //是否同意用户协议
        isinvoice:false,    //是否有发票
        invo:2,             //1需要发票2不需要
        people:true,       //个人或者企业
        titleType:1,        //0为单位抬头1为个人抬头
        people1:false,
        submitMonet:10,
        orderno:'',
        payType:false
      }
    },
    mounted (){
      console.log(this.$route.params.id,this.$route.params.sum,this.$route.params.acr002);
    },
    methods: {
      add0(str){
        if(str>=10){
            return str;
        }else{
            return '0'+str;
        }
     },
      Gtime(Stime,Year,Month,Dat){
          var date = new Date(Stime);
          var Y = date.getFullYear() + Year;
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + Month;
          var D = date.getDate() ;
          var h = date.getHours();
          var m = date.getMinutes();
          var s = date.getSeconds(); 
          console.log(D);
          var Time = Y+M+this.add0(D)+ Dat+' '+this.add0(h) + ':'+this.add0(m) + ':'+this.add0(s)
          return Time
      },
      enterprisechose () {
        console.log(this.titleType)
        this.paydata.title = '';
        this.paydata.cdkey = '';
        this.paydata.tel = '';
        this.paydata.mailAddress = '';
        this.paydata.detailAddress = '';
        this.paydata.postalCode = '';
        if(this.people == false){
          this.people = true
          this.people1 = false
          this.titleType = 1
        }else{
          this.people = false
          this.people1 = true
          this.titleType = 0
        }
      },
      // 协议弹窗
      showpop2 () {
        this.$refs.protocolcon.showpop()
      },
      ischose () {
        if(this.anonymous == false){
          this.anonymous = true
          this.afr052 = 1
          console.log(this.afr052)
        }else{
          this.anonymous = false
          this.afr052 = 2
          console.log(this.afr052)
        }
      },
      isagreechose () {
        if(this.isagree == false){
          this.isagree = true
        }else{
          this.isagree = false
        }
      },
      isinvoicechose () {
        if(this.isinvoice == false){
          this.isinvoice = true
          this.invo = 1
          console.log(this.invo)
        }else{
          this.isinvoice = false
          this.invo = 2
          console.log(this.invo)
        }
      },
      activeFun(data) {
        this.navList.forEach(function (obj) {
          obj.isActive = false
        })
        data.isActive = true
        this.inputMoney = ''
        this.submitMonet = data.text
        console.log(this.submitMonet)
      },
      gopey () {
        if(this.isagree == false){
          this.showToast('','text','请阅读并同意用户协议！','20em','','')
        }else if(this.invo == '1'){
          if(this.titleType == 1){
            if(this.paydata.title == ''){
              this.showToast('','text','请填写发票抬头','20em','','')
            }else if(this.paydata.cdkey == ''){
              this.showToast('','text','请填写纳税人识别码','20em','','')
            }else if(this.paydata.tel == ''){
              this.showToast('','text','请填写联系电话','20em','','')
            }else if(this.paydata.mailAddress == ''){
              this.showToast('','text','请填写邮寄地址','20em','','')
            }else if(this.paydata.detailAddress == ''){
              this.showToast('','text','请填写详细地址','20em','','')
            }else if(this.paydata.postalCode == ''){
              this.showToast('','text','请填写邮政编码','20em','','')
            }else{
              this.getorderno()
            }
          }else if(this.titleType == 0){
            if(this.paydata.title == ''){
              this.showToast('','text','请填写发票抬头','20em','','')
            }else if(this.paydata.tel == ''){
              this.showToast('','text','请填写联系电话','20em','','')
            }else if(this.paydata.mailAddress == ''){
              this.showToast('','text','请填写邮寄地址','20em','','')
            }else if(this.paydata.detailAddress == ''){
              this.showToast('','text','请填写详细地址','20em','','')
            }else if(this.paydata.postalCode == ''){
              this.showToast('','text','请填写邮政编码','20em','','')
            }else{
              this.getorderno()
            }
          }
        }else{
          this.getorderno()
        }
      },
      //获取订单号
      getorderno () {
        this.payType = true
        let data = {
          afr052:this.afr052,
          afq006:this.submitMonet,
          afq004:'1',
          payType:'1',
          sum:this.$route.params.sum,
          acr001:this.$route.params.id,
          acr002:this.$route.params.acr002,
          uus001:this.$store.state.user.id,
          titleType:this.titleType,
          title:this.paydata.title,
          cdkey:this.paydata.cdkey,
          tel :this.paydata.tel,
          mailAddress:this.paydata.mailAddress,
          detailAddress:this.paydata.detailAddress,
          postalCode:this.paydata.postalCode,
          invo:this.invo
        }
        this.$https.post(this.BASE_URL+"cfs/zc/z008/save",data,
          {
            headers: {
                'Authorization': localStorage.getItem("longToken")
                // 'Authorization': '5d755337b3cebd14e59eb4ed98e2f05745a5996ae5a3a2a2dc03197793bff627eaaf9f982e911d13c25676b0d00b0d7218016e48379f2bce1b4a006d0f066205cd1b101a144fa408061'
            }
          }
        )
        .then(res => {
          this.orderno = res.data.result.orderno;
          window.orderno = this.orderno
          console.log(this.orderno);
          this.pay(this.orderno)
        })
      },
      pay (orderno) {
        let _this = this
        if(this.isWeixinCient()){
          console.log('这是微信的支付');
          let data = {
            userId:this.$store.state.user.id,
            payOrderId:orderno,
            totalFee:this.submitMonet,
            productInfo:this.$route.params.acr002,
            sign:"123456",
            busType:"zc",
            payType:'wx_pub',
            // mchType:"wx_byba",
            mchType:'wx_default',
            openid:localStorage.getItem('zcopenid')
            // openid:'oSHA7w7E3QiEmSv6qJoTtUZZvHsM'
          }
          this.$https.post(this.BASE_URL+"pts/v1/pay",data).then(res => {
            console.log(res);
            if(res.data.code == "PTSI0000"){
              console.log('/zccertificate/'+decodeURIComponent(this.$route.params.acr002)+'/'+res.data.data.payMap.timeStamp)
              console.log(res.data.data,'这是微信支付需要的数据');
              this.onBridgeReady(res.data.data);
              this.payType = false
            }else{
              this.payType = false
              this.showToast('','text','重新再试试！！','20em','','')
            }
          })
        }else{
          console.log('这是app支付');
          var sceneInfo='{"h5_info": {"type":"Wap","wap_url": "https://www.zgshfp.com.cn","wap_name": "社会扶贫"}}';
          let data = {
              userId:this.$store.state.user.id,
              payOrderId:orderno,
              totalFee:this.submitMonet,
              productInfo:decodeURIComponent(this.$route.params.acr002),
              sign:"123456",
              busType:"zc",
              payType:'wx_wap',
              mchType:"wx_default",
              sceneInfo:sceneInfo,
            }
            this.$https.post(this.BASE_URL+"pts/v1/pay",data,
              {
                headers: {
                    'Authorization': localStorage.getItem("longToken")
                }
              }
            )
            .then(res => {
              console.log(res);
              if(res.data.code == "PTSI0000"){
                window.location.href= res.data.data.payMap.mweb_url
                this.payType = false
              }else{
                this.payType = false
                this.showToast('','text','重新再试试！！','20em','','')
              }
            })
        }
      },
      //订单查询
      queryOrder () {
        let data = {"payOrderId":window.orderno,"txnTime":""}
        this.$https.post(this.BASE_URL+"pts/v1/queryOrder",this.qs.stringify(data),{
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
          })
         .then(res => {
           console.log(res,'这是订单查询的结果');
           this.payType = false
         })
         .catch(function(err) {
            this.payType = false
           console.log(err,'这是订单查询的结果');
         })
      },
      //微信支付
      onBridgeReady(data){   //微信支付
        let that = this;
       WeixinJSBridge.invoke(
           'getBrandWCPayRequest', {
               "appId":data.payMap.appId,     //公众号名称，由商户传入
               "timeStamp":data.payMap.timeStamp,//时间戳，自1970年以来的秒数
               "nonceStr":data.payMap.nonceStr, //随机串
               "package":data.payMap.package,
               "signType":data.payMap.signType,//微信签名方式：
               "paySign":data.payMap.paySign //微信签名
           },
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                  that.payType = false
                  window.location.href=that.appjump_url+'/pages/index/#/zccertificate/'+decodeURIComponent(that.$route.params.acr002)+'/'+that.Gtime(parseInt(data.payMap.timeStamp+'000'),'-','-','-').substring(0,10)+'/'+that.$route.params.id+'/'+that.$route.params.zcuserid+'/'+that.$route.params.zctoken+'/'+decodeURIComponent(that.$route.params.zcnickname)
                  // that.showToast('','text','支付成功！！！！','20em','','');
                }// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                if(res.err_msg == "get_brand_wcpay_request:fail"||res.err_msg == "get_brand_wcpay_request:cancel"){
                    that.showToast('','text','支付未完成','20em','','');
                    that.payType = false;
                }
            }
       );
    }
    },
    watch: {
      inputMoney (val) {

        if (val !== '') {
              this.$nextTick(() => {
            this.inputMoney = val.replace(/[^\0-9\.]/g,'')
              })
          for (var i = 0; i < this.navList.length; i++) {
            this.navList[i].isActive = false;
          }
  

        }
      }
    }
  }
</script>

<style scoped>

.bigda{
  position: relative;
}
.payWrapper{
    -webkit-overflow-scrolling: touch;
}
.main{
  padding:  0 11px;
  box-sizing: border-box;
  padding-bottom: 100px;
}
.main .chose{
  font-size: 15px;
  margin-top: 20px;
}
.main .payContainer{
  margin-top: 15px;
}

.flex-demo{
      padding:16px 0;
      margin-bottom: 10px;
      line-height: 4px;
      text-align: center;
      border: 1px solid #F37306;
      border-radius: 8px;
}
.flex-demo.active{
  border: none;
  background: linear-gradient(120deg,rgba(255,204,115,1),rgba(249,165,73,1));
  color: #fff;
}

.weui-cell__bda{
  width: 49%;
  font-size: 12px;
  float: left;
  border: 1px solid #F37306;
  border-radius: 8px;
}
.border_none{
  border:none;
  line-height: 44px;
  padding-left: 20px;
  box-sizing: border-box;
}
.clear{
  clear:both;
}
.bjcolor{
  width: 100%;
  height: 20px;
  /*background: #666;*/
  display: inline-block;
}
.top{
  margin-top: 15px;
}
.invoice{
  width: 100%;
  background-color: #F6F6F6;
  margin-top: 20px;
  /*padding-bottom: 40px;*/
}
.invoice_top{
  height: 53px;
}
.invoice_top div{
  float: left;
  width: 33%;
}
.center{
  line-height: 53px;
  text-align: center;
  box-sizing: border-box;

}
.invoice_center .dashed{
  border-bottom: 1px dashed #E6E6E6;
  box-sizing: border-box;
  color: #999999;
}
.footer{
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ddd;
  background: #fff;
}
.footer_center{
  text-align: center;
  line-height: 60px;
  width: 65%;
}
.footer div{
  float: left;
}
.pay{
  text-align: center;
  line-height: 60px;
  width: 35%;
  background-color: #F37306;
  color: #fff;
  font-size: 16px;
}
.color{
  color: #F37306;
  font-size: 20px;
}
</style>
