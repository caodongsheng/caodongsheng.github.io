<template>
  <div class="ChoseType">
    <x-header @on-click-title="backto" :left-options="{backText: ''}" title="个人邀请码创建"></x-header>
    <h1>{{ msg }}</h1>
    <div class="Chose">
      <div v-if="userTypeNum!=2" class="CC" @click="ClickType(1)">
          <img v-show="ChoseActive[1]" src="../../img/typeimg/_company.png">
          <img v-show="!ChoseActive[1]" src="../../img/typeimg/_company_t.png">
          <p>企业邀请</p>
      </div>
      <div v-if="userTypeNum==3" class="CDA" @click="ClickType(0)">
          <img v-show="ChoseActive[0]" src="../../img/typeimg/_cadre.png">
          <img v-show="!ChoseActive[0]" src="../../img/typeimg/_cadre_t.png">
          <p>扶贫干部邀请</p>
      </div>
      <div class="CLA" @click="ClickType(2)">
          <img v-show="ChoseActive[2]" src="../../img/typeimg/_person.png">
          <img v-show="!ChoseActive[2]" src="../../img/typeimg/_person_t.png">
          <p>个人邀请</p>
      </div>
    </div>
    <div class="Next" :class="isactived?'NextColor':'NextGrey'" @click="ToNext()">下一步</div>
    <!-- 弹窗 -->
    <div v-show="ifChose" class="delConfirm">
        <div class="confrimDiv">
            <p class="c_title">提示</p>
            <p class="c_cont_l">请选择二维码生成类型</p>
            <div @click="ChoseisNull()" class="c_confirm_s">确认</div>
        </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
export default {
  name: 'inviteType',
  components:{XHeader},
  data () {
    return {
      routerValue: '',
      ChoseActive:[true,true,true],
      isactived:0,
      ifChose:false,
      userTypeNum:1,
      userId:0,
    }
  },
  created: function() {
    let token = this.G('token');
    console.log(token)
    this.$http.post('uts/ccbUser/getUserInfo',{token:token}).then(res=>{
      console.log(res)
      this.userId=res.data.id;
      if(res.data.is_cadre==1){
        this.userTypeNum=3
      }
      if(res.data.is_poor==1){
        this.userTypeNum=2
      }
    })
  },
  mounted: function() {
    var _this=this;
  },
  computed:{
    msg:function(){
      let v = this.getUrlKey('hasQrcode')
      console.log(v)
      if(v){
        return '请选择以下生成类型：'
      }else{
        return '暂无二维码，请选择以下生成类型：'
      }
    }
  },
  methods:{
    backto(){
      console.log('inviteType')
    },
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    addcount: function() {
      this.$store.commit('Count', 15)
    },
    ChoseisNull(){
      this.ifChose=false;
    },
    ToNext:function(){
      if(this.isactived==1){
        this.$router.push({path:this.routerValue,query:{'t':this.userId}})
      }else {
        this.ifChose=true;
      }
    },
    ClickType: function(value) {
      this.isactived=1;
      switch (value) {
        case 0:
          this.routerValue='/inviteType/CDA';
          this.ChoseActive=[false,true,true];
          break;
        case 1:
          this.routerValue='/inviteType/CC';
          this.ChoseActive=[true,false,true];
          break;
        case 2:
          this.routerValue='/inviteType/CLA';
          this.ChoseActive=[true,true,false];
          break;
        default:
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ChoseType{
  text-align: center;
}
.ChoseType>h1{
  font-size: 15px;
  color: #333333;
  line-height: 15px;
  margin-top: 60px;
}
.Chose{
  width: 78%;
  margin: 43px auto 0 auto;
  display: flex;
  justify-content: space-around;
}
.CDA,.CC,.CLA{
  background: #FFF;
  line-height: 30px;
  margin: auto 15px;
}
div.Chose img{
  width: 75px;
  height: 75px;
  margin: 0 auto;
}
div.Chose p{
  margin-top: 14px;
  font-size: 13px;
  line-height: 13px;  
  color: #333333;
  white-space: nowrap;
}
.Next{
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  color: #FFF;
  position: fixed;
  bottom: 0px;
}
.NextColor{
  background: url("../../img/header/nextbgi.png");
}
.NextGrey{
  background: #888;
}
.delConfirm{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  position: fixed;
  overflow: hidden;
  top: 0;
  z-index: 2;
}
.confrimDiv{
  width: 250px;
  margin: 0 auto;
  position: relative;
  top: 150px;
  background: #FFF;
  border-radius: 10px;
}
.c_title{
  font-family: 'PingFangSC Medium';
  font-size: 17px;
  font-weight: bold;
  color: #333;
  padding-top: 20px;
}
.c_cont,.c_cont_l{
  font-family: 'PingFangSC Regular';
  font-size: 16px;
  width: 230px;
  margin: 0 auto;
  color: #666;
  margin-top: 20px;
  text-align: left;
  text-indent: 32px;
}
.c_cont_l{
  margin-top: 25px;
  text-align: center;
  text-indent: 0;
}
.c_confirm{
  width: 120px;
  font-size: 15px;
  height: 40px;
  float: left;
  line-height: 40px;
  margin-top: 24px;
}
.c_confirm{
  font-family: 'SourceHanSansCN Medium';
  color: #EE6B2B;
  font-weight: bold;
}
.c_confirm_s{
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #CCC;
  margin-top: 45px;
  font-family: 'SourceHanSansCN Medium';
  color: #EE6B2B;
  font-weight: bold;
}
</style>
