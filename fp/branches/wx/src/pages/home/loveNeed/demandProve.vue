<template>
  <div class="needProve-container">
    <!--需求证明-->
    <p class="needProve-title">需求证明</p>
    <div class="content-container">
      <div class="prove-content" v-for="(items,index) in proveListData" :key="index">
        <div class="content-left">
          <p>{{items.user_type}}</p>
        </div>
        <div class="content-right">
          <p class="right-content">{{items.real_name}}</p>
          <p class="right-tip" v-for="(item,index) in items.content" :key="index">
            <i class="fa fa-check-circle"></i>
            <span>{{item}}</span>
          </p>
        </div>
      </div>
      <!--平台声明-->
      <div class="prove-content">
        <div class="content-left">
          <p>平台声明</p>
        </div>
        <div class="content-right">
          <p class="plat-declare">以上信息是个人求助信息，由当地扶贫干部审核确定真实性，不属于慈善募捐，感谢您的关注和爱心付出。</p>
        </div>
        <div class="content-bottom clear"></div>
      </div>
     <!-- <div class="complaint">
        <router-link to @click.native="toReport">质疑／举报</router-link>
      </div> -->
    </div>
    <!--证明人列表-->
    <p class="reference-title">
      已有
      <span class="c-a xiahua" @click="showProveList">{{peopleCount}}</span>人为他证明
      <!-- <router-link :to="{name:'iToProve',params:{id:this.paramsID}}">
        <span class="toproveLink">我来证明</span>
      </router-link>-->
      <!-- <router-link to @click.native="toProve">
        <span class="toproveLink">我来证明</span>
      </router-link> -->
    </p>
    <ul v-if="peopleCount>0" :class="{'reference-list':true,'active':provePeople}">
      <li
        @click="proveTab(index)"
        :class="{'arrow':proveID === index}"
        v-for="(item, index) in toprove"
        :key="index"
      >
        <avatar width="35" height="35" :image="item.user_pic" :name="item.witness_name"></avatar>
      </li>
      <div v-if="provePeople" class="moreProve">
        <router-link :to="{name:'proveList',params:{id:this.paramsID}}" class="dis-block linkonly">
          <img class="bd-radius-cir" src="../../../common/images/slh3.png">
        </router-link>
      </div>
    </ul>
    <!-- 证明内容 -->
    <div
      class="reference-content"
      v-if="proveID === index"
      v-for="(item, index) in toprove"
      :key="index"
    >
      <p>
        {{item.witness_name}}
        <i class="fa fa-id-card-o" v-if="item.is_certification !== null"></i>
      </p>
      <p>{{item.comments}}</p>
    </div>
    <!-- 未登录弹窗提示 -->
    <div v-transfer-dom>
      <confirm
        v-model="showconfirm"
        title
        confirm-text="去登录"
        cancel-text="取消"
        @on-confirm="onConfirm()"
        @on-cancel
      >
        <p style="text-align:center;">您还未登录，请登录后再为其证明！</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <confirm
        v-model="showconfirmPhone"
        title
        confirm-text="确定"
        cancel-text="取消"
        @on-confirm="onConfirmPhone()"
        @on-cancel
      >
        <p style="text-align:center;">请先绑定手机号！</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <confirm
        v-model="showToCertification"
        title
        confirm-text="马上去认证"
        cancel-text="取消"
        @on-confirm="toRealName()"
        @on-cancel
      >
        <p style="text-align:center;">您还未进行实名认证，请通过认证后再为其证明！</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import avatar from "../../../components/util/avatar";
import { TransferDom, Confirm } from "vux";

export default {
  directives: { TransferDom },
  components: { avatar, Confirm },
  props: ["paramsID"],
  data() {
    return {
      proveID: 0,
      proveListData: [],
      toprove: [], // 已有63人为他证明
      provePeople: false,
      peopleCount: 0,
      showToCertification: false,
      showconfirmPhone: false,
      showconfirm: false
    };
  },
  methods: {
    proveTab: function(proveID) {
      this.proveID = proveID;
    },
    toReport() {
       if (!this.G("token")) {
        this.showconfirm = true;
      } else {
        if (this.$store.state.user.mobile == null) {
          this.showconfirmPhone = true;
        }  
         else this.$router.push({ name: "report", params: { id: this.paramsID } });
     
      }
    },
      onConfirmPhone() {
          this.$router.push('/FirstBind')
      },
    toProve() {
      if (!this.G("token")) {
        this.showconfirm = true;
      } else {
        if (this.$store.state.user.mobile == null) {
          this.showconfirmPhone = true;
        } else if (
          this.$store.state.user.mobile !== null &&
          this.$store.state.user.is_certification == 1
        ) {
          this.$router.push({
            name: "iToProve",
            params: { id: this.paramsID }
          });
        } else if (
          this.$store.state.user.mobile !== null &&
          this.$store.state.user.is_certification == 0
        ) {
          this.showToCertification = true;
        }
      }
    },
    showProveList() {
      this.$router.replace("/proveList/" + this.paramsID);
    },
    onConfirm() {
      this.$router.push({
        path: "/login",
        query: { redirect: location.hostname }
      });
    },
    toRealName() {
      this.$router.push("/setrealname/0");
    }
  },
  created() {
    // 需求证明
    let _this = this;
    this.$http
      .post("hts/help/getDemandProof", {
        demand_id: this.paramsID
      })
      .then(function(response) {
        _this.proveListData = response.data.vos;
      })
      .catch(function(error) {});
    // 已有63人为他证明
    this.$http
      .post("hts/help/getWitnessList", {
        demand_code: this.paramsID
      })
      .then(function(response) {
        if (response.data.totals > 4) {
          _this.provePeople = true;
        } else {
          _this.provePeople = false;
        }
        _this.peopleCount = response.data.totals;
        _this.toprove = response.data.vos.slice(0, 5);
      })
      .catch(function(error) {});
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.needProve-container {
  padding: 0 17px 20px;
  margin-bottom: 10px;
  background: #fff;

  .needProve-title {
    padding: 16px 0 17px;
    font-size: 16px;
    color: #333;
  }

  .content-container {
    padding: 0 12px;
    background: #F6F6F6;
    border-radius: 9px;

    .prove-content {
      position: relative;
      display: flex;
      padding: 15px 0;

      &:after {
        position: absolute;
        bottom: 0;
        width: 100%;
        content: '';
        border-top: 1px solid #E5E5E5;
      }

      .content-left {
        flex: 0 0 26.6666%;
        font-size: 13px;
        color: #333;
      }

      .content-right {
        felx: 1;

        p {
          &:last-child {
            margin-bottom: 0;
          }
        }

        .plat-declare {
          color: #999;
          font-size: 13px;
        }

        .right-content {
          margin-bottom: 12px;
          color: #666;
          font-size: 13px;
        }

        .right-tip {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          font-size: 12px;
          color: #78C06E;

          span {
            margin-left: 5px;
          }
        }
      }
    }

    .complaint {
      padding: 15px 0;
      font-size: 12px;
      text-align: center;

      a {
        color: #999;
      }
    }
  }

  .reference-title {
    padding: 20px 0 0;
    font-size: 15px;
    color: #333;

    .toproveLink {
      float: right;
      color: #F37306;
      text-decoration: underline;
    }

    .xiahua {
      color: #F37306;
      text-decoration: underline;
    }
  }

  .reference-list {
    display: flex;
    margin: 20px 0 13px;

    &.active {
      justify-content: space-between;
    }

    li {
      position: relative;

      margin-right 5% {
        &.arrow {
          &:after {
            position: absolute;
            left: 25%;
            bottom: -13px;
            border-left: 7px solid transparent;
            border-bottom: 7px solid #F6F6F6;
            border-right: 7px solid transparent;
            border-top: 0px solid #F6F6F6;
            content: '';
          }
        }
      }
    }

    li, .moreProve {
      .bd-radius-cir {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
  }

  .reference-content {
    padding: 12px 13px;
    background-color: #F6F6F6;
    border-radius: 4px;

    p {
      &:first-child {
        color: #39AEDE;
        font-size: 14px;
        margin-bottom: 10px;

        i {
          margin-left: 5px;
        }
      }

      &:last-child {
        color: #999;
        font-size: 13px;
      }
    }
  }
}
</style>
