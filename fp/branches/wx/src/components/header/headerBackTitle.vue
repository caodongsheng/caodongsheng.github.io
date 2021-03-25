<template>
  <div class="header-wrap">
    <x-header :left-options="{backText: ''}" >{{headerTitle}}</x-header>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  export default {
    components: {XHeader},
    props: ['headerTitle']
  }
</script>

<style lang="less" scoped>

</style>

