<template>
  <div style="height: 100%;z-index: 1000000;">

    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide><img src="../../../static/appimg/banner1.png"></swiper-slide>
      <swiper-slide><img src="../../../static/appimg/banner1.png"></swiper-slide>
      <swiper-slide><img src="../../../static/appimg/banner1.png"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 计时器 -->
    <div class="jsq">
      略过
    </div>

  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {swiper, swiperSlide},
    methods: {},
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    }
  }
</script>
<style scoped>
  .swiper-container {
    height: 100%;
    z-index: 1000000;
  }

  .swiper-pagination-bullets {
    position: fixed;
  }

  .swiper-slide img {
    width: 100%;
    height: 100%
  }

  .jsq {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #c9c9c9;
    font-size: 14px;
    background: #ffffff;
    border-radius: 100%;
    position: fixed;
    right: 15px;
    top: 15px;
    z-index: 1000001;
  }
 
</style>
