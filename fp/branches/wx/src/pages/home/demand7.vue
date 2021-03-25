<template>
  <div class="bg-f6f5f6" style="height:100%">
      <recommand ref="scroll"></recommand>
  </div>
</template>
<script>
  import recommand from '@/pages/home/demand'
import { setTimeout } from 'timers';
  export default {
    name:'demand7',
    components: {
        recommand

    },
    
    beforeRouteEnter(to, from, next)  {
       next(vm => {
            if(vm && vm.$refs.scroll.$refs.scroller) {
                setTimeout(function ()  {
                    vm.$refs.scroll.$refs.scroller.scrollTo(0,sessionStorage.getItem('demand7'),false)
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
