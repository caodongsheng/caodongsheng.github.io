<template>
  <div  class="box-full over-auto">
<recommand  :item="item1" :type="item1.type" v-for="(item1,index) in itemlist" :key="index" ></recommand>
  </div>
</template>
<script>
import recommand from "./recommand";
import {getcommandlist} from './testHttp';
export default{
  name: 'recommandtest',
  components: { recommand},
  data(){
   return{
     itemlist:[]
   }
  },

  methods:{
      getData(){z
        this.itemlist = getcommandlist(this)
      }
  },
  mounted(){
    this.getData()
  }
}
</script>
<style>
</style>
