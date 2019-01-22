<template>
  <div class="box">
      <router-link to="/angular">word</router-link>
      <icon-nav></icon-nav>
      <float-foll></float-foll>
      <div class="asd">
          <div class="fff" ref="ggg">

          </div>
      </div>
  </div>
</template>
<script>
import iconNav from '@/components/nav_icon'
import floatFoll from '@/components/floatfoll'
export default {
    components:{
        iconNav,
        floatFoll
    },
  data () {
    return {
      msg: ''
    }
    },
    methods:{
        asd(){
           console.log(this.$refs.ggg.offsetTop)
       }
   },
   mounted(){
       this.asd()
   }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .box{
        position:absolute;

    }
    .asd{
        width: 100%;
        height: 3000px;
        .fff{
            width: 100%;
            height:200px;
            background: #000;
            margin-top: 500px;
        }
    }
</style>
