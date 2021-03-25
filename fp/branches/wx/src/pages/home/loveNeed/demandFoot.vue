<template>
  <div class="needDetail-foot">
    <ul>
      <!-- <li
        class="attention-btn"
        @click="change"
      >
          <p><i :class="{ 'fa': true, 'fa-star-o': true,'fa-lg': true,'c-a': attention==0?false:true}"></i>{{attention==0?'关注':'取消关注'}}</p>
      </li> -->
      <li class="help-btn">
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

  </div>
</template>
<script>
import { TransferDom, Confirm } from "vux";

export default {
  directives: { TransferDom },
  components: { Confirm },
  props: ["vos", "paramsID", "concern", "aideder_name"],
  data() {
    return {
      attention: this.concern, // 1为关注 0为未关注
      // attention: 0,
      type: this.vos.demand_type,
      showconfirm: false,
      cont: "您还未登录，请登录后关注！"
    };
  },
  created() {},
  methods: {
    helpLink() {
      //判断用户是否登录
      let isLogin = localStorage.getItem("token");
      if (isLogin == "" || isLogin == null) {
        this.showconfirm = true;
        this.cont = "您还未登录，请登录后再来帮扶TA";
      } else {
      
        if (this.vos.demand_type == 1) {
          this.$router.replace(
            "/helpHeGoods/" + this.paramsID + "/" + this.aideder_name
          );
        } else if (this.vos.demand_type == 2) {
      
            this.$router.push(
              "/helpHe/" + this.paramsID + "/" + this.aideder_name
            );
          
        } else {
          this.showToast("", "text", "获取类型失败", "", "middle");
        }
        // }
      }
    },
    onConfirm() {
      this.$router.push({
        path: "/login",
        query: { demandId: this.$route.params.id }
      });
    },
    change() {
      let isLogin = localStorage.getItem("token");
      // if(isLogin!=""||isLogin!=null){
      //   判断是否登录
      //   if (this.attention ==0) {
      //     this.attention = 1
      //     this.attentionOperate()

      //   }else if (this.attention ==1) {
      //     this.attention = 0
      //     this.attentionOperate()
      //   }
      // console.log('已登录');
      // }else{
      //   // 去登陆
      //   alert("未登录不能关注")
      // }
      if (isLogin == "" || isLogin == null) {
        this.showconfirm = true;
      } else {
        // this.attention = !this.attention;
        if (this.attention == 0) {
          this.attention = 1;
          this.attentionOperate();
        } else if (this.attention == 1) {
          this.attention = 0;
          this.attentionOperate();
        }
      }
    },
    payOk(ordernum, submitmoney) {
      let _this = this;
      let aidederName = this.aideder_name;
      // 以下前端回调暂时注释，测试微信回调后台功能
      this.$http
        .post("/hts/help/updateCapitalState", {
          id: ordernum,
          pay_flag: 1,
          paid_money: submitmoney
        })
        .then(res => {
          let user = _this.$store.state.user.realname
            ? _this.$store.state.user.realname
            : _this.$store.state.user.nick_name;
          _this.$router.replace({
            path: "/certificate",
            query: { user: user, to: aidederName, target: submitmoney + "元" }
          });
        })
        .catch(error => {
          _this.showToast("", "text", "保存订单状态失败," + error.code);
        });
    },
    attentionOperate() {
      this.$http
        .post("uts/user/loveConcern", {
          demand_id: this.paramsID,
          check: this.attention
        })
        .then(function(response) {})
        .catch(function(error) {});
    },
    async getOrderState(ordernum, money) {
      let _this = this;
      await this.$http
        .post("http://dev2.fpmai.com/pts/v1/queryOrder", {
          payOrderId: ordernum,
          txnTime:""
        })
        .then(function(response) {
          if (response.data.orderState == "SUCCESS") {
            _this.showToast("", "text", "支付成功");
            _this.payOk(ordernum, money);
          }
        })
        .catch(function(error) {});
    }
  },
  watch: {
    vos() {
      this.type = this.vos.demand_type;
    }
  },
  mounted() {
  
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.needDetail-foot {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 4px #d7d7d7;
  background-color: #fff;

  ul {
    display: flex;
    height: 51px;
    line-height: 51px;

    li {
      width: 100%;
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
    }
  }
}
</style>
