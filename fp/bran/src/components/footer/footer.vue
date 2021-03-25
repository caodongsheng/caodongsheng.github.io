<template>
  <div class="footer-wrap">
    <tabbar class="mytab">

      <tabbar-item  link="/index"  :selected="$route.name == 'recom'">
        <img slot="icon" src="../../common/images/tabbar-home.png">
        <img slot="icon-active" src="../../common/images/tabbar-home-active.png">
        <span slot="label">首页</span>
      </tabbar-item>

       <tabbar-item   link="/demandContainer"  :selected="$route.path.indexOf('demand') > -1">
        <img slot="icon" src="../../common/images/tabbar-zhch.png">
        <img slot="icon-active" src="../../common/images/tabbar-zhch-active.png">
        <span slot="label">需求对接</span>
      </tabbar-item>
      <tabbar-item  class="spe">
        <img @click="check" slot="icon" src="../../common/images/tabbar-publish.png">
        <span slot="label">发起</span>
      </tabbar-item>

        <tabbar-item  @on-item-click="toiframe" :selected="$route.name == 'fpzs'" >
        <img slot="icon" src="../../common/images/tabbar-mall.png">
        <img slot="icon-active" src="../../common/images/tabbar-mall-active.png">
        <!-- <span slot="label">扶贫项目</span> -->
        <span slot="label">项目对接</span>
      </tabbar-item>

      <tabbar-item @on-item-click="gotousercenter">
        <img slot="icon" src="../../common/images/tabbar-user.png">
        <img slot="icon-active" src="../../common/images/tabbar-user-active.png">
        <span slot="label">我的</span>
      </tabbar-item>

    </tabbar>
    <div v-transfer-dom>
      <confirm v-model="showconfirm" title="" :confirm-text="confirmText" cancel-text="取消" @on-confirm="onConfirm()">
        <p style="text-align:center;">{{tips}}</p>
      </confirm>
    </div>

  </div>
</template>

<script>
  import {Tabbar, TabbarItem, TransferDom, Confirm} from 'vux'
  // import Publish from '../../pages/publish/publish_index'
  // import User from '../../pages/user/user_index'
  import { mapState} from "vuex";

  export default {
    directives: {TransferDom},
    components: {Tabbar, TabbarItem,  Confirm},


    data () {
      return {
        show: false,
        showconfirm: false,
        confirmText: '',
        tips: '',
        confirmObj: {
          logIn: {
            confirmText: '马上去登录',
            tips: '您还未登录，请登录并实名认证通过后发布！',
            url: '/login'
          },
          verify: {
            confirmText: '马上去认证',
            tips: '您还未进行实名认证，请通过认证后再发布需求！',
            url: '/setrealname/0'
          }
        }
      }
    },
    computed: {
      ...mapState(["city"])
    },
    methods: {
      gotousercenter(){

        window.home.toMineTab();

      },
      showpop (data) {
        this.$refs.loginb.changeShow(true)
      },
      toiframe(){
     // let  link={path:'/fpzs',query:{title:'地方资讯',url:process.env.NEWS_PATH}};
     //   this.$router.push(link)
       // location.href =process.env.NEWS_PATH
        let userid = this.G("userid")
        let token = this.G("token")
        let nickname = this.G("nickname")
        if(!userid){
          userid=null
        }
        if(!token){
          token=null
        }
        if(!nickname){
          nickname=null
        }
        let id=this.$store.state.city.provinceArea
        let name=this.$store.state.city.provinceName
        let cooperation=this.city.cooperation
        if(cooperation==1){
          id=this.$store.state.city.id
          name=this.$store.state.city.name
        }
        location.href=process.env.WX_URL+"/pages/index/#/poverty/"+userid+"/"+nickname+"/"+token+"?isProvince=true&isApp=1&provinceCode="+id+"&cooperation="+cooperation+"&provinceName="+name
       
     // if (this.isapp()) {
     //          if(this.isios()){
		// 		window.native.appLoadUrl(process.env.NEWS_PATH);
		// 		}
		// 		else{
		// 			location.href =process.env.NEWS_PATH
		// 		}
     //
     //        }
      },
      check () {
        window.nativeTabbar.selectedIndex(2)
      },
      onConfirm () {

        if (!this.G('token')) {
          //  window.android.login()
           this.ModuleNative('AppReturnToLoginPage','需求详情去登录')
        } else {
          this.$router.push(this.confirmObj.verify.url)
        }
      },
        onConfirmPhone() {
          this.$router.push('/FirstBind')
      }
    }
  }
</script>

<style lang="less" scoped>
  .popup-login {
    width: 100%;
    height: auto;
  }

  .vux-popup-dialog {
    background: #fff;
    top: 0
  }

  .pop-close {
    padding: 10px 15px;
  }
</style>
<style lang="less">
  .weui-tabbar__item .weui-tabbar__icon{width: 20px;height: 19px;}
  .footer-wrap .weui-tabbar__item.spe .weui-tabbar__icon {
    width: 24px;
    height: 24px;
    padding:11px 11px 4px 11px;
    margin-top: -20px;
    background:#fff;
    vertical-align: middle;
    border-radius: 50%;
    box-shadow: 1px 0 25px -15px #999;
  }
  .footer-wrap .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #f37306;
  }

</style>
<style scoped>
  .weui-tabbar:before{border: none;}
  .weui-tabbar{background: #fff;box-shadow: 1px 0 25px -15px #999;}
  .weui-tabbar__item{padding-bottom: 5px;}
  /*弹窗样式*/
  .vux-confirm >>> .weui-dialog__btn_primary {
    color: #fff;
    background: #f37306
  }

  .vux-confirm >>> .weui-dialog__ft {
    font-size: 16px
  }

  .vux-confirm >>> .weui-dialog__bd {
    font-size: 16px
  }
</style>
