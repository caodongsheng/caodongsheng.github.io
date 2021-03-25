<template>
  <div id="slideCheck" :class="[{noClick:flag == true}]"></div>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../assets/js/Bus'
  export default {
    data(){
      let host = "https://newslide.tongfudun.com";
      return{
        config:{
          appId: '8882955',
          sessionId: 'A06326DC642088E47B76D08EDB524F56',
          //s: "41110208",  //web（登录）
          s: "81177363",  //web（注册）
          key:'43033829e5c0966efcf1259aa02y7d21',
          path: {
            JigsawUrl: host + "/api/v1/getJigsaw",
            checkUrl: host + "/api/v1/verifyJigsaw",
            beeUrl: host + "/api/v1/collect"
          },
          timeout:2000,//所有请求的超时时间 单位ms
          /*
           可以通过配置此路径修改默认图标
           */
          //自定义滑动条样式演示
          font: {
            content: "请向右滑动",
            fontSize: "20px"
          },
          background: {
            height: "40px",
            width: "290px",
            border: "1px solid #ccc"
          },
          arrow: {
            background: "#fff url(./static/appimg/arrow.png) center center no-repeat",
            height: "40px",
            width: "40px"
          },
          arrowActive: {
            background: "#fff url(./static/appimg/arrow.png) center center no-repeat",
            height: "40px",
            width: "40px"
          },
          progress: {
            backgroundColor: "#46c33b",
          },
        },
        tokenId:'',
        flag:false
      }
    },
    props:{
      sID:{
        type:String,
        default:null
      }
    },
    methods:{
      starting(){},
      finish(res){
        let k = res.tokenId
        this.$emit('commitSuccess',true,k)
      },
      loading(){},
      failed(msg){
        this.$emit('commitFail',msg)
      },
      timeOut(){
        psd.refresh();
      },
    },
    mounted (){
      Bus.$on('funClick',(res)=>{
        if(res === true){
          psd.refresh();
        }
      })
      this.$nextTick(() =>{
        let psd = new PayEgisLockConfig();
        window.psd = psd;
        psd.makeSlide("slideCheck", this.config, this.starting, this.loading, this.finish, this.failed, this.timeOut);
      },20)
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #slideCheck{
    margin-top: 1.17647059em;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
    position: relative;
    &.noClick{
      pointer-events: none;
    }
  }
</style>
