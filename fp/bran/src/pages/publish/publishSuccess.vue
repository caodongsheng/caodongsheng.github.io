<template>
  <div class="pubSuc">
    <!-- <x-header :left-options="{preventGoBack:true,showBack:false}">发布成功</x-header> -->
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">发布成功</x-header>
    <div style="margin: 0 auto;height: 100%;background:#fefefe ">
      <img style="width: 100%" src="../../assets/images/pub_suc.png"/>
    </div>
    <div v-if="demandType==='2'" class="btnContainer text-center">
      <!--<img class="btn" src="../../assets/images/btn.png"/>-->
      <a @click="goIndex" class="btn">返回首页</a>
      <router-link :to="{name:'mypubcapital',params:{demandId:demandId}}" class="btn">查看需求</router-link>
    </div>

    <div v-if="demandType==='1'" class="btnContainer text-center">
      <a @click="goIndex" class="btn">返回首页</a>
      <router-link :to="{name:'mypubgoods',params:{demandId:demandId}}" class="btn">查看需求</router-link>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "public-success",
    components: {
      XHeader
    },
    computed: {
      demandId() {
        return this.$route.query.demandId
      },
      demandType() {
        return this.$route.query.demand_type
      }
    },
    methods: {
        goIndex(){
          let u = navigator.userAgent
          let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
          this.ModuleNative('selectedIndex',1)
          if(isiOS){
            this.ModuleNative('PopVCApp',1)
          }else{
            this.ModuleNative('close',1)
          }
          
        },
        backToPre() {
            this.$router.replace('/mypublist/0');
        }
    }
  }
</script>

<style scoped>
.btnContainer{
  width: 100%;
  position: absolute;
  z-index: 2;
  top:50%
}
.btn{
  color: white;
  background: #fd8929;
  padding: 7px 15px;
  border-radius: 5px;
}
</style>
