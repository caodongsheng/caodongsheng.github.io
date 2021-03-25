<template>
  <div class="helplist bg-ffffff mb-15">
    <div class="list-header clearfix">
      <badge text="众筹" v-if="item.userType===2" class="f_r f-12 badge-green"></badge>
      <badge text="贫困户" v-if="item.userType===1" class="f_r f-12 badge-red"></badge>
      <badge text="个人" v-if="item.userType===0" class="f_r f-12 badge-orange"></badge>
      <!-- <img class="v-middle dis-inline bd-radius-cir"  :src= item.user_pic width="35" height="35"> -->
      <avatar :image="item.user_pic" :name="item.user_name" tsize="1" width="30" height="30"/>
      <span class="tit-nowrap color-999 f-15">{{item.user_name}}</span>
      <span class="tit-nowrap color-999 f-13 dis-block" style="padding-top: 5px;"><i class="fa fa-map-marker" style="padding-right: 5px"></i>{{item.region_name}}</span>
    </div>
    <div class="list-content bg-f6f5f6">
      <router-link :to= "'/capitaldetail/' + item.id" class="dis-block linkonly">
        <div class="flex-tab">
          <div class="flex-tab-cell tab-left">
            <img v-lazy="getmidpic(item.image)" width="70" height="70">
          </div>
          <div class="flex-tab-cell tab-right">
            <h1 class="color-333 f-15 tit-nowrap">{{item.demand_title}}</h1>
            <p class="f-13 color-999">
              <span>目标：<em class="color-orange">{{item.targetMount}}</em> 元</span>
              <span>已筹：<em  class="color-orange">{{item.moneyCount}}</em> 元</span>
            </p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="clearfix">
      <div class="list-info f_l">
        <span class="f_r">{{item.contributeTime}}</span>
      </div>
      <div class="list-info f_r">
        帮扶金额：<em class="color-orange">{{item.paid_money}} 元</em>
      </div>
    </div>
    <div class="list-state clearfix">
      <span class="f_l color-orange f-15" >帮扶成功</span>
      <router-link to=""
        class="f_r btn-bordered btn-bordered-orange f-16" @click.native="gocartification(item)">帮扶证书
      </router-link>
      <router-link
        to=""
        @click.native="gotoHelphe(item)"
        class="f_r btn-bordered btn-bordered-gray f-16"
        v-if="item.demandStatus == 3">再次帮扶
      </router-link>
    </div>
  </div>
</template>
<script>
  import { Badge } from 'vux'
  import {getMinPic} from '../../../util/getMin'
  import Avatar from '../../../components/util/avatar'
 import { getMidPic } from "@/util/getMid";

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
        postadata: {},
        helpstatearr: [],
        //   path: '/capitaldetail/' + this.item.id
      }
    },
    computed:{
      ...mapState(['alljson']),
      nickName () {
        // return this.$store.state.user.nick_name
        if (this.$store.state.user.realname) {
          return this.$store.state.user.realname
        } else {
          return this.$store.state.user.nick_name
        }
      }
    },
    created(){
      this.helpstatearr = this.alljson.DemandStatusEnum
    },
    methods:{
       getmidpic(imgurl){
    return getMidPic(imgurl)
    },
      gotoHelphe(item){
          if (this.isios()) {
            let linkStr=process.env.PJ_URL +"payview/helphe.html?demand_code=" +
                item.demend_code+
                "&userid=" + localStorage.getItem("userid")+
                "&token=" + localStorage.getItem("token")+ "&payname=" +process.env.WX_MCHTYPE+"&jdomain=" +process.env.BASE_API+"&path="+this.$route.fullPath
             ;
            //  if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                  window.native.appLoadUrl(linkStr)
       }
       else{
       this.$router.push(
              "/helpHe/" + item.demend_code+ "/" + item.user_name
            );
       }
        // let linkStr=process.env.PJ_URL +"payview/helphe.html?demand_code=" +
        //         item.demend_code +
        //         "&userid=" +localStorage.getItem("userid")+
        //         "&token=" + localStorage.getItem("token")+"&path="+this.$route.fullPath
        //      ;
        //      if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        //           window.native.appLoadUrl(linkStr)
        //      }else{
        //          location.href =  linkStr
        //      }
        
      },
      gocartification (item) {
        this.$router.push({name:'certificate',query:{to: item.user_name,target:item.paid_money+"元",user:this.nickName,crtime:item.contribute_time}});

        // this.postadata.type = 0
        // this.postadata.povertyCode = this.$route.params.id
        // this.$store.dispatch('getCertificate', this)
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
  .list-content .tab-left{width: 80px}
  .list-content .tab-right{position: relative}
  .list-content .tab-right h1{line-height: 100%;}
  .list-content .tab-right p{position: absolute;bottom: 0}
  .list-content .tab-right p span{padding-right: 10px;}
  .list-info{padding: 10px 15px 10px}
  .list-state{padding: 10px 15px;border-top:1px solid #eee}
  .list-state .btn-bordered{margin-right: 10px}
  .list-state .btn-bordered.btn-bordered-orange{margin-right: 0}
  .list-header .vux-badge{margin-top:5px}
  .list-state .payOff{color: #ed6b2b}
</style>
