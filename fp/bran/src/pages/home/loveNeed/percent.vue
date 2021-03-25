<template>
  <div>
    <div class="percent-container">
      <p class="needTitle">{{vos.demand_title}}</p>
      <ul class="user-num">
        <li><p>目标金额</p>
          <p>{{vos.target_amount}}</p></li>
        <li><p>已筹金额</p>
          <p>{{vos.moneycount}}</p></li>
        <li><p>帮扶次数</p>
          <p>{{vos.donatecount}}</p></li>
      </ul>
      <div class="canvasContainer">
        <canvas class="percentCanvas" ref="canvasId">
        </canvas>
        <p class="percentContent">{{Number(vos.speed)}}%</p>
        <p class="percentState">{{getDemandStatus()}}</p>
        <p class="spendTime">该项目用时{{vos.overTime}}天</p>
      </div>
    </div>
    <div class="moneyuse-container">
      <p class="useContent">资金用途-{{vos.demand_use}}</p>
    </div>
  </div>
</template>

<script>
  // import { XCircle } from 'vux'
  export default {
    props: ['vos'],
    // components: {
    //   XCircle
    // },
    data () {
      return {
       // percent: this.vos.speed>100?100:this.vos.speed
      }
    },
    methods:{
      
      getDemandStatus(){
       const demand_status = this.vos.demand_status;
       switch(demand_status){
         case 1:
         return "待审核";
         break;
          case 2:
         return "审核不通过";
         break;
          case 3:
         return "帮扶中";
         break;
          case 4:
         return "等待提现";
         break;
          case 5:
         return "提现中";
         break;
          case 8:
         return "发布超时";
         break;
          case 9:
         return "帮扶失败";
         break;
          case 10:
         return "已关闭";
         break;
          case 11:
         return "帮扶成功";
         break;
       }
      },
      myCanvas(){

        let c=this.$refs.canvasId;
        let ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = "#e1e1e1";
        ctx.lineWidth = "9";
        ctx.arc(c.width/2,75,68,0.75*Math.PI,2.25*Math.PI,false);
        ctx.stroke();
        ctx.restore();
        // 绘制比例圆
        ctx.save();
        ctx.beginPath();
        var gradient=ctx.createLinearGradient(0,0,170,0);
        gradient.addColorStop("0","#FFAD71");
        gradient.addColorStop("1","#F37306");
        ctx.strokeStyle=gradient;
        ctx.lineWidth = "9";
        let percent = this.vos.speed
        if(percent>100){
         percent=100
        }
        ctx.arc(c.width/2,75,68,0.75*Math.PI,0.75*Math.PI+1.5*percent/100*Math.PI,false);
        ctx.stroke();
        ctx.restore();
      }
    },
    mounted(){
      this.myCanvas()
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .percent-container
    padding 0px 17px 28px
    margin 0
    text-align center
    background-color #fff
    .needTitle
      text-align left
      color #333
      font-size 16px
      font-weight bold
    .user-num
      display flex
      align-items center
      padding 10px 0 12px
      margin 16px 0 8px
      /*background #F6F6F6*/
      border-radius 5px
      li
        width 33%
        position relative
        text-align center
        &:after
          content ''
          position absolute
          width 1px
          top 0
          bottom 0
          right 0
          background  #eee
      li:last-child
        &:after
         background none
        p:first-child
          font-size 13px
          color #7B7872
        p:last-child
          font-size 15px
          color #333
          font-weight bold
    .canvasContainer
      position relative
      .percentCanvas
        width 100%
      .percentStart
        width 12px
        height 12px
        background-color red
      .percentContent
        position absolute
        top 30%
        width 100%
        text-align center
        font-size 34px
        color #FF6325
        font-weight bold
      .percentState
        position absolute
        bottom 0
        left 50%
        width 86px
        height 38px
        line-height 37px
        margin-left -44px
        font-size 15px
        font-weight bold
        color #333
        /*background url('../../../../static/appimg/circle.png') no-repeat*/
        background-size 100% 85%
      .percentNumber
        position absolute
        bottom 14px
        width 136px
        left 50%
        margin-left -68px
        color #D2D2D2
        font-size 12px
      .spendTime
        position absolute
        width 100%
        bottom -15px
        font-size 14px
        color #666
        text-align center
    .percentSvg-container
      width 123px
      height 113px
      margin -10px auto
      .percentSvg
        width 100%
        height 100%
  .moneyuse-container
    width 100%
    padding 10px 0 10px
    text-align center
    background-color #FAFAFA
    .useContent
      display flex
      align-items center
      justify-content center
      font-size 15px
      color #333
      i
        width 14px
        height 14px
        margin 0 0 0 7px
        background url('../../../../static/appimg/needProve.png') right center no-repeat
        background-size 100% 100%
    // .useList
    //   display flex
    //   li
    //     border 1px solid #DDDCE2
</style>

