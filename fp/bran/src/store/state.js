import relationjson from '../../static/relation.json'
import expressjson from "../../static/express.json"
// 初始化数据
const state = {
  nav_index: 0,
  alljson: relationjson,
  allexpress:expressjson,
  navflag: true,
  select: [], // 需求分类
  select_status: [], // 状态
  select_type_status: [], //  状态分类
  select_address: [], // 三级下拉地域
  history_address: [], // 地域历史记录
  hotsearchList: [], //  热搜词
  dynamicList: {}, //  爱心反馈
  helptypeList:[],//帮扶类型
  medicallist: [],
  demandlist: [],
  educationlist: [],
  houselist: [],
  materiallist: [],
  fpzclist: [],
  recommandlist: [],
  capital_list: [],
  good_list: [],
  persontotal: '',
  capitaldetail: {},
  aidedperson_list: [],
  gooddetail: {},
  changemsg:{},
  routeurl: '',
  bankdetail: {},
  usersetting: {},
  addressdetail: {},
  provincelist: false,
  citylist: false,
  districtlist: false,
  townlist: false,
  villagelist: false,
  aidedpersondetail: {},
  user_addresslist: [],
  user_banklist: [],
  certificate: null,
  aidpersondata: null,
  visilist: [],
  demandDetail: {},
  aidederBankList: [],
  aidederAddressList: [],
  indexId: 1,
  newuser:null,
  user: {
    userType: ''
  },
  isLoading: false,

  cityHistory: [],
  cachedViews: [],
  // 管理员注册相关信息
  adminRegInfo: [
    { phone: Object }, // 手机号
    { yzm: Object }, // 短信验证码
    { region_name: Object }, //  负责区域
    { user_level: Object }, //  管理级别
    { name: Object }, // 姓名
    { idcard: Object }, // 身份证号
    { region_name2: Object}, // 负责区域的名称(中文)
    { pass: Object }// 密码
  ],
  city:{name: '贵州省',id:'520000000000'}
}
try {
  if (localStorage.getItem('city')) {
    state.city = JSON.parse(localStorage.getItem('city'))
  } else {
    localStorage.setItem('city', JSON.stringify(state.city))
  }
} catch (e) {}

let cityHistory = []
try {
  if (localStorage.getItem('cityHistory')) {
    state.cityHistory = JSON.parse(localStorage.getItem('cityHistory'))
  } else {
    localStorage.setItem('cityHistory', JSON.stringify(cityHistory))
  }
} catch (e) {}
export default state
