<template>
    <div>
      <x-header :left-options="{backText: ''}" >发布的需求<a slot="right"><i class="iconfont icon-f-sear f-20"></i></a></x-header>
      <div class="box-withheader over-auto bg-f6f5f6">
        <!--头部筛选草稿箱-->
        <div class="list-topoperate clearfix f-16 bg-ffffff color-999">
          <span>需求类型 <i class="icon-caret"></i></span>
          <span>状态 <i class="icon-caret"></i></span>
          <router-link to="/mypubdraft">
          <em class="f_r color-999"><i class="iconfont icon-f-caogao f-22 v-middle"></i> 草稿箱</em>
          </router-link>
        </div>
        <!--总计-->
        <div class="f-14 list-total">共500条</div>
        <!--需求列表-->
        <div class="mypublist bg-ffffff mb-15" v-for="(item,index) in mypublist" :key="index">
          <div class="list-header clearfix">
            <span class="tit-nowrap color-333 f-16">受助人：{{item.name}}</span>
          </div>
          <div class="list-content">
            <router-link :to="item.url" class="dis-block linkonly">
              <div class="flex-tab">
                <div class="flex-tab-cell tab-left">
                  <img :src="item.proimg" width="80">
                </div>
                <div class="flex-tab-cell tab-right">
                  <h1 class="color-333 f-16 f-normal tit-nowrap">{{item.title}}</h1>
                  <p class="color-999 f-14 tit-2row-nowrap">{{item.des}}</p>
                </div>
              </div>
            </router-link>
          </div>

          <!--待审核状态-->
          <div class="list-state clearfix" v-if="item.helpstate===1">
            <span class="f_l color-orange f-14" >待审核</span>
            <router-link to="" class="f_r btn-bordered btn-bordered-gray f-14" style="margin-right: 0">重新编辑</router-link>
          </div>
          <!--不通过状态-->
          <div class="list-state clearfix" v-if="item.helpstate===2">
            <span class="f_l color-red f-14">审核不通过</span>
            <router-link to="" class="f_r btn-bordered btn-bordered-gray f-14" style="margin-right: 0">重新编辑</router-link>
          </div>
          <!--帮扶中状态-->
          <div class="list-state clearfix" v-if="item.helpstate===3">
            <span class="f_l color-green f-14">帮扶中</span>
            <router-link to="" class="f_r btn-bordered btn-bordered-orange f-14">3条信息</router-link><router-link to="" class="f_r btn-bordered btn-bordered-gray f-14">发布爱心反馈</router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {XHeader} from 'vux'
    export default {
        name: "mypub_list",
        components:{XHeader},
      data(){
          return{
            mypublist:[{
              url: '/mypubcapital',
              name:'马大帅',
              proimg:'./static/appimg/pro-img.jpg',
              title: '这是一条【资金】需求',
              des:'点击此条资金需求链接到达资金需求进度详情测试页面',
              helpstate:1
            },{
              url: '/mypubgoods',
              name:'马大帅',
              proimg:'./static/appimg/pro-img.jpg',
              title: '这是一条【物品】需求',
              des:'点击此条物品需求链接到达物品需求进度详情测试页面',
              helpstate:2
            }, {
              url: '',
              name:'马大帅',
              proimg:'./static/appimg/pro-img.jpg',
              title: '不要让孩子失去美丽的童年',
              des:'请大家帮忙给孩子买个杯子，家境实在贫困，孩子上学喝水难',
              helpstate:3
            }]
          }

      }
    }
</script>

<style scoped>
.list-total{padding:5px  15px}
.list-topoperate{padding: 0 }
.list-topoperate span{display: inline-block;padding: 10px 30px 10px 15px}
.list-topoperate i.icon-caret{
display: inline-block;
  position: relative;
  width: 0;
  height: 0;
  border: 4px solid;
  border-color:  #999 transparent transparent transparent;
  top:2px;left:4px

}
.list-topoperate em{padding: 6px 15px}
  .list-header{padding:10px 15px;border-bottom:1px solid #eee}
  .list-content{padding:15px 15px}
  .list-content .tab-left{width: 90px}
  .list-content .tab-right{position: relative}
  .list-content .tab-right h1{line-height: 100%;}
  .list-content .tab-right p{position: absolute;bottom: 0}
  .list-content .tab-right p span{padding-right: 10px;}
  .list-state{padding: 10px 15px;border-top:1px solid #eee}
  .list-state .btn-bordered{margin-right: 10px}
  .list-state .btn-bordered.btn-bordered-orange{margin-right: 0}
</style>
