<template>
  <div>
    <x-header :left-options="{backText: ''}" >至善信用分</x-header>
    <div class="over-auto box-withheader">
      <iframe :src= path width="100%" height="100%" style="border:none;"></iframe>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
    export default {
      name: 'credit_score',
      components:{XHeader},
      data() {
          return {
              path: ""
          }
        },
        created() {
            let token,userId,userType,userName;
             userType = this.$store.state.user.is_cadre == 1 ? 2 : 1;
             userId = this.$store.state.user.id;
             userName = this.$store.state.user.nick_name;
            token = this.G('token');
            this.path = "https://djres.zgshfp.com.cn/byPro/dist/index.html?userType=" + userType+ "&userId=" + userId+ "&userName="+userName+"&token="+token;
        }
    }
</script>

<style scoped>

</style>
