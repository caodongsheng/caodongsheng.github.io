<template>
  <div class="info-exn mb-12 bg-ffffff">
    <ul class="f-14">
      <li><span class="color-999">受助人：</span>{{demandDetail.aideder_name}}</li>
      <li><span class="color-999">身份证号：</span>{{demandDetail.aideder_idcard}}</li>
      <li><span class="color-999">地区：</span>{{demandDetail.user_region_name}}</li>
      <li><span class="color-999">需求发布人：</span>{{demandDetail.publish_name}} 发布</li>
      <li><span class="color-999">发布人联系方式：</span>{{demandDetail.publish_tel}}</li>
      <li><span class="color-999">发布人与受助人关系：</span>{{userRelation?userRelation:this.demandDetail.user_relation}}</li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex"
  export default {
    props: {
      demandDetail: '',
    },
    data(){
      return {
         userRelation:''
      }
    },
    computed:{
      ...mapState(['alljson'])
    },
    created(){
          this.alljson.recipients.map((item,index)=>{
          if(item.value == this.demandDetail.user_relation||item.name == this.demandDetail.user_relation){
            this.userRelation = item.name
          }
        })

    }
  }
</script>

<style scoped>
  /*需求拓展信息*/
  .info-exn {
    padding: 10px 15px
  }

  .info-exn ul li {
    padding: 5px 0
  }
</style>
