import { getToken, setToken, removeToken } from '@/utils/auth'
import request from '@/utils/request'
const user = {
  state: {
    token: '',
    avatar: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    is_cadre: '1',
    is_certification: '1',
    login_name: '',
    mobile: '',
    nick_name: '',
    org_name: '',
    org_type: '',
    organ_id: '',
    leaderarrs: [],
    leaderLevel: '',
    wait: 0,
    admin: 0,
    tok: '11',
    idx:[],
    is_celebrity:'',
    userid:'',
    real_name:''
  },

  mutations: {
    SET_CELEBRITY: (state, is_celebrity) => {
      state.is_celebrity = is_celebrity
    },
    SET_LEADER: (state, leaderLevel) => {
      state.leaderLevel = leaderLevel
    },
    SET_IDX: (state, idx) => {
      state.idx = idx
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NICK_NAME: (state, nick_name) => {
      state.nick_name = nick_name
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_LOGIN_NAME: (state, login_name) => {
      state.login_name = login_name
    },
    SET_REAL_NAME: (state, real_name) => {
      state.real_name = real_name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_WAIT: (state, wait) => {
      state.wait = wait
    },
    SET_ADMIN: (state, admin) => {
      state.admin = admin
    },
    SET_USERID: (state, userid) => {
      state.userid = userid
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        request.post('uts/user/login', { name: username, pass: userInfo.password }).then(res => {
          if(res.user.is_cadre === null || res.user.is_cadre === 2 || res.user.is_cadre === 0 ){
            resolve(1)
          }else if(Number(res.user.f_user_status) === 0){
            resolve(2)
          }else{
            commit('SET_TOKEN', res.logintoken)// 请求用token
            // commit('SET_TOKEN', res.ccbToken)// 请求用token
            setToken(res.refreshtoken)// 刷新用长token
            resolve(true)
          }
        }).catch(error => {
        	console.log(error)
        })
      })
    },
    //快读登录
    LoginByUsernamePhone({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
          console.log('userInfo',userInfo)
        request.post('uts/user/fastLogin', {mobile: userInfo.phone,ywNo:userInfo.ywNo,code:userInfo.icode}).then(res => {
          if(res.user.is_cadre === null || res.user.is_cadre === 2 || res.user.is_cadre === 0 ){
            resolve(1)
          }else if(Number(res.user.f_user_status) === 0){
            resolve(2)
          }else{
            commit('SET_TOKEN', res.logintoken)// 请求用token
            // commit('SET_TOKEN', res.ccbToken)// 请求用token
            setToken(res.refreshtoken)// 刷新用长token
            resolve(true)
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        request.post('uts/user/detail').then(response => {
          commit('SET_LOGIN_NAME', response.login_name)
          commit('SET_USERID', response.id)
          commit('SET_MOBILE', response.mobile)
          commit('SET_NICK_NAME', response.nick_name)
          commit('SET_AVATAR', response.user_pic)
          commit('SET_LEADER', response.user_level)
          commit('SET_IDX', response.region_ids)
          commit('SET_CELEBRITY', response.is_celebrity)
          commit('SET_REAL_NAME', response.realname)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        request.post('uts/user/logout', { loginToken: this.token, refreshToken: getToken() }).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
