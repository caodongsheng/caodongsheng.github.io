import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '系统首页',
        meta: { title: '系统首页', icon: 'table', noCache: true }
      }
    ]
  },

  {
    path: '/signIn',
    component: () => import('@/views/signIn/signIn'), // Parent router-view
    name: 'signIn',
    hidden: true,
    meta: { title: '注册' }
  },
  {
    path: '/commit',
    component: () => import('@/views/signIn/commit'),
    name: 'commit',
    hidden: true,
    meta: { title: '提交完成' }
  },
  {
    path: '/noPass',
    component: () => import('@/views/signIn/noPass'),
    name: 'noPass',
    hidden: true,
    meta: { title: '审核不通过' }
  },
  {
    path: '/applyFor',
    component: () => import('@/views/signIn/applyFor'),
    name: 'applyFor',
    hidden: true,
    meta: { title: '申请' }
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  /** When your routing table is too long, you can split it into small modules**/

  {
    path: '/bi',
    component: Layout,
    name: 'bi',
    meta: {
      title: 'bi',
      noCache:true
    },
    children: [
      {
        path: 'bi',
        component: () => import('@/components/bi'), // Parent router-view
        name: 'bi',
        meta: { title: '数据统计（ BI ）',icon: 'bi' ,noCache:true}
      },
    ]
  },

  {
    path: '/help',
    component: Layout,
    redirect: 'demandCheckList',
    meta: { title: '对接需求管理', icon: 'duijie' },
    children: [
      {
        path: 'demandCheckList',
        component: () => import('@/views/help/demandCheckList'), // Parent router-view
        name: 'demandCheckList',
        meta: { title: '待村级审核'}
      },
      {
        path: 'demandResult',
        component: () => import('@/views/help/demandResult'), // Parent router-view
        name: 'demandResult',
        meta: { title: '待管理员终审',roles: ['4','5','6']}
      },
      {
        path: 'demandManagerList',
        name: 'demandManagerList',
        component: () => import('@/views/help/demandManagerList'),
        meta: { title: '我管理的需求' }
      },
    ]
  },
  
  {
    path: '/helpxx',
    component: Layout,
    redirect: 'hbh',
    name: 'helpxx',
    meta: {
      title: '线下对接管理',
      icon: 'xxdj',
    },
    children: [
      {
        path: 'hbh',
        component: () => import('@/views/mutualHelp/helpList'),
        name: 'hbh',
        // meta: { title: '户帮户亲帮亲查询',icon: '',noCache:true,roles: ['2','3'] },
        meta: { title: '户帮户亲帮亲查询',icon: '',noCache:true}
      },
    ]
  },
  
  {
    path: '/poor',
    component: Layout,
    meta: { title: '受助人管理', icon: 'shouzhuren'},
    children: [
      {
        path: 'mypoorList',
        name: 'mypoorList',
        component: () => import('@/views/poor/poorList'),
        meta: { title: '我的受助人'}
      },
      {
        path: 'poorList2',
        name: 'poorList2',
        component: () => import('@/views/poor/poorList2'),
        meta: { title: '我的管理区域' }
      },
      {
        path: 'editPoorlist',
        name: 'editPoorlist',
        component: () => import('@/views/poor/editPoorlist'),
        meta: { title: '受助人详情' },
        hidden: true
      },
    ]
  },
  // {
  //   path: '/recommend',
  //   component: Layout,
  //   meta: { roles: ['3', '2'] },
  //   children: [
  //     {
  //       path: 'recomDemand',
  //       name: 'recomDemand',
  //       component: () => import('@/views/recommend/recomDemand'),
  //       meta: { title: '推荐需求', icon: 'form', noCache: true, roles: ['3', '2'] }
  //     },
  //     {
  //       path: 'recomEdit:id',
  //       name: 'recomEdit',
  //       component: () => import('@/views/recommend/recomEdit'),
  //       meta: { title: '推荐需求编辑', roles: ['3', '2']},
  //       hidden: true
  //     },
  //     {
  //       path: 'recomAdd',
  //       name: 'recomAdd',
  //       component: () => import('@/views/recommend/recomAdd'),
  //       meta: { title: '推荐需求添加', icon: 'form', roles: ['3', '2'] },
  //       hidden: true
  //     }
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    meta: { title: '用户管理', icon: 'yonghu'},
    children: [
      {
        path: 'userDetial:id',
        name: 'userDetial',
        component: () => import('@/views/user/userDetial'),
        meta: { title: '用户信息', icon: 'user' },
        hidden: true
      },
      {
        path: 'userRegistered',
        name: 'userRegistered',
        component: () => import('@/views/user/userRegistered'),
        meta: { title: '注册用户管理',  },

      },
      {
        path: 'loveRegistered',
        name: 'loveRegistered',
        component: () => import('@/views/user/loveRegistered'),
        meta: { title: '爱心人士首次关注',  },

      },
      {
          path: 'invitationCode',
          name: 'invitationCode',
          component: () => import('@/views/invitation/invitationCode'),
          meta: { title: '邀请码数据查询', },
      },
      {
        path: 'invitationCodeDetail',
        name: 'invitationCodeDetail',
        component: () => import('@/views/invitation/invitationCodeDetail'),
        meta: { title: '邀请码详情', icon: 'user' },
        hidden: true
      }
    ]
  },
//  {
//  path: '/zdemo',
//  component: Layout,
//  children: [
//    {
//      path: 'editInputHang',
//      name: 'editInputHang',
//      component: () => import('@/views/zdemo/editInputHang'),
//      meta: { title: 'demo', icon: 'form' },
//
//    }
//  ]
//},
//{
//  path: '/user',
//  component: Layout,
//  redirect: 'userRegistered',
//  name: 'user',
//  meta: {
//    title: '用户中心',
//    icon: 'nested'
//  },
//  children: [
//    {
//      path: 'userRegistered',
//      component: () => import('@/views/user/userRegistered'), // Parent router-view
//      name: 'userRegistered',
//      meta: { title: '注册用户管理' }
//    },
//    {
//      path: 'managerCheckList',
//      component: () => import('@/views/manager/managerCheckList'),
//      name: 'managerCheckList',
//      meta: { title: '扶贫干部审核' }
//    }
//  ]
//},

  {
    path: '/manager',
    component: Layout,
    redirect: 'managerList',
    name: 'manager',
    meta: {
      title: '扶贫干部管理',
      icon: 'ganbu',
    },
    children: [
      {
        path: 'managerList',
        component: () => import('@/views/manager/managerList'), // Parent router-view
        name: 'managerList',
        meta: { title: '扶贫干部查询', }
      }

      // {
      //   path: 'managerCheckList',
      //   component: () => import('@/views/manager/managerCheckList'),
      //   name: 'managerCheckList',
      //   meta: { title: '扶贫干部审核',icon: 'manager', roles: ['3', '2', '4','1'] }
      // }
    ]
  },
  {
    path: '/operates',
    component: Layout,
    redirect: 'banners',
    meta: { title: '运营管理', icon: 'ganbu',roles: ['1','5','8'] },
    children: [
      {
        path: 'banners',
        component: () => import('@/views/operate/banner'), // Parent router-view
        name: 'banners',
        meta: { title: 'Banner位配置' }
      },
      {
        path: 'recommend',
        component: () => import('@/views/operate/recommend'), // Parent router-view
        name: 'recommend',
        meta: { title: '栏目配置' }
      },
      {
        path: 'recomList',
        component: () => import('@/views/operate/recomList'), // Parent router-view
        name: 'recomList',
        meta: { title: '需求推荐列表'},
        hidden: true
      },
    ]
  },
  {
    path: '/qy',
    component: Layout,
    redirect: 'qingying',
    name: 'qy',
    meta: {
      title: '就业帮扶模块',
      icon: 'jybf',
    },
    children: [
      {
        path: 'qingying',
        component: () => import('@/components/qingying'),
        name: 'qingying',
        meta: { title: '青鹰职位管理',noCache:true }
      },
      
    ]
  },
  {
    path: '/cms',
    component: Layout,
    name: 'cms',
    meta: {
      title: 'cms',
      noCache:true
    },
    children: [
      {
        path: 'cms',
        component: () => import('@/components/cms'), // Parent router-view
        name: 'cms',
        meta: { title: '扶贫展示文章管理',icon: 'wzgl' ,noCache:true}
      },
    ]
  },
  {
    path: '/supermarket',
    component: Layout,
    name: 'supermarket',
    meta: {
      title: 'supermarket',
      noCache:true
    },
    children: [
      {
        path: 'supermarket',
        component: () => import('@/components/supermarket'), // Parent router-view
        name: 'supermarket',
        meta: { title: '爱心超市',icon: 'axcsss' ,noCache:true}
      },
    ]
  },
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/errorLog/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name: 'EelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
