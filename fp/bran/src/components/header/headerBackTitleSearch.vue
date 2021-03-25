<template>
  <div class="header-wrap">
    <x-header :left-options="{backText: ''}" >{{headerTitle}}<a slot="right"><i class=" fa fa-search f-20"></i></a></x-header>
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

