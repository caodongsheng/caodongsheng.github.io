<template>
  <div class="over-auto bg-f6f5f6" :class="isManager?'box-withbar':'box-withheader'">
    <!--v-if没有任何关注时显示无记录图片-->
    <slot>
      <div class="nocontent f-14 color-999 text-center bg-f6f5f6" style="padding: 12px 15px">
        <img class="dis-block" src="../../../../static/appimg/no-content.png" style="width:90px;margin:0 auto">
        <p style="padding-top: 10px">抱歉，您还没有关注记录，<br>为您推荐下面需要帮助的人</p>
      </div>
      <!--<p style="background: #3c7500;color:#fff">当前第{{page}}页 每页{{followinfo.pageSize}}条-->
      <!--共{{followinfo.pageCount}}页 共{{followinfo.totals}}条</p>-->
      <div style="position: absolute;left:0;right:0;top:170px;bottom:0">
        <!-- <scrolltemplate :infinitefun="infinitefun" :end="end" :refreshfun="refreshfun" ref="myscroller"> -->
        <scroller
          v-if="demandlist.length !== 0"
          :on-refresh="refresh"
          :on-infinite="infinite"
          refresh-layer-color="#4b8bf4"
          loading-layer-color="#ec4949">
          <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
            <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
          <slot>
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
                <!--管理选择-->
                <check-icon :value.sync="item.ischeck" class="checkicon"></check-icon>
                <!--主内容-->
                <div class="flex-tab">
                  <div class="flex-tab-cell tab-left linkonly">
                    <img :src="item.img_url" width="110" height="85">
                  </div>
                  <div class="flex-tab-cell tab-right">
                    <h1 class="color-333 f-15 tit-2row-nowrap">{{item.demand_title}}</h1>
                    <Progresss :proge="Number(item.moneycount/item.target_amount*100).toFixed()" style="margin:5px 0;" v-if="Number(Number(item.demand_type))!==1"></Progresss>

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
          </slot>
          <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
        </scroller>
      </div>
    </slot>
  </div>

</template>

<script>
  import {XHeader, Badge, Range, CheckIcon} from 'vux'
  import scrolltemplate from '@/components/scroll/scrollcomponent'
  import Avatar from '../../../components/util/avatar'
  import Progresss from '@/components/prog/Progress'
  import { setTimeout } from 'timers';
  export default {
    name: "followtemplate",
    components: {XHeader, Badge, Range, CheckIcon,scrolltemplate,Avatar,Progresss},
    data() {
      return {
        followinfo: '',
        demandlist: [],
        end:false,
        page: 1,
        // 管理
        allcheck: false,
        noDataText:'',
        msg:'',
        totals: 0,
        // 之前静态部分
        // followlist: [{
        //   user_pic: './static/appimg/ylbf_logo.png',
        //   aideder_name: '中国福利基金会',
        //   img_url: './static/appimg/pro-img.jpg',
        //   demand_title: '不要让孩子的上学梦 止步于疾病和贫穷',
        //   moneycount: 20000,
        //   target_amount: 50000,
        //   userType: 1,
        //   helpmoney: 100,
        //   ischeck:true
        // },{
        //   user_pic: './static/appimg/ylbf_logo.png',
        //   aideder_name: '中国福利基金会',
        //   img_url: './static/appimg/pro-img.jpg',
        //   demand_title: '不要让孩子的上学梦 止步于疾病和贫穷',
        //   moneycount: 20000,
        //   target_amount: 50000,
        //   userType: 2,
        //   helpmoney: 100,
        //   ischeck:false
        // }]
      }
    },
    props: {
      isManager: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.getdemandList();
    },
    methods: {

      //获取需求推荐列表数据
      getdemandList(done) {
        this.$http.post('hts/help/getConcrenDemand',{
          page: this.page,
          pageSize:10,
          region_id: this.$store.state.user.concern_county_region_id
        }).then(res => {
            this.demandlist = [...this.demandlist,...res.data.vos];
            this.totals = res.data.totals;
            if(done) {
              done(true);
            }
          })
      },
      refresh(done) {
        setTimeout(() => {
          this.page = 1;
          this.demandlist = [];
          this.getdemandList(done);
        },1000)
      },
      infinite(done) {
        setTimeout(() => {
          if(this.demandlist.length < this.totals) {
            this.page++;
            this.getdemandList(done);
          }else {
            done(true);
          }
        },1000)
      },
      todetail(item){
        this.$router.push("/loveNeed/"+item.id);
      },
    }
  }
</script>

<style scoped>
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

  /*进度条*/

  .vux-range-input-box {
    padding: 8px 0;
    margin: 0 !important
  }

  .vux-range-input-box >>> .range-max, .vux-range-input-box >>> .range-min {
    display: none
  }

  .vux-range-input-box >>> .range-bar-disabled {
    opacity: 1
  }

  .vux-range-input-box >>> .range-handle {
    background-color: #f8711a;
    cursor: move;
    height: 10px;
    left: 0;
    position: absolute;
    width: 20px;
    border-radius: 2px;
    top: -3px !important;
    box-shadow: none;

  }

  .vux-range-input-box >>> .range-quantity {
    background-color: #f15717;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .vux-range-input-box >>> .range-bar {
    background-color: #e6e6e6;
  }

  .range-spe {
    position: absolute !important;
    bottom: 25px;
    left: 0;
    right: 0
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
