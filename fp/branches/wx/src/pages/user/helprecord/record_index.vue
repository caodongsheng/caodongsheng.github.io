<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}"  @on-click-back="goack">帮扶记录
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
        showPicker:false,
        placeholder:'',
        tag:"",
        dateList:[],
        taglist:[
          {
            name: '资金帮扶',
            url: "/record/capital"
          },
          {
            name: '物品帮扶',
            // url: '/record/goods'
            url:"/record/goods"
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
        if(this.$route.query.cancelFoot==1||this.$route.query.cancelFoot=='1'){
          localStorage.setItem('cancelFoot',1)
        }else{
          localStorage.setItem('cancelFoot','')
        }
        if(this.$route.path == "/record/goods") {
            this.index = 1;
        }else if(this.$route.path == "/record/capital"){
            this.index = 0;
        }else{
            this.index = 2;
        }
    //   if(this.tag ==="/record/goods"){
    //     //this.getGoodsListByDate()
    //   }
    //   else{
    //     //this.getCapitalListByDate()
    //   }
    },
    // beforeRouteLeave(to,from,next){//离开组件的时候触发
    //   console.log(to,from)
    //   if(to.name == from.name){
    //     this.$router.go(-1)
    //   }else{
    //     //什么都不写的时候，不会离开(走下一步)
    //     next()
    //   }
    // },
    methods: {
      ...mapActions(["getCapitalListByDate","getGoodsListByDate"]),
      getCapitalListByDate(){
        this.$store.dispatch("getCapitalListByDate", this)

      },
      infinitefun(){
        this.tag = this.$store.state.routeurl;


        if(this.tag ==="/record/goods"){
          this.goodpage++;
          //this.getGoodsListByDate()
        }
        else{
          this.capitalpage++;
          //this.getCapitalListByDate()
        }
      },
      refreshfun(){
        this.tag = this.$store.state.routeurl;


        if(this.tag ==="/record/goods"){
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
      getUrlParam(name,noDecode) {
        var re = new RegExp('(?:\\?|#|&)' + name + '=([^&]*)(?:$|&|#)', 'i'),
          m = re.exec(location.href);
        var ret = m ? m[1] : '';
        return !noDecode ? decodeURIComponent(ret) : ret;
      },
      goack(){
        localStorage.setItem('cancelFoot',0)
        if(this.getUrlParam('unionid',false) == 1|| this.getUrlParam('unionid',false) == '1'){
          this.$router.go(-1)
        }else{
          this.$router.push("/user")
        }
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
    watch: {
      '$route'(to, from) {
          if(this.date.length !== 0) {
            //    this.$store.state.routeurl = to.path;
                if(to.name==="capital"){
                    this.capitalpage = 1;
                    //this.getCapitalListByDate()
                     this.getChangeData();
                }
                else{
                    this.goodpage = 1;
                    this.getChangeData();
                    //this.getGoodsListByDate()
                }
            }
        }
    }
  }
</script>


<style scoped>
  .tab-con{position: absolute;top:44px;bottom:0;overflow: auto;left:0;right:0}
</style>
