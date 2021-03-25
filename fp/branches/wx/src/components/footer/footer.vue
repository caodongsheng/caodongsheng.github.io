<template>
  <div class="footer-wrap">
    <tabbar class="mytab">

      <!-- <tabbar-item  link="/index":selected="$route.name == 'recom'"> -->
      <tabbar-item  @on-item-click="torecom"  :selected="$route.name == 'recom'">
        <img slot="icon" src="../../common/images/tabbar-home.png">
        <img slot="icon-active" src="../../common/images/tabbar-home-active.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item  link="/demandContainer"  :selected="$route.path.indexOf('demand') > -1">
        <img slot="icon" src="../../common/images/tabbar-zhch.png">
        <img slot="icon-active" src="../../common/images/tabbar-zhch-active.png">
        <span slot="label">需求对接</span>
      </tabbar-item>

      <!-- <tabbar-item  class="spe">
        <img @click="check" slot="icon" src="../../common/images/tabbar-publish.png">
      </tabbar-item> -->

      <!-- <tabbar-item  @on-item-click="toiframe" :selected="$route.name == 'fpzs'">
        <img slot="icon" src="../../common/images/tabbar-mall.png">
        <img slot="icon-active" src="../../common/images/tabbar-mall-active.png">
        <span slot="label">扶贫电商</span>
      </tabbar-item> -->
      <tabbar-item @on-item-click="gotohelprecord" :selected="$route.name == 'record'">
        <img slot="icon" src="../../common/images/tabbar-user.png">
        <img slot="icon-active" src="../../common/images/tabbar-user-active.png">
        <span slot="label">帮扶记录</span>
      </tabbar-item>

    </tabbar>
   
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  import {mapState } from 'vuex'
  import { cityDate } from "@/pages/home/recom/city.js";
  export default {
    components: {Tabbar, TabbarItem},
    created () {
      // console.log(this.$store.state.usersetting.is_certification);
    },
    mounted(){
    
    },
    data () {
      return {
    
      }
    },
    computed: {
    ...mapState(['city']),
  },
    methods: {
      toiframe(){
        let cityName=this.city.provinceName.split("-")
        console.log(cityName)
        let ret2 = cityDate.find((v) => {
          return v.name == cityName[0];
        });
        let pinyin=ret2.allPinYin
        let shopUrl=''
        if(this.city.cooperation==1){
          shopUrl=process.env.WX_URL+"/mobile/H5Act/localplace/collaborationEW.html?mark="+pinyin+"&token="+this.G("token")+"&media=project5X"
        }else{
          shopUrl=process.env.WX_URL+"/mobile/H5Act/localplace/index.html?mark="+pinyin+"&token="+this.G("token")+"&media=project5X"
        }
        console.log('电商click',shopUrl)
        location.href=shopUrl
        // location.href = "https://www.51heba.com/app/index.php?i=4&c=entry&m=ewei_shopv2&do=mobile"
      },
     gotohelprecord(){
        this.$store.state.routeurl = '/record/capital'
         this.$router.push({path:'/record'})
     },
     torecom() {
      // ?name='+_this.city.name+'&id='+_this.city.id+'&type='+_this.city.type+'&provinceName='+_this.city.provinceName+'&provinceArea='+_this.city.provinceArea+'&unionid=1'

      this.$router.push('/recom?name='+this.city.name+'&cooperation='+this.city.cooperation+'&id='+this.city.id+'&type='+this.city.type+'&provinceName='+this.city.provinceName+'&provinceArea='+this.city.provinceArea+'&unionid=1')
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
  .footer-wrap .weui-tabbar__item.spe .weui-tabbar__icon {
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-top: 2px;
  }

  .footer-wrap .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #f37306;
  }

</style>
<style scoped>
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
