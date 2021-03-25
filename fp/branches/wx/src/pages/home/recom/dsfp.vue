<template>

  <div
    v-if="statusCodeTitle||statusCodeSwiper"
    class="panel-box"
  >
    <cell
      title="电商扶贫"
      value="更多"
      is-link
      link="/mall"
    >
      <img
        slot="icon"
        width="22"
        style="display:block;margin-right:5px;"
        src="../../../common/images/rec-icon-dsfp.png"
      />
    </cell>
    <router-link
      v-if="statusCodeTitle"
      :to="{}"
      class="adimg"
    ><img :src="dsfp_titleImg"></router-link>
    <div
      v-if="statusCodeSwiper"
      class="scrollswiper-wrap"
    >
      <swiper
        :options="swiperOption"
        ref="mySwiper"
        class="scrollswiper"
      >
        <!-- 轮播con -->
        <swiper-slide
          v-for="(item,index) in dsfp_imglist"
          :key="index"
        >
          <a @click="godetail(item.ARTICLE_STATIC_URL)"><img :src="item.TITLE_IMAGE_URL"></a>
        </swiper-slide>
        <!-- 轮播dots -->
        <div
          class="swiper-pagination"
          slot="pagination"
        ></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Cell } from "vux";
import { swiper, swiperSlide } from "vue-awesome-swiper";
const dsfpImglist = [
  {
    url: "",
    img: "./static/appimg/rec-dsfp-img01.jpg",
    title: ""
  },
  {
    url: "",
    img: "./static/appimg/rec-dsfp-img02.jpg",
    title: ""
  },
  {
    url: "",
    img: "./static/appimg/rec-dsfp-img03.jpg",
    title: ""
  }
];

export default {
  name: "dsfp",
  //
  components: { swiper, swiperSlide, Cell },
  data() {
    return {
      str1: this.$route.path,
      dsfp_titleImg: "",
      dsfp_imglist: "",
      pageId: "363294",
      statusCodeTitle: "",
      statusCodeSwiper: "",
      swiperOption: {
        notNextTick: true,
        slidesPerView: 2.3,
        // touchAngle : 5,
        // spaceBetween: 0,
        // touchReleaseOnEdges:true,
        // nested:true,
        // freeMode : true,
        freeMode: true,
        freeModeMinimumVelocity: 0,
        on: {
          reachBeginning() {
            //swiper 第一张执行
          },
          reachEnd() {
            //swiper 最后一张执行
          },
          touchMoveOpposite(e) {
            window.vm.$store.state.navflag = true;
          },
          sliderMove(e) {
            window.vm.$store.state.navflag = false;
          },
          touchEnd(e) {
            // e.stopPropagation();
            // e.cancelBubble = true;
            window.vm.$store.state.navflag = true;
          }
        }
      }
    };
  },
  created() {},
  methods: {
    godetail(url) {
      if (window.api) {
        let umAnalysis = api.require("umAnalysis");
        umAnalysis.onEventJson(
          {
            eventid: "bannerofrecomtomalldetail",
            eAttribute: {
              detailurl: url
            }
          },
          function(ret, err) {
            // api.toast({
            //   msg: JSON.stringify(ret)
            // });
          }
        );
      }
      localStorage.setItem("currenturl", url);
      this.$router.replace("/mall");
    },
    getdsfpImg() {
      this.$https
        .post(
          "http://www.fp1017.org.cn/eai/cms/getArticlePage/?pageId=" +
            this.pageId
        )
        .then(response => {
          if (this.pageId == "363294") {
            this.pageId = "363297";
            if (response.data.code == "EAII0000") {
              this.statusCodeTitle = true;
              this.dsfp_titleImg = response.data.data[0].TITLE_IMAGE_URL;
            } else {
              this.statusCodeTitle = false;
            }
          } else if ((this.pageId = "363297")) {
            if (response.data.code == "EAII0000") {
              this.statusCodeSwiper = true;
              this.dsfp_imglist = response.data.data;
            } else {
              this.statusCodeSwiper = false;
            }
          }
        })
        .catch(error => {});
    }
  },
  mounted() {
    window.vm = this;
    this.getdsfpImg();
  },
  watch: {
    pageId() {
      this.getdsfpImg();
    }
  }
};
</script>

<style scoped>
.vux-flexbox-item {
  margin-left: 0 !important;
}

.weui-cell {
  padding: 15px 12px;
}

.weui-cell >>> .vux-label {
  font-weight: bold;
  font-size: 17px;
  color: #333;
}

.weui-cell >>> .weui-cell__ft {
  font-size: 12px;
}

.scrollswiper-wrap {
  padding: 2px 0 8px 0px;
}

.scrollswiper-wrap >>> .swiper-container {
  padding-right: 12px;
}
.scrollswiper .swiper-slide a {
  margin: 0px 0px 0px 12px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
}

.scrollswiper .swiper-slide a img {
  display: block;
  height: 75px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}
.panel-box .adimg img {
  height: 122px;
  object-fit: cover;
}
</style>
