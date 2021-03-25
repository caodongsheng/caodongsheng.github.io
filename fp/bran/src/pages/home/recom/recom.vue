<template>
  <div class="recom-wrap">
    <scroller :on-refresh="refresh" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
      <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round">
          <line x1="10" x2="10" y1="27.3836" y2="36.4931">
            <animate
              attributeName="y1"
              dur="750ms"
              values="16;18;28;18;16;16"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              dur="750ms"
              values="48;46;36;44;48;48"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              dur="750ms"
              values="1;.4;.5;.8;1;1"
              repeatCount="indefinite"
            />
          </line>
          <line x1="24" x2="24" y1="18.6164" y2="45.3836">
            <animate
              attributeName="y1"
              dur="750ms"
              values="16;16;18;28;18;16"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              dur="750ms"
              values="48;48;46;36;44;48"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              dur="750ms"
              values="1;1;.4;.5;.8;1"
              repeatCount="indefinite"
            />
          </line>
          <line x1="38" x2="38" y1="16.1233" y2="47.8767">
            <animate
              attributeName="y1"
              dur="750ms"
              values="18;16;16;18;28;18"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              dur="750ms"
              values="44;48;48;46;36;44"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              dur="750ms"
              values=".8;1;1;.4;.5;.8"
              repeatCount="indefinite"
            />
          </line>
          <line x1="52" x2="52" y1="16" y2="48">
            <animate
              attributeName="y1"
              dur="750ms"
              values="28;18;16;16;18;28"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              dur="750ms"
              values="36;44;48;48;46;36"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              dur="750ms"
              values=".5;.8;1;1;.4;.5"
              repeatCount="indefinite"
            />
          </line>
        </g>
      </svg>
      <slot>
        <div>
          <!-- 轮播-->
          <swiper
            :options="swiperOption"
            ref="mySwiper"
            class="focusimg"
            v-if="bannerInfo.length>0"
          >
            <!-- 轮播con -->
            <swiper-slide v-for="(item,index) in bannerInfo" :key="index">
              <a class="linkonly" @click="openUrl(item)">
                <!-- item.link_url -->
                <img :src="getmidpic(item.cover_pic)" height="180" />
              </a>
            </swiper-slide>
            <!-- 轮播dots -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <!-- <img
            src="../../../common/images/rec-jybf-ad01.jpg"
            style="height:180px;width:auto"
            v-else
          /> -->
          <!--榜单-->
          <div class="rankinglist" v-if="$store.state.city.cooperation!=1">
            <div class="flex-tab">
              <div class="flex-tab-cell">
                <flexbox>
                  <flexbox-item>
                    <div class="rank-item text-center">
                      <em class="color-orange dis-block f-14 f-bold">{{countInfo.needsTotals}}</em>
                      <span class="f-11 color-999 dis-block">爱心需求(万个)</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div class="rank-item text-center">
                      <em class="color-orange dis-block f-14 f-bold">{{countInfo.loveTotals}}</em>
                      <span class="f-11 color-999 dis-block">爱心次数(万次)</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div class="rank-item text-center">
                      <em class="color-orange dis-block f-14 f-bold">{{countInfo.moneyTotals}}</em>
                      <span class="f-11 color-999 dis-block">爱心款项(万元)</span>
                    </div>
                  </flexbox-item>
                </flexbox>
              </div>
              <!-- <div class="flex-tab-cell tab-right">
                <router-link to="" @click.native="toExhibition"><img src="../../../common/images/icon-ranking.png"></router-link>
              </div>-->
            </div>
          </div>
          <!--电商扶贫-->
          <!-- <div class="mt-15">
            <dsfp></dsfp>
          </div> -->
          <!--扶贫公募-->
          <!-- <div class="mt-15">
            <zcmodel :bftitle="zcdata.bftitle" :bficon="zcdata.bficon" :bfurl="zcdata.bfurl" :moreurl="zcdata.moreurl"></zcmodel>
          </div>-->
          <!-- 新增板块 四个入口 -->
          <div class="link-wrapper">
            <div class="flex-tab">
              <div class="flex-tab-cell">
                <flexbox>
                  <flexbox-item>
                    <div @click="$router.push('/demandContainer')" class="link-container text-center">
                      <img src="../../../assets/images/fpdj_icon@2x.png" alt="需求对接">
                      <p class="">需求对接</p>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div @click="fpzcFun" class="link-container text-center">
                      <img src="../../../assets/images/fpzc_icon@2x.png" alt="扶贫公募">
                      <!-- <p class="">扶贫公募</p> -->
                      <p class="">扶贫公募</p>
                    </div>
                  </flexbox-item>
                  <!-- <flexbox-item v-if="$store.state.city.cooperation==1">
                    <div @click="gott" class="link-container text-center">
                      <img src="../../../assets/images/fpxm_icon@2x.png" alt="扶贫项目">
                      <p class="">扶贫头条</p>
                    </div>
                  </flexbox-item> -->
                  <!-- v-else -->
                  <flexbox-item >
                    <div @click="fpxmFun" class="link-container text-center">
                      <img src="../../../assets/images/fpxm_icon@2x.png" alt="项目对接">
                      <!-- <p class="">扶贫项目</p> -->
                      <p class="">项目对接</p>
                    </div>
                  </flexbox-item>
              <!--     <flexbox-item>
                <div @click="fpdsFun" class="link-container text-center">
                  <img src="../../../assets/images/fpds_icon@2x.png" alt="扶贫电商">
                  <p class="">扶贫电商</p>
                </div>
              </flexbox-item> -->
                </flexbox>
              </div>
            </div>
          </div>
          <!-- 就业帮扶 -->
          <div class="mt-10" @click="gojybf">
            <div class="panel-box">
              <cell title="就业帮扶">

                <img slot="icon"  style="width:22px;display:block;margin-right:5px;"
                     src="../../../assets/images/jybficon.png"/>
              </cell>
              <div style="padding:0 15px;">
                <img src="../../../assets/images/jybf.png" class="imgjybf">
              </div>
            </div>
          </div>
          <!--4个帮扶-->
          <bfmodel :helpdata="helpdata"></bfmodel>
          <!--底线-->
          <div class="linebottom">
            <divider class="f-12" style="padding:10px 0!important">已经到底了</divider>
          </div>
        </div>
      </slot>
    </scroller>
    <div v-transfer-dom>
      <confirm
        v-model="showconfirmPhone"
        title
        confirm-text="确定"
        cancel-text="取消"
        @on-confirm="onConfirmPhone()"
        @on-cancel="onConfirm()"
      >
        <p style="text-align:center;">请绑定手机号！</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Divider, Cell, TransferDom, Confirm } from "vux";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import bfmodel from "./bfmodel";
import { mapState, mapActions } from "vuex";
import open from "../../../assets/js/openWin";
import * as types from "@/store/mutation-types.js";
import { getMidPic } from "@/util/getMid";
import { cityDate } from "@/pages/home/recom/city.js";
export default {
  directives: { TransferDom },
  name: "recom",
  components: {
    swiper,
    swiperSlide,
    Divider,
    Cell,
    bfmodel,
    Confirm
  },
  data() {
    return {
      showconfirm: false,
      showconfirmPhone: false,

      swiperOption: {
        notNextTick: true,
        speed: 800,
        loop: true,
        initialSlide: 0,
        autoplay: true,
        direction: "horizontal",
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swipe
        on: {
          touchMoveOpposite(e) {
            window.vm.$store.state.navflag = true;
          },
          sliderMove(e) {
            window.vm.$store.state.navflag = false;
          },
          touchEnd(e) {
            //e.stopPropagation();
            // e.cancelBubble = true;
            window.vm.$store.state.navflag = true;
          }
        }
      },
     
      bannerInfo: [],
      helpdata: [],
      lastCity: "",
      // 统计数据
      countInfo: {
        needsTotals: "--",
        loveTotals: "--",
        moneyTotals: "--"
      }
    };
  },
  filters: {
    url(value) {
      if (value === null) {
        return "#";
      } else {
        return value;
      }
    }
  },

  methods: {
    gott(){
      let  link={path:'/fptt'};
       this.$router.push(link)
      //  location.href =process.env.NEWS_PATH
    },
    gojybf(){
      let userid = this.G("userid");
      let version = window.app.getVersion;
      if(userid){
        window.location.href="http://qingyingstudents.zgshfp.com.cn/job?from=app&isLogin=1&version="+version+"&userId="+userid+"&isAndroid=1"
        // http://qingyingstudents.fpmai.com/job?from=app&isLogin=&userId=&userType=&version=&isAndroid=
      }else{
        window.android.login()
      }
    },
    fpzcFun(){
      // 扶贫公募跳转
      let userid = this.G("userid")
      let token = this.G("token")
      let nickname = this.G("nickname")
      if(!userid){
        userid=null
      }
      if(!token){
        token=null
      }
      if(!nickname){
        nickname=null
      }
      location.href=process.env.WX_URL+"/pages/index/#/zcprojectList/"+userid+"/"+nickname+"/"+token+"?isProvince=true&fromHtml=1"
    },
    fpxmFun(){
      // 项目对接跳转
      let userid = this.G("userid")
      let nickname = this.G("nickname")
      let token = this.G("token")
      if(!userid){
        userid=null
      }
      if(!token){
        token=null
      }
      if(!nickname){
        nickname=null
      }
      let id=this.$store.state.city.provinceArea
      let name=this.$store.state.city.provinceName
      let cooperation=this.$store.state.city.cooperation
      if(cooperation==1){
          id=this.$store.state.city.id
          name=this.$store.state.city.name
        }
      location.href=process.env.WX_URL+"/pages/index/#/poverty/"+userid+"/"+nickname+"/"+token+"?isProvince=true&isApp=1&provinceCode="+id+"&cooperation="+cooperation+"&provinceName="+name
    },
    fpdsFun(){
      // 扶贫电商跳转
      let ret2 = cityDate.find((v) => {
          return v.name == this.city.provinceName;
      });
      let pinyin=ret2.allPinYin
      let shopUrl=''
      if(this.city.cooperation==1){
        shopUrl=process.env.WX_URL+"/mobile/H5Act/localplace/collaborationEW.html?mark="+pinyin+"&token="+this.G("token")+"&media=project5X"+"&appVersion="+window.app.getVersion()
      }else{
        shopUrl=process.env.WX_URL+"/mobile/H5Act/localplace/index.html?mark="+pinyin+"&token="+this.G("token")+"&media=project5X"+"&appVersion="+window.app.getVersion()
      }
      console.log('电商click',shopUrl)
      location.href=shopUrl
      // location.href = "https://www.51heba.com/app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile"
    },
    getmidpic(imgurl){
    return getMidPic(imgurl)
    },
    openUrl(item) {
     if(item.link_url!=""){
      if (item.link_url.substr(0, 4) === "http") {       
          if (this.isios()) {
            window.native.appLoadUrl(item.link_url);
          } else {
            location.href = item.link_url;
          }       
      } else {
        this.$router.push({
          path: item.link_url
        });
      }
     }
    },
    getData(done) {
      Promise.all([
        this.getBanner(),
        this.getBangFu(),
        this.getTotalData()
      ]).then(function() {
        done(true);
      });
    },
    // 获取首页banner信息
    getBanner() {
      // this.mySwiper.lockSwipeToPrev();
      // this.mySwiper.lockSwipeToNext();
      // this.mySwiper.stopAutoplay()
      // this.bannerInfo = JSON.parse(localStorage.getItem("banner"));
      let platform = this.isWeixinCient() ? 2 : 1;
      let code = this.isWeixinCient()
        ? "527172458185228288"
        : "459072868383195136";
      this.$http
        .post("hts/help/getBanner", {
          positionCode: code,
          platform: platform,
          regionId:this.city.id
        })
        .then(res => {
          this.bannerInfo = []
          this.bannerInfo = res.data.vos;
          localStorage.setItem("banner", JSON.stringify(res.data.vos));
          // this.$nextTick(function(){
          //   this.mySwiper.update()
          //   this.mySwiper.reLoop()
          //   this.mySwiper.startAutoplay()
          // })
        });
    },
    // 获取首页帮扶信息
    getBangFu() {
      this.helpdata = JSON.parse(localStorage.getItem("bangfu"));
      this.$http
        .post("hts/help/getAppDemand", {
          regionId: this.city.id,
          isAll:this.city.cooperation
        })
        .then(res => {
          this.helpdata = res.data.vos;
          localStorage.setItem("bangfu", JSON.stringify(res.data.vos));
        });
    },
    // 获取统计数据
    getTotalData() {
      if (sessionStorage.getItem("CountKey")) {
        this.countInfo = JSON.parse(sessionStorage.getItem("CountKey"));
      } else {
        return this.$http.post("hts/help/getCount",{
          regionId: this.city.id
        }).then(res => {
          this.countInfo.needsTotals = (
            Number(res.data.demandCount) / 10000
          ).toFixed(2);
          this.countInfo.loveTotals = (
            Number(res.data.donateCount) / 10000
          ).toFixed(2);
          this.countInfo.moneyTotals = (
            Number(res.data.moneyCount) / 10000
          ).toFixed(2);
          sessionStorage.setItem("CountKey", JSON.stringify(this.countInfo));
        });
      }
    },
    refresh(done) {
      setTimeout(() => {
        this.getData(done);
      }, 1500);
    },
    infinite() {},
    onConfirm() {
      this.$router.push("/setlovefollow");
    },
    onConfirmPhone() {
      this.$router.push("/FirstBind");
    },
    //扶贫榜样
    toExhibition() {
      let _this = this;
      // this.$router.replace('/Exhibition');
      // open(process.env.EX_URL, "",function(){
      _this.$router.replace("/Exhibition");
      // });
      this.$store.state.nav_index = this.helpdata.length + 2;
    }
  },
  mounted() {
    this.getBanner();
    this.getBangFu();
    this.getTotalData();
    this.lastCity = this.city.id;
    if(this.$store.state.city.cooperation==1){
      this.$http.post('hts/help/getWestCityByEastCityId',{
        regionId: this.city.id,
      }).then((res)=>{
        console.log(res)
          this.$store.state.cityDates=res.data
      }).catch(function (error) {})
    }
    
  },
  activated() {
    //监听网络是否可用
    // let realNetWork = api.require('realNetwork')
    // realNetWork.listen(function (ret, err) {
    //     if(ret.isAvailable && this.$route.query.id) {
    //         //如果网络可用并且点击刷新按钮时执行刷新
    //         this.refresh();
    //     }else {
    //         //网络不可用时跳转到网络异常页
    //         this.$router.replace('/networkError')
    //     }
    // })
    if (this.lastCity !== this.city.id) {
      this.lastCity = this.city.id;
      this.getBangFu();
    }
  },
  watch: {
    user: function(user) {
      let isLogin = localStorage.getItem("token");
      //当用户变化时，如果手机号为空，则提示设置手机号
      if (isLogin === null || isLogin == "") {
        // 未登录
        this.showconfirmPhone = false;
        this.showconfirm = false;
        // }else if(!this.user.mobile && !sessionStorage.getItem('tiped')){//绑定手机号的弹窗不用了，由事件触发
        // this.showconfirmPhone = true
        // sessionStorage.setItem('tiped', 'y')
      }
    }
  },
  computed: {
    ...mapState(["user", "showConfirm", "city"])
  }
};
</script>

<style scoped>




.imgjybf{
  border-radius: 5px;
    max-width: 100%;
    width: 100%;
    height: 122px;
    object-fit: cover;
}
.focusimg {
  height: 180px;
}

.vux-flexbox-item {
  margin-left: 0 !important;
}

.weui-cell {
  padding: 12px 12px;
}

.weui-cell >>> .vux-label {
  font-weight: bold;
  font-size: 17px;
  color: #333;
}

.weui-cell >>> .weui-cell__ft {
  font-size: 12px;
}
.weui-cell >>> .weui-cell__ft:after {
  border-color: #e4e4e4;
}
.linebottom {
  padding: 20px 12px;
}
.rank-item em {
  font-family: Eurostile;
}
.rank-item:after{
  transform: scaleX(.5);
}
.link-wrapper{background: #fff;margin-top: 10px;padding: 20px 0 19px;}
.link-container img{display: block;width: 32px;height: 29px;margin: 0 auto 8px;}
.link-container p{font-size: 11px;color: #666;}
._v-container >>> ._v-content {
  position: absolute;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0px;
}
</style>
