<template>
  <div class="SharePage">
    <div class="Cont">
      <img src="../img/typeimg/logo.png">
      <p style="margin-top: 17px">您的好友{{area}}<span>{{userTypeName}}{{ljf_}}{{userName}}</span></p>
      <p style="margin-bottom: 17px">邀请您注册中国社会扶贫网</p>
    </div>
    <div id="code" class="codeimg">
      <div class="I_text">
        <p>扫描下方二维码或<br/>注册时添加8位数字邀请码<br/>加入中国社会扶贫网</p>
      </div>
    </div>
    <div class="Inv_Num_Code">邀请码<p>{{NumCode}}</p></div>
    <div class="copybtn" @click="Copy(NumCode)" :disabled="isDisable">复制</div>
    <div v-show="CopyShow" class="CopySucess">
      <p>复制成功</p>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
  components:{
    QRCode: QRCode
  }
export default {
  name: 'SharePage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      QrcodeImg: '',
      codes:'',
      NumCode:'000000',
      area:'',
      userName:'',
      userTypeName:'',
      CopyShow:false,
      isDisable:false,
      ljf_:'-',
    }
  },
  created: function() {
    // this.$public.ifWxBrowser();
    var this_s=this;
    this.setDocTitle('我的邀请');

  },
  mounted: function() {
    this.NumCode=this.getUrlKey('NumCode');
    this.$nextTick(function(){
      this.NumCodeAxios()
      this.qrcode(this.NumCode)
    })
    
    // alert(this.$store.state.Public.count)
    // console.log(this.$store.state.Public.userId)
  },
  methods:{
    getUrlKey: function (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    setDocTitle: function(DocTitle){ 
      document.title = DocTitle;
        document.setTitle = function(t) {
          document.title = t;
          var i = document.createElement('iframe');
          // i.src = '//m.baidu.com/favicon.ico';
          i.style.display = 'none';
          i.onload = function() {
            setTimeout(function(){
              i.remove();
            }, 9)
          }
          document.body.appendChild(i);
        }
    document.setTitle(DocTitle)
    },
    NumCodeAxios: function() {
      let this_s = this;
      this.$http.post('uts/invitationCode/getMsgByCode',{invitationCode:this_s.NumCode}).then(res=>{
        console.log(res)
        if(res.data.result.msg=='此邀请码已失效'||res.data.result.status=='002'){
          this_s.ljf_='';
          alert('此邀请码已失效')
        }else{
          let r = res.data.result.date
          this_s.userName=r.userName;
          if(r.inviteType==0){
            this_s.userTypeName='爱心人士';
            this_s.getZoningF(r.province);
            /*this_s.$getData.get('ssoredis/invitationCode/getZoning',{province:r.province }).then(res=>{
              console.log(res)
              let re = res.data.result
              var Name = re.province
              this_s.area=Name;
            }).catch(function(error){
              console.log(error)
            })*/
          }else if (r.inviteType==1) {
            this_s.userTypeName='扶贫干部';
            this_s.getZoningF(r.province);
          }else if (r.inviteType==2) {
            this_s.area='';
            this_s.userTypeName=r.companyName;
          }
          console.log(r)
        }
      }).catch(function(error){
        console.log(error)
      })
    },
    getZoningF: function(province){
      let this_s=this;

      this.$http.post('eai/authRegion/selectRegionDate',{code:province}).then(res=>{
        this_s.area=res.data.regionName;
      }).catch(function(error){
        console.log(error)
      })
    },
    Copy: function(val) {
      let this_=this;
      this.$copyText(val).then(function (e) {
        // console.log(e)
        this_.isDisable=true;
        this_.CopyShow=true;
        setTimeout(function(){ this_.CopyShow=false; this_.isDisable=false; }, 3000)
      }, function (e) {
        // console.log(e)
      })
    },
    addcount: function(){
      this.$store.commit('Count', 15)
    },
    qrcode: function (ss) {
      let qrcode = new QRCode('code', {
        width: 100,
        height: 100, // 高度
        text: 'https://wx.fpmai.com/m/index.html#/inviteislog?NumCode='+ss, // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        colorDark: '#000',
        colorLight: '#f6f6f6'
      })
      console.log(qrcode)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SharePage{
  background: url('../img/typeimg/sharebgi.png');
  background-size: cover;
  height: -webkit-fill-available;
  text-align: center;
  text-align: -webkit-center;
}

.codeimg{
  width: 278px;
  height: 355px;
  background-image: url('../img/typeimg/codebgi.png');
  background-size: cover;
  font-size: 15px;
  color: #333;
}
.Cont{
  font-family: 'SourceHanSansCN Regular';
  font-size: 15px;
  line-height: 24px;
  color: #FFF;
  padding-top: 26px;
}
.Cont>img{
  width: 170px;
  height: 30px;
  margin: 0 auto;
}
.Cont span{
  color: #4f3209;
}
.Inv_Num_Code{
  margin: -130px auto 20px;
  font-size: 13px;
  color: #EB9211;
  width: 165px;
  height: 20px;
  line-height: 20px;
}
.Inv_Num_Code>p{
  margin-top: 12px;
  font-size: 20px;
  color: #4f3209;
}
.copybtn{
  background-image: url('../img/typeimg/copybgi.png');
  background-size: cover;
  margin-top: 44px;
  font-size: 14px;
  font-family: 'SourceHanSansCN Medium';
  color: #FFF;
  width: 126px;
  height: 48px;
  line-height: 38px;
}
.I_text{
  padding-top: 20px;
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 20px;
  color:#EB9211;
  font-family: "PingFangSC Regular";
}
.CopySucess{
  position: fixed;
  bottom: 70px;
  width: 100%;
}
.CopySucess>p{
  background: rgba(0,0,0,0.7);
  padding: 1px 3px;
  color: #fff;
  white-space: nowrap;
  width: 50px;
  margin: 0 auto;
}
</style>
