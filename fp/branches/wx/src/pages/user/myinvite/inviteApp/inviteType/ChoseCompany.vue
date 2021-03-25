<template>
  <div class="Myinvitation" @click="CloseSelect">
    <!-- <headers :title = "{'name':'我的邀请','bg':'true','right':'0'}"></headers> -->
    <x-header :left-options="{backText: ''}" title="我的邀请"></x-header>
    <div class="box-withbar over-auto">
      <h1>{{ msg }}</h1>
      <div class="AreaChose">
        <div class="CityBox">
          <div v-for="num in AreaBox " class="SelectAreaBox" :value="num" @click="Open_Select(num)" @click.stop>
            <span>{{MsgArr[num]}}</span>
            <b></b>
            <ul :class="{ Area_ul : ul_ShowArr[num] }" :value="num">
              <li v-for="item in AreaDataArr[num]"  @click="getAreaData(item,num)">{{item.orgName}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-bottom Submit" @click='submitConfirm' :class="Sisactived?'SubmitColor':'SubmitGrey'">
      完成
    </div>
    <!-- 弹窗 -->
    <div class="confirmSubmit" v-show="ifsubmit">
      <div class="confirmSubmitDiv"> 
        <p class="c_title">提示</p>
        <p class="c_cont">是否确认生成所在企业为<span>“{{confirmArea}}”</span>的邀请二维码信息</p>
        <div class="confirmDiv">
          <div class="c_cancel" @click="s_cancel">取消</div>
          <div class="c_confirm" @click="submitto">确定</div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div v-show="ifChose" class="confirmSubmit">
      <div class="confirmSubmitDiv_l">
          <p class="c_title">提示</p>
          <p class="c_cont_l">{{NullChose}}</p>
          <div @click="ChoseisNull()" class="c_confirm_s">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
// import headers from '@/components/header/header.vue'
  import {XHeader} from 'vux'
export default {
  name: 'Myinvitation',
  components:{XHeader},
  // components:{headers},
  data () {
    return {
      msg: '选择所在企业',
      MsgArr: ['请选择您所任职的机构'],
      AreaBox:[0],
      AreaDataArr: [],
      ul_ShowArr:[true],
      SM_Area_Data: [],
      Sisactived:0,
      confirmArea:'',
      ifsubmit:false,
      ifChose: false,
      NullChose:'',
    }
  },
  created: function() {
    // this.$public.ifWxBrowser();
    this.$public.setDocTitle('我的邀请');
    // var userId = this.$public.getUrlKey('userId');
    let this_ = this;
    // this.$store.commit('defaultT',userId)
    // console.log(userId);
    this.$getData.get('grd/enterprise/getEnterpriseList').then(res=>{
      console.log(res)
      if(res.status==200){
        this_.AreaDataArr[0] = res.data.data;
      }
    }).catch(function (error) {
      console.log(error);
    })
  },
  mounted: function() {
  },
  methods:{
    addcount: function() {
      this.$store.commit('Count', 15)
    },
    ChoseisNull(){
      this.ifChose=false;
    },
    submitConfirm: function () {
      this.confirmArea=this.$public.confirmQrCodeArea(2,this.SM_Area_Data,this)
    },
    s_cancel(){
      this.ifsubmit=false;
    },
    submitto: function() {
      console.log(this.SM_Area_Data)
      let param={
        userId:this.$store.state.user.id,
      }
      this.$public.createQRCode(2,this.SM_Area_Data,this);      //inviteType={0:个人;  1:干部1;   2:企业;}
    },
    getAreaData: function(r,m) {
      let this_ = this;
      this.Sisactived=1;
      this.SM_Area_Data[m]= r;
      this.$set(this.MsgArr, m, r.orgName)
      console.log(this.SM_Area_Data)
      
    },
    CloseSelect: function() {
      for(let i = 0;i<=4;i++){
        this.$set(this.ul_ShowArr, i, true)
      }
    },
    Open_Select:function(v){
      if(this.ul_ShowArr[v]){
        this.$set(this.ul_ShowArr, v, false)
      }else{
        this.$set(this.ul_ShowArr, v, true)
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Myinvitation{
  width: 100%;
  height: -webkit-fill-available;
}
div.Myinvitation h1{
  font-size: 15px;
  font-weight: normal;
  color: #333333;
  line-height: 15px;
  margin: 0 auto;
  margin-top: 60px;
  width: 216px;
  text-align: left;
  text-indent: 4px;
}
.AreaChose{
  width: 100%;
  /*height: -webkit-fill-available;*/
  font-size: 14px;
  text-align: left;
  /*background: yellow;*/
}
.CityBox{
  width: 100%;
  z-index: 998;
  background: #fff;
}
.CityBox div.SelectAreaBox{
  width: 216px;
  height: 38px;
  border-bottom: 1px solid #dcdcdc;
  margin: 18px auto 0;
  border-radius: 2px;
  position: relative;
  line-height: 38px;
  padding-left: 8px;
  color: #999999;
  font-size: 14px;
}
.CityBox div ul{
  width: 224px;
  max-height: 260px;
  overflow-y: auto;
  position: absolute;
  left: -1px;
  top: 38px;
  background: #fff;
  z-index: 999;
  border: 1px solid #dcdcdc; 
  box-shadow: 0px 2px 1px 0px #CCC;
}
.CityBox div ul li{
  width: 100%;
  height: 30px;
  list-style: none;
  line-height: 30px;
  padding-left: 8px;
  box-sizing: border-box;
  background: #fff;
  /*border-bottom: 1px solid #eee;*/
}
.CityBox div ul li:last-child{
  border-bottom: none;
}
.CityBox div ul li:hover{
  background: #f57c16;
  color: #fff;
}
.CityBox div b{
  width: 10px;
  height: 7px;
  background: url('../../img/typeimg/Selets.png');
  float: right;
  margin: 16px 7px 0 0 ;
  background-size: cover;
}
.Area_ul{
  display: none;
}
.Submit{
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  color: #FFF;
  position: fixed;
  bottom: 0px;
  text-align: center;
}
.SubmitColor{
  background: url("../../img/header/nextbgi.png");
}
.SubmitGrey{
  background: #888
}
.confirmSubmit{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  position: fixed;
  overflow: hidden;
  top: 0;
  z-index: 1000;
}
.confirmSubmitDiv,.confirmSubmitDiv_l{
  width: 250px;
  margin: 0 auto;
  position: relative;
  top: 150px;
  background: #FFF;
  border-radius: 10px;
}
.confirmSubmitDiv{
  height: 206px;
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
}
.c_cont{
  height: 80px;
}
.c_cont_l{
  margin-top: 25px;
  text-align: center;
}
.confirmDiv{
  margin-top: 24px;
  border-top: 1px solid #CCC;
  position: absolute;
  bottom: 0;
}
.c_cancel,.c_confirm{
  width: 120px;
  font-size: 15px;
  height: 40px;
  float: left;
  line-height: 40px;
}
.c_cancel{
  font-family: 'SourceHanSansCN Regular';
  color: #919090;
  border-right: 1px solid #ccc;
  font-weight: bold;
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
