<template>
  <div  class="animated fadeInRight h-full">
    <x-header :left-options="{showBack: false}"><router-link to @click.native="tosetting" slot="left">
        <div class="top-seting">
          <!--<i slot="label" class="iconfont icon-f-setting f-22" aria-hidden="true"></i>-->
          <span slot="label" class="" aria-hidden="true"></span>
          <em class="color-999">设置</em>
        </div>
      </router-link>我的</x-header>
    <!--主体内容-->
    <div class="bg-f6f5f6 box-withbar over-auto">
      <!--头像个人信息区域-->
      <div class="user-header bg-ffffff">
        <nologin :show="state === 1"></nologin>
        <userinfo :userdata="userdata"  v-if="state === 0"></userinfo>
      </div>
      <!--用户操作菜单列表 -->
      <div class="user-opelist mt-15 mb-15">
        <group>
          <cell class="bg-ffffff" title="帮扶记录" is-link @click.native="capital">
            <img slot="icon" width="20" style="display:block;margin-right:10px;"
                 src="../../common/images/user-icon01.png">
          </cell>
        </group>
        <group class="mt-15">
          <cell class="bg-ffffff" title="我发布的需求" is-link @click.native="toMypublish">
            <img slot="icon" width="20" style="display:block;margin-right:10px;"
                 src="../../common/images/user-icon02.png">
            <div class="badge-value" style="margin-right: 5px">
              <badge :text='demandNums'></badge>
            </div>
          </cell>
          <cell class="bg-ffffff" title="受助人管理" is-link @click.native="aidedperson">
            <img slot="icon" width="20" style="display:block;margin-right:10px;"
                 src="../../common/images/user-icon03.png">
          </cell>
        </group>
        <group class="mt-15" v-if="this.$store.state.user.is_cadre==1">
          <cell @click.native="homework()" class="bg-ffffff" title="管理员工作台" is-link >
            <img slot="icon" width="20" style="display:block;margin-right:10px;"
                 src="../../common/images/user-icon04.png">
          </cell>
        </group>
        <group class="mt-15">
          <cell class="bg-ffffff" title="我的邀请" is-link @click.native="inviteMine" v-if="!this.isWeixinCient()">
            <img slot="icon" width="20" style="display:block;margin-right:10px;"
                 src="../../common/images/user-icon05.png">
            <div class="badge-value" style="margin-right: 5px">
              <span class="v-middle">{{inviteCount}}</span>
            </div>
          </cell>
          <cell class="bg-ffffff" title="商城订单" is-link  @click.native="godetail()">
            <img slot="icon" width="20" style="display:block;margin-right:10px;"
                 src="../../common/images/user-icon06.png">
            <div class="badge-value" style="margin-right: 5px">
              <span class="v-middle"></span>
            </div>
          </cell>
          <!-- 未提供接口暂时先注释了 -->
          <!-- <cell class="bg-ffffff" title="商品收藏" is-link :link="goodscollection">
            <img slot="icon" width="20" style="display:block;margin-right:10px;"
                 src="../../common/images/user-icon07.png">
            <div class="badge-value" style="margin-right: 5px">
              <span class="v-middle">0</span>
            </div>
          </cell> -->
          <cell class="bg-ffffff" title="我的关注" is-link @click.native="myfollow">
            <img slot="icon" width="20" style="display:block;margin-right:10px;"
                 src="../../common/images/user-icon08.png">
            <div class="badge-value" style="margin-right: 5px">
              <span class="v-middle">{{concernNums}}</span>
            </div>
          </cell>
          <!--<cell class="bg-ffffff" title="帮助中心" is-link link="">-->
          <!--<img slot="icon" width="20" style="display:block;margin-right:10px;"-->
          <!--src="../../common/images/user-icon09.png">-->
          <!--</cell>-->
          <cell class="bg-ffffff" title="关于我们" is-link @click.native="open">
            <img slot="icon" width="20" style="display:block;margin-right:10px;"
                 src="../../common/images/user-icon10.png">
          </cell>
          <cell class="bg-ffffff" title="客服电话">
            <img slot="icon" width="20" style="display:block;margin-right:10px;"
                 src="../../common/images/user-icon10.png">
            <div class="badge-value" style="margin-right:5px">
              <a href="tel:4000009898" style="color: #999">4000009898</a>
            </div>
          </cell>
        </group>
      </div>
    </div>
    <!-- 手机号绑定弹窗 -->
    <confirm v-model="showconfirmPhone" title="" confirm-text="确定" cancel-text="取消" @on-confirm="onConfirmPhone()" @on-cancel="">
      <p style="text-align:center;">请先绑定手机号！</p>
    </confirm>
  </div>
</template>

<script>
  import {XHeader, XButton, Group, Cell, Badge, TransferDom, Confirm} from 'vux'
  import nologin from './userinfo/nologin'
  import userinfo from './userinfo/userinfo'
  import open from '@/assets/js/openWin'

  export default {
    directives: {TransferDom},
    name: 'user_index',
    components: {XHeader, XButton, Group, Cell, Badge, nologin, userinfo, Confirm},
    data () {
      return {
        state: 1,
        userdata: {
              type: 1,
              points: 0, // 我的积分
              loveheat: 0, // 爱心热度
              mywork: '0',
              myhonor: '0'
            },
        demandNums: '',
        concernNums: '',
        showconfirmPhone: false,
        inviteCount: '未邀请',
      }
    },

    mounted () {

    },
    methods: {
      tosetting(){
      if (this.state === 1) {
          //return '/login'
          // window.android.login()
          this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {
           this.$router.push('/setting')
        }
      },
      myfollow(){
       if (this.state === 1) {
          //return '/login'
          // window.android.login()
          this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {
           this.$router.push('/myfollow')
        }
      },
      godetail(){
         if (this.state === 1) {
          //return '/login'
          // window.android.login()
          this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {
        let url=process.env.SHOP_URL+'/mobile-h5/mh5last/index.html#/allOrder'
        localStorage.setItem('currenturl', url)
        this.$router.replace('/mall')
        }
      },
      open(){
        let item ={
          title:"关于我们",
          link_url: process.env.DJRES_URL+ "appia630/pages/aboutUs/au_share.html?from=singlemessage&isappinstalled=0"
        }
        let isapp = false;
        if(window.api) isapp = true;
        if(item.link_url.substr(0,4) === "http"){
          if(!isapp){
            this.$router.push({
              path:'/empty',
              query:{
                title:item.title,
                url:item.link_url
              }
            })
          }
          else{
             
             if(this.isios()){
				window.native.appLoadUrl(item.link_url);
				}
				else{
					location.href =item.link_url
				}
          }
        } else{
          this.$router.push({
            path:item.link_url
          })
        }
      },
      is_cadre () {
        this.$http.post('uts/ccbUser/getUserInfo')
          .then(res => {
            if (res.data.is_cadre === 1) {
              this.$router.push('/homeWork')
            } else if (res.data.is_cadre === 2) {
              this.$router.push('/adminRegOver')
            } else {
              this.$router.push('/registration')
            }
          })
      },
      // 第三方登录进入我发布需求先验证用户是否绑定手机号
      toMypublish () {
        if (this.G('token') && this.$store.state.user.mobile == null) {
          this.showconfirmPhone = true
        } else {
            if (this.state === 1) {
          //return '/login'
          // window.android.login()
          this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {
           this.$router.replace('/mypublish')
        }
        }
      },
      homework () {
        // 第三方登录验证用户是否绑定手机号
        let token = this.G('longToken')
        if (token && this.$store.state.user.mobile == null) {
          this.showconfirmPhone = true
          return
        }
        this.is_cadre()
      },
      onConfirmPhone () {
        this.$router.push('/FirstBind')
      },
      toMessage () {
        this.$router.push({name: 'statusList'})
      },
           capital() {
        if (this.state === 1) {
          //return '/login'
          // window.android.login()
          this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {
          this.$store.state.routeurl = '/record/capital'
           this.$router.push('/record')
        }
      },
      mypublish () {
        if (this.state === 1) {
         // return '/login'
          // window.android.login()
          this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {        
           this.$router.push('/mypublish')
        }
      },
      aidedperson() {
        if (this.state === 1) {
          //return '/login'
          // window.android.login()
          this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {
          this.$router.push('/aidedperson')
        }
      },
      adminconsole() {
        if (this.state === 1) {
          //return '/login'
          // window.android.login()
          this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {
          return '/'
        }
      },
      inviteMine() {
        if (this.state === 1) {
         // return '/login'
        //  window.android.login()
        this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {
         
          this.$router.push('/inviteMine')
        }
      },
      orderlist() {
        if (this.state === 1) {
       //   return '/login'
      //  window.android.login()
      this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {
        
          this.$router.push('/orderList')
        }
      },
      goodscollection() {
        if (this.state === 1) {
        //  return '/login'
        // window.android.login()
        this.ModuleNative('AppReturnToLoginPage','去登录')
        } else {
          this.$router.push('/goodsCollection')
        }
      },
   
      getUserdata () {
        let token = this.G('token')
        let userId = this.$store.state.user.id
        let userName = this.$store.state.user.nick_name
        let photo = this.$store.state.user.user_pic
        // let create_time = this.$store.state.user.
        if (this.state === 0) {
          this.$https.get(process.env.PJ_URL + '/support/interfaces/user/getUserInfo.action?token=' + token + '&user_id=' + userId).then(res => {
            this.userdata = {
              type: 1,
              points: res.data.response.integral, // 我的积分
              loveheat: res.data.response.heat, // 爱心热度
              mywork: '90',
              myhonor: '100'
            }
          }).catch(err => {
            this.userdata = {
              type: 1,
              points: 0, // 我的积分
              loveheat: 0, // 爱心热度
              mywork: '0',
              myhonor: '0'
            }
          })
        }
      }
    },

    created () {
      // 获取用户token信息
      let token = window.localStorage.getItem('token')
      if (!token || token === '') {
        this.state = 1
      } else {
        this.state = 0
          this.getUserdata()
      this.$http.post('hts/myDemand/demandTypeNums')
        .then(res => {
          this.demandNums = res.data['全部']
        })
      this.$http.post('uts/user/concernList')
        .then(res => {
          this.concernNums = res.data.total
        })
      }
      // 根据token和userid获取用户爱心热度、积分等信息
    
    }
   
 
  }
</script>

<style scoped>
  .vux-header{padding:5px 0}
  .box-withbar{top:52px}
  .vux-header >>> .vux-header-left, .vux-header >>> .vux-header-right {
    top: 10px
  }

  /*带图标的按钮--右侧*/
  .top-msg {
    text-align: center;
    right: 0px;
    top: 0;
    line-height: normal;
    position: relative;
  }

  .top-msg .tip {
    display: block;
    width: 6px;
    height: 6px;
    background: #ec0115;
    border-radius: 100%;
    position: absolute;
    top: -2px;
    right: 0px;
  }

  .top-msg i.fa {
    color: #666
  }

  .top-msg em {
    font-style: normal;
    font-size: 10px;
    display: block
  }

  /*带图标的按钮--左侧*/
  .vux-header >>> .vux-header-left {
    left: 15px;
    top: 10px;
  }

  .top-seting {
    text-align: center;
    left: 0;
    top: -4px;
    line-height: normal;
    position: relative;
  }

  .top-seting i.iconfont {
    color: #666
  }
  .top-seting>>>span{
    display: inline-block;
    width: 22px;height:22px;
    background: url(../../common/images/icon-set.png) no-repeat;
    background-size: 100% 100%;
  }
  .top-seting em {
    font-style: normal;
    font-size: 12px;
    display: block;
    color:#333;
    line-height: 100%;
  }

  /*操作列表区域*/
  .user-opelist >>> .weui-cells {
    margin-top: 0 !important;
    font-size: 15px
  }

  .user-opelist >>> .weui-cells:after {
    border: 0 none
  }

  .user-opelist >>> .weui-cells:before {
    border: 0 none
  }
  .user-opelist .badge-value{font-size: 14px}
  .weui-cell_access >>> .weui-cell__ft:after {
    margin-top: -3px
  }

  .weui-cell:before {
    right: 15px
  }

  .weui-cell {
    padding: 14px 15px
  }


</style>
