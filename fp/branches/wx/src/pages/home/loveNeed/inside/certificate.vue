<template>
  <div class="payWrapper">
    <!--头部-->
    <headerBackTitleShare
      :headerTitle='headerTitle'
      :vos="vos"
    ></headerBackTitleShare>
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
  import {Flexbox, FlexboxItem, Divider, XInput, XButton, XSwitch, XTextarea} from 'vux'
  import headerBackTitleShare from '../../../../components/header/headerBackTitleShare'

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Divider,
      XInput,
      XButton,
      XSwitch,
      headerBackTitleShare,
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
        formatDate(strTime){
            let date = new Date(strTime)
            let minu = date.getMinutes()>10? date.getMinutes() : '0'+date.getMinutes()
    return date.getFullYear()+'-'+(date.getMonth()+1)+"-"+date.getDate()+" " +date.getHours()+":"+minu+":"+date.getSeconds()
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
        imgUrl:'../../../../../static/appimg/share_icon.png',
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
