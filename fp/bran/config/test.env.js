'use strict'
// const merge = require('webpack-merge')
// const devEnv = require('./dev.env')

// module.exports = merge(devEnv, {
//   NODE_ENV: '"testing"'
// })
module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"test"',
  BASE_API: '"https://pretech.zgshfp.com.cn/"',//接口地址
  WX_HOST:'"https://prewx.zgshfp.com.cn/gzddpt/index.html?"',
  WX_MCHTYPE:'"wx_shfpbf"',
  QKL_URL:'"https://bc.shfp1017.org.cn"',
  CMS_URL: '"https://news.m.shfp1017.org.cn/"',
  EX_URL: '"https://by.zgshfp.com.cn/app/Billboard.html"',//榜样
  PJ_URL: '"https://predjres.zgshfp.com.cn/"',//支付前缀
  DJRES_URL: '" https://predjres.zgshfp.com.cn/"',//关于我们等
  ZHISHAN_URL: '"https://prewx.zgshfp.com.cn/m/"',//至善分地址
  DJRES_URL_DEV: '"https://predjres.zgshfp.com.cn/"',//关于我们等
  SHOP_URL: '"https://shop.m.fpmai.com/"',// 商城地址
  BASE_URL: '"https://www.zgshfp.com.cn/"',
  H5PAY_URL: '"https://prewx.zgshfp.com.cn/gzddpt/"',   //微信分享图片前缀
  NEWS_PATH:'"https://news.m.zgshfp.com.cn/wap_news/gz/index.html"',//地方咨询地址

  LO_URL:'"https://by.fpmai.com/app"',   //榜样爱心热度、我的积分、任务与勋章
  DT_QKL: '"2"', //一起捐员工排行区块链   1是正式环境，2是测试环境
  WX_URL: '"https://prewx.zgshfp.com.cn"',
  anonymousUserid:'1139207016'
}
