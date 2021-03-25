<template>
  <div >
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="goback">注册信息已提交</x-header>
    <div class="box-withheader over-auto box-bg bg-f6f5f6">
    <h4 class="c-a text-center f-16 box-content-h4">信息待审核</h4>
    <div class="box-content">
      <p><span class="content-l">审核身份：</span><span class="content-r">{{identity}}</span></p>
      <p><span class="content-l">登录账号/手机号：</span><span class="content-r">{{phone}}</span></p>
      <!-- <p><span class="content-l">密码：</span><span class="content-r">{{"******"}}</span></p> -->
      <p><span class="content-l">真实姓名：</span><span class="content-r">{{name}}</span></p>
      <p><span class="content-l">身份证：</span><span class="content-r">{{idcard}}</span></p>
      <p><span class="content-l">负责区域：</span><span class="content-r">{{territory}}</span></p>
    </div>
      <p class="c-a texttip">您可使用申请的手机号与密码，登录系统，在个人中心查看审核状态</p>
    <!--<button class="btn-orange-lg" @click="clearLocalStorage"> 完成 </button>-->
    <!-- <div class="btn-area">
      <x-button class="btn-orange-lg" type="primary" action-type="button" @click.native="clearLocalStorage">完成</x-button>
    </div> -->

    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
export default {
  components: {
    XButton
  },
  methods: {
    goback() {
      this.$router.replace({ path: "/user" });
    }
  },
  data() {
    return {
      identity: "", // 审核身份
      phone: "", // 手机号
      pass: "", // 密码
      name: "", // 姓名
      idcard: "", // 身份证号
      territory: "" // 负责区域
    };
  },
  created: function() {
    var storage = window.localStorage;
    this.$http.post("hts/management/viewAdminStatus").then(res => {
        this.identity = "村级管理员";
      if (res.data.user_level == 4) {
        this.identity = "乡级管理员";
      }
      this.phone = res.data.mobile;
      this.name = res.data.realname;
      this.idcard = res.data.idcard;
      this.territory = res.data.region_name;
    });
    this.territory
      ? this.territory
      : "";
    this.identity
      ? this.identity
      : ""
    this.idcard ? this.idcard : "";
    this.phone ? this.phone :"";
    this.name ? this.name : "";
  }
};
</script>

<style scoped>
.btn-area {
  padding: 30px 0;
}
.box-bg {
  padding: 0 30px;
}

.box-content-h4 {
  padding: 10px;
}

.box-content {
  margin: 10px auto 0 auto;
  background: #ffffff;
  padding-bottom: 30px;
  border-radius: 5px;
  font-size: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.box-content p {
  padding: 10px 15px;
}
p.texttip {
  margin: 15px 0;
}
.content-r {
  color: #999999;
}

.ovueButton {
  width: 70%;
  height: 50px;
  margin: 30px 15% 30px 15%;
  line-height: 50px;
  text-align: center;
  background: #f37306;
  color: #ffffff;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
}
.ovueButton a {
  color: #ffffff;
}
</style>
