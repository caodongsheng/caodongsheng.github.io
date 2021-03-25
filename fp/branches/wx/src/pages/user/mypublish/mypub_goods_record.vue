<template>
  <div>
    <x-header :left-options="{backText: ''}">帮扶记录</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <!--物品帮扶记录列表-->
      <div class="mt-10 bg-ffffff" v-for="(item,index) in records" :key="index">
        <!--帮扶订单内容-->
        <div class="info-base f-14">
          <div class="header clearfix f-16">
            <em v-if="item.status===1" class="f_r color-orange">待送出</em>
            <em v-if="item.status===4" class="f_r color-999">订单关闭</em>
            <span class="dis-block tit-nowrap">{{item.user_name}}给你捐赠了{{item.goods}}</span>
            <p class="color-999 f-12">{{item.create_date}}</p>
          </div>
          <div class="photo" v-if="item.imgs[0] != ''">
            <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper" :id="getId(index)">
              <swiper-slide class="linkonly" v-for="(items,i) in item.imgs" :key="i">
                <div class="previewer-demo-img" @click="show(i,index)" style="padding-top:100%"
                     :style="{backgroundImage:'url('+items+')',backgroundSize:'cover',backgroundPosition:'center'}" >
                </div>
              </swiper-slide>
            </swiper>
            <div v-transfer-dom>
              <previewer :list="item.formattedImags" ref="previewer" :options="options(index)" :style="getTop"></previewer>
            </div>
          </div>

          <div class="summary f-14">
            {{item.bf_detail}}
          </div>
        </div>
        <!--帮扶订单编号-->
        <div class="info-order clearfix f-14">
          <span class="f_l color-999">扶贫订单：{{item.id}}</span>
          <span class="f_r color-red" v-if="item.status===1">还剩{{item.countdown}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Previewer, TransferDom} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import { getMinPic } from '../../../util/getMin'
  export default {
    name: "mypub_goods_record",
    directives: {
      TransferDom
    },
    components: {XHeader, swiper, swiperSlide, Previewer},
    data() {
      return {
        records: [],
        swiperOption: {
          notNextTick: true,
          slidesPerView: 3,
          spaceBetween: 10
        }
      }
    },
    created() {
      this.helpRecord()
      // let a = [
      //   {
      //     "id": "101",
      //     "donor": "捐赠人",
      //     "imgs": [
      //       "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/8c9ac337-c786-471b-86b2-1e44493e31298711814185500999860.png",
      //       "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/8c9ac337-c786-471b-86b2-1e44493e31298711814185500999860.png",
      //       "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/8c9ac337-c786-471b-86b2-1e44493e31298711814185500999860.png"
      //     ],
      //     "status": 3,
      //     "bf_detail": "帮扶详情",
      //     "create_date": "2018-05-30 11:57:22",
      //     "countdown": "48天6小时",
      //     "goods": "拆迁"
      //   }
      // ];
      // a.forEach(rec => {
      //   rec.formattedImags = [];
      //   rec.imgs.forEach(item => {
      //     let img = {};
      //     img.src = item;
      //     rec.formattedImags.push(img);
      //     console.log('foreach', rec)
      //   })
      // });
      // this.records=a;

    },
     computed:{
     getTop(){
       return {
         top:window.localStorage.getItem("hheight")
       }
    },

  },
    methods: {
    
      helpRecord(){
        this.$http.post("hts/myDemand/getRecords",{demandId:this.$route.params.demandId})
        .then(res=>{
          if(res.msg == '请求成功'){
            res.data.forEach(item=>{
              item.formattedImags = [];
              item.imgs.forEach(items=>{
                 let img = {};
                 img.src = items;
                 item.formattedImags.push(img);
              })
            })
          }
          this.records = res.data

        })
      },
      getId(index) {
        return "preview" + index
      },
      show(i, index) {
        this.$refs.previewer[index].show(i);

      },
      options(ind) {
        let that = this;
        return {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let parent = that.$el.querySelectorAll("#preview" + ind)
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
  .info-base {
    padding: 15px
  }

  .info-base .header span {
    padding-right: 10px
  }

  .info-base .photo {
    padding: 10px 0
  }

  .info-order {
    padding: 10px 15px;
    border-top: 1px solid #eee
  }
</style>
