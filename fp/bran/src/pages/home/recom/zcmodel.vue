<template >
  <div v-if="total>0"  class="panel-box">
    <cell :title="bftitle" value="更多" link="/zcprojectList" >
      <img slot="icon" width="22" style="display:block;margin-right:5px;" :src="bficon"/>
    </cell>
    <div class="scrollswiper-wrap">
      <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
        <swiper-slide v-for="item in boxList" :key="item.crowdid">
          <router-link to="" @click.native="todetail(item)"  class="boxlist-item" :style="{backgroundImage:'url('+item.titleimageviewurl+')'}">
            <span class="label">慈善募捐</span>
            <div class="box-caption">
              <h1 class="f-15 tit-nowrap">{{item.title}}</h1>
              <p class="list-state tit-nowrap">
                <span class="f-12">已帮扶<em class="color-red f-bold font-spe">{{item.alreadymoney}}</em></span>
                <span class="f-12"><em class="color-red f-bold font-spe">{{item.personnum}}</em>人已支持</span>
              </p>
            </div>
            <x-button type="warn">我要帮扶</x-button>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import {Cell, XButton} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {get_fpzc_list} from './recomHttp'

export default {
    name: 'zcmodel',
    components: {swiper, swiperSlide, XButton, Cell},
    data () {
      return {
        boxList: [],
        total: '',
        swiperOption: {
          notNextTick: true,
          slidesPerView: 1.1,
          spaceBetween: 0,
          on: {
            touchMoveOpposite (e) {
              window.vm.$store.state.navflag = true
            },
            sliderMove (e) {
              window.vm.$store.state.navflag = false
            },
            touchEnd (e) {
              // e.stopPropagation();
              // e.cancelBubble = true;
              window.vm.$store.state.navflag = true
            }
          }
        }
      }
    },
    props: {
      bftitle: {
        type: String,
        default: ''
      },
      bficon: {
        type: String,
        default: ''
      },
      bfurl: {
        type: String,
        default: ''
      },
      bfbigimg: {
        type: String,
        default: ''
      },
      moreurl: {
        type: String,
        default: ''
      }
    },
    methods: {
      getZcList () {
        this.$https.post(this.BASE_URL + 'cfs/zc/project/getfpzhongchouList', {'xmpx': 1})
          .then(response => {
            // if(response.status === 200){
            this.total = response.data.data.total
            this.boxList = response.data.data.data
          // }
          })
        // this.boxlist = get_fpzc_list(this)
      },
      todetail(item){
         if (window.api) {
        let umAnalysis = api.require("umAnalysis");
        umAnalysis.onEventJson(
          {
            eventid: "bannnerofrecomtozchdetail",
            eAttribute: {
              id: item.crowdId,
              route:'/zcprojectDetail/'+item.crowdId
            }
          },
          function(ret, err) {
            // api.toast({
            //   msg: JSON.stringify(ret)
            // });
          }
        );
      }
       this.$router.push('/zcprojectDetail/'+item.crowdId);
      }
    },
    created () {
      this.getZcList()
    }
  }
</script>

<style scoped>
  .vux-flexbox-item {
    margin-left: 0 !important;
  }

  .weui-cell {
    padding: 15px 12px
  }

  .weui-cell >>> .vux-label {
    font-weight: bold;
    font-size: 17px;
    color: #333
  }

  .weui-cell >>> .weui-cell__ft {
    font-size: 12px
  }

  .scrollswiper-wrap {
    padding:0  0 12px 0;
    background: #fff;

  }

  .scrollswiper-wrap>>>.swiper-container{padding-right: 12px;}
  .box-caption{
      text-shadow: none;
  }
  .scrollswiper-wrap a {
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    display: block;
    height: 160px;
    border-radius: 5px;
    overflow: hidden;
    margin-left:12px;
  }
  .scrollswiper-wrap a >>> .weui-btn {
    position: absolute;
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    border-radius: 24px;
    width: auto !important;
    right: 12px;
    bottom: 10px;
    font-size: 12px;
    overflow: hidden;
  }

  .scrollswiper-wrap a .label {
    position: absolute;
    top: 12px;
    left: 12px;
    border-radius: 2px;
    display: block;
    height: 22px;
    line-height: 22px;
    color: #000;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    font-size: 12px;
    padding: 0 8px
  }
  .scrollswiper-wrap .list-state{padding-right: 60px}
  .scrollswiper-wrap .list-state span{position: relative;padding-right: 4px}
  .scrollswiper-wrap .list-state span:after{position: absolute;border-right:1px solid #fff;height:10px;top:2px;right:0;content: ''}
  .scrollswiper-wrap .list-state span:last-child:after{border:0 none}
  .scrollswiper-wrap a em{display:inline-block;padding:0 3px}
  .scrollswiper-wrap a h1{font-weight: normal;margin-bottom:8px}
  .scrollswiper-wrap .boxlist-item{background-size: 100% 100%;background-repeat: no-repeat;}
</style>
