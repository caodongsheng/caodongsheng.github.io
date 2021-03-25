<template>
  <div class="needDetail-foot">
    <ul>
      <li
        class="attention-btn"
        @click="change"
      >
     
          <p><i :class="{ 'fa': true, 'fa-star-o': true,'fa-lg': true,'c-a': attention==0?false:true}"></i>{{attention==0?'关注':'取消关注'}}</p>
      
      </li>
      <li :class="[this.vos.operational_review_status!=1||this.vos.operational_review_status!=2 ? 'help-btn' :'help-btn_gray']">
        <p @click="helpLink">帮助TA</p>
      </li>
    </ul>

    <!--未登陆关注提示弹窗-->
    <div v-transfer-dom>
      <confirm
        v-model="showconfirm"
        title=""
        confirm-text="去登录"
        cancel-text="取消"
        @on-confirm="onConfirm()"
        @on-cancel=""
        :content="cont"
      >
        <!-- <p style="text-align:center;">您还未登录，请登录后关注！</p> -->
      </confirm>
    </div>
        <!--未登陆帮扶提示弹窗-->
    <!-- <div v-transfer-dom> -->
      <transition name="fade"> 
      <div class="conPay-wrapper" v-show="showconPay">
        <div class="conPay-container">
          <div class="img-container">
            <img @click="closeConPay" src="../../../assets/images/closeBtn.png" alt="">
          </div>
          <p class="payCon">尚未登录，您可以选择前往登录后再进行帮扶，也可以点击“直接帮扶即刻进行帮扶捐助。</p>
          <p class="tip">（未登录帮扶将无法获得相应爱心积分）</p>
          <div class="conPay-operate">
            <span @click="helpLinkAnonymous">直接帮扶</span>
            <span @click="onConfirm">去登录</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- </div> -->

  </div>
</template>
<script>
import { TransferDom, Confirm } from "vux";
import { mapActions, mapState } from "vuex";
export default {
  directives: { TransferDom },
  components: { Confirm },
  props: ["vos", "paramsID", "concern", "aideder_name"],
  data() {
    return {
      flag:true,
      attention: this.concern, // 1为关注 0为未关注
      // attention: 0,
      type: this.vos.demand_type,
      showconfirm: false,
      showconPay:false,
      // cont: "尚未登录，您可以选择前往登录后再进行帮扶，也可以点击“直接帮扶即刻进行帮扶捐助”<br/>（未登录帮扶将无法获得相应爱心积分）"
      cont:'您还未登录，请登录后关注！'
    };
  },
  created() {
   // this.getNewUser()
  },
  computed:{
     ...mapState(['newuser'])
  },
  methods: {
     ...mapActions(['getNewUser']),
    async getNewUser() {
      await this.$store.dispatch('getNewUser', { _this: this.$http })
    },
    closeConPay(){
      this.showconPay = false
    },
    helpLink() {
      //判断用户是否登录
      let isLogin = localStorage.getItem("token");
      if (isLogin == "" || isLogin == null) {
        if (this.vos.demand_type == 1) {
          // 物品
          this.showconfirm = true
          this.cont = '您还未登录，请登录后关注！'
        }else if(this.vos.demand_type == 2){
          this.showconPay = true
        } else {
          this.showToast("", "text", "获取类型失败", "", "middle");
        }
      } else {
        if (this.vos.demand_type == 1) {
          if(this.vos.ispoorself != 1){
            if(this.vos.operational_review_status !=1 || this.vos.operational_review_status != 2){
              this.$router.push(
                "/helpHeGoods/" + this.paramsID + "/" + this.aideder_name
              );
            }
          }else{
            this.showToast("", "text", "不能帮扶自己发布的需求", "", "middle");
          }
        } else if (this.vos.demand_type == 2) {
          if(this.vos.operational_review_status !=1 || this.vos.operational_review_status != 2){

            if (this.isios()) {
              let linkStr=process.env.PJ_URL +"payview/helphe.html?demand_code=" +
                  this.paramsID +
                  "&userid=" + localStorage.getItem("userid")+
                  "&token=" + localStorage.getItem("token")+ "&payname=" +process.env.WX_MCHTYPE+ "&jdomain=" +process.env.BASE_API+"&path="+this.$route.path;
                      window.native.appLoadUrl(linkStr)
      
            } else{   this.$router.push(
                  "/helpHe/" + this.paramsID + "/" + this.aideder_name
                );
            }
          }
        } else {
          this.showToast("", "text", "获取类型失败", "", "middle");
        }
      }
    },
    helpLinkAnonymous(){
      // 资金需求的匿名捐
      this.showconPay = false
      if (this.vos.demand_type == 2) {
          if(this.vos.operational_review_status !=1 || this.vos.operational_review_status != 2){
            if (this.isios()) {
              localStorage.setItem('isFirstPay',2)
              let linkStr=process.env.PJ_URL +"payview/helphe.html?isN=1&demand_code=" +
                  this.paramsID +
                  "&userid=" + process.env.anonymousUserid+
                  "&token=" + localStorage.getItem("token")+ "&payname=" +process.env.WX_MCHTYPE+ "&jdomain=" +process.env.BASE_API+"&path="+this.$route.path;
                      window.native.appLoadUrl(linkStr)
            } else{   this.$router.push(
                  "/helpHe/" + this.paramsID + "/" + this.aideder_name+'?isN=1'
                );
            }
          }
      } else {
        this.showToast("", "text", "获取类型失败", "", "middle");
      }
    },
    onConfirm() {
      this.showconPay = false
      // window.android.login()
      this.ModuleNative('AppReturnToLoginPage','需求详情去登录')      
    },
    change() {
      let isLogin = localStorage.getItem("token");
      if (isLogin == "" || isLogin == null) {
        this.showconfirm = true;
      } else {
        if (this.attention == 0) {
          this.attention = 1;
          this.attentionOperate();
        } else if (this.attention == 1) {
          this.attention = 0;
          this.attentionOperate();
        }
      }
    },
  
    attentionOperate() {
      this.$http
        .post("uts/user/loveConcern", {
          demand_id: this.paramsID,
          check: this.attention
        })
        .then(function(response) {})
        .catch(function(error) {});
    }
 
  },
  watch: {
    vos() {
      this.type = this.vos.demand_type;
    }
  }

};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.needDetail-foot {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 4px #d7d7d7;
  background-color: #fff;
  // 匿名捐弹框
  
  .conPay-wrapper{
    position:fixed;
    background: rgba(0,0,0,.5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index:9;
    .conPay-container{
      position:absolute;
      background: #fff;
      width: 80%;
      left: 10%;
      top: 24%;
      border-radius: 4px;
      .img-container{
        position: absolute;
        right: -22px;
        top: -18px;
        padding: 10px;
        text-align:right;
        img{
          display:inline-block;
          width:28px;
          height:28px;
        }
      }
      .payCon{
        color:#353535;
        font-size:15px;
        text-align:center;
        padding:30px 10px 10px;
      }
      .tip{
        padding:0 10px;
        color:#999;
        font-size:13px;
        text-align:center;
      }
      .conPay-operate{
        position:relative;
        display: flex;
        margin-top: 30px;
        &:after{
          position:absolute;
          top:0;
          left:0;
          right:0;
          border-top:1px solid #D5D5D6;
          transform: scaleY(0.5);
          content:'';
        }
        span{
          flex:1;
          padding: 10px;
          text-align:center;
          font-size:15px;
          &:first-child{
            color:#353535;
          }
          &:last-child{
            color:#fff;
            background:#f37306;
          }
        }
      }
    }
  }
  ul {
    display: flex;
    height: 51px;
    line-height: 51px;

    li {
      width: 50%;
      text-align: center;
      font-size: 15px;

      &.attention-btn {
        a {
          color: #999;
        }

        i {
          padding-right: 5px;
        }
      }

      &.help-btn {
        color: #fff;
        background: linear-gradient(-180deg, rgba(253, 139, 42, 1), rgba(255, 129, 37, 1));
      }
      &.help-btn_gray {
        color: #fff;
        background: #999;
      }
    }
  }
}
</style>
