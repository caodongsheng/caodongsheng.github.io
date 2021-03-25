<template>
  <div class=" flex-tab linkonly  bg-ffffff">
    <div class="flex-tab-cell tab-left v-middle" style="width:55px">
      <avatar :name="personname" :image="personicon" width="45" height="45" ></avatar>
    </div>
    <div class="flex-tab-cell tab-right v-middle">
      <div class="top clearfix">
        <span class="f_l color-333 f-16 f-bold">{{personname}}</span>
        <template v-if="isPoor">
        <badge :text="userType"  class="f_l f-12 badge-red"></badge>
        </template>
        <span class="f_r color-333 f-16 f-bold">{{personphone}}</span>
      </div>
      <p class="tit-nowrap color-999 f-14">{{personaddress}}</p>
    </div>
  </div>
</template>
<script>
import {Badge} from "vux"
import avatar from '../../../components/util/avatar'
 export default{
   components:{
     Badge,
     avatar
   },
   computed:{
     isPoor:function(){
       if(this.user_type!=0){
         return true;
       }
       return false;
     },
     userType:function(){
       switch(this.user_type){
         case 1:
           return "贫困"
           break;

         default:
           return "其他"
           break;
       }
     }

   },
   props:{
     personname:{
       type:String,
       default:""
     },
     personicon:{
       type:String,
       default:""
     },
     personaddress:{
       type:String,
       default:""
     },
     personphone:{
       type:String,
       default:""
     },
     user_type:{
       type:Number,
       default:0
     }
   }
 }
</script>
<style scoped>

.list-group .list-item {
  padding: 15px 40px 15px 15px;
  border-bottom: 1px solid #eee
}

.list-group .list-item:last-child {
  border-width: 0
}
.list-group .list-item p{padding-top: 6px}
.vux-badge{box-sizing: content-box;margin-left: 5px;margin-top:4px}

</style>
