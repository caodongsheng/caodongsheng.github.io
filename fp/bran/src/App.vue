<template>
  <div id="app">
    <keep-alive :include="cachedViews" v-if="isRouterAlive">
      <router-view></router-view>
    </keep-alive>
    <AppFooter v-show="IsShowFooter"></AppFooter>
    <loading v-show="isLoading"></loading>
    <span id="cnzz_stat_icon_1276877353"></span>
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
      // let flag = false;
      // if (this.$route.path === "/") flag = true;
      // else if (this.$route.path.indexOf("demand") > -1) flag = true;
      // // else if (this.$route.path === '/mall') flag = true
      // else if (this.$route.path === "/local") flag = true;
      //  else if (this.$route.path === "/fpzs") flag = true;
      // else if (this.$route.path === "/zcprojectList") flag = true;
      // else if (this.$route.path === "/example") flag = true;
      // else if (this.$route.path === "/Exhibition") flag = true;
      // //else if (this.$route.path.indexOf('publish') > -1) flag = true
      // else if (this.$route.path === "/user"&&this.noupload) flag = true;
      // else if (this.$route.path === "/recom") flag = true;

      // return flag;
    }
   
  },
  watch: {
    $route() {
      if (window._czc) {
        let location = window.location
        let contentUrl = location.pathname + location.hash
        console.log(contentUrl)
        let refererUrl = '/'
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
      }
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
    }
  },
  mounted() {
    const script = document.createElement('script')
    script.src = location.protocol+'//s11.cnzz.com/z_stat.php?id=1276877353&web_id=1276877353'
    script.language = 'JavaScript'
    document.getElementById('cnzz_stat_icon_1276877353').appendChild(script);
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
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/close.less";
#cnzz_stat_icon_1276877353{
  display: none;
}
</style>
