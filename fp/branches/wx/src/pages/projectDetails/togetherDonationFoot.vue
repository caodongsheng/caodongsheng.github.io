<template>
  <div  class="box-full over-auto">

    <div class="Donation-header">
        <h3>215466人参与一起捐</h3>
        <a class="iconb" href="/">更多>></a>
    </div>
<!------>


  </div>
</template>




<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {
      swiper, swiperSlide
    }

  }
</script>

<style scoped>
  .Donation-header{
    z-index: 1;
    width: 100%;
    background-color: #fff;
    display: table;
    position: relative;
    border-bottom: 1px solid #e5e5e5;

  }
  .Donation-header h3 {
    text-align: center;
    font-size: 1.4em;
    color: #333;
    display: table-cell;
    font-weight: 500;
    text-align: left;
    padding: 0.2em 0;
    padding-left: 0.5em;
  }
  .Donation-header .iconb{

    position: absolute;
    right: 5px;
    vertical-align: middle;
    color: #999999;
    font-size: 1.4em;
    padding: 0.2em 0;
    padding-right: 0.5em;
  }




  .swiper-container {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
  }
  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform,-webkit-transform;
    box-sizing: content-box;
  }
  .examples>.example .swiper-container .swiper-slide {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: #eee;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
</style>
