<template>
  <div>
    <ul class="listtype">
      <li v-for="(list,index) in  typeListImg">
        <img :src=list>
      </li>
    </ul>
  </div>
</template>

<script>
  import love from '../title_png/love.png'
  import ganbu from '../title_png/ganbu.png'
  import pinkun from '../title_png/pinkun.png'

  export default {
    name: "typeImg",
    props:{
      is_certification:{
        type:Number,
        default:null
      },//实名
      is_cadre:{
        type:Number,
        default:0
      },//扶贫干部
      is_poor:{
        type:Number,
        default:0
      }//贫苦户
    },
    computed:{
      typeListImg(){
        
        let arr = []
      if(this.is_cadre == 1 && this.is_poor == 0){
          arr.push(love)
         arr.push(ganbu)
        }else if(this.is_cadre == 0 && this.is_poor == 1){
           arr.push(love)
          arr.push(pinkun)
        }else if(this.is_cadre == 1 && this.is_poor == 1){
           arr.push(love)
          arr.push(ganbu,pinkun)
        }
        else{
           arr.push(love)
        }
        return arr
      }
    }
  }
</script>

<style scoped>
  .listtype{
    margin-top: 2px;
    width: 200px;
    overflow: scroll;
    display: flex;
  }
  .listtype li:not(:nth-child(1)){
    margin: 0 3px;
  }
  .listtype li img{
    height: 18px;
    width: auto;
  }
</style>
