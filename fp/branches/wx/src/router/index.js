import Vue from 'vue'
import Router from 'vue-router'

import login from '../pages/signin/login'


//各种协议
import proreg from '@/pages/protocol/proreg'// 注册协议
import prohelp from '@/pages/protocol/prohelp'// 帮助协议
import proxqfq from '@/pages/protocol/proxqfq'// 需求发起
import procnsh from '@/pages/protocol/procnsh'// 发起人承诺书
import proyszc from '@/pages/protocol/procnsh'// 隐私政策

// 首页
import index from '../pages/home/index'
import searchRecoder from '../pages/home/searchRecoder'
import searchList from '../pages/home/searchList'
import secondNav from '../pages/home/secondNav'
import recom from '../pages/home/recom/recom'
import dsfp from '../pages/home/recom/dsfp'
import fpzc from '../pages/home/recom/fpzc'
import ylbf from '../pages/home/recom/ylbf'
import jybf from '../pages/home/recom/jybf'
import zfbf from '../pages/home/recom/zfbf'
import wpbf from '../pages/home/recom/wpbf'



//榜样，展示
import example from '../pages/Third_party/example'
import Exhibition from '../pages/Third_party/Exhibition'
//展示详情页
import Exh_det from '../pages/Third_party/Exh_det'



import helpBang from '../pages/home/helpBang/helpBang'
// 开屏广告
import welcome from '../components/welcome/welcome'
// 资金帮扶详情
import loveNeed from '../pages/home/loveNeed/loveNeed'
import percent from '../pages/home/loveNeed/percent'
// 质疑/举报
import report from '../pages/home/loveNeed/inside/report'
// 证明列表
import proveList from '../pages/home/loveNeed/inside/proveList'

// 荣誉证书
import certificate from '../pages/home/loveNeed/inside/certificate'


// 区域
import local from '../pages/local/local_index'
// 发布
import empty from '../pages/empty/empty'

// 个人中心-帮扶记录
import record from '../pages/user/helprecord/record_index'
import capital from '../pages/user/helprecord/record_capital'
import capitaldetail from '../pages/user/helprecord/record_capital_detail'
import zcrecdetail from '../pages/user/helprecord/zcrec_detail'
import goods from '../pages/user/helprecord/record_goods'
import goodsdetail from '../pages/user/helprecord/record_goods_detail'




// 项目详情
import projectDetails from '../pages/projectDetails/projectDetails'
import togetherDonationFoot from '../pages/projectDetails/togetherDonationFoot'
import projectDialog from '../pages/projectDetails/projectDialog'
import helpHe from '../pages/home/loveNeed/inside/helpHe'
import helpHeGoods from '../pages/home/loveNeed/inside/helpHeGoods'
import helpHeGoodsDetail from '../pages/home/loveNeed/inside/helpHeGoodsDetail'
import helpHeWriteExp from '../pages/home/loveNeed/inside/helpHeWriteExp'


import organDetails from '../pages/organDetails/organDetails'
import  proveintroduction from "../pages/loveHelp/prove_introduction"
// 爱心帮扶
import thatList from '../pages/loveHelp/thatList'
import iToProve from '../pages/loveHelp/iToProve'
import success from '../pages/loveHelp/success'
import poverty from '../pages/loveHelp/poverty'
// 系统消息
import messageDetails from '@/pages/systemMessage/messageDetails'
import message from '@/pages/systemMessage/message'
import loveStatus from '@/pages/systemMessage/loveStatus'
import statusList from '@/pages/systemMessage/statusList'
import personalStatus from '@/pages/systemMessage/personalStatus'

import cmsArticleList from '@/pages/cmsArticle/list'
import cmsDetail from '@/pages/cmsArticle/detail'

import city from '../pages/city/city.vue'
Vue.use(Router)
export default new Router({
//   mode: 'history',
  routes: [
    {path: '*', redirect: '/'},
    {path: '/', redirect: '/recom'},
    // {path: '/', redirect: '/dTList'},
    {path: '/city', name: 'city', component: city,
      beforeEnter:(to, from, next) => {
        let path = from.fullPath
        localStorage.setItem('path',path)
        next();
      }},
      {path:'/fpzs',name:'fpzs',component: resolve => require(['@/pages/empty/fpzs'],resolve) },

    {path:'/empty',name:'empty',component:empty},
    // 开屏广告
    {path: '/welcome', name: 'welcome', component: welcome},
    // 登录
    {path: '/login', name: 'login', component: login,
    beforeEnter:(to, from, next) => {
      let path = from.fullPath
      localStorage.setItem('path',path)
      next();
    }},
 
    // 首页-默认
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {cache: true},
      children: [
        // 二级导航
        {path: 'secondNav', name: 'secondNav', component: secondNav,meta: {cache: true}},
        // 首页-默认显示推荐频道
        {path: '/recom', name: 'recom', component: recom, meta: {cache: true}},
        // 首页-医疗-教育-物品-就业-列表页
        {path: '/demandContainer', name: 'demandContainer', component: resolve => require(['@/pages/home/demandContainer'],resolve), meta: {cache: true},
      children:[
        {path: '/demand/:id', name: 'demand', component: resolve => require(['@/pages/home/demand'],resolve), meta: {cache: true}}, //pages/home/demand

        {path: '/demand2/:id', name: 'demand2', component: resolve => require(['@/pages/home/demand2'],resolve), meta: {cache: true}},
        {path: '/demand3/:id', name: 'demand3',  component: resolve => require(['@/pages/home/demand3'],resolve), meta: {cache: true}},
        {path: '/demand4/:id', name: 'demand4',  component: resolve => require(['@/pages/home/demand4'],resolve), meta: {cache: true}},
        {path: '/demand5/:id', name: 'demand5',  component: resolve => require(['@/pages/home/demand5'],resolve), meta: {cache: true}},
        {path: '/demand6/:id', name: 'demand6',  component: resolve => require(['@/pages/home/demand6'],resolve), meta: {cache: true}},
        {path: '/demand7/:id', name: 'demand7',  component: resolve => require(['@/pages/home/demand7'],resolve), meta: {cache: true}},
        {path: '/example', name: 'example',  component: resolve => require(['@/pages/Third_party/example'],resolve), meta: {cache: true}}, //pages/Third_party/example
        {path: '/Exhibition', name: 'Exhibition', component: resolve => require(['@/pages/Third_party/Exhibition'],resolve), meta: {cache: true}}

      ]
      
      }, //pages/home/demand

        {path: '/example', name: 'example', component: example, meta: {cache: true}},
        {path: '/Exhibition', name: 'Exhibition', component: Exhibition, meta: {cache: true}}



      ],
      redirect: '/indexNav' /// 默认二级路由
    },
    //展示详情页
    {path: '/Exh_det/:url', name: 'Exh_det', component: Exh_det},
    // 首页-医疗-教育-物品-就业-个人需求-文章页
    {
      path: '/loveNeed/:id',
      name: 'loveNeed',
      component: loveNeed,
      children: [
        {path: '/percent', name: 'percent', component: percent}
      ]
    },
    //搜索结果页
    {path: '/searchRecoder', name: 'searchRecoder', component: searchRecoder},
    {path: '/searchList/:con', name: 'searchList', component: searchList},

    {path: '/loveNeed', name: 'loveNeed', component: loveNeed},
    // 质疑/举报
    {path: '/report/:id', name: 'report', component: report},
    // 证明列表
    {path: '/proveList/:id', name: 'proveList', component: proveList},

    // 首页-推荐频道-电商扶贫
    {path: '/dsfp', name: 'dsfp', component: dsfp},
    // 首页-推荐频道-扶贫公募
    {path: '/fpzc', name: 'fpzc', component: fpzc},
    // 首页-推荐频道-医疗帮扶
    {path: '/ylbf', name: 'ylbf', component: ylbf},
    // 首页-推荐频道-教育帮扶发
    {path: '/jybf', name: 'jybf', component: jybf},
    // 首页-推荐频道-住房帮扶
    {path: '/zfbf', name: 'zfbf', component: zfbf},
    // 首页-推荐频道-物品帮扶
    {path: '/wpbf', name: 'wpbf', component: wpbf},
    // 首页-内页-
    {path: '/helpBang', name: 'helpBang', component: helpBang},
    // 区域-默认首页
    {path: '/local', name: 'local', component: local},
    
   
  

    // 个人中心-帮扶记录
    {
      path: '/record',
      name: 'record',
      component: record,
      meta:{
      cache:true,
      auth:true
      },
      redirect: '/record/capital',
      children: [
        {path: 'capital', name: 'capital', component: capital, meta:{
          auth:true,
          }},// 帮扶记录--资金帮扶
        {path: 'goods', name: 'goods', component: goods, meta:{
          auth:true,
          }}// 帮扶记录--物品帮扶
      ]
    },
    {path: '/capitaldetail/:id', name: 'capitaldetail', component: capitaldetail},//帮扶记录--资金帮扶详情
    {path: '/zcrecdetail/:id/:projectid', name: 'zcrecdetail', component: zcrecdetail},//帮扶记录--众筹帮扶详情
    // {path: '/goodsdetail/:id/:type', name: 'goodsdetail', component: goodsdetail},//帮扶记录--物品帮扶详情
    {path: '/goodsdetail/:id', name: 'goodsdetail', component: goodsdetail},//帮扶记录--物品帮扶详情


    
    // 项目详情
    {path: '/projectDetails', name: 'projectDetails', component: projectDetails},
    {path: '/togetherDonationFoot', name: 'togetherDonationFoot', component: togetherDonationFoot},
    {path: '/projectDialog', name: 'projectDialog', component: projectDialog},
    {path: '/helpHe/:id/:donatorName', name: 'helpHe', component: helpHe},
    {path: '/helpHeGoods/:id/:donatorName', name: 'helpHeGoods', component: helpHeGoods}, //帮助他--物品
    {path: '/helpHeGoodsDetail/:id/:helppattern', name: 'helpHeGoodsDetail', component: helpHeGoodsDetail}, //帮助他--物品-查看需求状态详情
    {path: '/helpHeWriteExp/:id/:demandId/:type', name: 'helpHeWriteExp', component: helpHeWriteExp}, //帮助他--物品-填写快递信息
    // 荣誉证书
    {path: '/certificate', name: 'certificate', component: certificate},
    // 机构详情
    {path: '/organDetails', name: 'organDetails', component: organDetails},
    // 03-爱心帮扶\01-证明列表
    {path: '/thatList', name: 'thatList', component: thatList},
    // 03-爱心帮扶\我来证明
    {path: '/iToProve/:id', name: 'iToProve', component: iToProve},
    {path:"/proveintroduction",name:"proveintroduction",component:proveintroduction},
    {path: '/poverty/:id', name: 'poverty', component: poverty},
    {path: '/success', name: 'success', component: success},
    // 系统消息
    // 7消息---爱心反馈、系统消息
    {
      path: '/message',
      name: 'message',
      component: message,
      children: [
        {path: 'statusList', name: 'statusList', component: statusList, meta: {auth: true}},
        {path: 'personalStatus', name: 'personalStatus', component: personalStatus}
      ]
    },
    {path: '/loveStatus', name: 'loveStatus', component: loveStatus},
    // 8消息详情1
    {path: '/messageDetails', name: 'messageDetails', component: messageDetails},
    
    // 各种协议
    {path: '/proreg', name: 'proreg', component: proreg}, // 注册协议
    {path: '/prohelp', name: 'prohelp', component: prohelp}, // 帮助协议
    {path: '/proxqfq', name: 'proxqfq', component: proxqfq}, // 需求发起
    {path: '/procnsh', name: 'procnsh', component: procnsh}, // 发起人承诺书
    {path: '/proyszc', name: 'proyszc', component: proyszc}, //隐私政策
    //cms新闻列表
    {path: '/cmsArticleList', name: 'cmsArticleList', component: cmsArticleList},
    {path: '/cmsDetail', name: 'cmsDetail', component: cmsDetail},

 
  ]
})