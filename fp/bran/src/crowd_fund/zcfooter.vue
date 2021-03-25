<template>
  <div class="needDetail-foot">
    <ul>
      <li class="help-btn">
        <p @click="helpLink">我要支持</p>
      </li>
    </ul>

    <!--未登陆关注提示弹窗-->
    <div v-transfer-dom>
      <confirm v-model="showconfirm" title="" confirm-text="去登录" cancel-text="取消" @on-confirm="onConfirm()"
               @on-cancel="" :content="cont">
        <!-- <p style="text-align:center;">您还未登录，请登录后关注！</p> -->
      </confirm>
    </div>

  </div>
</template>
<script>
  import { TransferDom, Confirm} from 'vux'
  import open from '@/assets/js/openWin'

  export default {
    directives: {TransferDom},
    components:{Confirm},
    props: ['acr001','sum','acr002'],
    data () {
      return {
        attention: this.concern, // 1为关注 0为未关注
        showconfirm: false,
        cont: '您还未登录，请登录后再来帮扶TA'
      }
    },
    methods: {
      helpLink(){
        console.log(this.$store.state.user.login_name,'sadasdasdas')
        let isLogin=localStorage.getItem("longToken");
        if(isLogin == '' || isLogin == null){
          this.showconfirm = true
        }else{
          console.log(this.H5PAY_URL+"/pages/index/payMoney.html?acr001="+this.acr001+'&acr002='+this.acr002+'&sum='+this.sum+'&token='+window.localStorage.getItem("token")+'&userid='+this.$store.state.user.id+'&login_name='+this.$store.state.user.login_name);
          console.log(localStorage.getItem("token"))
          if (window.api && window.api.systemType == "ios") {
            console.log('这是ios的我要支持')
            api.openApp({
              iosUrl:
                this.H5PAY_URL+"/pages/index/payMoney.html?acr001="+this.acr001+'&acr002='+this.acr002+'&sum='+this.sum+'&token='+window.localStorage.getItem("token")+'&userid='+this.$store.state.user.id+'&login_name='+this.$store.state.user.login_name
            });
          } else if(window.api && window.api.systemType =="android") {
            console.log('这是安卓的我要支持');
            open(this.H5PAY_URL+"/pages/index/payMoney.html?acr001="+this.acr001+'&acr002='+this.acr002+'&sum='+this.sum+'&token='+window.localStorage.getItem("token")+'&userid='+this.$store.state.user.id+'&login_name='+this.$store.state.user.login_name, '确认支付').then(res => {
                return res
            })
          }else if(this.isWeixinCient()){
            console.log('这是微信的我要支持')
            this.$router.replace('/zchelphe/'+this.acr001+'/'+this.sum+'/'+this.acr002);
          }else{
            this.showToast('','text','请在app或微信内打开','20em','','')
          }
        }
      },
      onConfirm() {
        this.$router.push({path: '/login',query: {demandId: this.$route.params.id}})
      }
    },
    mounted () {
      console.log(this.$store.state.user,'这是用户信息用户信息')
    },
    watch:{

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .needDetail-foot
    position: absolute;
    bottom 0
    left 0
    right 0
    box-shadow 0 -2px 4px #d7d7d7
    background-color #fff
    ul
      display flex
      height 51px
      line-height 51px
      li
        width 100%
        text-align center
        font-size 15px
        &.attention-btn
          a
            color #999
          i
            padding-right 5px
        &.help-btn
          color #fff
          background linear-gradient(-180deg,rgba(253,139,42,1),rgba(255,129,37,1))
</style>
