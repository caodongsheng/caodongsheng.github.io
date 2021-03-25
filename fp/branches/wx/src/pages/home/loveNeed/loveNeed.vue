<template>
  <!--https://www.cnblogs.com/yesyes/p/6689082.html-->
  <div class="loveNeed-wrapper">
    <!-- <x-header :left-options="{backText: ''}" title="爱心需求"> -->
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">爱心需求
      <a slot="right" @click="toShare" v-show="cansee"><i class="iconfont icon-f-share2 f-20"></i></a>
    </x-header>
    <share ref="sharea" :vos='vos'></share>
    <div class="loveNeed-container" :style="constainerHeight">
      <!--帮扶信息-->
      <headInfo :vos='voss'></headInfo>
      <div v-if="type==1" class="needTitle-container">
        <p class="needTitle">{{voss.demand_title}}</p>
        <p class="needClassify"><span v-if="voss.beforCateGory!=''">#{{voss.beforCateGory}}</span><span>#{{voss.demand_use}}</span></p>
      </div>
      <div v-else-if="type==2">
        <!--帮扶完成-->
        <percent :vos='voss'></percent>
        <!--资金用途-->
        <!-- <moneyUse :vos='voss'></moneyUse> -->
        <!--帮扶榜-->
        <helpList :paramsID='paramsID'></helpList>
      </div>
      <!--需求详情-->
      <demandDetails :vos='voss'></demandDetails>
      <!--需求证明-->
      <demandProve v-if="voss.demand_status==3" :paramsID='paramsID'></demandProve>
      <!--帮扶记录-爱心反馈-->
      <tab v-if="voss.demand_status==3 || voss.demand_status==6 || voss.demand_status==1" v-model="index" active-color="#F06B1B" custom-bar-width="50%">
        <!-- <tab-item :selected="demo1 === item" v-for="(item, index) in list2" @click="demo1 = item" :key="index">{{item}}</tab-item> -->
        <tab-item :selected="demo1 === item" v-for="(item, index) in list2" @click="demo1 = item" :key="index">{{item}}</tab-item>
      </tab>
      <Helprecord :paramsID='paramsID' :type='type' v-show="index === 0 && (voss.demand_status==3||voss.demand_status==6 ||voss.demand_status==1)"></Helprecord>
      <Feedback :paramsID='paramsID' v-show="index === 1 && (voss.demand_status==3 || voss.demand_status==6 || voss.demand_status==1)"></Feedback>
    </div>
    <!--Foot-->
    <demandFoot v-if="voss.demand_status==3" :vos='voss' :paramsID='paramsID' :concern='concern' :aideder_name="voss.aideder_name"></demandFoot>
    <div class="footer" v-if="voss.demand_status==6">该条爱心需求当前正处于待送出状态</div>
    <div class="footer" v-if="voss.demand_status==1">该条爱心需求当前正处于待审核状态</div>
  </div>
</template>

<script>
import { Tab, TabItem, XHeader } from 'vux'
import share from '@/components/share/share'
import percent from './percent'
import demandDetails from './demandDetails'
import demandProve from './demandProve'
import moneyUse from './moneyUse'
import headInfo from './headInfo'
import helpList from './helpList'
import demandFoot from './demandFoot'
import Feedback from './loveNeedCom/Feedback'
import Helprecord from './loveNeedCom/Helprecord'
import { mapActions, mapState } from 'vuex'
const list = () => ['帮扶记录', '爱心反馈']
export default {
  components: {
    headInfo,
    percent,
    demandDetails,
    demandProve,
    moneyUse,
    helpList,
    demandFoot,
    Tab,
    TabItem,
    Feedback,
    Helprecord,
    XHeader,
    share
  },
  data: function() {
    return {
      list2: list(),
      demo1: '帮扶记录',
      index: 0,
      paramsID: '', // 需求详情id
      type: '',
      concern: '', // 是否关注，0为未关注
      vos: {},
	  voss:{},
      cansee:true,
      routepath: '',
    }
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {
          if(from.path.indexOf('demand') != -1) {
              vm.routepath = from.path
          }else if(from.path.indexOf('searchList') != -1) {
              vm.routepath = from.path
          }else if(from.path.indexOf('searchRecoder') != -1) {
            if(localStorage.getItem('fromOddSystem')==1 ||localStorage.getItem('fromOddSystem'== '1')){
              vm.routepath = from.path
            }else{
              vm.routepath = '/recom'
            }
          }else {
              vm.routepath = '/recom'
          }
      })
      
  },
  methods: {
    ...mapActions(['getDynamicList']),
    getDynamicList() {
      this.$store.dispatch('getDynamicList', this)
    },
    // backToPre() {
    //     if(this.flag == true) {

    //     }
    // },
    
    toShare() {
      if (this.isWeixinCient()) {
        // let obj = {}
        // obj.title = `中国社会扶贫网，让爱在阳光下链接-${
        //   this.vos.region_name.indexOf('县') > 0
        //     ? this.vos.region_name.split('县')[0] + '县'
        //     : this.vos.region_name.split('市')[0] + '市'
        // }的需求${this.vos.demand_title}`
        // obj.desc = this.vos.demand_coment
        // obj.link = this.WinXinHost + '#' + location.href.split('#')[1]
        // obj.imgUrl = this.vos.imgUrl[0]
        // obj.demandId = this.vos.id

     
        alert('点击右上角"...",分享给朋友或朋友圈，让更多的人帮助TA')
      }else if(window.api){
        this.$refs.sharea.toShare()
      }
      else{
            this.showToast('', 'text', '网页上无法分享，请使用APP或微信')

      }
    },
    getUrlParam(name,noDecode) {
      var re = new RegExp('(?:\\?|#|&)' + name + '=([^&]*)(?:$|&|#)', 'i'),
        m = re.exec(location.href);
      var ret = m ? m[1] : '';
      return !noDecode ? decodeURIComponent(ret) : ret;
    },

    backToPre() {
      let _this = this
      if(localStorage.getItem('fromOddSystem') == '1'||localStorage.getItem('fromOddSystem') == 1){
        this.$router.go(-1)
        return
      }
      if(this.getUrlParam('unionid',false) =='1'||this.getUrlParam('unionid',false) ==1){
        //  个人中心帮扶记录跳转
        this.$router.go(-1)
        return
      }
      // console.log(window.location.search.startsWith("from="))
      // console.log(this.$route.query.id)

      if(window.location.search.startsWith("from=")){
      // if(getUrlParam("from",false) != ''&&getUrlParam("from",false) != undefined &&getUrlParam("from",false) != 'undefined'){
        if(_this.city.id!='' && _this.city.id !="undefined" &&_this.city.id !="null"&& _this.city.id !=undefined && _this.city.id != null){
          this.$router.replace('/recom?name='+_this.city.name+'&id='+_this.city.id+'&type='+_this.city.type+'&provinceName='+_this.city.provinceName+'&provinceArea='+_this.city.provinceArea+'&unionid=1')
          // window.location.href = process.env.WX_URL
          
        }else{
          window.location.href = process.env.WX_URL
        }
      }
      else{
        if(this.routepath.includes('recom')){
          if(_this.city.id!='' && _this.city.id !="undefined" &&_this.city.id !="null"&& _this.city.id !=undefined && _this.city.id != null){
            this.$router.replace('/recom?name='+_this.city.name+'&id='+_this.city.id+'&type='+_this.city.type+'&provinceName='+_this.city.provinceName+'&provinceArea='+_this.city.provinceArea+'&unionid=1')
            // window.location.href = process.env.WX_URL
            
          }else{
            window.location.href = process.env.WX_URL
          }
        }else{
          this.$router.replace(this.routepath+'?name='+_this.city.name+'&id='+_this.city.id+'&type='+_this.city.type+'&provinceName='+_this.city.provinceName+'&provinceArea='+_this.city.provinceArea+'&unionid=1')

        }
        // if(this.routepath.includes('recom')){
        // this.$router.replace('/recom?name='+_this.city.name+'&id='+_this.city.id+'&type='+_this.city.type+'&provinceName='+_this.city.provinceName+'&provinceArea='+_this.city.provinceArea+'&unionid=1')
        // }else{
        // if(localStorage.getItem('fromOddSystem') == '1'||localStorage.getItem('fromOddSystem') == 1){
        //   this.$router.go(-1)
        // }else{

          // this.$router.replace(this.routepath+'?name='+_this.city.name+'&id='+_this.city.id+'&type='+_this.city.type+'&provinceName='+_this.city.provinceName+'&provinceArea='+_this.city.provinceArea+'&unionid=1')

        // }
        // }
      }
    },
    getAllBangfuInfo() {
      this.paramsID = this.$route.params.id
      let _this = this
      let linkurl = _this.WinXinHost + 'from=#/loveNeed/'+this.$route.params.id+'/?name='+encodeURIComponent(_this.city.name)+'&id='+_this.city.id+'&type=1&provinceName='+encodeURIComponent(_this.city.provinceName)+'&provinceArea='+_this.city.provinceArea
      // let linkurl = _this.WinXinHost + '#' + location.href.split('#')[1]+ '?name='+encodeURIComponent(_this.city.name)+'&id='+_this.city.id+'&type=1&provinceName='+encodeURIComponent(_this.city.provinceName)+'&provinceArea='+_this.city.provinceArea
      this.$http
        .post('hts/help/detail', { demand_id: this.$route.params.id })
        .then(function(response) {

          _this.data = response.data
          _this.concern = response.data.concern
          _this.type = response.data.demand_type
          _this.voss= response.data
          _this.vos = {};

        _this.vos.title = `中国社会扶贫网，让爱在阳光下链接-${
         _this.voss.region_name.indexOf('县') > 0
            ? _this.voss.region_name.split('县')[0] + '县'
            :_this.voss.region_name.split('市')[0] + '市'
        }的需求${_this.voss.demand_title}`
        _this.vos.desc = _this.voss.demand_coment
        _this.vos.link = linkurl;
        _this.vos.imgUrl = _this.voss.imgUrl[0]
        _this.vos.demandId = _this.voss.id
          _this.cansee = true;
            if (_this.isWeixinCient()) {
           _this.setWeixinConfig(_this.vos)
            }
        })
        .catch(function(error) {
          _this.cansee = false;
          if(error.code === 'D2002') {
            _this.showToast('', 'text', '该需求已经不存在了。', '20em', 'middle')
            _this.$router.push('/')
          }
        })
    }
  },
  created() {
    this.getAllBangfuInfo()
    this.getDynamicList()
  },
  computed: {
    ...mapState(['dynamicList','city']),
    feedDetail: function() {
      return (this.feedList = this.$store.state.dynamicList)
    },
    constainerHeight:function(){
      if(this.voss.demand_status==3){
        return {
          bottom:'50px'
        }
      }
      else{
        return {
           bottom:'0px'
        }
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.loveNeed-wrapper {
  min-height: 100%;
  background-color: #FAFAFA;

  .needTitle-container {
    padding: 0 17px;
    margin-bottom: 10px;
    background: #fff;

    .needTitle {
      color: #333;
      font-size: 16px;
      font-weight:bold
    }

    .needClassify {
      padding: 12px 0;

      span {
        display: inline-block;
        margin-right: 20px;
        color: #F9A410;
        font-size: 13px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .loveNeed-container {
    -webkit-overflow-scrolling: touch;
    position: absolute;
    top: 47px;
     bottom: 50px;
    width: 100%;
    overflow: auto;
    margin-bottom: 10px;
  }
}

.vux-tab-wrap {
  height: 46px;
  padding-top: 0 !important;

  .vux-tab-container {
    position: relative;
    height: 46px;

    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 1px solid #E5E5E5;
    }

    .vux-tab {
      height: 46px;

      .vux-tab-item {
        font-size: 16px;
        color: #333;
        line-height: 46px;
      }
    }
  }
  
}
.footer{
      position: fixed;
 background-color:white;
 bottom:0;
      color:#f37306;
  }
</style>
