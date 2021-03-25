<template lang="html">
    <div class="over" style="overflow: auto;-webkit-overflow-scrolling:touch;width:100%;height:100%;">
        <iframe :src="ex_url" width="100%" height="100%" :scrolling='is' style="border:none;width: 1px; min-width: 100%; *width: 100%;"></iframe>
    </div>
    <!-- <div >
        <iframe src="https://by.zgshfp.com.cn/app/Billboard.html" width="100%" height="100%"  ></iframe>
    </div> -->
</template>

<script>
export default {
  name:'Exhibition',
    data(){
        return{
          is:'yes',
          ex_url: process.env.EX_URL
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
        }
        if (isIOS) {
            this.is='no'
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
