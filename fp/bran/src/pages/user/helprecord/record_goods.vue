<template>
  <!-- <scrolltemplate :infinitefun="infinite" :end="end" :refreshfun="refresh" ref="myscroller"> -->
  <scroller
    v-if="list.length !== 0"
    :on-refresh="refresh"
    :on-infinite="infinite"
    refresh-layer-color="#4b8bf4"
    loading-layer-color="#ec4949">
    <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
      <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
    <slot>
      <div class="bg-f6f5f6">
        <div class="goodshelplist bg-ffffff mb-15"  v-for="(item,index) in goodshelplist" :key="index">
          <div class="list-header clearfix">
            <badge text="个人" v-if="item.userType===0" class="f_r f-12 badge-orange"></badge>
            <badge text="贫困户" v-if="item.userType===1" class="f_r f-12 badge-red"></badge>
            <!-- <img class="v-middle dis-inline bd-radius-cir f_l"  :src="item.user_pic" width="35" height="35" style="margin-top: 6px;margin-right:8px"> -->
            <avatar :image="item.user_pic" :name="item.user_name" tsize="1" width="30" height="30"/>
            <span class="tit-nowrap color-333 f-15">{{item.user_name}}</span>
            <span class="tit-nowrap color-999 f-13 dis-block" style="padding-top: 5px;"><i class="fa fa-map-marker" style="padding-right: 5px"></i>{{item.region_name}}</span>
          </div>
          <div class="list-content bg-f6f5f6">
            <router-link :to="'/goodsdetail'+ '/'+ item.id" class="dis-block linkonly">
              <div class="flex-tab">
                <div class="flex-tab-cell tab-left">
                  <img v-lazy="getmidpic(item.image)" width="70" height="70">
                </div>
                <div class="flex-tab-cell tab-right">
                  <h1 class="color-333 f-15 tit-nowrap">{{item.demand_title}}</h1>
                  <p  class="color-999 f-13 tit-2row-nowrap labelarea">
                    {{item.bf_detail}}
                    <!--<span class="list-label"  style="padding-right: 4px"><em class="f-14">{{item.bf_detail}}</em></span>-->
                  </p>
                </div>
              </div>
            </router-link>
          </div>
          <!--<div class="list-state clearfix" v-if="helpsuccess(item)">-->
            <!--<span class="f_l color-orange f-15" ></span>-->
            <!--<router-link to="" class="f_r btn-bordered btn-bordered-orange f-14">帮扶证书</router-link><router-link to="" class="f_r btn-bordered btn-bordered-gray f-14" @click="helpaglin()">再次帮扶</router-link>-->
          <!--</div>-->
          <div class="list-state clearfix">
            <template v-if="item.status == 1">
             <router-link :to="{name: 'helpHeWriteExp', params:{id: item.id,demandId: item.demend_code ,type:item.help_pattern}}" class="f_r btn-bordered btn-bordered-orange f-16">送出帮扶物</router-link>
            <router-link to="" class="f_r btn-bordered btn-bordered-gray f-16" @click.native="canclehelp(item)">取消帮扶</router-link>
            </template>
            <router-link
              v-if="item.status==2||item.status==3"
              to=""
              class="f_r btn-bordered btn-bordered-orange f-16" @click.native="gocartification(item)">帮扶证书
            </router-link>
            <span class="f_l  f-15" :class="getclor(item)">{{helpstate(item)}}</span>
          </div>
        </div>
      </div>
    </slot>
      <div v-transfer-dom>
      <confirm v-model="showconfirm" title="" confirm-text="继续捐赠" cancel-text="取消捐赠" @on-cancel="cancelDonate" @on-confirm="continueDonate">
        <p style="text-align:center;">此时返回，之前填写的捐赠信息将被删除，建议您继续完成编辑</p>
      </confirm>
    </div>
    <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
      <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
  </scroller>
   <div  v-else class="nocontent f-14 color-999 text-center bg-f6f5f6" style="padding: 182px 15px">
        <img class="dis-block" src="../../../../static/appimg/no-content.png" style="width:90px;margin:0 auto">
        <p  v-if="ajax" style="padding-top: 10px">抱歉，您还没有物品帮扶记录~</p>
      </div>
     
</template>

<script>
  import { Badge ,TransferDom, Confirm} from 'vux';
  import {mapActions,mapState} from "vuex";
  import scrolltemplate from "@/components/scroll/scrollcomponent"
  import Avatar from '../../../components/util/avatar'
 import { getMidPic } from "@/util/getMid";

  export default {
    props:["datelist","date"],
    name: 'record_goods',
    components: { Badge,scrolltemplate,Avatar, Confirm},
    data(){
      return {
        end:false,
        list:[],
        helpstatearr: ['待认领','待送出','已送出','帮扶成功','已关闭'],
        totals:0,
        page: 1,
        postadata:{},
        cancleitem:null,
        showconfirm:false,
        ajax:false,
      }
    },
     directives: {
      TransferDom
    },
    created() {
      this.ajax=false
      this.getGoodsList();
    },
    computed:{
      ...mapState(['alljson']),
      goodshelplist(){
        if(this.date.length !== 0) {
          return this.datelist;
        }
        return  this.list
      },
      nickName () {
        if (this.$store.state.user.realname) {
          return this.$store.state.user.realname
        } else {
          return this.$store.state.user.nick_name
        }
      }
    },
    methods: {
       getmidpic(imgurl){
    return getMidPic(imgurl)
    },
      canclehelp(item){
      this.showconfirm = true;
      this.cancleitem = item
      },
      gocartification (item) {
        this.$router.push({name:'certificate',query:{to: item.user_name,target:item.demand_title,user:this.nickName,crtime:item.contribute_time}});
        // this.postadata.type = 0
        // this.postadata.povertyCode = this.$route.params.id
        // this.$store.dispatch('getCertificate', this)
      },
      getGoodsList(done) {
        this.ajax=false
        this.$http.post('hts/record/goodss',{page: this.page})
          .then(res => {
            this.list = [...this.list,...res.data.list];
            this.totals = res.data.total;
            if(done) {
              done(true);
            }
            this.ajax=true
          }).catch(err => {
            this.ajax=true  
        })
         
      },
      infinite(done) {
        setTimeout (() => {
          if(this.list.length < this.totals){
            this.page++;
            this.getGoodsList(done);
          } else {
            done(true);
          }
        },1000)
      },
      refresh(done) {
        setTimeout(() => {
          this.list = [];
          this.page = 1;
          this.getGoodsList();
          done(true);
        },1000)
      },
      getclor(item){
        switch(item.status){
          case 2:
            return "color-green";
            break;
          case 1:
            return  "color-blue";
            break;
          default:
            return  "color-red";
            break;
        }
      },
       cancelDonate() {
           this.$http.post('hts/record/close',{
                 'id': this.cancleitem.id
             }).then(res => {
                 this.showToast('','text','取消帮扶成功','20em','','middle');
                 this.$router.push({name: 'loveNeed', params:{id: this.cancleitem.demend_code}});
             })
      },
      continueDonate(){
          this.showconfirm = false;
          this.cancleitem = null
      },
      helpsuccess(item){
        if(item.status=== 3){
          return true;
        }
        else return false;

      },
      helpstate:function(item){
        let oj =  this.helpstatearr.find((n) => n===item.status)
        return this.helpstatearr[item.status];
      }
    }
  }
</script>

<style scoped>
  .goodshelplist:first-child{margin-top: 0}
  .goodshelplist .list-header{padding:10px 15px}
  .goodshelplist  .list-content{padding:10px 15px}
  .goodshelplist  .list-content .tab-left{width: 80px}
  .goodshelplist  .list-content .tab-right{position: relative}
  .goodshelplist   .list-content .tab-right h1{line-height: 100%;}
  .goodshelplist   .list-content .tab-right p{position: absolute;bottom: 0}
  .goodshelplist   .list-content .tab-right p span{padding-right: 10px;}
  .goodshelplist  .list-state{padding: 10px 15px;border-top:0px solid #eee}
  .goodshelplist  .list-state .btn-bordered{margin-right: 10px}
  .goodshelplist  .list-state .btn-bordered.btn-bordered-orange{margin-right: 0}
  .goodshelplist  .list-header .vux-badge{margin-top:5px}

  /*标签部分 */
  .labelarea{margin:6px -4px 0 -4px}
  .labelarea .list-label{
    padding: 0px 2px;}
  .labelarea .list-label em{display: inline-block;background:#f5f6f6;color:#999;
    padding:2px 5px;border-radius: 3px;}

</style>
