<template>
  <div class="select_tab">
    <div class="item" v-for="(item,index) in list" :key="index">
      <div :class="index==tab.index?'active':''" class="region-container" @click="Tactive">
        <span>{{names}}</span>
        <i></i>
      </div>
    </div>
    <transition name="move">
      <div class="opac" v-if="op_show">
        <div class="abs">
          <div class="examine">
            <div class="history" v-show='historyShow'>
              <div class="history_title">
                <icon type="waiting-circle" style="color:#ccc;font-size:20px"></icon>
                <span>历史记录</span>
              </div>
              <div class="hisory_cent">
                <span v-for="(et,index) in history_list" @click="goList(index,et.id,et.name,et.category_name)">{{ et.name }}</span>
              </div>
            </div>
            <div class="cent">
                <div class="lie1" :class="{'fourGrid':cityType == 1,'threeGrid':cityType == 2,'twoGrid':cityType == 3}">
                    <scroller refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949" class="posss">
                          <p :class="regionid==9999?'active':''" @click="reset($event)">{{city}}</p>
                          <p v-for="(item,index) in info" :key='index' @click='findIndex(cityType+1,item.id,item.regionName,index)' :class="regionid==index?'active':''">{{ item.regionName }}</p>
                    </scroller>
                </div>
              <div class="lie1 lie2" :class="{'fourGrid':cityType == 1,'threeGrid':cityType == 2,'twoGrid':cityType == 3}" v-show="regiont&&infocity.length>0">
                  <scroller refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949" class="posss">
                    <p :class="cityid==9999?'active':''" @click="all(2)">全部</p>
                    <p v-for="(item,index) in infocity" :key='index' @click="findIndex(3,item.id,item.regionName,index)" :class="cityid==index?'active':''">{{ item.regionName }}</p>
                  </scroller>
              </div>
              <div class="lie1 lie3" :class="{'fourGrid':cityType == 1,'threeGrid':cityType == 2,'twoGrid':cityType == 3}" v-show="regionf&&infotown.length>0">
                <!-- <p :class="townid==9999?'active':''" @click="all(3)">全部</p>
                <p v-for="(item,index) in infotown" :key='index' @click='findIndex(4,item.id,item.regionName,index)' :class="townid==index?'active':''">
                  {{ item.regionName }}
                  <x-icon type="ios-checkmark-empty" size="25" class="i"></x-icon></p> -->
                  <scroller refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949" class="posss">
                    <p :class="townid==9999?'active':''" @click="all(3)">全部</p>
                    <p v-for="(item,index) in infotown" :key='index' @click='findIndex(4,item.id,item.regionName,index)' :class="townid==index?'active':''">{{ item.regionName }}</p>
                </scroller>
              </div>
              <div class="lie1 lie4" :class="{'fourGrid':cityType == 1,'threeGrid':cityType == 2,'twoGrid':cityType == 3}" v-show="regionc&&infocounty.length>0">
                  <scroller refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949" class="posss">
                    <p :class="countyid==9999?'active':''" @click="all(4)">全部</p>
                    <p v-for="(item,index) in infocounty" :key='index' @click='findIndex(5,item.id,item.regionName,index)' :class="countyid==index?'active':''">{{ item.regionName }}<x-icon type="ios-checkmark-empty" size="25" class="i"></x-icon></p>
                </scroller>
              </div>
            </div>
            <div class="btns">
              <div @click="reset">重置</div>
              <div class="sucess" @click='success'>完成</div>
            </div>
          </div>
        </div>
        <div class="end" @click="end"></div>
      </div>
    </transition >
  </div>
</template>
<script>
  import {get_type_list,get_status_list} from './selectHttp'
  import {Icon} from 'vux'
  export default {
    components:{
      Icon
    },
    props:['datas'],
    data () {
      return {
        names:"地域",
        city:this.$store.state.city.name,
        cityType:this.$store.state.city.type,
        regionid:9999,
        cityid:9999,
        townid:9999,
        countyid:9999,
        list:this.datas,
        tab:{
          index:'1'
        },
        active:'',
        op_show:false,
        historyShow:false,//历史记录元素是否显示
        history_list:[],    //历史记录数据
        info:[],         //省数据
        infocity:[],     //市数据
        infotown:[],     //县数据
        infocounty:[],   //乡数据
        needList:[],   //历史记录
        chosee:{},        //筛选需要数据
        regionNameIdindex:'',//区划id
        regionNameIdname:'',  //区划名
        regiont:false,    //市box是否显示
        regionf:false,       //县box是否显示
        regionc:false,       //乡box是否显示
        historyId:'',
        historyIdName:'',
        historyIdcity:'',
        historyIdcityName:'',
        historyIdtown:'',
        historyIdtownName:'',
        historyIdcounty:'',
        historyIdcountyName:'',
        category_name:''
      }
    },
    computed: {
      listenshowpage1() {
        return this.$store.state.indexId;
      }
    },
    watch: {
      listenshowpage1(a, b) {
        if(a === 8){
          this.end();
        }
      },
      '$route' (to, from) {
        if(to.fullPath === '/city'){
          this.end();
        }
      }
    },
    methods :{
      all (index) {
        if(index ===  2){
          // 选择第二列得全部
          this.regionNameIdindex = this.historyId;
          this.regionNameIdname = this.historyIdName;
          this.cityid = 9999;
          this.townid = 9999;
          this.infotown=[];
          this.infocounty = [];
          this.regionf= false;
        }else if(index === 3){
          // 选择第三列得全部
          this.regionNameIdindex = this.historyIdcity;
          this.regionNameIdname = this.historyIdcityName;
          this.townid = 9999;
          this.infocounty = [];
        }else if(index === 4){
          // 选择第si列得全部
          this.regionNameIdindex = this.historyIdcounty;
          this.regionNameIdname = this.historyIdcountyName;
          this.countyid = 9999;
        }
      },
      end () {
        this.tab.index = '1';
        this.op_show = false;
      },
      Tactive () {
        if(this.tab.index=== '1'){
          this.tab.index = '0'
          this.op_show = true;
          this.getProvince();
          this.history();
        }else{
          this.end()
        }
      },
      quyuName(arr){
        for(let i in arr){
          this.names = arr[i].regionNameIdname
        }
      },
      getProvince() {

        let self = this;
        this.$store.state.indexId = 2;
        console.log("parmas_id",self.list[0].parmas_id)
        if(self.list[0].parmas_id === ''){
          // 传进来得就是""，选择省市值时parmas_id得值改变
          var stateList
          if(self.cityType == 1){
            stateList = self.$store.state.provincelist;
          }else if(self.cityType == 2){
            stateList = self.$store.state.citylist
          }else if(self.cityType == 3){
            stateList = self.$store.state.districtlist
          }
          if(stateList){
            // vuex默认false,第二次进来从vuex中取值
            if(self.cityType == 1){
              self.info = self.$store.state.provincelist;
            }else if(self.cityType == 2){
              self.info = self.$store.state.citylist
            }else if(self.cityType == 3){
             self.info = self.$store.state.districtlist
            }
          }else{
            this.$store.dispatch("getRegionListById", {
              id: this.$store.state.city.id, type: this.cityType, callackfun: function () {
                if(self.cityType == 1){
                  self.info = self.$store.state.provincelist;
                }else if(self.cityType == 2){
                  self.info = self.$store.state.citylist
                }else if(self.cityType == 3){
                  self.info = self.$store.state.districtlist
                }
              }, nodatafun () {

              }
              , owner: self
            });
          }
          // end 获取省级数据
        }else{
          this.regionid = 9999;
          this.regionNameIdindex = '';
          this.regionNameIdname = '';
          if(typeof self.list[0].parmas_id == 'string'){
            this.$store.dispatch("getRegionListById", {
              id: this.$store.state.city.id, type: 1, callackfun: function () {
                self.info = self.$store.state.provincelist;
                // self.list[0].parmas_id = self.info
              }, nodatafun () {

              }
              , owner: self
            });
          }else if(typeof self.list[0].parmas_id == 'object'){
            self.infocity = [];
            this.infotown = [];
            this.infocounty = [];
            self.regionf = false;
            self.regiont = false;
            self.regionc = false;
            let objt = localStorage.getItem('city');
            objt = eval('(' + objt + ')');
            if(objt.type==1 && this.G('flag') == 1){
            // if((objt.name == "贵州省"|| objt.name == "江西省") && this.G('flag') == 1){
              this.$store.dispatch("getRegionListById", {
                id: this.$store.state.city.id, type: 1, callackfun: function () {
                  self.info = self.$store.state.provincelist;
                  // self.list[0].parmas_id = self.info
                  self.infocity = [];
                  self.infotown = [];
                  self.infocounty = [];
                }, nodatafun () {

                }
                , owner: self
              })

          // }else if((objt.name == "贵州省"|| objt.name == "江西省") && this.G('flag') == 2) {
          }else if(objt.type==1 && this.G('flag') == 2) {
              self.infocity = [];
              self.infotown = [];
              self.infocounty = [];
              self.regionf = false;
              self.regiont = false;
              self.regionc = false;
              self.info = self.list[0].parmas_id;
          }
          else{
              self.infocity = [];
              self.infotown = [];
              self.infocounty = [];
              self.regionf = false;
              self.regiont = false;
              self.regionc = false;
              self.info = self.list[0].parmas_id;
          }
        }
        }
      },
      findIndex (n,b,a,index) {
        let self = this;
        this.regionNameIdindex = b;
        this.regionNameIdname = a;
        if(n === 2){
          // 选择市级
          self.regionid = index;
          self.historyId = b;
          self.historyIdName = a;
          self.townid = 9999;
          self.cityid = 9999;
          self.countyid = 9999;
          self.regionf = false;
          self.regionc = false;
          self.regiont = true;
          self.infocity = [];
          self.infotown=[];
          self.infocounty=[];
          // self.infocity = self.$store.state.citylist;

          //end
        }else if(n===3){
          // 选择县级
          self.historyIdcity = b;
          self.historyIdcityName = a;
          if(self.cityType == 2){
            self.regionid = index;
          }else{
            self.cityid = index;
            self.townid = 9999;
          }
          self.regionf = true;
          self.regionc = false
          self.infotown = []
          // self.infotown = self.$store.state.districtlist;
          self.infocounty = []
          // end
        }else if(n===4){
          // 选择乡级
          if(self.cityType == 3){
            self.regionid = index;
          }else{
            self.countyid = 9999;
            self.townid = index;
          }
          self.historyIdtown = b;
          self.historyIdtownName = a;
          self.regionc = true;
          self.infocounty =[]
          // self.infocounty = self.$store.state.townlist
          // end
        }else if(n===5) {
          self.countyid = index;
          self.historyIdcounty = b;
          self.historyIdcountyName = a;
        }
        this.$store.dispatch("getRegionListById", {
          id: this.regionNameIdindex, type: n, callackfun: function () {;
            if(n===2){
              self.infocity = self.$store.state.citylist;
            }else if(n===3){
              self.infotown = self.$store.state.districtlist;
            }else if(n===4){
              self.infocounty = self.$store.state.townlist;
            }
          }, nodatafun: function () {

          }
          , owner: self
        });
      },
      success () {
        let self = this;
        if(self.regionNameIdindex){
          if(localStorage.getItem('history')){
            self.needList = JSON.parse(localStorage.getItem('history'));
            for(let i=0;i<self.needList.length;i++){
              if(self.regionNameIdindex === self.needList[i].id){
                self.needList.splice(i,1);
              }
            }
            self.needList.unshift({'id':self.regionNameIdindex,'name':self.regionNameIdname,'category_name':"城市"})
            localStorage.setItem("history",JSON.stringify(self.needList));
          }else{
            self.needList.unshift({'id':self.regionNameIdindex,'name':self.regionNameIdname,'category_name':"城市"})
            localStorage.setItem("history",JSON.stringify(self.needList));
          }
          let state = "城市"
          this.chosee.id = self.regionNameIdindex;
          this.chosee.regionNameIdname = self.regionNameIdname;
          this.chosee.category_name="城市"
          let arr = []
          arr.push(state ,this.chosee)
          this.$emit('getdatas', arr);
          this.quyuName(arr)
          this.end();
        }else{
          this.end();
          this.names=this.$store.state.city.name
        }
      },
      history () {
        if(this.list[0].hisstoryisShow == true){
          if(localStorage.getItem('history')){
            this.historyShow = true;
            this.history_list = JSON.parse(localStorage.getItem('history'));
            for(let i=0;i<this.history_list.length;i++){
              if(this.history_list.length>6){
                this.history_list = this.history_list.slice(0,7);
              }
            }
          }else{
            this.historyShow = false;
          }
        }else{
          this.historyShow = false;
        }
      },
      goList (index,id,name,category_name) {
        this.regionNameIdindex = id;
        this.regionNameIdname = name;
        this.category_name=category_name
        this.chosee.id = this.regionNameIdindex;
        this.chosee.regionNameIdname = this.regionNameIdname;
        this.chosee.category_name=this.category_name
        let arr = []
        let state = "城市"
        arr.push(state ,this.chosee)
        this.$emit('getdatas', arr);
        this.quyuName(arr)
        this.end();
      },
      reset (e) {

          let state = "城市"
          this.chosee.id = this.$store.state.city.id;
          this.chosee.regionNameIdname = this.$store.state.city.name;
          this.chosee.category_name="城市"
          let arr = []
          arr.push(state ,this.chosee)
          this.$emit('getdatas', arr);
          this.quyuName(arr)
          this.end();
          this.regionNameIdindex = '';
          this.regionNameIdname = '';
          this.infotown = [];
          this.infocity = [];
          this.infocounty = [];
          this.regiont = false;
          this.regionf = false;
          this.regionc = false;
          this.regionid = 9999;
          this.getProvince();

      },
    },
    mounted (){
      console.log('执行执行');
      console.log(this.datas);
      console.log(this.datas[0].id);
      console.log(localStorage.getItem('city'));
      this.getProvince()
    },
    created(){
      this.op_show = false
    },
  }
</script>

<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .move-enter-active, .move-leave-active{
    transition: all 0.3s ease;
  }
  .move-enter, .move-leave-active{
    opacity: 0;
    transform: translateY(0px);
  }
  .move-enter, .move-leave-active .in{
    // transform: rotate(45deg)
    transform: translateY(-30px);
  }
  .select_tab{
    width: 95%;
    height: 39px;
    // border-bottom: 1px solid #e5e5e5;
    display: flex;
    box-sizing: border-box;
    z-index: 1000;
    background-color: #fff;
    top: 0;
    left:0;
    padding: 3px;
    line-height: 32px;
    padding-right: 15px;
    .item{
      flex: 1;
      text-align: center;
      font-size: 13px;
      color: #666666;
      .region-container{
        align-items: center;
        span{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      input{
        position: relative;
        top: 2px;
        right: 2px;
      }
      i{
        width:0;
        height:0;
        border-width:0 4px 4px;
        border-style:solid;
        border-color:transparent transparent #666666;/*透明 透明  灰*/
        position:relative;
        top: -10px;
        left: 10px;
      }
      .active i{
        border-width:4px 4px 0;
        top: 10px;
        border-color:#f37306 transparent transparent;/*灰 透明 透明 */
      }
      .active span{
        color:#f37306;
      }
    }
    .opac{
      width: 100vw;
      height: 100vh;
      background:rgba(0,0,0,.5);
      position: absolute;
      left: 0;
      top: 40px;
      z-index: 999;
      .abs{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        z-index: 1;
      }
      .end{
        width: 100%;
        height: 100%;
      }
    }
    .examine{
      width: 100%;
      height: auto;
      background: #fff;
      position: relative;
      padding-bottom: 47px;
      .history{
        width: 100%;
        height: auto;
        .history_title{
          font-size: 14px;
          padding: 5px 10px;
          box-sizing: border-box;
          color: #666;
        }
      }
      .hisory_cent{
        width: 100%;
        height: auto;
        padding: 0px 10px 5px;
        box-sizing: border-box;
        overflow: hidden;
        span{
          float:left;
          font-size: 12px;
          line-height: 12px;
          padding: 7px 7px;
          border-radius: 3px;
          margin-right: 10px;
          border: 1px solid #ccc;
          margin-bottom: 6px;
        }
      }
      .posss{
          position: static !important;
      }
      .cent{
        width: 100%;
        height:265px;
        overflow: hidden;
        .fourGrid{
          width: 25%;
        }
        .threeGrid{
          width: 33.3333%;
        }
        .twoGrid{
          width: 50%;
        }
        .lie1{
          // width: 25%;
          font-size: 14px;
          height: 265px;
          float: left;
          // overflow-y: scroll;
          overflow: hidden;
          -webkit-overflow-scrolling: touch;
          // overflow:scroll;
          // -webkit-overflow-scrolling:touch !important;
          // touch-action: pan-y !important;
          .gggg{
              min-height: 300px;
              height: auto;
          }
          p{
            width: 100%;
            height: 44px;
            line-height: 44px;
            box-sizing: border-box;
            padding-left: 15px;
            overflow: hidden;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:#666;
            font-size: 14px;
          }
          .active{
            background:#f7f9f8;
            color: #ed6b2b;
          }
        }

        .lie2,.lie3{
          // width: 25%;
          background:#f7f9f8;
          .active{
            background:#ededed;
          }
        }
        .lie4{
          // width: 25%;
          background:#ededed;
          p{
            position: relative;
            width: 100%;
            height: 44px;
            line-height: 44px;
            box-sizing: border-box;
            padding-left: 15px;
            padding-right:23px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .active{
            background:#f7f9f8;
            color: #ed6b2b;
          }
          .i{
            display: none;
            // float: right;
            // margin-right: 10px;
            // margin-top: 8px;
          }
          .active{
            .i{
              position: absolute;
              right: 0;
              top: 8px;
              display:inline-block;
              fill: #ed6b2b;
            }
          }
        }
      }
      .btns{
        height:45px;
        width: 100%;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        z-index: 1;
        box-shadow: 0 -5px 10px #e5e5e5;
        div{
          width: 50%;
          float:left;
          height: auto;
          line-height: 45px;
          text-align: center;
          color:#333
        }
        .sucess{
          background-color: #ed6b2b;
          color: #fff;
        }
      }
    }
    .item_cent{
      width: 100%;
      height: auto;
      background: #fff;
      padding: 3px;
      box-sizing: border-box;
      .li{
        width: 100%;
        height: 36px;
        font-size: 12px;
        /* padding:3px 20px;*/
        color: #666;
      }
      .active{
        color: #f37306;
      }
      .status{
        width: 100%;
        height: auto;
        display: flex;
        box-sizing: border-box;
        flex-wrap:wrap;
        padding: 10px 0 10px 20px;
        .status_item{
          margin-right: 21px;
          margin-bottom: 10px;
          font-size: 12px;
          color:#666;
          width: 91px;
          height: 26px;
          justify-content: center;
          text-align: center;
          line-height: 26px;
          border-radius: 3px;
          border: 1px solid #ccc;
        }
        .active{
          border: 1px solid #f37306;
          color: #f37306;
        }

      }

    }
  }
</style>
