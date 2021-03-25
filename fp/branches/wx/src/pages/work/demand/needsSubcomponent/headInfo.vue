<template>
  <div class="headInfo" v-if="info2!=null">
    <div class="user-box">
      <avatar width="35" height="35" :image="info.photoUrl" :name="info.aideder_name"></avatar>
      <div class="user-box-b">
        <p class="poorName">{{info.aideder_name}}</p>
        <p class="address"><i class="fa fa-map-marker"></i>&nbsp;{{info.user_region_name}}</p>
      </div>
      <span class="needLabel">{{personType}}</span>
    </div>
    <div v-if="info.demand_type == 1" class="demandtitle">
        <p>我需要：<span>{{info.demand_title}}</span></p>
    </div>
    <div v-if="info.demand_type == 2" class="demandtitle">
        <p>{{info.demand_title}}</p>
        <p>目标金额： <span>{{info.target_amount}}</span>元</p>
    </div>
  </div>
</template>
<script>
  import avatar from '../../../../components/util/avatar'
  export default {
    props: ['info'],
    components: {avatar},
    data () {
      return {
        info2: null
      }
    },
    computed:{
//    regionName(){
//      return this.vos2.region_name.indexOf("县")>0?this.vos2.region_name.split("县")[0]+"县":this.vos2.region_name.split("市")[0]+"市"
//    },
      personType(){
        return this.info.is_poor===1?"贫困户":"个人"
      }
    },
    watch: {
      info () {
        this.info2 = this.info
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .headInfo
    padding 0 17px
    background-color #fff
    .user-box
      display flex
      align-items center
      padding 19px 0 17px
      .avaterimg
        margin-right 8px
      .user-box-b
        flex 1
        .poorName
          font-size 15px
          color #333
        .address
          font-size 10px
          color #999
          .fa
            vertical-align baseline
      .needLabel
        padding 0 5px
        font-size 9px
        color #F9A410
        border 1px solid #F9A410
    .demandtitle
        p   
            color #999
        span 
            color #ed6b2b    
</style>
