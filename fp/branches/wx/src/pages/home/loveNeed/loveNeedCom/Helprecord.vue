<template>
<div v-if="totals>0&&type==1" class="needDetail-helpRecordContainer">
  <div class="goodContent">
    <div class="content-lf">
      <avatar width="35" height="35" tsize="2" :image="getImage(goodVos)" :name="goodVos.user_name"></avatar>
    </div>
    <div class="content-rg">
      <p class="helpName">{{goodVos.user_name}}</p>
      <p class="heplTip">帮扶了TA</p>
      <p class="helpContent">{{goodVos.message}}</p>
      <div class="helpImgContainer">
        <a v-for="(item,index) in goodVos.img" :key="'img'+index" class="helpImg">
          <img :src="item" alt="帮扶图片">
        </a>
      </div>
      <p class="loveHot"><!-- 111 --><span>{{goodVos.contribute_time}}</span></p>
    </div>
  </div>
</div>
<div v-else-if="totals>0&&type==2" class="needDetail-helpRecordContainer">
  <div class="helpRecordSort-container">
     <div class="helpRecord-sort">
       <span
       v-for="(item,index) in conNav"
      :class="{active:index == sortIndex}"
      @click="tab(index)" :key="'sort'+index">{{item.name}}</span>
     </div>
  </div>
  <div class="content-container">
    <ul class="helpRecord-content">
      <li v-show="sortIndex==0" v-for="(item,index) in dateList" :key="'content'+index">
        <div class="content-lf">
          <!-- <avatar width="45" height="45" tsize="2" :image="getImage(item)" :name="item.user_name"></avatar> -->
          <avatar width="45" height="45" tsize="2" :image="item.user_pic" :name="item.user_name"></avatar>
        </div>
        <div class="content-rg">
          <p class="helpInfo"><span class="threeColor">{{item.user_name}}</span>&emsp;帮扶了&emsp;<span class="orangeColor">{{item.paid_money}}</span>&emsp;元</p>
          <p class="loveMessage">{{item.message}}</p>
          <p class="loveHot"><!-- {{item.paid_money*2}} --><span>{{item.contribute_time}}</span></p>
        </div>
       </li>
      <li v-show="sortIndex==1" v-for="(item,index) in moneyList" :key="index">
        <div class="content-lf">
          <avatar width="45" height="45" :image="item.user_pic" tsize="2" :name="item.user_name"></avatar>
        </div>
        <div class="content-rg">
          <p class="helpInfo"><span class="threeColor">{{item.user_name}}</span>&emsp;帮扶了&emsp;<span class="orangeColor">{{item.paid_money}}</span>&emsp;元</p>
          <p class="loveMessage">{{item.message}}</p>
          <p class="loveHot"><!-- {{item.paid_money*2}} --><span>{{item.contribute_time}}</span></p>
        </div>
       </li>
     </ul>
         <p v-if="(sortIndex==0&&totals>10&&dateList.length<totals)||(sortIndex==1&&totals>10&&moneyList.length<totals)" @click="moreRecordBtn" class="moreRecord">更多记录</p>
     <p v-if="(sortIndex==0&&totals>10&&dateList.length==totals)||(sortIndex==1&&totals>10&&moneyList.length==totals)" @click="foldRecordBtn" class="moreRecord">收起</p>
     <p v-if="(sortIndex==0&&totals<10&&dateList.length==totals)||(sortIndex==1&&totals<10&&moneyList.length==totals)" class="noMoreRecord">-已无更多帮扶记录-</p>
  </div>
  <!-- <projectile v-show="onFetching"></projectile> -->
</div>
<div v-else-if="totals<=0" class="noHelpRecord">
  <p>暂无记录</p>
</div>
</template>
<script>
import avatar from '../../../../components/util/avatar'
export default {
  components: {avatar},
  props: ['paramsID','type'],
  data () {
    return {
      projectile: false,
      dateList:[],
      moneyList:[],
      goodVos:'',
      sortIndex:0,//按时间按金额
      sortRule:'create_date',//接口传参按时间或按金额
      datePage:1,//接口传参page页码
      moneyPage:1,
      totals:'',
      isTab:true,//tab点击是否第一次点击
      conNav: [{id: 1, name: '按时间'}, {id: 2, name: '按金额'}],
    }
  },
  methods: {
    // 点击更多记录显示收起
    getImage(item){
      if(item.ishide == 1 || item.ishide == '1'){
        return '../../../../static/appimg/fpw_logo_small.png'
      }else{
        return item.user_pic
      }
    },
     moreRecordBtn () {
      let _this=this;
      if(_this.sortIndex==0){
        _this.datePage=_this.datePage+1;
        _this.initRecord();
      }else{
        _this.moneyPage=_this.moneyPage+1;
        _this.initRecord();
      }

    },
    // 收起帮扶记录
    foldRecordBtn(){
      if(this.sortIndex==0){
        this.dateList.splice(10,this.dateList.length-10);
        this.datePage=1;
      }else{
        this.moneyList.splice(10,this.moneyList.length-10);
        this.moneyPage=1;
      }
    },
    initRecord(){
      let _this=this;
      let data;
      if(_this.type==1){
        // 物
        data={
          demand_code:_this.paramsID
        }
      }else if(_this.type==2){
        //资金
        data={
          demand_code:_this.paramsID,
          page:_this.sortIndex==0?_this.datePage:_this.moneyPage,
          sortRule:_this.sortRule
        }
      }
      this.$http.post('hts/help/helpRecord',data)
        .then(function (response) {
          _this.totals=response.data.totals;
          if(_this.type==1){
            _this.goodVos=response.data.vos;
          }else if(_this.type==2){
            if(_this.sortIndex==0){
              for (var i =0; i < response.data.vos.length; i++) {
                _this.dateList.push(response.data.vos[i])
              }
            }else{
              for (var i =0; i < response.data.vos.length; i++) {
                _this.moneyList.push(response.data.vos[i])
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 时间与金额的切换
    tab (index) {
      this.sortIndex = index;
      if(index==0){
        this.sortRule='create_date';
      }else{
        this.sortRule='paid_money';
      }
      if(this.isTab){
        this.isTab=false;
       
        this.initRecord();
      }
    }
  },
  watch:{
    type(){
      this.initRecord();
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
/*
热度UI
 padding-left 12px
  background url('../../../../../static/appimg/loveHot.png') left center no-repeat
  background-size 9px 12px
  span
    margin-left 14.6666%
*/
  .noHelpRecord
    p
      padding 20px 0 18px
      font-size 14px
      color #999
      text-align center
      background #fff
  .needDetail-helpRecordContainer
    background #fff
    .goodContent
      display flex
      padding 18px 17px 13px
      .content-lf
        flex 0 0 35px
      .content-rg
        padding 0 0 0 6px
        flex 1
        .helpName
          color #333
          font-size 14px
        .heplTip
          color #999
          font-size 12px
        .helpContent
          margin 13px 0 15px
          color #666
          font-size 15px
        .loveHot
          font-size 11px
        .helpImgContainer
          display flex
          justify-content space-between
          flex-flow wrap
          .helpImg
            position relative
            width 32%
            padding-top 32%
            flex 0 0 32%
            flex-wrap wrap
            margin 0 0 10px
            img
              position absolute
              top 0px
              left 0px
              width 100%
              height 100%
              background-color red
    .helpRecordSort-container
      padding 24px 0 11px
      .helpRecord-sort
        display flex
        width 46.6666%
        margin 0 auto
        padding 10px 0 10px
        font-size 14px
        background #F6F6F6
        border-radius 5px
        span
          width 50%
          color #333
          text-align center
          &.active
            color #F37306
          &:first-child
            position relative
            &:after
              position absolute
              top 0
              bottom 0
              right 0
              content ""
              border-right 1px solid #DCDCDC
    .content-container
      .helpRecord-content
        padding 0 15px
        li
          position relative
          display flex
          padding 15px 0
          &:after
            position absolute
            bottom 0
            left 0
            right 0
            border-top 1px solid #E5E5E5
            content ''
          &:last-child
            border none
          .content-lf
            flex 0 0 45px
            img
              display inline-block
              width 45px
              height 45px
              border-radius 50%
          .content-rg
            flex 1
            padding-left 15px
            p
              color #999
              &.helpInfo
                font-size 14px
              &.loveMessage
                margin 8px 0 10px
                font-size 15px
              &.loveHot
                font-size 11px
              .threeColor
                color #333
              .orangeColor
                color #F37306
      .moreRecord,.noMoreRecord
        padding 13px 0
        font-size 13px
        color #EF835B
        text-align center
      .noMoreRecord
        color #999
</style>

