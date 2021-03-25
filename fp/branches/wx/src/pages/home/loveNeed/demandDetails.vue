<template>
  <div class="needDetail-container">
    <div v-if="vos">
      <!--需求详情-->
      <p class="needDetail-title">需求详情</p>
      <div class="needContent-container" ref="detailContent">
        <div>
          <p class="needDetail-content" :class="{'avtive':!toOpen&&isLook}" ><pre style="white-space:pre-wrap">{{vos.demand_coment}}</pre></p>
        </div>
        <div class="unfold-field">
          <div v-show="toOpen" class="lookMask"></div>
          <div v-show="isLook" class="lookAll">
            <a @click="change" v-text="article.footinfo"></a>
          </div>
        </div>
      </div>
      <!-- <div class="needimg-container">
        <a class="needimg-content" v-for="(item,index) in vos.imgUrl" :key="index">
           <img :src= item alt="详情图片" @click="clickImg">
        </a>
      </div>-->
      <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
        <swiper-slide v-for="(item1,index1) in vos.imgUrl" :key="index1">
          <div
            class="previewer-demo-img"
            style="padding-top:100%"
            @click="show(index1)"
            :style="{backgroundImage:'url('+item1+')',backgroundSize:'cover',backgroundPosition:'center'}"
          ></div>
        </swiper-slide>
      </swiper>
      <div v-if="demandImgList.length>3" style="margin:5px 0  5px 0">
        <p>滑动查看更多图片</p>
      </div>
      <div v-transfer-dom>
        <previewer :list="demandImgList" ref="previewer" :options="options" :style="getTop"></previewer>
      </div>
      <div class="issue-time">
        <img class="issue-time-tubiao" src="../../../../static/appimg/fpw_logo_small.png">
        {{vos.publish_name}}&nbsp;发布于&nbsp;{{vos.create_date}}
      </div>
    </div>
    <!-- 放大图片 -->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
  </div>
</template>

<script>
import { Previewer, TransferDom } from "vux";
import BigImg from "../../../components/imgDialog/BigImg";
import { getMidPic } from "../../../util/getMid";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  directives: {
    TransferDom
  },
  props: ["vos"],
  components: {
    "big-img": BigImg,
    swiper,
    swiperSlide,
    Previewer
  },
  computed:{
     getTop(){
       return {
         top:window.localStorage.getItem("hheight")
       }
    },

  },
  data() {
    return {
      toOpen: false,
      isLook: false,
      showImg: false,
      imgSrc: "",
      demandImgList: [],
      swiperOption: {
        notNextTick: true,
        slidesPerView: 3,
        spaceBetween: 10
      },
      options: {
        getThumbBoundsFn(index) {
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[index]
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          let rect = thumbnail.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      },
      article: {
        footinfo: "查看全文"
      },
      boxHeight: 80,
      curHeight: 0
    };
  },
  methods: {
   
    clickImg(e) {
      this.showImg = true;
      // 获取当前图片地址
      this.imgSrc = e.currentTarget.src;
    },
    viewImg() {
      this.showImg = false;
    },
    change: function() {
      if (this.article.footinfo === "查看全文") {
        this.article.footinfo = "收起";
        this.toOpen = false;
      } else {
        this.article.footinfo = "查看全文";
        this.toOpen = true;
      }
    },
    //   changetype(imgurl){
    //       return getMidPic(imgurl);
    //   },
    lookAll: function() {
      this.curHeight = this.$refs.detailContent.getBoundingClientRect().height;
      if (this.curHeight > this.boxHeight) {
        this.toOpen = true;
        this.isLook = true;
      } else {
        this.toOpen = false;
        this.isLook = false;
      }
    },
    getImgList() {
      let imgList = this.vos.imgUrl;
      imgList.forEach(item => {
        let img = {};
        img.src = item;
        img.y = 47
        this.demandImgList.push(img);
      });
    },
    show(index1) {
      this.$refs.previewer.show(index1);
    }
  },
  mounted() {
    setTimeout(() => {
      this.lookAll();
    }, 1000);
  },
  watch: {
      vos() {
          this.getImgList();
      }
  }

};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.weui-grids {
  display: flex;
  overflow-x: auto;

  .weui-grid {
    display: inline-block;
    width: 22%;
    margin-right: 2%;
    padding: 0;

    &:before {
      content: '';
      border-right: none;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.needDetail-container {
  padding: 0 17px;
  margin-bottom: 10px;
  background: #fff;

  .needDetail-title {
    padding: 12px 0 13px;
    font-size: 16px;
    color: #333;
   
  }

  .needContent-container {
    position: relative;

    .needDetail-content {
      max-height: 82px;
      padding-bottom: 15px;
      overflow: hidden;
      font-size: 13px;
      color: #666;
      word-break: break-all;

      &.avtive {
        max-height: 5000px;
        padding-bottom: 36px;
      }
    }

    .unfold-field {
      position: absolute;
      bottom: -1px;
      width: 100%;

      .lookMask {
        height: 36px;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0), #fff);
      }

      .lookAll {
        height: 36px;
        line-height: 28px;
        text-align: center;
        background: #fff;

        a {
          color: #EF835B;
          font-size: 13px;
        }
      }
    }
  }

  .needimg-container {
    display: flex;
    overflow-x: auto;

    .needimg-content {
      position: relative;
      width: 30%;
      height: 0;
      padding-top: 30%;
      margin-right: 1%;
      flex: 0 0 30%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .issue-time {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 15px 0;
    font-size: 12px;
    color: #666;

    img {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }


  }

}
</style>
