<template>
  <div class="postitem bg-ffffff mt-12"  style="padding: 15px">
    <div class="imgshow row pic3" @click="todetail(item)" >
      <div class="col leftrow"><img v-lazy="getmidpic(item.img_url)" alt=""></div>
      <div class="col">
        <div class="row rightrow">
          <template v-for="item1 in item.img">
          <div class="col"><img v-lazy="getmidpic(item1)" alt=""></div>
          </template>
        </div>
      </div>
    </div>
    <div class="location">
      <div class="info">
        <div class="shopname f-16 tit-nowrap">{{item.demand_title}}</div>
        <div class="shoplocation f-14 color-999 tit-nowrap">{{item.demand_coment}}</div>
      </div>
    </div>
  </div>
</template>
<script>
 import { getMidPic } from "@/util/getMid";

export default{
  name: 'assistfour',
  props:{
    item:{
      type:Object,
      default:null
    }
  },
  data(){
    return {

    }
  },
  methods:{
    todetail(item){
      this.$router.push("/loveNeed/"+item.id);
    },
       getmidpic(imgurl){
    return getMidPic(imgurl)
    }
  }
}
</script>
<style scoped>
.row {display: -webkit-box;display: -webkit-flex;}
.col {-webkit-box-flex:1; -webkit-flex:1; flex:1;}



/* 展示图片 */
.pic3 .leftrow {-webkit-box-flex:2; -webkit-flex:2; flex:2;padding-right:2px}
.pic3 .leftrow img {height: 200px; width: 100%;}
.pic3 .rightrow {flex-direction: column}
.pic3 .rightrow .col{;padding-bottom:1px}
.pic3 .rightrow .col:last-child{;padding-top:1px;padding-bottom: 0}
.pic3 .rightrow img {height: 96px; width: 100%;}

.pic4 .up img{width: 100%;height: 200px;}
.pic4 .down {margin-top: 3px;}
.pic4 .down img {width: 100%;height: 100px;}
.pic4 .down .middle {padding: 0 5px;}


</style>
