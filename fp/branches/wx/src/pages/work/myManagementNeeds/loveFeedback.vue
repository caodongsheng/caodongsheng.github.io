<template>
  <div>
    <x-header :left-options="{backText: ''}">发布爱心反馈</x-header>
    <feedback :button='button' :dynamic='dynamic'></feedback>
  </div>
</template>

<script>
import { XHeader } from "vux";
import feedback from "./compoments/feedback";
import {mapState} from 'vuex'
export default {
  components: {
    XHeader,
    feedback
  },
  data(){
    return{
      button:'发布爱心反馈',
      dynamic:'发布爱心反馈'
    }
  }
};
</script>

<style scoped>
</style>


