<template>
  <div>
    <x-header :left-options="{backText: ''}">我的管辖区域</x-header>
    <!-- <div class="box-withbar over-auto bg-f6f5f6" style="bottom:55px"> -->
        <div class="box-withbar over-auto bg-f6f5f6" style="bottom:0">
      <div class="regionlist" v-if='this.data'>
        <span class="f-13">您当前有<em class="color-orange">{{regnum}}</em>个管辖区域</span>
        <p v-for="(item,index) in data" :key="index" class="f-15">{{item.regionName}}</p>
      </div>
    </div>
    <!--底部按钮-->
    <a class="btn-lovedynwrite btn-orange-lg dis-block text-center color-white">
      <p @click="">申请新的管辖区域</p>
    </a>

  </div>
</template>

<script>
  import {XHeader} from 'vux'
  export default {
    components: {XHeader},
    data() {
      return {
        regnum:0,
        data:  [],
      }
    },
    created () {
      this.$http.post('hts/management/workbench').then(res => {
        this.data = res.data.regionName
        this.regnum=this.data.length
      })
    },
  }
</script>

<style scoped>
  .regionlist{padding: 15px;text-align: center}
  .regionlist p{background: #fff;padding:15px;box-shadow: 2px 2px 5px rgba(0,0,0,0.1);border-radius: 4px;margin-bottom: 18px;text-align: left}
  .regionlist span{display: inline-block;padding:5px 20px;
    margin:10px auto 25px auto;background: #eae9ea;border-radius: 28px}

    /*底部按钮*/
  .btn-lovedynwrite {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0 !important;
    height: 55px !important;
    line-height: 55px !important;
    box-shadow: none;
    display: none;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>


