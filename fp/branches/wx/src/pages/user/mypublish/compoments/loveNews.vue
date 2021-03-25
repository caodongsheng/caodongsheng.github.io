<template>
  <div class="love-news bg-ffffff mb-12 f-16">
    <group class="group-clearbd">
      <cell title="爱心反馈"  :is-link="num" >
        <span class="f-14" v-if="num" @click="goToLovedynamics" >共<em class="f-14 color-orange"> {{demandDetail.dynamic_num}} </em>次</span>
      </cell>
    </group>
    <div class="writelovenews">
      <router-link :to="{name: 'loveFeedback',demandId:demandDetail.id}" @click.native="" class="btn-orange-lg dis-block text-center color-white">
        发布爱心反馈
      </router-link>
    </div>
  </div>
</template>

<script>
  import {Group, Cell} from 'vux'
  export default {
    name: "dynamicPub",
    components:{Group, Cell},
    props: {
      demandDetail: ''
    },
    computed:{
      num(){
        return this.demandDetail.dynamic_num>0
      }
    },
    methods:{
      goToLovedynamics(){
        this.$router.push({name: 'lovedynamics',demandId:this.demandDetail.id})
      }
    }
  }
</script>

<style scoped>
  /*爱心反馈部分*/

  .writelovenews {
    padding: 15px 40px;
    /*border-top: 1px solid #eee*/
  }

  .btn-orange-lg {
    height: 40px !important;
    line-height: 40px !important;
    border-radius: 40px !important;
    font-size: 15px !important;
  }

</style>
