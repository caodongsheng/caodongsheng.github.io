<template>
  <div class="info-base bg-ffffff mb-12">
    <div class="flex-tab" @click="gotoDemandDetail">
      <div class="flex-tab-cell tab-left linkonly">
        <img v-lazy="getmidpic(demandDetail.img_url)" width="80" height="80">
        <!-- <img :src="changetype(demandDetail.img_url)" width="80" height="80"> -->
      </div>
      <div class="flex-tab-cell tab-right">
        <h1 class="color-333 f-16 f-normal tit-nowrap">{{demandDetail.demand_title}}</h1>
        <p class="color-999 f-14 tit-2row-nowrap">{{demandDetail.demand_coment}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getMidPic } from '../../../../util/getMid';
    export default {
        name: "detail_header",
      props:{
        demandDetail:''
      },
    methods: {
       getmidpic(imgurl){
    return getMidPic(imgurl)
    },
       gotoDemandDetail(){
         this.$router.push("/loveNeed/"+this.demandDetail.id)
       }
    }
    }
</script>

<style scoped>
  /*需求基本信息*/
  .info-base {
    padding: 15px 15px
  }

  .info-base .tab-left {
    width: 90px
  }

  .info-base .tab-right {
    position: relative
  }

  .info-base .tab-right h1 {
    line-height: 100%;
  }

  .info-base .tab-right p {
    position: absolute;
    bottom: 0
  }

  .info-base .tab-right p span {
    padding-right: 10px;
  }
</style>
