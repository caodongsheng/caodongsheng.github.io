<template>
    <div class="box1">
        <div class="header-wrap">
            <x-header :left-options="{backText: ''}">{{headerTitle}}
            <a slot="right" @click="toShare"></a></x-header>
        </div>
        <div class="box">
            <!-- 帮扶信息 -->
            <headInfo :info="list"></headInfo> 

            <!-- 需求详情 -->
            <demandDetails :vos="list"></demandDetails>

            <!-- 需求证明 -->
            <!-- <demandProve v-if="list.user_relation==12"></demandProve> -->
            <demandProve :paramsID='paramsID'></demandProve>
        </div>
    </div>
</template>
<script>
 import {Badge, Flexbox, XHeader, FlexboxItem, Grid, GridItem, GroupTitle, Tab, TabItem, XButton, Divider} from 'vux'
 import headerBackTitleShare from '../../../../components/header/headerBackTitleShare'
 import headInfo from './headInfo'
 import percent from './percent'
 import moneyUse from './moneyUse'
 import helpList from './helpList'
 import demandDetails from './demandDetails'
import demandProve from './demandProve'
export default {
    components: {
      headerBackTitleShare,
      XHeader,
      headInfo,
      percent,
      moneyUse,
      helpList,
      demandDetails,
      Badge,
      Flexbox,
      demandProve,
      FlexboxItem,
      Grid,
      GridItem,
      GroupTitle,
      Tab,
      TabItem,
      XButton,
      Divider,
    },
    data(){
        return {
            headerTitle: '爱心需求',
            list:{},
            paramsID: '' //需求详情id
        }
    },
    methods:{
         toShare(){
        this.$refs.sharea.toShare()
      }
    },
    created(){
        this.paramsID = this.$route.params.id;
    this.$http.post("hts/myDemand/detail", {
        demandId: this.$route.params.id
      })
      .then(res => {
          res.data.formattedImags = [];
          res.data.demand_imgs.forEach(item => {
                let img = {};
                img.src = item;
                res.data.formattedImags.push(img);
              });
          this.list = res.data;
      });
    }
}
</script>
<style lang="less" scoped>
.box1{
    height:100%;
    overflow-y:scroll;
}
    .box{
        height:100%;
        overflow-y:scroll;
    }
</style>
