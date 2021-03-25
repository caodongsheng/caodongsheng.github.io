<template>
  <div>
    <x-header :left-options="{backText: ''}">
      受助人管理
    </x-header>
    <div class="box-withheader  bg-f6f5f6">
      <!--搜索框-->
      <div class="search-white" style="padding: 12px 15px">
        <x-input title="" placeholder="搜索" v-model="input" v-on:input="getData">
          <i slot="label" class="fa fa-search" aria-hidden="true"></i>
        </x-input>
      </div>
      <!--受助人列表 -->
      <div class="searchResult">
        <div class="f-14 ser-resnum color-999">
          <div class="searchTab">
            <div><span class="color-666" style="padding-left: 10px">搜索结果:{{aidedNums}}人</span></div>
            <selectTab ref="selectTab" :datas='selects' @getdatas="getUsertype"></selectTab>
            <selectRegion :datas='selects2' @getdatas="getRegion"></selectRegion>
          </div>
          <transition name="slide-fade">
          </transition>
        </div>
        <scroller
          v-if="aidedList.length !== 0"
          :on-refresh="refresh"
          :on-infinite="infinite"
          refresh-layer-color="#4b8bf4"
          loading-layer-color="#ec4949">
          <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
            <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
          <slot>
            <div class="managers">
              <ul>
                <li v-for="(item2,index) in aidedList" :key="index" @click="_chooseOne(item2)">
                  <div class="leaderCon">
                    <avatar width="40" height="40" :image="item2.user_pic" :name="item2.aided_person_name"></avatar>
                    <span>{{item2.aided_person_name}}</span>
                    <label>{{aidedtype[item2.user_type]}}</label>
                  </div>
                  <div class="regionName">
                    <p>{{item2.region_name}}</p>
                  </div>
                  <!-- <p class="reginName" v-for="i in item.region" :key="i.id">{{i.region_name}}</p> -->
                  <p class="dailNum">
                    <!-- <a href="'tel:' + item.mobile">{{item.mobile}}</a> -->
                    <span>{{item2.aided_person_tel}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </slot>
          <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
        </scroller>
        <!-- </scroller> -->
        <div class="search-list" v-if="input !== ''">
          <ul v-if="aidedList.length !== 0">
            <li v-for="(item,index) in aidedList" :key="index" @click="_chooseOne(item)">
              <div class="leaderCon">
                <avatar width="40" height="40" :image="item.user_pic" :name="item.aided_person_name"></avatar>
                <span>{{item.aided_person_name}}</span>
                <label>{{aidedtype[item.user_type]}}</label>
              </div>
              <div class="regionName">
                <p>{{item.region_name}}</p>
              </div>
              <p class="dailNum">
                <span>{{item.aided_person_tel}}</span>
              </p>
            </li>
          </ul>
          <div v-else="" class="nomatch">
            很遗憾！没有找到匹配的受助人
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import selectTab from '@/components/select/selectTab'
  import avatar from '@/components/util/avatar'
  import selectRegion from '@/components/select/selectRegion';
  import VueScroller from 'vue-scroller'
  import {XHeader, Flexbox, FlexboxItem, XInput, Badge} from 'vux'
  import scrolltemplate from "@/components/scroll/scrollcomponent"
  import { setTimeout } from 'timers';

  export default {
    components: {
      XHeader,
      Flexbox,
      FlexboxItem,
      XInput,
      Badge,
      scrolltemplate,
      avatar,
      selectRegion,
      selectTab,
    },
    props: {
      onChoose: {
        type: Function
      }
    },
    watch:{
       input: function (val) {
          this.$nextTick(() => {
             let pattern =  /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
             this.input = val.replace(pattern,'')
          });
      }
    },
    data() {
      return {
        page: 1,
        end: false,
        detailShow: false,
        aidedNums: '',
        aidedList: [],
        aidedtype:['已实名','贫困户'],
        usertype: '',
        regionId:'',
        input: '',
        showdata:false,
        totalPage:0,
        selects: [
          {
            title: '受助人类型',
            type: 2,
            typefor: 2,
            list_index: 0,
            list: ['全部','贫困户','个人']
          }
        ],
        selects2: [
          {
            title: '地域',
            type: 2,  // 是否下拉形式
            typefor: 1,  // 下拉样式
            list_index: -1, // 选中默认值
            demand: 0, // 0 需求 1 地域
            // parmas_id:[{id: this.G('leaderId'), regionName: this.G('leaderRegionName')}],    //筛选管理员需求，所需参数
            parmas_id:'',  //筛选地域时默认为空，全部地域搜索
            list: []  // tree数据，selecthttp.js 加载
          }
        ]
      }
    },
    methods: {
       valideContent(){
      let pattern =  /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      this.input = this.input.replace(pattern, ''); 
    },
      getUsertype(type) {
        let managetype = ['个人','贫困户'];
        let types = type[0]
        if(types === '全部') {
          this.usertype = '';
        }
        for(let i =0 ; i < managetype.length; i++) {
          if(managetype[i] ===  types){
            this.usertype = i;
          }
        }
        this.aidedList = [];
        this.page = 1;
        this.getAideds();
      },
      getRegion(regionname) {
        this.regionId = regionname[1].id;
        this.aidedList = [];
        this.page = 1;
        this.getAideds();
      },
      getData(v) {
        //获取用户输入的内容
        this.input = v;
        //this.input = v;
        this.aidedList = [];
        this.getAideds();
      },
      //获取扶贫干部列表
      getAideds(done) {
        let self = this;
        this.$http.post('hts/poor/search', {
          'userType': this.usertype,
          'keyword': this.input,
          'countys': this.regionId,
        })
          .then(function(response) {
            self.aidedNums = response.data.total;
            self.aidedList=[...self.aidedList,...response.data.list];
            self.totalPage = response.data.total;
            if(done){
              done(true)
            }
          })
          .catch(function(err) {

          })
      },
      infinite(done) {
        setTimeout(()=>{
          // this.getAideds(done);
          if(this.aidedList.length < this.totalPage) {
            this.getAideds();
          }else {
            done(true);
          }

        },1500)
        done(true);
      },
      refresh(done) {
        setTimeout(()=>{
          this.aidedList = [];
          this.page = 1;
          this.getAideds();
          done()
        },1500)
      },
      _chooseOne(obj) {
        if(obj.userleavel === 2){
        this.$http.post('hts/demand/archivingCardAndAuthentication', {
              name: obj.aided_person_name,
              idCard: obj.idcard
            }).then(res => {
          if (res.code === "O3000") {
            this.showToast('', 'text', '身份证号输入有误','20em','','middle')
            this.idcard = ''
            return
          }
          if (res.code === "03011") {
            this.showToast('', 'text', '实名认证失败，请重新输入，您还有' + err.data + '次机会')
            this.aided_person_name = ''
            this.idcard = ''
            return
          }
          if (res.code === "03017") {
            this.showToast('', 'text', '实名认证超过日次数，请12个小时以后重试')
            this.aided_person_name = ''
            this.idcard = ''
            return
          }else {
            this.showToast('','text','实名认证失败','20em','','top');
          }
        })
        }else if(obj.userleavel === 1){

        }
        this.onChoose && this.onChoose(obj);
      }
    },
    created() {
      this.getAideds();
    },
    mounted() {
      // console.log(this.$refs.address.show);
    }
  }
</script>
<style scoped>
  /*搜索框*/
  .search-white >>> .weui-cell {
    border-radius: 5px
  }
  .select_tab {
    justify-content: flex-end
  }
  .select_tab>>>.opac{top:41px!important}
  /* .select_tab >>> .item {
    flex: 0 0 33% !important;
    font-size: 12px !important;
  }
  .searchTab .item_cent .status .status_item{
      flex:  0 0 30%;
  } */
  .searchResult{
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0px;
    width: 100%;
    /* overflow-y: auto; */
  }
  .searchResult .searchTab{
    position: relative;
    display: -webkit-flex;
    justify-content: space-around;
    width: 100%;
    height: 33px;
    line-height: 33px;
    padding: 3px 0;
    z-index: 100;
    background: #fff;
    border-bottom: 1px solid #fafafa;
  }
  .searchResult .select_tab{
    width: 33% !important;
    /* justify-content: space-around; */
    position: static !important;
    padding:1px!important
  }
  .searchResult .searchTab div{
    top: -1px;
    height: 33px;
    /* text-align: center; */
    color: #666;
    font-size: 14px !important;
  }
  .select_tab .opac{
    right: 0;
  }
  .searchResult .manageTypeCon,.localCon{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 40px;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    z-index: 10000;
  }
  .searchResult >>> .pull-to-refresh-layer{
    position: absolute!important;
    margin-top: -60px!important;
  }
  .address {
    position: absolute;
    z-index: 999999;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .search-list{
    position: absolute;
    width: 100%;
    height: 100%;
    background:#fff;
    /* z-index: 100; */
  }
  .weui-cell_access .weui-cell__ft:after {
    position: absolute !important;
    border: none !important;
  }
  .searchResult .localCon{
    background: #fff !important;
  }
  .select_tab .item_cent{
    display: -webkit-flex !important;
    display: flex !important;
    position: relative;
    z-index: 100;
  }
  .searchResult .select_tab .history_title{
    text-align: left!important;
  }
  .searchResult .searchTab div:last-child{
    right: 0px;
  }
  .managers{
    width: 100%;
    background:#fff;
    margin-top: 48px;
    font-size: 14px;
  }
  .managers ul li,.search-list ul li{
    position: relative;
    width: 100%;
    padding-top: 10px;
  }
  .managers li .regionName,.search-list li .regionName{
    color: #999;
    padding:0 10px 10px 60px;
    border-bottom: 1px solid #e5e5e5;
  }
  .managers li .leaderCon,.search-list li .leaderCon{
    position: relative;
    width: 246px;
    vertical-align: center;
    padding-left: 15px;
  }
  .managers li .dailNum,.search-list li .dailNum{
    position: absolute;
    right: 30px;
    top:16px;
    font-size: 16px;
    font-weight: 400;
  }
  .managers li .leaderCon span,.search-list li .leaderCon span{
    display: inline-block;
    width: 65px;
    text-align: justify;
    height: 21px;
    line-height: 21px;
    overflow: hidden;
    vertical-align:middle;
    font-size: 16px;
    font-weight: 600;
  }
  .managers li .leaderCon  label, .search-list li .leaderCon label{
    height: 20px;
    color: #fd8b2a;
    border: 1px solid #fd8b2a;
    border-radius: 3px;
    margin-left: 3px;
    line-height: 60px;
    padding: 0 5px;
    font-size: 12px;
  }
  .managers li div img{
    width: 60px;
    height: 60px;
    zoom: 0.65;
  }
  .nomatch{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    /* z-index: 90; */
    overflow: auto;
    background: #fff;
    text-align: center;
    color: #999;
    line-height: 60px;
  }
  .nodata{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 100px;
    bottom: 0;
    background: #f6f5f6;
    z-index: 100;
    text-align: center;
    color: rgb(236, 73, 73);
    line-height: 80px;
  }
</style>
