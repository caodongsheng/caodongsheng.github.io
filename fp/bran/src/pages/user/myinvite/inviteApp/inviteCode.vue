<template>
  <div>
    <x-header :left-options="{backText: ''}" title="邀请列表">
      <a slot="right" @click="toType">
        <!-- <i class="iconfont icon-f-share f-20"></i> -->
        <img style="width: 21px;height: 21px;background: #eee" src="../img/header/add_img.png">
      </a>
    </x-header>
    <!-- <share ref="sharea"></share> -->
    <div class="box-withheader over-auto">
      <div v-if="CodeList.length==0" class="nocontent f-14 color-999 text-center" style="padding: 30px 15px">
        <!-- <img class="dis-block" src="../../../../../static/appimg/no-friend.png" style="width:90px;margin:0 auto"> -->
        <p style="margin-top: 15px">您还没有多余的邀请码</p>
      </div>

      <div class="group-clearbd bg-ffffff QRCode_Each"  label-align="left" v-for="(item,index) in CodeList">
          <div class="QRCode_Each_From">
            <div class="From" v-if="item.qrType==0"><div></div><p>爱心人士邀请</p></div>
            <div class="From" v-else-if="item.qrType==1"><div></div><p>扶贫干部邀请</p></div>
            <div class="From" v-else><div></div><p>企业邀请</p></div>
          </div>
          <div class="QRCode_Each_Show">
            <div class="QRCode_Each_Icon">
              <div :id="QRCodeId(index)">
              </div>
            </div>
            <div class="QRCode_Each_Cont">
              <p v-if="item.qrType==0">所在地域：{{item.provName+item.cityName+item.countyName+item.countryName+item.villageName}}</p>
              <p v-else-if="item.qrType==1">任职地域：{{item.provName+item.cityName+item.countyName+item.countryName+item.villageName}}</p>
              <p v-else>企业名称：{{item.companyName}}</p>
              <!-- <p>生成日期： {{item.createTime.substring(0,10)}}</p> -->
            </div>
          </div>
          <div class="QRCode_Each_Set">
            <div class="QRCode_Set_numCode">邀请码：{{item.userCode}}</div>
            <div class="QRCode_Set_Use" @click="invited(item)">使用</div>
            <div class="QRCode_Set_Delete" @click="deletedConfirm(item.id,item.userCode)">删除</div>
          </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="confirmSubmit" v-show="showDelConfirm">
      <div class="confirmSubmitDiv"> 
        <p class="c_title">提示</p>
        <p class="c_cont">是否确认删除邀请码为：{{confirmCode}}的邀请信息，该邀请码将在删除后失效并无法继续扫描!</p>
        <div class="confirmDiv">
          <div class="c_cancel" @click="cancelDeleted()">返回</div>
          <div class="c_confirm" @click="confirmDeleted()">确定</div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="confirmSubmit" v-show="CodeisFull">
        <div class="confirmSubmitDiv_l">
            <p class="c_title">提示</p>
            <p class="c_cont_l">每位用户最多只可保留5个邀请码，您已到达上限，请先删除原有邀请码后再进行创建</p>
            <div @click="cancelInvite()" class="c_confirm_s">确认</div>
        </div>
    </div>
        <!-- <cell class="f-16" title="邀请好友" is-link link="inviteCode">
          <img slot="child" class="icon-code" src="../../../../static/appimg/icon-code.png" alt="" width="24">
        </cell>
        <cell class="f-16" title="邀请列表" is-link link="inviteList">
          <span class="color-999">{{visitnum}}人</span>
        </cell> -->
      <!-- <div class="myinvitecode">
        <avatar :name="nickname" :image="usericon" width="80" height="80" style="display: block;margin:0 auto"></avatar>

        <h1 class="f-17 color-333 text-center f-normal">{{nickname}}</h1>
        <p class="f-14 color-999 text-center">认证机构：{{organ_name}}</p>
        <img class="codeimg dis-block block-center" :src="codeimg" width="70%">
        <p class="tip f-14 color-999 text-center">扫一扫上面的二维码图案，加入中国社会扶贫网</p>
      </div> -->
  </div>
</template>

<script>
import { XHeader, PopupHeader, TransferDom, Popup, Divider, XButton } from 'vux'
import avatar from '../../../../components/util/avatar'
// import share from '@/components/share/share'
import QRCode from 'qrcodejs2'
components:{QRCode:QRCode}
export default {
  directives: {
    TransferDom
  },
  name: 'inviteCode',
  components: { XHeader, PopupHeader, Popup, Divider, XButton, avatar},
  data() {

    return {
      codeimg: '',
      vos:{},
      CodeList:[
        /*{id: "8", userId: "37303904", userName: "moon", userCode: 10000007, shortUrl: "jmiaMr", province: null,shortUrl: "jmiaMr",userCode: 10000007,userId: "37303904",userName: "moon",validType: 1,village: null},
        {city: "520700000000",companyId: null,companyName: null,country: null,county: null,createTime: "2018-12-13 16:01:56",def: "0",id: "6",inviteType: 0,province: "520000000000",shortUrl: "nuUnEv",userCode: 10000005,userId: "37303904",userName: "moon",validType: 1,village: null},
        {id: "8", userId: "37303904", userName: "moon", userCode: 10000007, shortUrl: "jmiaMr", province: null,shortUrl: "jmiaMr",userCode: 10000007,userId: "37303904",userName: "moon",validType: 1,village: null},
        {city: "130100000000",companyId: null,companyName: null,country: "130183000000",county: "130183000000",createTime: "2018-12-11 16:46:32",def: "0",id: "1",inviteType: 0,province: "130000000000",shortUrl: "B36feq",userCode: 10000000,userId: "37303904",userName: "moon",validType: 1,village: "130183104212"}*/
        ],
        showDelConfirm:false,
        confirmCode:'',
        CodeisFull:false,
    }
  },
  computed: {
    usericon: function() {
      //      return window.localStorage.getItem("user_pic")
      return this.$store.state.user.user_pic
    },
    nickname: function() {
      //      return window.localStorage.getItem("nick_name")
      return this.$store.state.user.nick_name
    },
    organ_name: function() {
      //      return window.localStorage.getItem("org_name")
      return this.$store.state.user.org_name
    }
  },
  created() {
    let self = this
    this.getCodeList();
    // this.$http.post('uts/user/myQRCode', {}, { responseType: 'blob' }).then(function(response) {
    //   console.log(response)
    //   if (!response.msg) {
    //     let blob = new Blob()
    //     blob = response
    //     console.log('blob <br/>'+blob)
    //     console.log('blob <br/>'+self.codeimg)
    //     self.codeimg = window.URL.createObjectURL(blob) //有问题，将blob加载到img中 由于blob太大 会有性能影响 应该怎么在加载之后 如何释放呢：
    //     let img = self.$el.querySelector('#qcode')
    //     img.onload = function(e) {
    //       window.URL.revokeObjectURL(img.src) //释放。
    //     }
    //   } else {
    //     //alert(response.msg)
    //     this.showToast('', 'text', response.msg, '20em', 'top')
    //   }
    // })
  },
   mounted(){
    this.vos.title = "我的邀请码"
    this.vos.desc = "分享邀请码，让更多人来贡献爱心吧"
    this.vos.link = this.WinXinHost + '#' + location.href.split('#')[1]
    this.vos.imgUrl = "../../../../static/appimg/share_icon.png"
    this.vos.demandId = ""
  },
  methods: {
    toType() {
      if(this.CodeList.length==4){this.CodeisFull=true
      }else{this.$router.push({path:'/inviteType', query:{'rfrom':'inviteCode'}})}
      /*if (this.isWeixinCient()) {
        this.setWeixinConfig(this.vos)
        alert('点击右上角"...",分享给朋友或朋友圈，让更多的人帮助TA')
      }else if(window.api){
        this.$refs.sharea.toShare()
      }else{
        this.showToast('', 'text', '网页上无法分享，请使用APP或微信')
      }*/
    },
    getAreaCode(item,index){
      this.getAreaName(item.userProvince,'provName',index);
      this.getAreaName(item.userCity,'cityName',index);
      if(item.userVillage==null||item.userVillage==item.userCountry){
        if(item.userCountry==null||item.userCountry==item.userCounty){
          if(item.userCounty==null||item.userCounty==item.userCity){
          }else{
            this.getAreaName(item.userCounty,'countyName',index);
          }
        }else{
          this.getAreaName(item.userCounty,'countyName',index);
          this.getAreaName(item.userCountry,'countryName',index);
        }
      }else{
        this.getAreaName(item.userCounty,'countyName',index);
        this.getAreaName(item.userCountry,'countryName',index);
        this.getAreaName(item.userVillage,'villageName',index);
      }
    },
    getAreaName(areacode,name,index){
      let self=this;
      this.$http.post('eai/authRegion/selectRegionDate',{code:areacode}).then(res=>{
        self.$set(self.CodeList[index],name,res.data.regionName)
      })
    },
    getCodeList(){
      let self = this
      this.$http.post('uts/invitationCode/getQrCodeList',{userId:this.$store.state.user.id}).then(res=>{
        if(res.code='UTSI0000'){
          self.CodeList=res.data;
          self.$nextTick(function(){
            for(let i=0;i<self.CodeList.length;i++){
              let name=['provName','cityName','countyName','countryName','villageName']
              for(let j=0;j<name.length;j++){
                self.$set(self.CodeList[i],name[j],'')
              }
              self.getAreaCode(self.CodeList[i],i)
              self.qrcode(self.CodeList[i].userCode,i)
            }
          })
          
        }
      })
    },
    invited(item){
      let self=this;
      let param={
        userId:this.$store.state.user.id,
        id:item.id,
        province:item.province
      };
      this.$http.post('uts/invitationCode/updateDefault',param).then(res=>{
        console.log(res)
        if(res.data=='成功'){
          this.$route.push('/inviteMine')
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    deletedConfirm(usercodeid,usercode){
      this.confirmCode=usercode;
      this.confirmId=usercodeid;
      this.showDelConfirm=true;
    },
    cancelInvite(){
      this.CodeisFull = false;
    },
    cancelDeleted(){
      this.showDelConfirm=false;
    },
    confirmDeleted(){
      this.showDelConfirm=false;
      this.deleted(this.confirmId)
    },
    deleted(codeid){
      let self=this;
      let param={
        userId:this.$store.state.user.id,
        id:codeid
      };
      this.$http.post('uts/invitationCode/deleteQrCode',param).then(res=>{
        if(res.code=='UTSI0000'){
          self.getCodeList();
        }else{
          alert('删除失败，请刷新页面重试')
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    qrcode: function (t,index) {
      let id='QRCodeId'+index;
      document.getElementById(id).innerHTML = ""
      // console.log(t)
      let qrcode = new QRCode(id, {
        width: 70,
        height: 70, // 高度
        text: 'https://wx.fpmai.com/m/index.html#/inviteislog?NumCode='+t, // 二维码内容
        // render: 'table', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f',
        // foreground: '#ff0'
      })
    },
    QRCodeId(index){
      return 'QRCodeId'+index;
    },
  }
}
</script>

<style scoped>
.myinvitecode {
  padding: 30px;
}

.myinvitecode h1 {
  margin: 15px 0 0 0;
}

.myinvitecode p {
  margin-bottom: 20px;
}

.myinvitecode p.tip {
  margin-top: 20px;
}

/*分享弹窗*/

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
/*NOCODE*/
.NoListCont{
  margin-top: 90px;
  height: 162px;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #999;
}

/*QRCODE*/
.QRCode_Each{
  height: 162px;
  width: 100%;
  text-align: left;
  /*margin-bottom: 10px;*/
}
.QRCode_Each_From{
  height: 38px;
  line-height: 38px;
  font-size: 11px;
  text-align: left;
  color: #999;
  background: #FFF;
}
.QRCode_Each_From .From{
  display: flex;
  justify-content: flex-start;
  margin:auto auto auto 15px;
}
.QRCode_Each_From .From>div{
  width: 17px;
  height: 17px;
}
.QRCode_Each_From .From p{
  font-size: 15px;
  color:#666;
  /*font-family: "SourceHanSansCN Regular";*/
  text-indent: 10px;
}
.QRCode_Each_Show{
  /*font-family: "SourceHanSansCN Regular";*/
  background: #f6f6f6;
  height: 86px;
  text-align: left;
  font-size: 14px;
}
.QRCode_Each_Icon{
  float: left;
  width: 70px;
  height: 70px;
  margin:8px 10px 8px 15px;
}
.QRCode_Each_Cont{
  width: 65%;
  float: left;
  height: 70px;
  margin: 8px auto;
}
.QRCode_Each_Cont p:first-child{
  width: 100%;
  height: 47px;
  color: #666;
  white-space: pre-wrap;
}
.QRCode_Each_Cont p:last-child{
  /*font-family: "SourceHanSansCN Regular";*/
  color: #919090;
  width: 100%;
  height: 23px;
  line-height: 23px;
}
.QRCode_Each_Set{
  height: 38px;
  background: #FFF;
  vertical-align: middle;
  font-size: 13px;
}
.QRCode_Set_numCode{
  float: left;
  color: #EE6B2B;
  text-indent: 15px;
  line-height: 38px;
}
.QRCode_Set_Delete{
  float:right;
  width: 65px;
  height: 25px;
  margin: 6.5px 10px 6.5px auto;
  border: solid 1px #000;
  box-shadow: 0 0 0 0.5px #000;
  border-radius: 11.5px 11.5px;
  text-align: center;
  line-height: 23px;
}
.QRCode_Set_Use{
  float:right;
  right: 15px;
  width: 65px;
  height: 25px;
  margin: 6.5px 15px 6.5px auto;
  box-shadow: 0 0 0 0.5px #EE6B2B;
  color: #EE6B2B;
  border: solid 1px #EE6B2B;
  border-radius: 11.5px 11.5px;
  text-align: center;
  line-height: 23px;
}

/**/
.confirmSubmit{
  text-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  position: fixed;
  overflow: hidden;
  top: 0;
  z-index: 2;
}
.confirmSubmitDiv,.confirmSubmitDiv_l{
  width: 250px;
  margin: 0 auto;
  position: relative;
  top: 150px;
  background: #FFF;
  border-radius: 10px;
}
.confirmSubmitDiv{
  height: 206px;
}
.c_title{
  font-family: 'PingFangSC Medium';
  font-size: 17px;
  font-weight: bold;
  color: #333;
  padding-top: 20px;
}
.c_cont,.c_cont_l{
  font-family: 'PingFangSC Regular';
  font-size: 16px;
  width: 230px;
  margin: 0 auto;
  color: #666;
  margin-top: 20px;
  text-align: left;
}
.c_cont{
  height: 80px;
}
.c_cont_l{
  margin-top: 25px;
  text-align: left;
}
.confirmDiv{
  width: 100%;
  margin-top: 24px;
  border-top: 1px solid #CCC;
  position: absolute;
  bottom: 0;
}
.c_cancel,.c_confirm{
  width: 120px;
  font-size: 15px;
  height: 40px;
  float: left;
  line-height: 40px;
}
.c_cancel{
  font-family: 'SourceHanSansCN Regular';
  color: #919090;
  border-right: 1px solid #ccc;
  font-weight: bold;
}
.c_confirm{
  font-family: 'SourceHanSansCN Medium';
  color: #EE6B2B;
  font-weight: bold;
}
.c_confirm_s{
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #CCC;
  margin-top: 45px;
  font-family: 'SourceHanSansCN Medium';
  color: #EE6B2B;
  font-weight: bold;
}
</style>
