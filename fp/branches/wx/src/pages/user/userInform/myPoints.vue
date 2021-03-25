<template>
  <div>
    <x-header :left-options="{backText: ''}" >我的积分</x-header>
    <div class="over-auto box-withheader">
      <!-- <iframe src="http://shop.m.zgshfp.com.cn/mobile-h5/index.html#/tab/home"  frameborder="0" scrolling="no" style="width:100%;height:500px" ref="external-frame"></iframe> -->
      <iframe :src= path width="100%" height="100%" style="border:none;"></iframe>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
    export default {
      name: 'my_points',
      components:{XHeader},
      data() {
          return {
                path: ''
            }
        },
        created() {
            let token,userId,nickName,userPic,createTime;
            token = this.G('token');
            this.path = process.env.LO_URL+"/myPoints.html?token="+token;
        }
    }
</script>

<style scoped>

</style>
