<template>
  <div class="registerDialog">
    <div class="overlayer"></div>
    <div class="dialog-box">
      <divider>请输入验证码</divider>
           11111111111111111111111111
      <div class="clear"></div>
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
    data () {
      return {
        dialogTitle: '错误信息'

      }
    },
    created () {
      this.$http.post('uts/user/api/images/imagecode')
        .then(res => {
          this.imgliu = res
        })
    }
  }
</script>

<style scoped>
  .vux-divider {
    padding-top: 30px;
    padding-bottom: 30px
  }

  .dialog-box {
    width: 80%;
    border-radius: 5px;
    z-index: 100;
    position: fixed;
    left: 10%;
    bottom: 30%;
    text-align: center;
    background: #ffffff;
  }

</style>
