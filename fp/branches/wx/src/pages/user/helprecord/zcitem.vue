<template>
  <div class="helplist bg-ffffff mb-15">
    <div class="list-header clearfix">
      <badge text="众筹" class="f_r f-12 badge-orange"></badge>

      <!-- <img class="v-middle dis-inline bd-radius-cir"  :src= item.user_pic width="35" height="35"> -->
      <avatar :image="item.logo" :name="item.acr036" tsize="1" width="20" height="20"/>
      <span class="tit-nowrap color-666 f-12">{{item.acr036?item.acr036:'爱心人士'}}</span>
    </div>
    <div class="list-content bg-f6f5f6">
      <router-link :to= 'path' class="dis-block linkonly">
        <div class="flex-tab">
          <div class="flex-tab-cell tab-left">
            <img :src="item.acr065" width="60" height="60" style="object-fit:cover">
          </div>
          <div class="flex-tab-cell tab-right">
            <h1 class="color-333 f-13 tit-2row-nowrap" style="padding-top:3px;">{{item.title}}</h1>
            <p class="f-12 color-666">
              <span>目标金额 <em class="color-orange">{{item.planMoney}}</em> 元</span>
              <span>已筹集 <em  class="color-orange">{{item.alreadyMoney}}</em> 元</span>
            </p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="clearfix">
      <div class="list-info f_r">
        支持金额：<em class="color-orange">{{item.afq007}} 元</em>
      </div>
    </div>

    <div class="list-state clearfix" style="padding:6px;15px;">
      <span class="f_l color-orange f-12 qkl" @click="goQKL(item.blcurl)">扶贫区块链 项目链上地址</span>
      <a  class="f_r btn-bordered btn-bordered-orange f-12" @click="gocart(item)">&nbsp;&nbsp;&nbsp;证书&nbsp;&nbsp;&nbsp;</a><a class="f_r btn-bordered btn-bordered-gray f-12" @click="payhelp(item)">再次支持</a>
    </div>

  </div>
</template>
<script>
import { Badge } from 'vux'
import {getMinPic} from '../../../util/getMin'
import Avatar from '../../../components/util/avatar'
import open from '@/assets/js/openWin'
import {mapState} from 'vuex'
export default {
  props:{
    item:{
      type:Object,
    }
  },
  name: "capitalitem",
  components:{Badge,Avatar},
  data(){
    return{
      helpstatearr: [],
      path: '/zcrecdetail/' + this.item.afq005+'/'+this.item.acr001,
    }
  },
   computed:{
    ...mapState(['alljson'])
  },
  created(){
    this.helpstatearr = this.alljson.DemandStatusEnum
  },
  methods:{
      gocart(item){
          this.$router.push('/zccertificate/'+item.acr001+'/'+this.$store.state.user.nick_name+'/'+item.afq065+'/'+item.title)
      },
      payhelp(item){
          if (window.api && window.api.systemType == "ios") {
            console.log('这是ios的我要支持')
            api.openApp({
              iosUrl:
                this.H5PAY_URL+"/pages/index/payMoney.html?acr001="+item.acr001+'&acr002='+item.title+'&sum='+item.planMoney+'&token='+window.localStorage.getItem("token")+'&userid='+this.$store.state.user.id+'&login_name='+this.$store.state.user.login_name
                //sum    // acr002
            });
          } else if(window.api && window.api.systemType =="android") {
            console.log('这是安卓的我要支持');
            open(this.H5PAY_URL+"/pages/index/payMoney.html?acr001="+item.acr001+'&acr002='+item.title+'&sum='+item.planMoney+'&token='+window.localStorage.getItem("token")+'&userid='+this.$store.state.user.id+'&login_name='+this.$store.state.user.login_name, '确认支付').then(res => {
                return res
            })
          }else if(this.isWeixinCient()){
            console.log('这是微信的我要支持')
            this.$router.replace('/zchelphe/'+item.acr001+'/'+item.planMoney+'/'+item.title);
          }else{
            this.showToast('','text','请在app或微信内打开','20em','','')
          }
      },
      goQKL(data){
          if(this.isWeixinCient()){
              window.location.href=this.QKL_URL+data
          }else{
              console.log(this.QKL_URL+'/'+data)
              open(this.QKL_URL+'/'+data, '扶贫区块链').then(res => {
                  return res
              })
          }
      },
    helpsuccess(item){
      if(item.demandStatus===11){
        return true;
      }
      else return false;

    },
    helpstate(item){
     let oj =  this.helpstatearr.find((n) => n.code===item.demandStatus)
      return oj.value;
    },
    getclor (item) {
      switch (item.demandStatus) {
        case 3:
          return "color-green";
          break;
        case 7:
          return "color-blue";
          break;
        default:
          return "color-red";
          break;
      }
    },
    changetype(imgurl){
        return getMinPic(imgurl);
    }
  }
}
</script>

<style scoped>
.helplist:first-child{margin-top: 0}
.list-header{padding:10px 15px}
.list-content{padding:10px 15px}
.list-content .tab-left{width: 70px}
.list-content .tab-right{position: relative}
.list-content .tab-right h1{line-height: 100%;}
.list-content .tab-right p{position: absolute;bottom: 0}
.list-content .tab-right p span{padding-right: 10px;}
.list-info{padding: 8px 15px 8px}
.list-state{padding: 10px 15px;border-top:1px solid #eee}
.list-state .btn-bordered{margin-right: 10px}
.list-state .btn-bordered.btn-bordered-orange{margin-right: 0}
.list-header .vux-badge{margin-top:5px}
.list-state .payOff{color: #ed6b2b}
.qkl{
    border-radius: 15px;
    background: #f6f6f6;
    padding: 5px 10px;
    color: #1878cc;
}
</style>
