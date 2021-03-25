<template>
    <div>
        <!-- 头部搜索消息 -->
        <div class="index-wrap">
            <header>
                <div class="flex-tab">
                  <div class="backBtn flex-tab-cell tab-left">
                    <span @click="backBtn"></span>
                  </div>
                    <div class="flex-tab-cell  tab-mid" style="height:30px;">
                        <x-input title="" placeholder= "搜索" @on-enter="Subm()" v-model.trim="searchtxt" @on-focus="handleinput()" ref="searchinput" style="height: 30px;top: 3px;" >
                            <i slot="label" class="fa fa-search" aria-hidden="true"></i>
                        </x-input>
                    </div>
                    <div class="flex-tab-cell tab-right">
                        <div class="top-msgtip">
                            <em @click="Subm()">搜索</em>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <div class="resultlist">
            <div class="hotSearch">
                <h4>大家都在搜</h4>
                <div class="hotSearchCon">
                    <span  v-for="(item,index) in hotsearchList" :key="index" @click="hotClick(index)"><i class="tit-nowrap oversize">{{item.name}}</i></span>
                </div>
            </div>
            <div class="historySearch" v-if="searchList.length>0">
                <div class="his-search">
                    <h4>历史搜索
                    <div class="clearSearch" v-show="showBtn">
                        <p class="clearBtn" @click="clearhis"><i class="iconfont icon-f-del color-orange f-14"></i> 清空历史搜索</p>
                    </div>
                    </h4>
                    <!-- <span class="hisDel f_r"></span> -->
                </div>
                <div class="his-searchCon" v-show="historyxs" style="padding-left:14px">
                    <!-- <span>瞳爱光明</span>  -->
                    <span v-for="(item,index) in searchList" :key="index" @click="tohis(index)"><i class="tit-nowrap">{{item}}</i></span>
                </div>

                <!-- <div class="clearSearch">
                <span>清空历史搜索</span>
                </div> -->
            </div>
              <div class="recomList" v-show="demandlist.length>0">
                <div class="recomsearch">
                    <h4>热门推荐                 
                    </h4>
                </div>
                <div class="his-searchCon"  style="padding-left:14px">
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
                    <Progresss :proge="Number(item.moneycount/item.target_amount*100)" style="margin:5px 0;" v-if="Number(Number(item.demand_type))!==1"></Progresss>

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
            <div v-transfer-dom>
                <confirm v-model="show"
                    :title = 'title'
                    :confirm-text = 'confirm'
                    :cancel-text = 'cancel'
                    @on-cancel = "onCancel"
                    @on-confirm = "onConfirm">
                </confirm>
            </div>
        </div>
    </div>
</template>
<script>
import {XInput,  Badge,Confirm,TransferDomDirective as TransferDom} from 'vux'
import { throws } from 'assert';
import {saveSearch} from '../../util/cache.js';
import storage from 'good-storage';
  import Avatar from '@/components/util/avatar'
  import Progresss from '@/components/prog/Progress'
import {mapState} from 'vuex';
 import { getMidPic } from "@/util/getMid";

export default {
    directives: {
        TransferDom
    },
    components: {XInput, Confirm,Badge ,Avatar,Progresss},
    data() {
        return {
            searchtxt: '',
            historyxs: true,
            searchList:[],
            title: '您确认删除全部历史记录?',
            confirm: '确认',
            cancel: '取消',
            show: false,
            demandlist:[],
            showBtn: false
        }
    },
    methods: {
         async getHotSearchList() {
           await this.$store.dispatch('getHotSearchList',this);
        },
         todetail(item){
           if(this.$route.query.path=='appseach'){
            this.$router.push("/loveNeed/"+item.id);
           }else{
            this.$router.replace("/loveNeed/"+item.id);
           }
      },
        Subm() {
           if(this.searchtxt.replace(/(^\s*)|(\s*$)/g, "") !== ''){ //搜索框不为空
               saveSearch(this.searchtxt)   //本地存储搜索的内容
                this.$router.replace({
                    name: 'searchList',
                    params: {
                        con: this.searchtxt
                    }
                });
               this.historyxs = false;
               this.searchtxt = '';
            }
            else{
              this.showToast('','text','搜索内容不能为空！','20em','','middle')
            }
        },
         getmidpic(imgurl){
    return getMidPic(imgurl)
    },
        handleinput() { //获取输入框焦点显示搜索历史记录
            //为避免重复先清空再添加
            // $('.his-searchCon').children('span').remove();
            this.searchList = '';
            let searches = storage.get('_search_');
            this.searchList.push(searches);
            // console.log(this.searchList);
            if(searches !== undefined) {
                this.historyxs = true;
            }
        },
        //点击热搜词到搜索页面并发送相应的下标值
        hotClick(index) {
            // console.log(this.hotWorldList[index].name);
            this.$router.replace({
                name: 'searchList',
                params: {
                    // con: this.hotWorldList[index].name
                    con: this.hotsearchList[index].name
                }
            })
            //this.$router.push('/searchList'+this.hotWorldList[index].name);
        },
        clearhis() {    //清空历史记录
            this.show = true;
            this.showBtn = false;
        },
        onCancel() {
            // console.log('取消了');
            this.show = false;
            this.showBtn = true;
            return;
        },
        onConfirm() {
            // console.log('确定了');
            storage.remove('_search_');
            this.searchList = '';
        },
        tohis(index) {

            this.$router.replace({
                name: 'searchList',
                params: {
                    con : JSON.parse(this.G('_search_'))[index]
                }
            })
        },
        backBtn() {
          if(localStorage.getItem('path')=="appseach"){
            // window.myhome.windowfinish()
            this.ModuleNative('close','返回原生')
          }else{
            this.$router.replace('/recom');
          }
        },
       async init(){
       // if(this.hotsearchList.length == 0){
          await  this.getHotSearchList();
       // }
         await this.getdemandList()
      
        //从localstorage中获取历史搜索记录并显示
        this.searchList = storage.get('_search_');
        // console.log(this.searchList);
        if(this.searchList !== undefined){
            this.showBtn = true;
        }else {
            this.showBtn = false;
        }
       
        },
        async getdemandList() {
          
        await  this.$http.post('hts/help/getConcrenDemand',{
          page: 1,
          pageSize:10,
          region_id: ""
        }).then(res => {
            this.demandlist = res.data.vos;
          
          })
      },
    },
    created() {
        this.init()
        if(this.$route.query.path=="appseach"){
          localStorage.setItem('path','appseach')
        }else{
          localStorage.setItem('path','')
        }
        
    },
    watch:{
          searchtxt(val) {
        this.$nextTick(() => {
          let pattern =    /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
          this.searchtxt = val.replace(pattern, ''); 
       
        })
      }
    },
    computed:{
        ...mapState(['hotsearchList']),
      //   getHotWord() {
      //       if(this.G('hotWord')) {
      //           return this.G('hotWord');
      //     }else {
      //       return '瞳爱光明'
      //   }
      // }
    },
    mounted() {
         this.$refs.searchinput.focus();
    }
}
</script>
<style scoped>
.resultlist{
  position: absolute;
  top:62px;bottom:0;left:0;right:0;
  overflow-y: auto;
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

header .tab-right{width: 38px}

header .backBtn{
  width: 30px;
  text-align: center;
}
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
.index-wrap header .top-msgtip{text-align: right;right:0}
.index-wrap header .top-msgtip em {
    font-size: 14px;
    color: #fd8b2a;
    line-height: 36px;
}
.hotSearch{

}
.hotSearch h4{
    color: #999;
    font-weight: normal;
    margin-top: 10px;
    padding:0 15px;
}
.hotSearch .hotSearchCon,.historySearch .his-searchCon,.recomList{
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
.his-searchCon *{box-sizing: border-box}
.his-searchCon{margin: -5px}
.historySearch{

}
.historySearch .his-search,.recomList .recomsearch{
    height: 24px;
    color: #999;
    line-height: 24px;
}
.historySearch .hisDel{
    width: 20px;
    height: 30px;
    background-image: url("../../common/images/icon-dele.png");
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 14px;
    background-position: 0 3px;
}
.historySearch h4,.recomList h4{
  color: #999;
  font-weight: normal;
  margin-top: 10px;
  padding:0 15px;
  position: relative;
}
.historySearch span{
  display: inline-block;
  width: 33.333333%;
  padding:5px;
  text-align: center;
}
.historySearch span i{
  padding: 0 10px;
  display: block;
  font-style: normal;
  height: 33px;
  background: #f6f6f6;
  line-height: 33px;
  border-radius: 5px;
}
.clearSearch {
 position: absolute;
  right:15px;top:0px;
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

  /*选中状态*/

  .vux-check-icon >>> .weui-icon-success:before, .vux-check-icon >>> .weui-icon-success-circle:before {
    color: #fd8b2a
  }

  /*显示底部全选*/
  .btm-checkall {
    padding: 13px;
    border-top: 1px solid #eee;
    box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.15);
  }
.oversize {
  max-width: 90px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}
  .btmopebtn {
    height: 53px;
    line-height: 53px;
    padding: 0 50px;
    background: #ff6902;
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0
  }
</style>
