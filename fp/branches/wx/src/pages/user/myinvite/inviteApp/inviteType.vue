<template>
  <div class="ChoseType">
   <!--  <headers :title = "{'name':'个人邀请码创建','bg':'true','right':'0','back':this.$public.getUrlKey('returnback')}"></headers> -->
    <x-header :left-options="{backText: ''}" title="选择邀请类型"></x-header>
    <h1>{{ msg }}</h1>
    <div class="Chose">
      <div v-if="userTypeNum!=2" class="CC" @click="ClickType(1)">
          <!-- <img v-show="ChoseActive[1]" src="../../assets/typeimg/_company.png"> -->
          <!-- <img v-show="!ChoseActive[1]" src="../../assets/typeimg/_company_t.png"> -->
          <p>企业邀请</p>
      </div>
      <div v-if="userTypeNum==3" class="CDA" @click="ClickType(0)">
          <!-- <img v-show="ChoseActive[0]" src="../../assets/typeimg/_cadre.png"> -->
          <!-- <img v-show="!ChoseActive[0]" src="../../assets/typeimg/_cadre_t.png"> -->
          <p>扶贫干部邀请</p>
      </div>
      <div class="CLA" @click="ClickType(2)">
          <!-- <img v-show="ChoseActive[2]" src="../../assets/typeimg/_person.png"> -->
          <!-- <img v-show="!ChoseActive[2]" src="../../assets/typeimg/_person_t.png"> -->
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
// import headers from '@/components/header/header.vue'
export default {
  name: 'inviteType',
  components:{headers},
  data () {
    return {
      routerValue: '',
      ChoseActive:[true,true,true],
      isactived:0,
      ifChose:false,
      userTypeNum:0,
    }
  },
  created: function() {
    var this_ct=this;
    this.$public.setDocTitle('个人邀请码创建');
    this.jsonp()
  },
  mounted: function() {
    var _this=this;
  },
  computed:{
    msg:function(){
      let v = this.$public.getUrlKey('hasQrcode')
      console.log(v)
      if(v){
        return '请选择以下生成类型：'
      }else{
        return '暂无二维码，请选择以下生成类型：'
      }
    }
  },
  methods:{
    addcount: function() {
      this.$store.commit('Count', 15)
    },
    ChoseisNull(){
      this.ifChose=false;
    },
    ToNext:function(){
      if(this.isactived==1){
        this.$public.routerTo(this,this.routerValue)
      }else {
        this.ifChose=true;
      }
    },
    ClickType: function(value) {
      this.isactived=1;
      switch (value) {
        case 0:
          this.routerValue='/CT/CDA';
          this.ChoseActive=[false,true,true];
          break;
        case 1:
          this.routerValue='/CT/CC';
          this.ChoseActive=[true,false,true];
          break;
        case 2:
          this.routerValue='/CT/CLA';
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
  /*background: url("../../assets/header/nextbgi.png");*/
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
