<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack: true}" v-if="title!=''" @on-click-back="backToPre" ref="ceshiheader">{{title}}</x-header>
    <div class="over-auto" :class="getHWithTitle">
      <iframe :src="url" width="100%" height="100%" style="border:none;"></iframe>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { XHeader } from 'vux'

  export default {
    name: "empty",
    components: { XHeader },
    data(){
      return{
        url:this.$route.query.url,
        title:this.$route.query.title
      }
    },
    methods: {
      backToPre() {
        this.$router.go(-1)
      },
      getHWithTitle(){
        if(this.title!=""){
          return "box-withheader"
        }
        else{
          return "noheader"
        }
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
