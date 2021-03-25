<template>
<div class="box_div">
  <headerBackTitle headerTitle="机构详情" class="top"></headerBackTitle>

  <!-- <div class="Interval-division"></div> -->

  <panel :list="list" ></panel>

  <!-- <div class="Interval-division"></div> -->

  <div class="dada">
      <flexbox class="rows" ref="ggg">
        <flexbox-item>
          <div class="rank-item text-center icon_position">
            <span class="f-11 color-999 dis-block">募集总善款/元<img src="../assets/images/icon_prom.png" height="47" width="47" alt="" class="icon_prom" @click="ishide"></span>
            <em class="color-orange  dis-block f-14 f-bold">{{org_data.raisemon}}</em>
            <div class="icon_white" v-show="icon">
              <p>其中<b>3050</b>万在项目于<b>2018</b>年<b>8</b>月<b>3</b>日上线前已捐赠到中国扶贫志愿服务促进会账户。</p>
              <i></i>
            </div>
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
            <span class="f-11 color-999 dis-block">共管理项目/个</span>
            <em class="color-orange  dis-block f-14 f-bold">{{org_data.titlnum}}</em>

          </div>
        </flexbox-item>
      </flexbox>
  </div>

<div class="Interval-division"></div>
  <!--tab-->
  <tab v-model="index" bar-active-color="#FF6A00" active-color="#FF6A00">
    <tab-item :selected="demo1 === item" v-for="(item, index) in list2" @on-item-click="demo1 = item" :key="index" :badge-label="item=='管理项目'?String(org_project_size):''" badge-background="#ccc" badge-color="#FF6A00">{{item}}</tab-item>
  </tab>
  <div v-show=" demo1=='机构简介'" class="detail" ref="scroll">
    <p class="p">{{org_detail.org_desc}}</p>
  </div>
  <div v-show=" demo1=='机构证书'" class="detail">
    <p>公开募捐资格证书</p>
    <img :src="org_detail.raise_certificate" alt="">
    <p>法人登记证</p>
    <img :src="org_detail.corporation_register_card" alt="">
    <p class="font">统一社会信用代码 </p>
    <p>{{org_detail.credit_code}}</p>
    <p class="font">银行账户 </p>
    <p>{{org_detail.bank_account}}</p>
  </div>
  <div v-show=" demo1=='管理项目'" class="detail ss" :style="{height:(height-17)+'px'}">
      <scroller
        v-if='org_parject_list.length !== 0'
        :on-refresh="refresh"
        :on-infinite="infinite"
        refresh-layer-color="#4b8bf4"
        loading-layer-color="#ec4949">
        <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
          <g stroke-width="7" stroke-linecap="round">
            <line x1="10" x2="10" y1="27.3836" y2="36.4931">
              <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
              <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
              <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate>
            </line>
            <line x1="24" x2="24" y1="18.6164" y2="45.3836">
              <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
              <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
              <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate>
            </line>
            <line x1="38" x2="38" y1="16.1233" y2="47.8767">
              <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
              <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
              <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate>
            </line>
            <line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
        <slot>
          <div class="" v-for="item in org_parject_list">
              <compentList :zcdata='item' :zcuserid="zcuserid" :zctoken='zctoken' :zcnickname="zcnickname"></compentList>
          </div>
        </slot>
        <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
          <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
      </scroller>
      <div v-if="org_parject_list.length == 0" class="nomatch">
        没有更多数据
      </div>
  </div>
</div>
</template>

<script>
  import { Panel, Tab, TabItem,  Swiper, SwiperItem } from 'vux'
  import headerBackTitle from '@/components/header/headerBackTitle'
  import compentList from '@/crowd_fund/compentList'
  const list = () => ['机构简介', '机构证书', '管理项目']
  export default {
    components: {
      headerBackTitle,
      Panel,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      compentList
    },
    data () {
      return {
          org_project_size:'0',
          org_data:{},//三个数
          org_user_id:'',//申请机构人的userid
          org_detail:{}, //详情数据
          org_parject_list:[],//项目列表
        list: [{
          src: './static/appimg/ylbf_logo.png',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '中国社会福利基金会',
          desc: '已在民政部门注册有公募资格的慈善机构<br> 联系电话：15468954926',
          // url: '/component/cell'
        }],
        // tab
        list2: list(),
        demo1: '机构简介',
        index: 0,
        height:0,
        icon:false
      }
   },
   methods:{
      ishide () {
        if(this.icon == false){
          this.icon = true
        }else{
          this.icon = false
        }
      },
       project_height(){

           this.height=window.innerHeight-(this.$refs.scroll.offsetTop)
           console.log('-----*********',this.height)
       },
       refresh(done){
           this.getfqList(done)
       },
       infinite(){
           console.log('到底了')
       },
       getfqList(done){
           let data={
               acr025:this.org_user_id,
               pageSize:10,
               pageIndex:0,
           }
           this.$https.post(this.BASE_URL+"cfs/ajaxpagequery/zc/z015/getfqList",data)
           .then(res => {
               this.org_parject_list = res.data.result.pageresult.data;
               this.org_project_size=res.data.result.pageresult.size;
               if(done){
                   done()
               }
           })
           .catch(function(err) {
               console.log(err);
           })
       },
       //上部份数据赋值
       org_detailFn(){
           this.list=[
               {
                   src: this.org_detail.organ_logo,
                   fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                   title: this.org_detail.org_name,
                   desc:  '已在民政部门注册有公募资格的慈善机构<br> 联系电话：'+this.org_detail.org_tel,
               }
           ]
       },
       //详情
       getDetailssss(){
           let data={
               id: this.org_user_id
           }
           this.$https.post(this.BASE_URL+"uts/organization/queryOrganizationInfo",
                this.qs.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }
            )
           .then(res => {
               this.org_detail = res.data.data;
               this.org_detailFn()
               console.log(res.data,'22222222222222222222');
           })
           .catch(function(err) {
               console.log(err);
           })
       },
       //三个数
       getgmxqList(){
           let data={
               afa115:this.org_user_id
           }
           this.$https.post(this.BASE_URL+"cfs/ajaxpagequery/zc/z015/getgmxqList",this.qs.stringify(data),
              {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                  }
              }
            )
           .then(res => {
               this.org_data = res.data.result.pageresult.data[0];
               console.log(res.data,'111111111111111111111122222222222');

           })
           .catch(function(err) {
               console.log(err);
           })
       },

   },
   computed:{

   },
   mounted(){
       this.org_user_id=this.$route.params.org_user_id
       this.zcnickname = this.$route.params.zcnickname
       this.zcuserid = this.$route.params.zcuserid
       this.zctoken = this.$route.params.zctoken
       console.log(this.zctoken,'qqqqqqqqqqqqq')
       this.project_height()
       this.getfqList()
       this.getgmxqList()
       this.getDetailssss();
   },
   destroyed(){

   }
 }
</script>

<style scoped >

.box_div{
    -webkit-overflow-scrolling: touch;
}
.icon_white{
  width: 200px;
  background: white;
  position: absolute;
  top: 34px;
  left: 12px;
  z-index: 999;
  padding: 16px 8px 8px 8px;
  font-size: 12px;
  border-radius: 20px;
  box-sizing: border-box;
  border:1px solid #ccc;
}
.icon_white i{
  width: 20px;
  height: 20px;
  background: white;
  display: inline-block;
  position: absolute;
  left: 75px;
  top: -7px;
  transform:rotate(45deg);
}
.icon_position{
  position: relative;
}
.icon_prom{
      width: 26px;
    height: 23px;
}
    .top{
        top: 0;
        left: 0;
        z-index: 99999;
        background: #fff;
        width: 100%;
        position: absolute;
    }
    .dada{
        background: #fff;
        padding-bottom: 5px;
    }
    .box_div{
        width: 100%;
        background: #fff;
        height: 100%;
        overflow: auto;
        padding-top:47px;
        /* padding-bottom: 60px; */
    }
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
    .detail{
        padding: 20px 10px 60px;

    }
    .ss{
        position: relative;
        overflow: hidden;
        box-sizing:border-box;
    }
    .detail p.p{
        text-indent: 20px;
    }
    .detail p.font{
        font-size: 12px;line-height: 20px;;
    }
    .detail img{
        width: 100%;
        border: 0;
        margin-top: 5px;
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
