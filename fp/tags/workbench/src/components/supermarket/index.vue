<template >
  <div class="" @click="getCmsUrl">爱心超市</div>
</template>

<script>
  export default {
    name: 'supermarket',
    components: {

    },

    computed:{
      logintoken(){
        if( this.$store.state.user.token!="")
         return this.$store.state.user.token
         else return ""
      }
    },
    methods:{
      getCmsUrl(){
        if(this.logintoken!=""){
            console.log('0000',process.env.SUPERMARKET_PATH+'?token='+this.logintoken)
            // window.open(process.env.BI_PATH+this.logintoken+"/1")
            // this.go(process.env.BI_PATH+this.logintoken+"/1")

            let tempPage=window.open(''," _blank");
            tempPage.location=process.env.SUPERMARKET_PATH+'?token='+this.logintoken
            this.$router.push('/dashboard')
        }
      },
      go(url){
        var link = document.createElement('a');
        link.target = "_blank";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.$router.push('/dashboard')
      },

    },
    mounted(){
        this.getCmsUrl()
    }
  }
</script>

<style lang="css">
</style>
