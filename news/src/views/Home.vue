<template>
  <div class="home">
    <van-swipe class="HEIGHT" vertical @change="onChange">
        <van-swipe-item>
            <index></index>
        </van-swipe-item>
        <van-swipe-item>
            <about></about>
        </van-swipe-item>
        <van-swipe-item>
            <skill></skill>
        </van-swipe-item>
        <van-swipe-item>
            <experience></experience>
        </van-swipe-item>
        <van-swipe-item>
            <works></works>
        </van-swipe-item>
        <van-swipe-item>
            <contact-me></contact-me>
        </van-swipe-item>
        <!-- 指示器 -->
        <div class="custom-indicator" slot="indicator">
            <span>{{navList[navIndex].title}}</span>
        </div>
    </van-swipe>
    
  </div>
</template>

<script>
import about from '@/views/About'
import contactMe from '@/views/contactMe'
import experience from '@/views/experience'
import index from '@/views/index'
import skill from '@/views/skill'
import works from '@/views/works'
export default {
  name: 'home',
  components: {
    about,
    works,
    skill,
    index,
    experience,
    contactMe,
  },
  data(){
    return {
      navIndex:0,
      navList:[
        {
          title:'首页',
        },
        {
          title:'关于我',
        },
        {
          title:'技能栈',
        },
        {
          title:'经历',
        },
        {
          title:'作品',
        },
        {
          title:'联系我',
        },
      ],
    }
  },
  methods: {
    onChange(i){
      this.navIndex=i
      console.log(i)
    },
  },
}
</script>
<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .HEIGHT{
      height: 100%;
    }
    .custom-indicator{
      background: #ccc;
      top: 10px;
      left: 50%;
      position:absolute;
    }
  }
</style>