<template>
  <div>
    <x-header :left-options="{backText: ''}" >我的任务</x-header>
    <div class="over-auto box-withheader">
        <!-- <a href="https://shop.m.zgshfp.com.cn/mobile-h5/index.html#/tab/home">123123123132123</a> -->
      <!-- <iframe src="http://shop.m.zgshfp.com.cn/mobile-h5/index.html#/tab/home"  frameborder="0" scrolling="no" style="width:100%;height:500px" ref="external-frame"></iframe> -->
      <iframe :src= path width="100%" height="100%" style="border:none;"></iframe>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
    export default {
      name: 'my_task',
      components:{XHeader},
      data() {
          return{
              path: ''
          }
      },
      created () {
          let token,userId,nickName,userPic,createTime;
            token = this.G('token');
            userId = this.$store.state.user.id;
            nickName = this.$store.state.user.nick_name;
            userPic = this.$store.state.user.user_pic;
            createTime = this.$store.state.user.register_time;
        this.path = process.env.LO_URL+"/medalAndTask.html?token="+token+"&user_id="+userId+"&name="+nickName+"&name="+nickName+"&photo="+userPic+"&create_time="+createTime;
      }
    }
</script>

<style scoped>

</style>
