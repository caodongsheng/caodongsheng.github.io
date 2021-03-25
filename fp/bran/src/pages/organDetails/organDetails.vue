<template>
<div>
  <headerBackTitle headerTitle="机构详情"></headerBackTitle>

  <!-- <div class="Interval-division"></div> -->

  <panel :list="list" ></panel>

  <!-- <div class="Interval-division"></div> -->

  <flexbox class="rows" ref="ggg">
    <flexbox-item>
      <div class="rank-item text-center">
        <span class="f-11 color-999 dis-block">募集总善款(万元)</span>
        <em class="color-orange  dis-block f-14 f-bold">{{org_data.raisemon}}</em>
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="rank-item text-center">
        <span class="f-11 color-999 dis-block">支持次数/次</span>
        <em class="color-orange  dis-block f-14 f-bold">{{org_data.raisepeo}}</em>
      </div>
    </flexbox-item>
    <flexbox-item>
      <div class="rank-item text-center">
        <span class="f-11 color-999 dis-block">共管理项目</span>
        <em class="color-orange  dis-block f-14 f-bold">{{org_data.titlnum}}</em>

      </div>
    </flexbox-item>
  </flexbox>

<div class="Interval-division"></div>
  <!--tab-->
  <tab v-model="index">
    <tab-item :selected="demo1 === item" v-for="(item, index) in list2" @click="demo1 = item" :key="index">{{item}}</tab-item>
  </tab>


  <div v-if="index === 0">
    000
  </div>
  <div v-if="index === 1">
    11111
  </div>
  <div v-if="index === 2">
    2222
  </div>
  <div v-if="index === 3">
    333
  </div>

</div>
</template>

<script>
  import { Panel, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
  import headerBackTitle from '../../components/header/headerBackTitle'
  const list = () => ['项目详情', '项目进展', '爱心反馈']
  export default {
    components: {
      headerBackTitle,
      Panel,
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem
    },
    data () {
      return {
          org_data:[],
        list: [{
          src: './static/appimg/ylbf_logo.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '中国社会福利基金会',
          desc: '已在民政部门注册有公募资格的公益机构<br> 联系电话：15468954926',
          url: '/component/cell'
        }],
        // tab
        list2: list(),
        demo1: '项目详情',
        index: 0
      }
   },
   methods:{
       getDetailssss(){
           let data={
               acr001:'5012',
               type:'0'
           }
           this.$http.post("cfs/zc/project/getLoadxmxx",data)
           .then(res => {
               this.data = res.data;
               console.log(res.data);
           })
           .catch(function(err) {
               console.log(err);
           })
       },
       getfqList(){
           let data={
               acr025:'26429073'
           }
           this.$https.post(this.BASE_URL+"/cfs/ajaxpagequery/zc/z015/getgmxqList",data)
           .then(res => {
               this.org_data = res.data.result.pageresult.data[0];
               console.log(res.data);
           })
           .catch(function(err) {
               console.log(err);
           })
       },

   },
   mounted(){
       this.getfqList()
   }
 }
</script>

<style scoped>
    .weui-panel{
        margin-top: 0;
    }
    .weui-panel:after{
        border-bottom:none;
    }
    .rows{
        width: 95%;
        margin: 0 auto;
        border-radius: 5px;
        background: #f5f5f5;
        margin-bottom: 15px;
    }
    .rank-item,.text-center em{
        margin-bottom: 10px;
    }
  .box {
    padding: 15px;
  }
  .active-6-1 {
    color: rgb(252, 55, 140) !important;
    border-color: rgb(252, 55, 140) !important;
  }
  .active-6-2 {
    color: #04be02 !important;
    border-color: #04be02 !important;
  }
  .active-6-3 {
    color: rgb(55, 174, 252) !important;
    border-color: rgb(55, 174, 252) !important;
  }
  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }

</style>
<style>
.weui-panel__bd .weui-media-box__bd p.weui-media-box__desc{
      line-height: 1.5;
}
</style>
