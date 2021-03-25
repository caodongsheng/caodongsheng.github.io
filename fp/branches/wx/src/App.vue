<template>
  <div id="app">
    <keep-alive :include="cachedViews" v-if="isRouterAlive">
      <router-view></router-view>
    </keep-alive>
    <AppFooter v-show="IsShowFooter"></AppFooter>
    <loading v-show="isLoading"></loading>
    <span id="cnzz_stat_icon_1273787537"></span>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppFooter from "./components/footer/footer";
import loading from "./components/util/loading";
import Vue from "vue";
import * as types from "./store/mutation-types.js";
import Bus from './assets/js/Bus'
export default {
  components: { AppFooter, loading },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      noupload:true,
      title: "",
      isRouterAlive: true
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    }),
    cachedViews() {
      return this.$store.state.cachedViews;
    },
    IsShowFooter() {
      let flag = false;
      if (this.$route.path === "/") flag = true;
      else if (this.$route.path.indexOf("demand") > -1) flag = true;
      // else if (this.$route.path === '/mall') flag = true
        else if (this.$route.path.indexOf("record") > -1) flag = true;
      else if (this.$route.path === "/local") flag = true;
       else if (this.$route.path === "/fpzs") flag = true;
      else if (this.$route.path === "/zcprojectList") flag = true;
      else if (this.$route.path === "/example") flag = true;
      else if (this.$route.path === "/Exhibition") flag = true;
      //else if (this.$route.path.indexOf('publish') > -1) flag = true
      else if (this.$route.path === "/user"&&this.noupload) flag = true;
      else if (this.$route.path === "/recom") flag = true;

      if(this.getUrlParam('cancelFoot',false) == 1|| this.getUrlParam('cancelFoot',false) == '1'){
        localStorage.setItem('fromOddSystem',1)
        this.$store.state.nav_index = this.getUrlParam('navIndex',false)
        flag = false
      }else{
        if(window.location.search.startsWith("from=")){
          flag = false
        }else{
          if(localStorage.getItem('cancelFoot') ==1 ||localStorage.getItem('cancelFoot') =='1'){
            flag = false
          }else if (this.$route.path === "/") flag = true;
            else if (this.$route.path.indexOf("demand") > -1) flag = true;
            // else if (this.$route.path === '/mall') flag = true
              else if (this.$route.path.indexOf("record") > -1) flag = true;
            else if (this.$route.path === "/local") flag = true;
             else if (this.$route.path === "/fpzs") flag = true;
            else if (this.$route.path === "/zcprojectList") flag = true;
            else if (this.$route.path === "/example") flag = true;
            else if (this.$route.path === "/Exhibition") flag = true;
            //else if (this.$route.path.indexOf('publish') > -1) flag = true
            else if (this.$route.path === "/user"&&this.noupload) flag = true;
            else if (this.$route.path === "/recom") flag = true;
            else{
              flag = false
            }
          localStorage.setItem('fromOddSystem',0)
        }
       
      }
      return flag;
    }
   
  },
  watch: {
    $route() {

      if (this.$route.meta.cache === true) {
        this.$store.commit(types.ADD_CACHE_VIEWS, this.$route);
      }
    }
  },
  methods: {
    reload() {
      let _this = this;
      this.isRouterAlive = false;
      this.$nextTick(function() {
        _this.isRouterAlive = true;
      });
    },
 
    getUrlParam(name,noDecode) {
      var re = new RegExp('(?:\\?|#|&)' + name + '=([^&]*)(?:$|&|#)', 'i'),
        m = re.exec(location.href);
      var ret = m ? m[1] : '';
      return !noDecode ? decodeURIComponent(ret) : ret;
    },
    getQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let url = location.href;
      let pIndex = url.indexOf("?");
      let r = url.substring(pIndex + 1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      } else {
        return null;
      }
    },
    // fixIos7Bar_API(el, app) {
    //   const strDM = api.systemType;
    //   if (strDM === "ios") {
    //     const strSV = api.systemVersion;
    //     const numSV = parseInt(strSV, 10);
    //     const fullScreen = api.fullScreen;
    //     console.log(numSV);
    //     const iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
    //     if (numSV >= 7 && fullScreen == "false" && iOS7StatusBarAppearance) {
    //       el.style.paddingTop = "20px";
    //       app.style.top = "20px";
    //       app.style.bottom = "0px";
    //       app.style.height = "auto";
    //     } else {
    //       el.style.paddingTop = api.safeArea.top + "px";
    //       app.style.top = api.safeArea.top + "px";
    //       app.style.bottom = "0px";
    //       app.style.height = "auto";
    //     }
    //   }
    // },
    // fixStatusBar_API(el, app) {
    //   const sysType = api.systemType;
    //   console.log(sysType);
    //   if (sysType == "ios") {
    //     console.log("111111111111");
    //     this.fixIos7Bar_API(el, app);
    //   } else if (sysType == "android") {
    //     console.log("2222222222");

    //     let ver = api.systemVersion;
    //     ver = parseFloat(ver);
    //     console.log(ver);
    //     if (ver >= 4.4) {
    //       el.style.paddingTop = "25px";
    //       console.log(el.style.paddingTop);
    //       app.style.top = "25px";
    //       app.style.bottom = "0px";
    //       app.style.height = "auto";
    //     }
    //   }
    // }
  },
  created() {
    //this.getUserInfo();
    //this.checkWXAndLogin()
  },
  mounted() {
    const script = document.createElement('script')
    script.src = location.protocol+'//s11.cnzz.com/z_stat.php?id=1273787537&web_id=1273787537'
    script.language = 'JavaScript'
    document.getElementById('cnzz_stat_icon_1273787537').appendChild(script);
    Bus.$on('closefooter',(res)=>{
      if(res === true){
      this.noupload = false;
      }
    })
    Bus.$on('closefooter',(res)=>{
      if(res === false){
      this.noupload = true;
      }
    })
    // if (!this.isWeixinCient()) {
    //   if (this.getPhoneType() == "ios") {
    //     let width =
    //       window.innerWidth ||
    //       document.documentElement.clientWidth ||
    //       document.body.clientWidth;
    //     let height =
    //       window.innerHeight ||
    //       document.documentElement.clientHeight ||
    //       document.body.clientHeight;
    //       const header = document.getElementById("header");
    //       const app = document.getElementById("app");
    //     if ( height>895) {
    //       header.style.paddingTop = "44px";
    //      window.localStorage.setItem("hheight", "44px");

    //       app.style.top = "44px";
    //       app.style.bottom = "0px";
    //       app.style.height = "auto";
    //     }
    //     else{
    //       header.style.paddingTop = "20px";
    //       window.localStorage.setItem("hheight", "20px");
    //       app.style.top = "20px";
    //       app.style.bottom = "0px";
    //       app.style.height = "auto";
    //     }
    //   }
    // }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/close.less";

#cnzz_stat_icon_1273787537{
  display: none;
}
</style>
