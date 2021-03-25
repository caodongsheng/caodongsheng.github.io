<template>
  <div class="big">
    <div class="top-header">
      <div class="header-wrap">
      </div>
    </div>
    <div class="main">
      <div class="app-container">
        <el-form :model="formModel" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  style="text-align: left;">
          <el-form-item label="身份选择" prop="id" :rules="[{ required: true, message: '请选择身份', trigger: 'change' },]">
            <el-select v-model="formModel.id" placeholder="请选择活动区域" @change="check">
              <el-option v-for="item in levelOptions" :key="'asds'+item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' },]">
            <el-input v-model="formModel.name" placeholder="输入真实姓名" :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="uCard">
            <el-input v-model="formModel.uCard" placeholder="输入真实身份证号" :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="负责区域">
            <el-select v-model="formModel.province" placeholder="省" @change="getProv($event)">
              <el-option v-for="(item,index) in province" :key="index" :label="item.regionName" :value="item.id"/>
            </el-select><!--省-->
            <el-select v-model="formModel.town" v-if="formModel.province!==''" placeholder="市"  @change="getTown($event)">
              <el-option v-for="(item,index) in town" :key="index" :label="item.regionName" :value="item.id"/>
            </el-select><!--市-->
            <el-select v-model="formModel.area" v-if="formModel.town!==''" placeholder="区" @change="getCalm($event)">
              <el-option v-for="(item,index) in area" :key="index" :label="item.regionName" :value="item.id"/>
            </el-select><!--区-->
            <el-select v-model="formModel.calm" v-if="calm.length!==0" placeholder="镇" @change="getBurg($event,calm)">
              <el-option v-for="(item,index) in calm" :key="index" :label="item.regionName" :value="item.id"/>
            </el-select><!--镇-->
            <el-select v-model="formModel.burg" v-if="burg.length!==0 && flag2 !== false" placeholder="村" @change="getRegionName($event,burg)">
              <el-option v-for="(item,index) in burg" :key="index" :label="item.regionName" :value="item.id"/>
            </el-select><!--村-->
          </el-form-item>
          <el-form-item label="输入手机号" prop="uPhone">  
            <el-input v-model="formModel.uPhone" placeholder="输入11位手机号" :disabled="flag"></el-input>   
          </el-form-item>
          <p style="font-size: 14px">  
            点击提交即同意《中国社会扶贫网用户注册协议》《免责条款》 
          </p>
        </el-form>
        <el-button type="success" style="margin-top: 60px;" @click="loginup">提交</el-button>  
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import linkage from '@/components/linkage'
  import {card,validdateMobile,validpass} from  './rules'
  export default {
    data (){
      let checkcard = (rule,value,callback) => {
        if (!value) {
          return callback(new Error('身份证号不能为空'));
        }else if (card(value)) {
          return callback();
        } else{
          return callback(new Error('请输入正确的身份证号'));
        }
      }
      let checkphone = (rule,value,callback)=>{
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }else if (validdateMobile(value)) {
          return callback();
        } else{
          return callback(new Error('请输入正确的手机号'));
        }
      }
      let checkpass = (rule,value,callback)=> {
        if (!value) {
          return callback(new Error('密码不能为空'));
        } else if (validpass(value)) {
          return callback();
        } else {
          return callback(new Error('请必须且只含有数字和字母，8-20位'));
        }
      }
      return {
        flag:false,
        path:"http://www.fp1017.org.cn/",
        levelOptions: [{ id: 5, name: '村级管理员' }, { id: 4, name: '乡级管理员' }],
        formModel:{
          id:"",
          name:"",
          uCard:"",
          uPhone:"",
          province:"",
          town:"",
          area:"",
          calm:"",
          burg:"",
        },
        flag2:true,
        town:[],
        province:[],
        area:[],
        calm:[],
        burg:[],
        va:false,
        territory:"",
        rules: {
          uCard:[{required: true,validator: checkcard, trigger: 'blur' }],
        },
      }
    },
    components: {
      linkage
    },
    created(){
      this.select()
      this.getuser()
    },
    methods:{
      check(){
        if(this.formModel.id === 4){
          this.flag2=false
        }
      },
      getuser(){
        this.$http.post("/uts/user/getUserInfo",{
        }).then(res => {
          this.formModel.name=res.realname
          this.formModel.uCard=res.idcard
          this.formModel.uPhone=res.mobile
          this.formModel.pass= "********"
          if(res.is_certification === 1){
            this.flag=true
          }
        })
      },
      select(){
        this.$http.post("/eai/authRegion/selectDate",{
          parentId:"100",
          type:1
        }).then(res => {
          this.province=res
        })
      },//省
      getProv(ev){
        this.$http.post("/eai/authRegion/selectDate",{
          parentId:ev,
          type:2
        }).then(res => {
          this.formModel.town=''
          this.formModel.area=""
          this.formModel.calm=""
          this.formModel.burg=""
          this.town=res
        })
      },//市
      getTown(ev){
        this.$http.post("/eai/authRegion/selectDate",{
          parentId:ev,
          type:3
        }).then(res => {
          this.formModel.area=""
          this.area=res
        })
      },//区
      getCalm(ev){
        this.$http.post("/eai/authRegion/selectDate",{
          parentId:ev,
          type:4
        }).then(res => {
          if(res === "此父区划下无子区划"){
            this.calm=[]
            alert(res)
          }else{
            this.formModel.calm=""
            this.calm=res
          }
        })
      },//镇
      getBurg(ev,item){
        this.$http.post("/eai/authRegion/selectDate",{
          parentId:ev,
          type:5
        }).then(res => {
          if(res === "此父区划下无子区划"){
            this.burg=[]
            alert(res)
          }else {
            this.formModel.burg = ""
            this.burg = res
            item.find(res => {
              if(res.id === ev){
                this.territory=res.regionName
              }
            })
          }
        })
      },//村
      getRegionName(ev,item){
        item.find(res => {
          if(res.id === ev){
            this.territory=res.regionName
          }
        })
      },
      loginup(){
        this.$http.post("/hts/management/addAdmin2",{
          phone:this.formModel.uPhone,
          pass:this.formModel.pass,
          name:this.formModel.name,
          icode:this.formModel.phoned,
          idcard:this.formModel.uCard,
          identity:this.formModel.id,
          ywNo:1,
          territoryId:this.formModel.calm === ''? this.formModel.burg:this.formModel.calm,
          territory:this.territory
        }).then(res => {
          if(res === "请求成功"){
            alert("注册成功")
          }
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  .el-form{
    width: 450px;
  }
  .app-container{
    text-align: center;
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
</style>
