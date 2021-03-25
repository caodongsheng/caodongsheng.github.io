<template>
  <div class="fcontainer">
     <!-- <x-header :left-options="{showBack:false}"  ref="ceshiheader">{{title}}</x-header>  -->
    <!-- <div class="over-auto box-withheader noheader"> -->
         <div class="fdcontainer" >
      <iframe :src="url" width="100%" height="100%" style="border:none;bottom:30px" ref="frame"></iframe>
      </div>
    <!-- </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import { XHeader } from 'vux'

  export default {
    name: "fpzs",
    components: { XHeader },
    data(){
      return{
        url:this.$route.query.url,
        title:this.$route.query.title
      }
    },
    mounted(){

   let _this = this;
    //   this.$el.getElementsByTagName("iframe")[0].onload = function(){
      // this.$el.getElementsByTagName("iframe")[0].onload = function(){
      //  let doc =  _this.$el.getElementsByTagName("iframe")[0].contentWindow.document;
      // doc.getElementById("search_form").style.display = "none"
      // }

    },
    methods: {
      backToPre() {
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less">
.vux-header {
    z-index: 2;
}

    .fcontainer {
    min-height: calc(~"100% - 53px");;
  background-color: #FAFAFA;
  position: relative;
  }
   .fdcontainer {
     top:0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    // top: 45px;
    // bottom:-45px;
    height: 100%;
    width: 100%;
  }
    iframe {
        width: 100%;
        height: 100%;
    }



</style>
