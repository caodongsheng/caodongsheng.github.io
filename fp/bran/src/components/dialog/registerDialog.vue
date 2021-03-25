<template>
  <div class="registerDialog"  v-show="dialogshow==true">
    <div class="overlayer"></div>
    <div class="dialog-box">
      <p class="text-center dia-tit">
        <span>请输入验证码</span>
        <span class="closePower" @click="closeyzmlogin()"><i class="fa fa-times"></i></span>
      </p>
      <div class="dia-box clearfix">
        <input type="text" name="verify" required placeholder="请输入验证码">
      <p class="dialog-box-r">
        <img :src="imgSrc"><br>
        <span>看不清，换一张</span>
      </p>
      </div>
      <h4 class="c-a">确认</h4>
    </div>
  </div>
</template>

<script>
  import {Divider} from 'vux'

  export default {
    components: {
      Divider
    },
    computed:{
      imgSrc(){
        return this.BASE_URL+'uts/user/api/images/imagecode'
      }
    },
    data () {
      return {
        imgliu: String,
        dialogshow:true
      }
    },
    created () {

      this.$http.post('uts/user/api/images/imagecode')
        .then(res => {

          this.imgliu = res
        })
    },
    methods:{
      // 验证码弹窗关闭
      closeyzmlogin () {
        this.dialogshow = false
      },
    }
  }
</script>

<style scoped>
  .vux-divider {
    padding-top: 30px;
    padding-bottom: 30px
  }

  .dialog-box {

  }

  .dialog-box-l {
    vertical-align: top;
    float: left !important;
    width: 60% !important;
  }

  .dialog-box-l input {
    width: 80%;
    height: 40px;
    float: right;
    margin-right: 10px;

  }

  .dialog-box-r {
    width: 40% !important;
    float: left;
  }

  .dialog-box-r img {
    width: 70%;
    height: 40px;
    vertical-align: top;
    float: left;
    display: block;
  }

  .dialog-box-r span {
    float: left;
    font-size: 13px
  }

</style>
