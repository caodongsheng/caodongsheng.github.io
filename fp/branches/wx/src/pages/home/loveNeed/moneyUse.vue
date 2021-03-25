<!--suppress ALL -->
<template>
  <div>
    <!--资金用途-->
    <div class="funds-user">
      <h3 v-if="vos.cateList">资金用途-{{vos.cateList[0]}}</h3><!--<i class="fa fa-exclamation-circle fa-lg "></i>-->
      <!--<flexbox>-->
        <!--<flexbox-item v-for="(item,index) in vos.moneyUse" :key="index">-->
          <!--<div class="flex-demo"><p>{{Object.keys(item)[0]}}</p>-->
            <!--<p>{{Object.values(item)[0]}}元</p></div>-->
        <!--</flexbox-item>-->
      <!--</flexbox>-->
    </div>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem,} from 'vux'

  export default {
    props: ['vos'],
    components: {
      Flexbox,
      FlexboxItem
    },
    data() {
      return {
        noNULL: true,
        needName:''
      }
    },
    methods: {
  //     useNoNULL: (vos){
  //   if (vos.moneyUse.length == 0) {
  //     return false
  //   } else {
  //     return true
  //   }
  // },
  },
  created(){
     // this.needName = this.vos.cateList[0]
  },

  }
</script>

<style scoped>
  .funds-user {
    background: #fafafa;
    padding: 10px;
  }

  .funds-user h3 {
    text-align: center;
  }

  .funds-user i {
    padding-left: 5px;
    color: #feac5b;
  }

  .vux-flexbox {
    padding-top: 10px
  }

  .flex-demo {
    text-align: center;
    color: #fff;
    border: 3px solid #dddce2;
    border-radius: 4px;
    background-clip: padding-box;

  }

  .flex-demo p {
    width: 100%;
    color: #000000;
  }

</style>
