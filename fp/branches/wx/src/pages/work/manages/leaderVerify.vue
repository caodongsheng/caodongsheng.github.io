<template>
  <!--扶贫干部审核-->
    <div >
        <x-header :left-options="{backText: ''}">{{headerTitle}}</x-header>
        <div class="bg-f6f5f6 box-withheader over-auto">
            <div class="bg-ffffff mt-12">
                <group label-width="4.5em" label-margin-right="2em" label-align="left"  class="group-clearbd">
                    <cell title="申请级别">村级管理员</cell>
                    <cell title="姓名" >{{this.managersCheck.realname}}</cell>
                    <cell title="手机号" >{{this.managersCheck.mobile}}</cell>
                    <cell title="身份证号" >{{this.managersCheck.idcard}}</cell>
                    <cell title="负责区域">{{this.managersCheck.region_name}}</cell>
                </group>
                <div class="clear"></div>
                <!--foot-->
                <div class="love-need-foot">
                    <ul>
                        <li>
                            <router-link to="">
                                <p @click="failed()">不通过</p>
                            </router-link>
                        </li>
                        <li class="c-b-a">
                            <router-link to="" style="color:#ffffff">
                                <p @click="showpassconfirm=true">通过</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
         <div>
             <confirm v-model="showpassconfirm" title = '提示' @on-confirm = "pass" @on-cancel="showpassconfirm=false"><p style="text-align:center;">确定此用户审核通过？</p></confirm>

             <confirm v-model="showconfirm" show-input   title="审核不通过原因" @on-cancel="onCancel" @on-confirm="onConfirm" >
                  <x-textarea
         
          :height="300"
          :class="getClass"
          :min="5" 
          :max="500"
          placeholder="请填写不通过的原因"
          @on-blur="changevx"
          v-model="value"
        
        ></x-textarea>
             </confirm>
    </div>
    </div>
    
</template>
<script>
import headerBackTitle from '../../../components/header/headerBackTitle'
import {Group, Cell, XHeader,Confirm} from 'vux'
import {checkDesc} from '@/util/validFun.js';

export default {
  components: {
    headerBackTitle,
    Group,
    Cell,
    XHeader,Confirm
  },
  data () {
    return {
      headerTitle: '扶贫干部审核',
      managersCheck: {},
      showconfirm:false,
      value:"",
      showpassconfirm:false

    }
  },
   computed:{
 getClass(){
      if(this.value.replace(/(^\s*)|(\s*$)/g, "").length<5){
        return "redfont"
      }
      else{
        return ""
      }
    }
  },
   watch: {
       value(val) {
        this.$nextTick(() => {
          let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
          this.value = val.replace(pattern, ''); 
       
        })
      }

    },
  methods: {
        changevx() {
      setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    valideContent() {
      let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/;
      this.value = this.value.replace(pattern, "");
    },
        // 扶贫干部审核通过
    pass () {
      this.$http.post('hts/management/approve',
            {'id': this.managersCheck.id, 'status': 1})
            .then(res => {
              if(res.code == 'HTSI0000') {
                  this.showToast('', 'text', '审核通过', '20em', '', 'middle')
                  this.$router.replace({name: 'leaderManage'})
              }
              
            })
            this.showpassconfirm = false;
    },
     onCancel () {
        this.showconfirm = false;
    },
    onConfirm () {
         let obj = checkDesc(this.value, 5, 500, "不通过原因内容");
      if (!obj.valid) {
        this.showToast("", "text", obj.msg);
        return;
      } else {
        if (!/[^\x00-\xff]{5,500}$/.test( this.value.replace(/(^\s*)|(\s*$)/g, ""))) {
          
            this.showToast("", "text", "不通过原因输入有误，必须是中文字符");
            return;
          
        }
      }
          this.$http.post('hts/management/approve',
            {'id': this.managersCheck.id, 'status': 2,'check_opinion':this.value})
            .then(res => {
              this.showToast('', 'text', '审核不通过', '20em', '', 'middle')
               this.$router.replace({name: 'leaderManage'})
            })
      this.showconfirm = false;
    },
        // 扶贫干部审核未通过
    failed () {
          this.showconfirm = true;
        
    },
    backToPre () {
         this.$router.replace({name: 'leaderManage'})
        //this.$router.go(-1)
    }
  },
  created () {
    this.$http.post('hts/management/userDetails',
        {'id': this.$route.params.id})
        .then(res => {
          this.managersCheck = res.data
        })
  }
}
</script>

<style scoped>
.love-need-foot {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #fff;
}

.love-need-foot ul {
    width: 100%;
    background-color: #fff;
}

.love-need-foot ul li {
    float: left;
    width: 50%;
    text-align: center;
    padding: 3% 0 3%;
}
.redfont >>> span{
    color:#ff0000;
}
.love-need-foot p i {
    padding-right: 5px;
}
  /*group去掉边线*/
.group-clearbd >>> .weui-cells {
    margin-top: 0 !important;
    font-size: 15px;
}
.group-clearbd >>> .weui-cells {
    margin-top: 0;
    background: transparent;
}
.group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
}
.weui-cell{padding: 14px 15px}
    .weui-cell:before{right:15px}
    .weui-cell >>> .weui-cell__ft {
    font-size: 14px;
    padding-right: 0
}
.weui-cell >>> input {
    font-size: 14px;
    color: #999
}
.weui-cell.vux-tap-active >>> .weui-cell__ft {
    padding-right: 18px
}
.vux-cell-box >>> .weui-cell {
    padding: 14px 15px;
    font-size: 15px
}

.vux-cell-box >>> .weui-cell:before {
    right: 15px
}
.vux-cell-box >>> .weui-cell .weui-cell__ft {
    padding-right: 0
}
.vux-cell-box >>> .weui-cell.vux-tap-active .weui-cell__ft {
    padding-right: 18px
}
.vux-cell-box >>> .weui-cell .vux-cell-value {
    font-size: 14px
}
</style>
