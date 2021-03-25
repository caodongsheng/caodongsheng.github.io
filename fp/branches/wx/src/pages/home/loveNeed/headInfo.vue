<template>
  <div class="headInfo" v-if="vos2!=null">
    <div class="user-box">
      <avatar width="35" height="35" :image="vos2.photoUrl" :name="vos2.aideder_name"></avatar>
      <div class="user-box-b">
        <p class="poorName">{{vos2.aideder_name}}</p>
        <p class="address"><i class="fa fa-map-marker"></i>&nbsp;{{vos2.region_name}}<!-- {{vos.issue_date}} --></p>
      </div>
      <span class="needLabel">{{personType}}</span>
    </div>
  </div>
</template>
<script>
  import avatar from '../../../components/util/avatar'
  export default {
    props: ['vos'],
    components: {avatar},
    data () {
      return {
        vos2: null
      }
    },
    computed:{
//    regionName(){
//      return this.vos2.region_name.indexOf("县")>0?this.vos2.region_name.split("县")[0]+"县":this.vos2.region_name.split("市")[0]+"市"
//    },
      personType(){
        return this.vos2.is_poor==1?"贫困户":"个人"
      }
    },
    watch: {
      vos () {
        this.vos2 = this.vos
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
      padding 15px 0 14px
      .avaterimg
        margin-right 8px
      .user-box-b
        flex 1
        .poorName
          font-size 15px
          color #333
        .address
          font-size 12px
          color #999
          .fa
            vertical-align baseline
      .needLabel
        padding 0 5px
        font-size 9px
        color #F9A410
        border 1px solid #F9A410
        border-radius 4px
</style>
