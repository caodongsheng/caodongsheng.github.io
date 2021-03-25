<template>
  <div class="helplist bg-ffffff mb-15">
    <div class="list-header clearfix">
      <!-- <badge text="众筹" class="f_r f-12 badge-orange"></badge> -->
      <!-- <img class="v-middle dis-inline bd-radius-cir"  :src= item.user_pic width="35" height="35"> -->
      <avatar :image="item.logo" :name="item.acr036" tsize="1" width="20" height="20"/>
      <span class="tit-nowrap color-666 f-12">{{item.acr036?item.acr036:'爱心人士'}}</span>
    </div>
    <div class="list-content bg-f6f5f6">
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
    </div>
    <div class="list-state clearfix" style="padding:12px;15px;">
      <div class="list-info f_l">
        支持金额：<em class="color-orange">{{item.afq007}} 元</em>
      </div>
      <a class="f_r btn-bordered btn-bordered-orange f-12" @click="gocart(item)">帮扶证书</a>
      <a class="f_r btn-bordered btn-bordered-gray f-12" @click="payhelp(item)">再次帮扶</a>
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
          window.location.href=process.env.WX_URL+'/pages/index/#/zccertificate/'+item.acr001+'/'+localStorage.nick_name+'/'+item.afq065+'/'+item.title
      },
      payhelp(item){
        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
           var jsonstr = ''+process.env.WX_URL+'/pages/index/#/zchelphe/'+item.acr001+'/'+item.acr014+'/'+encodeURIComponent(item.title)+'/'+localStorage.userid+'/'+localStorage.token+'/'+encodeURIComponent(localStorage.nickname)+'/null/null/null/'+encodeURIComponent(item.acr036);
           // 当前IOS版本号均大于1.8.2，取消判断，直接调用IOS新方法
           console.log(jsonstr)
           window.native.appLoadUrl(jsonstr)
        }else if(/(Android)/i.test(navigator.userAgent)){
          window.location.href=process.env.WX_URL+'/pages/index/#/zchelphe/'+item.acr001+'/'+item.acr014+'/'+encodeURIComponent(item.title)+'/'+localStorage.userid+'/'+localStorage.token+'/'+encodeURIComponent(localStorage.nickname)+'/null/null/null/'+encodeURIComponent(item.acr036)
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
.list-info{padding: 0 15px ;line-height: 26px;}
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
