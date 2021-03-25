<template>
  <div class="bg-f6f5f6" style="height:100%">
      <recommand ref="scroll"></recommand>
  </div>
</template>
<script>
  import recommand from '@/pages/home/demand'
  export default {
    name:'demand3',
    components: {
        recommand

    },
    
    beforeRouteEnter(to, from, next)  {
       next(vm => {
            if(vm && vm.$refs.scroll.$refs.scroller) {
                setTimeout(function ()  {
                    vm.$refs.scroll.$refs.scroller.scrollTo(0,sessionStorage.getItem('demand3'),false)
                },0)
            }
       })
    },
    data () {
      return {


      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
