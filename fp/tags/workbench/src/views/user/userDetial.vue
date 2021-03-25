<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>
    </div>
    <div class="contennt_main">
      <el-row>
        <el-col :span="10">
          <div class="bm">
            <div class="tc">
              <img class="img_index" :src="errorImg" :onerror="errorImg" v-if="userDetial.user_pic === null"/>
              <img class="img_index" :src="userDetial.user_pic" :onerror="errorImg" v-if="userDetial.user_pic !== null"/>
            </div>
            <div class="tc ptb"><span>{{userDetial.levelName}}</span>  <span>{{userDetial.realname}}</span></div>
            <div class="tc ptb"><p>{{userDetial.mobile}}</p></div>
            <div style="overflow: hidden;">
              <div class="wd tc" style="margin: 10px;border-right:1px solid #999999; ">
                <p class="ce">本月帮扶金额</p>
                <p>{{userDetial.paid_money_month}}</p>
              </div>
              <div class="wd tc" style="margin: 10px;">
                <p class="ce">总帮扶金额</p>
                <p>{{userDetial.paid_money_total}}</p>
              </div><hr />
              <div class="wd tc" style="margin: 10px;border-right:1px solid #999999">
                <p class="ce">本月帮扶次数</p>
                <p>{{userDetial.bf_times_month}}</p>
              </div>
              <div class="wd tc" style="margin: 10px;">
                <p class="ce">总帮扶次数</p>
                <p>{{userDetial.bf_times_total}}</p>
              </div>
            </div>
            <div class="tc bt">
              <div>
                <p><span class="ce">总邀请数</span>  <span class="pl">{{userDetial.receive_total}}</span></p>
              </div>
            </div>
            <!--<div class="tc">-->
            <!--<p>用户邀请码</p>-->
            <!--<img src="./er.png" />-->
            <!--</div>-->
          </div>
        </el-col>
        <el-col :span="14">
          <div class="bm">
            <p><span class="m">ID</span>  <span class="m_span">{{userDetial.id}}</span></p>
          </div>
          <div class="bm">
            <p><span class="m">用户名</span>  <span class="m_span">{{userDetial.login_name}}</span></p>
          </div>
          <div class="bm">
            <p><span class="m">昵称</span>  <span class="m_span">{{userDetial.nick_name}}</span></p>
          </div>
          <div class="bm">
            <p><span class="m">姓名</span>  <span class="m_span">{{userDetial.realname}}</span></p>
          </div>
          <div class="bm">
            <p><span class="m">账号/手机号</span>  <span class="m_span">{{userDetial.mobile}}</span></p>
          </div>
          <div class="bm">
            <p><span class="m">身份证号</span>  <span class="m_span">{{userDetial.idcard}}</span></p>
          </div>
          <div class="bm">
            <p><span class="m">生日</span>  <span class="m_span">{{userDetial.birthdayString}}</span></p>
          </div>
          <div class="bm">
            <p>
              <span class="m">管理级别</span>
              <span class="m_span" v-if = "userDetial.user_level == '5' ">村级管理员</span>
              <span class="m_span" v-if = "userDetial.user_level == '4' ">乡级管理员</span>
              <span class="m_span" v-if = "userDetial.user_level == '3' ">县级管理员</span>
              <span class="m_span" v-if = "userDetial.user_level == '2' ">市级管理员</span>
              <span class="m_span" v-if = "userDetial.user_level == '1' ">省级管理员</span>
            </p>
          </div>
          <div class="bm">
            <p><span class="m">关注地区</span>  <span class="m_span">{{userDetial.concern_region_name}}</span></p>
          </div>
          <div class="bm">
            <p>
              <span class="m">用户类型</span>
              <span class="m_span" v-if = "userDetial.is_poor == '0'">非贫困</span>
              <span class="m_span" v-if = "userDetial.is_poor == '1'">贫困</span>
            </p>
          </div>
          <div class="bm">
            <p><span class="m">特殊权限</span>  <span class="m_span"></span></p>
          </div>
          <div class="bm">
            <p><span class="m">机构名称</span>  <span class="m_span">{{userDetial.org_name}}</span></p>
          </div>
          <div class="bm">
            <p><span class="m">注册时间</span>  <span class="m_span">{{userDetial.register_time}}</span></p>
          </div>
          <div class="bm">
            <p><span class="m">最后登录</span>  <span class="m_span">{{userDetial.login_time}}</span></p>
          </div>
          <div class="bm">
            <p>
              <span class="m">状态</span>
              <span class="m_span" v-if = "userDetial.user_status == '1'">正常</span>
              <span class="m_span" v-if = "userDetial.user_status == '0'">冻结</span>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>


  let newVar = {
    name: 'userDetial',

    data() {
      return {
        userDetial: {},
        userAddress: [],
        userBank: [],
        errorImg:'this.src="' + require('../../assets/ErrorImg.png') + '"'
      }
    },
    filters:{
      mobile(value){
        if(value === null)return ''
        return value.substr(0,3)+"****"+value.substr(7);
      }
    },
    created() {
      this.getDetial()
     // this.getAddress()
     // this.getBank()
    },
    methods: {
      getDetial() {
        //此处加判断否
        this.$http.post('uts/user/getUserAccountInfo', {
          uid: this.$route.params.id
        }).then(response => {
          this.userDetial = response
          console.log(response)
        })
      },
      getAddress() {
        this.$http.post('uts/user/addressList').then(response => {
          this.userAddress = response
        })
      },
      getBank() {
        this.$http.post('uts/user/bankList').then(response => {
          this.userBank = response
        })
      },
    }
  };
  export default newVar
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .contennt_main{
    width: 100%;
    min-height: 100vh;
  }
  .tc{
    text-align: center;
  }
  .wd{
    width: 44%;
    float: left;
  }
  .bm{
    margin: 10px;
  }
  .bt{
    border-top: 1px solid #909399;
  }
  .bl{
    border-right: 1px solid #909399;
  }
  .pl{
    padding-left: 30px;
  }
  .ce{
    color: #909399;
  }
  .ptb{
    padding: 5px 0 5px 0;
  }
  .img_index{
    width: 100px;height: 100px;
    border-radius: 50%;
    border: 1px solid #909399;
    margin-top: 15px;
    margin-bottom:15px;
  }
  .m{
    margin: 0 0 0 15px;
    width: 100px;
    display: inline-block;
  }
  .m_span{
    margin: 0 0 0 15px;
    font-size: 14px;
    color: #909399;
  }
  .paddr{
    padding-left: 115px;
  }
  .p_top{
    padding-top: 15px;
  }
  .p_bottom{
    padding-bottom: 10px;
  }
</style>
