<template>
<div>
    	<div class="close" @click="closeWin()" >跳过</div>

	<swiper :options="swiperOption" ref="mySwiper" class="focusimg">
      <!-- 轮播con -->
      <swiper-slide  v-for="(item,index)  in  json"  :key="index">
        <!--<router-link  :to="item.link_url" class="linkonly">-->
          <img :src="item.img" height="100%">
          <router-link :to="item.link_url" class="skip" v-if="index==(json.length-1)"><span>我要进入</span>
          </router-link>
      </swiper-slide>
      <!-- 轮播dots -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    </div>
</template>

<script>
	import {Divider, Cell, Range} from 'vux'
	import {swiper, swiperSlide} from 'vue-awesome-swiper'
	export default {
  name: 'recom',
  components: {swiper, swiperSlide, Divider, Cell, Range},
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      bannerInfo: [],
      helpdata: [],
	      json: [
		  {link_url: '', img: require('../../assets/images/yind_1.jpg')},
		  {link_url: '', img: require('../../assets/images/yind_2.jpg')},
		  {link_url: '/recom', img: require('../../assets/images/yind_3.jpg')}
	]
    }
  },
  methods: {
    closeWin(){
    this.$router.replace('/recom')
    },
      // 获取图片信息
    getBanner () {
      let _this = this
      this.$http.post('hts/help/getBanner', {
        positionCode: '459072868383195136'
      })
          .then(function (response) {
            _this.bannerInfo = response.data.vos
          })
          .catch(function (error) {

          })
    }
  },
  created: function () {
    // this.getBanner()
    if (this.G('first')) {
      this.$router.replace('/recom')
    } else {
      this.L('first', '1')
    }
  }

}
</script>

<style>
.focusimg,.focusimg .linkonly{
	height: 100%;
}
.skip{
	width: 100%;
	font-size: 14px;
	position: absolute;
	top: 80%;
	left: 0;
	text-align: center;
}
.skip span{
	padding: 10px 20px;
	border-radius: 50px;
	color: #333;
	border: 1px solid #333;
	z-index: 999;
}
 	.close {
		background: rgba(0,0,0,0.6);
		padding: 4px 10px;
		border-radius: 30px;
		color: #fff;
		font-size: 0.75em;
		position: absolute;
		right: 10px;
		top: 30px;
		z-index: 999;
	}
</style>
