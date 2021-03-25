<template>
  <div class="box">
    <headerBackTitle :headerTitle='headerTitle'></headerBackTitle>
    <x-img :src="bannerURL" class="ximg-demo"></x-img>
    <!--1-->
    <tab v-model="index">
      <tab-item :selected="demo1 === item" v-for="(item, index) in list2" @click="demo1 = item" :key="index">{{item}}
      </tab-item>
    </tab>
    <div v-if="index === 0">
      <listarea></listarea>
    </div>
    <div v-if="index === 1">
      <loveHeat></loveHeat>
    </div>
    <div v-if="index === 2">
      <alleviation></alleviation>
    </div>
  </div>
</template>

<script>
  import headerBackTitle from '../../../components/header/headerBackTitle'
  import listarea from "./listComponent/listArea"
  import loveHeat from "./listComponent/loveHeat"
  import alleviation from "./listComponent/alleviation"
  import {XImg, Tab, TabItem} from 'vux'

  export default {
    components: {headerBackTitle, XImg, Tab, TabItem,listarea,loveHeat,alleviation},
    data() {
      return {
        bannerURL: '../../../../static/appimg/fpbd.jpg',
        headerTitle: '扶贫榜样',
        list2: ['项目详情', '项目进展', '爱心反馈'],
        demo1: '项目详情',
        index: 0
      }
    },
    
  }
</script>

<style scoped>
.box{
  width:100%;
  height:100%;
  background:#eee;
  overflow:auto;
}
    .ximg-demo {
    width: 100%;
    height: auto;
  }

  .vux-tab-container >>> .vux-tab >>> .vux-tab-item vux-tab-selected {
    color: #EE6B2B !important;
  }
  
</style>

