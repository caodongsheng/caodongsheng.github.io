<template>
  <div class="recom-wrap">
    <scroller :on-refresh="refresh" refresh-layer-color="#4b8bf4"
              loading-layer-color="#ec4949">
      <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
      <slot>
        <div>
          <!-- 轮播-->
          <swiper :options="swiperOption" ref="mySwiper" class="focusimg" v-if="bannerInfo.length>0">
            <!-- 轮播con -->
            <swiper-slide v-for="(item,index) in bannerInfo" :key="index">
              <a class="linkonly" @click="openUrl(item)"><!-- item.link_url -->
                <img :src="item.cover_pic" height="180">
              </a>
            </swiper-slide>
            <!-- 轮播dots -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <!-- <img src="../../../common/images/rec-jybf-ad01.jpg" style="height:180px;width:auto" v-else> -->
          <!--榜单-->
          <div class="rankinglist" v-if="$store.state.city.cooperation!=1">
            <div class="flex-tab">
              <div class="flex-tab-cell">
                <flexbox>
                  <flexbox-item>
                    <div class="rank-item text-center">
                      <em class="color-orange  dis-block f-14 f-bold">{{countInfo.needsTotals}}</em>
                      <span class="f-11 color-999 dis-block">爱心需求(万个)</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div class="rank-item text-center">
                      <em class="color-orange  dis-block f-14 f-bold">{{countInfo.loveTotals}}</em>
                      <span class="f-11 color-999 dis-block">爱心次数(万次)</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div class="rank-item text-center">
                      <em class="color-orange  dis-block f-14 f-bold">{{countInfo.moneyTotals}}</em>
                      <span class="f-11 color-999 dis-block">爱心款项(万元)</span>
                    </div>
                  </flexbox-item>
                </flexbox>
              </div>
              <!-- <div class="flex-tab-cell tab-right">
                <router-link to="" @click.native="toExhibition"><img src="../../../common/images/icon-ranking.png"></router-link>
              </div> -->
            </div>
          </div>
          <!--电商扶贫-->
          <!-- <div class="mt-15">
            <dsfp></dsfp>
          </div>-->
          <!--扶贫公募-->
          <!-- <div class="mt-15">
            <zcmodel :bftitle="zcdata.bftitle" :bficon="zcdata.bficon" :bfurl="zcdata.bfurl" :moreurl="zcdata.moreurl"></zcmodel>
          </div> -->
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
      <confirm v-model="showconfirm" title="" confirm-text="确定" cancel-text="取消" @on-confirm="onConfirm()" @on-cancel="">
        <p style="text-align:center;">请选择您的爱心关注地区！</p>
      </confirm>
      <confirm v-model="showconfirmPhone" title="" confirm-text="确定" cancel-text="取消" @on-confirm="onConfirmPhone()" @on-cancel="">
        <p style="text-align:center;">请绑定手机号！</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import {Divider, TransferDom, Confirm} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import bfmodel from './bfmodel'
  import {mapState, mapActions} from 'vuex'
  import * as types from '@/store/mutation-types.js'
  export default {
    directives: {TransferDom},
    name: 'recom',
    components: {swiper, swiperSlide, Divider, bfmodel, Confirm},
    data () {
      return {
        showconfirm: false,
        showconfirmPhone: false,
       
        swiperOption: {
          notNextTick: true,
          speed:4000,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          on: {
            touchMoveOpposite (e) {
              window.vm.$store.state.navflag = true
            },
            sliderMove (e) {
              window.vm.$store.state.navflag = false
            },
            touchEnd (e) {
               //e.stopPropagation();
              // e.cancelBubble = true;
              window.vm.$store.state.navflag = true
            }
          }
        },
        // 扶贫公募
        zcdata: {
          bftitle: '扶贫公募',
          bficon: './static/appimg/rec/rec-icon-fpzc.png',
          bfurl: '',
          moreurl: ''
        },
        bannerInfo: [],
        helpdata: [],
        lastCity:'',
        // 统计数据
        countInfo: {
          needsTotals: '--',
          loveTotals: '--',
          moneyTotals: '--'
        }

      }
    },
    filters: {
      url (value) {
        if (value === null) {
          return '#'
        } else {
          return value
        }
      }
    },

    methods: {
      openUrl(item){
        let isapp = false;
        if(window.api) isapp = true;
        if(item.link_url.substr(0,4) === "http"){
          if(!isapp){
            this.$router.push({
              path:'/empty',
              query:{
                title:item.title,
                url:item.link_url
              }
            })
          }
          else{
         
             if(this.isios()){
					window.native.appLoadUrl(item.link_url);
				}
				else{
					location.href =item.link_url
				}
          }
        } else{
          this.$router.push({
            path:item.link_url
          })
        }
      },
      getData (done) {
        Promise.all([this.getBanner(), this.getBangFu(), this.getTotalData()]).then(function () {
          done(true)
        })
      },
      // 获取首页banner信息
      getBanner () {
        // this.bannerInfo = JSON.parse(localStorage.getItem('banner'))
        let platform = this.isWeixinCient()?2:1
        let code  = this.isWeixinCient()?'527172458185228288':'459072868383195136'
        this.$http.post('hts/help/getBanner', {
          positionCode: code,
          platform:platform,
          regionId:this.city.id
        }).then((res) =>{
          this.bannerInfo = res.data.vos
          localStorage.setItem('banner',JSON.stringify(res.data.vos))

        })
      },
      // 获取首页帮扶信息
      getBangFu () {
        this.helpdata = JSON.parse(localStorage.getItem('bangfu'))
        this.$http.post('hts/help/getAppDemand',{
          regionId: this.city.id,
          isAll:this.city.cooperation
        }).then((res) =>{
          this.helpdata = res.data.vos
          localStorage.setItem('bangfu',JSON.stringify(res.data.vos))
        })
      },
      // 获取统计数据
      getTotalData () {
        // if (sessionStorage.getItem('CountKey')) {
        //   this.countInfo = JSON.parse(sessionStorage.getItem('CountKey'))
        // } else {
          return this.$http.post('hts/help/getCount',{
            regionId: this.city.id
          })
            .then(res => {
              this.countInfo.needsTotals = (Number(res.data.demandCount) / 10000).toFixed(2)
              this.countInfo.loveTotals = (Number(res.data.donateCount) / 10000).toFixed(2)
              this.countInfo.moneyTotals = (Number(res.data.moneyCount) / 10000).toFixed(2)
              sessionStorage.setItem('CountKey', JSON.stringify(this.countInfo))
            })
        // }
      },
      refresh (done) {
        setTimeout(() => {
          this.getData(done)
        }, 1500)
      },
      infinite () {},
      onConfirm () {
        this.$router.push('/setlovefollow');
      },
      onConfirmPhone () {
        this.$router.push('/FirstBind')
      },
      //扶贫榜样
      toExhibition() {
        let _this = this;
        _this.$router.replace("/Exhibition")
        this.$store.state.nav_index = this.helpdata.length+2;
      }
    },
    created() {
      this.city.id = this.$route.query.id
    },
    mounted () {
      console.log(this.city)
      this.getBanner()
      this.getBangFu()
      this.getTotalData()
      this.lastCity = this.city.id
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
        this.lastCity = this.city.id
        this.getBangFu()
      }
    },
    watch:{
      user:function(user){
        let isLogin = localStorage.getItem('token')
        //当用户变化时，如果手机号为空，则提示设置手机号
        if(isLogin === null||isLogin==""){// 未登录
          this.showconfirmPhone = false
          this.showconfirm = false
          // }else if(!this.user.mobile && !sessionStorage.getItem('tiped')){//绑定手机号的弹窗不用了，由事件触发
          // this.showconfirmPhone = true
          // sessionStorage.setItem('tiped', 'y')
        }
        // else if (!this.user.concern_province_region_id  && !sessionStorage.getItem('concerned')) {
        //   // 判断用户已登录并且爱心关注地区为空且sessionStorage.setItem('concerned;)存在保证只提示一次时，才会触发关注地区的弹窗
        //   this.showconfirm = true
        //   sessionStorage.setItem('concerned', 'y')
        // }
      }
    },
    computed: {
      ...mapState(['user','showConfirm',"city"])
    },
  }
</script>

<style scoped>
  .focusimg {
    height: 180px;
  }

  .vux-flexbox-item {
    margin-left: 0 !important;
  }

  .weui-cell {
    padding: 12px 12px
  }

  .weui-cell >>> .vux-label {
    font-weight: bold;
    font-size: 17px;
    color: #333
  }

  .weui-cell >>> .weui-cell__ft {
    font-size: 12px
  }
  .weui-cell >>> .weui-cell__ft:after{border-color:#e4e4e4}
  .linebottom {
    padding: 20px 12px;
  }
  .rank-item em{font-family: Eurostile}


  ._v-container>>>._v-content{position:absolute}
  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom: 0px;
  }
</style>
