<template>
  <div>
        <x-header :left-options="{backText: ''}">填写感谢回馈</x-header>

    <feedback :button='button' :dynamic='dynamic'></feedback>
  </div>
</template>

<script>
import { XHeader } from "vux";
import feedback from "./compoments/feedback";
export default {
  components: {
    XHeader,
    feedback
  },
   data(){
    return{
      button:'提交',
      dynamic:'填写感谢回馈动态'
    }
  }
};
</script>

<style scoped>
</style>


