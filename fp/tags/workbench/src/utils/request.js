import axios from 'axios'
import { Message,Loading } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import qs from 'qs'
import router from '../router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // baseURL: "http://tech.zgshfp.com.cn/",
  timeout: 10000 // request timeout
})
let tokenLock = false
let loadingInstance
//let randomnum = ""
// request interceptor
service.interceptors.request.use(config => {
  //store.commit('updateLoadingStatus', {isLoading: true})
  if(config.url!="eai/authRegion/selectDate"){
  loadingInstance= Loading.service();
 // randomnum = randomWord(false,43);
  config.headers['Authorization'] = store.state.user.token
  // 以下是要求的请求头设置
  config.headers.channelID = 'zgshfpw';
  config.headers.msgType = config.url;
  config.headers.clientType = '4' // work,工作台
  }
  //config.data.token = randomnum;
  // }
  // 以下默认post请求转为URL格式，除非指定了Content-Type
  if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json;charset=UTF-8' && config.headers['Content-Type'] !== 'application/json') {
    config.data = qs.stringify(config.data)// 转换为url形式，防止post请求参数无法传到后台
  }
  return config
}, error => {
  //store.commit('updateLoadingStatus', {isLoading: false})
  loadingInstance.close();
  //randomnum = randomWord(false,43);
  Message.error({ message: '请求超时!' })
  Promise.reject(error)
})
function randomWord(randomFlag, min, max){
  let str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if(randomFlag){
      range = Math.round(Math.random() * (max-min)) + min;
  }
  for(let i=0; i<range; i++){
      pos = Math.round(Math.random() * (arr.length-1));
      str += arr[pos];
  }
  return str;
}
// respone interceptor
service.interceptors.response.use((response) => {
 // store.commit('updateLoadingStatus', {isLoading: false})
 loadingInstance.close();
  const res = response.data
  const config = response.config // 保存原请求
  // console.log("endhttp")
  //randomnum = randomWord(false,43);
  if (res.code.indexOf('-1') >= 0) {
    const err = new Error(res.msg)
    err.code = res.code
    Message({
      message: err.message,
      type: 'error',
      duration: 4 * 1000
    })
    return Promise.reject(err)
  } else {
    const code = res.code.substring(res.code.length - 5)
    // console.log('请求了')
    if (code === 'I0000') {
      return res.data
    } else if (code === '10105') { // token校验失败或失效
      // 如果当前请求是重置token,即重置token时因长token过期而失败，则删除longToken
      if (config.url.endsWith('user/refreshToken')) {
        removeToken()
        return null
      }
      if (getToken()) {
        if (!tokenLock) {
          tokenLock = true
          const longToken = { 'token': getToken() }
          // 去获取新的token
          return service.post('uts/user/refreshToken', longToken).then((response) => {
            if(response){
            // 保存新的token
             console.log('保存token：' + response)
            store.commit('SET_TOKEN', response)
            // 重新调用原请求
            config.headers.Authorization = store.getters.token
            tokenLock = false
            return axios(config).then((response) => {
              return response.data.data
            }).catch((err) => { // 调用失败
              return Promise.reject(err)
            })
          }
          else{
            tokenLock = false
            router.push('/login')
          }
          }).catch(() => { // 更新token失败，重定向到登录login
            tokenLock = false
            // this.$router.push('/login')
          })
        } else {
         //  this.$router.push('/login')
        }
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
    } else {
      const err = new Error(res.msg)
      err.code = res.code
      Message({
        message: err.message,
        type: 'error',
        duration: 4 * 1000
      })
      return Promise.reject(res)
    }
  }
},
error => {
  //store.commit('updateLoadingStatus', {isLoading: false})
  loadingInstance.close();
  //randomnum = randomWord(false,43);
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})
function checkToken(resolve, reject) {
  let p = new Promise(function(resolve, reject) {
    if (tokenLock) {
      setTimeout(function() {
        checkToken().then(resolve)
      }, 500)
    } else {
      resolve()
    }
  })
  return p
}

export default service
