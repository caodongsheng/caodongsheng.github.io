<template>
  <div style="overflow: auto;height: 100%">
    <headerBackTitleSearch :headerTitle='headerTitle'></headerBackTitleSearch>
    <div class="list-topoperate clearfix f-16 bg-ffffff color-999">
      <span>需求类型 <i class="icon-caret"></i></span>
      <span>状态 <i class="icon-caret"></i></span>
    </div>

    <div class="check-box">
      <img src="../../../../static/appimg/zwnr.png">
      <p class="color-999 f-24">暂无内容</p>
    </div>


  </div>
</template>

<script>
  import headerBackTitleSearch from '../../../components/header/headerBackTitleSearch'

  export default {
    components: {
      headerBackTitleSearch
    },
    data() {
      return {
        headerTitle: '审核需求'
      }
    }
  }
</script>

<style scoped>
  .check-box {
    text-align: center;
    margin-top: 30%;
  }

  .check-box img {
    width: 30%;
  }


</style>
