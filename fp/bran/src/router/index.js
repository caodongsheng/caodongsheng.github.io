import Vue from 'vue'
import Router from 'vue-router'


//import city from '../pages/city/city.vue'
Vue.use(Router)
export default new Router({
//   mode: 'history',
  routes: [
    {path: '*', redirect: '/'},
    // {path: '/', redirect: '/recom'},
    {path: '/', redirect:to =>{
      console.log('地址错误',to)
      Vue.ModuleNative('close')
      return 
    }},
    // {path: '/', redirect: '/dTList'},
    {path: '/city', name: 'city',  component: resolve => require(['@/pages/city/city'],resolve),
      beforeEnter:(to, from, next) => {
        let path = from.fullPath
        localStorage.setItem('path',path)
        next();
      }},
    {path:'/fpzs',name:'fpzs',component: resolve => require(['@/pages/empty/fpzs'],resolve) },

    {path:'/empty',name:'empty',component: resolve => require(['@/pages/empty/empty'],resolve) },
    // 开屏广告
    {path: '/welcome', name: 'welcome', component: resolve => require(['@/components/welcome/welcome'],resolve) },
// 登录import login from '../pages/signin/login'

    {path: '/login', name: 'login', component: resolve => require(['@/pages/signin/login'],resolve),
      beforeEnter:(to, from, next) => {
        let path = from.fullPath
        localStorage.setItem('path',path)
        next();
      }},
    // 注册
    {path: '/reg', name: 'reg', component: resolve => require(['@/pages/signin/reg'],resolve)},
    {path: '/registerDialog', name: 'registerDialog', component: resolve => require(['@/components/dialog/registerDialog'],resolve)},//components/dialog/registerDialog
    // 找回密码
    {path: '/retrievePassword', name: 'retrievePassword', component: resolve => require(['@/pages/signin/retrievePassword'],resolve)}, //pages/signin/retrievePassword'
    // 设置新密码
    {path: '/setNewPassword', name: 'setNewPassword', component: resolve => require(['@/pages/signin/setNewPassword'],resolve)}, //pages/signin/setNewPassword
    // 管理员注册1
    {path: '/adminReg', name: 'adminReg', component: resolve => require(['@/pages/signin/adminReg'],resolve)},
    // 管理员注册完成注册
    {path: '/adminReg1', name: 'adminReg1', component: resolve => require(['@/pages/signin/adminReg1'],resolve)},
    // 管理员注册（下一步）2
    {path: '/adminReg2', name: 'adminReg2', component: resolve => require(['@/pages/signin/adminReg2'],resolve)},
    // 管理员注册信息已提交完成页
    {path: '/adminRegOver', name: 'adminRegOver', component: resolve => require(['@/pages/signin/adminRegOver'],resolve)},
    // 首页-默认
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/home/index'],resolve),
      meta: {cache: true},
      children: [
        // 二级导航
        {path: 'secondNav', name: 'secondNav', component: resolve => require(['@/pages/home/secondNav'],resolve),meta: {cache: true}},
        // 首页-默认显示推荐频道
        {path: '/recom', name: 'recom', component: resolve => require(['@/pages/home/recom/recom'],resolve), meta: {cache: true}},  //pages/home/recom/recom
        // 首页-医疗-教育-物品-就业-列表页
        {path: '/demandContainer', name: 'demandContainer', component: resolve => require(['@/pages/home/demandContainer'],resolve), meta: {cache: true},
      children:[
        {path: '/demand/:id', name: 'demand', component: resolve => require(['@/pages/home/demand'],resolve), meta: {cache: true}}, //pages/home/demand

        {path: '/demand2/:id', name: 'demand2', component: resolve => require(['@/pages/home/demand2'],resolve), meta: {cache: true}},
        {path: '/demand3/:id', name: 'demand3',  component: resolve => require(['@/pages/home/demand3'],resolve), meta: {cache: true}},
        {path: '/demand4/:id', name: 'demand4',  component: resolve => require(['@/pages/home/demand4'],resolve), meta: {cache: true}},
        {path: '/demand5/:id', name: 'demand5',  component: resolve => require(['@/pages/home/demand5'],resolve), meta: {cache: true}},
        {path: '/demand6/:id', name: 'demand6', component: resolve => require(['@/pages/home/demand6'],resolve), meta: {cache: true}},
        {path: '/demand7/:id', name: 'demand7', component: resolve => require(['@/pages/home/demand7'],resolve), meta: {cache: true}},
        {path: '/example', name: 'example',  component: resolve => require(['@/pages/Third_party/example'],resolve), meta: {cache: true}}, //pages/Third_party/example
        {path: '/Exhibition', name: 'Exhibition', component: resolve => require(['@/pages/Third_party/Exhibition'],resolve), meta: {cache: true}}

      ]
      
      }, //pages/home/demand

        
        //{path: '/demand*/:id', name: 'demandcontainer', component: demandcontainer, meta: {cache: true}},
        // {path: '/demand6/:id', name: 'demand6', component: demand6, meta: {cache: true}},
        // {path: '/demand7/:id', name: 'demand7', component: demand7, meta: {cache: true}},
        // {path: '/demand8/:id', name: 'demand8', component: demand8, meta: {cache: true}},
        // {path: '/demand9/:id', name: 'demand9', component: demand9, meta: {cache: true}},
        // {path: '/demand10/:id', name: 'demand10', component: demand10, meta: {cache: true}},



      ],
      redirect: '/indexNav' /// 默认二级路由
    },
    //展示详情页
    {path: '/Exh_det/:url', name: 'Exh_det', component: resolve => require(['@/pages/Third_party/Exh_det'],resolve)}, //pages/Third_party/Exh_det
    // 首页-医疗-教育-物品-就业-个人需求-文章页
    {
      path: '/loveNeed/:id',
      name: 'loveNeed',
      component: resolve => require(['@/pages/home/loveNeed/loveNeed'],resolve), //pages/home/loveNeed/loveNeed
      children: [
        {path: '/percent', name: 'percent',  component:resolve => require(['@/pages/home/loveNeed/percent'],resolve)}
      ]
    },
    //搜索结果页
    {path: '/searchRecoder', name: 'searchRecoder',component:resolve => require(['@/pages/home/searchRecoder'],resolve)},
    {path: '/searchList/:con', name: 'searchList', component:resolve => require(['@/pages/home/searchList'],resolve)},

    {path: '/loveNeed', name: 'loveNeed',  component: resolve => require(['@/pages/home/loveNeed/loveNeed'],resolve)},
    // 质疑/举报
    {path: '/report/:id',   meta: {auth: true},name: 'report',  component: resolve => require(['@/pages/home/loveNeed/inside/report'],resolve)},  //pages/home/loveNeed/inside/report
    // 证明列表
    {path: '/proveList/:id',name: 'proveList', component: resolve => require(['@/pages/home/loveNeed/inside/proveList'],resolve)}, 

    // 首页-推荐频道-电商扶贫
    // 首页-推荐频道-扶贫公募
    // 首页-推荐频道-医疗帮扶
    // 首页-推荐频道-教育帮扶发
    // 首页-推荐频道-住房帮扶
    // 首页-推荐频道-物品帮扶
    // 首页-内页-
    // {path: '/helpBang', name: 'helpBang', component: resolve => require(['@/pages/home/helpBang/helpBang'],resolve)},   //pages/home/helpBang/helpBang
    // 区域-默认首页
    // {path: '/local', name: 'local', component: resolve => require(['@/pages/local/local_index'],resolve)},///pages/local/local_index
    // 发布-默认首页
    {path: '/publish', name: 'publish', component:resolve => require(['@/pages/publish/publish_index'],resolve), meta: {auth: false,cache:true}}, //pages/publish/publish_index
    {path: '/fullrecipient', name: 'fullrecipient', component:resolve => require(['@/pages/publish/full_recipient'],resolve), meta: {auth: true}}, //pages/publish/full_recipient
    // 发布-填写受助人
    // {path: '/publishdemond', name: 'publishdemond', component: publishdemond, meta: {auth: true}},
    //教育
    {path: '/goPublish/:demandId?', name: 'goPublish', component:resolve => require(['@/pages/publish/goPublish'],resolve),meta:{auth: true,cache:true}}, //pages/publish/goPublish
    //发布成功
    {path: '/pub_suc', name: 'publishSuccess', component:resolve => require(['@/pages/publish/publishSuccess'],resolve)},   //pages/publish/publishSuccess
    //爱心热度
    {path: '/loveheat', name: 'loveheat',component:resolve => require(['@/pages/user/userInform/loveheat'],resolve)},// pages/user/userInform/loveheat
    //我的任务
    {path: '/mytask', name: 'mytask', component:resolve => require(['@/pages/user/userInform/mytask'],resolve)},
    //我的积分
    {path: '/mypoints', name: 'mypoints', component:resolve => require(['@/pages/user/userInform/myPoints'],resolve)},
    //至善分
    {path: '/creditscore', name: 'creditscore', component:resolve => require(['@/pages/user/userInform/creditScore'],resolve)},
    // 个人中心-默认首页
    {path: '/user', name: 'user', component:resolve => require(['@/pages/user/user_index'],resolve), //pages/user/user_index
      beforeEnter:(to, from, next) => {
        let path = from.fullPath
        localStorage.setItem('path',path)
        next();
      }
    },
    //扶贫头条
    {path: '/fptt', name: 'fptt', component:resolve => require(['@/pages/spa/bftt'],resolve)},
    // 个人中心-帮扶记录
    {
      path: '/record',
      name: 'record',
      component:resolve => require(['@/pages/user/helprecord/record_index'],resolve), //pages/user/helprecord/record_index
      meta:{
      cache:true,
      auth: true
      },
      redirect: '/record/capital',
      children: [
        {path: 'capital', name: 'capital', meta:{auth: true,
          cache:true}, component:resolve => require(['@/pages/user/helprecord/record_capital'],resolve)},// 帮扶记录--资金帮扶pages/user/helprecord/record_capital
        {path: 'goods', name: 'goods', meta:{auth: true,
          cache:true}, component:resolve => require(['@/pages/user/helprecord/record_goods'],resolve)},// 帮扶记录--物品帮扶//pages/user/helprecord/record_goods
        {path: 'zcrec', name: 'zcrec', meta:{auth: true,
          cache:true}, component:resolve => require(['@/pages/user/helprecord/zcrec'],resolve)},//帮扶记录--众筹//pages/user/helprecord/zcrec
        {path: 'xmrec', name: 'xmrec', meta:{auth: true,
          cache:true}, component:resolve => require(['@/pages/user/helprecord/xmrec'],resolve)},//帮扶记录--项目//pages/user/helprecord/xmrec
      ]
    },
    {path: '/hbh', name: 'hbh',component:resolve => require(['@/pages/user/helprecord/hbh'],resolve)},
    {path: '/capitaldetail/:id', name: 'capitaldetail',meta: {auth: true}, component:resolve => require(['@/pages/user/helprecord/record_capital_detail'],resolve)},//帮扶记录--资金帮扶详情pages/user/helprecord/record_capital_detail
    // {path: '/goodsdetail/:id/:type', name: 'goodsdetail', component: goodsdetail},//帮扶记录--物品帮扶详情
    {path: '/goodsdetail/:id', name: 'goodsdetail', meta: {auth: true},component:resolve => require(['@/pages/user/helprecord/record_goods_detail'],resolve)},//帮扶记录--物品帮扶详情//record_goods_detail
    {path: '/zcdetail', name: 'zcdetail', meta: {auth: true},component:resolve => require(['@/pages/user/helprecord/zcrec_detail'],resolve)},//公墓详情

    // 个人中心-我发布的需求
    {path: '/mypublish', name: 'mypublish', meta: {auth: true},component:resolve => require(['@/pages/user/mypublish/mypublish'],resolve)},//分类导航页pages/user/mypublish/mypublish
    {path: '/mypublist/:typeCode', name: 'mypublist', component:resolve => require(['@/pages/user/mypublish/mypub_list'],resolve),meta:{cache:true,auth: true}},//需求-列表 //pages/user/mypublish/mypub_list
    {path: '/mypubcapital/:demandId', name: 'mypubcapital', meta: {auth: true},component:resolve => require(['@/pages/user/mypublish/mypub_capital'],resolve)},//资金需求详情（待审核、审核中、不通过等状态详情）//pages/user/mypublish/mypub_capital
    {path: '/mypubgoods/:demandId', meta: {auth: true},name: 'mypubgoods', component:resolve => require(['@/pages/user/mypublish/mypub_goods'],resolve)},//物品需求详情（面对面、快递进度等状态详情）mypub_goods
    {path: '/mypubgoodsrecord/:demandId',meta: {auth: true}, name: 'mypubgoodsrecord', component:resolve => require(['@/pages/user/mypublish/mypub_goods_record'],resolve)},//物品需求详情--帮扶记录pages/user/mypublish/mypub_goods_record
    {path: '/lovedynamics/:demandId', meta: {auth: true},name: 'lovedynamics', component:resolve => require(['@/pages/user/mypublish/love_dynamics'],resolve)},//爱心反馈mypublish/love_dynamics

    // 个人中心--物流信息
    {path: '/transportinfo', name: 'transportinfo', component:resolve => require(['@/pages/user/transport/transport_info'],resolve)},//pages/user/transport/transport_info

    // 个人中心--提现
    {path: '/cashindex/:demandId', name: 'cashindex', component:resolve => require(['@/pages/user/takecash/cash_index'],resolve)},//初始页user/takecash/cash_index
    {path:"/cash_introduction",name:"cashinduction",component:resolve => require(['@/pages/user/takecash/cash_introduction'],resolve)},//user/takecash/cash_introduction
    {path: '/bankchoice', name: 'bankchoice', component:resolve => require(['@/pages/user/takecash/bank_choice'],resolve)},//银行账号-选择takecash/bank_choice
    {path: '/banksupportlist', name: 'banksupportlist', component: resolve => require(['@/pages/user/takecash/bank_supportlist'],resolve),meta:{cache:true}},//支持的银行列表bank_supportlist
    {path: '/bankadd', name: 'bankadd', component: resolve => require(['@/pages/user/takecash/bank_add'],resolve)},//新增账号takecash/bank_add
    {path: '/bankaddhand', name: 'bankaddhand', component: resolve => require(['@/pages/user/takecash/bank_add_hand'],resolve)},//新增账号-不校验，手动新增账号bank_add_hand
    {path: '/bankcheck', name: 'bankcheck', component: resolve => require(['@/pages/user/takecash/bank_check'],resolve)},//银行账号-校验bank_check
    {path: '/cashway', name: 'cashway', component: resolve => require(['@/pages/user/takecash/cash_way'],resolve)},//选择打款方式cash_way
    {path: '/cashsuccess', name: 'cashsuccess', component: resolve => require(['@/pages/user/takecash/cash_success'],resolve)},//提现成功提示页cash_success

    // 个人中心-我的邀请
    {path: '/inviteMine', name: 'inviteMine', component: resolve => require(['@/pages/user/myinvite/inviteApp/inviteMine'],resolve)},//初始页user/myinvite/inviteApp/inviteMine
    {path: '/inviteList', name: 'inviteList', component: resolve => require(['@/pages/user/myinvite/inviteApp/inviteList'],resolve),meta:{cache:true}},//邀请列表user/myinvite/inviteApp/inviteList
    {path: '/inviteCode', name: 'inviteCode', component: resolve => require(['@/pages/user/myinvite/inviteApp/inviteCode'],resolve)},//邀请二维码inviteCode
    {path: '/inviteType', name: 'inviteType', component: resolve => require(['@/pages/user/myinvite/inviteApp/inviteType/inviteType'],resolve)},//邀请二维码类型pages/user/myinvite/inviteApp/inviteType/inviteType
    {path: '/inviteShare', name: 'inviteShare', component: resolve => require(['@/pages/user/myinvite/inviteApp/ShareInvitation'],resolve)},//邀请二维码分享//inviteApp/ShareInvitation
    {path: '/inviteType/CLA', name: 'ChoseLivingArea',component: resolve => require(['@/pages/user/myinvite/inviteApp/inviteType/ChoseLivingArea'],resolve)},//邀请二维码类型  inviteApp/inviteType/ChoseLivingArea
    {path: '/inviteType/CDA', name: 'ChoseDutiesArea', component: resolve => require(['@/pages/user/myinvite/inviteApp/inviteType/ChoseDutiesArea'],resolve)},//微信首页扫码功能ChoseDutiesArea
    {path: '/inviteType/CC', name: 'ChoseCompany', component: resolve => require(['@/pages/user/myinvite/inviteApp/inviteType/ChoseCompany'],resolve)},//微信首页扫码功能  ChoseCompany
    {path: '/invitescanCode', name: 'invitescanCode', component: resolve => require(['@/pages/user/myinvite/inviteWx/scanCode'],resolve)},//微信扫码判断微信号是否已绑定手机号  /inviteWx/scanCode
    {path: '/inviteislog', name: 'inviteislog', component: resolve => require(['@/pages/user/myinvite/inviteWx/islog'],resolve)},//微信扫码判断微信号是否已绑定手机号  inviteWx/islog
    {path: '/inviteRegister', name: 'inviteRegister', component: resolve => require(['@/pages/user/myinvite/inviteWx/Register'],resolve)},//微信邀请码注册页  inviteWx/Register
    {path: '/invitemember', name: 'invitemember', component: resolve => require(['@/pages/user/myinvite/inviteWx/member'],resolve)},//微信绑定后提示  member
    {path: '/invitespresqo', name: 'invitespresqo', component: resolve => require(['@/pages/user/myinvite/inviteWx/spresqo'],resolve)},//扫码后判断页  spresqo

    // 个人中心--我的关注
    {path: '/myfollow', name: 'myfollow',  meta: {auth: true},component: resolve => require(['@/pages/user/myfollow/myfollow'],resolve)},  //pages/user/myfollow/myfollow

    //个人中心--商城订单
    {path: '/orderList', name: 'orderList', component: resolve => require(['@/pages/user/orderList'],resolve)},   //pages/user/orderList
    //个人中心--商品收藏
    {path: '/goodsCollection', name: 'goodsCollection',  component: resolve => require(['@/pages/user/goodsCollection'],resolve)},  //user/goodsCollection

    // 个人中心--设置
    {path: '/setting',
      name: 'setting',
     component: resolve => require(['@/pages/user/setting/setting_index'],resolve),  //pages/user/setting/setting_index'
     meta: {auth: true}
    },//初始设置列表页

    {path: '/setusername/:username', name: 'setusername', component: resolve => require(['@/pages/user/setting/set_username'],resolve)},//修改用户名  set_username
    {path: '/setnickname/:nickname', name: 'setnickname', component: resolve => require(['@/pages/user/setting/set_nickname'],resolve)},//修改昵称   set_nickname
    {path: '/setrealname/:isauth', name: 'setrealname', component: resolve => require(['@/pages/user/setting/set_realname'],resolve)},//修改真实姓名   set_realname
    {path: '/setpoorname/:isauth', name: 'setpoorname', component: resolve => require(['@/pages/user/setting/set_poorname'],resolve)},//贫困户认证  set_poorname
    {path: '/setthirdaccounts', name: 'setthirdaccounts', component: resolve => require(['@/pages/user/setting/set_thirdaccounts'],resolve)},//第三方账号  set_thirdaccounts
    {path: '/FirstBind', name: 'FirstBind', component: resolve => require(['@/pages/user/setting/phonebind/FirstBind'],resolve)},//手机号绑定（初次绑定）  phonebind/FirstBind
    {path: '/ReBind', name: 'ReBind', component: resolve => require(['@/pages/user/setting/phonebind/ReBind'],resolve)},//手机号绑定（非初次绑定）  phonebind/ReBind
    {path: '/CheckOldPhone', name: 'CheckOldPhone', component: resolve => require(['@/pages/user/setting/phonebind/CheckOldPhone'],resolve)}, //手机号绑定（旧手机--验证码验证）    CheckOldPhone
    {path: '/CheckPassword', name: 'CheckPassword', component: resolve => require(['@/pages/user/setting/phonebind/CheckPassword'],resolve)},//手机号绑定（如果旧手机丢失--需密码验证）  CheckPassword
    {path: '/BindNew', name: 'BindNew', component: resolve => require(['@/pages/user/setting/phonebind/BindNew'],resolve)},// 手机号绑定（填写新手机信息）  BindNew
    {path: '/addressList', name: 'addressList', component: resolve => require(['@/pages/user/setting/addressmanager/addressList'],resolve)},//地址管理--地址列表  /user/setting/addressmanager/addressList
    {path: '/addressAdd', name: 'addressAdd', component: resolve => require(['@/pages/user/setting/addressmanager/addressAdd'],resolve)},  // 地址管理--新增地址  setting/addressmanager/addressAdd
    {path: '/managerBankList', name: 'bankList',  component: resolve => require(['@/pages/user/setting/bankmanager/managerBankList'],resolve)},//银行账号管理-列表  setting/bankmanager/managerBankList
    {path: '/managerBankAdd', name: 'bankAdd', component: resolve => require(['@/pages/user/setting/bankmanager/managerBankAdd'],resolve)},// 银行账号管理--新增  bankmanager/managerBankAdd'
    {path: '/setpassword', name: 'setpassword',component: resolve => require(['@/pages/user/setting/set_password'],resolve)},//修改密码 setting/set_password
    {path: '/setlovefollow', name: 'setlovefollow', component: resolve => require(['@/pages/user/setting/set_lovefollow'],resolve)},//爱心关注管理  set_lovefollow
    {path: '/setsystem', name: 'setsystem',component: resolve => require(['@/pages/user/setting/set_system'],resolve)},//系统设置   set_system

    // 个人中心--受助人管理
    {path: '/aidedperson', name: 'aidedperson',meta: {auth: true}, component: resolve => require(['@/pages/user/aidedperson/AidedpersonIndex'],resolve)},//初始页通讯录列表  pages/user/aidedperson/AidedpersonIndex
    {path: '/aideddetail/:id', name: 'aideddetail', meta: {auth: true},component: resolve => require(['@/pages/user/aidedperson/aided_detail'],resolve)},//受助人详细信息  aidedperson/aided_detail
    {path: '/aidedmodify/:id', name: 'aidedmodify', meta: {auth: true},component: resolve => require(['@/pages/user/aidedperson/aided_modify'],resolve)},//修改受助人信息  user/aidedperson/aided_modify
    {path: '/aidedaddress/:id', name: 'aidedaddress', meta: {auth: true},component: resolve => require(['@/pages/user/aidedperson/aided_address'],resolve)},//地址管理   pages/user/aidedperson/aided_address
    {path: '/aidedAddressList', name: 'aidedAddressList', meta: {auth: true},component: resolve => require(['@/pages/user/aidedperson/aided_address_List'],resolve)},//地址列表（发布需求时使用）   pages/user/aidedperson/aided_address_List
    {path: '/aidedbank/:id', name: 'aidedbank', meta: {auth: true},component: resolve => require(['@/pages/user/aidedperson/aided_bank'],resolve)},//银行信息管理   pages/user/aidedperson/aided_bank
    // 项目详情
    {path: '/projectDetails', name: 'projectDetails', component: resolve => require(['@/pages/projectDetails/projectDetails'],resolve)}, // pages/projectDetails/projectDetails
    {path: '/togetherDonationFoot', name: 'togetherDonationFoot', component: resolve => require(['@/pages/projectDetails/togetherDonationFoot'],resolve)},  //pages/projectDetails/togetherDonationFoot
    {path: '/projectDialog', name: 'projectDialog',component: resolve => require(['@/pages/projectDetails/projectDialog'],resolve)},    //pages/projectDetails/projectDialog
    {path: '/helpHe/:id/:donatorName', name: 'helpHe', component: resolve => require(['@/pages/home/loveNeed/inside/helpHe'],resolve)},  //pages/home/loveNeed/inside/helpHe
    {path: '/helpHeGoods/:id/:donatorName',name: 'helpHeGoods', component: resolve => require(['@/pages/home/loveNeed/inside/helpHeGoods'],resolve)},  //帮助他--物品 pages/home/loveNeed/inside/helpHeGoods
    {path: '/helpHeGoodsDetail/:id/:helppattern', name: 'helpHeGoodsDetail',component: resolve => require(['@/pages/home/loveNeed/inside/helpHeGoodsDetail'],resolve)}, //帮助他--物品-查看需求状态详情
    {path: '/helpHeWriteExp/:id/:demandId/:type', name: 'helpHeWriteExp',component: resolve => require(['@/pages/home/loveNeed/inside/helpHeWriteExp'],resolve)}, //帮助他--物品-填写快递信息  pages/home/loveNeed/inside/helpHeWriteExp
    // 荣誉证书
    {path: '/certificate', name: 'certificate', component: resolve => require(['@/pages/home/loveNeed/inside/certificate'],resolve)}, //home/loveNeed/inside/certificate
    // 机构详情
    {path: '/organDetails', name: 'organDetails', component: resolve => require(['@/pages/organDetails/organDetails'],resolve)}, //pages/organDetails/organDetails
    // 03-爱心帮扶\01-证明列表 
    {path: '/thatList', name: 'thatList', component: resolve => require(['@/pages/loveHelp/thatList'],resolve)},   //pages/loveHelp/thatList
    // 03-爱心帮扶\我来证明
    {path: '/iToProve/:id', name: 'iToProve',  meta: {auth: true},component: resolve => require(['@/pages/loveHelp/iToProve'],resolve)},   //loveHelp/iToProve
    {path:"/proveintroduction",name:"proveintroduction",component: resolve => require(['@/pages/loveHelp/prove_introduction'],resolve)},  //pages/loveHelp/prove_introduction
    {path: '/poverty/:id', name: 'poverty', component: resolve => require(['@/pages/loveHelp/poverty'],resolve)},  //pages/loveHelp/poverty
    {path: '/success', name: 'success', component: resolve => require(['@/pages/loveHelp/success'],resolve)}, //  pages/loveHelp/success
    {path: '/about', name: 'about', component: resolve => require(['@/pages/Third_party/about'],resolve)}, 
    // 系统消息
    // 系统消息
    // 7消息---爱心反馈、系统消息
    {
      path: '/message',
      name: 'message',
      meta: {auth: true},
      component: resolve => require(['@/pages/systemMessage/message'],resolve), //pages/systemMessage/message
      children: [
        {path: 'statusList', name: 'statusList', component: resolve => require(['@/pages/systemMessage/statusList'],resolve), meta: {auth: true}}, //pages/systemMessage/statusList
        {path: 'personalStatus', name: 'personalStatus', component: resolve => require(['@/pages/systemMessage/personalStatus'],resolve)}, //pages/systemMessage/personalStatus'
      ]
    },
    {path: '/loveStatus', name: 'loveStatus', component: resolve => require(['@/pages/systemMessage/loveStatus'],resolve)},   //pages/systemMessage/loveStatus
    // 8消息详情1
    {path: '/messageDetails', name: 'messageDetails', component: resolve => require(['@/pages/systemMessage/messageDetails'],resolve)}, //messageDetails
    // 扶贫干部工作台
    {path: '/homeWork', name: 'homeWork',  meta: {auth: true},component: resolve => require(['@/pages/work/homeWork'] ,resolve)},
    {path: '/toExamine/:id', name: 'toExamine', component: resolve => require(['@/pages/work/toExamine'] ,resolve)},
    {path: '/regionList', name: 'regionList', component: resolve => require(['@/pages/work/regionList'] ,resolve), meta: {auth: true}},  //pages/work/regionList
    {path: '/helpManage', name: 'helpManage',  component: resolve => require(['@/pages/work/manages/helpManage'] ,resolve)},//扶贫干部管理入口  pages/work/manages/helpManage
    {path: '/leaderSearch', name: 'leaderSearch', component: resolve => require(['@/pages/work/manages/leaderSearch'] ,resolve), meta: {auth: true}}, //扶贫干部查询 work/manages/leaderSearch
    {path: '/leaderManage', name: 'leaderManage', component: resolve => require(['@/pages/work/manages/leaderManage'] ,resolve)}, // 扶贫干部管理  leaderManage
    {path: '/leaderVerify/:id', name: 'leaderVerify', component: resolve => require(['@/pages/work/manages/leaderVerify'] ,resolve), meta: {auth: true}}, // 扶贫干部审核页  leaderVerify
    {path: '/waitCheckDemand', name: 'waitCheckDemand', component: resolve => require(['@/pages/work/demand/waitCheckDemand'] ,resolve), meta: {auth: true}}, // 扶贫干部-待审核需求列表页  demand/waitCheckDemand
    {path: '/noContent', name: 'noContent', component: resolve => require(['@/pages/work/demand/noContent'] ,resolve), meta: {auth: true}}, // 扶贫干部-待审核需求列表页  noContent
    {path: '/waitCheckShow/:id', name: 'waitCheckShow',  component: resolve => require(['@/pages/work/demand/waitCheckShow'] ,resolve), meta: {auth: true}}, // 扶贫干部-待审核需求列表页  waitCheckShow
    {path: '/waitCheckNotPass', name: 'waitCheckNotPass',  component: resolve => require(['@/pages/work/demand/waitCheckNotPass'] ,resolve), meta: {auth: true}}, // 扶贫干部-待审核需求列表页 waitCheckNotPass
    {path: '/waitCheckThrough/:id', name: 'waitCheckThrough', component: resolve => require(['@/pages/work/demand/waitCheckThrough'] ,resolve), meta: {auth: true}}, // 扶贫干部-审核不通过列表页  waitCheckThrough
    {path: '/waitCheckNeeds/:id/:num', name: 'waitCheckNeeds',component: resolve => require(['@/pages/work/demand/waitCheckNeeds'] ,resolve), meta: {auth: true}}, // 扶贫干部-我管理的需求列表页  waitCheckNeeds
    {path: '/waitCheckAdopt/:id', name: 'waitCheckAdopt', component: resolve => require(['@/pages/work/demand/waitCheckAdopt'] ,resolve), meta: {auth: true}}, // 扶贫干部-审核通过列表页  waitCheckAdopt
    {path: '/notpass/:id', name: 'notpass', component: resolve => require(['@/pages/work/demand/notpass'] ,resolve)}, // 扶贫干部-不通过原因需求列表页   notpass
    {path: '/allStatus/:id', name: 'allStatus', component: resolve => require(['@/pages/work/demand/needsSubcomponent/allStatus'] ,resolve)}, // 审核下各种状态需求的详情   needsSubcomponent/allStatus
    {path: '/registration', name: 'registration', component: resolve => require(['@/pages/work/demand/registration'] ,resolve)}, // 管理员工作台页面  registration
    //我管理的需求
    {path: '/myManagementNeeds', name: 'myManagementNeeds', component: resolve => require(['@/pages/work/myManagementNeeds/myManagementNeeds'] ,resolve), meta: {auth: true}}, // 我管理的需求分类页面  work/myManagementNeeds/myManagementNeeds
    {path: '/myManagement_list/:typeCode', name: 'myManagement_list', component: resolve => require(['@/pages/work/myManagementNeeds/myManagement_list'] ,resolve), meta: {auth: true}}, // 我管理的需求分类列表页 myManagementNeeds/myManagement_list
    {path: '/myManagement_capital/:demandId', name: 'myManagement_capital', component: resolve => require(['@/pages/work/myManagementNeeds/myManagement_capital'] ,resolve)}, // 我管理的需求详情页  myManagement_capital
    {path: '/myManagement_goods/:demandId', name: 'myManagement_goods', component: resolve => require(['@/pages/work/myManagementNeeds/myManagement_goods'] ,resolve)}, // 我管理的需求详情页  myManagement_goods
    {path: '/loveFeedback/:demandId', name: 'loveFeedback', component: resolve => require(['@/pages/work/myManagementNeeds/loveFeedback'] ,resolve)}, // 我管理的需求爱心反馈页面  loveFeedback
    {path: '/LoveFeedbackRelease', name: 'LoveFeedbackRelease', component: resolve => require(['@/pages/work/myManagementNeeds/LoveFeedback_release'] ,resolve)}, // 我管理的需求爱心反馈页面  LoveFeedback_release
    {path: '/thankFeedback/:demandId', name: 'thankFeedback',component: resolve => require(['@/pages/work/myManagementNeeds/thankFeedback'] ,resolve)}, // 我管理的需求感谢回馈页面  thankFeedback
    {path: '/viewlovefeedback/:demandId', name: 'viewlovefeedback', component: resolve => require(['@/pages/work/myManagementNeeds/viewlovefeedback'] ,resolve)}, // 我管理的需求查看感谢回馈页面  viewlovefeedback


  // 网络异常提示页面
{path: '/networkError', name: 'networkError',component: resolve => require(['@/components/error/network'] ,resolve)},  //components/error/network

  



  ]
})