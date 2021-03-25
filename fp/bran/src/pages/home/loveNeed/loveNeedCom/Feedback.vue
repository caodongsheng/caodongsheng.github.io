<template>
  <div v-if="totals>0" class="feedback-container">
    <ul class="feedback-list">
      <li v-for="(item,index) in list" :key="index">
        <p class="feedback-time">{{item.create_date}}</p>
        <div class="feedback-content">
          <div class="title-container">
            <p class="title-content"><span>{{item.publisher_name}}</span>&ensp;发布进展</p>
            <!--<p>图标</p>-->
          </div>
          <p class="feedback-text">{{item.dynamic_comment}}</p>
          <div class="feedback-container">
            <div class="feedbackImg-content" v-for="(item,index) in item.img" :key="index">
              <img  @error="setErrorImg" :src="item" alt="进展图片" @click="clickImg" v-if="item !== null">
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 查看更多动态 -->
    <div v-if="list.length>10&&list.length<totals" class="moreDynamic-container"><span @click="lookMore">查看更多爱心反馈</span></div>
    <div v-if="totals>10&&list.length==totals" class="moreDynamic-container"><span @click="fold">收起</span></div>
    <div v-if="totals<10&&list.length==totals" class="moreDynamic-container"><span @click="fold">没有更多爱心反馈</span></div>

     <!-- 放大图片 -->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
  </div>
  <div v-else-if="totals<=0" class="nofeedback">
    <p>暂无爱心反馈</p>
  </div>
</template>
<script>
// import {Timeline, TimelineItem} from "vux";
// import projectile from "./projectile"
import BigImg from '../../../../components/imgDialog/BigImg'
export default {
  props:['paramsID'],
  components: {
    BigImg
  },
  data(){
    return {
      feedbackPage:1,
      list:[],
      totals:0,
        showImg: false,
      imgSrc: '',
    }
  },
  methods:{
    initFeedback(){
      let _this=this;
      this.$http.post('hts/help/dynamic',{
        demand_code:_this.paramsID,
        page:_this.feedbackPage,
        dynamic_type: 2
      })
        .then(function (response) {
          _this.totals=response.data.totals

          for (var i =0; i < response.data.vos.length; i++) {
            _this.list.push(response.data.vos[i])
          }

        })
        .catch(function (error) {
        })
    },
     //查看更多
    lookMore(e){
      this.feedbackPage=this.feedbackPage+1
      this.initFeedback();
    },
    // 收起
    fold(){
      this.list=this.list.slice(0,10);
      this.feedbackPage=2;
    },
    //点击放大图片
    clickImg(e) {
        this.showImg = true;
        if(e.currentTarget.src.indexOf("min") !== -1) {
            e.currentTarget.src = e.currentTarget.src.replace('min','max');
            this.imgSrc = e.currentTarget.src;
        }
        
    },
     viewImg() {
        this.showImg = false;
    },
    // 设置默认图片
    setErrorImg(){
      this.img=''
    }
  },
  created(){
    this.initFeedback();
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  p
    word-break break-all
  .nofeedback
    p
      padding 20px 0 18px
      font-size 14px
      color #999
      text-align center
      background #fff
  .feedback-container
    padding 24px 17px 20px
    background #fff
    .feedback-list
      li
        display flex
        .feedback-time
          flex 0 0 80px
          padding-right 10px
          text-align center
          font-size 14px
          color #999
        .feedback-content
          flex 1
          position relative
          padding 0 0 0 10px
          &:before
            position absolute
            left 0
            top 0
            bottom 0
            content ''
            border-left 1px solid #FD6524
            z-index 10
          .title-container
            display flex
            justify-content space-between
            .title-content
              position relative
              font-size 15px
              color #999
              &:before
                position absolute
                top 3px
                left -16px
                width 8px
                height 8px
                border-radius 8px
                background #FF6226
                border 3px solid #FDBE9B
                content ''
              span
                color #39AEDE
          .feedback-text
            margin 12px 0 10px
            color #666
            font-size 14px
          .feedback-container
            font-size 0
            margin-bottom 15px
            .feedbackImg-content
              position relative
              width 32%
              height 0
              padding-top 32%
              margin 0 2% 5px 0
              img
                display inline-block
                position absolute
                top 0px
                left 0px
                width 100%
                height 100%
                object-fit cover
              &:nth-child(3n+3)
                  margin-right 0
        &:first-child
          .feedback-content
            &:before
              top 6px
        &:last-child
          .feedback-content
            &:before
              bottom 15px
            .feedback-img
              margin 0
    .moreDynamic-container
      position relative
      padding 15px 0 0 100px
      &:before
        position absolute
        top -14px
        left 90px
        bottom 13px
        border-left 1px dashed #FE6521
        content ''
      span
        position relative
        display inline-block
        padding 5px 10px
        color #FE6521
        border-radius 4px
        border 1px solid #FE6521
        &:before
          position absolute
          top 39%
          left -14px
          width 5px
          height 5px
          background #fff
          border 1px solid #FE6521
          border-radius 5px
          content ''
    // .noMoreFeedBack
</style>


