<template>
<div>
  <ul class="status-list">
   
    <li
      class="bg-ffffff mb-12"
      v-for="(item, index) in LoveDynamicList"
      :key="index"
    >
      <div class="status-item-content">
        <div class="bg-f6f5f6 status-item-info mb-12" @click="toDemandDetail(item)">
          <!-- <img :src=item.user_pic class="bd-radius-cir status-item-info-img" alt=""> -->
          <avatar width="35" height="35" :image="item.user_pic" :name="item.user_name"></avatar>
          <div class="c-e">
            <div>
              <span class="f-16 c-c">{{item.user_name}}</span>
              <span class="f_r f-12">{{item.create_date}}</span>
            </div>
            <p class="f-13">感激您的关注，希望您能帮忙转发，让更多的爱来帮助TA吧</p>
          </div>
        </div>
         <div class="status-item-message mt-12">
          <div class="status-item-message-img" v-if="item.img&&item.img.length>0">
            <swiper :options="swiperOption" ref="mySwiper" class="scrollswiper">
            <swiper-slide v-for="(item1,index1) in item.img" :key="index1">
              <div class="previewer-demo-img" style="padding-top:100%" @click="show(index1,index)"  v-lazy:background-image="getmidpic(item1)" :style="{backgroundSize:'cover',backgroundPosition:'center'}">
              </div>
            </swiper-slide>
          </swiper>
           <div v-transfer-dom>
              <previewer :list="item.imgobjs" ref="previewer" :options="options" :style="getTop"></previewer>
          </div>
            <p class="c-e f-12 text-center" >共{{item.img.length}}张</p>
         
          </div>
          <div
            class="content-container"
            ref="detailContent"
          >
            <div>
              <p
                class="c-c f-15 detailContentInfo"
                :class="{'active': !toOpen&isLook}"
              >{{item.content}}</p>
            </div>
          </div>
        </div> 
      </div>
      <div class="status-item-handle flex-tab text-center c-e f-12" >
        <span
          class="flex-tab-cell"
          @click="helpSpread(item)"
        ><i class="status-item-handle-icon iconfont icon-f-share"></i>帮忙转发</span>
        <span v-if="getDemandStatus(item)"
          class="flex-tab-cell"
          @click="helphe(item)">对Ta帮扶</span>
      </div>
    </li>
     <!-- 放大图片 -->
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>

    <div class="nomatch" v-if="flag == true && LoveDynamicList.length == 0">暂无爱心反馈</div>
  </ul>
   <!-- <share
      ref="sharea"
      :vos='vos'
    ></share> -->
    </div>
</template>

<script>
// import share from '@/components/share/share'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import {Previewer,TransferDom} from 'vux'
import avatar from '@/components/util/avatar'
import BigImg from '../../components/imgDialog/BigImg'
       import shareUrlParamsFilter from '@/util/filter.js';
 import { getMidPic } from "@/util/getMid";
import { mapState } from 'vuex'

export default {
  name: 'status-list',
    directives: {
    TransferDom
  },
  components: {
  //  share,
    avatar,
    BigImg,
    swiper,
    Previewer,
    swiperSlide
  },

  data () {
    return {
      LoveDynamicList: [],
       swiperOption: {
          notNextTick: true,
          slidesPerView: 3,
          spaceBetween: 10
        },
      toOpen: false,
      isLook: false,
      showImg: false,
      imgSrc: '',
      flag: false,
      article: {
        footinfo: '查看全文'
      },
       options: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        },
      curHeight: 0,
      boxHeight: 80,
    }
  },
   computed:{
    ...mapState(['city']),
    getTop(){
       return {
         top:window.localStorage.getItem("hheight")
       }
    },

  },
  methods: {
   getmidpic(imgurl){
    return getMidPic(imgurl)
    },
    toDemandDetail(item){
     this.$router.push('/loveNeed/' + item.demand_code)
    },
    getLoveDynamicList () {
      this.$http
        .post('hts/dynamic/listDynamic')
        .then(res => {
          this.LoveDynamicList = res.data
           this.LoveDynamicList.filter(item=>{
             if(item.img){
               item.imgobjs = [];
             
           //  item.imgarr=item.img.split(',')
             for(let i=0;i<item.img.length;i++){
                item.imgobjs.push({src:item.img[i]})
             }
             }
           })
          this.flag = true;
        })
      
    },
    getDemandStatus(item){
    let statuslist = [4,5,6,7,9,11]
    if(statuslist.indexOf(item.demand_status)>-1){
      return false;
    }
    else return true
    },
    // 帮忙转发
    helpSpread (item) {
      let voss = {};
      
       voss.title = `中国社会扶贫网，让爱在阳光下链接-${item.title}`
       voss.desc = '爱心反馈：' + item.content
       voss.link = this.WinXinHost + '#/loveNeed/' + item.demand_code+'?name='+encodeURIComponent(this.city.name)+'&id='+this.city.id+'&type=1&provinceName='+encodeURIComponent(this.city.provinceName)+'&provinceArea='+this.city.provinceArea
       voss.imgUrl = item.img&&item.img.length>0?item.img[0]:this.H5PAY_URL+"static/appimg/share_icon.png"
       voss.demandId = item.demand_code
      if (this.isWeixinCient()) {
        this.setWeixinConfig(voss)
        alert('点击右上角"...",分享给朋友或朋友圈，让更多的人帮助TA')
      } else if (this.isapp()) {
      let shareTitle1 = voss.title;
      let shareContent1 = voss.desc;
      if(shareContent1.length>100){
        shareContent1 = shareContent1.substr(0,100);
      }
      let shareUrl = shareUrlParamsFilter(voss.link)
      let downloadImg = voss.imgUrl;
      let url = shareUrl;
      let shareInfo = '{"picurl":"' +downloadImg+'","title":"' + shareTitle1 + '","text":"' + shareContent1 + '","type":"' + 6 + '","url":"' + url + '","ischange":' + '"2"' + '}'
       window.share.getShareDetailView(shareInfo);
      } else {
        this.showToast('', 'text', '网页上无法分享，请使用APP或微信')
      }
    },
    // 对ta帮扶
    helphe (item) {
      if(item.demand_type === 8){
        this.showToast('', 'text', '该需求已捐满')
      }
      // let item = this.LoveDynamicList[index]
      if (item.demand_type === 1) {
        this.$router.push('/helpHeGoods/' + item.demand_code + '/' + item.aideder_name)
      } else if (item.demand_type === 2) {
      //  this.$router.push('/helpHe/' + item.demand_code + '/' + item.aideder_name)
      // let linkStr=process.env.PJ_URL +"payview/helphe.html?demand_code=" +
      //           item.demand_code +
      //           "&userid=" +localStorage.getItem("userid")+
      //           "&token=" + localStorage.getItem("token")+"&path="+this.$route.path
      //        ;
      //        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
      //             window.native.appLoadUrl(linkStr)
      //        }else{
      //            location.href =  linkStr
      //        }
       if (this.isios()) {
            let linkStr=process.env.PJ_URL +"payview/helphe.html?demand_code=" +
               item.demand_code +
                "&userid=" + localStorage.getItem("userid")+
                "&token=" + localStorage.getItem("token")+ "&payname=" +process.env.WX_MCHTYPE+ "&jdomain=" +process.env.BASE_API+"&path="+this.$route.path
             ;
            //  if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                  window.native.appLoadUrl(linkStr)
       }
       else{ this.$router.push(
              "/helpHe/" + item.demand_code + '/' + item.aideder_name
            );
       }
      }
    },
    // 点击放大图片
    clickImg (e) {
      this.showImg = true
      if (e.currentTarget.src.indexOf('min') !== -1) {
        e.currentTarget.src = e.currentTarget.src.replace('min', 'max')
        this.imgSrc = e.currentTarget.src
      }
    },
    viewImg () {
      this.showImg = false
    },
    show(index1,index) {
        this.$refs.previewer[index].show(index1)
      },
  },
  created () {
    if(localStorage.getItem("token")&&localStorage.getItem("token")!=""){
      this.getLoveDynamicList()
    }
   
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
.status-list {
  min-height: 100%;
  background: #f6f6f6;
  .status-item-content {
    padding: 15px;
    .status-item-info {
      display: flex;
      padding: 10px;
      .status-item-info-img {
        width: 45px;
        height: 45px;
        padding-right: 7px;
      }
    }
    .forward-message-info {
      color: #39aede;
    }
    .status-item-message {
    //  display: flex;
      .status-item-message-img {
        margin-right: 7px;
        //float: left;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .content-container {
        position: relative;
        .detailContentInfo {
          max-height: 67px;
          padding-bottom: 15px;
          overflow: hidden;
          font-size: 13px;
          color: #666;
          word-break: break-all;
        }
        .active {
          max-height: 5000px;
          padding-bottom: 36px;
        }
        .unfold {
          position: absolute;
          width: 100%;
          bottom: -1px;
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
              color: #ef835b;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
  .status-item-handle {
    border-top: 1px solid #e5e5e5;
    padding: 11px 0;
    .status-item-handle-icon {
      padding-right: 6px;
    }
  }
  .showall {
    height: 100px;
    overflow: hidden;
  }
  .showall .active {
    height: auto;
    min-height: 50px;
  }
   .nomatch {
    position: absolute;
    width: 100%;
    text-align: center;
    color: rgb(236, 73, 73);
    line-height: 80px;
  }
}
</style>
