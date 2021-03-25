<template >
  <div class="" @click="getCmsUrl">青鹰</div>
</template>

<script>
  export default {
    name: 'qingying',
    components: {

    },

    computed:{
      userid(){
        if( this.$store.state.user.userid!="")
         return this.$store.state.user.userid
         else return ""
      }
    },
    methods:{
      getCmsUrl(){
        if(this.logintoken!=""){
            let tempPage=window.open(''," _blank");
            tempPage.location=process.env.QY_PATH+'?userId='+this.userid
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
