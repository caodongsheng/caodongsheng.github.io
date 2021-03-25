'use strict'
// const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   ENV_CONFIG: '"dev"',
//   BASE_API: '"http://dev2.fpmai.com/"'
// })

module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_API: '"https://dev2.fpmai.com/"',//接口地址
  WX_HOST:'"https://wx.fpmai.com/gzddpt/index.html?"',
  WX_MCHTYPE:'"wx_byba"',
  QKL_URL:'"https://bc.fp1017.org.cn"',
  CMS_URL: '"https://news.m.shfp1017.org.cn/"',
  EX_URL: '"https://by.zgshfp.com.cn/app/Billboard.html"',//榜样
  PJ_URL: '"https://www.fpmai.com/"',//支付前缀
  DJRES_URL: '"https://djres.fpmai.com/"',//关于我们等
  DJRES_URL_DEV: '"http://djres.fpmai.com/"',//个人中心全国信息
  ZHISHAN_URL: '"https://wx.fpmai.com/m/"',//至善分地址
  SHOP_URL: '"https://shop.m.fpmai.com/"',// 商城地址
  BASE_URL: '"https://www.zgshfp.com.cn/"',
  H5PAY_URL: '"https://wx.fpmai.com/wx/"',   //微信分享图片前缀
  NEWS_PATH:'"https://news.m.zgshfp.com.cn/wap_news/gz/index.html"',//地方咨询地址
  LO_URL:'"https://by.fpmai.com/app"',   //榜样爱心热度、我的积分、任务与勋章
  DT_QKL: '"2"', //一起捐员工排行区块链   1是正式环境，2是测试环境
  WX_URL: '"https://wx.fpmai.com"',
  anonymousUserid:'4239896815',
  userImg:'"http://res.fpmai.com/upload/shfp/user/"'
}
