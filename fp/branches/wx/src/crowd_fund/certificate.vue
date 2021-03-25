<template>
  <div class="payWrapper">
    <!--头部-->
    <headerBackTitle headerTitle="荣誉证书" :vos="shareInfo" ref="header"></headerBackTitle>
    <div class="box-withheader over-auto">
    <!--荣誉证书-->
    <div class="cert-con">
      <div class="donateSu_logo"><img src="../assets/images/donateSu_logo.png" alt=""></div>
      <div class="donateSu_title"><img src="../assets/images/donateSu_title.png" alt=""></div>
      <div class="donateSu_con">
        <!-- <p>亲爱的<span class="donateName">{{ this.$route.query.user }}</span>：</p> -->
        <p>亲爱的<span class="donateName">{{ user}}</span>：</p>
        <p>感谢您对<span class="poorName">{{title}}</span>的帮扶，进展情况将第一时间给您反馈，请您及时关注！</p>
        <p>您的奉献，将点燃贫困同胞的希望。您的每一次帮扶，每一次转发，将助力贫困同胞早日摆脱贫困！</p>
        <p>精准识别、精准帮扶，中国社会扶贫网，让爱在阳光下连接！</p>
      </div>
      <div class="bfjigou">
        <div class="t">
          <span class="l"></span>
          <span class="n">中国社会扶贫网</span>
          <span class="l"></span>
        </div>
        <p class="donateTime">{{donateTime}}</p>
        <img class="gongzhang" src="../assets/images/gongzhang.png" alt="">
      </div>

      <div class="cakan">
          <span class="le" @click="goProjectDetail">查看详情</span>
          <span @click="shareFn">分享给好友</span>
      </div>
    </div>
    </div>
    <share ref="sharea"></share>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem, Divider, XInput, XButton, XSwitch,XTextarea} from 'vux'
  import headerBackTitle from '@/components/header/headerBackTitleShare'
  import share from '@/components/share/share'
  export default {
    components: {
        share,
      Flexbox,
      FlexboxItem,
      Divider,
      XInput,
      XButton,
      XSwitch,
      XTextarea,
      headerBackTitle
    },
    data () {
      return {
        imgUrl:require('../assets/images/fpw_logo_small.png'),
        shareInfo:{},
        user:'某某某',
        title:'中国社会扶贫网',
        donateTime:'',
      }
    },
    methods: {
        shareFn(){
            this.$refs.header.toShare()

        },
        goProjectDetail(){
            this.$router.push('/zcprojectDetail/'+this.$route.params.projectId)
        },


    },
    mounted () {

    },
    computed: {

    },
    created() {
        this.user = this.$route.params.user
        this.title = this.$route.params.projectname
        this.donateTime = this.$route.params.donateTime
        this.shareInfo = {
            title : '荣誉证书' || '中国社会扶贫网',
            desc: this.title,
            link : this.WinXinHost + '#' + location.href.split('#')[1],
            imgUrl: this.imgUrl,
            demandId:''
        };
    }

  }
</script>

<style  scoped>
.cakan{
    width: 55%;
    margin: 0 auto;
    margin-top: 10px;
    overflow: hidden;
}
.cakan span{
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    float: right;
    color: #fff;
    background: #FF6A00;
}
.cakan .le{
    float: left;
    color: #999;
    background: transparent;
}
 .cert-con{background: url(../assets/images/donateSu_bg.png) no-repeat;background-size: 100% 100%;position: absolute;height: 100%;width:100%}
  .donateSu_logo{width: 47%;margin: 19% auto 0;}
  .donateSu_logo img,.donateSu_title img{width: 100%;}
  .donateSu_title{width: 72%;margin: 4% auto 4%;}
  .donateSu_con{width: 75%;margin: 0 auto;}
  .donateSu_con p{color:#666;margin-bottom: 0.5em;text-indent:2em;line-height: 26px;}
  .donateSu_con p:first-child{text-indent: 0;}
  .donateSu_con span{padding: 0 9px 2px;border-bottom: 1px solid #DCDCDC;margin-top: -2px;}
  .bfjigou{width: 65%;margin: 0 auto;margin-top: 20px;position: relative;}
  .bfjigou .t {display: flex;display: -webkit-flex;text-align: center; -webkit-align-items: center;align-items: center;color: #BF9130;font-size: 16px;}
  .bfjigou .t .l {-webkit-flex: 1;flex: 1;height: 1px;padding: 0 4px;background: #BF9130;}
  .bfjigou .t .n {font-size: 11px;padding: 0 18px;display: block;}
  .donateTime{text-align: center;color: #BF9130;font-size: 11px;}
  .gongzhang{
      position: absolute ;
      width: 20%;
      margin-left: 80%;
      top: -6px;
 }
  @media screen and (max-width: 320px) {
    .donateSu_con p{font-size: 13px;line-height: 24px;}
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
