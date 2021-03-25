<template>
  <div>
    <header>
            <i class="fa fa-angle-left" @click="icon"></i>
            <p>爱心反馈</p>
            <span>发布爱心反馈</span>
    </header>
    <flow orientation="vertical" style="height:200px;">
      <flow-state state="2天" title="1" is-done></flow-state>
      <flow-line is-done :line-span="15"></flow-line>

      <flow-state state="2" title="2" is-done></flow-state>
      <flow-line :line-span="30"></flow-line>

      <flow-state state="3" title="3"></flow-state>
      <flow-line :line-span="45"></flow-line>

      <flow-state state="4" title="4"></flow-state>
    </flow>
  </div>
</template>

<script>
  import {XHeader,Flow, FlowState, FlowLine} from "vux";

  export default {
    components: {XHeader,Flow, FlowState, FlowLine},
    methods:{
        icon(){
            this.$router.go(-1)
        }
    }
  }
</script>

<style lang="less" scoped>
    header{
        width:100%;
        height:40px;
        background:#eee;
        line-height:40px;
        position: relative;
        i{
           position: absolute;
           left:10px;
           line-height:40px;
           font-size:30px;
        }
        p{
            text-align:center;
             font-size:15px;
        }
        span{
            position: absolute;
            right:10px;
             top:0;
             font-size:10px;
             color:orange;
        }
    }
</style>


