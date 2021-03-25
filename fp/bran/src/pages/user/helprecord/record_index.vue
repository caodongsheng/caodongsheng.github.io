<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="goack">帮扶记录

    <a slot="right" class="color-orange f-16" @click="gotoOut" v-if="hbhShow">户帮户亲帮亲<!-- <i class="iconnavmore"></i> --></a>
    </x-header>

    <!--主体内容-->
    <div class="box-withheader over-auto">
      <!-- <calendar  v-model="date" :popup-header-title="titleshow? titleshow: datetiitle" :title="datetiitle" @on-hide="onChange" @on-change="getChangeData"  style="display: none"  ref="cal" position="top" disable-future></calendar> -->
      <div class="tab-tit">
        <tab :line-width="3" active-color='#ed6b2b' v-model="index" custom-bar-width="100px">
          <tab-item :selected="tag==item.url" v-for="(item, index) in taglist"  :key="index">
            <router-link :to="item.url" class="dis-block f-16"  replace>{{item.name}}</router-link>
          </tab-item>
        </tab>

      </div>

      <div class="tab-con bg-f6f5f6">
        <router-view v-on:refresh="refreshfun" v-on:infinite="infinitefun" ref="viewref" :date="date"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import {XHeader,Tab, TabItem,Calendar} from 'vux'
  import {mapActions} from "vuex";
  export default {
    name: "record",
    components: { XHeader,Tab, TabItem,Calendar},
    data(){
      return{
        fromapp:false,
        showPicker:false,
        placeholder:'',
        tag:"",
        hbhShow:false,
        dateList:[],
        taglist:[
          {
            name: '扶贫公募',
            url:"/record/zcrec"
          },
          {
            name: '资金帮扶',
            url: "/record/capital"
          },
          {
            name: '物品帮扶',
            url:"/record/goods"
          },
          {
            name: '项目对接',
            url:"/record/xmrec"
          }
        ],
        index:0,
        date:[],
        goodpage:1,
        capitalpage:1,
        datetiitle:'日期选择',
        displayFormat (value, type) {
          if (type === 'string') {
            return value
          } else {
            return value.length ? (value.length + ' days') : ''
          }
        }
      }
    },
    computed:{
    //   titleshow() {

    //     let result = this.dateCompare(this.date[0],this.date[1]);
    //     if (this.date.length === 2 && result === true) {
    //       return this.date[0] + '—' + this.date[1];
    //     }else if(this.date.length === 2 && result === false){
    //       return this.date[1] + '-' + this.date[0];
    //     }
    //     return '';
    //   }

    },
    created(){
        if(this.$route.query.hbh==1){
          this.hbhShow=true
        }else{
          this.hbhShow=false
        }
        if(this.$route.path == "/record/goods") {
            this.index = 2;
        }else if(this.$route.path == "/record/capital"){
            this.index = 1;
        }else if(this.$route.path == "/record/zcrec"){
            this.index = 0;
        }else{
            this.index = 3;
        }
   
    },
     mounted(){
      this.fromapp = this.$route.query.from&&this.$route.query.from=="app"
     },
    methods: {
      ...mapActions(["getCapitalListByDate","getGoodsListByDate"]),
      getCapitalListByDate(){
        this.$store.dispatch("getCapitalListByDate", this)

      },
      gotoOut(){
        this.$router.push('/hbh?id='+localStorage.userid)
      },
      infinitefun(){


        if(this.index ==1){
          this.goodpage++;
          //this.getGoodsListByDate()
        }
        else{
          this.capitalpage++;
          //this.getCapitalListByDate()
        }
      },
      refreshfun(){

        if(this.index ==1){
          this.goodpage = 1;
          //this.getGoodsListByDate()
        }
        else{
          this.capitalpage = 1;
          //this.getCapitalListByDate()
        }
      },
      getGoodsListByDate(){
        this.$store.dispatch("getGoodsListByDate",this)
      },
      dateshow(){
        this.$refs.cal.show = true;
        this.$refs.cal.position = "top"
      },
      goack(){
        this.ModuleNative('close','返回原生')
        // if(this.fromapp){
        // // window.history.go(-1)
        //   // window.myhome.windowfinish();
         
        // //  console.log(window.location.href)
        // }else{
        //     if (this.$route.query.flag == 1) {
        //       // window.myhome.windowfinish();
        //       this.ModuleNative('close','返回原生')

        //       // history.go(-5);
        //       return false;
        //     } else {
        //       this.$router.go(-1);
        //     }
        // }

      },
    //   onChange(){

    //     if(this.date.length>2){
    //       this.date = this.date.slice(this.date.length-2,this.date.length);
    //     }
    //   },
    //   getChangeData(){

    //       if(this.date.length>2){
    //       this.date = this.date.slice(this.date.length-2,this.date.length);
    //     }
    //     if(this.date.length == 1) {
    //         this.date[1] = this.date[0];
    //     }
    //     let firstTimeStr = new Date(this.date[0]).getTime();
    //     let lastTimeStr = new Date(this.date[1]).getTime();
    //     if(firstTimeStr > lastTimeStr) {
    //         let tempTime = null;
    //         tempTime = this.date[0];
    //         this.date[0] = this.date[1];
    //         this.date[1] = tempTime;
    //     }
    //     if(this.$route.path == '/record/capital'){
    //       this.$http.post('hts/record/capitals',{
    //         page: this.goodpage,
    //         start: this.date[0],
    //         end: this.date[1]
    //       })
    //         .then(res => {
    //           this.dateList = res.data.list;
    //         })
    //     }else{
    //       this.$http.post('hts/record/goodss',{
    //         page: this.goodpage,
    //         start: this.date[0],
    //         end: this.date[1]
    //       })
    //         .then(res => {

    //           this.dateList = res.data.list;
    //         })

    //     }


    //   },
      //比较用户选择的日期
      dateCompare(firstTime,lastTime){
        let firstTimeStr = new Date(firstTime).getTime();
        let lastTimeStr = new Date(lastTime).getTime();
        // return lastTime > firstTime
        if(firstTimeStr > lastTimeStr) {
            let tempTimeStr = null;
            tempTimeStr = firstTimeStr;
            firstTimeStr = lastTimeStr;
            lastTimeStr = tempTimeStr;
        }
      }

    },
    // beforeRouteEnter (to, from, next) {
    //   if(from.name == 'loveNeed'){
    //      next(vm => {
    //       // 通过 `vm` 访问组件实例
    //       vm.isFromLoveneed = true
    //     })
    //   }else{
    //     next()
    //   }
       
    // },
 
    watch: {
      '$route'(to, from) {
          if(this.date.length !== 0) {
                if(to.name==="capital"){
                    this.index = 2
                    this.capitalpage = 1;
                     this.getChangeData();
                }
                else{
                    this.goodpage = 1;
                    this.index = 1;
                    this.getChangeData();
                }
            }
        }
    }
  }
</script>


<style scoped >
  .tab-con{position: absolute;top:44px;bottom:0;overflow: auto;left:0;right:0}

    .iconnavmore{
      display: block;
      width: 10px;
      height: 8px;
      background: url("../../../assets/images/arrow.png" ) no-repeat;
      background-size: 100% auto;
      position: absolute;
      top:5px;
      right:-10px;
      -webkit-transform: rotate(30deg);



  }
</style>
