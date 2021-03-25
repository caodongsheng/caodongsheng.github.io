<template>
  <div class="header-wrap">
    <x-header :left-options="{backText: ''}" >图标标题测试<a slot="right"><i class="iconfont icon-f-share2 f-20"></i></a></x-header>
    <br>
    <x-header :left-options="{backText: ''}" >证明列表<a slot="right" class="color-orange f-16">我来证明</a></x-header>
    <x-header :left-options="{showBack: false}"  ><a slot="left" class="color-orange f-16">删除</a>两侧标红<a slot="right" class="color-orange f-16">发布</a></x-header>
    <br>
    <x-header :left-options="{backText: ''}" >仅显示返回</x-header>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  export default {
    components: {XHeader}
  }
</script>

<style lang="less" scoped>

</style>

