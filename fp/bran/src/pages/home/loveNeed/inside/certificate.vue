<template>
  <div class="payWrapper">
    <!--头部-->
    <!-- <headerBackTitleShare
      :headerTitle='headerTitle'
      :routepath="routepath"
      :vos="vos"
    ></headerBackTitleShare> -->
     <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">荣誉证书

        <a slot="right" @click="toShare"><i class="iconfont icon-f-share2 f-20"></i></a>
      </x-header>
    <div class="box-withheader over-auto">
      <!--荣誉证书-->
      <div class="cert-con">
        <div class="donateSu_logo"><img
            src="../../../../common/images/donateSu_logo.png"
            alt=""
          ></div>
        <div class="donateSu_title"><img
            src="../../../../common/images/donateSu_title.png"
            alt=""
          ></div>
        <div class="donateSu_con">
          <!-- <p>亲爱的<span class="donateName">{{ this.$route.query.user }}</span>：</p> -->
          <p>亲爱的<span class="donateName">{{  this.$route.query.user }}</span>：</p>
          <p>感谢您对贫困户<span class="poorName">{{ this.$route.query.to }}</span>的帮扶，您帮扶的<span class="donateGood">{{ this.$route.query.target}}<span v-if="typeof(this.$route.query.target) == 'number'">元</span></span>在其收到后，将第一时间给您反馈，请您及时关注！</p>
          <p>您的奉献，将点燃贫困同胞的希望。您的每一次帮扶，每一次转发，将助力贫困同胞早日摆脱贫困！</p>
          <p>精准识别、精准帮扶，中国社会扶贫网，让爱在阳光下连接！</p>
        </div>
        <div class="bfjigou">
          <div class="t">
            <span class="l"></span>
            <span class="n">中国社会扶贫网</span>
            <span class="l"></span>
          </div>
          <p class="donateTime">{{createTime == undefined ? formateTime : createTime}}</p>
        </div>
        <img
          class="gongzhang"
          src="../../../../common/images/gongzhang.png"
          alt=""
        >
      </div>

    </div>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem, Divider,XHeader, XInput, XButton, XSwitch, XTextarea} from 'vux'
import shareUrlParamsFilter from '@/util/filter.js';

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Divider,
      XHeader,
      XInput,
      XButton,
      XSwitch,
      XTextarea
    },
    beforeRouteEnter(to, from, next)  {
       next(vm => {
           vm.routepath = from.path
       })
    },
    data () {
      return {
        headerTitle: '荣誉证书',
        vos: {},
        createTime: this.$route.query.crtime,
        formateTime: '',
      }
    },
    methods: {
       backToPre(){
         console.log(this.routepath)
        
           this.$router.go(-1)
         
       },
        formatDate(strTime){
            let date = new Date(strTime)
            let minu = date.getMinutes()>10? date.getMinutes() : '0'+date.getMinutes()
    return date.getFullYear()+'-'+(date.getMonth()+1)+"-"+date.getDate()+" " +date.getHours()+":"+minu+":"+date.getSeconds()
        },
       toShare() {
      if (this.isWeixinCient()) {
        // let obj = {}
        // obj.title = `中国社会扶贫网，让爱在阳光下链接-${
        //   this.vos.region_name.indexOf('县') > 0
        //     ? this.vos.region_name.split('县')[0] + '县'
        //     : this.vos.region_name.split('市')[0] + '市'
        // }的需求${this.vos.demand_title}`
        // obj.desc = this.vos.demand_coment
        // obj.link = this.WinXinHost + '#' + location.href.split('#')[1]
        // obj.imgUrl = this.vos.imgUrl[0]
        // obj.demandId = this.vos.id;

      //  this.setWeixinConfig(this.vos)
         alert('点击右上角"...",分享给朋友或朋友圈，让更多的人帮助TA')
      } else if(this.isapp()){
      //  this.$refs.sharea.toShare()
       // let downloadImg = this.shareImg
      let shareTitle1 = this.vos.title;
      let shareContent1 = this.vos.desc;
      if(shareContent1.length>100){
        shareContent1 = shareContent1.substr(0,100);
      }
      let shareUrl = shareUrlParamsFilter(this.vos.link)
      let downloadImg = this.vos.imgUrl;
      let url = shareUrl;
      let shareInfo = '{"picurl":"' + downloadImg+'","title":"' + shareTitle1 + '","text":"' + shareContent1 + '","type":"' + 6 + '","url":"' + url + '","ischange":' + '"2"' + '}'
      this.ModuleNative('share',shareInfo)
      // window.share.getShareDetailView(shareInfo);/     
       }else{
         this.showToast('', 'text', '网页上无法分享，请使用APP或微信')

      }
    },
    },
    computed: {

    },
    created () {
        // console.log(this.$route.params.userName);
        this.formateTime = this.formatDate(new Date())
            let nickname = this.$route.query.user ? this.$route.query.user : this.$route.params.userName
      let donatedname = this.$route.query.to
      this.vos = {
        title:nickname  + '的帮扶证书',
        desc:'非常感谢' + nickname  + '对贫困户' + donatedname + '的帮扶，您的奉献，将点燃贫困同胞的希望。您的每一次帮扶，每一次转发，将助力贫困同胞早日摆脱贫困！',
        link:this.WinXinHost + '#' + location.href.split('#')[1],
        imgUrl:this.H5PAY_URL+"static/appimg/share_icon.png",
        demandId:""
      }
     console.log(JSON.stringify(this.vos)+"aaa")
    },
    mounted () {
     
  
    }

  }
</script>

<style  scoped>
 .cert-con{background: url(../../../../common/images/donateSu_bg.png) no-repeat;background-size: 100% 100%;position: absolute;height: 100%;width:100%}
  .donateSu_logo{width: 47%;margin: 19% auto 0;}
  .donateSu_logo img,.donateSu_title img{width: 100%;}
  .donateSu_title{width: 72%;margin: 4% auto 4%;}
  .donateSu_con{width: 75%;margin: 0 auto;}
  .donateSu_con p{color:#666;margin-bottom: 0.5em;text-indent:2em;line-height: 20px;font-size:13px}
  .donateSu_con p:first-child{text-indent: 0;}
  .donateSu_con span{padding: 0 9px 2px;border-bottom: 1px solid #DCDCDC;margin-top: -2px;}
  .bfjigou{width: 65%;margin: 0 auto;position: fixed;top: 78%;left: 17.5%;}
  .bfjigou .t {display: flex;display: -webkit-flex;text-align: center; -webkit-align-items: center;align-items: center;color: #BF9130;font-size: 16px;}
  .bfjigou .t .l {-webkit-flex: 1;flex: 1;height: 1px;padding: 0 4px;background: #BF9130;}
  .bfjigou .t .n {font-size: 11px;padding: 0 18px;display: block;}
  .donateTime{text-align: center;color: #BF9130;font-size: 11px;}
  .gongzhang{position: fixed;right: 12.5%;top: 74%;width: 20%;}
  @media screen and (max-width: 320px) {
    .donateSu_con p{font-size: 13px;line-height: 20px;}
  }
  @media screen and (min-width: 361px) and (max-width: 375px){
    .donateSu_con p{font-size: 15px;}
  }

  @media screen and (min-width: 376px) and (max-width: 414px) {
    .donateSu_con p{font-size:15px;line-height: 28px;}
    .bfjigou{width: 65%;margin: 0 auto;position: fixed;top: 79%;left: 17.5%;}
    .donateSu_logo{margin: 18% auto 0;}
    .gongzhang{position: fixed;right: 12.5%;top: 71%;width: 20%;}
  }
</style>
