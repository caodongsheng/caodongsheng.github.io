import * as types from './mutation-types.js'
import addressjson from './address.json'

export default {
  nameAsyn ({commit}, {age, name, history, capital_list}) {
    commit(types.SET_NAME, name)
    commit(types.SET_AGE, age)
    commit(types.SET_HISTORY, history)
  },
  changeCapitalList ({commit}, _this) {
    _this.$http.post('hts/record/capitals', {
      'page': 1
    })
      .then(function (response) {
        if (typeof response.data === 'object') {
          commit('SET_CAPITAL_LIST', response.data.list)
        } else {
          // 。。
        }
      })
  },
  changeGoodsList ({commit}, _this) {
    _this.$http.post('hts/record/goodss', {
      'page': 1
    })
      .then(function (response) {
        if (typeof response.data === 'object') {
          commit('SET_GOOD_LIST', response.data.list)
        } else {
          // alert(response.msg)
        }
      })
  },
  getAidedPersonDetail ({commit}, _this) {
    return  _this.$http.post('hts/poor/detail', {
      'aidedId': _this.$route.params.id
    })
      .then(function (response) {
        if (typeof response.data === 'object') {
          commit('SET_AIDEDPERSON_DETAIL', response.data)
        }
      })

  },
  getCapitalDetail ({commit}, _this) {
    _this.$http.post('hts/record/capital', {
      'povertyCode': _this.$route.params.id
    })
      .then(function (response) {
        if (typeof response.data === 'object') {
          commit('SET_CAPITAL_DETAIL', response.data)
        }
      })
  },
  getGoodDetail ({commit}, _this) {
    _this.$http.post('hts/record/goods', {
      'povertyCode': _this.$route.params.id
    })
      .then(function (response) {
        if (typeof response.data === 'object') {
          commit('SET_GOOD_DETAIL', response.data)
        } else {
          // alert(response.msg)
        }
      })
  },
  getAidedPersonList ({commit}, _this) {
    _this.$http.post('hts/poor/search', _this.postdata === null ? {} : _this.postdata)
      .then(function (response) {
        if (typeof response.data === 'object') {
          commit('SET_AIDEDPERSON_LIST', response.data)
        } else {
          // alert(response.msg)
        }
      })
  },
  getInviteList ({commit}, _this) {
    _this.$http.post('uts/user/inviteList', {})
      .then(function (response) {
        if (response.msg === '请求成功') {
          commit('SET_VISITE_LIST', response.data)
        } else {
          // alert(response.msg)
        }
      })
  },
  getCertificate ({commit}, _this) {
    console.log(_this)
    _this.$http.post('hts/record/certificate', _this.postadata)
      .then((response) => {
        if (response.msg === '请求成功') {
          commit('SET_CERTIFICATE', response.data)
        } else {

        }
      })
  },
  changeshowlist({commit},obj){
    commit('CHANGE_SHOWLIST', obj)
  },
  getRegionListById ({commit}, oj) {
    let id = oj.id
    let type = oj.type
    let callackfun = oj.callackfun
    let _this = oj.owner
    _this.$http.post('eai/authRegion/selectDate', {'parentId': id})
      .then(function (response) {
        if (response.msg === '请求成功') {
          if (response.data === '此父区划下无子区划') {
            oj.nodatafun()
          } else {
            commit('SET_REGION_LIST', {list: response.data, type: type, callfun: callackfun})
          }
        }
      }).catch(function (error) {
      oj.nodatafun()
    })
  },
  getCapitalListByDate ({commit}, _this) {
    let oj = {}
    oj.page = _this.capitalpage
    if (_this.date.length > 1) {
      oj.start = _this.date[0]
      oj.end = _this.date[1]
    } else if (_this.date.length === 1) {
      oj.start = oj.end = _this.date[0]
    } else {

    }
    _this.$http.post('hts/record/capitals', oj)
      .then(function (response) {
        if (typeof response.data === 'object') {
          commit('SET_CAPITAL_LIST', response.data.list)
        } else {
          // alert(response.msg)
        }
      })
  },
  getAddressList ({commit}, _this) {
    if (_this.$store.state.select_address.length <= 0 || _this.$store.state.select_address === null) {
      let result = addressjson
      commit('SET_ADDRESS_LIST', result)
    }
  },
  getUserBankList ({commit}, _this) {
    _this.$http.post('uts/user/bankList', {})
      .then(function (response) {
        if (typeof response.data === 'object') {
          commit('SET_USER_BANK_LIST', response.data)
        } else {
          // alert(response.msg)
        }
      })

  },
  getUserAddressList ({commit}, _this) {
    _this.$http.post('uts/user/addressList', {})
      .then(function (response) {
        if (typeof response.data === 'object') {
          commit('SET_USER_ADDRESS_LIST', response.data)
        } else {
          // alert(response.msg)
        }
      })
  },
  getUserSetting ({commit}, _this) {
    _this.$http.post('uts/ccbUser/getUserInfo', _this.postdata === null ? {} : _this.postdata)
      .then(function (response) {
        _this.L('userid',response.data.id);
        if (typeof response.data === 'object') {
          commit('SET_USER_SETTING', response.data)
        }
      })

  },
  getGoodsListByDate ({commit}, _this) {
    let oj = {}
    oj.page = _this.goodpage
    if (_this.date.length > 1) {
      oj.start = _this.date[0]
      oj.end = _this.date[1]
    } else if (_this.date.length === 1) {
      oj.start = oj.end = _this.date[0]
    } else {

    }
    _this.$http.post('hts/record/goodss', oj)
      .then(function (response) {
        if (typeof response.data === 'object') {
          commit('SET_GOOD_LIST', response.data.list)
        } else {
          // alert(response.msg)
        }
      })
      .catch((error) =>{

      })
  },
  getDynamicList ({commit}, _this) {
    let arg = {}
    arg.page = _this.feedbackPage
    arg.demand_code = _this.paramsID
    arg.dynamic_type = 2
    return _this.$http.post('hts/help/dynamic', arg)
      .then(res => {
        let dynamicList = res.data
        commit(types.GET_DYNAMIC_LIST, dynamicList)
      })
      .catch(err => {
      })
  },
  getDemandDetail ({commit}, {_this, demandId}) {
    return _this.$http.post('hts/myDemand/detail', {demandId: demandId})
      .then(res => {
        let demandDetail = res.data
        commit(types.GET_DEMAND_DETAIL, demandDetail)
      })
  },
  getAidpersondata ({commit}, data) {
    commit(types.SET_AIDEDPERSON_DATA, data)
  },
  getHelptypeList ({commit,state}, _this){
    return _this.$http.post('hts/help/getAppDemand',{regionId: state.city.id})
      .then(res => {
        let helpList = [];
        for(let item of res.data.vos){
          helpList.push(item.help_type_name.substr(0,2));
        }
        commit(types.GET_HELPTYPE_LIST, helpList)

      })
  },
  getHelptypeListAll ({commit,state}, _this){
    return _this.$http.post('hts/demand/helpList')
      .then(res => {
        let helpList = [];
        for(let item of res.data.vos){
          helpList.push(item.help_type_name.substr(0,2));
        }
        commit(types.GET_HELPTYPE_LIST, helpList)

      })
  },
  getAidederBankList ({commit}, {_this, aidedId}) {
    return _this.$http.post('hts/poor/bankList', {aidedId: aidedId})
      .then(res => {
        let bankList = res.data.bankList
        commit(types.GET_AIDEDER_BANKLIST, bankList)
      })
  },
  getAidederAddressList ({commit}, {_this, aidedId}) {
    return _this.$http.post('hts/poor/addrList', {aidedId: aidedId})
      .then(res => {
        let addressList = res.data
        commit(types.GET_AIDEDER_ADDRESS_LIST, addressList)
      })
  },
  getSelectList ({commit}, _this) {
    return _this.$http.post('hts/demand/classify')
      .then(res => {
        let select = res.data.vos;
        commit(types.SET_SELECT, select);
      })
  },
 
  getUser ({commit}, {_this}) {
    return _this.post('uts/ccbUser/getUserInfo').then(response => {
      commit(types.CHA_USER, response.data)
      Promise.resolve(response)
    }).catch(error => {
      Promise.reject(error)
    })
    // })
  },
  getJhUser ({commit}, {_this}) {
    return _this.post('uts/ccbUser/getUserInfo').then(response => {
      commit(types.CHA_USER, response.data)
      Promise.resolve(response)
    }).catch(error => {
      Promise.reject(error)
    })
    // })
  },
  getNewUser ({commit}, {_this}) {
    return _this.post('http://test1.fpmai.com/ssoredis/login/l002/onlyfastLogin?username=18345960410&yanzhenma=101788',{headers:{contentType:"application/json"}}).then(response => {
      commit(types.NEW_USER, response.data)
      Promise.resolve(response)
    }).catch(error => {
      Promise.reject(error)
    })
    // })
  },
  getHotSearchList ({commit}, _this) {
    _this.$http.post('hts/getEnumInfo', {
      id: 'hot_search_word'
    })
      .then(res => {
        let hotsearchList = res.data.length>15?res.data.slice(0,15):res.data;
        console.log(hotsearchList)
        commit('GET_HOT_SEARCH_LIST', hotsearchList);
        //_this.L('hotWord',hotsearchList[0].name);
      })

  },
}
