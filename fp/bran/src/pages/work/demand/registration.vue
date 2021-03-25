<template>
  <div class="box">
    <x-header :left-options="{backText: ''}">管理员工作台</x-header>
    <p class="con">该功能只对国家任命的扶贫干部开放，如果您是乡级或村级扶贫干部，请点击下面的注册按钮，进行注册</p>
    <div class="administrator-btn">
        <button class="btn-orange-lg dis-block text-center color-white" @click="administrator">管理员注册</button>
    </div>
    <div v-if="list.length!==0">
      <div v-for="(item,index) in list">
        <cell title="你申请的地域是:">
          <div class="badge-value">
            <span class="vertical-middle">{{item.region_name}}</span>
          </div>
        </cell>
        <cell :title=nopass()>
          <div class="badge-value">
            <span class="vertical-middle"> {{item.check_opinion}}</span>
          </div>
        </cell>
      </div>


    </div>
 </div>
</template>
<script>
import { XHeader,Badge, Group, Cell} from "vux";
export default {
  data(){
    return{
      list:[]
    }
  },
  components: { XHeader,Badge, Group, Cell},
  created(){
    this.getReg()
  },
  methods:{
    nopass(){
      return `不通过理由:`
    },
      administrator(){
          this.$router.push("/adminReg1")
      },
      getReg(){
        this.$http.post('/hts/management/getNoPassManagement').then((res) => {
          this.list = res.data
        })
      }
  }
}
</script>
<style scoped lang="less">
.box{
    width:100%;
}
    .con{
        box-sizing:border-box;
        width:100%;
        padding:15px;
        font-size:15px;
        color:orange;
    }
    .administrator-btn{
        text-align:center;
      padding:20px 30px 10px 30px;
           .btn-orange-lg{
        border:0 none;
        width:100%
      }
    }
    .btn{
        width:80%;
        height:.35rem;
        text-align:center;
        line-height:.35rem;
        border-width:0;
        border:none;
        background:orangered;
        color:#fff;
        font-size:.15rem;
        border-radius:.05rem;
    }
</style>
