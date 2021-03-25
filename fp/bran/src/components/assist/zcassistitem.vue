<template>
      <div class="capital-content  bg-ffffff">
        <div class="list-header clearfix" >
          <!-- <badge text="众筹" v-if="item.userType===2" class="f_r f-12 badge-green"></badge>
          <badge text="代发求助" v-if="item.user_relation==='12'" class="f_r f-12 badge-red"></badge>
          <badge text="个人求助" v-if="item.user_relation!=='12'" class="f_r f-12 badge-orange"></badge>
          <badge text="已审核"  class="f_r f-12 badge-orange" style="margin-right:3px"></badge> -->

          <!-- <img class="v-middle dis-inline bd-radius-cir"  :src="item.user_pic" width="30"> -->
          <avatar :image="item.logo" :name="item.acr036" tsize="1" width="20" height="20"  style="float: left;margin-top: 3px" />
          <span class="tit-nowrap color-333 f-12" style="padding-left: 10px;line-height:22px;">{{name(item.acr036)}}</span>
          <!-- <div class="address color-999">
                <p class="f-12 text-justify"><i class="fa fa-map-marker  f-14" style="color:#d0d0d0"></i>{{111}}</p>
            </div> -->
        </div>
        <div class="list-content"  @click="todetail(item)">
          <div class="flex-tab">
            <div class="flex-tab-cell tab-left linkonly">
              <img :src="item.acr065" width="75" height="75" style="object-fit:cover">
              <!-- <img :src='changetype(item.img_url)' width="90" height="90"> -->
            </div>
            <div class="flex-tab-cell tab-right" style="padding-top:5px;">
              <h2 class="color-333 f-13 tit-2row-nowrap dem-tit" style="height:40px;">{{item.title}}</h2>
              <!-- <div class="color-999 f-12 tit-2row-nowrap mt-10" style="line-height: 14px;">{{item.demand_coment}}</div > -->
              <!-- <range class="range-spe dem-rang" v-if="item" :value="item.moneycount/item.target_amount*100" disabled :rangeBarHeight="4" ></range> -->
              <Progresss  :proge="asd(item)" ></Progresss>
              <!-- <Progresss proge="100.0" style="margin-top:10px;"></Progresss> -->
              <p class="f-12 color-333 dem-ext clearfix">
                <span class="f_l">目标金额 <em class="color-orange">{{item.planMoney}}</em> 元</span>
                <span class="f_l" style="margin-left:20px;">已募集 <em  class="color-orange">{{item.alreadyMoney}}</em> 元</span>
                <!--<span>支持次数: <em class="color-orange">{{item.donatecount}}</em>次</span>-->
              </p>
            </div>
          </div>
        </div>
      </div>

</template>

<script>
  import {XHeader, Badge, Range} from 'vux'
  import Avatar from '../util/avatar'
  import Progresss from '@/components/prog/Progress'
export default {
    name: 'assistitem',
    components: {Avatar, XHeader, Badge, Range,Progresss},
    // props:{
    //     item:{
    //       type:Object,
    //       default:null
    //     }
    // },
    props: ['item', 'type'],
    data () {
      return {
        data1: 50,
        itemdata: null
      }
    },
    computed:{

    },
    methods: {
        asd(item){
            if(item.alreadyMoney==0){
                return 0
            }else if((parseFloat(item.alreadyMoney)/parseFloat(item.planMoney)*100).toFixed(1)<=0.1){
                console.log('-----------')
                return '0.1'
            }else{
                return (parseFloat(item.alreadyMoney)/parseFloat(item.planMoney)*100).toFixed(1)
            }
        },
      total (moneycount, target_amount) {
        console.log(moneycount, '------', target_amount)
        return moneycount / target_amount * 100
      },
      todetail (item) {
        // this.$router.push('/zcprojectDetail/' + item.acr001);
        window.location.href=process.env.WX_URL+'/pages/index/#/zcprojectDetail/'+item.acr001+'/'+localStorage.userid+'/'+localStorage.nick_name+'/'+localStorage.token
      },
    //   changetype(imgurl){
    //       return getMinPic(imgurl);
    //   },
      name (str) {
          if(str == null || str ==''){
              return  '案说法'
          }else if (str.length === 2) {
             return str.substring(0, 1) + '*' + str.substring(1)
          } else {
             return str.substring(0, 1) + '*' + str.substring(2)
          }
      }
    }
  }
</script>

<style scoped>
  .list-header{padding:10px 15px 5px}
  .list-content{padding:10px 15px;background: #f6f6f6}
  .list-content .tab-left{width: 83px}
  .list-content .tab-right{position: relative}
  .list-content .tab-right h1{line-height: 130%;}
  .list-content .tab-right p{position: absolute;bottom: 0px;left:0;right:0}
  /* .list-content .tab-right p span{padding-right: 10px;} */
  .list-info .list-info-header{padding: 10px 15px 10px 120px;border-bottom:1px solid #eee}
  .list-info-header a{ color: #ed6b2b; padding: 5px;}
  .list-info .list-info-content{padding: 10px 15px 10px;position: relative}
  .list-state{padding: 13px 15px;border-top:1px solid #eee;position: absolute;bottom:0;left:0;right:0}
  .list-state .btn-bordered{margin-right: 10px}
  .list-state .btn-bordered.btn-bordered-orange{margin-right: 0}
  .list-header .vux-badge{margin-top:5px}
  .list-info-content ul li{padding: 4px 0}
  .btn-copy{display: inline-block;position: absolute;right:15px;top:20px;border:1px solid #ddd;padding: 1px 10px}
    .address{margin-left: 45px}
    .address p {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .address p i{margin-right: 3px}
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
  .range-spe{position: absolute!important;bottom: 24px;left:0;right:0}

  .dem-tit{margin-top:-3px;line-height: 130%}
  .dem-ext{line-height: 130%;bottom:0}

</style>
