'use strict'
// const merge = require('webpack-merge')
// const devEnv = require('./dev.env')

// module.exports = merge(devEnv, {
//   NODE_ENV: '"testing"'
// })
module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"test"',
  BASE_API: '"https://tech.shfp1017.org.cn/"',//接口地址
  WX_HOST:'"https://wx.shfp1017.org.cn/gzddpt/index.html?"',
  WX_MCHTYPE:'"wx_zcx"',
  WX_APPID:"'wx1e3dbb1aad55a4e2'",//灰度1017众善
  QKL_URL:'"https://bc.fp1017.org.cn"',
  CMS_URL: '"https://news.m.shfp1017.org.cn/?platform=app"',
  EX_URL: '"https://by.zgshfp.com.cn/app/Billboard.html"',//榜样
  PJ_URL: '"https://www.fpmai.com/"',//旧评价地址
  DJRES_URL: '"https://djres.zgshfp.com.cn/"',//关于我们等
  ZHISHAN_URL: '"https://wx.fpmai.com/m/"',//至善分地址
  SHOP_URL: '"https://shop.m.fpmai.com/"',// 商城地址
  BASE_URL: '"https://www.shfp1017.org.cn/"',  //微信授权
  WXAPPID: '"wx1e3dbb1aad55a4e2"',
  H5PAY_URL: '"https://wx.shfp1017.org.cn/gzddpt/"',   //微信分享图片前缀
  NEWS_PATH:'"https://news.m.zgshfp.com.cn/wap_news/gz/index.html"',//地方咨询地址
  LO_URL:'"https://by.fpmai.com/app"',   //榜样爱心热度、我的积分、任务与勋章
  DT_QKL: '"2"', //一起捐员工排行区块链   1是正式环境，2是测试环境
  // BASE_API: '"http://tech.zgshfp.com.cn/"'
  WX_URL: '"https://wx.shfp1017.org.cn"',
  XFFP_URL: '"http://103.126.126.119:8077/"'
}
