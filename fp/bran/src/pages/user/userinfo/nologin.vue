<template>
  <div class="sigin-before" v-if="show" >
    <router-link class="linkonly dis-block" to @click.native="gotoLogin()">
      <img class="bd-radius-cir" src="../../../common/images/user-headimg.jpg" width="55" height="55"/>
    </router-link>
    <x-button type="primary" @click.native="gotoLogin()" action-type="button" class="btn-orange-lg">登 录 / 注册</x-button>
</div>
</template>
<script>
import{XButton} from "vux"

export default{
  components:{XButton},
  props:{
    show:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    gotoLogin(){
      //this.$router.push('/login');
      // window.android.login()
      this.ModuleNative('AppReturnToLoginPage','去登录')
    }
  }
}
</script>
<style scoped>
 .sigin-before {
  text-align: center;
  padding: 20px 50px;
}

.sigin-before .btn-orange-lg {
  margin-top: 15px
}
</style>
