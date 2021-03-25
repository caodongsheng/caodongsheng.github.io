import axios from 'axios'
import qs from 'qs'
import router from '../router'
import Vue from 'vue'
import store from '../store/index'
// axios.defaults.baseURL = 'http://hts.eap2.net/'

let instance = axios.create({

  // baseURL: 'http://www.fp1017.org.cn/',
 // baseURL: 'http://tech.zgshfp.com.cn/',
  baseURL: process.env.BASE_API,
 //  baseURL: process.env.BASE_API,
  // baseURL: 'http://hts.eap2.net/',
  timeout: 30000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  // 用来处理刷新token后重新请求的自定义变量
  isRetryRequest: false
})
// qs是一个npm仓库所管理的包,可通过npm install qs命令进行安装.
// 1. qs.parse()将URL解析成对象的形式
// qs.stringify()将对象 序列化成URL的形式，以&进行拼接

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  store.commit('updateLoadingStatus', {isLoading: true})
  // 对响应数据做些事 // 在发送请求之前做些什么
  // 以下默认post请求转为URL格式，除非指定了Content-Type
  // Vue.$vux.loading.show({
  //   text: '加载中...'
  // })
  if (config.url === 'mts/check/checkSmsCode') {
    config.headers['Content-Type'] = 'application/json'
  }
  if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json') {
    config.data = qs.stringify(config.data)// 转换为url形式，防止post请求参数无法传到后台
  }

  config.headers.Authorization = localStorage.getItem('token') || null
  // 以下是要求的请求头设置
  config.headers.channelID = 'zgshfpw'
  config.headers.msgType = config.url

  config.headers.clientType = '3'// weixin

  return config
}, function (err) {
  // 请求错误时做些事
 setTimeout(() => {
    // Vue.$vux.loading.hide();
    store.commit('updateLoadingStatus', {isLoading: false})
    Vue.$vux.toast.show({
      position: 'middle',
      width: '20em',
      type: 'text',
      text: '加载超时，请检查网络是否正常！'
    }) },3000)
  return Promise.reject(err)
})
let tokenLock = false

// 拦截响应response，并做一些错误处理
instance.interceptors.response.use((response) => {
  //Vue.$vux.loading.hide()
  store.commit('updateLoadingStatus', {isLoading: false})
  // 对响应数据做点什么
  const data = response.data

  let _this = this
  // 根据返回的code值来做不同的处理（和后端约定）
  const code = data.code.substring(data.code.length - 5)
  switch (code) {
    case 'I0000':
      return data
    
    case '10105':// token校验失败或失效
      let config = response.config // 保存原请求
      // 如果当前请求是重置token,即重置token时因长token过期而失败，则删除longToken
      if (config.url.endsWith('user/refreshToken')) {
        localStorage.removeItem('longToken')
        localStorage.removeItem('token')
        return null
      }
      if (localStorage.getItem('longToken')) { // 如果有longToken，重置token
        if (!tokenLock) {
          tokenLock = true
          let longToken = { 'token': localStorage.getItem('longToken') }
          // 去获取新的token
          return instance.post('uts/user/refreshToken', longToken).then((response) => {
            // 保存新的token
            window.localStorage.setItem('token', response.data)
            // 重新调用原请求
            config.headers.Authorization = localStorage.getItem('token')
            tokenLock = false
            return axios(config).then((response) => {
              return response.data
            }).catch((err) => { // 调用失败
              return Promise.reject(err)
            })
          }).catch((err) => { // 更新token失败，重定向到登录login
            tokenLock = false
            router.push('/login')
          })
        } else {
          // 如果有并发请求，在锁定时，调用checkToken，直到解锁后，执行原请求
          return checkToken().then((aa) => {
            axios(config).then((response) => {
              return response.data
            }).catch((err) => { // 调用失败
              return Promise.reject(err)
            })
          })
        }
      } else { // 没有longToken则登录
        router.push('/login')
      }
      break
   
    default:
      if (code.endsWith('-1')) {
        Vue.$vux.toast.show({
          position: 'middle',
          width: '20em',
          type: 'text',
          text: '网络异常，请稍后重试！'
        })
      }

      const err = new Error(data.msg)
      err.code = code
      if(err.code==="O2007"){
        err.msg = "请勿频繁点击!"
      }
      else{
        err.msg = data.msg
      }
      err.data = data.data
      return Promise.reject(err)
    //return data
  }
}, (err) => { // 这里是返回状态码不为200时候的错误处理

  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
    }
  } else {
    err.message = '当前网络不可用！'
  }
  setTimeout(() => {
    //Vue.$vux.loading.hide()
    store.commit('updateLoadingStatus', {isLoading: false})
    Vue.$vux.toast.show({
      position: 'middle',
      width: '20em',
      type: 'text',
      text: err.message
    })
  },1000)

  return Promise.reject(err)
})

function checkToken(resolve, reject) {
  var p = new Promise(function (resolve, reject) {
    if (tokenLock) {
      setTimeout(function () {
        checkToken().then(resolve)
      }, 500)
    } else {
      resolve()
    }
  })
  return p
}
// checkToken().then(data => { console.log(data) })
export default instance
