<template>
  <div class="needDetail-container">
    <div v-if="vos">
      <!--需求详情-->
      <p class="needDetail-title">需求详情</p>
      <div class="needContent-container" ref="detailContent">
        <div>
          <p class="needDetail-content" :class="{'avtive':!toOpen&&isLook}">{{vos.demand_coment}}</p>
        </div>
        <div class="unfold-field"> 
          <div v-show="toOpen" class="lookMask"></div>
          <div v-show="isLook" class="lookAll">
            <a @click="change" v-text="article.footinfo"></a>
          </div>
        </div>
      </div>
      <div class="needimg-container">
        <a style="padding-right:10px;" v-for="(item,index) in vos.demand_imgs" :key="index">
          <!-- <img :src="item" @click="clickImg" alt="详情图片"> -->
           <img v-lazy= "changetype(item)" alt="详情图片" @click="clickImg">
        </a>
      </div>
      <div class="issue-time">
          <img class="issue-time-tubiao" src="../../../../../static/appimg/fpw_logo_small.png">
          {{vos.publish_name}}&nbsp;发布于&nbsp;{{vos.demand_date}}
      </div>
    </div>
    <!-- 放大图片 -->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
  </div>
</template>

<script>
  import BigImg from '../../../../components/imgDialog/BigImg'
  import { getMinPic } from '../../../../util/getMin';
import { setTimeout } from 'timers';
  export default {
    props: ['vos'],
    components: {
      'big-img': BigImg
    },
    data () {
      return {
        toOpen: false,
        isLook:false,
        showImg: false,
        imgSrc: '',
        article: {
          'footinfo': '查看全文'
        },
        boxHeight:80,
        curHeight:0
      }
    },
    methods: {
      clickImg (e) {
        this.showImg = true
      // 获取当前图片地址
        this.imgSrc = e.currentTarget.src
      },
      viewImg () {
        this.showImg = false
      },
      change: function () {
        if (this.article.footinfo == '查看全文') {
          this.article.footinfo = '收起'
          this.toOpen = false
        } else {
          this.article.footinfo = '查看全文'
          this.toOpen = true
        }
      },
      changetype(imgurl){
          return getMinPic(imgurl);
      },
      lookAll(){
        this.curHeight=this.$refs.detailContent.getBoundingClientRect().height
        console.log(this.vos)
        if(this.curHeight>this.boxHeight){
          this.toOpen=true;
          this.isLook=true;
        }else{
          this.toOpen=false;
          this.isLook = false;
        }
       }
    },
    created() {
      
      setTimeout(()=>{
        this.lookAll();
      },100)
        
    
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .weui-grids
    display flex
    overflow-x auto
    .weui-grid
      display inline-block
      width 32%
      margin-right 2%
      padding 0
      &:before
        content ''
        border-right none
      &:last-child
        margin-right 0
  .needDetail-container
    padding 0 17px
    margin-bottom 10px
    background #fff
    .needDetail-title
      padding 16px 0 17px
      font-size 16px
      color #333
      background url('../../../../../static/appimg/needProve.png') right center no-repeat
      background-size 19px 19px
    .needContent-container
      position relative
      .needDetail-content
        max-height 82px
        padding-bottom 15px
        overflow: hidden
        font-size 13px
        color #666
        word-break break-all
        &.avtive
          max-height 5000px
          padding-bottom 36px
      .unfold-field
        position absolute
        bottom -1px
        width 100%
        .lookMask
          height 36px
          background-image linear-gradient(-180deg,rgba(255,255,255,0), #fff)
        .lookAll
          height 36px
          line-height 28px
          text-align center
          background #fff
          a
            color #EF835B
            font-size 13px
    .needimg-container
      display flex
      overflow-x auto
      .needimg-content
        position relative
        width 30%
        height 0
        padding-top 30%
        margin-right 1%
        flex 0 0 30%
        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          object-fit cover
          &:last-child
            margin-right 0
    .issue-time
      display flex
      align-items center
      justify-content flex-end
      padding 15px 0
      font-size 12px
      color #666
      img
        display inline-block
        width 20px
        height 20px
        margin-right 5px
</style>
