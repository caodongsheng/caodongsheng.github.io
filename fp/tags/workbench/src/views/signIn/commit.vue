<template>
  <div class="big">
    <div class="top-header">
      <div class="header-wrap">
      </div>
    </div>
    <div class="main">
      <div class="app-container">
        <p>您的注册信息已提交，请等待审核，您可使用申请的手机号与密码，登录管理员系统，查看审核状态。</p>

        <p>审核身份：{{msg.user_level | guo}}</p>

        <p>登录账号/手机号：{{msg.mobile}}</p>

        <p>密码：***** </p>

        <p>姓名：{{msg.realname}}</p>

        <p>身份证号：{{msg.idcard}}</p>

        <p> 负责区域：{{msg.region_name}}</p>

        <p style="color: #FF9900">您的注册信息已提交，请等待审核，您可使用申请的手机号与密码，登录管理员系统，查看审核状态。</p>

        <p style="color: #FF9900">如果您还未在中国社会扶贫网APP注册，也可以使用您的手机号与密码进行登录使用。</p>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import store from '@/store'
  export default {
    data(){
      return{
        msg:{}
      }
    },
    filters:{
      guo(value){
        if(value === 1){
          return "省级管理员"
        }else if (value === 2){
          return "市级管理员"
        }else if (value === 3){
          return "县级管理员"
        }else if (value === 4){
          return "乡级管理员"
        }else{
          return "村级管理员"
        }
      }
    },
    methods:{
      getjson(){
        this.$http.post("/hts/management/viewAdminStatus",{
        }).then(res => {
          this.msg=res
        })
      }
    },
    created(){
      this.getjson()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container{
    height: 540px;
    width: 1200px;
    margin: 0 auto;
  }
  .top-header {
    height: 90px;
    left: 0;
    right: 0;
    position: absolute;
    top: 0;
    background: #fff;
    border-bottom: 1px solid #ddd;
    .header-wrap {
      width: 1200px;
      margin: 0 auto;
      background: url(./logo.png) no-repeat left 14px;
      height: 90px;
    }
  }
  .big{
    background: url(./login-bg.jpg) no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    display: table;
    .main{
      display: table-cell;
      vertical-align: middle;
      padding-top: 30px;
    }
  }
</style>
