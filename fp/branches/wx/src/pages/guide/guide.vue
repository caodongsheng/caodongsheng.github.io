<template>
  <div id="app_yind">
    <div class="close" @click="closeWin()" v-show="$route.name !=='page3'">跳过</div>
    <!-- vue-touch提供的滑动事件指令，可以参考vue-touch文档 -->
    <v-touch>
      <!--<router-view></router-view>-->
      <router-view class="view"></router-view>
    </v-touch>
    <!-- 页面底部的圆点导航 -->
    <ul class="circle-nav">
      <li :class="{'nav-current':$route.name==='page1'||$route.name==='default'}"></li>
      <li :class="{'nav-current':$route.name==='page2'}"></li>
      <li :class="{'nav-current':$route.name==='page3'}"></li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    closeWin() {
      this.$router.replace("/recom");
    },
    clickLeft: function() {
      // router转场后会自动触发vueg的转场特效
      switch (this.$route.name) {
        case "default":
        case "page1":
          this.$router.push({
            name: "page2"
          });
          break;
        case "page2":
          this.$router.push({
            name: "page3"
          });
          break;
      }
    }
    //      onSwipeRight() {
    //          this.$router.back()
    //      }
  }
};
</script>
<style>
html,
body {
  margin: 0;
  height: 100%;
}
.view {
  min-height: 100%;
  text-align: center;
  line-height: 100px;
  color: rgba(0, 0, 0, 0.5);
}

#app_yind {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: inherit;
}

#app_yind > div {
  height: inherit;
}

.circle-nav {
  position: fixed;
  bottom: 41px;
  width: 100%;
  max-width: inherit;
  text-align: center;
  padding: 0;
  opacity: 0.75;
}

.circle-nav li {
  display: inline-block;
  width: 11px;
  height: 3px;
  background-color: #e3e3e3;
}

.nav-current {
  background-color: #fc7e06 !important;
}
.close {
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 10px;
  border-radius: 30px;
  color: #fff;
  font-size: 0.75em;
  position: absolute;
  right: 10px;
  top: 30px;
  z-index: 999;
}
</style>


