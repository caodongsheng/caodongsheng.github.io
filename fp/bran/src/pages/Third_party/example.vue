<template lang="html">
    <div class="over" style="overflow: auto;-webkit-overflow-scrolling:touch;width:100%;height:100%;">
        <iframe :src="cms_url" width="100%" height="100%" style="border:none;width: 1px; min-width: 100%; *width: 100%;" :scrolling='is'></iframe>
    </div>
</template>

<script>
export default {
  name:'example',
  data(){
      return{
        is:'yes',
        cms_url:process.env.CMS_URL
      }
  },
  methods:{

  },
  created(){
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
          this.is='yes'
      }else if (isIOS) {
          this.is='no'
      }else{
          this.is='auto'
      }

  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
.over{
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
}
</style>
