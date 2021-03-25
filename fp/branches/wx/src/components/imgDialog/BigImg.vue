<template>
  <!-- 过渡动画 -->
  <div class="img-view" @click="bigImg">
    <!-- 遮罩层 -->
    <div class="img-layer"></div>
    <div class="img">
      <img :src="imgSrc">
      <!-- <img :src="changetype(imgSrc)"> -->
    </div>
  </div>
</template>
<script>
 import { getMaxPic } from '../../util/getMax';
  export default {
    props: ['imgSrc'],
    methods: {
      bigImg() {
        // 发送事件
        this.$emit('clickit')
      },
    //   changetype(imgsrc){
    //       return getMaxPic(imgsrc);
    //   }
    }
  }
</script>
<style scoped>
  /*动画*/
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
  }

  .fade-enter,
  .fade-leave-active {
    transform: translate3D(100%, 0, 0);
  }


  /* bigimg */

  .img-view {
    position: relative;
    width: 100%;
    height: 100%;

  }

  /*遮罩层样式*/
  .img-view .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /*不限制图片大小，实现居中*/
  .img-view .img img {
    width: 90%;
    display: block;
    position: fixed;
    top: 20%;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 10000;
  }
</style>
