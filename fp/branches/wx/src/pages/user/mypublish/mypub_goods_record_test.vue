<template>
  <div>
    <x-header :left-options="{backText: ''}" >帮扶记录</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <!--物品帮扶记录列表-->
      <div class="mt-10 bg-ffffff" v-for="(item,index) in recordlist" :key="index">
        <!--帮扶订单内容-->
        <div class="info-base f-14">
          <div class="header clearfix f-16">
            <em v-if="item.state===1" class="f_r color-orange">待送出</em>
            <em v-if="item.state===2" class="f_r color-999">订单关闭</em>
            <span class="dis-block tit-nowrap">{{item.title}}</span>
            <p class="color-999 f-12">{{item.time}}</p>
          </div>
          <div class="photo">
            <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper" :id="getId(index)">
              <swiper-slide class="linkonly" v-for="(items,i) in item.photos" :key="i">
                <img :src="items.src" class="previewer-demo-img" @click="show(i,index)">
              </swiper-slide>
            </swiper>
            <div v-transfer-dom>
              <previewer :list="item.photos" ref="previewer" :options="options(index)" :style="getTop"></previewer>
            </div>
          </div>

          <div class="summary f-14">
            {{item.summary}}
          </div>
        </div>
        <!--帮扶订单编号-->
        <div class="info-order clearfix f-14">
          <span class="f_l color-999">扶贫订单：2563798234</span>
          <span class="f_r color-red"  v-if="item.state===1">还剩2天03小时</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {XHeader, Previewer, TransferDom} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "mypub_goods_record",
    directives: {
      TransferDom
    },
    components: {XHeader, swiper, swiperSlide, Previewer},
    data() {
      return {
        recordlist: [{
          title: '张三给你赠送了2个杯子',
          time: '2017-03-19',
          state: 1,
          summary: '北京嘉实公益基金会支持运作，致力于解决乡村小规模学校学生饮水健康教育缺失问题，温暖水杯推行',
          photos: [{
            src: './static/appimg/foods-img02.jpg'
          }, {
            src: './static/appimg/foods-img01.jpg'
          }, {
            src: './static/appimg/foods-img03.jpg'
          }]
        },
          {
            title: '李四给你赠送了杯子2个',
            time: '2017-04-22',
            state: 2,
            summary: '湖南嘉实公益基金会支持运作，致力于解决乡村小规模学校学生饮水健康教育缺失问题，温暖水杯推行',
            photos: [{
              src: './static/appimg/foods-img03.jpg'
            }, {
              src: './static/appimg/foods-img01.jpg'
            }, {
              src: './static/appimg/foods-img02.jpg'
            }]
          }],
        swiperOption: {
          notNextTick: true,
          slidesPerView: 3,
          spaceBetween: 10
        }
      }
    },
     computed:{
     getTop(){
       return {
         top:window.localStorage.getItem("hheight")
       }
    },

  },
    methods: {
      
      getId(index){
        return "preview"+index
      },
      show(i,index) {
        this.$refs.previewer[index].show(i);

      },
      options (ind) {
        let that = this;
        return {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let  parent = that.$el.querySelectorAll("#preview"+ind)
            let thumbnail = parent[0].querySelectorAll('.previewer-demo-img')[index];
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            let rect = thumbnail.getBoundingClientRect();
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}

          }
        }
      }
    }
  }
</script>

<style scoped>
.info-base{padding: 15px}
.info-base .header span{padding-right: 10px}
.info-base .photo{padding:10px 0}
 .info-order{padding: 10px 15px;border-top:1px solid #eee}
</style>
