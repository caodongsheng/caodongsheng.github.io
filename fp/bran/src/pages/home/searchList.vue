<template>
  <div>
    <!-- 头部搜索消息 -->
    <div class="index-wrap">
      <header>
        <div class="flex-tab">
          <div class="backBtn flex-tab-cell  tab-left">
            <span @click="backBtn"></span>
          </div>
          <div class="flex-tab-cell  tab-mid">
            <x-input title="" placeholder="搜索"  @on-enter="Submt()" v-model.trim="input" clearable>
              <i slot="label" class="fa fa-search" aria-hidden="true"></i>
            </x-input>
          </div>
          <div class="flex-tab-cell tab-right">
            <div class="top-msgtip">
              <em @click="Submt()">搜索</em>
            </div>
          </div>
        </div>
      </header>
    </div>
    <div class="resultlist bg-f6f6f6">
      <div class="selections">
        <selectTab ref="selectTab" :datas='selects' @getdatas="getdatas" :demandType="demandtype"></selectTab>
        <selectRegion :datas='selects2' @getdatas="getdatas"></selectRegion>
      </div>
      <div class="scrContent">
        <scroller
          v-if="searchList.length !== 0"
          :on-refresh="refresh"
          :on-infinite="infinite"
          refresh-layer-color="#4b8bf4"
          loading-layer-color="#ec4949">
          <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
            <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
          <slot>
            <ul>
              <li v-for="(item, index) in searchList" :key="index" class="mb-12 bg-ffffff" @click="toDetail(index)">
                <div class="userInfo dis-flex">
                  <!-- <avatar width="40" height="40"></avatar> -->
                  <!-- <img src="../../common/images/zmlb_head-.png" alt=""> -->
                  <!--头像-->
                  <div class="userpic flexnone">
                    <avatar :name="item.aideder_name" :image="item.user_pic" width="45" height="45" ></avatar>
                  </div>
                  <!--右侧信息-->
                  <div class="userName dis-flex-item color-333">
                    <div class="checkIcon clearfix dis-flex">
                      <span class="name f-15 tit-nowrap dis-flex-item">{{item.aideder_name}}</span>
                      <div class="clearfix flexnone">
                        <span class="f_r f-12 badge-orange" >{{getRelation(item.user_relation)}}</span>
                        <span class="f_r f-12 badge-orange" style="margin-right:3px">已审核</span>
                      </div>
                    </div>
                    <div class="address color-999">
                      <p class="f-13 text-justify"><i class="fa fa-map-marker color-999 f-16" ></i>{{item.region_name}}</p>
                    </div>
                  </div>
                </div>
                <div class="needs">
                  <span>我需要: &nbsp;</span><span style="color: orange">{{item.demand_title}}</span>
                </div>
                <div class="detailContent">
                  <p class="tit-3row-nowrap">{{item.demand_coment}}</p>
                </div>
                <div class="userPic" >
                  <div class="photos" v-for = "(items,index) in item.img" :key="index">
                    <img v-lazy="getmidpic(items)" alt="">
                  </div>
                </div>
                <div class="progressInfo clearfix" v-if="showProgress? item.demand_type == 1 : item.demand_type == 2">
                  <span class="f_r">{{Number(item.speed).toFixed() + '%'}}</span>
                  <x-progress :percent="item.speed" :show-cancel="false" class="probar"></x-progress>
                </div>
                <div class="helpDetail" v-if="item.demand_type == 2">
                  <span>目标金额:<label class="color-orange">{{item.target_amount}}</label>元</span>
                  <span>已帮扶:<label  class="color-orange">{{item.moneycount}}</label>元</span>
                  <span>支持人数:<label  class="color-orange">{{item.donatecount}}</label>人</span>
                </div>
              </li>
            </ul>
             <div class="hotSearch bg-ffffff" v-if="searchList.length>0&&searchList.length<3">
                <p style="padding: 12px 15px;text-align:center">抱歉，搜索结果较少<br>换个词试试</p>
                <h4>大家都在搜</h4>
                <div class="hotSearchCon">
                    <span  v-for="(item,index) in this.hotsearchList" :key="index" @click="hotClick(index)"><i class="tit-nowrap oversize">{{item.name}}</i></span>
                </div>
            </div>
          </slot>
          <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
        
        </scroller>
        
        <div v-if="flag == true && searchList.length == 0">
              <div class="nocontent f-14 color-999 text-center bg-f6f5f6" style="padding: 12px 15px">
        <img class="dis-block" src="../../../static/appimg/no-content.png" style="width:90px;margin:0 auto">
        <p style="padding-top: 10px">抱歉，未搜到相关需求，<br>为您推荐以下需求</p>
      </div>
       
              <div class="follow-list bg-ffffff mb-12" v-for="(item,index) in demandlist" :key="index">
              <div class="list-header clearfix">
                <badge text="众筹" v-if="item.userType===1" class="f_r f-12 badge-green"></badge>
                <badge text="打包" v-if="item.userType===2" class="f_r f-12 badge-red"></badge>
                <badge text="个人" v-if="item.userType===3" class="f_r f-12 badge-orange"></badge>
                <!-- <img class="v-middle bd-radius-cir dis-inline" :src="item.user_pic" width="30"> -->
                <avatar :image="item.user_pic" :name="item.aideder_name" tsize="1" width="28" height="28"/>
                <span class="tit-nowrap color-999 f-14" style="padding-left: 5px">{{item.aideder_name}}</span>
              </div>
              <div class="list-content" @click="todetail(item)">
                <!--主内容-->
                <div class="flex-tab">
                  <div class="flex-tab-cell tab-left linkonly">
                    <img v-lazy="getmidpic(item.img_url)" width="110" height="85">
                  </div>
                  <div class="flex-tab-cell tab-right">
                    <h1 class="color-333 f-15 tit-2row-nowrap">{{item.demand_title}}</h1>
                    <Progresss :proge="Number(item.speed)" style="margin:5px 0;" v-if="Number(Number(item.demand_type))!==1"></Progresss>

                    <p class="f-14 color-999" v-if="Number(item.demand_type) === 1">
                      <span>需求：<em class="color-orange">{{item.demand_title}}</em> </span>
                      <!--<span>已筹：<em class="color-orange">{{item.moneycount}}</em> 元</span>-->
                    </p>
                    <p class="f-14 color-999" v-if="Number(item.demand_type) === 2">
                      <span>目标：<em class="color-orange">{{item.target_amount}}</em> 元</span>
                      <span>已筹：<em class="color-orange">{{item.moneycount}}</em> 元</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
                </div>

                <!-- <div class="clearSearch">
                <span>清空历史搜索</span>
                </div> -->
            </div>
        </div>
      </div>
</template>
<script>
  import {XInput, Tab, TabItem, ViewBox,XProgress,XHeader} from 'vux'
  import selectTab from '@/components/select/selectTab'
  import scrolltemplate from "@/components/scroll/scrollcomponent"
  import avatar from '@/components/util/avatar'
 import Progresss from '@/components/prog/Progress'

  import selectRegion from '@/components/select/selectRegion'
  import STATUS_MAP_UI from "../work/myManagementNeeds/STATUS_MAP_UI";
  import { setTimeout } from 'timers';
  import {saveSearch} from '../../util/cache.js'
  import {mapState,mapActions} from 'vuex';
   import { getMidPic } from "@/util/getMid";

  export default {
    components: {XInput, Progresss,Tab, TabItem, ViewBox,selectTab,scrolltemplate, avatar,XProgress,selectRegion},
    name: 'searchList',
    data() {
      return {
        end: false,
        input: '',
        page: 1,
        demandlist:[],
        searchList: [],
        showProgress: false,
        demandStatus: '',
        demandtype: '5',
        helpCode: '',
        provinceId:'',
        flag: false,
        cityId:this.$store.state.city.id,
        sort: '',
        countryId:'',
        typeCode: '',
        totalPage: 0,
        selects: [
          {
            title: '综合排序',
            type: 2,
            typefor: 2,
            list_index: 0,
            list: ['综合排序', '即将完成']
          },
          {
            title: '类型',
            type: 2,  //是否下拉形式
            typefor: 3,  //下拉样式
            list_index: 0,
            list: []
          }
        ],
        selects2: [
          {
            title: '地域',
            type: 2,  // 是否下拉形式
            typefor: 1,  // 下拉样式
            list_index: -1, // 选中默认值
            demand: 0, // 0 需求 1 地域
            // parmas_id:[{id: "441622000000", regionName: "龙川县"}],    //筛选管理员需求，所需参数
            parmas_id:'',  //筛选地域时默认为空，全部地域搜索
            list: []  // tree数据，selecthttp.js 加载
          }
        ],
      }
    },
    methods: {        
      valideContent(){
      let pattern =    /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      this.input = this.input.replace(pattern, ''); 
    },
    // clearFun(){
    //   console.log('clearable11111111')
    //   this.input =''
    //   this.getSearchs()
    // },
      //获取tab
      getdatas(datas) {
        console.log(datas);
        let _this= this
        let codes = ['448071783933804544','448502271404146688','448502355504136192','448502411594563584'];
        this.searchList = [];
        this.page = 1;
        this.totalPage = 1;
        if(datas[0] == '即将完成'){
          this.sort = 1;
        }else{
          this.sort = 0;
        }
        // if(datas[1] == '全部'){
        //   this.typeCode = ''
        // }else if(datas[1] == '教育'){
        //   this.typeCode = codes[0];
        // }else if(datas[1] == '健康'||'医疗'){
        //   // 以防漏改有问题，现在就是健康，以前是医疗
        //   this.typeCode = codes[1];
        // }else if(datas[1] == '住房'){
        //   this.typeCode = codes[2];
        // }else if(datas[1] == '物品'){
        //   this.typeCode = codes[3];
        // }
        // if(datas[1] == '教育'){
        //   this.typeCode = codes[0];
        // }else if(datas[1] == '健康'||'医疗'){
        //   // 以防漏改有问题，现在就是健康，以前是医疗
        //   this.typeCode = codes[1];
        // }else if(datas[1] == '住房'){
        //   this.typeCode = codes[2];
        // }else if(datas[1] == '物品'){
        //   this.typeCode = codes[3];
        // }else if(datas[1] == '全部'){
        //   this.typeCode = ''
        // }
        // else if(data[1] == '自强'){
        //     this.typeCode == codes[4]
        // }
        if(datas[1].id){
          _this.cityId = datas[1].id;
        }else if(datas[1].regionNameIdname=='全国'){
          _this.cityId = ''
        }else{
          if(datas[1] == '全部'){
            _this.typeCode = ''
          }else if(datas[1] == '教育'){
            _this.typeCode = codes[0];
          }else if(datas[1] == '健康'|| datas[1] =='医疗'){
            // 以防漏改有问题，现在就是健康，以前是医疗
            _this.typeCode = codes[1];
          }else if(datas[1] == '住房'){
            _this.typeCode = codes[2];
          }else if(datas[1] == '物品'){
            _this.typeCode = codes[3];
          }
        }
      //  if( this.typeCode ==codes[3]&& this.sort == 1) return false;
        // else 
         this.getSearchs();
      },
      //点击搜索按钮的逻辑操作
      Submt() {
        //console.log(this.input);
        let searchCon = this.input;
        if(searchCon.replace(/(^\s*)|(\s*$)/g, "") !== ''){
          //如果用户输入不为空则保存到localStorage中并显示在历史搜索中
          saveSearch(searchCon);
           this.$router.replace({
                name: 'searchList',
                params: {
                    // con: this.hotWorldList[index].name
                    con: searchCon
                }
            })
         
           this.page = 1;
          this.totalPage = 1;
          this.searchList = [];
          this.getSearchs();
        }
        else{
          this.showToast('','text','搜索内容不能为空！','20em','','middle')
        }
      },
        hotClick(index) {
           this.input = this.hotsearchList[index].name
             saveSearch(this.hotsearchList[index].name);
            this.$router.replace({
                name: 'searchList',
                params: {
                    // con: this.hotWorldList[index].name
                    con: this.hotsearchList[index].name
                }
            })
          this.page = 1;
          this.totalPage = 1;
          this.searchList = [];
          this.getSearchs();
            //this.$router.push('/searchList'+this.hotWorldList[index].name);
        },
      backBtn() {
        if(localStorage.getItem('path') == 'appseach'){
          this.$router.replace('/searchRecoder?path=appseach')
        }else{
          this.$router.replace('/searchRecoder')
          
        }
      },
        getdemandList() {
        this.$http.post('hts/help/getConcrenDemand',{
          page: 1,
          pageSize:10,
          region_id: ""
        }).then(res => {
            this.demandlist = res.data.vos;
          
          })
      },
       todetail(item){
          if(localStorage.getItem('path')=='appseach'){
            this.$router.push("/loveNeed/"+item.id);
          }else{
            this.$router.replace("/loveNeed/"+item.id);
          }
      },
        getmidpic(imgurl){
    return getMidPic(imgurl)
    },
      getSearchs(done) {
        let self = this;
        this.$http.post('hts/help/searchDemand', {
          'page': this.page,
          'vague': this.input,
          'sort': this.sort,
          'help_type_code': this.typeCode,
          'region_id': this.cityId
        })
          .then(res => {
              console.log(res.msg)
            if(res.msg == '请求成功') {
              self.searchList = [...self.searchList,...res.data.vos];
              this.totalPage = res.data.totals;
             // this.getRelation();
              this.flag = true;
              if(this.flag==true&&self.searchList.length==0){
                this.getdemandList();
              }
            }
            if(done){
              done(true);
            }
          })
         
      },
      //上拉加载
      infinite(done) {
        // console.log('infinite-----------');
        setTimeout(() => {
          if(this.searchList.length<this.totalPage){
            this.page++;
            this.getSearchs(done);
          }else{
            done(true);
          }
        },1000)

      },
      //下拉刷新
      refresh(done) {
        // console.log('refresh-----');
        // this.page = 1;
        // this.searchList = [];
        // this.getSearchs();
        setTimeout(() => {
          this.searchList = [];
          this.page = 1;
          this.getSearchs();
          done();

        },1500)
      },
      //点击进入爱心需求详情页
      toDetail(index){
        let item = this.searchList[index];
        this.$router.push('/loveNeed/' + item.id);
      },
      //截取图片的url前缀
      // getImgurl(imgurl) {
      //     let path = imgurl.lastIndexOf('/');
      //     let firstname = imgurl.substr(0,path+1);
      //     return firstname;
      // },
      //请求数据
      getData() {
        this.$http.post('hts/help/searchDemand', {
          'page': this.page,
          'vague': this.input

        })
          .then(res => {

            this.searchList = res.data.vos;
          })

      },
       async getHotSearchList() {
           await this.$store.dispatch('getHotSearchList',this);
        },
      //获取类型下拉的帮扶列表
        getHelptypeList () {
          if(localStorage.getItem('path') != 'appseach'){
            this.$store.dispatch('getHelptypeList', this);
            
          }else{
            this.$store.dispatch('getHelptypeListAll', this);

          }
        },
        //获取是管理员代发还是个人求助
        getRelation(relationid) {
            
               if(relationid == '12') {
                 return '代发求助';
               }else  {
                return '个人求助'
               }
            


        }
    },
    created() {
       if(this.hotsearchList.length === 0){
            this.getHotSearchList();
        }
        this.getHelptypeList();
      //从searchRecode的输入框中点击搜索逻辑
      if(this.$route.params.con != undefined) {
        this.input = this.$route.params.con;
        //this.getData();
        this.getSearchs();
      }
      //点击热搜词进行搜索
      if(this.$route.params._idx != undefined){
        this.input = this.$route.params._idx;
        //this.getData();
        this.getSearchs();
      }
      //点击历史搜索记录进行搜索
      if(this.$route.params.idx != undefined) {
        let idx = this.$route.params.idx;
        let searchObj = JSON.parse(localStorage.getItem('_search_'));
        let con = searchObj[idx];
        this.input = con;
        this.getSearchs();
      }

    },
    mounted() {
    },
    watch: {
      // // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      // '$route': 'getParams'
    
       input(val) {
        this.$nextTick(() => {
          let pattern =    /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
          this.input = val.replace(pattern, ''); 
       
        })
      }

    },
    computed: {
        ...mapState(['helptypeList','alljson', 'hotsearchList'])
    }
  }
</script>
<style scoped>
  header .tab-right{width: 38px}
  .resultlist{
    position: absolute;
    top:62px;bottom:0;left:0;right:0;
  }
  /*搜索相关  */
  header .tab-mid .vux-x-input>>> .weui-icon {
    padding-right: 10px;
    padding-left: 5px;
  }
  header{
    border-bottom: 1px solid #e5e5e5;
  }
  header .tab-mid .weui-cell {
    padding: 0;
    height: 36px;
    line-height: 36px;
    background: #ededed;
    border-radius: 36px;
  }
  header .tab-mid i.fa {
    padding: 0 0 0 15px;
    color: #ccc;
  }
  header .tab-mid >>>input {
    height: 36px;
    /* line-height: 36px; */
    padding: 0 10px 0 10px;
    box-sizing: border-box;
  }
  header .backBtn{
    width: 30px;
    text-align: center;
  }
  .status >>> .status_item{
    flex: 0 0 20%;
  }
  .index-wrap header .top-msgtip{text-align: right;right:0}
  header .backBtn span{
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  header .backBtn span:before{
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid #333;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 12px;
    left: 7px;
  }
  .index-wrap header .top-msgtip em {
    font-size: 14px;
    color: #fd8b2a;
    line-height: 36px;
  }
  .selections{
    position: absolute;
    width: 100%;
    top: 0;
    display: flex;
    border-bottom: 1px solid #f6f6f6;
  }
  .scrContent{
    position: absolute;
    top: 40px;
    left:0;right:0;
    bottom: 0;
    overflow-y: auto;
  }
  .scrContent li{padding:15px}
  .scrContent .userInfo img{
    width: 40px;
    height: 40px;
  }
  .scrContent ul li{
    position: relative;
  }
  .scrContent li .userName{
    padding-left: 15px;
  }
  .userName .icon{
    line-height: 16px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    padding: 2px 5px;
    display: inline-block;
    text-align: center;
    border-radius: 2px;
  }
  .userName .checkIcon div span:nth-of-type(1){
    background: rgba(0, 128, 0, 0.788);
  }
  .userName span:nth-of-type(2){
    background: rgba(255, 166, 0, 0.897);
    margin-left: 10px;
  }
  .address{margin-top: 5px}
  .address .fa{
    padding-right: 6px;
  }
  .scrContent li .needs{
    color: #999;
    margin-top: 10px;
  }
  .scrContent li .detailContent{
    color: #999;
    margin-top: 10px;
  }
  .detailContent p{
    margin-bottom:10px;
    text-align: justify;
  }
  .scrContent li .userPic{
    display: flex;
    margin-top: 10px;
    flex-wrap:wrap;
    margin:-5px
  }
  .userPic *{box-sizing: border-box;}
  .userPic .photos{
    flex:0 0 33%;
    padding: 5px;
  }
  .userPic .photos img{
    width:100%;
    height: 100px;
  }
  .helpDetail {
    width: 100%;
    height: 24px;
    display: flex;
    /* padding-left: 14px; */
    margin-top: 15px;
    justify-content: space-between;
    color: #999;
  }
  .helpDetail span{
    display: inline-block;
  }
  .helpDetail span:first-child{align-items: start}
  .helpDetail span:last-child{align-items: end}
  .progressInfo{
    position: relative;
    padding: 15px 0 0  0;
  }
  .progressInfo .probar{
    width: 85%;
  }
  .progressInfo span{
    position: absolute;
    right: 0;
    top:5px;
  }
  .nomatch {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    color: rgb(236, 73, 73);
    line-height: 80px;
  }
.recomList{
    padding:0 15px;
    margin-top: 10px;
    /* padding: 0 16px 0 16px; */
}
 .recomList .recomsearch{
    height: 24px;
    color: #999;
    line-height: 24px;
}

.recomList h4{
  color: #999;
  font-weight: normal;
  margin-top: 10px;
  padding:0 15px;
  position: relative;
}

.list-header {
    padding: 10px 15px 0 15px
  }

  .list-content {
    padding: 10px 15px
  }

  .list-content .tab-left {
    width: 120px;
    height: 90px;
  }

  .list-content .tab-right {
    position: relative
  }

  .list-content .tab-right h1 {
    line-height: 130%;
  }

  .list-content .tab-right p {
    position: absolute;
    bottom: 0
  }

  .list-content .tab-right p span {
    padding-right: 10px;
  }

  .list-info .list-info-header {
    padding: 10px 15px 10px;
    border-bottom: 1px solid #eee
  }

  .list-info .list-info-content {
    padding: 10px 15px 10px;
    position: relative
  }

  .list-info-content ul li {
    padding: 4px 0
  }

  .list-state .btn-bordered {
    margin-right: 10px
  }

  .list-state .btn-bordered.btn-bordered-orange {
    margin-right: 0
  }

  .list-header .vux-badge {
    margin-top: 5px
  }
/*管理状态可用*/
  .follow-list {
    overflow: hidden
  }

  .follow-list.manager .list-header, .follow-list.manager .list-content {
    transform: translate(35px, 0px);
  }

  .follow-list .list-header, .follow-list .list-content {
    transition: all 0.5s
  }

  .checkicon {
    position: absolute;
    left: -25px;
    top: 50%;
    transform: translate(0, -50%);
  }

  .follow-list .list-content .checkicon {
    display: none
  }

  .follow-list.manager .list-content .checkicon {
    display: block
  }
  .hotSearch{

}
.hotSearch h4{
    color: #999;
    font-weight: normal;
    margin-top: 10px;
    padding:0 15px;
}
.hotSearch .hotSearchCon{
    padding:0 15px;
    margin-top: 10px;
    /* padding: 0 16px 0 16px; */
}
.hotSearchCon *{box-sizing: border-box}
.hotSearch  .hotSearchCon{
    margin:-5px;
    margin-top: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
}
.hotSearchCon span{
    display: inline-block;
    width: 33.333333%;
    padding:5px;
    text-align: center;
}
.hotSearchCon span i{
  padding: 0 10px;
  display: block;
  font-style: normal;
  height: 33px;
  background: #f6f6f6;
  line-height: 33px;
  border-radius: 5px;
}
</style>


