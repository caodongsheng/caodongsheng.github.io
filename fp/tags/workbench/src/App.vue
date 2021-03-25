<template>
  <div id="app">
    <router-view/>
  
  </div>
  
</template>

<script>
import { mapState } from "vuex";

  export default {
    name: 'App',
    provide () {
      return {
        reload: this.reload
      }
    },
  }
</script>
<style>
  .el-button--small, .el-button--small.is-round{
    margin-top: 10px;
  }
</style>
