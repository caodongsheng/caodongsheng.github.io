<template>
  <div>
    <x-header :left-options="{backText: ''}" >爱心热度</x-header>
    <div class="over-auto box-withheader">
        <!-- <a href="https://shop.m.zgshfp.com.cn/mobile-h5/index.html#/tab/home">123123123132123</a> -->
      <!-- <iframe src="http://shop.m.zgshfp.com.cn/mobile-h5/index.html#/tab/home"  frameborder="0" scrolling="no" style="width:100%;height:500px" ref="external-frame"></iframe> -->
      <iframe :src= path width="100%" height="100%" style="border:none;"></iframe>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  let Base64 = require('js-base64').Base64
    export default {
      name: 'love_heat',
      components:{XHeader},
      data() {
          return {
              path:process.env.LO_URL+"/myLoveHeat.html?token="+this.G('token')
          }
        },
        created() {
            let token,userId,nickName,userPic,createTime;
            token = this.G('token');
            userId = this.$store.state.user.id;
            nickName = this.$store.state.user.nick_name;
            userPic = this.$store.state.user.user_pic;
            createTime = this.$store.state.user.register_time;
            let msg =  {"user_id": userId,"name":nickName, "photo": userPic,"create_time":createTime}
            let message = JSON.stringify(msg)
            message = Base64.encode(message)
            // this.path = "https://by.zgshfp.com.cn/app/myLoveHeat.html?token=" + token+"&user_id="+userId+"&name="+nickName+"&photo="+userPic+"&create_time="+createTime;
            this.path = process.env.LO_URL+"/myLoveHeat.html?token=" + token + "&message=" + message
        }
    }
</script>

<style scoped>

</style>
