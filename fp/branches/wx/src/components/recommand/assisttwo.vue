<template>
  <div class="bg-ffffff mt-12"  style="padding: 15px">
    <div class="imgwrap">
      <router-link :to="todetail(item)"  class="linkonly dis-block" style="position: relative;">
        <img :src="item.img_url" style="width: 100%;height:135px">
        <!--<p class="namedesc" style="font-size:18px;">{{item.projectname}}</p>-->
        <!--<p class="targetdesc" style="font-size:16px;">{{item.projecttarget}}</p>-->
        <!--<x-button type="warn" class="tnclass">我要捐款</x-button>-->
      </router-link>
    </div>
    <p class="itemdesc f-16 tit-nowrap" style="padding-top: 5px">{{item.demand_title}}</p>
    <p class="itemdesc f-12 color-999 tit-nowrap">{{item.demand_coment}}</p>
  </div>
</template>
<script>
  import {XButton, Card} from 'vux'
  export default {

    name: 'assisttwo',
    components: {XButton, Card},
    data() {
      return {}
    },
    props: {
      item: {
        type: Object,
        default: null
      }
    },
    methods:{
      todetail(item){
        return "/loveNeed/"+item.id;
      }
    }
  }
</script>
<style scoped>
  .imgwrap {
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .namedesc {
    position: absolute;
    left: 18px;
    right: 0;
    bottom: 8em;
    height: 1.4em;
    padding: 20px 50px 12px 13px;
    margin: 0;
    color: #fff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  .targetdesc {
    position: absolute;
    left: 18px;
    right: 0;
    bottom: 7em;
    height: 1.4em;
    padding: 20px 50px 12px 13px;
    margin: 0;
    color: #fff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }

  .tnclass {
    position: absolute;
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    border-radius: 3px;
    width: auto !important;
    left: 26px;
    bottom: 6em;
    font-size: 12px;
    overflow: hidden;
  }

</style>
