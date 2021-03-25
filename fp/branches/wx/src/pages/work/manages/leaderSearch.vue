<template>
    <div>
        <x-header :left-options="{backText: ''}">
            扶贫干部查询
        </x-header>
        <div class="bg-f6f5f6">
            <!--搜索框-->
            <div class="search-white flex-tab">
                <!-- <x-input title="" placeholder="搜索" v-model="input" @on-enter="getData">
                    <i slot="label" class="fa fa-search" aria-hidden="true"></i>
                </x-input>
                <div>搜索</div> -->
                <div class="searchBox">
                    <x-input title="" placeholder="搜索" v-model="input" @on-enter="getData" @on-click-clear-icon="getDatas">
                        <i slot="label" class="fa fa-search" aria-hidden="true"></i>
                    </x-input>
                </div>
                <div class="tab-right search">
                    <div class="top-msgtip">
                        <em @click="getData()">搜索</em>
                    </div>
                </div>
            </div>
            <!-- 扶贫干部列表 -->
            <div class="searchResult">
                <div class="f-14 ser-resnum color-999">
                    <div class="searchTab">
                        <div>
                            <span class="color-999" >搜索结果:{{managerNums}}人</span></div>
                            <selectTab ref="selectTab" :datas='selects' @getdatas="getdatas" v-if="leaderLevel == 5? false: true"></selectTab>
                            <selectRegion :datas='selects2' @getdatas="getdatas"></selectRegion>
                        </div>  
                    </div>
                    <scroller
                    v-if="managerList.length !== 0"
                    :on-refresh="refresh"
                    :on-infinite="infinite"
                    refresh-layer-color="#4b8bf4"
                    loading-layer-color="#ec4949">
                    <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                    <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
                    <slot>
                        <div class="managers">
                            <ul>
                                <li v-for="(item,index) in managerList" :key="index">
                                    <div class="leaderCon">
                                        <avatar width="40" height="40" :image="item.user_pic" :name="item.realname"></avatar>
                                        <span>{{item.realname}}</span>
                                        <label>{{jibie[item.user_level-1]}}</label>
                                    </div>
                                    <div class="regionName">
                                        <p v-for="n in item.region">{{n.region_name}}</p>
                                    </div>
                                    <!-- <p class="reginName" v-for="i in item.region" :key="i.id">{{i.region_name}}</p> -->
                                    <p class="dailNum">
                                    <!-- <a href="'tel:' + item.mobile">{{item.mobile}}</a> -->
                                    <span>{{item.mobile}}</span>
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
                        <ul>
                            <li v-for="(item,index) in managerList" :key="index">
                                <div class="leaderCon">
                                    <avatar width="40" height="40" :image="item.user_pic" :name="item.realname"></avatar>
                                    <span>{{item.realname}}</span>
                                    <label>{{jibie[item.user_level-1]}}</label>
                                </div>
                                <div class="regionName">
                                    <p v-for="n in item.region">{{n.region_name}}</p>
                                </div>
                                <p class="dailNum">
                                    <a href="'tel:' + item.mobile">{{item.mobile}}</a>
                                </p>
                            </li>
                        </ul>  
                    </div>
                    <div class="nomatch" v-if="managerNums==0">
                        没有找到匹配的扶贫干部
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
    data() {
        return {
            page: 1,
            totalPage:0,
            end: false,
            detailShow: false,
            managerNums: '',
            jibie : ['省级', '市级', '县级' , '乡级','村级'],
            managerList: [],
            // searchList:[], //搜索结果
            input: '',
            level: '',
            provinceID: '',
            cityID: '',
            countryID:'',
            villageID:'',
            hamletID:'',
            leaderLevel: this.G('leaderLevel'),
            showdata:false,
            level_code: null,
            selects: [
                {
                    title: '管理员类型',
                    type: 2,
                    typefor: 3,
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
                    parmas_id:JSON.parse(localStorage.getItem('leaderId')),    //筛选管理员需求，所需参数
                    // parmas_id:'',  //筛选地域时默认为空，全部地域搜索
                    list: []  // tree数据，selecthttp.js 加载
                }
            ]
        }
    },
    methods: {
        getdatas(v) {
            console.log(v);
            let self = this;
            self.managerList =[];
            this.page =1;
            this.totalPage = 1;
            let managetype = ['全部','省级', '市级', '县级' , '乡级','村级'];
            if(v[1]){
                console.log(v[1].id);
                //获取用户在selectTab中的选择的值
                let types = v[0];
                this.cityID = v[1].id;
                for(let i =0 ; i < managetype.length; i++) {
                    if(managetype[i] ===  types){
                        this.level = i;
                    }
                }
                this.managerList = [];
                self.getManagers();
            }else if(v[0]){
                let types = v[0];
                for(let i =0 ; i < managetype.length; i++) {
                    if(managetype[i] ===  types){
                        this.level = i;
                        console.log(this.level);
                    }
                }
                self.getManagers();
            }
            
        },
        // getRegionData(v){
        //     self.managerList =[];
        //     this.page = 1;
        //     console.log(v.id);
        //     this.cityID = v.id;
        //     this.getManagers();
        // },
        getData() {
            //根据用户在搜索框中输入的内容如姓名等进行模糊查询并在页面中展示
            this.managerList = [];
            this.getManagers();
        },
        backToPre() {
                   this.$router.replace("/helpManage")
 
        },
        getDatas() {
            this.input = '';
             this.managerList = [];
            this.getManagers();
        },
        //获取扶贫干部列表
        getManagers(done) {
            let self = this;
            this.$http.post('hts/management/group', {
                'page': this.page,
                'level': this.level,
                'user_status': 1,
                'name': this.input,
                'keywords': this.cityID
            })
            .then(function(response) {
                self.managerNums = response.data.totals;
                self.managerList=[...self.managerList,...response.data.list];
                self.totalPage = response.data.totals;
                if(done){
                    done(true)
                }
            })
         
        },
        infinite(done) {
            setTimeout(()=>{
                if(this.managerList.length < this.totalPage){
                    this.page++;
                    this.getManagers(done);
                } else {
                    done(true)
                }
                
            },1500)
        },
        refresh(done) {
            setTimeout(()=>{
               this.managerList = [];
               this.page = 1;
               this.getManagers();
               done()
            },1500)

        },
    },
    created() {
        this.L('flag',2)
        this.getManagers();
    },
    watch: {
      // // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      // '$route': 'getParams'
    
       input(val) {
        this.$nextTick(() => {
          let pattern = /[^u4e00-u9fa5w]/g
          this.input = val.replace(pattern, ''); 
       
        })
      }

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
.search-white .searchBox{
    width: 80%;
}
.search-white .search{
    position: absolute;
    top: 20px;
    right: 40px;
}
.select_tab {
  justify-content: flex-end
}
.select_tab>>>.opac{top:45px!important}
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
    top: 110px;
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
    padding: 6px 0 0 80px;
    border-bottom: 1px solid #e5e5e5;
}
.managers li .leaderCon,.search-list li .leaderCon{
    position: relative;
    width: 246px;
    vertical-align: center;
    padding-left: 20px;
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
    line-height: 60xp;
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
    z-index: 90;
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
