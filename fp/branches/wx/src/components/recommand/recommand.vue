<template>
  <div>
  <div v-if="type=='3'">
    <assistone :item= 'item'></assistone>
  </div>
  <div v-if="type=='1'">
    <assisttwo :item= 'item'></assisttwo>
  </div>
  <div v-if="type=='2'">
    <assistthree :item= 'item'></assistthree>
  </div>
  <div v-if="type=='4'">
    <assistfour :item= 'item'></assistfour>
  </div>
    <div v-if="type==''">

      <assistitem :item= 'item' :type='type'></assistitem>
    </div>
  </div>
</template>
<script>
import assistone from "./assistone";
import assisttwo from "./assisttwo";
import assistthree from "./assistthree";
import assistfour from "./assistfour";
import assistitem from "@/components/assist/assistitem"
export default{
  name: 'recommand',
  components: {assistone,assisttwo,assistthree,assistfour,assistitem},
  data(){
     return {

     }
  },
  props:{
    type:{
      type:String,
      default:""
    },
    item:{
      type:Object,
      default:null
    }
  },
  methods:{

  },

}
</script>
<style>
</style>
