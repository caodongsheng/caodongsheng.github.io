<template>
  <div  class="box-withfooter network-error">
    <div class="flex-tab h-full">
      <div class="flex-tab-cell v-middle text-center">
        <img src="../../../static/appimg/neterror.jpg" alt="">
         <p>
                出错啦，点击刷新重新加载！
        </p>
            <div class="btnarea">
              <x-button type="primary" @click.native="refreshFun" action-type="button" class="btn-orange-lg" >刷 新</x-button>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {XButton} from 'vux'
    export default {
        name: "networkError",
        components:{XButton},
        methods: {
            refreshFun() {
             // this.$router.replace(window.currentpath)
            }
        }
    }
</script>

<style lang="less" scoped>
  .network-error {
    .btnarea{padding: 0 30%}
    p{
      padding: 20px 0 40px 0;
      color:#666
    }
    img{width:85%;display: block;margin: 0 auto 0 auto}
  }
</style>
