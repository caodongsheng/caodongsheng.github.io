<template>
  <div class="index-wrap">
    <!--头部搜索消息-->
    <header style="height:30px;">
      <div class="dis-flex" style="align-items: center;">
        <!-- 未绑定手机号的邀请码扫码块 -->
        <!-- <div v-if="wxisbind" class="flex-city flex-left color-999">
          <router-link to="/invitescanCode">[☰]&nbsp;&nbsp;</router-link>
        </div> -->
    
        <!--  -->
        <div class="flex-city flex-left">
          <router-link to=""  @click.native="gocity" class="city-text">
            <em class="color-999  tit-nowrap">{{this.$store.state.city.name}}</em>
          </router-link>
        </div>
        <div class="flex-search flex-mid" style="height:30px;">
          <x-input title="" placeholder= "搜索"  @on-focus="onFocus"   style="height:30px;">
            <i slot="label" class="fa fa-search" aria-hidden="true"></i>
          </x-input>
        </div>
        <div class="flex-msg flex-right">
          <router-link to @click.native="lonstatus" class="top-msgtip dis-block">
             <i class="msgtip"></i>
            <!--<i class="fa fa-bell-o" aria-hidden="true"></i>-->
            <em class="color-999 f-11">爱心反馈</em>
          </router-link>
        </div>
      </div>
    </header>
    <div class="tab-con" >
     <!-- <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"  @leave="leave" > -->
          <!-- <keep-alive :include="cachedViews"> -->
            <router-view class="con" ></router-view>
          <!-- </keep-alive> -->
        <!-- </transition >
      </v-touch > -->
    </div>
    <confirm v-model="showconfirm" title = '提示' @on-confirm = "onConfirm" @on-cancel="cancel"><p style="text-align:center;">是否切换到当前城市？</p></confirm>
    <div class="lightBox" v-show="showPrompt"></div>
    <!-- 首页活动弹窗 -->
    <div class="Popup" v-show="promptImg !== null">
      <div class="promptMsg" v-show="showPrompt">
        <a  class="a">
          <!-- <img :src="promptImg.popup_img" @click="pu(promptImg)" v-show="promptImg !== null"> -->
          <img src="" @click="pu(promptImg)" v-show="promptImg !== null" ref="popImg" style="width:300px;height:300px">
          <div class="msgClose" v-show="showPrompt" @click="closeMsg" ></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {XInput, Confirm} from 'vux'
  import {mapMutations} from 'vuex'
  import * as types from '../../store/mutation-types.js'
  import {mapState} from 'vuex'
  import getCurrentCityName from './getUserLocation'
  export default {
    components: {XInput, Confirm},
    name: 'index',
    created () {
      this.$store.commit(types.ADD_CACHE_VIEWS, {name:'index'})
      this.getCurTime();
      this.$store.commit(types.ADD_CACHE_VIEWS, {name: 'index'})
      if (this.G('set_showConfirm') === true && this.user.concern_province_region_id !== null) {
        this._getCurrentCityName()
      }

    },
    data () {
      return {
        sequence: 0,
     
        showconfirm: false,
        thisCity: {},
        citys: '全国',
        showPrompt: false,
        promptImg: {},
        hotWord: this.G('hotWord'),
        // wxisbind:false,//微信首页扫码标志，微信浏览器打开页面且微信号未绑定手机时为真;
      }
    },
    computed: {
     
      ...mapState([
        'city',
        'user'
      ])
    },
    methods: {
      ...mapMutations([
        'cityCheck'
      ]),
      toapp(){
       window.myhome.windowfinish();
      },
      gocity(){
        let url=process.env.WX_URL+'/page/distinguishMidArea.html'
        location.href=url
      },
      getCurTime() {
          //判断cutTime 是否存在
        if(this.G('cutTime')) {
            let curTime = new Date().getTime();
            let curHour =(curTime - this.G('cutTime')) / 3600000;
            if(curHour > 24) {
                this.getProptContent();
                this.L('cutTime', new Date().getTime())
            }
        }else {
            this.getProptContent();
            this.L('cutTime',new Date().getTime());
        }
      },
      //获取首页弹窗内容
      getProptContent() {
        this.$http.post('hts/help/getPopUp')
          .then(res => {
            this.promptImg = res.data;
            if(this.promptImg == null) {
                this.showPrompt = false;
            }else if(this.promptImg.popup_img !==""){
                this.$refs.popImg.src= this.promptImg.popup_img
                this.showPrompt = true;
            }

          })
          .catch(err => {
            console.log(err);
          })
      },
       pu(item){
        if(item.popup_link) {
           this.promptImg = null;
           this.showPrompt = false;

          if (item.popup_link.substr(0, 4) == "http") {
            if (this.isapp()) {
              if(this.isios()){
				window.native.appLoadUrl(item.popup_link);
				}
				else{
					location.href =item.popup_link
				}
           
            } else {
              this.$router.push({
                path: '/empty',
                query: {
                  title: item.popup_title,
                  url: item.popup_link
                }
              })
            }
          } else {
            this.$router.push({
              path: item.popup_link
            })
          }

        }
      },
      cancel () {
        let name = {name: '全国', id: ''}
        this.cityCheck(name)
      },
      onConfirm () {
        this.showconfirm = false
        this.cityCheck(this.thisCity)
        localStorage.setItem('times_state', new Date().getTime())
      },
      _getCurrentCityName () {
        if (!localStorage.getItem('times_state') || localStorage.getItem('times_state') === 'undefined') {
          this.getCity()
        }
      },
      lonstatus(){
       if(localStorage.getItem("token")&&localStorage.getItem("token")!=""){
        this.$router.push("/message/statusList")
       }
       else{
         window.android.login();
       }
      },
      getCity () {
        getCurrentCityName().then(res => {
          if (this.city !== res.province && Number(new Date().getTime()) > Number(localStorage.getItem('times_state')) + 1000 * 60 * 60 * 24 * 7) {
            this.showconfirm = true
            this.thisCity.name = res.province
          }
        })
      },
      onSwipeLeft () {
        if (this.$store.state.navflag) {
          let index = this.index + 1
          if (index >= this.$refs.chrid.vos.length) {
            index = this.$refs.chrid.vos.length - 1
          }
          let item = this.$refs.chrid.vos[index]
          this.$refs.chrid.goitem(item, index)
        }
      },
      onSwipeRight () {
        if (this.$store.state.navflag) {
          let index = this.index - 1
          if (index === -1) {
            index = 0
          }
          let item = this.$refs.chrid.vos[index]
          this.$refs.chrid.goitem(item, index)
        }
      },
      chrid_save (index) {
        if (index > this.index) { // 往后点了
          this.num = -100
        } else {
          this.num = 100
        }
        this.index = index
      },
      beforeEnter (el) {
        // el.style = 'transform:translateX(' + (-this.num) + '%)'
        el.style.transform = 'translateX(' + (-this.num) + '%)'
      },
      enter (el, done) {
        el.offsetHeight
        // el.style = 'transition:ease  0.5s;transform:translateX(0)'
        el.style.transition = 'ease  0.5s'
        el.style.transform = 'translateX(0)'
        done()
      },
      afterEnter (el) {
        // 当执行完毕以后会执行
      },
      leave (el) {
        // el.style = 'transition:ease  0.5s;transform:translateX(' + (this.num) + '%)'
        el.style.transition = 'ease  0.5s'
        el.style.transform = 'translateX(' + (this.num) + '%)'
      },
      onFocus () {
        this.$router.push({
          path: '/searchRecoder'
        })
      },
      calHeight () {
        let win_h = screen.height
      },
      tagResultHandler (result) {
        let sequence = result.sequence
        let tags = result.tags === null ? [] : result.tags
      },
      aliasResultHandler (result) {
        let sequence = result.sequence
        let alias = result.alias
        this.showToast('', 'text', '20em', 'Success!' + '\nSequence: ' + sequence + '\nAlias: ' + alias)
      },
      errorHandler (err) {
        let sequence = err.sequence
        let code = err.code
        this.showToast('', 'text', '20em', 'Error!' + 'Sequence: ' + sequence + 'Code: ' + code)
      },

      closeMsg() {
        this.showPrompt = false;
      },
      /*//校验微信是否绑定手机号
      wxisbind() {
        if(this.isWeixinCient()){
          console.log(this.$store.state.user.id)
          if(!this.$store.state.user.mobile){
            this.wxisbind=true;
          }
        }
      }*/
    },
    mounted () {
      window.vm=this
      this.calHeight()
      // this.wxisbind()
    },
    computed: {
      //校验微信是否绑定手机号
      wxisbind() {
        if(this.isWeixinCient()){
          console.log(this.$store.state.user.id)
          if(!this.$store.state.user.mobile){
            return true;
          }
        }else{
          return false;
        }
      },
     
    },
    watch: {
        '$route'(to, from) {
            if(to.path == '/recom' && window.api) {
                this.getCurTime();
            }
        }
    },
    activated() {
    },
    deactivated() {
      
        // console.log(this.$refs.chrid)
    }
  }
</script>

<style lang="less" scoped>
  .flex-tab{
    position: relative;
    width: 100%;
  }
  .index-wrap header{
      padding: 7px;
  }
  .index-wrap header .tab-right {
    width:38px;
    text-align: right;
  }
  .index-wrap header .top-msgtip em {
    white-space: nowrap;
    line-height: 10px;
  }
  .tab-con{
    top: 44px;
  }
  .tab-con > div{
    touch-action: pan-y!important;
  }
  .vux-slider {
    height: 100%;
  }
  .tab-city{
    width:auto;
    max-width: 100px;
    text-align: left!important;
    padding-right:10px;
    display: inline-block;
    .top-msgtip{
      display: flex;
      right: 0;
      width: 60px;
      em{
        font-size: 14px;

      }
      .fa{
        font-size: 14px;
      }
    }
  }
  .vux-swiper {
    height: 100% !important;
  }
  .con{
    height: 100%;
    position: absolute;
    width: 100%;
  }
  .lightBox{
    position: absolute;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .Popup{
    .promptMsg {
      position: absolute;
      top: 50%;
      left: 50%;
      background: rgba(0, 0, 0, 0.6);
      transform: translate(-50%, -50%);
      z-index: 9999;
    }
    .a{
      position: relative;
      .msgClose{
        position: fixed;
        width: 29px;
        height: 59px;
        background-image: url(../../../static/appimg/promptmsg-close.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        right: -14px;
        top: -36px;
        z-index: 9999;
      }
    }
  }
  .index-wrap header .flex-left .city-text:after{
      border-color: #999 transparent transparent transparent;
  }
  .index-wrap header .top-msgtip .msgtip {
      // background:#000;
  }
</style>
