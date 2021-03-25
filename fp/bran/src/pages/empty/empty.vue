<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre" ref="ceshiheader">{{title}}</x-header>
    <div class="over-auto box-withheader noheader">
      <iframe :src="url" width="100%" height="100%" style="border:none;" ref="frame"></iframe>
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
    mounted(){
      console.log(this.$route.query.url)
    },
    methods: {
      backToPre() {
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less">


</style>
