// 此处写改变状态的一些方法
import * as types from './mutation-types.js'

export default {
  [types.SET_NAME] (state, name) {
    state.name = name
  },
  [types.SET_AGE] (state, age) {
    state.age = age
  },
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  },
  [types.SET_SELECT] (state, select) {
    state.select = select
  },
  [types.SET_HISTORY] (state, historyAddress) {
    state.history_address = historyAddress
  },
  [types.SET_GOOD_DETAIL] (state, gooddetail) {
    state.gooddetail = gooddetail
  },
  [types.CHANGE_SHOWLIST](state,changemsg){
    state.changemsg = changemsg
  },
  [types.SET_GOOD_LIST] (state, goodList) {
    let arr = []
    for (let i = 0; i < goodList.length; i++) {
      var oj = {}
      oj.url = '/goodsdetail' + '/' + goodList[i].id
      oj.id = goodList[i].id
      oj.userphoto = goodList[i].user_pic
      oj.name = goodList[i].user_name
      // oj.address = "湖南省阜阳县李官村";
      oj.address = goodList[i].region_name
      oj.proimg = goodList[i].image === '' ? './static/appimg/fpw_logo_small.png' : goodList[i].image
      oj.cate = goodList[i].userType
      oj.title = goodList[i].demand_title

      oj.label = goodList[i].demandRelate
      // oj.helpstate = good_list[i].demandStatus;
      oj.helpstate = goodList[i].status
      arr.push(oj)
    }
    state.good_list = arr
  },
  [types.SET_CAPITAL_LIST] (state, capitalList) {
    let arr = []
    for (let i = 0; i < capitalList.length; i++) {
      var oj = {}
      oj.url = '/capitaldetail' + '/' + capitalList[i].id
      oj.id = capitalList[i].id
      oj.userphoto = capitalList[i].user_pic
      oj.name = capitalList[i].user_name
      oj.proimg = capitalList[i].image === '' ? './static/appimg/fpw_logo_small.png' : capitalList[i].image
      oj.cate = capitalList[i].userType
      oj.title = capitalList[i].demand_title
      oj.moneytarget = capitalList[i].targetMount
      oj.moneyalreday = capitalList[i].moneyCount
      oj.helpstate = capitalList[i].demandStatus
      oj.helpmoney = capitalList[i].paid_money
      arr.push(oj)
    }
    state.capital_list = arr
  },
  [types.SET_CAPITAL_DETAIL] (state, detaildata) {
    let detail = {}
    detail.id = detaildata.id
    detail.user_pic = detaildata.user_pic
    detail.aideder_name = detaildata.user_name
    detail.img_url = detaildata.image
    detail.demand_title = detaildata.demand_title
    detail.moneycount = detaildata.moneyCount
    detail.target_amount = detaildata.targetMount
    detail.userType = detaildata.userType
    detail.helpmoney = detaildata.paid_money
    detail.demand_code = detaildata.demend_code
    detail.contribute_time = detaildata.contribute_time
    detail.paytype = detaildata.paytype
    detail.demandStatus = detaildata.demandStatus;
    state.capitaldetail = detail
    console.log(state.capitaldetail)
  },
  [types.SET_AIDEDPERSON_DETAIL] (state, persondetail) {
    state.aidedpersondetail = persondetail
  },
  [types.SET_CERTIFICATE] (state, certificate) {
    state.certificate = certificate
  },
  [types.SET_AIDEDPERSON_DATA] (state, aidpersondata) {
    state.aidpersondata = aidpersondata
  },
  [types.SET_AIDEDPERSON_LIST] (state, aidedpersonlist) {
    state.persontotal = aidedpersonlist.total
    state.aidedperson_list = aidedpersonlist.list
  },
  [types.SET_VISITE_LIST] (state, visitelist) {
    state.visilist = visitelist
  },
  [types.SET_ADDRESS_LIST] (state, addresslist) {
    state.select_address = addresslist
  },
  [types.SET_USER_SETTING] (state, usersetting) {
    state.usersetting = usersetting
  },
  [types.SET_USER_ADDRESS_LIST] (state, addresslist) {
    state.user_addresslist = addresslist
  },
  [types.SET_USER_BANK_LIST] (state, banklist) {
    state.user_banklist = banklist
  },
  [types.SET_REGION_LIST] (state, ojfun) {
    switch (ojfun.type) {
      case 1:
        state.provincelist = ojfun.list
        break
      case 2:
        state.citylist = ojfun.list
        break
      case 3:
        state.districtlist = ojfun.list
        break
      case 4:
        state.townlist = ojfun.list
        break
      case 5:
        state.villagelist = ojfun.list
        break
    }
    ojfun.callfun()
  },
  [types.GET_DEMAND_DETAIL] (state, detail) {
    state.demandDetail = detail
  },
  [types.GET_HELPTYPE_LIST] (state, helptype) {
    state.helptypeList = helptype
  },
  [types.GET_AIDEDER_BANKLIST] (state, bankList) {
    state.aidederBankList = bankList
  },
  [types.GET_AIDEDER_ADDRESS_LIST] (state, addressList) {
    state.aidederAddressList = addressList
  },
  [types.ADD_CACHE_VIEWS] (state, view) {
    if (state.cachedViews.some(v => v === view.name)) return
    state.cachedViews.push(view.name)
  },
  [types.DEL_CACHE_VIEWS] (state, view) {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  [types.DEL_AIDEDER_ADDRESS_] (state, id) {
    state.aidederAddressList = state.aidederAddressList.filter(item => item.id !== id)
  },
  [types.CHA_USER] (state, user) { // 更新整个user对象
    state.user = user
  },
  [types.NEW_USER] (state, user) { // 更新整个user对象
    stat.newuser = user
  },
  [types.CHANGE_AVATAR] (state,url){
   state.user.user_pic = url;
  },
  [types.GET_HOT_SEARCH_LIST] (state, hotList) {
    state.hotsearchList = hotList;
  },
  [types.GET_DYNAMIC_LIST] (state, feedList) {
    state.dynamicList = feedList
  },
  cityCheck (state, city) {
    state.city = city
    try {
      localStorage.setItem('city',  JSON.stringify(city))
    } catch (e) {}
  },
  cityHistoryList (state, cityHistory) {
    if (state.cityHistory.length === 0) {
      state.cityHistory.unshift(cityHistory)
    } else {
      let citySt = ''
      let isCity = true;
      state.cityHistory.map((item,index) => {
        if(item.id  === cityHistory.id){
          let name = item
          isCity = false
          state.cityHistory.splice(index,1)
          state.cityHistory.unshift(name);
        }else{
          citySt = cityHistory;
        }
      })
      if(isCity)
        state.cityHistory.unshift(citySt)
      if (state.cityHistory.length > 5) {
        state.cityHistory.splice(state.cityHistory.length - 1, 1)
      }
    }
    try {
      localStorage.setItem('cityHistory', JSON.stringify(state.cityHistory))
    } catch (e) {}
  }
}
