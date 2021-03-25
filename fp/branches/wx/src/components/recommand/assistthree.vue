<template>
  <div class="scrollswiper-wrap bg-ffffff mt-12"  style="padding: 15px">
    <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper" slot="header">
      <!-- 轮播con -->
      <swiper-slide v-for="(item1,index) in item.img" :key="index">
        <router-link :to="todetail(item)"  class="dis-block linkonly">
          <img :src="item1" style="width:100%;height:100px">
        </router-link>
      </swiper-slide>
    </swiper>
    <div slot="content" class="card-padding">
      <p  class="f-16 tit-nowrap">{{'ssssssssss',item.demand_title}}</p>
    </div>
  </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'


export default{
  name: 'assistthree',
  components: {swiper, swiperSlide},
  props:{
       item:{
         type:Object,
         default:null
       }
  },
  data(){
      return {
        swiperOption: {
          notNextTick: true,
          slidesPerView: 3,
          spaceBetween: 10
        }
      }
  },
  methods:{
    todetail(item){
      return "/loveNeed/"+item.id;
    }
  }
}
</script>
<style scoped>
  .card-padding{ padding-top:8px}

</style>
